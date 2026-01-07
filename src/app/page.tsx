'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  Brain,
  CreditCard,
  PiggyBank,
  ArrowRight,
  Check,
  Sparkles,
  Lock,
  Eye,
  BarChart3,
  Wallet,
  Bell,
  RefreshCw,
} from 'lucide-react';
import { Button, Card } from '@/components/ui';

// Rotating hero backgrounds
const heroBackgrounds = [
  '/images/hero-bg-1.png',
  '/images/hero-bg-2.png',
  '/images/hero-bg-3.png',
];

const features = [
  {
    icon: Brain,
    title: 'AI Financial Agent',
    description: 'An intelligent agent that learns your patterns and takes action with your approval.',
    highlight: 'Powered by Claude AI',
  },
  {
    icon: Eye,
    title: 'Complete Visibility',
    description: 'Every bank account, credit card, investment, and subscription in one unified view.',
    highlight: '12,000+ Institutions',
  },
  {
    icon: Zap,
    title: 'Automated Actions',
    description: 'Bill payments, subscription management, and grocery orders—fully automated.',
    highlight: 'Save 5+ Hours/Month',
  },
  {
    icon: BarChart3,
    title: 'Behavioral Insights',
    description: 'Eye-opening alerts reveal where your money really goes and how to save more.',
    highlight: 'Real-time Analytics',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Get notified before you overspend, when bills are due, and when unusual activity occurs.',
    highlight: 'Predictive Warnings',
  },
  {
    icon: Lock,
    title: 'Bank-Level Security',
    description: '256-bit encryption, SOC 2 Type II certified, with read-only account access.',
    highlight: 'GDPR Compliant',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Startup Founder',
    quote: 'MoneyLoop saved me $2,400 in the first month by finding subscriptions I forgot about.',
    avatar: '👩‍💼',
  },
  {
    name: 'Marcus Johnson',
    role: 'Financial Analyst',
    quote: "The AI insights are incredible. It's like having a personal CFO in my pocket.",
    avatar: '👨‍💻',
  },
  {
    name: 'Emily Roberts',
    role: 'Small Business Owner',
    quote: 'Finally, one place to see both my personal and business finances clearly.',
    avatar: '👩‍🔧',
  },
];

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential tracking for individuals',
    features: [
      '15 connected accounts',
      'Net worth tracking',
      'Basic categorization',
      '5 AI queries/month',
      'Monthly reports',
      'Bill reminders',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$29',
    period: '/month',
    description: 'Full automation and unlimited AI',
    features: [
      'Unlimited accounts',
      'Unlimited AI agent queries',
      'Automated bill payments',
      'Grocery list & ordering',
      'Subscription optimization',
      'Tax preparation tools',
      'Advanced budgeting',
      'Priority support',
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
  },
  {
    name: 'Family',
    price: '$69',
    period: '/month',
    description: 'Complete family financial control',
    features: [
      'Everything in Premium',
      'Up to 10 family members',
      'Shared and individual views',
      'Family goal collaboration',
      'Allowance management',
      'Estate planning tools',
      'Dedicated account manager',
    ],
    cta: 'Start Family Trial',
    popular: false,
  },
];

const trustBadges = [
  { icon: ShieldCheck, label: '256-bit Encryption' },
  { icon: Lock, label: 'SOC 2 Type II' },
  { icon: Eye, label: 'Read-Only Access' },
  { icon: ShieldCheck, label: 'GDPR Compliant' },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '$2.4B', label: 'Assets Tracked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9★', label: 'App Rating' },
];

