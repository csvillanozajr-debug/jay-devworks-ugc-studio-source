# TASK DECOMPOSITION & CHUNKED EXECUTION PROTOCOL

> **Standard Operating Procedure (SOP)**: This framework governs how complex engineering, design, and content updates are planned and executed for **Jay DevWorks UGC Studio**. It enforces discrete 5-to-7 step work chunks, continuous state ingestion via `PROJECT_STATE.md`, and mandatory validation checkpoints between execution sessions.

---

## 1. Core Principles of the Protocol

1. **Strict 5-to-7 Step Chunking**:
   - Complex tasks MUST be decomposed into discrete chunks containing **minimum 5, maximum 7 atomic steps**.
   - Chunks below 5 steps risk combining unmonitored changes. Chunks above 7 steps risk context drift, runaway diffs, and verification blindness.
2. **State-First Ingestion**:
   - At the beginning of every chunk session, the agent MUST read and reference `/PROJECT_STATE.md` to establish current constraints, dependencies, and completed work.
3. **Discrete Session Isolation**:
   - Each chunk operates as a self-contained execution unit with a distinct objective, input state, transformation set, and output verification.
4. **Non-Negotiable Validation Checkpoint**:
   - No chunk is marked complete without passing the 5-point verification checkpoint.
5. **Continuous State Handoff**:
   - Upon passing the checkpoint, `/PROJECT_STATE.md` is immediately updated with the new completed state, updated ADRs, and next queued chunks before the session closes.

---

## 2. Chunk Execution Lifecycle

```
[Start Chunk Session]
        │
        ▼
Step 0: Ingest /PROJECT_STATE.md
        │
        ▼
Execute Discrete Steps (5 to 7 steps)
  ├─ Step 1: Data Contract & Types Definition
  ├─ Step 2: Backend Route / Logic Implementation
  ├─ Step 3: Frontend Component Architecture
  ├─ Step 4: UI/UX Integration & Event Binding
  ├─ Step 5: Accessibility & Viewport Testing
  ├─ Step 6: Error Handling & Security Sanitization
  └─ Step 7: Local Regression Verification
        │
        ▼
Run Validation Checkpoint (Lint, Compile, Build, Security, UI)
        │
        ▼
Update /PROJECT_STATE.md (Exit State & Handoff)
        │
        ▼
[End Chunk Session / Ready for Next Chunk]
```

---

## 3. The 5-Point Validation Checkpoint Specification

Between every completed chunk, the agent MUST execute and verify all 5 checkpoints:

| Checkpoint | Target | Tool / Command | Pass Criteria |
|---|---|---|---|
| **CP-1: Type & Syntax** | TypeScript, imports, enums | `lint_applet` (`tsc --noEmit`) | 0 errors, 0 unresolved imports |
| **CP-2: Build Compilation** | Vite bundler, asset hashing | `compile_applet` | Output: `Build succeeded` |
| **CP-3: Production Bundle** | CSS minification, JS chunking | `npm run build` | Completes in <1.5s with zero warnings |
| **CP-4: Runtime & Security** | Express headers, API routes | `curl -I`, `curl -X POST /api/*` | 200 OK, HSTS/CSP headers present, rate limit intact |
| **CP-5: State Handoff** | Living project documentation | `PROJECT_STATE.md` update | Status matrix updated, ADR logged |

---

## 4. Active Roadmap: Decomposed Chunks (5–7 Steps Each)

Here is the decomposed roadmap for the next development milestones, organized into 5-to-7 step execution chunks:

---

### Chunk 1: Interactive UGC Rate & Deliverable Quote Calculator
*Objective*: Allow prospective clients to customize video count, hook variations, ad licensing duration, and turnaround times with real-time USD/PHP calculation that pre-fills into the project inquiry form.

- [ ] **Step 1.1**: Define quote calculation schema, rates, and add-on factors in `src/data/portfolioData.ts`.
- [ ] **Step 1.2**: Create `src/components/QuoteCalculator.tsx` with reactive sliders and toggle controls.
- [ ] **Step 1.3**: Implement instant currency converter ($ USD vs ₱ PHP) with transparent line-item itemization.
- [ ] **Step 1.4**: Add "Apply Quote to Project Inquiry" action that transfers calculated scope into `Contact.tsx`.
- [ ] **Step 1.5**: Embed the Quote Calculator seamlessly into `Packages.tsx` with tabbed/collapsible access.
- [ ] **Step 1.6**: Ensure mobile responsiveness and touch-friendly controls (minimum 44px tap targets).
- [ ] **Step 1.7**: **Validation Checkpoint CP-1 through CP-5**.

