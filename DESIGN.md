---
name: DS-1 Orbital Battle Station — Engineering Specification & Interactive Console
description: Classified military-industrial Preliminary/Critical Design Review dossier and live dark-terminal telemetry console.
colors:
  imperial-amber: "#e8a317"
  imperial-amber-glow: "#ffb830"
  telemetry-cyan: "#0891b2"
  telemetry-cyan-glow: "#22d3ee"
  concession-crimson: "#dc2626"
  concession-crimson-glow: "#ff3a3a"
  kyber-green: "#16a34a"
  kyber-green-glow: "#4ade80"
  comparison-violet: "#7c3aed"
  dossier-cream: "#f0e6d2"
  horuz-void: "#0a0a0e"
  command-surface: "#12141a"
  durasteel-panel: "#1a1d26"
  durasteel-panel-hi: "#222632"
  structural-hairline: "#2d3340"
  active-hairline: "#3d4452"
  phosphor-white: "#e8e8ed"
  telemetry-muted: "#949aa6"
  annotation-dim: "#828997"
typography:
  display:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.025em"
  headline:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.08em"
  title:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "0.1em"
  metric:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
    fontFeature: "'tnum' 1, 'zero' 1"
  body:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "'Chakra Petch', sans-serif"
    fontSize: "0.625rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  none: "0px"
  pdf-code: "2pt"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.imperial-amber}"
    textColor: "{colors.horuz-void}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.imperial-amber-glow}"
    textColor: "{colors.horuz-void}"
  button-danger:
    backgroundColor: "{colors.concession-crimson}"
    textColor: "{colors.phosphor-white}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-danger-active:
    backgroundColor: "{colors.kyber-green}"
    textColor: "{colors.phosphor-white}"
  button-ghost:
    backgroundColor: "{colors.durasteel-panel}"
    textColor: "{colors.phosphor-white}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 16px"
  button-filter:
    backgroundColor: "{colors.horuz-void}"
    textColor: "{colors.telemetry-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  button-filter-active:
    backgroundColor: "{colors.imperial-amber}"
    textColor: "{colors.horuz-void}"
  nav-tab:
    backgroundColor: "{colors.command-surface}"
    textColor: "{colors.telemetry-muted}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "10px 16px"
  nav-tab-active:
    backgroundColor: "{colors.durasteel-panel}"
    textColor: "{colors.imperial-amber}"
  panel-card:
    backgroundColor: "{colors.durasteel-panel}"
    textColor: "{colors.phosphor-white}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "20px"
  pill-amber:
    backgroundColor: "#e8a3171a"
    textColor: "{colors.imperial-amber}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  pill-cyan:
    backgroundColor: "#0891b21a"
    textColor: "{colors.telemetry-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  pill-red:
    backgroundColor: "#dc26261a"
    textColor: "{colors.concession-crimson}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  pill-green:
    backgroundColor: "#16a34a1a"
    textColor: "{colors.kyber-green}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
---

# Design System: DS-1 Orbital Battle Station

## Overview

**Creative North Star: "The Imperial PDR Dossier & Telemetry Console"**

This visual system presents a 120-km orbital battle station as a deadpan, forensic systems-engineering artifact—where aerospace blueprint discipline and MIL-STD Preliminary/Critical Design Review documentation meet a live dark-terminal telemetry console. Every screen and page treats impossible orders of magnitude ($10^{18}\text{ kg}$, $10^{27}\text{ W}$, $10^{32}\text{ J}$) with clinical composure: monospace scientific notation, explicit section-code stamps (`§0` through `§12`, `Appx A–H`), and color-coded traceability badges that separate analytical physics (`DR-NN` Class A) from irreducible physics concessions (`HW-1..10` Class C).

The aesthetic is forensic, dense, and instrument-grade. Surfaces are constructed from stepped dark slate planes bounded by razor-sharp `1px` structural hairlines, square `0px` corners, and `6px × 6px` hardware status pips. The system strictly rejects rounded consumer SaaS cards, soft ambient drop shadows, playful sci-fi fan-art ornament, and decorative neon cyberpunk gradients. When a surface illuminates—whether an amber timeline scrubber or a green tributary laser convergence—that light represents an explicit physical state or active measurement, never decoration.

