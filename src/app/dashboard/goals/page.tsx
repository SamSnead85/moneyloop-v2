'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Plus,
    TrendingUp,
    Calendar,
    Sparkles,
    Edit2,
    Trash2,
    Home,
    Car,
    Plane,
    GraduationCap,
    Heart,
    Gift,
    Briefcase,
    Smartphone,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

const mockGoals = [
    {
        id: 1,
        name: 'Emergency Fund',
        target: 25000,
        current: 18500,
        icon: Heart,
        color: '#7dd3a8',
        deadline: '2026-06-01',
        monthlyContribution: 1000,
        aiRecommendation: 'Increase by $200/month to hit goal 2 months early'
    },
    {
        id: 2,
        name: 'Vacation to Japan',
        target: 8000,
        current: 3200,
        icon: Plane,
        color: '#64b5f6',
        deadline: '2026-09-01',
        monthlyContribution: 600,
        aiRecommendation: 'On track! You\'ll reach this goal by August'
    },
    {
        id: 3,
        name: 'New Car Down Payment',
        target: 15000,
        current: 8750,
        icon: Car,
        color: '#ffb74d',
        deadline: '2027-01-01',
        monthlyContribution: 500,
        aiRecommendation: null
    },
    {
        id: 4,
        name: 'Home Down Payment',
        target: 100000,
        current: 45000,
        icon: Home,
        color: '#e57373',
        deadline: '2028-01-01',
        monthlyContribution: 2500,
        aiRecommendation: 'Consider high-yield savings for faster growth'
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });
}

function getDaysUntil(dateStr: string): number {
    const target = new Date(dateStr);
    const today = new Date();
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function GoalsPage() {
    const totalTarget = mockGoals.reduce((sum, g) => sum + g.target, 0);
    const totalCurrent = mockGoals.reduce((sum, g) => sum + g.current, 0);
    const monthlyTotal = mockGoals.reduce((sum, g) => sum + g.monthlyContribution, 0);

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Financial Goals
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        Track your progress towards your dreams
                    </p>
                </div>
                <Button size="sm">
                    <Plus className="w-4 h-4" />
                    Add Goal
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card variant="luxury" padding="lg">
                        <div className="flex items-center gap-3 mb-2">
                            <Target className="w-5 h-5 text-[var(--accent-primary)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Total Goals</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(totalTarget)}
                        </p>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                            {formatCurrency(totalCurrent)} saved ({Math.round((totalCurrent / totalTarget) * 100)}%)
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-[var(--status-success)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Monthly Savings</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--status-success)] text-financial">
                            {formatCurrency(monthlyTotal)}
                        </p>
                        <p className="text-sm text-[var(--text-muted)] mt-1">
                            Across {mockGoals.length} goals
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="w-5 h-5 text-[var(--accent-secondary)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">AI Insights</p>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {mockGoals.filter(g => g.aiRecommendation).length} recommendations available
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* Goals Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {mockGoals.map((goal, index) => {
                    const percentage = (goal.current / goal.target) * 100;
                    const daysLeft = getDaysUntil(goal.deadline);
                    const Icon = goal.icon;

                    return (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <Card variant="glass" padding="lg" hover className="relative group">
                                {/* Actions */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--glass-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 rounded-lg bg-[var(--bg-elevated)] hover:bg-[var(--status-error)]/10 text-[var(--text-muted)] hover:text-[var(--status-error)]">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex items-start gap-4 mb-6">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                        style={{ backgroundColor: `${goal.color}20` }}
                                    >
                                        <Icon className="w-7 h-7" style={{ color: goal.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{goal.name}</h3>
                                        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(goal.deadline)}
                                            </span>
                                            <span>{daysLeft} days left</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                                            {formatCurrency(goal.current)}
                                        </span>
                                        <span className="text-[var(--text-muted)]">
                                            of {formatCurrency(goal.target)}
                                        </span>
                                    </div>
                                    <div className="h-3 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(percentage, 100)}%` }}
                                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: goal.color }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between mt-2 text-sm">
                                        <span className="text-[var(--text-muted)]">
                                            {formatCurrency(goal.monthlyContribution)}/month
                                        </span>
                                        <span className="font-medium" style={{ color: goal.color }}>
                                            {Math.round(percentage)}%
                                        </span>
                                    </div>
                                </div>

                                {/* AI Recommendation */}
                                {goal.aiRecommendation && (
                                    <div className="p-3 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/20">
                                        <div className="flex items-start gap-2">
                                            <Sparkles className="w-4 h-4 text-[var(--accent-primary)] mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-[var(--text-secondary)]">
                                                {goal.aiRecommendation}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    );
                })}

                {/* Add New Goal Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Card
                        variant="glass"
                        padding="lg"
                        className="border-dashed flex items-center justify-center h-full min-h-[280px] cursor-pointer hover:border-[var(--accent-primary)]/50 transition-colors"
                    >
                        <div className="text-center">
                            <div className="w-14 h-14 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-7 h-7 text-[var(--text-muted)]" />
                            </div>
                            <p className="font-medium text-[var(--text-primary)] mb-1">Create New Goal</p>
                            <p className="text-sm text-[var(--text-muted)]">Start saving for your next dream</p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
