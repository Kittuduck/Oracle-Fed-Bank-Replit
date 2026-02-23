-- PHASE 2: INITIAL SCHEMA MIGRATION
-- CREATED: 2026-02-21

-- ENABLE RLS ON ALL TABLES
-- 1. PROFILES (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  risk_profile TEXT DEFAULT 'Moderate',
  mpin_hash TEXT,
  biometric_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. ACCOUNTS
CREATE TABLE IF NOT EXISTS public.accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_number TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('SAVINGS', 'FIXED_DEPOSIT')),
  balance NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'FROZEN')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own accounts."
  ON public.accounts FOR SELECT
  USING (auth.uid() = user_id);

-- 3. TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('DEBIT', 'CREDIT')),
  category TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view transactions for their own accounts."
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.accounts 
      WHERE public.accounts.id = public.transactions.account_id 
      AND public.accounts.user_id = auth.uid()
    )
  );

-- 4. CARDS
CREATE TABLE IF NOT EXISTS public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_number TEXT UNIQUE NOT NULL,
  card_code TEXT NOT NULL CHECK (card_code IN ('CELESTA', 'IMPERIO', 'SIGNET')),
  expiry DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'BLOCKED', 'FROZEN')),
  settings JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own cards."
  ON public.cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own card settings."
  ON public.cards FOR UPDATE
  USING (auth.uid() = user_id);

-- 5. LOANS
CREATE TABLE IF NOT EXISTS public.loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  loan_type TEXT NOT NULL CHECK (loan_type IN ('PERSONAL', 'HOME', 'CAR')),
  principal NUMERIC NOT NULL,
  interest_rate NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'DISBURSED' CHECK (status IN ('DISBURSED', 'REPAID')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own loans."
  ON public.loans FOR SELECT
  USING (auth.uid() = user_id);

-- TRIGGER FOR NEW USER PROFILE
-- Automatically create a profile record when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