**Key Characteristics:**
- **Dual-Authority Continuity:** Shared token vocabulary across the interactive web console (`proj-code/src/theme.ts`), the 74-page Typst specification (`typeset/template.typ`), and the high-contrast A4 print export (`proj-code/src/styles/print.css`).
- **Semantic Traceability Color-Coding:** Every accent hue maps to a specific verification or physical role—Amber for baseline command and inspection, Cyan for analysis and CDR deltas, Crimson for physics concessions (`HW-ID`) and critical RPN failure modes, and Green for real-world 2026 test analogs and superlaser firing sequences.
- **Monospace Data First, Geometric Header Chrome:** Squared-off `Chakra Petch` uppercase headers and section tags frame `JetBrains Mono` prose, equations, and `tabular-nums` budgets.
- **Zero-Radius Hardware Framing:** Strict `0px` corners across all web panels, buttons, pills, and scrubbers, anchored by `6px` square status pips and right-aligned document section codes.

## Colors

The palette pairs a deep, non-reflective dark-terminal chassis with four high-visibility semantic signal hues that encode engineering verification status at a glance.

### Primary
- **Imperial Command Amber** (`#e8a317`) & **Imperial Amber Glow** (`#ffb830`): Primary command accent, active tab border and label, section kickers, primary action triggers, inspection-class (`I`) verification badges, and the reactor core thermal signature.

### Secondary
- **Analysis Telemetry Cyan** (`#0891b2`) & **Telemetry Cyan Glow** (`#22d3ee`): Analytical verification class (`A`), derived requirement (`DR-NN`) badges, sublight/weapons telemetry vectors, blueprint phase overlays, and CDR-new callout rules (`#4ec9b0` in Typst print templates).

### Tertiary
- **Concession Crimson** (`#dc2626`) & **Concession Crimson Glow** (`#ff3a3a`): Handwavium concession badges (`HW-1..10`, Class `C`), physics-wall failure indicators, high-RPN FMEA bars ($\text{RPN} \ge 500$), and the primary superlaser ignition trigger at rest.
- **Kyber Ignition Green** (`#16a34a`) & **Kyber Green Glow** (`#4ade80`): Test-eligible verification class (`T`), real-world 2026 analog program status badges, active telemetry link indicator (`LINK ACTIVE`), FMEA mitigation lines, and the converging 500-nm tributary/superlaser beam during firing sequences.
- **Comparison Violet** (`#7c3aed`): Reserved exclusively for secondary comparative data series in logarithmic charts (e.g., Wong relativistic mass-scattering bar vs. baseline Alderaan binding energy).
- **Dossier Cream** (`#f0e6d2`): Typeset specification secondary display text, inline/block raw code tint, and ICD subtitle contrast in the Typst PDF pipeline.

### Neutral
- **Horuz Void** (`#0a0a0e`): Root viewport canvas, SVG cutaway space background, and high-contrast text fill on solid amber buttons.
- **Command Surface** (`#12141a`): Sticky command header, tab navigation bar, global footer, and nested sub-cards inside primary panels.
- **Durasteel Panel** (`#1a1d26`) & **Durasteel Panel High** (`#222632`): Standard instrument panel surface (`Panel`), active navigation tab background, range slider track, and chart tooltip background.
- **Structural Hairline** (`#2d3340`) & **Active Hairline** (`#3d4452`): Default `1px solid` panel borders, table header dividers, scrollbar thumbs, and SVG callout leader lines (`#2d334040` at 25% alpha for internal table row dividers).
- **Phosphor White** (`#e8e8ed`): Primary body copy, table primary cells, and primary heading text.
- **Telemetry Muted** (`#949aa6`): Panel titles, table column headers, section descriptions, inactive tab labels, and chart axis ticks.
- **Annotation Dim** (`#828997`): Document section codes (`§03–04`, `DOC-001 §00`), measurement units (`× 10³² J`, `km`), footnote annotations, and footer disclaimers (WCAG AA ≥ 4.5:1 on `#1a1d26`).

