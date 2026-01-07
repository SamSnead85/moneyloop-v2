'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Receipt,
    Calendar,
    Check,
    Clock,
    AlertTriangle,
    Plus,
    CreditCard,
    Home,
    Zap,
    Phone,
    Wifi,
    Car,
    Shield,
    Droplets,
    Flame,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';

const mockBills = [
    { id: 1, name: 'Rent', amount: 2500, dueDate: '2026-01-01', status: 'paid', category: 'Housing', icon: Home, autopay: true },
    { id: 2, name: 'Electric (Con Edison)', amount: 125, dueDate: '2026-01-15', status: 'upcoming', category: 'Utilities', icon: Zap, autopay: false },
    { id: 3, name: 'Internet (Verizon)', amount: 79.99, dueDate: '2026-01-18', status: 'upcoming', category: 'Utilities', icon: Wifi, autopay: true },
    { id: 4, name: 'Phone (AT&T)', amount: 85, dueDate: '2026-01-20', status: 'upcoming', category: 'Utilities', icon: Phone, autopay: true },
    { id: 5, name: 'Car Insurance', amount: 150, dueDate: '2026-01-22', status: 'upcoming', category: 'Insurance', icon: Car, autopay: false },
    { id: 6, name: 'Health Insurance', amount: 450, dueDate: '2026-01-25', status: 'upcoming', category: 'Insurance', icon: Shield, autopay: true },
    { id: 7, name: 'Water', amount: 45, dueDate: '2026-01-28', status: 'upcoming', category: 'Utilities', icon: Droplets, autopay: false },
    { id: 8, name: 'Gas', amount: 60, dueDate: '2026-01-30', status: 'upcoming', category: 'Utilities', icon: Flame, autopay: false },
    { id: 9, name: 'Credit Card (Chase)', amount: 1200, dueDate: '2026-01-05', status: 'overdue', category: 'Credit', icon: CreditCard, autopay: false },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDaysUntil(dateStr: string): number {
    const target = new Date(dateStr);
    const today = new Date();
    return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const statusColors = {
    paid: { bg: 'bg-[var(--status-success)]/10', text: 'text-[var(--status-success)]', icon: Check },
    upcoming: { bg: 'bg-[var(--status-info)]/10', text: 'text-[var(--status-info)]', icon: Clock },
    overdue: { bg: 'bg-[var(--status-error)]/10', text: 'text-[var(--status-error)]', icon: AlertTriangle },
};

export default function BillsPage() {
    const [filter, setFilter] = useState('all');

    const paidBills = mockBills.filter(b => b.status === 'paid');
    const upcomingBills = mockBills.filter(b => b.status === 'upcoming');
    const overdueBills = mockBills.filter(b => b.status === 'overdue');

    const upcomingTotal = upcomingBills.reduce((sum, b) => sum + b.amount, 0);
    const overdueTotal = overdueBills.reduce((sum, b) => sum + b.amount, 0);
    const autopayCount = mockBills.filter(b => b.autopay).length;

    const filteredBills = filter === 'all'
        ? mockBills
        : mockBills.filter(b => b.status === filter);

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Bills & Payments
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        {upcomingBills.length} bills due this month
                    </p>
                </div>
                <Button size="sm">
                    <Plus className="w-4 h-4" />
                    Add Bill
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-[var(--status-info)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Upcoming</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--text-primary)] text-financial">
                            {formatCurrency(upcomingTotal)}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">{upcomingBills.length} bills</p>
                    </Card>
                </motion.div>

                {overdueBills.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card variant="glass" padding="lg" className="border-[var(--status-error)]/30">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="w-4 h-4 text-[var(--status-error)]" />
                                <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Overdue</p>
                            </div>
                            <p className="text-2xl font-bold text-[var(--status-error)] text-financial">
                                {formatCurrency(overdueTotal)}
                            </p>
                            <p className="text-sm text-[var(--status-error)]">{overdueBills.length} bills</p>
                        </Card>
                    </motion.div>
                )}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Check className="w-4 h-4 text-[var(--status-success)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Paid</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--status-success)] text-financial">
                            {formatCurrency(paidBills.reduce((sum, b) => sum + b.amount, 0))}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">{paidBills.length} bills</p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <Card variant="luxury" padding="lg">
                        <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="w-4 h-4 text-[var(--accent-primary)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Auto-Pay</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--accent-primary)] text-financial">
                            {autopayCount}
                        </p>
                        <p className="text-sm text-[var(--text-muted)]">bills on autopay</p>
                    </Card>
                </motion.div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
                {['all', 'upcoming', 'overdue', 'paid'].map((status) => (
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

            {/* Bills List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card variant="glass" padding="none">
                    <div className="divide-y divide-[var(--glass-border)]">
                        {filteredBills.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-[var(--text-muted)]">No bills found</p>
                            </div>
                        ) : (
                            filteredBills.map((bill, index) => {
                                const statusStyle = statusColors[bill.status as keyof typeof statusColors];
                                const StatusIcon = statusStyle.icon;
                                const Icon = bill.icon;
                                const daysUntil = getDaysUntil(bill.dueDate);

                                return (
                                    <motion.div
                                        key={bill.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.05 }}
                                        className="flex items-center justify-between p-4 hover:bg-[var(--glass-hover)] transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusStyle.bg}`}>
                                                <Icon className={`w-6 h-6 ${statusStyle.text}`} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-[var(--text-primary)]">{bill.name}</p>
                                                    {bill.autopay && (
                                                        <span className="px-2 py-0.5 text-xs bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded-full">
                                                            Auto-pay
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-[var(--text-muted)]">
                                                    {bill.category} • Due {formatDate(bill.dueDate)}
                                                    {bill.status === 'upcoming' && daysUntil > 0 && (
                                                        <span> • {daysUntil} days left</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusStyle.bg}`}>
                                                <StatusIcon className={`w-3.5 h-3.5 ${statusStyle.text}`} />
                                                <span className={`text-xs font-medium capitalize ${statusStyle.text}`}>
                                                    {bill.status}
                                                </span>
                                            </div>

                                            <p className="font-bold text-[var(--text-primary)] text-financial w-24 text-right">
                                                {formatCurrency(bill.amount)}
                                            </p>

                                            {bill.status !== 'paid' && (
                                                <Button size="sm" variant={bill.status === 'overdue' ? 'primary' : 'glass'}>
                                                    Pay Now
                                                </Button>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
