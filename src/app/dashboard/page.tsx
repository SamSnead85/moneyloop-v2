'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    CreditCard,
    PiggyBank,
    AlertCircle,
    Calendar,
    RefreshCw,
    ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { PlaidLinkButton } from '@/components/PlaidLink';
import Link from 'next/link';

// Mock data - will be replaced with real API calls
const mockData = {
    netWorth: 127450,
    netWorthChange: 3950,
    netWorthChangePercent: 3.2,
    income: 10400,
    expenses: 8750,
    cashFlow: 1650,
    alerts: [
        { id: 1, type: 'warning', message: "You're at 85% of your grocery budget", action: '/dashboard/budgets' },
        { id: 2, type: 'success', message: 'Move $3,000 to high-yield savings to earn $135/year', action: '/dashboard/accounts' },
        { id: 3, type: 'info', message: 'Electric bill due in 3 days ($125)', action: '/dashboard/bills' },
    ],
    upcomingBills: [
        { id: 1, name: 'Electric', amount: 125, dueDate: 'Jan 15' },
        { id: 2, name: 'Internet', amount: 80, dueDate: 'Jan 18' },
        { id: 3, name: 'Phone', amount: 85, dueDate: 'Jan 20' },
        { id: 4, name: 'Car Lease', amount: 450, dueDate: 'Jan 22' },
        { id: 5, name: 'Credit Card', amount: 1200, dueDate: 'Jan 25' },
    ],
    recentTransactions: [
        { id: 1, name: 'Whole Foods', amount: -87.50, category: 'Groceries', date: 'Today' },
        { id: 2, name: 'Shell Gas', amount: -45.00, category: 'Transportation', date: 'Today' },
        { id: 3, name: 'Paycheck', amount: 2600.00, category: 'Income', date: 'Yesterday' },
        { id: 4, name: 'Amazon', amount: -129.99, category: 'Shopping', date: 'Yesterday' },
        { id: 5, name: 'Spotify', amount: -9.99, category: 'Subscriptions', date: '2 days ago' },
    ],
    insights: [
        { id: 1, message: 'Your restaurant spending is up 45% this quarter', icon: '🍔' },
        { id: 2, message: "You're 75% to your vacation goal!", icon: '🎯' },
        { id: 3, message: "You're spending $127/month on subscriptions (65% more than similar users)", icon: '📊' },
    ],
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatCurrencyDetailed(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

const alertIcons = {
    warning: <AlertCircle className="w-4 h-4 text-[var(--status-warning)]" />,
    success: <TrendingUp className="w-4 h-4 text-[var(--status-success)]" />,
    info: <Calendar className="w-4 h-4 text-[var(--status-info)]" />,
};

export default function DashboardPage() {
    const [loading, setLoading] = useState(false);

    const handleRefresh = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Financial Overview
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        Last synced: 2 hours ago
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="glass" size="sm" onClick={handleRefresh} loading={loading}>
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Sync
                    </Button>
                    <PlaidLinkButton variant="primary" size="sm" />
                </div>
            </div>

            {/* Top Row - Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Net Worth Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card variant="luxury" padding="lg" className="h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center">
                                <Wallet className="w-6 h-6 text-[var(--accent-primary)]" />
                            </div>
                            <div className={`flex items-center gap-1 text-sm ${mockData.netWorthChange >= 0 ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'
                                }`}>
                                {mockData.netWorthChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                {mockData.netWorthChangePercent}%
                            </div>
                        </div>
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-1">Net Worth</p>
                        <p className="text-3xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(mockData.netWorth)}
                        </p>
                        <p className={`text-sm mt-2 ${mockData.netWorthChange >= 0 ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'
                            }`}>
                            {mockData.netWorthChange >= 0 ? '+' : ''}{formatCurrency(mockData.netWorthChange)} this month
                        </p>
                    </Card>
                </motion.div>

                {/* Cash Flow Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card variant="glass" padding="lg" className="h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--status-success)]/10 flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-[var(--status-success)]" />
                            </div>
                        </div>
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-1">Cash Flow (This Month)</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-[var(--status-success)] text-financial">
                                +{formatCurrency(mockData.cashFlow)}
                            </p>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-muted)]">Income</span>
                                <span className="text-[var(--status-success)]">+{formatCurrency(mockData.income)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[var(--text-muted)]">Expenses</span>
                                <span className="text-[var(--status-error)]">-{formatCurrency(mockData.expenses)}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden mt-2">
                                <div
                                    className="h-full bg-gradient-to-r from-[var(--status-success)] to-[var(--accent-primary)]"
                                    style={{ width: `${(mockData.cashFlow / mockData.income) * 100}%` }}
                                />
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Savings Rate Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card variant="glass" padding="lg" className="h-full">
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center">
                                <PiggyBank className="w-6 h-6 text-[var(--accent-secondary)]" />
                            </div>
                        </div>
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-1">Savings Rate</p>
                        <p className="text-3xl font-bold text-[var(--text-primary)] text-financial">
                            16%
                        </p>
                        <p className="text-sm text-[var(--text-muted)] mt-2">
                            Target: 20% • <span className="text-[var(--status-warning)]">4% below goal</span>
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Alerts & Bills */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Critical Alerts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Card variant="glass" padding="lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Critical Alerts</CardTitle>
                                <Link href="/dashboard/insights" className="text-sm text-[var(--accent-primary)] hover:underline">
                                    View All
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockData.alerts.map((alert) => (
                                        <Link
                                            key={alert.id}
                                            href={alert.action}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--glass-hover)] transition-colors group"
                                        >
                                            {alertIcons[alert.type as keyof typeof alertIcons]}
                                            <span className="flex-1 text-sm text-[var(--text-primary)]">{alert.message}</span>
                                            <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent Transactions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Card variant="glass" padding="lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Recent Transactions</CardTitle>
                                <Link href="/dashboard/transactions" className="text-sm text-[var(--accent-primary)] hover:underline">
                                    View All
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockData.recentTransactions.map((tx) => (
                                        <div
                                            key={tx.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-elevated)]"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tx.amount > 0 ? 'bg-[var(--status-success)]/10' : 'bg-[var(--bg-secondary)]'
                                                    }`}>
                                                    {tx.amount > 0 ? (
                                                        <ArrowUpRight className="w-5 h-5 text-[var(--status-success)]" />
                                                    ) : (
                                                        <CreditCard className="w-5 h-5 text-[var(--text-muted)]" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-[var(--text-primary)]">{tx.name}</p>
                                                    <p className="text-xs text-[var(--text-muted)]">{tx.category} • {tx.date}</p>
                                                </div>
                                            </div>
                                            <p className={`text-sm font-medium text-financial ${tx.amount > 0 ? 'text-[var(--status-success)]' : 'text-[var(--text-primary)]'
                                                }`}>
                                                {tx.amount > 0 ? '+' : ''}{formatCurrencyDetailed(tx.amount)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Upcoming Bills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Card variant="glass" padding="lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Upcoming Bills</CardTitle>
                                <Link href="/dashboard/bills" className="text-sm text-[var(--accent-primary)] hover:underline">
                                    View All
                                </Link>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockData.upcomingBills.map((bill) => (
                                        <div
                                            key={bill.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-elevated)]"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-[var(--text-primary)]">{bill.name}</p>
                                                <p className="text-xs text-[var(--text-muted)]">Due {bill.dueDate}</p>
                                            </div>
                                            <p className="text-sm font-medium text-[var(--text-primary)] text-financial">
                                                {formatCurrency(bill.amount)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* AI Insights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <Card variant="luxury" padding="lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <span>💡</span>
                                    AI Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {mockData.insights.map((insight) => (
                                        <div
                                            key={insight.id}
                                            className="p-3 rounded-lg bg-[var(--bg-elevated)] text-sm text-[var(--text-secondary)]"
                                        >
                                            <span className="mr-2">{insight.icon}</span>
                                            {insight.message}
                                        </div>
                                    ))}
                                </div>
                                <Link href="/dashboard/insights">
                                    <Button variant="glass" size="sm" className="w-full mt-4">
                                        View All Insights
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
