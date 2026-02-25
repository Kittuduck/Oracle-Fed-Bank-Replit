# Oracle Federal Bank

## Overview
A premium, AI-first multi-persona banking application for Federal Bank called "Oracle." Built with React, Vite, TypeScript, and Tailwind CSS. Features a Cred-style UI with light mode default, persona-based dynamic dashboards, and Oracle AI intelligence.

## Recent Changes
- 2026-02-25: Added Pre-Approved Personal Loan Journey ("Travel Bridge") within Oracle AI chat. 5-phase conversational flow: Financial Gap Analysis → Pre-Approved Offer (with CIBIL consent) → Interactive Loan Modeler (sliders for amount/tenure, real-time EMI) → Digital Compliance (Terms, Aadhaar e-Sign OTP, e-NACH mandate) → Disbursement with confetti animation. Persona-aware trip destinations and costs. Triggered by trip/travel keywords in Oracle chat. Custom range slider styling added to index.css.
- 2026-02-24: Removed "Your Features" section from dashboard. Added "Recent Transactions" showing 3 persona-specific transactions with Show All button. Created TransactionsPage with search, filter (All/Income/Expenses), Money In/Out summary, and full transaction list. Each persona has 10 contextual transactions.
- 2026-02-23: PersonaSelector light mode default with dark/light toggle. Financial Hub persona-aware family members. Oracle AI Daily Brief dynamic from persona.oracleBriefs. Voice input via Web Speech API (en-IN locale, Speak button). Added useEffect syncs for persona changes and speech recognition cleanup.
- 2026-02-23: Added Advait (34, Salaried Professional) as 5th persona at top of selector. Switched to light mode default. Made Profile page persona-aware (name, email, occupation, dependents). Made Oracle AI chat persona-aware with dynamic system instructions. Removed duplicate Intelligent Alerts from OracleBriefHub. Added atmosphere theme CSS variables for Diwali/Onam/New Year themes.
- 2026-02-23: Added multi-persona experience with 4 personas (Rajesh, Ishan, Mr. Kapoor, Anjali), each with tailored financial data, goals, billers, Oracle briefs, discover cards, and features. PersonaSelector entry screen, global reset button (circle icon).
- 2026-02-23: Initial setup - moved files from zip subfolder to root, installed Node.js 20, configured Vite to run on port 5000 with allowedHosts enabled.

## Project Architecture
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in index.html)
- **UI Library**: Lucide React (icons), Recharts (charts)
- **AI Integration**: Google GenAI (@google/genai) for Oracle Intelligence
- **Backend**: Supabase

### Multi-Persona System
- `data/personas.ts` - Persona data model and constants for all 5 personas
- `components/PersonaSelector.tsx` - Entry screen for persona selection
- App starts with PersonaSelector, then dynamically loads persona-specific data into dashboard
- Global circle icon in dashboard header to return to persona selection
- Profile page dynamically shows persona-specific name, email, occupation, and dependents
- Oracle AI chat receives persona context for personalized responses

### Personas
1. **Advait (34)** - Salaried Professional: Fat FIRE Planner, Family Shield, Smart Automation
2. **Rajesh (45)** - Business Owner: GST Reconciliation, Cash Flow Forecaster, Vendor Risk Alert
3. **Ishan (21)** - Student: Bill Splitting, Goal Gamifier, Subscription Clean-up
4. **Mr. Kapoor (68)** - Pensioner: Pension Orchestrator, Benefit Matchmaker, Deepfake Scrutiny
5. **Anjali (38)** - Homemaker: Household Admin, Saving Architect, Spending Guardrails

### Pre-Approved Loan Journey
- `components/LoanJourneyOrchestrator.tsx` - 6-phase loan journey state machine
- Triggered in Oracle AI chat when user mentions trip/travel/vacation keywords
- **Conversational Intake**: Oracle asks step-by-step (destination → travelers & duration → cities & interests) before any analysis
- **Itinerary Upload**: Users can upload a pre-made itinerary (PDF, PNG, JPG, DOCX, TXT — max 5MB) to skip manual entry; persona-aware extraction
- **Free Text Notes**: Additional details field on cities/interests step for custom preferences
- Supports 12 pre-configured destinations (Japan, Thailand, Dubai, Singapore, Bali, Europe, Maldives, Vietnam, Sri Lanka, Varanasi, Goa, Kashmir) + custom destinations
- Dynamic cost calculation based on user-provided travelers, duration, cities
- Uses real-time `currentFinancials.liquid` for gap analysis
- EMI calculated with standard amortization formula at 10.49% p.a.
- Simulated Aadhaar OTP and e-NACH mandate flows
- **Loan Tracking**: After disbursement, loan appears on Dashboard (Active Loan card) and Loans Hub (detailed tracker with EMI schedule); navigation from disbursement screen to either Expenditure or Loans page

### Key Files
- `index.html` - Entry HTML with Tailwind config and import maps
- `index.tsx` - React app entry point
- `App.tsx` - Main application component with persona state management
- `vite.config.ts` - Vite configuration (port 5000, host 0.0.0.0)
- `data/personas.ts` - All persona profiles, financial data, goals, billers, briefs
- `components/PersonaSelector.tsx` - Persona selection entry screen
- `components/NeoBankDashboard.tsx` - Main dashboard (persona-aware)
- `components/OracleBriefHub.tsx` - Oracle AI insights hub (persona-aware)
- `components/LoanJourneyOrchestrator.tsx` - Pre-approved loan journey (5 phases)
- `components/BottomNav.tsx` - Bottom navigation
- `services/geminiService.ts` - Gemini AI service
- `components/` - All other UI components (PaymentFlow, CardManagement, etc.)
- `context/` - React context providers
- `types/` - TypeScript type definitions