### Named Rules
**The Semantic Signal Rule.** Never assign Amber (`#e8a317`), Cyan (`#0891b2`), Crimson (`#dc2626`), or Green (`#16a34a`) for arbitrary visual variety; each hue must correspond to its engineering meaning (Command/Inspection, Analysis/CDR, Concession/Danger, or Test-Eligible/Active Ignition).

**The Print Inversion Rule.** When rendering to print (`@media print` in `print.css`), all dark surfaces (`#0a0a0e`, `#12141a`, `#1a1d26`) invert deterministically to pure white (`#ffffff`) with black ink (`#000000`) and `#333333`/`#555555` hairline borders so exported ledgers sit cleanly beside A4 engineering paperwork.

## Typography

**Display & Chrome Font:** `'Chakra Petch', sans-serif`
**Body, Data & Code Font:** `'JetBrains Mono', ui-monospace, monospace` (with `'IBM Plex Mono', 'DejaVu Sans Mono', 'Menlo'` fallbacks in Typst)

**Character:** Squared, stencil-adjacent `Chakra Petch` provides military-industrial signage and panel classification headers, while `JetBrains Mono` serves as the workhorse for everything else—ensuring equations, exponents, and multi-column engineering tables align with mechanical precision.

### Hierarchy
- **Display / Section Title** (`Chakra Petch`, weight `600`, `24px–30px` / `1.5rem–1.875rem`, line-height `1.2`, letter-spacing `0.025em`): Top-level view titles in `SectionHeader` (`h2`).
- **Headline / Station Banner** (`Chakra Petch`, weight `600`, `18px–20px` / `1.125rem–1.25rem`, line-height `1.25`, letter-spacing `0.08em`): Top command bar station title (`DS-1 ORBITAL BATTLE STATION`).
- **Title / Panel & Tab Header** (`Chakra Petch`, weight `600`, `12px` / `0.75rem`, line-height `1.35`, letter-spacing `0.1em`, `uppercase`): `Panel` header titles, active navigation tabs, and primary action buttons.
- **Metric Readout** (`JetBrains Mono`, weight `700`, `24px` / `1.5rem`, line-height `1.15`, `tabular-nums`): Primary numerical values in `StatBlock`, paired inline with a `12px` (`0.75rem`) dim unit label.
- **Body / Specification Prose** (`JetBrains Mono`, weight `400`, `14px` / `0.875rem`, line-height `1.625`, max measure `48rem` / `768px` via `max-w-3xl` on section descriptions): Executive summaries and analytical explanations; steps down to `12px` (`0.75rem`) inside dense data tables and bullet registers (`9pt` with `0.55em` leading in the Typst PDF).
- **Label / Kicker / Pill / Code Stamp** (`Chakra Petch` or `JetBrains Mono`, weight `500–600`, `10px` / `0.625rem`, line-height `1.2`, letter-spacing `0.1em–0.3em`, `uppercase`): Section kickers (`0.3em` tracking), `Pill` badges (`0.05em–0.1em` tracking), table `th` headers, and right-aligned section reference codes (`§10`, `HW-1 … HW-10`).

### Named Rules
**The Tabular Exponent Rule.** All numerical readouts, RPN counters, and animated scrubbers must use `JetBrains Mono` with `font-variant-numeric: tabular-nums` and proper Unicode superscripts (`10¹⁸ kg`, `10³² J`, never `10^18` caret notation in display prose) so figures never jitter during count-up or scrubbing.

**The Uppercase Chrome Rule.** `Chakra Petch` is reserved for structural chrome—headers, kickers, tabs, buttons, and pills—almost always in `uppercase` with `0.08em` to `0.3em` positive tracking; never set multi-sentence paragraphs in `Chakra Petch`.

