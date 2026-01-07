'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    PiggyBank,
    Plus,
    TrendingUp,
    AlertCircle,
    Check,
    Edit2,
    Trash2,
    ShoppingCart,
    Home,
    Car,
    Utensils,
    Zap,
    Film,
    Heart,
    GraduationCap,
    Gift,
    Plane,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

const mockBudgets = [
    { id: 1, category: 'Groceries', budgeted: 600, spent: 485, icon: ShoppingCart, color: '#7dd3a8' },
    { id: 2, category: 'Housing', budgeted: 2500, spent: 2500, icon: Home, color: '#e57373' },
    { id: 3, category: 'Transportation', budgeted: 400, spent: 320, icon: Car, color: '#64b5f6' },
    { id: 4, category: 'Dining Out', budgeted: 300, spent: 425, icon: Utensils, color: '#ffb74d' },
    { id: 5, category: 'Utilities', budgeted: 200, spent: 125, icon: Zap, color: '#ffd54f' },
    { id: 6, category: 'Entertainment', budgeted: 150, spent: 89, icon: Film, color: '#ba68c8' },
    { id: 7, category: 'Health', budgeted: 100, spent: 50, icon: Heart, color: '#f06292' },
    { id: 8, category: 'Education', budgeted: 200, spent: 0, icon: GraduationCap, color: '#4fc3f7' },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function BudgetsPage() {
    const [showAddModal, setShowAddModal] = useState(false);

    const totalBudgeted = mockBudgets.reduce((sum, b) => sum + b.budgeted, 0);
    const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
    const totalRemaining = totalBudgeted - totalSpent;

    const overBudgetCount = mockBudgets.filter(b => b.spent > b.budgeted).length;
    const onTrackCount = mockBudgets.filter(b => b.spent <= b.budgeted).length;

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Monthly Budget
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">January 2026</p>
                </div>
                <Button size="sm" onClick={() => setShowAddModal(true)}>
                    <Plus className="w-4 h-4" />
                    Add Category
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Total Budget</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(totalBudgeted)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Spent</p>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(totalSpent)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card variant="luxury" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Remaining</p>
                        <p className={`text-2xl font-bold text-financial ${totalRemaining >= 0 ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'}`}>
                            {formatCurrency(totalRemaining)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card variant="glass" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Status</p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[var(--status-success)]" />
                                <span className="text-sm text-[var(--text-secondary)]">{onTrackCount} on track</span>
                            </div>
                            {overBudgetCount > 0 && (
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-[var(--status-error)]" />
                                    <span className="text-sm text-[var(--text-secondary)]">{overBudgetCount} over</span>
                                </div>
                            )}
                        </div>
                    </Card>
                </motion.div>
            </div>

            {/* Overall Progress Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
            >
                <Card variant="glass" padding="lg">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-medium text-[var(--text-primary)]">Overall Budget Usage</p>
                        <p className="text-sm text-[var(--text-muted)]">
                            {Math.round((totalSpent / totalBudgeted) * 100)}% used
                        </p>
                    </div>
                    <div className="h-4 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((totalSpent / totalBudgeted) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${totalSpent > totalBudgeted
                                    ? 'bg-[var(--status-error)]'
                                    : totalSpent / totalBudgeted > 0.8
                                        ? 'bg-[var(--status-warning)]'
                                        : 'bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]'
                                }`}
                        />
                    </div>
                </Card>
            </motion.div>

            {/* Budget Categories Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBudgets.map((budget, index) => {
                    const percentage = (budget.spent / budget.budgeted) * 100;
                    const isOver = budget.spent > budget.budgeted;
                    const remaining = budget.budgeted - budget.spent;
                    const Icon = budget.icon;

                    return (
                        <motion.div
                            key={budget.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.05 }}
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

                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${budget.color}20` }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: budget.color }} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">{budget.category}</p>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            {formatCurrency(budget.spent)} of {formatCurrency(budget.budgeted)}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-2 bg-[var(--bg-elevated)] rounded-full overflow-hidden mb-3">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(percentage, 100)}%` }}
                                        transition={{ duration: 0.8, delay: 0.7 + index * 0.05 }}
                                        className="h-full rounded-full"
                                        style={{
                                            backgroundColor: isOver ? 'var(--status-error)' : budget.color
                                        }}
                                    />
                                </div>

                                {/* Status */}
                                <div className="flex items-center justify-between text-sm">
                                    {isOver ? (
                                        <span className="flex items-center gap-1 text-[var(--status-error)]">
                                            <AlertCircle className="w-4 h-4" />
                                            {formatCurrency(Math.abs(remaining))} over
                                        </span>
                                    ) : (
                                        <span className="text-[var(--status-success)]">
                                            {formatCurrency(remaining)} left
                                        </span>
                                    )}
                                    <span className="text-[var(--text-muted)]">
                                        {Math.round(percentage)}%
                                    </span>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}

                {/* Add New Category Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <Card
                        variant="glass"
                        padding="lg"
                        className="border-dashed flex items-center justify-center h-full min-h-[180px] cursor-pointer hover:border-[var(--accent-primary)]/50 transition-colors"
                        onClick={() => setShowAddModal(true)}
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center mx-auto mb-3">
                                <Plus className="w-6 h-6 text-[var(--text-muted)]" />
                            </div>
                            <p className="font-medium text-[var(--text-secondary)]">Add Budget Category</p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
