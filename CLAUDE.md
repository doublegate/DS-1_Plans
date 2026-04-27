# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A speculative systems-engineering specification for the Star Wars DS-1 Orbital Battle Station, structured as a Preliminary Design Review (PDR) document package. Hybrid canon + real-physics analysis; audience framing is "Senior Technical Director review." The deliverable is a 30–60-page typeset PDF (built via Typst) plus an interactive React/TypeScript companion console.

This is a **technical-writing project with two small build pipelines** — most edits land in markdown. There is no test suite. Public GitHub repo: https://github.com/doublegate/DS-1_Plans · CC-BY-NC-4.0.

## Layout and authority chain

```
ref-docs/        ← source of authority (monolithic markdown spec)
  └─ Claude - DS-1 Orbital Battle Station Plans.md
docs/            ← derived, peer-review-friendly document tree (13 sections + 8 appendices)
to-dos/          ← phase plan + sprint backlog + live PROJECT-STATUS.md
proj-code/       ← Vite + React + TypeScript interactive console (authoritative edit target)
code-artifacts/  ← FROZEN reference HTML/JSX/TSX — do not modify
typeset/         ← Typst build pipeline (markdown → PDF)
```

Authority resolution: any conflict between a `docs/` file and the `ref-docs/` master is a bug **in the derived file** — the ref-doc wins until explicitly revised. Do not edit `ref-docs/` to chase a `docs/` change; revise the ref-doc deliberately and propagate.

The `docs/` reading order is fixed and lives in `docs/README.md`. The Typst build's `SECTIONS=` list in `typeset/build.sh` mirrors that order; both must move together.

## Document conventions (load-bearing — do not silently change)

The spec is a hybrid canon / real-physics document. New content must preserve these or it will be internally inconsistent:

- **Geometry of record:** DS-1 = **120 km**, DS-2 = **160 km**. The 120-vs-160 choice for DS-1 is frozen at PDR per decision D-6 in `to-dos/PROJECT-STATUS.md`. Rescaling cascades through mass / volume / surface area / radiator budgets.
- **Design-basis mass:** DS-1 = **1.0 × 10¹⁸ kg**; DS-2 = **2.37 × 10¹⁸ kg** (full DS-2 rebudget in `docs/appendix-A2-ds2-mass-power-thermal-budget.md`).
- **Alderaan shot energy:** **2.24 × 10³² J** (Earth gravitational binding energy, 3GM²/5R). Sustained reactor average: **2.6 × 10²⁷ W** at ~24-hour recharge (DS-1); DS-2 sums **7.8 × 10²⁷ W** across 3 cores at canonical 3–5 min recharge. These figures recur across §03/§04/§08 and the MPT appendices — keep them consistent.
- **Hypermatter specific energy:** **9 × 10¹⁶ J/kg = c²**. Single irreducible physics concession; most downstream numbers assume it. Do not introduce alternative reactor physics without updating the handwavium ledger.
- **Discredited figures to avoid resurrecting:** the 900 km DS-2 diameter (Saxton Executor-flyby reading) is explicitly rejected — do not cite it approvingly.
- **Crew baselines:** DS-1 = 1.7 × 10⁶; DS-2 = 637,835. The console's `proj-code/src/data/` modules duplicate these — propagate edits both ways.
- **Tone:** PDR-register. Tables with units, equations with substituted values, order-of-magnitude arithmetic shown. "Handwavium" is a technical term of art, not a pejorative.

## Traceability matrix (the spec's central discipline)

Every claim that exceeds real-physics envelope cites an **HW-ID** (HW-1 … HW-10) from `docs/10-handwavium-ledger.md`. Every stakeholder requirement (SR-01..SR-08) traces to one or more **derived requirements** (DR-01..DR-16) in `docs/appendix-F-vnv-plan.md`, each tagged with a verification class:

- **A** — Analysis (numerical demonstration within stated assumptions)
- **I** — Inspection (canon reconciliation)
- **T** — Test-eligible via a real-world analog program
- **C** — Concession (satisfied only by the cited HW-ID)

8 of 16 DRs are class-C. New physics concessions extend the HW table; new claims that bypass real physics without an HW-ID are bugs.

## Source-citation discipline

