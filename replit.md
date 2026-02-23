# Oracle Federal Bank

## Overview
A premium, AI-first multi-persona banking application for Federal Bank called "Oracle." Built with React, Vite, TypeScript, and Tailwind CSS. Features a Cred-style UI with dark mode default, persona-based dynamic dashboards, and Oracle AI intelligence.

## Recent Changes
- 2026-02-23: Added multi-persona experience with 4 personas (Rajesh, Ishan, Mr. Kapoor, Anjali), each with tailored financial data, goals, billers, Oracle briefs, discover cards, and features. PersonaSelector entry screen, global reset button (circle icon), dark mode default.
- 2026-02-23: Initial setup - moved files from zip subfolder to root, installed Node.js 20, configured Vite to run on port 5000 with allowedHosts enabled.

## Project Architecture
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in index.html)
- **UI Library**: Lucide React (icons), Recharts (charts)
- **AI Integration**: Google GenAI (@google/genai) for Oracle Intelligence
- **Backend**: Supabase

### Multi-Persona System
- `data/personas.ts` - Persona data model and constants for all 4 personas
- `components/PersonaSelector.tsx` - Entry screen for persona selection
- App starts with PersonaSelector, then dynamically loads persona-specific data into dashboard
- Global circle icon in dashboard header to return to persona selection

### Personas
1. **Rajesh (45)** - Business Owner: GST Reconciliation, Cash Flow Forecaster, Vendor Risk Alert
2. **Ishan (21)** - Student: Bill Splitting, Goal Gamifier, Subscription Clean-up
3. **Mr. Kapoor (68)** - Pensioner: Pension Orchestrator, Benefit Matchmaker, Deepfake Scrutiny
4. **Anjali (38)** - Homemaker: Household Admin, Saving Architect, Spending Guardrails

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
