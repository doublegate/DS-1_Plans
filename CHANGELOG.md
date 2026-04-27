# CHANGELOG

Project-level history for the DS-1 Engineering Specification. Component-specific changelogs (e.g. `proj-code/CHANGELOG.md`) track their own scopes; this file tracks the document set, build pipelines, figures, and project-management artifacts as a whole. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) loosely; versioning tracks the draft cadence (0.x while Phase 3–4 iterate; 1.0 reserved for the first published PDF).

## [Unreleased] — Phase 3 substantially complete

### Added — Phase 0–3 gap analysis remediation + first end-to-end PDF build (2026-04-26, late)

- **30 figure references embedded in subsystem markdown.** A Phase 0–3 gap analysis revealed that all 30 figures existed as files in `docs/figures/F-{id}.png` but **zero were inline-referenced from any subsystem doc** — pandoc would have emitted a figure-less PDF. Fix: 30 `![caption](../figures/F-X.Y.png)` lines added across 9 subsystem docs (`02..09` + `12`) at the placement points specified in `appendix-D-figures-and-tables.md` §D.3 and `appendix-D2-figure-prompts.md` §D2.4–D2.6, plus three explicit cross-reference lines for the dual-home figures (F-3.3 referenced from `04` §4.1; F-7.2 referenced from `09` §9.3; F-A.1 / F-7.4 referenced reciprocally between `07` §7.7 and `12` §12.5). Per-doc embed counts: 02→6, 03→3, 04→5, 05→3, 06→3, 07→4, 08→3, 09→2, 12→1. Decision **D-14**.
- **`docs/appendix-D` §D.3** — 17 of 30 status rows promoted DRAFT → FINAL (all programmatic figures: 8 Mermaid + 2 Graphviz + 7 matplotlib). The 13 Nano Banana 2 illustrative figures remain DRAFT pending re-render to address minor label artifacts (per §D2.12 known gotchas: F-2.1 has a "DURASTEEL STANDOFF LAYER (.5–2 cm)" inset that should read 0.5–2 m; F-A.1 and F-7.4 show some `#4ec9b0` palette hex codes leaking into rendered data blocks).
- **First end-to-end Typst PDF build** — `dist/DS-1-PDR-v0.2.pdf`, 111 pages, 69 MB, A4. Milestone **M-07** closed. Sample-page extraction confirmed figures render with PDR-register captions ("Figure F-X.Y — title.") via Typst's `#figure(image(...))` form. Page-count target is 30–60; current 111 will be tightened during Phase 5 template iteration.
- **Build host tooling:** Homebrew install of `pandoc 3.9.0.2` and `typst 0.14.2`. JetBrains Mono / Chakra Petch are not installed system-wide so the PDF uses font fallbacks (typographic drift, acceptable for v0.2 build verification — install fonts before final release).

### Changed — Build pipeline patches (necessary for pandoc 3.9 / typst 0.14 compatibility)

- **`typeset/build.sh`** — three coordinated changes to bridge a pandoc-version × typst-version gap that the documented pipeline did not anticipate:
  1. **`pandoc --from=gfm+implicit_figures`** so a standalone `![alt](path)` line becomes `#figure(image(...), caption: [alt])` rather than `#box(image(...))`. Without `+implicit_figures`, pandoc 3.9 emits the bare `#box` form which renders as a captionless inline image — wrong for PDR register, breaks the `appendix-D2 §D2.9` documented contract.
  2. **Inject `#import "../template.typ": horizontalrule`** at the top of every generated `.typ` file. Pandoc 3.9 emits `#horizontalrule` for markdown `---` thematic breaks but Typst has no built-in by that name; Typst's `#include` evaluates included files in headless scope, so a parent-scope `#let horizontalrule = ...` is not visible. Per-file import injection is the cleanest fix that doesn't require modifying the generated content.
  3. **Rewrite figure-image paths** from `../figures/` (which is correct relative to the source markdown in `docs/`) to `../../docs/figures/` (which is correct relative to the generated `.typ` files in `typeset/generated/`). One-line `sed` pass after pandoc.
  4. **Pass `--root "$PROJECT_ROOT"` to `typst compile`/`typst watch`** so figures referenced as `../../docs/figures/F-X.png` resolve. Typst restricts file access to its project root by default (= `typeset/` for `main.typ`); without this, all image references fail with `access denied`.
