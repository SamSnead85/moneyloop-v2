'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import { Plus, Building2, Check, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui';

interface PlaidLinkButtonProps {
    onSuccess?: () => void;
    variant?: 'primary' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
}

export function PlaidLinkButton({
    onSuccess,
    variant = 'primary',
    size = 'md',
    children
}: PlaidLinkButtonProps) {
    const [linkToken, setLinkToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);

    // Fetch link token on mount
    useEffect(() => {
        const fetchLinkToken = async () => {
            try {
                const response = await fetch('/api/plaid/create-link-token', {
                    method: 'POST',
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to get link token');
                }

                const data = await response.json();
                setLinkToken(data.link_token);
            } catch (err) {
                console.error('Error fetching link token:', err);
                setError(err instanceof Error ? err.message : 'Failed to initialize');
            }
        };

        fetchLinkToken();
    }, []);

    // Handle successful connection
    const handleSuccess = useCallback<PlaidLinkOnSuccess>(
        async (publicToken, metadata) => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/plaid/exchange-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        public_token: publicToken,
                        institution: metadata.institution,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to connect account');
                }

                setConnected(true);
                onSuccess?.();

                // Reset after showing success
                setTimeout(() => {
                    setConnected(false);
                }, 3000);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Connection failed');
            } finally {
                setLoading(false);
            }
        },
        [onSuccess]
    );

    const config: PlaidLinkOptions = {
        token: linkToken,
        onSuccess: handleSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    if (error) {
        return (
            <Button variant="glass" size={size} disabled className="opacity-70">
                <AlertCircle className="w-4 h-4 text-[var(--status-error)]" />
                {error.includes('configured') ? 'Plaid Not Configured' : 'Connection Error'}
            </Button>
        );
    }

    if (connected) {
        return (
            <Button variant="glass" size={size} disabled>
                <Check className="w-4 h-4 text-[var(--status-success)]" />
                Connected!
            </Button>
        );
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={() => open()}
            disabled={!ready || loading}
            loading={loading || !linkToken}
        >
            {loading ? (
                <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connecting...
                </>
            ) : (
                <>
                    {children || (
                        <>
                            <Plus className="w-4 h-4" />
                            Connect Account
                        </>
                    )}
                </>
            )}
        </Button>
    );
}

// Compact version for dashboard cards
export function PlaidLinkCompact() {
    return (
        <PlaidLinkButton variant="glass" size="sm">
            <Building2 className="w-4 h-4" />
            Link Bank
        </PlaidLinkButton>
    );
}
