'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Shield,
    Bell,
    Palette,
    CreditCard,
    Smartphone,
    Mail,
    Key,
    LogOut,
    ChevronRight,
    Check,
    Moon,
    Sun,
    Globe,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@/components/ui';

const settingsSections = [
    {
        id: 'profile',
        title: 'Profile',
        icon: User,
        description: 'Manage your personal information',
    },
    {
        id: 'security',
        title: 'Security',
        icon: Shield,
        description: 'Password, 2FA, and login settings',
    },
    {
        id: 'notifications',
        title: 'Notifications',
        icon: Bell,
        description: 'Email, push, and alert preferences',
    },
    {
        id: 'appearance',
        title: 'Appearance',
        icon: Palette,
        description: 'Theme, display, and accessibility',
    },
    {
        id: 'billing',
        title: 'Subscription & Billing',
        icon: CreditCard,
        description: 'Plan, payment methods, and invoices',
    },
    {
        id: 'connected',
        title: 'Connected Apps',
        icon: Smartphone,
        description: 'Third-party apps and integrations',
    },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
    };

    return (
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] text-premium-display">
                    Settings
                </h1>
                <p className="text-[var(--text-secondary)] mt-1">
                    Manage your account and preferences
                </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card variant="glass" padding="none">
                        <nav className="divide-y divide-[var(--glass-border)]">
                            {settingsSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${activeSection === section.id
                                            ? 'bg-[var(--accent-primary)]/10'
                                            : 'hover:bg-[var(--glass-hover)]'
                                        }`}
                                >
                                    <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                                        }`} />
                                    <div className="flex-1">
                                        <p className={`font-medium ${activeSection === section.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
                                            }`}>
                                            {section.title}
                                        </p>
                                        <p className="text-xs text-[var(--text-muted)]">{section.description}</p>
                                    </div>
                                    {activeSection === section.id && (
                                        <div className="w-1 h-8 bg-[var(--accent-primary)] rounded-full" />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </Card>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-3xl font-bold text-[var(--bg-primary)]">
                                            S
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)]">Sam Sweilem</p>
                                            <p className="text-sm text-[var(--text-muted)]">sam.sweilem85@gmail.com</p>
                                            <Button variant="ghost" size="sm" className="mt-2">
                                                Change Photo
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <Input label="First Name" defaultValue="Sam" />
                                        <Input label="Last Name" defaultValue="Sweilem" />
                                        <Input label="Email" type="email" defaultValue="sam.sweilem85@gmail.com" />
                                        <Input label="Phone" type="tel" defaultValue="+1 (555) 123-4567" />
                                    </div>

                                    <div className="flex justify-end">
                                        <Button onClick={handleSave} loading={saving}>
                                            <Check className="w-4 h-4" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Security Section */}
                    {activeSection === 'security' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Password</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Input label="Current Password" type="password" />
                                    <Input label="New Password" type="password" />
                                    <Input label="Confirm New Password" type="password" />
                                    <Button>Update Password</Button>
                                </CardContent>
                            </Card>

                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Two-Factor Authentication</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[var(--text-primary)]">Authenticator App</p>
                                            <p className="text-sm text-[var(--text-muted)]">Use an authenticator app for additional security</p>
                                        </div>
                                        <Button variant="glass">Enable 2FA</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="glass" padding="lg" className="border-[var(--status-error)]/30">
                                <CardHeader>
                                    <CardTitle className="text-[var(--status-error)]">Danger Zone</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[var(--text-primary)]">Delete Account</p>
                                            <p className="text-sm text-[var(--text-muted)]">Permanently delete your account and all data</p>
                                        </div>
                                        <Button variant="danger">Delete Account</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Email Notifications</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { label: 'Weekly Summary', desc: 'Receive a weekly digest of your finances' },
                                        { label: 'Bill Reminders', desc: 'Get notified before bills are due' },
                                        { label: 'Unusual Activity', desc: 'Alerts for unusual transactions' },
                                        { label: 'AI Insights', desc: 'New recommendations from your AI assistant' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between py-2">
                                            <div>
                                                <p className="text-[var(--text-primary)]">{item.label}</p>
                                                <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-[var(--bg-elevated)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-primary)]"></div>
                                            </label>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Appearance Section */}
                    {activeSection === 'appearance' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Theme</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4">
                                        {[
                                            { name: 'Dark', icon: Moon, active: true },
                                            { name: 'Light', icon: Sun, active: false },
                                            { name: 'System', icon: Globe, active: false },
                                        ].map((theme) => (
                                            <button
                                                key={theme.name}
                                                className={`flex-1 p-4 rounded-xl border ${theme.active
                                                        ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/10'
                                                        : 'border-[var(--glass-border)] hover:border-[var(--text-muted)]'
                                                    } transition-colors`}
                                            >
                                                <theme.icon className={`w-6 h-6 mx-auto mb-2 ${theme.active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                                                    }`} />
                                                <p className={`text-sm font-medium ${theme.active ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
                                                    }`}>
                                                    {theme.name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Currency & Locale</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            Currency
                                        </label>
                                        <select className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]">
                                            <option>USD - US Dollar</option>
                                            <option>EUR - Euro</option>
                                            <option>GBP - British Pound</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            Date Format
                                        </label>
                                        <select className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]">
                                            <option>MM/DD/YYYY</option>
                                            <option>DD/MM/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Billing Section */}
                    {activeSection === 'billing' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card variant="luxury" padding="lg">
                                <CardHeader>
                                    <CardTitle>Current Plan</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold text-[var(--text-primary)]">Premium</p>
                                            <p className="text-[var(--text-muted)]">$29/month • Next billing: Feb 7, 2026</p>
                                        </div>
                                        <Button variant="glass">Manage Plan</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Payment Method</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-elevated)]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-8 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-xs font-bold">
                                                VISA
                                            </div>
                                            <div>
                                                <p className="font-medium text-[var(--text-primary)]">•••• •••• •••• 4242</p>
                                                <p className="text-sm text-[var(--text-muted)]">Expires 12/27</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">Edit</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {/* Connected Apps Section */}
                    {activeSection === 'connected' && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <Card variant="glass" padding="lg">
                                <CardHeader>
                                    <CardTitle>Connected Banks</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {['Chase', 'Bank of America', 'Fidelity'].map((bank) => (
                                        <div key={bank} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-elevated)]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-[var(--accent-primary)]">{bank[0]}</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-[var(--text-primary)]">{bank}</p>
                                                    <p className="text-sm text-[var(--status-success)]">Connected</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">Disconnect</Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
