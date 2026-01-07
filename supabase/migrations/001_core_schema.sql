-- MoneyLoop Core Database Schema
-- Run this migration in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- PROFILES TABLE (extends Supabase auth.users)
-- ================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'business', 'family')),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================================
-- INSTITUTIONS TABLE (Plaid connections)
-- ================================================
CREATE TABLE IF NOT EXISTS public.institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plaid_item_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  institution_id TEXT,
  institution_name TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'disconnected', 'error')),
  error_code TEXT,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_institutions_plaid_item ON public.institutions(plaid_item_id);
CREATE INDEX idx_institutions_user ON public.institutions(user_id);

CREATE TRIGGER update_institutions_updated_at
  BEFORE UPDATE ON public.institutions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own institutions" ON public.institutions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own institutions" ON public.institutions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own institutions" ON public.institutions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own institutions" ON public.institutions
  FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- ACCOUNTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  plaid_account_id TEXT,
  name TEXT NOT NULL,
  official_name TEXT,
  type TEXT NOT NULL, -- depository, investment, loan, credit, etc
  subtype TEXT,
  mask TEXT, -- last 4 digits
  current_balance DECIMAL(15, 2),
  available_balance DECIMAL(15, 2),
  currency TEXT DEFAULT 'USD',
  is_manual BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_accounts_user ON public.accounts(user_id);
CREATE INDEX idx_accounts_institution ON public.accounts(institution_id);
CREATE INDEX idx_accounts_plaid ON public.accounts(plaid_account_id);

CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own accounts" ON public.accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own accounts" ON public.accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own accounts" ON public.accounts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own accounts" ON public.accounts
  FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- TRANSACTIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  plaid_transaction_id TEXT,
  date DATE NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  merchant_name TEXT,
  name TEXT NOT NULL,
  category TEXT,
  category_id TEXT,
  subcategory TEXT,
  pending BOOLEAN DEFAULT FALSE,
  notes TEXT,
  is_manual BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_transactions_user ON public.transactions(user_id);
CREATE INDEX idx_transactions_account ON public.transactions(account_id);
CREATE INDEX idx_transactions_date ON public.transactions(date DESC);
CREATE UNIQUE INDEX idx_transactions_plaid ON public.transactions(plaid_transaction_id) WHERE plaid_transaction_id IS NOT NULL;

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- BUDGETS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.budgets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  period TEXT DEFAULT 'monthly' CHECK (period IN ('monthly', 'weekly', 'yearly')),
  spent_amount DECIMAL(15, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_budgets_user ON public.budgets(user_id);
CREATE UNIQUE INDEX idx_budgets_user_category ON public.budgets(user_id, category);

CREATE TRIGGER update_budgets_updated_at
  BEFORE UPDATE ON public.budgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.budgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own budgets" ON public.budgets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budgets" ON public.budgets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budgets" ON public.budgets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own budgets" ON public.budgets
  FOR DELETE USING (auth.uid() = user_id);

-- ================================================
-- GOALS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount DECIMAL(15, 2) NOT NULL,
  current_amount DECIMAL(15, 2) DEFAULT 0,
  target_date DATE,
  category TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_goals_user ON public.goals(user_id);

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own goals" ON public.goals
  FOR ALL USING (auth.uid() = user_id);

-- ================================================
-- SUBSCRIPTIONS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  billing_frequency TEXT DEFAULT 'monthly' CHECK (billing_frequency IN ('monthly', 'yearly', 'weekly')),
  next_billing_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'paused', 'trial')),
  category TEXT,
  usage_data JSONB,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'plaid', 'email')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own subscriptions" ON public.subscriptions
  FOR ALL USING (auth.uid() = user_id);

-- ================================================
-- BILLS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  biller_name TEXT NOT NULL,
  amount DECIMAL(15, 2) NOT NULL,
  due_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue', 'scheduled')),
  frequency TEXT DEFAULT 'monthly',
  payment_method TEXT,
  auto_pay_enabled BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bills_user ON public.bills(user_id);
CREATE INDEX idx_bills_due_date ON public.bills(due_date);

CREATE TRIGGER update_bills_updated_at
  BEFORE UPDATE ON public.bills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bills" ON public.bills
  FOR ALL USING (auth.uid() = user_id);

-- ================================================
-- AGENT ACTIONS TABLE (Audit Trail)
-- ================================================
CREATE TABLE IF NOT EXISTS public.agent_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_type TEXT NOT NULL, -- budget, bill, subscription, grocery, tax, investment, insights
  action_type TEXT NOT NULL, -- pay_bill, order_groceries, cancel_subscription, etc
  status TEXT DEFAULT 'proposed' CHECK (status IN ('proposed', 'approved', 'executed', 'failed', 'cancelled')),
  proposal_data JSONB,
  execution_result JSONB,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_actions_user ON public.agent_actions(user_id);
CREATE INDEX idx_agent_actions_status ON public.agent_actions(status);

CREATE TRIGGER update_agent_actions_updated_at
  BEFORE UPDATE ON public.agent_actions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent actions" ON public.agent_actions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own agent actions" ON public.agent_actions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own agent actions" ON public.agent_actions
  FOR UPDATE USING (auth.uid() = user_id);

-- ================================================
-- ALERTS TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL, -- pattern, threshold, opportunity, predictive, comparative, goal
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical', 'success')),
  action_url TEXT,
  dismissed BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_alerts_user ON public.alerts(user_id);
CREATE INDEX idx_alerts_dismissed ON public.alerts(user_id, dismissed);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own alerts" ON public.alerts
  FOR ALL USING (auth.uid() = user_id);

-- ================================================
-- BALANCE HISTORY TABLE (Net Worth Tracking)
-- ================================================
CREATE TABLE IF NOT EXISTS public.balance_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_assets DECIMAL(15, 2) DEFAULT 0,
  total_liabilities DECIMAL(15, 2) DEFAULT 0,
  net_worth DECIMAL(15, 2) DEFAULT 0,
  breakdown JSONB, -- category-level breakdown
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_balance_history_user ON public.balance_history(user_id);
CREATE INDEX idx_balance_history_date ON public.balance_history(user_id, date DESC);
CREATE UNIQUE INDEX idx_balance_history_user_date ON public.balance_history(user_id, date);

ALTER TABLE public.balance_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own balance history" ON public.balance_history
  FOR ALL USING (auth.uid() = user_id);
