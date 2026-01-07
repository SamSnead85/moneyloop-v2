import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { plaidClient, isPlaidConfigured } from '@/lib/plaid';

export async function POST(request: Request) {
    try {
        // Check if Plaid is configured
        if (!isPlaidConfigured()) {
            return NextResponse.json(
                { error: 'Plaid is not configured.' },
                { status: 500 }
            );
        }

        // Get authenticated user
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get public token from request body
        const { public_token, institution } = await request.json();

        if (!public_token) {
            return NextResponse.json(
                { error: 'public_token is required' },
                { status: 400 }
            );
        }

        // Exchange public token for access token
        const exchangeResponse = await plaidClient.itemPublicTokenExchange({
            public_token,
        });

        const accessToken = exchangeResponse.data.access_token;
        const itemId = exchangeResponse.data.item_id;

        // Save institution to database
        const { data: institutionData, error: institutionError } = await supabase
            .from('institutions')
            .upsert({
                user_id: user.id,
                plaid_item_id: itemId,
                access_token: accessToken, // TODO: Encrypt this in production
                institution_id: institution?.institution_id || null,
                institution_name: institution?.name || 'Unknown Institution',
                status: 'active',
                last_synced_at: new Date().toISOString(),
            }, {
                onConflict: 'plaid_item_id',
            })
            .select()
            .single();

        if (institutionError) {
            console.error('Error saving institution:', institutionError);
            throw new Error('Failed to save institution');
        }

        // Fetch accounts from Plaid
        const accountsResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        // Save accounts to database
        const accountsToInsert = accountsResponse.data.accounts.map(account => ({
            user_id: user.id,
            institution_id: institutionData.id,
            plaid_account_id: account.account_id,
            name: account.name,
            official_name: account.official_name,
            type: account.type,
            subtype: account.subtype,
            mask: account.mask,
            current_balance: account.balances.current,
            available_balance: account.balances.available,
            currency: account.balances.iso_currency_code || 'USD',
            is_manual: false,
            last_synced_at: new Date().toISOString(),
        }));

        const { error: accountsError } = await supabase
            .from('accounts')
            .upsert(accountsToInsert, {
                onConflict: 'plaid_account_id',
            });

        if (accountsError) {
            console.error('Error saving accounts:', accountsError);
        }

        return NextResponse.json({
            success: true,
            institution: institutionData,
            accounts_count: accountsToInsert.length,
        });
    } catch (error) {
        console.error('Error exchanging token:', error);
        return NextResponse.json(
            { error: 'Failed to exchange token' },
            { status: 500 }
        );
    }
}