## Layout

The web console uses a wide, telemetry-dense layout centered in a `max-w-[1800px]` (`1800px`) container with `16px` (`px-4`) horizontal padding on mobile and `24px` (`px-6`) on desktop (`md:px-6`), and `24px` (`py-6`) vertical main-stage padding.

- **Grid Architecture:** Views compose 12-column-equivalent CSS Grid layouts using `grid-cols-1 lg:grid-cols-3`, `grid-cols-1 lg:grid-cols-5` (e.g., `2:3` split between the square SVG station schematic and phase tables), and nested `grid-cols-2 md:grid-cols-4` stat matrices.
- **Spacing Rhythm:** Standard grid gaps are `16px` (`gap-4` between primary panels) and `12px` (`gap-3` between compact stat panels), with `24px` (`mb-6`) vertical separation between major row groups.
- **Internal Panel Density:** Standard `Panel` padding is `20px` (`p-5`), tightening to `16px` (`p-4`) for `StatBlock` cells and `12px` (`p-3`) for nested real-world analog cards.
- **Typeset & Print Geometry:** Both the Typst specification (`typeset/template.typ`) and the console print stylesheet (`print.css`) target `A4 portrait` (`2cm` margins in Typst; `1.5cm 1.2cm` in browser print), with `two-col` (`1em` gutter) available for dense CDR registers.

## Elevation & Depth

This system uses **flat tonal architecture with emissive energy states**. There are zero drop shadows on cards, panels, buttons, or modals at rest. Depth is established strictly through stepped dark background luminance (`#0a0a0e` canvas → `#12141a` command bar and nested sub-cards → `#1a1d26` instrument panels → `#222632` high-emphasis cells) and crisp `1px solid` perimeter borders (`#2d3340` or a semantic accent).

### Emissive & Atmospheric Vocabulary
- **Range Scrubber Thumb Glow** (`box-shadow: 0 0 8px #e8a317`): Applied exclusively to the `14px × 14px` square slider thumb (`input[type=range]`) to signify an interactive live-control handle.
- **Sticky Command Header Blur** (`backdrop-filter: blur(6px)`): Applied to the sticky top header (`background: #12141a`, `z-index: 50`) so scrolling telemetry recedes cleanly beneath the station banner.
- **Schematic Energy Filter** (`SVG feGaussianBlur stdDeviation="4"`): Applied inside `StationDiagram.tsx` (`#glowF`) strictly to the pulsing hypermatter reactor core and the converging superlaser beams.

### Named Rules
**The Zero-Shadow Chassis Rule.** Never apply `box-shadow` to a `Panel`, `StatBlock`, `Pill`, or button; hierarchy between containers is communicated by switching the `1px solid` border from neutral `#2d3340` to a semantic accent (`#e8a317`, `#0891b2`, `#dc2626`, `#16a34a`) and stepping surface luminance.

## Shapes

Every interactive and structural element in the web console is **square-cornered (`0px` border-radius)** and hardware-keyed, evoking machined instrument bezels and MIL-STD drafting blocks.

- **Corner Radius:** `0px` across all web panels, buttons, pills, inputs, tooltips, and progress bars. (Only the Typst PDF template permits `1pt–2pt` radius on inline/block code boxes and classification callouts.)
- **Perimeter & Divider Lines:** `1px solid` borders everywhere in the web UI (`0.3pt–1pt` strokes in Typst). Internal table rows and list items divide with `1px solid #2d334040` (25% alpha hairline) so horizontal rules guide the eye without competing with the outer panel frame.
- **Hardware Status Pips & Kickers:** Panel headers lead with a `6px × 6px` solid square pip matching the panel's `accent` border color; bulleted engineering lists use `5px × 5px` square pips (`#16a34a` or `#dc2626`); `SectionHeader` kickers lead with a `20px × 1px` solid amber horizontal rule.
- **Schematic Vector Language:** Circular orbital geometry appears exclusively inside SVG diagrams (`StationDiagram`, `RadialGauge`, header Death Star emblem), set against a `12px × 12px` dot-matrix grid pattern (`#griddot`, `r="0.5"`, `opacity="0.4"`) with `0.5px` horizontal leader lines to uppercase monospace labels.

