# Oracle Federal Bank

## Overview
A React + TypeScript banking application UI built with Vite and Tailwind CSS. Features a mobile-first banking dashboard with account overview, quick actions (Send, UPI, Scan, SOS), and navigation tabs (Home, Wealth, Flow, Goals).

## Recent Changes
- 2026-02-23: Initial setup - moved files from zip subfolder to root, installed Node.js 20, configured Vite to run on port 5000 with allowedHosts enabled.

## Project Architecture
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in index.html)
- **UI Library**: Lucide React (icons), Recharts (charts)
- **AI Integration**: Google GenAI (@google/genai)
- **Backend**: Supabase

### Key Files
- `index.html` - Entry HTML with Tailwind config and import maps
- `index.tsx` - React app entry point
- `App.tsx` - Main application component
- `vite.config.ts` - Vite configuration (port 5000, host 0.0.0.0)
- `components/` - UI components
- `services/` - Service layer
- `context/` - React context providers
- `types/` - TypeScript type definitions
