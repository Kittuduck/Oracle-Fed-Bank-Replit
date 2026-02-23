# Phase 2: Backend Architecture & Supabase Migration Spec

## 1. Overview
In Phase 2, we migrate from a frontend-only simulation to a production-ready cloud backend using **Supabase**. This provides a relational Postgres database, built-in Auth, and secure serverless Edge Functions for sensitive AI orchestrations.

## 2. Database Schema (Entity-Relationship)

### 2.1 Users & Auth
Extends `auth.users` via a `public.profiles` table.

| Table: `profiles` | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | Links to `auth.users` |
| `full_name` | text | Legal name from KYC |
| `avatar_url` | text | User profile image |
| `risk_profile` | text | Aggressive, Moderate, Conservative |
| `mpin_hash` | text | Hashed 6-digit pin |
| `biometric_id` | text | Optional device linkage |

### 2.2 Financial Core
| Table: `accounts` | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `user_id` | uuid (FK) | Owner |
| `account_number` | text (UQ) | Masked/Full reference |
| `type` | text | SAVINGS, FIXED_DEPOSIT |
| `balance` | numeric | Current balance |
| `status` | text | ACTIVE, FROZEN |

| Table: `transactions` | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `account_id` | uuid (FK) | Originating account |
| `amount` | numeric | |
| `type` | text | DEBIT, CREDIT |
| `category` | text | FOOD, TRAVEL, BILLS, etc. |
| `description` | text | Narrative |
| `created_at` | timestamp | |

### 2.3 Cards & Loans
| Table: `cards` | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `user_id` | uuid (FK) | |
| `card_number` | text (UQ) | Masked |
| `card_code` | text | CELESTA, IMPERIO, SIGNET |
| `expiry` | date | |
| `status` | text | ACTIVE, BLOCKED, FROZEN |
| `settings` | jsonb | Toggles for Online/Intl/Contactless |

| Table: `loans` | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid (PK) | |
| `user_id` | uuid (FK) | |
| `loan_type` | text | PERSONAL, HOME, CAR |
| `principal` | numeric | |
| `interest_rate` | numeric | |
| `status` | text | DISBURSED, REPAID |

## 3. Security & Access Control (Row Level Security)

RLS policies will ensure users can ONLY access their own data.

```sql
-- Example RLS for Accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own accounts."
  ON public.accounts FOR SELECT
  USING (auth.uid() = user_id);

-- Example RLS for Transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transaction history."
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.accounts 
      WHERE public.accounts.id = public.transactions.account_id 
      AND public.accounts.user_id = auth.uid()
    )
  );
```

## 4. AI Orchestration via Edge Functions

To protect AI prompt logic and API keys, we migrate `geminiService.ts` calls to Supabase Edge Functions (Deno).

### 4.1 Flow:
1. **Frontend:** Calls `supabase.functions.invoke('oracle-insight', { body: { context } })`.
2. **Edge Function:** 
   - Validates user JWT.
   - Fetches recent transactions from DB (private).
   - Calls Gemini API using `PROD_GEMINI_API_KEY` stored in Supabase Secrets.
   - Returns structured JSON to the frontend.

### 4.2 Benefits:
- **Security:** API keys never touch the client.
- **Privacy:** User spend data is fetched server-side within the VPC.
- **Latency:** Edge execution close to users.

## 5. Migration Roadmap
1. **Sprint 6:** Setup Supabase project, define schemas, and implement basic Auth.
2. **Sprint 7:** Data migration - move simulated initial state to Postgres.
3. **Sprint 8:** API replacement - refactor `App.tsx` and components to use Supabase client.
4. **Sprint 9:** AI Hardening - Deploy Edge Functions for Oracle Insights.
