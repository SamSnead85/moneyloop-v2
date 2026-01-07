'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Building2,
    CreditCard,
    TrendingUp,
    Wallet,
    RefreshCw,
    Plus,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { PlaidLinkButton } from '@/components/PlaidLink';

// Mock data - will be replaced with real API calls
const mockAccounts = {
    checking: [
        { id: 1, name: 'Chase Checking', mask: '4523', balance: 12450.00, institution: 'Chase', status: 'active', lastSync: '2 hours ago' },
        { id: 2, name: 'Bank of America Checking', mask: '8912', balance: 3200.50, institution: 'Bank of America', status: 'active', lastSync: '1 hour ago' },
    ],
    savings: [
        { id: 3, name: 'Chase Savings', mask: '7890', balance: 45000.00, institution: 'Chase', status: 'active', lastSync: '2 hours ago' },
        { id: 4, name: 'Marcus High-Yield Savings', mask: '3456', balance: 28500.00, institution: 'Marcus', status: 'active', lastSync: '3 hours ago' },
    ],
    credit: [
        { id: 5, name: 'Chase Sapphire Reserve', mask: '1234', balance: -4250.00, institution: 'Chase', limit: 30000, status: 'active', lastSync: '1 hour ago' },
        { id: 6, name: 'Amex Platinum', mask: '5678', balance: -1890.00, institution: 'American Express', limit: 25000, status: 'active', lastSync: '2 hours ago' },
    ],
    investments: [
        { id: 7, name: 'Fidelity 401k', mask: '9012', balance: 125000.00, institution: 'Fidelity', change: 8.5, status: 'active', lastSync: '4 hours ago' },
        { id: 8, name: 'Robinhood', mask: '3456', balance: 15600.00, institution: 'Robinhood', change: -2.3, status: 'active', lastSync: '1 hour ago' },
    ],
};

const accountTypeIcons = {
    checking: Wallet,
    savings: Building2,
    credit: CreditCard,
    investments: TrendingUp,
};

const accountTypeColors = {
    checking: 'from-blue-500/20 to-blue-600/20',
    savings: 'from-green-500/20 to-green-600/20',
    credit: 'from-orange-500/20 to-orange-600/20',
    investments: 'from-purple-500/20 to-purple-600/20',
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Math.abs(amount));
}

export default function AccountsPage() {
    const [syncing, setSyncing] = useState(false);
    const [lastSync, setLastSync] = useState('Just now');

    const handleSync = async () => {
        setSyncing(true);
        // Simulate sync
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSyncing(false);
        setLastSync('Just now');
    };

    const totalAssets =
        mockAccounts.checking.reduce((sum, a) => sum + a.balance, 0) +
        mockAccounts.savings.reduce((sum, a) => sum + a.balance, 0) +
        mockAccounts.investments.reduce((sum, a) => sum + a.balance, 0);

    const totalLiabilities =
        mockAccounts.credit.reduce((sum, a) => sum + Math.abs(a.balance), 0);

    const netWorth = totalAssets - totalLiabilities;

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Connected Accounts
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        Last synced: {lastSync}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="glass" size="sm" onClick={handleSync} loading={syncing}>
                        <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                        Sync All
                    </Button>
                    <PlaidLinkButton variant="primary" size="sm" onSuccess={handleSync} />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Total Assets</p>
                        <p className="text-2xl font-bold text-[var(--status-success)] text-financial">
                            {formatCurrency(totalAssets)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Total Liabilities</p>
                        <p className="text-2xl font-bold text-[var(--status-error)] text-financial">
                            {formatCurrency(totalLiabilities)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card variant="luxury" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Net Worth</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(netWorth)}
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* Account Groups */}
            <div className="space-y-8">
                {Object.entries(mockAccounts).map(([type, accounts], groupIndex) => {
                    const Icon = accountTypeIcons[type as keyof typeof accountTypeIcons];
                    const colorClass = accountTypeColors[type as keyof typeof accountTypeColors];
                    const groupTotal = accounts.reduce((sum, a) => sum + a.balance, 0);

                    return (
                        <motion.div
                            key={type}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + groupIndex * 0.1 }}
                        >
                            <Card variant="glass" padding="lg">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                                            <Icon className="w-5 h-5 text-[var(--text-primary)]" />
                                        </div>
                                        <div>
                                            <CardTitle className="capitalize">{type}</CardTitle>
                                            <p className="text-sm text-[var(--text-muted)]">{accounts.length} accounts</p>
                                        </div>
                                    </div>
                                    <p className={`text-lg font-bold text-financial ${groupTotal < 0 ? 'text-[var(--status-error)]' : 'text-[var(--text-primary)]'}`}>
                                        {groupTotal < 0 ? '-' : ''}{formatCurrency(groupTotal)}
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {accounts.map((account) => (
                                            <div
                                                key={account.id}
                                                className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--glass-hover)] transition-colors cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center">
                                                        <span className="text-lg font-bold text-[var(--accent-primary)]">
                                                            {account.institution.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <p className="font-medium text-[var(--text-primary)]">{account.name}</p>
                                                            {account.status === 'active' ? (
                                                                <CheckCircle className="w-4 h-4 text-[var(--status-success)]" />
                                                            ) : (
                                                                <AlertCircle className="w-4 h-4 text-[var(--status-warning)]" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-[var(--text-muted)]">
                                                            •••• {account.mask} • {account.institution} • Synced {account.lastSync}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className={`font-bold text-financial ${account.balance < 0 ? 'text-[var(--status-error)]' : 'text-[var(--text-primary)]'}`}>
                                                            {account.balance < 0 ? '-' : ''}{formatCurrency(account.balance)}
                                                        </p>
                                                        {type === 'credit' && 'limit' in account && (
                                                            <p className="text-xs text-[var(--text-muted)]">
                                                                Limit: {formatCurrency(account.limit)}
                                                            </p>
                                                        )}
                                                        {type === 'investments' && 'change' in account && (
                                                            <p className={`text-xs ${account.change >= 0 ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'}`}>
                                                                {account.change >= 0 ? '+' : ''}{account.change}% YTD
                                                            </p>
                                                        )}
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Add Manual Account CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
            >
                <Card variant="glass" padding="lg" className="border-dashed">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center">
                                <Plus className="w-6 h-6 text-[var(--text-muted)]" />
                            </div>
                            <div>
                                <p className="font-medium text-[var(--text-primary)]">Add Manual Account</p>
                                <p className="text-sm text-[var(--text-muted)]">Track assets like real estate, vehicles, or crypto</p>
                            </div>
                        </div>
                        <Button variant="glass" size="sm">
                            <Plus className="w-4 h-4" />
                            Add Asset
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
