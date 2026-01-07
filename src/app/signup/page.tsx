'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button, Input, Card } from '@/components/ui';
import { getSupabaseClient } from '@/lib/supabase/client';

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const passwordStrength = () => {
        const { password } = formData;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const strengthColors = ['', 'bg-[var(--status-error)]', 'bg-[var(--status-warning)]', 'bg-[var(--status-warning)]', 'bg-[var(--status-success)]', 'bg-[var(--status-success)]'];
    const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const supabase = getSupabaseClient();

            const { error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (authError) throw authError;

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        const supabase = getSupabaseClient();
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="fixed inset-0 -z-10">
                    <div className="absolute inset-0 bg-[var(--bg-primary)]" />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center">
                        <Check className="w-8 h-8 text-[var(--accent-primary)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Check your email</h2>
                    <p className="text-[var(--text-secondary)] max-w-sm">
                        We&apos;ve sent a confirmation link to <strong>{formData.email}</strong>.
                        Click the link to activate your account.
                    </p>
                    <Link href="/login">
                        <Button variant="glass" className="mt-6">
                            Back to Login
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 py-12">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[var(--bg-primary)]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent-primary)] opacity-[0.03] blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--accent-secondary)] opacity-[0.03] blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-bold gradient-text text-premium-display">
                            MoneyLoop
                        </h1>
                    </Link>
                    <p className="text-[var(--text-secondary)] mt-2">
                        Create your free account
                    </p>
                </div>

                <Card variant="glass" padding="lg">
                    <form onSubmit={handleSignup} className="space-y-5">
                        {error && (
                            <div className="p-3 rounded-lg bg-[var(--status-error)]/10 border border-[var(--status-error)]/20">
                                <p className="text-sm text-[var(--status-error)]">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <Input
                                    type="text"
                                    label="First Name"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    required
                                />
                                <User className="absolute right-4 top-[42px] w-4 h-4 text-[var(--text-muted)]" />
                            </div>
                            <div className="relative">
                                <Input
                                    type="text"
                                    label="Last Name"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <Input
                                type="email"
                                label="Email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                            <Mail className="absolute right-4 top-[42px] w-4 h-4 text-[var(--text-muted)]" />
                        </div>

                        <div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    label="Password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[42px] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors ${level <= passwordStrength() ? strengthColors[passwordStrength()] : 'bg-[var(--bg-elevated)]'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)]">
                                        Password strength: {strengthLabels[passwordStrength()]}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="text-sm text-[var(--text-secondary)]">
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input type="checkbox" required className="mt-1 rounded border-[var(--glass-border)] bg-[var(--bg-secondary)]" />
                                <span>
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-[var(--accent-primary)] hover:underline">Terms of Service</Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="text-[var(--accent-primary)] hover:underline">Privacy Policy</Link>
                                </span>
                            </label>
                        </div>

                        <Button type="submit" className="w-full" loading={loading}>
                            Create Account
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--glass-border)]" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button variant="secondary" onClick={handleGoogleSignup} className="w-full">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </Button>
                </Card>

                <p className="text-center text-[var(--text-secondary)] mt-6 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[var(--accent-primary)] hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
