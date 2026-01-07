'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Brain,
    Sparkles,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    CheckCircle,
    Lightbulb,
    Target,
    ShoppingBag,
    CreditCard,
    PiggyBank,
    ArrowRight,
    ChevronRight,
    BarChart3,
    DollarSign,
    Clock,
    Zap,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

const insights = [
    {
        id: 1,
        type: 'pattern',
        icon: ShoppingBag,
        title: 'Restaurant Spending Pattern',
        description: 'Your dining out expenses increased 45% this quarter compared to last quarter.',
        impact: -380,
        impactType: 'negative',
        actionable: true,
        action: 'Set a dining budget',
        category: 'Spending',
    },
    {
        id: 2,
        type: 'opportunity',
        icon: PiggyBank,
        title: 'High-Yield Savings Opportunity',
        description: 'Move $15,000 from your checking to high-yield savings to earn an extra $675/year.',
        impact: 675,
        impactType: 'positive',
        actionable: true,
        action: 'Move funds now',
        category: 'Savings',
    },
    {
        id: 3,
        type: 'achievement',
        icon: Target,
        title: 'Emergency Fund Goal Progress',
        description: "You're 74% to your emergency fund goal! Keep it up!",
        impact: null,
        impactType: 'positive',
        actionable: false,
        category: 'Goals',
    },
    {
        id: 4,
        type: 'alert',
        icon: CreditCard,
        title: 'Subscription Price Increase',
        description: 'Netflix is increasing their price by $3/month next billing cycle.',
        impact: -36,
        impactType: 'negative',
        actionable: true,
        action: 'Review subscription',
        category: 'Subscriptions',
    },
    {
        id: 5,
        type: 'comparison',
        icon: BarChart3,
        title: 'Spending Comparison',
        description: 'You spent 12% less on groceries this month than similar households.',
        impact: null,
        impactType: 'positive',
        actionable: false,
        category: 'Spending',
    },
    {
        id: 6,
        type: 'prediction',
        icon: TrendingUp,
        title: 'End of Month Forecast',
        description: "Based on current spending, you'll save approximately $1,200 this month.",
        impact: 1200,
        impactType: 'positive',
        actionable: false,
        category: 'Forecast',
    },
    {
        id: 7,
        type: 'alert',
        icon: AlertCircle,
        title: 'Unusual Transaction Detected',
        description: 'A charge of $299.99 from "Digital Services LLC" seems unusual.',
        impact: -299.99,
        impactType: 'negative',
        actionable: true,
        action: 'Review transaction',
        category: 'Security',
    },
    {
        id: 8,
        type: 'opportunity',
        icon: Zap,
        title: 'Bill Negotiation Opportunity',
        description: 'Your Verizon bill is $25/month higher than average. We can help negotiate.',
        impact: 300,
        impactType: 'positive',
        actionable: true,
        action: 'Start negotiation',
        category: 'Bills',
    },
];

const quickStats = [
    { label: 'Potential Annual Savings', value: '$2,847', trend: null, icon: DollarSign },
    { label: 'Insights This Month', value: '24', trend: '+8', icon: Lightbulb },
    { label: 'Actions Taken', value: '12', trend: null, icon: CheckCircle },
    { label: 'Avg Response Time', value: '1.2 hrs', trend: '-0.5', icon: Clock },
];

const typeColors = {
    pattern: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    opportunity: { bg: 'bg-[var(--status-success)]/10', text: 'text-[var(--status-success)]', border: 'border-[var(--status-success)]/30' },
    achievement: { bg: 'bg-[var(--accent-primary)]/10', text: 'text-[var(--accent-primary)]', border: 'border-[var(--accent-primary)]/30' },
    alert: { bg: 'bg-[var(--status-warning)]/10', text: 'text-[var(--status-warning)]', border: 'border-[var(--status-warning)]/30' },
    comparison: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    prediction: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(Math.abs(amount));
}

export default function InsightsPage() {
    const [filter, setFilter] = useState('all');

    const filteredInsights = filter === 'all'
        ? insights
        : insights.filter(i => i.type === filter);

    const positiveImpact = insights
        .filter(i => i.impactType === 'positive' && i.impact)
        .reduce((sum, i) => sum + (i.impact || 0), 0);

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                        <Brain className="w-6 h-6 text-[var(--bg-primary)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                            AI Insights
                        </h1>
                        <p className="text-[var(--text-secondary)]">
                            Personalized recommendations powered by AI
                        </p>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {quickStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card variant="glass" padding="md">
                            <div className="flex items-center gap-2 mb-2">
                                <stat.icon className="w-4 h-4 text-[var(--accent-primary)]" />
                                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</p>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <p className="text-xl font-bold text-[var(--text-primary)]">{stat.value}</p>
                                {stat.trend && (
                                    <span className={`text-xs ${stat.trend.startsWith('+') ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'}`}>
                                        {stat.trend}
                                    </span>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Total Potential Savings */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
            >
                <Card variant="luxury" padding="lg">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--status-success)]/20 to-[var(--accent-primary)]/20 flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-[var(--status-success)]" />
                            </div>
                            <div>
                                <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-1">
                                    Potential Annual Benefit
                                </p>
                                <p className="text-3xl font-bold text-[var(--status-success)] text-financial">
                                    +{formatCurrency(positiveImpact)}
                                </p>
                            </div>
                        </div>
                        <p className="text-[var(--text-secondary)] max-w-md">
                            Based on {insights.filter(i => i.impactType === 'positive').length} actionable opportunities identified by your AI financial assistant.
                        </p>
                    </div>
                </Card>
            </motion.div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['all', 'opportunity', 'alert', 'pattern', 'prediction', 'achievement'].map((type) => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${filter === type
                                ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--glass-hover)]'
                            }`}
                    >
                        {type === 'all' ? 'All Insights' : type}
                    </button>
                ))}
            </div>

            {/* Insights Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {filteredInsights.map((insight, index) => {
                    const style = typeColors[insight.type as keyof typeof typeColors];
                    const Icon = insight.icon;

                    return (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                        >
                            <Card variant="glass" padding="lg" hover className={`border ${style.border}`}>
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${style.bg} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-6 h-6 ${style.text}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${style.bg} ${style.text} capitalize`}>
                                                {insight.type}
                                            </span>
                                            <span className="text-xs text-[var(--text-muted)]">{insight.category}</span>
                                        </div>
                                        <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                                            {insight.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                                            {insight.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            {insight.impact && (
                                                <p className={`font-bold text-financial ${insight.impactType === 'positive' ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'
                                                    }`}>
                                                    {insight.impactType === 'positive' ? '+' : '-'}{formatCurrency(insight.impact)}
                                                    <span className="text-xs font-normal text-[var(--text-muted)]">/year</span>
                                                </p>
                                            )}
                                            {insight.actionable && (
                                                <Button size="sm" variant="glass">
                                                    {insight.action}
                                                    <ArrowRight className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
