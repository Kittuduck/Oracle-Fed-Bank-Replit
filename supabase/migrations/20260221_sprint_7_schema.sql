-- PHASE 2: SPRINT 7 SCHEMA MIGRATION
-- CREATED: 2026-02-21

-- 1. DYNAMIC THEMES
CREATE TABLE IF NOT EXISTS public.dynamic_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_name TEXT UNIQUE NOT NULL, -- 'DIWALI', 'ONAM', 'NEW_YEAR'
  config JSONB NOT NULL, -- Stores CSS variables and asset URLs
  is_active BOOLEAN DEFAULT FALSE,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.dynamic_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view active themes."
  ON public.dynamic_themes FOR SELECT
  USING (is_active = TRUE);

-- 2. CHEQUE REQUESTS (Stop Cheque)
CREATE TABLE IF NOT EXISTS public.cheque_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  cheque_number_start TEXT NOT NULL,
  cheque_number_end TEXT,
  request_type TEXT NOT NULL CHECK (request_type IN ('STOP_PAYMENT', 'BOOK_REQUISITION')),
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSED', 'REJECTED')),
  legal_disclaimer_accepted BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.cheque_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own cheque requests."
  ON public.cheque_requests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own cheque requests."
  ON public.cheque_requests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3. BANK OFFERS (Growth Engine)
CREATE TABLE IF NOT EXISTS public.bank_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  merchant_name TEXT,
  category TEXT CHECK (category IN ('TRAVEL', 'DINING', 'SHOPPING', 'HEALTH')),
  discount_code TEXT,
  image_url TEXT,
  target_card_code TEXT REFERENCES public.cards(card_code), -- Optional restriction
  expiry_date DATE,
  is_personalized BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES auth.users(id), -- Null if generic
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.bank_offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view relevant offers."
  ON public.bank_offers FOR SELECT
  USING (user_id IS NULL OR user_id = auth.uid());

-- 4. UPDATES TO LOAN_APPLICATIONS
-- Already created public.loans, but for Niche Hub we need application details
CREATE TABLE IF NOT EXISTS public.loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  loan_type TEXT NOT NULL CHECK (loan_type IN ('PERSONAL', 'HOME', 'CAR', 'GOLD', 'BUSINESS', 'LAS')),
  requested_amount NUMERIC NOT NULL,
  collateral_details JSONB, -- For Gold/LAS
  status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (status IN ('SUBMITTED', 'SANCTIONED_DIGITALLY', 'PENDING_PHYSICAL', 'APPROVED', 'REJECTED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own applications."
  ON public.loan_applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit applications."
  ON public.loan_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);