## Components

Every component feels **crisp, square-cornered (`0px` radius), and hardware-keyed**—reading like a physical aerospace console switch or MIL-STD drafting block with `6px` status pips and section-code stamps.

### Buttons
- **Shape:** Strictly rectangular (`0px` border-radius), uppercase `Chakra Petch` (`12px` / `0.75rem` for actions, `10px` / `0.625rem` for inline filters), `letter-spacing: 0.1em`.
- **Primary Action Button:** Solid Imperial Command Amber (`#e8a317`) background, `#0a0a0e` bold text (`font-weight: 600`), `8px 16px` (`py-2 px-4`) padding. Transitions to `#dc2626` with `#ffffff` text when toggling an active playback loop into `PAUSE`.
- **Ignition Danger Button:** Full-width (`flex-1 py-2`) trigger in `CommandTab` and `ReactorTab`; rests in Concession Crimson (`#dc2626`) with `#ffffff` text (`COMMENCE PRIMARY IGNITION`) and shifts to Kyber Green (`#16a34a` at `0.5` opacity, `cursor: default`) while `FIRING...` is active.
- **Ghost / Secondary Utility Button:** `#1a1d26` background, `1px solid #2d3340` border, `#e8e8ed` text/icon, `8px 16px` padding (used for reset/scrub controls).
- **Segmented Filter Toggle:** Compact `2px 8px` (`px-2 py-0.5`) button (`10px` `Chakra Petch`); unselected state uses `transparent` background, `1px solid #2d3340` border, and `#8a8f9a` text; active state uses `#e8a317` background and border with `#0a0a0e` text.
- **Focus State:** Global `:focus-visible` applies `outline: 2px solid #e8a317; outline-offset: 2px`.

### Chips / Pills (`Pill`)
- **Style:** Square-cornered inline badge (`0px` radius), `2px 8px` (`px-2 py-0.5`) padding, `10px` (`0.625rem`) uppercase `Chakra Petch` with `0.05em` tracking.
- **Tones:** Border is `1px solid <tone>40` (25% alpha) over a `<tone>10` (6% alpha) translucent fill, with solid `<tone>` text (`amber` `#e8a317`, `cyan` `#0891b2`, `red` `#dc2626`, `green` `#16a34a`, or `default` `#8a8f9a`). Used for `HW-1..10`, `DR-01..16`, `FMEA` IDs, and `2026` program tags.

### Cards / Containers (`Panel` & `StatBlock`)
- **Corner Style:** `0px` radius.
- **Background & Border:** `#1a1d26` background with `1px solid` border defaulting to `#2d3340` or overridden via the `accent` prop (`#e8a317`, `#dc2626`, `#0891b2`, `#16a34a`).
- **Header Bar:** Optional header row (`mb-3 pb-2`) with `1px solid #2d3340` bottom divider, left-aligned `6px × 6px` square pip in the panel's `accent` color + `12px` uppercase `Chakra Petch` title (`#8a8f9a`, weight `600`), and right-aligned `10px` `JetBrains Mono` section code (`#5a5f6a`, e.g., `DOC-001 §0`, `HW-1 … HW-10`).
- **Internal Padding:** `20px` (`p-5`) standard; `16px` (`p-4`) when wrapping a single `StatBlock`.
- **`StatBlock` Anatomy:** Vertical stack (`py-2`) with `10px` uppercase `Chakra Petch` label (`#8a8f9a`), `24px` bold `JetBrains Mono` `tabular-nums` value colored by `tone`, inline `12px` unit (`#5a5f6a`), and `10px` bottom note (`#5a5f6a`).