- **`typeset/template.typ`** — added a top-level `#let horizontalrule = line(length: 100%, stroke: 0.5pt + rgb("#2a2f3a"))` so the per-file imports above resolve. Renders thematic breaks as a thin muted line matching the panel-border palette.

### Verification

- Grep counts confirmed: 30 `![F-` lines across `docs/0[2-9]-*.md` + `docs/12-*.md` (per-file: 02→6, 03→3, 04→5, 05→3, 06→3, 07→4, 08→3, 09→2, 12→1).
- All 30 referenced paths resolve to existing files in `docs/figures/`.
- Post-pandoc generated Typst contains 30 `#figure(image(...))` blocks across the same 9 source files.
- `typst compile --root "$PROJECT_ROOT"` exits 0 with font-fallback warnings only.
- PDF spot-checked: page 25 shows F-2.2 (equatorial trench cross-section) rendered with caption inside §2.7.

### Phase status

- **Phases 0, 1, 2, 3** — verified complete. Three independent Explore-agent audits on 2026-04-26 confirmed Phase 0/1/2 exit criteria are met (directory structure, document tree, cross-references, HW-1..10 ledger fully cited, DR-01..16 V&V matrix complete with classes, MPT/A2 budgets close within margin, FMEA top-10 complete). Phase 3 exit criteria are met as of this commit.
- **Phase 4 peer review** — unblocked. S4.1 (numerical cross-check) and S4.2 (citation audit) can begin in parallel without waiting on the remaining 13 illustrative-figure FINAL flips.

---

### Added — Phase 3 illustrative figures landed (2026-04-26, later same day)

- **13 Nano Banana 2 illustrative figures** committed at DRAFT status (M-11 closed). All generated by user against the prompts in `docs/appendix-D2-figure-prompts.md` §D2.4: F-2.1 (station cutaway, quarter-section), F-2.2 (equatorial trench cross-section), F-2.5 (Whipple shield stack), F-4.1 (superlaser amplifier chain), F-4.3 (phased-array focusing geometry), F-4.4 (planet-kill coupling triptych), F-4.5 (recoil & back-brace force path), F-5.1 (sublight ion-array southern-hemisphere top view), F-7.1 (ray vs particle shield), F-7.3 (MARAUDER plasma-toroid stages), F-7.4 (DS-1 vs DS-2 exhaust port comparison), F-8.1 (24-zone station map), F-A.1 (DS-1 vs DS-2 configuration plate).
- **Result:** all 30 figures in `appendix-D` §D.3 are now at DRAFT (17 programmatic + 13 illustrative). M-03 closed.

### Changed — File-naming normalization

- **Renamed 13 illustrative PNGs** from descriptive long-form filenames (e.g. `F-2.1 - Station Cutaway_Quarter Section.png`) to bare `F-{id}.png` per the §D2.8 naming convention so the Typst pipeline's `<../figures/F-2.1.png>` references resolve. Decision **D-13**.
- **`docs/appendix-D-figures-and-tables.md` §D.3** — 13 illustrative status rows flipped TBD → DRAFT; "Type" column annotated with "(Nano Banana 2)" for each.
- **`to-dos/PROJECT-STATUS.md`** — M-03 and M-11 milestones checked off; D-13 logged; next-actions list reordered to put Phase 4 peer review first now that figures are no longer the gating item.
- **`to-dos/sprint-backlog.md`** — every figure-row in S3.1..S3.4 checked off; S3.5 elevation-pass note added under "currently open".
- **`README.md`** status line and phase-status entry updated to "all 30 figures at DRAFT".

### Removed / quarantined

