'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    Target,
    PiggyBank,
    Receipt,
    CreditCard,
    TrendingUp,
    FileText,
    Settings,
    LogOut,
    Menu,
    X,
    Brain,
    ChevronDown,
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase/client';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Accounts', href: '/dashboard/accounts', icon: Wallet },
    { name: 'Transactions', href: '/dashboard/transactions', icon: ArrowLeftRight },
    { name: 'Budgets', href: '/dashboard/budgets', icon: PiggyBank },
    { name: 'Goals', href: '/dashboard/goals', icon: Target },
    { name: 'Subscriptions', href: '/dashboard/subscriptions', icon: CreditCard },
    { name: 'Bills', href: '/dashboard/bills', icon: Receipt },
    { name: 'Investments', href: '/dashboard/investments', icon: TrendingUp },
    { name: 'Reports', href: '/dashboard/reports', icon: FileText },
    { name: 'AI Insights', href: '/dashboard/insights', icon: Brain },
];

const bottomNav = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = getSupabaseClient();
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    const NavLink = ({ item }: { item: typeof navigation[0] }) => {
        const isActive = pathname === item.href;

        return (
            <Link
                href={item.href}
                className={`
          flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
          transition-all duration-200
          ${isActive
                        ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-l-2 border-[var(--accent-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-hover)]'
                    }
        `}
                onClick={() => setSidebarOpen(false)}
            >
                <item.icon className="w-5 h-5" />
                {item.name}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-[var(--bg-primary)]">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-[var(--glass-border)]">
                <div className="flex items-center justify-between px-4 py-3">
                    <Link href="/dashboard" className="text-xl font-bold gradient-text text-premium-display">
                        MoneyLoop
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-[var(--glass-hover)] text-[var(--text-secondary)]"
                    >
                        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[var(--bg-secondary)] border-r border-[var(--glass-border)] pt-16 overflow-y-auto"
                        >
                            <nav className="px-3 py-4 space-y-1">
                                {navigation.map((item) => (
                                    <NavLink key={item.name} item={item} />
                                ))}
                            </nav>
                            <div className="px-3 py-4 mt-4 border-t border-[var(--glass-border)] space-y-1">
                                {bottomNav.map((item) => (
                                    <NavLink key={item.name} item={item} />
                                ))}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--status-error)] hover:bg-[var(--status-error)]/10 transition-colors"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign Out
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[var(--bg-secondary)] border-r border-[var(--glass-border)] px-4 py-6">
                    {/* Logo */}
                    <div className="flex items-center px-2">
                        <Link href="/dashboard" className="text-2xl font-bold gradient-text text-premium-display">
                            MoneyLoop
                        </Link>
                    </div>

                    {/* Main Navigation */}
                    <nav className="flex flex-1 flex-col gap-1">
                        {navigation.map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                    </nav>

                    {/* Bottom Navigation */}
                    <div className="space-y-1 border-t border-[var(--glass-border)] pt-4">
                        {bottomNav.map((item) => (
                            <NavLink key={item.name} item={item} />
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--status-error)] hover:bg-[var(--status-error)]/10 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:pl-64">
                <div className="pt-16 lg:pt-0 min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