References live in `docs/appendix-C-references.md` grouped as: **Canon/Legends** (Wookieepedia, DK *Incredible Cross-Sections*, WEG *Death Star Technical Companion*, novelizations, Rogue One UVG), **Physicist analyses** (Siegel, Saxton, Wong, Allain, Cox, Minton), **Economic** (Centives/Lehigh; Feinstein arXiv:1511.09054), **Real-physics programs** (NIF, ITER, TAE, ALPHA, Psyche, NEXT-C, VASIMR, Lentz, MARAUDER, HELIOS, Epirus), **Materials/asteroids** (NASA Psyche, Marchis et al., MatWeb). New claims should be cited in the matching grouping. **Do not invent citations.** Real-program statuses are current as of April 2026 and tracked in `proj-code/src/data/realWorld2026.ts`.

## Build pipelines

### Typst → PDF (markdown spec)

Requires pandoc ≥ 3.0, Typst ≥ 0.11, and the JetBrains Mono + Chakra Petch fonts. macOS install: `brew install pandoc typst && brew install --cask font-jetbrains-mono font-chakra-petch`.

```
./typeset/build.sh          # one-shot: docs/*.md → typeset/generated/*.typ → dist/DS-1-PDR-v0.2.pdf
./typeset/build.sh --watch  # iterative authoring (typst watch)
```

`typeset/main.typ` `#include`s sections in `SECTIONS=` order with `#pagebreak()` before each part heading (Subsystem Specifications / Cross-Cutting Analysis / Appendices); `typeset/template.typ` carries the palette, front matter (cover · approval block · revision history · distribution / classification · TOC · LoF · LoT · acronym short-list), styling, and helper functions. `typeset/generated/` is gitignored (regenerated each build). Excluded from the PDF: `docs/README.md`, `docs/appendix-D2-figure-prompts.md` (working/index docs).

**Build-pipeline patches required for current toolchain.** The pipeline carries four non-obvious adjustments for pandoc 3.9 / typst 0.14 — if any of these are reverted, the build either silently produces a figure-less PDF or fails outright:

1. **`pandoc --from=gfm+implicit_figures`** — without `+implicit_figures`, pandoc 3.9 emits `#box(image(...))` for standalone `![alt](path)` lines instead of `#figure(image(...), caption: [alt])`. Captions then disappear.
2. **Per-file `#import "../template.typ": horizontalrule` injection** at the top of every generated `.typ`. Pandoc emits `#horizontalrule` for markdown `---` thematic breaks but Typst has no built-in; `#include`d files run in headless scope so a parent-scope `#let` is not visible. The shim itself lives in `template.typ`.
3. **Image-path rewrite via sed** — `../figures/` (correct from `docs/`) → `../../docs/figures/` (correct from `typeset/generated/`).
4. **`typst compile --root "$PROJECT_ROOT"`** — Typst restricts file access to its project root (default = `typeset/`); without `--root` set to the repo root, all cross-directory `image()` calls fail with `access denied`.

All four are implemented in `typeset/build.sh`; do not remove without re-validating with `pdfinfo dist/DS-1-PDR-v0.2.pdf | grep Pages` and `grep -c '#figure(image(' typeset/generated/*.typ` (expect 30 figure embeds across body docs).

### Figure-embedding convention

All 30 figures in `docs/appendix-D` §D.3 are inline-embedded in their owning subsystem markdown via the documented `![F-{id} — {title}. {description}.](../figures/F-{id}.png)` syntax. Placement is per `docs/appendix-D2-figure-prompts.md` §D2.4–D2.6 (the prompt directives) and §D.3 (the figure index). Three figures have **dual homes**: F-3.3 (reactor → beam chain) lives in `03 §3.2` with cross-reference from `04 §4.1`; F-7.2 (tractor busbar) lives in `07 §7.4` with cross-ref from `09 §9.3`; F-7.4 (DS-1 vs DS-2 exhaust) lives in `07 §7.7` with cross-ref from `12 §12.5`. Embedding the same figure twice produces duplicate `#figure` calls and breaks Typst's auto-numbering — always embed once and cross-reference from the secondary location with prose like `*See Figure F-X.Y (in §N.M) for ...*`.

### Vite + TypeScript (interactive console)

```
cd proj-code
npm install
npm run dev          # http://localhost:5173, hot reload
npm run build        # tsc --noEmit && vite build
npm run typecheck    # tsc --noEmit
npm run preview
```

There is no test runner and no linter wired up. `tsconfig.json` runs `"strict": false` with `strictNullChecks` + `strictFunctionTypes` on — pragmatic boundary-strictness; full strict is a deferred sprint.