- **One Nano Banana 2 generation labeled "F-5.2 Reactor Detailed Schematic"** was a content miss — the image rendered the ion-array layout (SEPMA 30-5 main engines + equatorial trench thrusters) rather than a reactor. It would have collided with the existing Mermaid F-5.2 (hyperdrive phase-lock) and didn't fit any §3 (power generation) figure slot. Relocated to `docs/figures/_iterations/F-5.1.alt-crop.png` (gitignored) as an alternate F-5.1 take rather than promoted; the existing Mermaid F-5.2 is preserved unchanged. If a §3 reactor schematic is desired in a later iteration, a new prompt block will be needed in `appendix-D2`.

---

### Added — Phase 3 partial execution (2026-04-26, earlier in the day)

- **17 programmatic figures rendered to DRAFT status** in `docs/figures/`:
  - **8 Mermaid flowcharts/sequence diagrams** — F-2.3 (load-path hierarchy), F-2.6 (M-type asteroid ISRU throughput), F-3.3 (reactor → beam conversion chain), F-5.2 (123 SSP06 hyperdrive phase-lock topology), F-6.1 (ECLSS primary + secondary loop architecture), F-7.2 (tractor-beam mesh busbar — DS-1 vs improved), F-8.2 (C3 hierarchy + latency budget), F-8.3 (anti-fighter kill-chain sequence diagram).
  - **2 Graphviz fault trees** — F-9.1 (Yavin exploit fault tree), F-9.2 (Endor exploit fault tree).
  - **7 matplotlib plots** — F-2.4 (hull thermal gradient across terminator), F-3.1 (reactor specific-energy vs required fuel mass, log-log), F-3.2 (Stefan-Boltzmann hull radiated power vs temperature), F-4.2 (beam intensity at aperture vs material LIDT, horizontal log-x bar chart), F-5.3 (Lentz-class soliton scaling — field energy vs bubble size), F-6.2 (internal great-circle transit time by mode), F-6.3 (hangar volumetric allocation, twin pie + bar).
- **Both SVG and 300 dpi PNG** committed for every figure (34 deliverable files).
- **Reproducible source artifacts** archived in `docs/figures/_sources/` per appendix D2 §D2.8: `.mmd` (Mermaid), `.dot` (Graphviz), `F-figures.py` (matplotlib generator with full D2.7 palette wiring), `mermaid-config.json` (Mermaid theme override matching the project palette: `#0a0e1a` background, `#f5a623` amber primary, `#4ec9b0` cyan callouts, `#e74c3c` red warnings, `#2ecc71` green safe), `render-mermaid.sh` (orchestration script).

### Added — Documentation

- **Root `CHANGELOG.md`** (this file). Component-specific changelogs in subprojects continue to track their own scope.

### Changed — Documentation

- **`CLAUDE.md` rewritten** to reflect current repo reality. Removed stale claims ("not a git repository", "docs/ currently empty"). Added: authority chain (`ref-docs/` wins over `docs/`; `code-artifacts/` frozen; `proj-code/src/` authoritative), Typst PDF + Vite/TS build pipelines with exact commands, traceability matrix discipline (HW-1..10 × DR-01..16 with A/I/T/C verification classes; 8 of 16 DRs are class-C), source-citation grouping discipline, dual-target numerical-edit rule (spec ↔ `proj-code/src/data/*.ts`), and phase-scope lock per CONTRIBUTING.md. Updated DS-2 mass to **2.37 × 10¹⁸ kg** to match the post-rebudget figure in `docs/appendix-A2-ds2-mass-power-thermal-budget.md`.
- **`README.md`** status line updated to reflect 17/30 DRAFT figures; figure-generation section expanded with regeneration commands for all three programmatic toolchains; phase-status entry updated.
- **`docs/appendix-D-figures-and-tables.md` §D.3** — 17 status rows flipped TBD → DRAFT; "Type" column now annotates the production tool used for each rendered figure (Mermaid / Graphviz / matplotlib).
- **`to-dos/PROJECT-STATUS.md`** — date bumped to 2026-04-26; M-03 marked in-progress with completion fraction; D-12 decision logged ("programmatic figures rendered via local toolchain"); next-actions list reordered around the 13 remaining illustrative figures (M-11) and the available parallel work in Phase 4 S4.1 / S4.2.
- **`to-dos/sprint-backlog.md`** — programmatic-figure backlog items checked off across S3.1–S3.4; remaining illustrative items annotated with `(Nano Banana 2)`; M-11 user-task placeholder added under "currently open / next actions".

