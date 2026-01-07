'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Calendar,
    AlertCircle,
    Check,
    XCircle,
    ExternalLink,
    TrendingDown,
    Sparkles,
    Play,
    Pause,
    Tv,
    Music,
    Cloud,
    Newspaper,
    Gamepad2,
    Dumbbell,
    ShoppingBag,
    Phone,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

const mockSubscriptions = [
    { id: 1, name: 'Netflix', amount: 15.99, billingCycle: 'Monthly', nextBilling: '2026-01-15', status: 'active', icon: Tv, category: 'Entertainment', usageScore: 85 },
    { id: 2, name: 'Spotify', amount: 9.99, billingCycle: 'Monthly', nextBilling: '2026-01-18', status: 'active', icon: Music, category: 'Entertainment', usageScore: 95 },
    { id: 3, name: 'iCloud Storage', amount: 2.99, billingCycle: 'Monthly', nextBilling: '2026-01-20', status: 'active', icon: Cloud, category: 'Productivity', usageScore: 100 },
    { id: 4, name: 'NY Times', amount: 17.00, billingCycle: 'Monthly', nextBilling: '2026-01-22', status: 'active', icon: Newspaper, category: 'News', usageScore: 25 },
    { id: 5, name: 'Xbox Game Pass', amount: 14.99, billingCycle: 'Monthly', nextBilling: '2026-01-25', status: 'active', icon: Gamepad2, category: 'Entertainment', usageScore: 15 },
    { id: 6, name: 'Planet Fitness', amount: 24.99, billingCycle: 'Monthly', nextBilling: '2026-01-28', status: 'paused', icon: Dumbbell, category: 'Health', usageScore: 0 },
    { id: 7, name: 'Amazon Prime', amount: 139.00, billingCycle: 'Yearly', nextBilling: '2026-03-15', status: 'active', icon: ShoppingBag, category: 'Shopping', usageScore: 70 },
    { id: 8, name: 'AT&T Phone', amount: 85.00, billingCycle: 'Monthly', nextBilling: '2026-01-05', status: 'active', icon: Phone, category: 'Utilities', usageScore: 100 },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
}

export default function SubscriptionsPage() {
    const [filter, setFilter] = useState('all');

    const activeSubscriptions = mockSubscriptions.filter(s => s.status === 'active');
    const monthlyTotal = activeSubscriptions
        .filter(s => s.billingCycle === 'Monthly')
        .reduce((sum, s) => sum + s.amount, 0);
    const yearlyTotal = activeSubscriptions
        .filter(s => s.billingCycle === 'Yearly')
        .reduce((sum, s) => sum + s.amount, 0);
    const annualCost = (monthlyTotal * 12) + yearlyTotal;

    const lowUsageSubscriptions = mockSubscriptions.filter(s => s.usageScore < 30 && s.status === 'active');
    const potentialSavings = lowUsageSubscriptions.reduce((sum, s) => {
        if (s.billingCycle === 'Monthly') return sum + (s.amount * 12);
        return sum + s.amount;
    }, 0);

    const filteredSubscriptions = filter === 'all'
        ? mockSubscriptions
        : mockSubscriptions.filter(s => s.status === filter);

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Subscriptions
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        {activeSubscriptions.length} active subscriptions
                    </p>
                </div>
                <Button variant="glass" size="sm">
                    <ExternalLink className="w-4 h-4" />
                    Detect More
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Monthly Spend</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(monthlyTotal)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Annual Cost</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(annualCost)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card variant="luxury" padding="lg">
                        <div className="flex items-center gap-2 mb-2">
                            <TrendingDown className="w-4 h-4 text-[var(--status-success)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Potential Savings</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--status-success)] text-financial">
                            {formatCurrency(potentialSavings)}/yr
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-[var(--status-warning)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Low Usage</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--status-warning)] text-financial">
                            {lowUsageSubscriptions.length}
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* AI Insight */}
            {lowUsageSubscriptions.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <Card variant="glass" padding="lg" className="border-[var(--status-warning)]/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[var(--status-warning)]/10 flex items-center justify-center flex-shrink-0">
                                <Sparkles className="w-6 h-6 text-[var(--status-warning)]" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-[var(--text-primary)] mb-1">
                                    Save {formatCurrency(potentialSavings)} This Year
                                </h3>
                                <p className="text-[var(--text-secondary)] mb-3">
                                    We detected {lowUsageSubscriptions.length} subscription(s) you rarely use.
                                    Consider canceling {lowUsageSubscriptions.map(s => s.name).join(' and ')} to save money.
                                </p>
                                <div className="flex gap-3">
                                    <Button size="sm" variant="primary">
                                        Review Subscriptions
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        Dismiss
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {['all', 'active', 'paused'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${filter === status
                                ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--glass-hover)]'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Subscriptions List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card variant="glass" padding="none">
                    <div className="divide-y divide-[var(--glass-border)]">
                        {filteredSubscriptions.map((sub, index) => {
                            const Icon = sub.icon;
                            const isLowUsage = sub.usageScore < 30 && sub.status === 'active';

                            return (
                                <motion.div
                                    key={sub.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.05 }}
                                    className={`flex items-center justify-between p-4 hover:bg-[var(--glass-hover)] transition-colors ${isLowUsage ? 'bg-[var(--status-warning)]/5' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sub.status === 'paused' ? 'bg-[var(--bg-elevated)]' : 'bg-[var(--accent-primary)]/10'
                                            }`}>
                                            <Icon className={`w-6 h-6 ${sub.status === 'paused' ? 'text-[var(--text-muted)]' : 'text-[var(--accent-primary)]'
                                                }`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className={`font-medium ${sub.status === 'paused' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                                                    }`}>
                                                    {sub.name}
                                                </p>
                                                {sub.status === 'paused' && (
                                                    <span className="px-2 py-0.5 text-xs bg-[var(--text-muted)]/10 text-[var(--text-muted)] rounded-full">
                                                        Paused
                                                    </span>
                                                )}
                                                {isLowUsage && (
                                                    <span className="px-2 py-0.5 text-xs bg-[var(--status-warning)]/10 text-[var(--status-warning)] rounded-full">
                                                        Low Usage
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[var(--text-muted)]">
                                                {sub.category} • {sub.billingCycle} • Next: {formatDate(sub.nextBilling)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        {/* Usage Bar */}
                                        <div className="hidden md:block w-24">
                                            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-1">
                                                <span>Usage</span>
                                                <span>{sub.usageScore}%</span>
                                            </div>
                                            <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${sub.usageScore > 60 ? 'bg-[var(--status-success)]' :
                                                            sub.usageScore > 30 ? 'bg-[var(--status-warning)]' :
                                                                'bg-[var(--status-error)]'
                                                        }`}
                                                    style={{ width: `${sub.usageScore}%` }}
                                                />
                                            </div>
                                        </div>

                                        <p className={`font-bold text-financial ${sub.status === 'paused' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                                            }`}>
                                            {formatCurrency(sub.amount)}
                                        </p>

                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg hover:bg-[var(--glass-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                                {sub.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-[var(--status-error)]/10 text-[var(--text-muted)] hover:text-[var(--status-error)]">
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
