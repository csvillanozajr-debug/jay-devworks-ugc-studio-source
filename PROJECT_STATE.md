# JAY DEVWORKS UGC STUDIO — RUNNING PROJECT STATE & CONTEXT

> **Living Project State File**: This document records the architecture, active status, completed milestones, constraints, and decision logs for the **Jay DevWorks UGC Studio** application. It serves as the single source of truth for ongoing development, maintenance, and future task handoffs.

---

## 1. Project Overview & Brand Identity

- **Brand Name**: Jay DevWorks UGC Studio
- **Creator**: Jay Villanoza (Philippines-based, available for remote global brand collaborations)
- **Positioning**: Product-aware UGC creator specializing in short-form videos for tech, SaaS, AI tools, mobile apps, workflows, dashboards, and digital products.
- **Core Value Proposition**: *“Short-form product videos for AI, SaaS, apps, and small-business brands.”*
- **Aesthetic Direction**: Deep navy (`#0B2437`), Teal (`#087E8B`), Soft gray (`#F5F8F9`), Clean white (`#FFFFFF`), Electric blue accent (`#1E88E5`), Subtle orange CTA accent (`#F59E0B`). Anti-AI slop design discipline, high typographic contrast, zero-pill metadata enclosures.

---

## 2. Technical Architecture & Tech Stack

| Layer | Technology | Details / Configuration |
|---|---|---|
| **Runtime Environment** | Node.js (Linux) | Port `3000`, Cloud Run / Vite SSR / SPA |
| **Backend Server** | Express (`server.ts`) | Reverse proxy, static asset handler, secure API endpoints |
| **Frontend Framework** | React 19 + TypeScript | Modular functional components, hooks, clean JSX |
| **Bundler & Build Tool** | Vite 8 + `@tailwindcss/vite` | Fast HMR dev server mounted as Express middleware; production bundle via `npm run build` |
| **Styling** | Tailwind CSS v4 | Native `@import "tailwindcss";`, custom typography scale, zero inline styles |
| **Icons & Media** | Lucide React | Scalable SVGs, domain-specific affordances |
| **Data Architecture** | TypeScript CMS (`src/data/portfolioData.ts`) | Centralized data store for videos, packages, copy, and contacts |

---

## 3. Running Status & Current State

- **Current Status**: **Production-Ready & Fully Verified**
- **Last Audit**: October 2, 2026
- **Compilation Status**: `compile_applet` passed (`Build succeeded`)
- **Lint Status**: `lint_applet` passed (`tsc --noEmit` zero errors)
- **Production Build**: `npm run build` completes in <800ms with zero warnings

### Task Progress Matrix

| Task / Feature | Status | Notes |
|---|---|---|
| **1. Top Bar Navigation** | Completed | Follows 1-row, 3-zone contract (Wordmark, 6 clean links, primary action) |
| **2. Hero Section** | Completed | Deep navy canvas, unboxed badges, live availability badge, dual CTAs, interactive 9:16 mockup |
| **3. 30–45s UGC Showreel** | Completed | 7-part retention montage with click-to-seek scrub bar and segment jumping |
| **4. Brand-Fit & Real Workflows** | Completed | 6 tech categories, CapCut/DaVinci Resolve studio timeline, dashboard proof |
| **5. Featured UGC Samples** | Completed | 5 samples with top 3 prominent; interactive 9:16 player with timecode & script breakdown |
| **6. Services (8 Deliverables)** | Completed | 8 structured outcome cards + 9:16 vertical delivery format highlight banner |
| **7. Choose Your Content Style** | Completed | 7 styles with Faceless UGC, Screen Demo, and Tutorial Content highlighted as core specialties |
| **8. "How I Think" Strategy** | Completed | 4-question customer problem framework + Case Study Blueprint (Problem → Strategy → Deliverables → Outcome) |
| **9. Packages & Pricing** | Completed | 4 packages with USD ($) and PHP (₱) toggle, add-ons strip, usage rights note |
| **10. Work Process Timeline** | Completed | 5 numbered phases + turnaround card (5–7 business days, rush availability) |
| **11. UGC Project Brief Checklist** | Completed | 10-point checklist with interactive checkboxes, one-click template copy, and print/PDF support |
| **12. Accessible FAQ Accordion** | Completed | 7 expandable questions covering shipping, international remote work, scripts, and paid ads |
| **13. Contact & Inquiry System** | Completed | Server-validated form, honeypot anti-spam, rate limiter, email mailto fallback |
| **14. Security & Privacy Suite** | Completed | HSTS, nosniff, CSP, DENY X-Frame, 12-month retention auto-pruning, data deletion endpoint |
| **15. Legal & Policy Modals** | Completed | Privacy Policy, Terms of Service, and Commercial Usage Rights with backdrop dismissal |
| **16. Mobile Sticky Conversion Bar** | Completed | Under 15% viewport height cap; quick links for Showreel & Start Project |