The console ships in two parallel forms: `proj-code/DS1-Engineering-Console.html` (CDN distributable, zero-install for reviewers) and the `proj-code/src/` Vite tree (authoritative edit target). They must stay in sync — see R-6 in `to-dos/PROJECT-STATUS.md`.

## Working discipline

- **Read first:** `ref-docs/Claude - DS-1 Orbital Battle Station Plans.md` is the numerical and argument-structure baseline (§1 structure → §2 reactor → §3 superlaser → §4 propulsion → §5 ECLSS → §6 defense → §7 C3 → §8 vulnerabilities → §9 handwavium ledger → §10 minimum-handwave reconstruction → Appendix A DS-2). Read it before proposing changes.
- **Don't touch `ref-docs/` casually** — prefer `Edit` over `Write` if you do, and preserve existing table/equation formatting. Most edits should land in `docs/`.
- **Never modify `code-artifacts/`** — frozen reference implementations per CONTRIBUTING.md.
- **Numerical edits are dual-target:** the `proj-code/src/data/` modules duplicate spec numbers. An edit to a baseline figure in `docs/01-design-basis.md` (or any subsystem doc) should propagate to the matching `data/*.ts` module, and vice versa.
- **Project state.** **v0.2 released; CDR transition active.** PDR closed at v0.2 (commit `a4fc0c0`, annotated tag `v0.2`, GitHub release at https://github.com/doublegate/DS-1_Plans/releases/tag/v0.2). PDR → CDR transition launched 2026-04-26 with real-CDR fidelity scope across Phases 6–19; periodic incremental releases v0.3 → v1.0 (7 intermediate tags). Phase 6 (CDR Foundation) complete; latest tag is `v0.3-rc`. CDR plan in `/Users/parobek/.claude/plans/what-s-next-in-the-vast-stonebraker.md`. CDR conventions in `to-dos/cdr-conventions.md` (drawing standards · ICD policy · FEA-narration · requirement-numbering extensions DR-17.. + RR-NN + MR-NN + OR-NN + DR2-NN · CCB workflow · tone rubric · HW-11..HW-15 reserve · version-tag schema). Configuration management in `docs/appendix-G-configuration-management.md`. Drafting standards in `docs/appendix-H-drafting-standards.md`. ICD template at `docs/icd/_template.md`. CDR-depth subsystem expansions live in `docs/cdr/NN-detailed-{slug}.md` (parallel to PDR sections); ICDs in `docs/icd/ICD-NN-MM.md`. The `proj-code/` console is **frozen at PDR data parity through v1.0** (deferred to v2.0 thread); HW/DR/FMEA data parity is exempt from the freeze.
- **Phase scope is locked.** Per CONTRIBUTING.md: no new subsystems, no `docs/` structural refactors, no `proj-code/` scope expansion. Substantive content changes that affect the numerical baseline, traceability matrix, or the figure inventory require a version bump and a re-verification pass across `appendix-A`, `appendix-F`, and the relevant subsystem docs.
- **Status updates:** any milestone-level change updates `to-dos/PROJECT-STATUS.md` in the same commit.

## Commit / PR conventions

Conventional-commits prefixes (`feat:` / `fix:` / `docs:` / `refactor:` / `chore:` / `release:`). Commit messages are expected to be **comprehensive and technically detailed** — explain the *why*, the *how*, and the verification approach for the change, not just the *what*. Stage files explicitly rather than `git add -A` when secrets risk applies; the `.gitignore` already covers `dist/`, `node_modules/`, `typeset/generated/`, and the matplotlib venv. Pull requests are welcome from Phase 4 onward; GitHub issue templates (Peer Review / Bug Report / Question) are in `.github/ISSUE_TEMPLATE/`.

## Release process

- Annotated git tags `vN.M` (e.g. `v0.2`) mark release artifacts.
- A successful build produces `dist/DS-1-PDR-vN.M.pdf` (gitignored — reproducible from the tagged commit + the documented toolchain).
- Capture `shasum -a 256 dist/DS-1-PDR-vN.M.pdf` and record it in `CHANGELOG.md` and the GitHub release notes (Typst stamps a creation timestamp into PDF metadata, so a fresh rebuild yields a different byte-level SHA but identical visual content; the recorded SHA is for the canonical attached artifact).
- GitHub releases are created via `gh release create vN.M dist/DS-1-PDR-vN.M.pdf --title "..." --notes-file <release-notes.md>`. Notes should mirror the structure used for v0.2: artifact metadata table → spec contents → methodology → audit summary → reproducibility → version history → open follow-ups → acknowledgements.
