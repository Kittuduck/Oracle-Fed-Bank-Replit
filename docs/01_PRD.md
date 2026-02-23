# Product Requirements Document (PRD): Federal Bank Digital Application & AI FinCoach

## 1. Executive Summary & Vision
**Vision:** To deliver a premium, full-scale digital banking application for Federal Bank that pairs robust core banking capabilities with an intelligent, embedded AI financial coaching system (FinCoach). The platform aims to streamline onboarding, democratize wealth management, and provide intuitive, frictionless access to all comprehensive banking services. 

**Objective:** Modernize the digital banking experience through an interface that acts as the "Perfect Partner" for customers. It must strictly adhere to Federal Bank's trusted identity, incorporating predictive AI insights, minimalistic design, and seamless regulatory compliance to elevate the end-to-end customer journey.

## 2. Information Architecture (Home Screen Taxonomy)
The Home Screen redesign focuses on a clean visual hierarchy, categorizing features logically to minimize cognitive load while ensuring critical actions remain at the forefront.

### Top Reference Bar (Context & Safety)
- **Profile & Settings:** Contextual settings, user profile details, and security controls.
- **Notification Bell:** Transaction alerts, FinCoach insights, actionable nudges.
- **Universal Search/Help:** Instant access to queries, FAQ, and live support.

### Core Dashboard (Net Worth & Insights)
- **Aggregated Balance:** A consolidated, large-typography view of all linked accounts, deposits, and investments.
- **FinCoach Nudge:** AI-driven personalized insights (e.g., "You have excess liquidity, consider a Short-Term FD") highlighted strategically below the balance.

### Middle Tier (Bento-Box Quick Links)
- **Payments & Transfers:** Send Money, Bill Payments, UPI, Scan & Pay.
- **Manage Cards:** Block/Unblock, Upgrade Debit Card, PIN Management.
- **Investments & FDs:** Open FD, Mutual Funds, Digital Gold, SIPs.
- **Quick Loans:** Access to pre-approved fractional credit and LAS.

### Bottom Navigation Bar (Persistent)
- **Home:** Return to the Main Dashboard.
- **FinCoach:** Direct access to AI financial planning workflows via conversational UI.
- **Wealth/Loans:** Access to Personal/Car/Home Loans and Wealth portfolios.
- **Services:** Stop Cheque, Raise Dispute, Apply Online, Profile Updates.

## 3. Priority User Journeys (Deep Dive)

### Priority Journey 1: Home Screen Redesign & Navigation
- **Entry point:** Secure Login via Biometrics (FaceID/TouchID) or 6-digit mPIN.
- **Action:** User lands on the Dashboard. Dynamic elements (like FinCoach insights) load asynchronously to prioritize the rapid rendering of Core Balances.
- **Categorized Sections:** The user scans the Top Bar for urgent alerts, views their aggregate baseline wealth, and accesses the Bento-Box Quick Links for common actions (Transfer, FDs, Cards). The layout transitions beautifully into a High-Clarity Light Mode with Federal Blue headers and Pure White backgrounds.
- **Navigation Flow:** User seamlessly shifts contexts between "Payments" and "Wealth/Loans" via the persistent Bottom Nav without losing session state or context. A conversational "Talk to Oracle" (FinCoach bar) in Federal Blue remains accessible without obstructing main content, facilitating cross-journey movement.

### Priority Journey 2: Digital Account Onboarding
- **Trigger:** Customer downloads the app, selects "Open Account."
- **Mobile Verification:** User inputs phone number; validates via resilient OTP mechanism.
- **PAN Validation (API):** User inputs 10-digit PAN. System validates name and status securely via direct API integration with NSDL.
- **Aadhaar Validation (UIDAI OTP):** User inputs Aadhaar number; receives and submits UIDAI OTP. System securely handles these PII attributes in memory, mapping demographic data.
- **Pre-fill & Personal Details:** System fetches demographic data automatically (Name, DOB, Address). User provides supplementary details (occupation, annual income).
- **Product Selection:** User selects account variant based on eligibility (e.g., Federal Premium or Federal Basic).
- **Nominee Details:** User specifies nominee relation, name, and DOB.
- **Consent Management:** User accepts Digital Banking and FATCA T&Cs via explicit checkbox logs.
- **Video KYC:** User clicks to connect with a live Federal Bank agent (or schedules a call) via embedded V-KYC SDK. The journey finishes successfully, seamlessly transitioning the account from "Pending Verification" to "Active."

### Priority Journey 3: AI-Powered FinCoach (Credit Card Application)
- **Trigger:** User taps "FinCoach" in the bottom nav or the dynamic "Apply for Credit Card" banner.
- **Context Gathering:** FinCoach instantly processes the user's historical transaction behavior, average quarterly balances, and spending patterns (e.g., heavy travel expenditures vs. dining).
- **Interaction (Conversational UI):** User starts a conversational flow, typing or selecting prompt: "I travel frequently and want lounge access."
- **AI Recommendation Model:** FinCoach (Oracle) compute the best card match (Celesta, Imperio, Signet) against the user's profile.
- **Premium Reveal:** The UI transitions to an "Analyzing" state followed by a high-fidelity "Card Reveal" animation showing the recommended card with its specific benefits (e.g., "Unlimited Lounge Access" for Celesta).
- **Compliance & KFS:** Before applying, the user is presented with the Key Fact Statement (KFS), APR (e.g., 32% p.a.), and Annual Fees prominently.
- **Seamless Application:** The user reviews and hits "Apply Now" directly. The application form is pre-filled, and success is confirmed with instant virtual card activation.