---

## 4. Architectural Decisions Log (ADR)

### ADR-01: Full-Stack Express Server with Vite Middleware
- **Context**: Contact form submissions require strict server-side validation, rate limiting, and security headers, while preserving client-side React responsiveness.
- **Decision**: Implemented `server.ts` running Express that mounts `vite.middlewares` in development (`"dev": "tsx server.ts"`) and serves `dist/index.html` in production (`"start": "tsx server.ts"`).
- **Consequence**: Backend and frontend operate seamlessly on a single port (`3000`) without external CORS configuration or exposed secrets.

### ADR-02: Zero-Pill & Anti-AI Slop Design Discipline
- **Context**: AI-generated websites default to purple gradients, candy pills, and floating stat badges.
- **Decision**: Enforced strict unboxed metadata text with typographic separators (`·`), single-level card elevation, and purposeful technology visuals (studio editing timelines, 9:16 phone frames).
- **Consequence**: Delivers a human, agency-grade aesthetic that builds immediate credibility with tech founders and marketing directors.

### ADR-03: Interactive 9:16 Vertical Video Simulation Engine
- **Context**: Heavy autoplay MP4 video files degrade mobile performance and break sandbox bandwidth limits.
- **Decision**: Built interactive client-side 9:16 smartphone player frames with animated timecode progress, play/pause controls, voiceover soundwave indicators, and synchronized kinetic captions.
- **Consequence**: Zero bandwidth lag, instant loading, complete cross-device responsiveness, and previewable script breakdowns.

### ADR-04: Unicode-Safe Validation & Skew-Resilient Anti-Spam
- **Context**: Standard regex (`^[a-zA-Z]+$`) breaks on international names (e.g., *José*, *Niña*), and subtracting client timestamps directly from server clocks causes false bot blocks on skewed devices.
- **Decision**: Upgraded to Unicode letter properties (`/^[\p{L}\s'\-.]+$/u`) and client-measured elapsed time (`elapsedMs: Date.now() - formInitiatedAt`) verified server-side.
- **Consequence**: Eliminates false rejections for legitimate global clients while maintaining strong defense against rapid spambots.

### ADR-05: Complete Data Privacy & 12-Month Retention
- **Context**: UGC inquiries contain sensitive brand briefs, unreleased product URLs, and founder emails.
- **Decision**: Eliminated all client-side browser storage (`localStorage` / `sessionStorage`) of personal inquiry data. Implemented 12-month automatic retention pruning and a self-service `POST /api/privacy/request` endpoint.
- **Consequence**: Fully compliant with modern data protection standards without requiring heavy external SaaS database dependencies.

### ADR-06: 5-to-7 Step Task Decomposition & Validation Checkpoints
- **Context**: Complex development tasks risk context drift, runaway diffs, and regression if performed in single unbounded execution turns.
- **Decision**: Established a strict operational rule: all future engineering and UI tasks must be decomposed into discrete chunks of 5 to 7 steps each, preceded by state ingestion from `PROJECT_STATE.md`, and sealed by a 5-point validation checkpoint (Lint, Compile, Production Build, API Verification, State Sync). Full protocol defined in `/TASK_DECOMPOSITION_FRAMEWORK.md`.
- **Consequence**: Guaranteed predictability, clear rollback points, and continuous project state synchronization across every task session.

### ADR-07: Fixed Navbar Scroll Margins & Deliverables Auto-Mapping
- **Context**: Fixed 64–80px header navbar caused smooth scrolling to obscure the top headings of anchored sections. Additionally, selecting custom samples from the portfolio lightbox did not cleanly select a recognized deliverable chip in the inquiry form.
- **Decision**: Added universal `scroll-mt-20 sm:scroll-mt-24` across all 11 content section roots, and mapped custom package strings to `"Custom Deliverables"` while pre-populating project details.
- **Consequence**: Clean, unobstructed scroll transitions across desktop and mobile, with 100% reliable deliverable chip selection.

---

## 5. Security & Privacy Constraints

1. **Port & Process**: Dev and production servers must always listen on port `3000` on `0.0.0.0`.
2. **Environment Secrets**: Never expose API keys or credentials in client bundles. Use `.env.example` as a template.
3. **HTTP Response Security Headers**:
   - `Strict-Transport-Security`: `max-age=31536000; includeSubDomains`
   - `X-Content-Type-Options`: `nosniff`
   - `Referrer-Policy`: `strict-origin-when-cross-origin`
   - `X-Frame-Options`: `DENY`
   - `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), payment=(), usb=(), fullscreen=(self)`
   - `Content-Security-Policy`: Restrictive policy permitting only self-hosted resources, fonts, and verified HTTPS assets.