### Changed — Tooling

- **`.gitignore`** — venv (`docs/figures/_sources/.venv/`) and `__pycache__/` ignored to keep figure-source archive lean.

### Tooling installed (host-machine)

- `matplotlib 3.10.9` + `numpy` in `docs/figures/_sources/.venv/` (gitignored, project-local).
- `graphviz 14.1.5` via Homebrew (system-wide).
- `@mermaid-js/mermaid-cli 11.12.0` via npm global.

---

## [0.2] — 2026-04-22 — Phase 2 close + GitHub publication

(Reconstructed from git log + `to-dos/PROJECT-STATUS.md` decision log.)

### Added

- **CC-BY-NC-4.0 LICENSE** + GitHub community files (`.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`, `CONTRIBUTING.md`, `NOTICE.md`). Decision **D-11**.
- **Public GitHub repository** at https://github.com/doublegate/DS-1_Plans. Milestone **M-12** complete.
- **Phase 2 "engineering artifacts"** — appendices A through F (mass/power/thermal budget, nomenclature, references, figures index, FMEA, V&V plan).
- **Phase 2 S2.4 gap closure** — derived requirements **DR-13..DR-16** added for HW-4 / HW-6 / HW-8 / HW-9 (waste-heat / recoil / artificial gravity / tractor-beam concessions); risk **R-4** closed.
- **Full DS-2 MPT rebudget** — `docs/appendix-A2-ds2-mass-power-thermal-budget.md`. DS-2 design-basis mass formalized at **2.37 × 10¹⁸ kg**. Milestone **M-02b**.
- **`docs/appendix-D2-figure-prompts.md`** — production-ready prompts and recipes for all 30 figures (Nano Banana 2 prompts, Mermaid/Graphviz sources, matplotlib recipes, palette specification, naming convention, iteration log template).
- **Typst typesetting pipeline** — `typeset/main.typ`, `typeset/template.typ`, `typeset/build.sh`. Decision **D-8**.
- **`proj-code/` Vite + React + TypeScript refactor** — monolithic `.tsx` retired; 35-file `src/` tree with `theme.ts` design tokens, typed boundaries, 16 single-table data modules, 7 component primitives, 9 tabs, print stylesheet for Ledger-tab PDF export. Decision **D-10**, milestone **M-09**. Detail in `proj-code/CHANGELOG.md`.

### Changed

- **DS-1 / DS-2 geometry frozen** — DS-1 = 120 km, DS-2 = 160 km. Decision **D-6**, risk **R-1** closed.
- **vite bumped to ^6.4.2** to resolve CVE-2026-39365.

---

## [0.1] — 2026-04-21 — Initial commit + Phase 1 split

### Added

- **Initial commit** of the DS-1 Orbital Battle Station engineering specification: monolithic ref-doc in `ref-docs/Claude - DS-1 Orbital Battle Station Plans.md` (full PDR-register source authority — sections §1 structure, §2 reactor, §3 superlaser, §4 propulsion, §5 ECLSS, §6 defense, §7 C3, §8 vulnerabilities, §9 handwavium ledger, §10 minimum-handwave reconstruction, Appendix A DS-2). Milestone **M-00**.
- **Phase 1 document split** — ref-doc decomposed into `docs/00..12*.md` (executive summary, design basis, 11 subsystem sections, DS-2 delta). Milestone **M-01**, decision **D-4**.
- **`to-dos/` work-tracking tree** — phase plan, 5 phase files, sprint backlog, live PROJECT-STATUS.
- **Project conventions** — original `CLAUDE.md`; load-bearing numerical baselines locked (1.0 × 10¹⁸ kg DS-1 mass, 2.24 × 10³² J Alderaan-shot energy, 2.6 × 10²⁷ W sustained reactor at 24-h recharge, hypermatter at c² = 9 × 10¹⁶ J/kg specific energy). Decision **D-1** / **D-3**.
- **Reference console implementations** archived as frozen baselines in `code-artifacts/` (HTML CDN distributable + JSX + TSX).