### Priority Journey 4: Payments & Transfers (High-Frequency Core)
- **Trigger:** User taps "Payments" on the dashboard.
- **Action:** User selects "Send Money" or pays a bill from the "Biller Discovery" widget.
- **Validation:** System checks real-time available balance. For new payees, it simulates cooling-off period checks.
- **Authentication:** Multi-factor authentication (OTP/Biometric) is required for high-value transfers.
- **State Logic:** Post-payment, the aggregate balance on the dashboard updates instantly to reflect the debit, ensuring data consistency across the app shell.

### Priority Journey 5: Card Management & SOS (Safety First)
- **Trigger:** User taps "Cards" or the "SOS" emergency shield.
- **Action:** User views a digital representation of their physical card with security toggles (Online Spends, Contactless, International).
- **Emergency Flow:** If the user selects "Block Card," they are prompted to choose between a "Temporary Freeze" or "Permanent Block (Lost/Stolen)."
- **Replacement Journey:** For permanent blocks, the app initiates an instant replacement workflow, confirming the delivery address and issuing a temporary virtual card until the physical one arrives.

### Priority Journey 6: Wealth & Lending Hub (Revenue Engine)
- **Trigger:** User taps "Investments" or "Loans" bento tiles.
- **Wealth Flow:** User selects "Open FD," chooses a tenure (e.g., 12 months at 7.5%), and verifies the maturity amount. Funds are debited from the savings account and moved to the investment portfolio.
- **Lending Flow:** User views their simulated **Credit Score (e.g., 782)**. They select a loan category (Personal, Home, Car), see their pre-approved limit, and review the KFS.
- **Instant Disbursal:** Upon "Confirm Apply," the loan amount is credited to their savings account instantly, with the dashboard balance reflecting the "Flash Credit" influx.

### Priority Journey 7: Dynamic Theming (Emotional Banking)
- **Trigger:** System detects a festival/event (e.g., Diwali) or user selects a theme in settings.
- **Action:** The app's header, bento-box borders, and background accents shift to themed colors (e.g., Warm Gold for Diwali, Emerald Green for Onam) without losing branding.
- **Micro-Animations:** Subtle, non-intrusive animations (like flickering lamps or falling petals) activate to enhance the premium festive feel.
- **Inclusivity:** All themes are built with strict color contrast ratios to remain fully accessible to visually impaired users.

### Priority Journey 8: Niche Lending (Gold Loan & LAS)
- **Gold Loan Flow:** User selects "Gold Loan" from the hub. They enter the weight (gms) and purity (carats) of their gold. System provides a real-time "Max Eligible Sanction" based on current market rates. User accepts and is prompted: "Please visit the nearest Federal Bank branch for physical appraisal and instant disbursal."
- **LAS Flow:** User selects "Loan Against Shares." They view their demat holdings via integration (simulated), select shares to pledge, and see the LTV (Loan to Value) based limit. User confirms, signs the digitally lien-marked agreement, and redraws funds.

### Priority Journey 9: Legacy Services & Growth Engine
- **Stop Cheque:** User navigates to Services > Stop Cheque. Inputs the cheque leaf number. Reviews the legal disclaimer: "I understand that stopping payment of a legally issued cheque may have legal consequences under Section 138 of the NI Act." User confirms via OTP.
- **Bank Offers:** User scans the "Growth Tray" on the dashboard. They see a personalized offer: "15% off at Tata CLiQ with your Federal Celesta Card." User taps to view the coupon code and merchant T&Cs.

## 4. High-Level User Journeys (Broader Features)

### Account & Investments
- **Open FD:** User enters investment amount, selects tenure (with FinCoach highlighting optimal rate tiers), reviews maturity details, and confirms securely. Account is instantly debited, and FD receipt generated.
- **Invest Online:** User browses Mutual Funds or digital SGBs, completes initial risk profiling, executes the investment via connected Savings Account, and tracks performance seamlessly on the Dashboard.

### Loans & Credit (Beyond Cards)
- **Personal/Car/Home/Business/Gold Loan:** User views eligible pre-approved offers based on FinCoach's credit assessments. User submits required details/collateral document photos and receives a digital, conditional sanction.
- **Loan Against Shares (LAS):** User pledges specific demat equity holdings, views a dynamically calculated overdraft limit, and draws down funds to a linked savings account instantly.

### Payments & Transfers
- **Send Money:** User selects a saved payee (or adds a new one via NEFT/RTGS/IMPS with cooling-off period checks), inputs amount, completes multi-factor authentication, and views instant success prompt.
- **Bill Payments:** User fetches utilities via Bharat BillPay Module (BBPS), authorizes recurring auto-pay mandates, or executes one-time payments.

### Cards & Banking Services
- **Debit/ATM Card Upgrades:** User selects their existing card, views Federal Bank's catalog of available premium upgrades (with FinCoach ROI suggestions), and confirms a secure delivery address to trigger dispatch.
- **Stop Cheque:** User inputs cheque number or range, selects a reason from dropdown, and confirms to instantly freeze clearance.
- **Block/Unblock Cards:** User toggles a specific card's status. If flagged permanently blocked (e.g., lost), the app instantly prompts an integrated replacement flow.

### Support & Safety
- **Raise Dispute:** User navigates through their transaction list, selects an anomaly, categorizes the issue (e.g., "Amount debited but cash not dispensed"), uploads proof (if applicable), and tracks resolution via an automated ticketing system.
- **Report Fraud:** Dedicated, high-visibility "Emergency Shield" (accentuated in Bright Orange) workflow to freeze accounts and immediately trigger bank-side fraud prevention protocols.

### Others
- **Apply Online:** Centralized hub for non-logged-in application links containing unauthenticated versions of forms for pre-login prospects.
- **Bank Offers:** User browses geo-localized or partner-merchant offers relevant to their debit/credit cards, intelligently sorted by the AI FinCoach to display highest propensity offers first.