export default function HomePage() {
  const [currentBg, setCurrentBg] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Rotate background every 8 seconds
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Rotating Hero Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroBackgrounds[currentBg]}
              alt=""
              fill
              priority
              className="object-cover object-center"
              style={{ filter: 'brightness(0.4)' }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)]/60 via-transparent to-[var(--bg-primary)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[var(--bg-primary)]/70 border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-[var(--bg-primary)]" />
            </div>
            <span className="text-2xl font-bold text-[var(--text-primary)] text-premium-display">
              MoneyLoop
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium">
              Features
            </Link>
            <Link href="#security" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium">
              Security
            </Link>
            <Link href="#pricing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium">
              Pricing
            </Link>
            <Link href="/login" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm font-medium">
              Sign In
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--accent-primary)]/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="text-sm text-[var(--accent-primary)] font-medium tracking-wide">
                AI-Powered Financial Intelligence
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--text-primary)] leading-[1.1] mb-8 text-premium-display">
              Your Money.{' '}
              <span className="gradient-text">Your Control.</span>
            </h1>

            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed">
              The AI-powered command center that sees everything, automates everything, and keeps your financial future secure.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/signup">
                <Button size="lg" className="px-10 py-4 text-lg">
                  Start Free Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="glass" size="lg" className="px-10 py-4 text-lg">
                  See How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  <badge.icon className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] text-financial mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-[var(--bg-primary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 text-premium-display">
              Everything You Need to{' '}
              <span className="gradient-text">Master Your Money</span>
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              From tracking to automation, MoneyLoop handles everything so you can focus on living.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" hover className="h-full relative overflow-hidden group">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] text-xs font-medium rounded-bl-lg">
                    {feature.highlight}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-[var(--accent-primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 text-premium-display">
                Your Security is{' '}
                <span className="gradient-text">Non-Negotiable</span>
              </h2>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                We use the same encryption and security protocols as major banks. Your data never leaves our secure infrastructure, and we never store your login credentials.
              </p>

              <div className="space-y-4">
                {[
                  { title: '256-bit AES Encryption', desc: 'Bank-grade encryption protects all your data at rest and in transit.' },
                  { title: 'SOC 2 Type II Certified', desc: 'Independently audited security controls and processes.' },
                  { title: 'Read-Only Access', desc: 'We can only view your data—we can never move your money.' },
                  { title: 'Biometric Authentication', desc: 'Face ID and fingerprint support for secure, instant access.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-[var(--accent-primary)]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)]">{item.title}</h4>
                      <p className="text-sm text-[var(--text-muted)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card variant="luxury" padding="lg" className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                  <ShieldCheck className="w-12 h-12 text-[var(--bg-primary)]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                  Bank-Level Protection
                </h3>
                <p className="text-[var(--text-secondary)] max-w-sm mx-auto">
                  Your sensitive financial information is protected by the same security standards used by the world's largest financial institutions.
                </p>
                <div className="flex justify-center gap-8 mt-8">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--accent-primary)]">0</p>
                    <p className="text-xs text-[var(--text-muted)]">Data Breaches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--accent-primary)]">24/7</p>
                    <p className="text-xs text-[var(--text-muted)]">Monitoring</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[var(--accent-primary)]">100%</p>
                    <p className="text-xs text-[var(--text-muted)]">Encrypted</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 text-premium-display">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-[var(--text-secondary)]">
              See why people love managing their money with MoneyLoop.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="h-full">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <p className="text-[var(--text-primary)] mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 text-premium-display">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <span className="px-4 py-1.5 text-xs font-semibold text-[var(--bg-primary)] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full uppercase tracking-wider shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <Card
                  variant={tier.popular ? 'luxury' : 'glass'}
                  padding="lg"
                  className={`h-full ${tier.popular ? 'ring-2 ring-[var(--accent-primary)]/50' : ''}`}
                >
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm mb-6">
                      {tier.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-[var(--text-primary)] text-financial">
                        {tier.price}
                      </span>
                      <span className="text-[var(--text-muted)]">{tier.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                        <span className="text-[var(--text-secondary)] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/signup" className="block">
                    <Button
                      variant={tier.popular ? 'primary' : 'glass'}
                      className="w-full"
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card variant="luxury" padding="lg" className="text-center py-20 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-[var(--accent-secondary)]/5" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 text-premium-display">
                  Ready to Take Control?
                </h2>
                <p className="text-xl text-[var(--text-secondary)] max-w-xl mx-auto mb-10">
                  Join thousands who've discovered where their money really goes—and how to keep more of it.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="px-12 py-4 text-lg">
                    Start Your Free Account
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <p className="mt-6 text-sm text-[var(--text-muted)]">
                  Free forever • No credit card required • Setup in 2 minutes
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[var(--glass-border)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-[var(--bg-primary)]" />
                </div>
                <span className="text-2xl font-bold text-[var(--text-primary)] text-premium-display">
                  MoneyLoop
                </span>
              </Link>
              <p className="text-[var(--text-muted)] max-w-sm mb-6">
                The AI-powered financial command center that gives you complete visibility and control over your money.
              </p>
              <div className="flex gap-3">
                {trustBadges.slice(0, 3).map((badge) => (
                  <div key={badge.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                    <badge.icon className="w-3 h-3 text-[var(--accent-primary)]" />
                    <span className="text-xs text-[var(--text-muted)]">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#features" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Pricing</Link></li>
                <li><Link href="#security" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Security</Link></li>
                <li><Link href="/dashboard" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[var(--text-primary)] mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Terms of Service</Link></li>
                <li><Link href="/security" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Security</Link></li>
                <li><Link href="/support" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--text-muted)]">
              © 2026 MoneyLoop. All rights reserved.
            </p>
            <p className="text-sm text-[var(--text-muted)]">
              Made with 💚 for your financial freedom
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