4. **Anti-Spam & Rate Limiting**:
   - Maximum 3 submissions per IP address per 1 hour.
   - Invisible honeypot field (`hp_company_fax`).
   - Minimum elapsed time check (2000ms threshold).
   - Duplicate submission filter (60-second window).

---

## 6. Directory Map & File Responsibilities

```
/
├── server.ts                       # Express backend: security headers, rate limiting, inquiry & privacy APIs
├── index.html                      # HTML entry with Plus Jakarta Sans & DM Sans fonts, OpenGraph meta
├── metadata.json                   # App title, description, and studio capabilities
├── package.json                    # Scripts ("dev": "tsx server.ts", "build": "vite build") & dependencies
├── tsconfig.json                   # Strict TypeScript configuration with bundler module resolution
├── vite.config.ts                  # Vite config with React & Tailwind plugins, path alias
├── src/
│   ├── main.tsx                    # React DOM entry point
│   ├── App.tsx                     # Top-level application layout, modal state, scroll coordinators
│   ├── index.css                   # Tailwind v4 import, font assignments, focus-visible styles
│   ├── data/
│   │   └── portfolioData.ts        # Centralized CMS: creator info, showreel, niches, samples, packages
│   ├── assets/images/              # Generated high-fidelity visual assets (showreel timeline, UGC demos, desk)
│   └── components/
│       ├── Navbar.tsx              # Top Bar Contract compliant header (wordmark, links, CTA, mobile drawer)
│       ├── Hero.tsx                # Hero section with live booking badge, dual CTAs, 9:16 video mockup
│       ├── Showreel.tsx            # 30–45s interactive UGC montage with clickable scrub bar & segment jump
│       ├── BrandFit.tsx            # Niches served & real workflow visuals (CapCut/DaVinci timeline, UI proof)
│       ├── FeaturedWork.tsx        # 5 portfolio concept samples with category filters & lightbox triggers
│       ├── VideoModal.tsx          # 9:16 vertical video player simulation with script breakdown
│       ├── Services.tsx            # 8 core deliverable cards & 9:16 vertical delivery formats banner
│       ├── ContentStyles.tsx       # 7 content style cards highlighting Faceless, Screen Demo & Tutorials
│       ├── HowIThink.tsx           # 4-question customer problem framework & Case Study Blueprint
│       ├── Packages.tsx            # 4 pricing cards with USD/PHP switcher, add-ons strip, form pre-fill
│       ├── Process.tsx             # 5-step production timeline & turnaround card
│       ├── BriefChecklist.tsx      # 10-point UGC Brief Checklist with template copy & print/PDF support
│       ├── FAQ.tsx                 # 7 accessible accordion items
│       ├── Contact.tsx             # Protected inquiry form, anti-spam honeypot, validation, email fallback
│       ├── LegalModal.tsx          # Privacy Policy, Data Management tool, Terms, Usage Rights
│       └── Footer.tsx              # Brand lockup, quick navigation, social links, legal modal triggers
```

---

## 7. How to Update & Maintain Content

- **Update Samples or Showreel Clips**: Edit `videoSamples` or `showreel.segments` in `src/data/portfolioData.ts`.
- **Adjust Pricing or Currency Rates**: Update `packages` in `src/data/portfolioData.ts`.
- **Change Booking Availability**: Update `creator.bookingStatus` or `creator.responseTime` in `src/data/portfolioData.ts`.
- **Verify Build Integrity**: Run `npm run lint` and `npm run build` to ensure 0 errors and 0 warnings.

---

## 8. Active Roadmap & Decomposed Chunks Queue

Following the protocol in `/TASK_DECOMPOSITION_FRAMEWORK.md`, active and upcoming works are scheduled in discrete 5–7 step sessions:

| Chunk ID | Chunk Title | Step Count | Target Deliverable | Status |
|---|---|---|---|---|
| **Chunk 1** | Interactive UGC Rate & Deliverable Quote Calculator | 7 Steps | Custom sliders, real-time USD/PHP calculation, auto-fill into Contact form | Queued for Next Execution |
| **Chunk 2** | Discovery Scheduler & Direct 15-Minute Call Flow | 7 Steps | Modal calendar scheduler with Manila (GMT+8) vs client timezone mapping | Queued |
| **Chunk 3** | Media Asset Preloading & Player Optimization | 7 Steps | Skeleton shimmers, layout-shift elimination, keyboard player shortcuts | Queued |
| **Chunk 4** | Client Brief Export Suite & Print Stylesheet | 7 Steps | `@media print` clean layout, Markdown export for Notion/Slack, brief completeness meter | Queued |
