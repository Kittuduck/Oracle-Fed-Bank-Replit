# UI/UX Design System & Guidelines: Federal Bank Digital Application

## 1. Federal Bank Brand Identity

The visual language of the application is designed to evoke trust, clarity, and modern sophistication. It positions Federal Bank as the "Perfect Partner" for its customers.

### 1.1 Color Palette
The color system strictly adheres to the following values to ensure maximum accessibility and brand recall:

- **Primary (Federal Blue):** `#004d9c`
  - *Usage:* Headers, primary CTA buttons, active states, and trust-building structural elements.
- **Secondary (Federal Orange/Gold):** `#f37021`
  - *Usage:* Highlights, 'Next Best Action' nudges, specific interactive elements to draw the eye.
- **Backgrounds & Surfaces:**
  - *Base:* Pure White (`#FFFFFF`)
  - *Elevations:* Light Grey (`#F9FAFB`) for cards and surface elevations to create subtle depth without clutter.
- **Semantic Colors:**
  - *Success/Safety:* Federal Green (`#2E7D32`). Used for positive confirmations and "On Track" FIRE (Financial Independence, Retire Early) goals.
  - *Alert/Urgency:* Bright Orange. Reserved exclusively for "Emergency Shield" features and anomaly/fraud detections.
  - *Warning/Amber:* Gold accent. Used when a goal is slightly off-track or requires attention but not immediate panic.

### 1.2 Typography
Typography relies on clean, high-legibility sans-serif fonts to ensure readability across all device sizes.

- **Primary Font Family:** "Public Sans" (or "Inter" as fallback).
- **Headings (H1/H2):** Federal Blue, Bold weight. Used for critical data like Net Worth, Goal titles, and page headers.
- **Body Text:** Slate Grey (`#4B5563`), Regular/Medium weight. Used for descriptions (e.g., tax-loss harvesting explanations, life-event simulations, transaction details).

### 1.3 UI Geometry & Components
- **Corner Radius:** `10px` globally for cards, buttons, and modals. This strikes a deliberate balance between friendly, approachable curves and professional, secure structure.
- **Card Styling:** 
  - Subtle drop shadows (Elevation 1: `0 1px 3px rgba(0,0,0,0.1)`).
  - *Strategic Sections:* Sections requiring high user focus (e.g., AI Wealth Insights) feature a thin, 2px Federal Blue top-border for emphasis.
- **Iconography:**
  - *Main Navigation:* Solid-fill icons (providing a grounded, solid feel).
  - *Oracle Intelligence Insights:* Dual-tone icons utilizing Federal Blue and Federal Orange to signify advanced, AI-driven capabilities.

## 2. Layout Strategy (High-Clarity Light Mode)

The application moves away from dark-mode defaults to embrace a "High-Clarity Light Mode" which maximizes contrast and readability for diverse demographics.

### 2.1 The Dashboard Architecture
- **Top Bar (Z-Index 50):** Persistent translucent or solid white bar containing Profile Avatar (left), Federal Bank Logo (center), and Notification/Help icons (right).
- **Core Hero Section:** Uses the Pure White background with large, Federal Blue typography for the aggregate balance.
- **Bento-Box Grid (Cards):** 
  - Used for the primary actions (Payments, FDs, Cards). 
  - Layout is strictly grid-based (e.g., 2x2 or 3x2). 
  - Cards have Light Grey backgrounds (`#F9FAFB`) to differentiate from the pure white canvas.
- **Bottom Navigation (Z-Index 100):** Persistent Pure White bar with Federal Blue active states and Slate Grey inactive states. Contains 4-5 core destinations: Home, FinCoach, Wealth/Loans, Services.

### 2.2 Accessibility Standards
- **Contrast Ratios:** All text over backgrounds must pass WCAG 2.1 AA standards (minimum 4.5:1 for normal text). Federal Blue on Pure White far exceeds this threshold.
- **Touch Targets:** Minimum 44x44 points for all interactive elements to prevent mis-taps.

## 3. Interaction Design: The AI FinCoach

The FinCoach interface must feel distinctly "Agentic" while remaining deeply integrated into the banking experience.

### 3.1 "The Oracle Spark"
- **Visual Motif:** When the AI is processing or thinking, avoid generic loading spinners. Replace the traditional "purple AI glow" with a bespoke Federal Orange-to-Blue gradient spark/shimmer effect.
- **Application:** Used on the FinCoach floating action button, as a subtle border animation on insight cards, and as the typing indicator during chat.

### 3.2 The "Talk to Oracle" Bar
- **Placement:** Anchored logically either just above the Bottom Navigation or embedded as a highly visible section within the Dashboard.
- **Styling:** The input bar is styled in solid Federal Blue `#004d9c` with Pure White `#FFFFFF` text and placeholder ("Ask your FinCoach..."). This ensures maximum visibility and contrast, making it the most obvious interactive element on the screen.

### 3.3 Conversational UI Flow
1. **Entry:** Tapping the Federal Blue bar expands the view into a chat interface.
2. **Context Chips:** Instantly populate with predicted queries (e.g., "Analyze my spending", "Recommend a Credit Card").
3. **Response Rendering:** Text responses use Slate Grey. When the AI recommends a product (like a Credit Card), the text is followed by a rich UI card incorporating the 10px corner radius and subtle shadow, featuring a clear primary CTA in Federal Blue.
