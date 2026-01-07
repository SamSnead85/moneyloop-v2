import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { plaidClient, isPlaidConfigured } from '@/lib/plaid';

export async function GET(request: Request) {
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

        // Get query parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        const startDate = searchParams.get('start_date');
        const endDate = searchParams.get('end_date');

        // Build query
        let query = supabase
            .from('transactions')
            .select(`
        *,
        account:accounts(name, type, institution_id)
      `, { count: 'exact' })
            .eq('user_id', user.id)
            .order('date', { ascending: false })
            .range((page - 1) * limit, page * limit - 1);

        if (category) {
            query = query.eq('category', category);
        }

        if (search) {
            query = query.or(`name.ilike.%${search}%,merchant_name.ilike.%${search}%`);
        }

        if (startDate) {
            query = query.gte('date', startDate);
        }

        if (endDate) {
            query = query.lte('date', endDate);
        }

        const { data: transactions, error: txError, count } = await query;

        if (txError) {
            throw new Error('Failed to fetch transactions');
        }

        return NextResponse.json({
            transactions,
            pagination: {
                page,
                limit,
                total: count || 0,
                total_pages: Math.ceil((count || 0) / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transactions' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Sync transactions from Plaid
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

        // Get date range from body
        const body = await request.json().catch(() => ({}));
        const endDate = body.end_date || new Date().toISOString().split('T')[0];
        const startDate = body.start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Get all institutions
        const { data: institutions, error: instError } = await supabase
            .from('institutions')
            .select('*')
            .eq('user_id', user.id)
            .eq('status', 'active');

        if (instError) {
            throw new Error('Failed to fetch institutions');
        }

        let totalAdded = 0;
        let totalModified = 0;

        // Sync each institution
        for (const institution of institutions) {
            try {
                // Get account mapping
                const { data: accounts } = await supabase
                    .from('accounts')
                    .select('id, plaid_account_id')
                    .eq('institution_id', institution.id);

                const accountMap = new Map(
                    accounts?.map(a => [a.plaid_account_id, a.id]) || []
                );

                // Fetch transactions from Plaid
                const response = await plaidClient.transactionsGet({
                    access_token: institution.access_token,
                    start_date: startDate,
                    end_date: endDate,
                    options: {
                        count: 500,
                        offset: 0,
                    },
                });

                const plaidTransactions = response.data.transactions;

                // Upsert transactions
                for (const tx of plaidTransactions) {
                    const accountId = accountMap.get(tx.account_id);
                    if (!accountId) continue;

                    const { error: upsertError } = await supabase
                        .from('transactions')
                        .upsert({
                            user_id: user.id,
                            account_id: accountId,
                            plaid_transaction_id: tx.transaction_id,
                            date: tx.date,
                            amount: tx.amount,
                            merchant_name: tx.merchant_name,
                            name: tx.name,
                            category: tx.category?.[0] || 'Uncategorized',
                            category_id: tx.category_id,
                            subcategory: tx.category?.[1],
                            pending: tx.pending,
                            is_manual: false,
                        }, {
                            onConflict: 'plaid_transaction_id',
                        });

                    if (!upsertError) {
                        totalAdded++;
                    }
                }
            } catch (plaidError) {
                console.error(`Error syncing transactions for ${institution.id}:`, plaidError);
            }
        }

        return NextResponse.json({
            success: true,
            added: totalAdded,
            modified: totalModified,
        });
    } catch (error) {
        console.error('Error syncing transactions:', error);
        return NextResponse.json(
            { error: 'Failed to sync transactions' },
            { status: 500 }
        );
    }
}
