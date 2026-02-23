# Oracle Federal Bank

## Overview
A premium, AI-first multi-persona banking application for Federal Bank called "Oracle." Built with React, Vite, TypeScript, and Tailwind CSS. Features a Cred-style UI with light mode default, persona-based dynamic dashboards, and Oracle AI intelligence.

## Recent Changes
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

### Key Files
- `index.html` - Entry HTML with Tailwind config and import maps
- `index.tsx` - React app entry point
- `App.tsx` - Main application component with persona state management
- `vite.config.ts` - Vite configuration (port 5000, host 0.0.0.0)
- `data/personas.ts` - All persona profiles, financial data, goals, billers, briefs
- `components/PersonaSelector.tsx` - Persona selection entry screen
- `components/NeoBankDashboard.tsx` - Main dashboard (persona-aware)
- `components/OracleBriefHub.tsx` - Oracle AI insights hub (persona-aware)
- `components/BottomNav.tsx` - Bottom navigation
- `services/geminiService.ts` - Gemini AI service
- `components/` - All other UI components (PaymentFlow, CardManagement, etc.)
- `context/` - React context providers
- `types/` - TypeScript type definitions
