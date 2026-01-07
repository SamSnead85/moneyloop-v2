import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { plaidClient, isPlaidConfigured } from '@/lib/plaid';

export async function GET() {
    try {
        // Get authenticated user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get all accounts from database
        const { data: accounts, error: accountsError } = await supabase
            .from('accounts')
            .select(`
        *,
        institution:institutions(
          id,
          institution_name,
          status,
          last_synced_at
        )
      `)
            .eq('user_id', user.id)
            .eq('is_hidden', false)
            .order('created_at', { ascending: false });

        if (accountsError) {
            throw new Error('Failed to fetch accounts');
        }

        // Calculate totals
        const totals = accounts.reduce((acc, account) => {
            const balance = account.current_balance || 0;
            if (account.type === 'depository' || account.type === 'investment') {
                acc.assets += balance;
            } else if (account.type === 'credit' || account.type === 'loan') {
                acc.liabilities += Math.abs(balance);
            }
            return acc;
        }, { assets: 0, liabilities: 0 });

        return NextResponse.json({
            accounts,
            totals: {
                assets: totals.assets,
                liabilities: totals.liabilities,
                net_worth: totals.assets - totals.liabilities,
            },
        });
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch accounts' },
            { status: 500 }
        );
    }
}

export async function POST() {
    try {
        // Sync accounts - refresh balances from Plaid
        if (!isPlaidConfigured()) {
            return NextResponse.json(
                { error: 'Plaid is not configured.' },
                { status: 500 }
            );
        }

        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get all institutions
        const { data: institutions, error: instError } = await supabase
            .from('institutions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active');

        if (instError) {
            throw new Error('Failed to fetch institutions');
        }

        let updatedCount = 0;

        // Sync each institution
        for (const institution of institutions) {
            try {
                const accountsResponse = await plaidClient.accountsGet({
                    access_token: institution.access_token,
                });

                // Update accounts in database
                for (const account of accountsResponse.data.accounts) {
                    await supabase
                        .from('accounts')
                        .update({
                            current_balance: account.balances.current,
                            available_balance: account.balances.available,
                            last_synced_at: new Date().toISOString(),
                        })
                        .eq('plaid_account_id', account.account_id);

                    updatedCount++;
                }

                // Update institution last synced
                await supabase
                    .from('institutions')
                    .update({ last_synced_at: new Date().toISOString() })
                    .eq('id', institution.id);

            } catch (plaidError) {
                console.error(`Error syncing institution ${institution.id}:`, plaidError);
                // Mark institution as having error
                await supabase
                    .from('institutions')
                    .update({ status: 'error' })
                    .eq('id', institution.id);
            }
        }

        return NextResponse.json({
            success: true,
            updated_accounts: updatedCount,
        });
    } catch (error) {
        console.error('Error syncing accounts:', error);
        return NextResponse.json(
            { error: 'Failed to sync accounts' },
            { status: 500 }
        );
    }
}