### Inputs / Fields (Range Scrubber)
- **Track:** `height: 4px`, `#1a1d26` background, `1px solid #2d3340` border, `0px` radius.
- **Thumb:** `14px × 14px` square (`0px` radius), `#e8a317` fill, `2px solid #0a0a0e` border, `box-shadow: 0 0 8px #e8a317`, `cursor: pointer`.

### Navigation
- **Top Command Header:** Sticky (`top: 0`, `z-index: 50`) `#12141a` bar with `1px solid #2d3340` bottom border, `36px × 36px` animated SVG Death Star mark, station title/subtitle, right-aligned telemetry status cluster (`6px` pulsing green square + `LINK ACTIVE` · `STARDATE · Y19 · HORUZ` · `CLASSIFIED · IMDEP-1`), and bottom `ScannerLine`.
- **Section Tab Bar:** Horizontal scrollable strip (`#12141a`, `border-bottom: 1px solid #2d3340`) of 9 tabs (`gap-1`). Each tab (`px-4 py-2.5`) displays a `14px` Lucide icon, uppercase `Chakra Petch` label (`12px`, `tracking-widest`), and a `9px` `0.6`-opacity section code (`§0`, `§1`, `Appx A`, `HW/DR/FMEA`). Inactive tabs have `transparent` background/border and `#8a8f9a` text; the active tab has `#1a1d26` background, `1px solid #e8a317` border on all four sides, `#e8a317` text, and `font-weight: 600`.

### Signature Components (`StationDiagram` & `ScannerLine`)
- **`StationDiagram`:** Interactive `520 × 520` (or `360 × 360`) SVG cutaway over a `12px` dot-matrix grid (`#griddot`), progressively revealing 7 orbital construction phases (`buildProgress` `0.0` → `1.0`) from cyan dashed blueprint (`DESIGN PHASE`) and pulsing amber/red reactor core to 24 latitudinal rings, `#3a4050 → #0a0a0e` radial hull plating, equatorial/meridian trenches, 8-tributary superlaser dish, 120 seeded cyan weapon battery nodes, and the `3.5s` green `#4ade80` firing convergence sequence.
- **`ScannerLine`:** `2px`-high (`h-0.5`) horizontal divider with a `15%`-alpha track (`#e8a31715` or `#2d334015`) and a `64px`-wide linear-gradient sweep (`transparent → color → transparent`) translating `-100%` to `400%` over `4s linear infinite`.

## Do's and Don'ts

### Do:
- **Do** stamp every `Panel` that represents a specification section or dataset with its corresponding document code (`§0`–`§12`, `Appx A–H`, `HW-1 … HW-10`, `DR-01 … DR-16`) in the right-aligned `code` slot (`#5a5f6a`, `10px`).
- **Do** use `Pill` components with semantic tones (`red` for Class C / `HW-ID`, `cyan` for Class A / `DR-ID`, `amber` for Class I / DS-1 FMEA, `green` for Class T / 2026 analogs) so verification status is scannable across both the web console and the Typst PDF.
- **Do** pair `Chakra Petch` uppercase structural labels with `JetBrains Mono` `tabular-nums` values and explicit SI units (`km`, `kg`, `W`, `J`, `MPa`) on every metric and chart axis.
- **Do** verify that any new table or ledger view degrades gracefully under `@media print` (`print.css`) into bordered black-on-white A4 portrait tables.

### Don't:
- **Don't** introduce border-radius (`rounded-md`, `rounded-lg`, `rounded-full`) on panels, buttons, pills, inputs, or tooltips in the web console; `0px` corners are a load-bearing identity invariant.
- **Don't** apply decorative drop shadows, glassmorphic cards, or multi-stop neon gradients to UI containers; reserve glow strictly for active physical states (`StationDiagram` core/beam and range slider thumbs).
- **Don't** use `Chakra Petch` for body paragraphs, table cells, or mathematical equations; body copy and numeric data must always render in `JetBrains Mono`.
- **Don't** mix or repurpose the four semantic signal colors (`#e8a317`, `#0891b2`, `#dc2626`, `#16a34a`) outside their assigned engineering verification and telemetry roles.
