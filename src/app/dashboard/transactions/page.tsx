'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    Filter,
    Download,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    ShoppingBag,
    Home,
    Car,
    Utensils,
    Zap,
    Heart,
    Briefcase,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';

// Mock transactions
const mockTransactions = [
    { id: 1, name: 'Whole Foods Market', amount: -127.50, category: 'Groceries', date: '2026-01-07', account: 'Chase Checking', pending: false },
    { id: 2, name: 'Shell Gas Station', amount: -58.00, category: 'Transportation', date: '2026-01-07', account: 'Chase Sapphire', pending: false },
    { id: 3, name: 'Paycheck - TechCorp Inc', amount: 5200.00, category: 'Income', date: '2026-01-06', account: 'Chase Checking', pending: false },
    { id: 4, name: 'Netflix', amount: -15.99, category: 'Entertainment', date: '2026-01-06', account: 'Amex Platinum', pending: false },
    { id: 5, name: 'Amazon', amount: -89.99, category: 'Shopping', date: '2026-01-05', account: 'Chase Sapphire', pending: false },
    { id: 6, name: 'Uber Eats', amount: -32.50, category: 'Food & Drink', date: '2026-01-05', account: 'Chase Checking', pending: true },
    { id: 7, name: 'Con Edison', amount: -125.00, category: 'Utilities', date: '2026-01-04', account: 'Chase Checking', pending: false },
    { id: 8, name: 'Gym Membership', amount: -50.00, category: 'Health', date: '2026-01-04', account: 'Chase Sapphire', pending: false },
    { id: 9, name: 'Client Payment - ABC Corp', amount: 2500.00, category: 'Income', date: '2026-01-03', account: 'Chase Checking', pending: false },
    { id: 10, name: 'Spotify', amount: -9.99, category: 'Entertainment', date: '2026-01-03', account: 'Amex Platinum', pending: false },
    { id: 11, name: 'Target', amount: -156.78, category: 'Shopping', date: '2026-01-02', account: 'Chase Sapphire', pending: false },
    { id: 12, name: 'Rent Payment', amount: -2500.00, category: 'Housing', date: '2026-01-01', account: 'Chase Checking', pending: false },
];

const categories = [
    { name: 'All', icon: MoreHorizontal },
    { name: 'Income', icon: ArrowUpRight },
    { name: 'Groceries', icon: ShoppingBag },
    { name: 'Shopping', icon: CreditCard },
    { name: 'Food & Drink', icon: Utensils },
    { name: 'Transportation', icon: Car },
    { name: 'Utilities', icon: Zap },
    { name: 'Housing', icon: Home },
    { name: 'Health', icon: Heart },
    { name: 'Entertainment', icon: Briefcase },
];

const categoryColors: Record<string, string> = {
    'Income': 'text-[var(--status-success)]',
    'Groceries': 'text-green-400',
    'Shopping': 'text-purple-400',
    'Food & Drink': 'text-orange-400',
    'Transportation': 'text-blue-400',
    'Utilities': 'text-yellow-400',
    'Housing': 'text-red-400',
    'Health': 'text-pink-400',
    'Entertainment': 'text-indigo-400',
};

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(Math.abs(amount));
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter transactions
    const filteredTransactions = mockTransactions.filter(tx => {
        const matchesSearch = tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || tx.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const paginatedTransactions = filteredTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calculate summary stats
    const totalIncome = mockTransactions.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpenses = mockTransactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                        Transactions
                    </h1>
                    <p className="text-[var(--text-secondary)] mt-1">
                        {filteredTransactions.length} transactions this month
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="glass" size="sm">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-2">
                            <ArrowUpRight className="w-5 h-5 text-[var(--status-success)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Income</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--status-success)] text-financial">
                            +{formatCurrency(totalIncome)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Card variant="glass" padding="lg">
                        <div className="flex items-center gap-3 mb-2">
                            <ArrowDownRight className="w-5 h-5 text-[var(--status-error)]" />
                            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider">Expenses</p>
                        </div>
                        <p className="text-2xl font-bold text-[var(--status-error)] text-financial">
                            -{formatCurrency(totalExpenses)}
                        </p>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Card variant="luxury" padding="lg">
                        <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-2">Net Cash Flow</p>
                        <p className={`text-2xl font-bold text-financial ${totalIncome - totalExpenses >= 0 ? 'text-[var(--status-success)]' : 'text-[var(--status-error)]'}`}>
                            {totalIncome - totalExpenses >= 0 ? '+' : '-'}{formatCurrency(Math.abs(totalIncome - totalExpenses))}
                        </p>
                    </Card>
                </motion.div>
            </div>

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                    {categories.slice(0, 6).map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat.name
                                    ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--glass-hover)]'
                                }`}
                        >
                            <cat.icon className="w-4 h-4" />
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Transactions List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card variant="glass" padding="none">
                    <div className="divide-y divide-[var(--glass-border)]">
                        {paginatedTransactions.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-[var(--text-muted)]">No transactions found</p>
                            </div>
                        ) : (
                            paginatedTransactions.map((tx, index) => (
                                <motion.div
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-center justify-between p-4 hover:bg-[var(--glass-hover)] transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-[var(--status-success)]/10' : 'bg-[var(--bg-elevated)]'
                                            }`}>
                                            {tx.amount > 0 ? (
                                                <ArrowUpRight className="w-5 h-5 text-[var(--status-success)]" />
                                            ) : (
                                                <CreditCard className="w-5 h-5 text-[var(--text-muted)]" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-[var(--text-primary)]">{tx.name}</p>
                                                {tx.pending && (
                                                    <span className="px-2 py-0.5 text-xs bg-[var(--status-warning)]/10 text-[var(--status-warning)] rounded-full">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-[var(--text-muted)]">
                                                <span className={categoryColors[tx.category] || 'text-[var(--text-muted)]'}>{tx.category}</span>
                                                {' • '}{tx.account}{' • '}{formatDate(tx.date)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className={`font-bold text-financial ${tx.amount > 0 ? 'text-[var(--status-success)]' : 'text-[var(--text-primary)]'}`}>
                                        {tx.amount > 0 ? '+' : '-'}{formatCurrency(tx.amount)}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between p-4 border-t border-[var(--glass-border)]">
                            <p className="text-sm text-[var(--text-muted)]">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </motion.div>
        </div>
    );
}