---

### Chunk 2: Client Discovery Scheduler & Direct 15-Minute Call Flow
*Objective*: Provide qualified tech founders with a low-friction option to schedule a 15-minute concept discovery call or choose asynchronous brief review.

- [ ] **Step 2.1**: Add scheduling preferences and modal state architecture to `PORTFOLIO_CONFIG`.
- [ ] **Step 2.2**: Build `src/components/DiscoverySchedulerModal.tsx` supporting date selection and asynchronous options.
- [ ] **Step 2.3**: Add direct discovery call CTA shortcuts in Hero, Contact, and Sticky Mobile Bar.
- [ ] **Step 2.4**: Implement timezone detection (displaying client timezone and Philippines time Manila GMT+8).
- [ ] **Step 2.5**: Wire backdrop click dismissal, keyboard ESC handling, and ARIA modal attributes.
- [ ] **Step 2.6**: Sanitize and pass discovery call intent to the server inquiry submission payload.
- [ ] **Step 2.7**: **Validation Checkpoint CP-1 through CP-5**.

---

### Chunk 3: Media Asset Preloading & Video Preview Optimization
*Objective*: Optimize visual assets, implement skeleton loaders for thumbnail states, and ensure zero-layout-shift (CLS) on vertical video players.

- [ ] **Step 3.1**: Add explicit width/height aspect ratio wrappers (`aspect-[9/16]`) to prevent layout shifts.
- [ ] **Step 3.2**: Implement elegant skeleton shimmer states for image and simulated video frames.
- [ ] **Step 3.3**: Add `loading="lazy"` and `decoding="async"` across non-critical below-the-fold media.
- [ ] **Step 3.4**: Optimize showreel waveform audio simulation with smooth CSS transitions.
- [ ] **Step 3.5**: Add keyboard play/pause toggle (Spacebar) and scrub seek shortcuts (Left/Right arrows) in modals.
- [ ] **Step 3.6**: Test responsive rendering on viewport sizes from 320px to 2560px.
- [ ] **Step 3.7**: **Validation Checkpoint CP-1 through CP-5**.

---

### Chunk 4: Client Brief Export Suite & PDF Print Styling
*Objective*: Enhance the UGC Project Brief Checklist with a dedicated clean print stylesheet (`@media print`) and JSON/Markdown export for enterprise brand teams.

- [ ] **Step 4.1**: Define print-specific utility styles in `src/index.css` hiding headers, navbars, and interactive overlays.
- [ ] **Step 4.2**: Design a clean, branded one-page PDF/Print layout for `BriefChecklist.tsx`.
- [ ] **Step 4.3**: Add "Export Brief as Markdown" button for Notion, Google Docs, or Slack brief sharing.
- [ ] **Step 4.4**: Add a brief completeness indicator (e.g., "7 of 10 items ready") to guide prospective clients.
- [ ] **Step 4.5**: Add enterprise security note reassuring clients that unreleased tool URLs remain strictly private.
- [ ] **Step 4.6**: Verify print preview in Chrome/Firefox engines with zero page clipping.
- [ ] **Step 4.7**: **Validation Checkpoint CP-1 through CP-5**.

---

## 5. Handoff Template for Active State Logging

After each chunk execution, `/PROJECT_STATE.md` must be updated using this record template:

```markdown
### Chunk Execution Record: [Chunk Name / ID]
- **Session Timestamp**: YYYY-MM-DD HH:MM
- **Completed Steps**: Step X.1 through Step X.7
- **Checkpoint Results**:
  - CP-1 Lint: PASS (tsc --noEmit zero errors)
  - CP-2 Compile: PASS (applet compiled)
  - CP-3 Build: PASS (vite build <1s)
  - CP-4 Runtime / Security: PASS (headers & API verified)
  - CP-5 State Sync: PASS
- **New ADRs / Decisions**: [Document any design, security, or API decisions made]
- **Next Queued Chunk**: [Next Chunk ID]
```
