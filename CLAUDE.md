# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

A **documentation-only, technical-writing project** producing a speculative systems-engineering specification for the Star Wars DS-1 Orbital Battle Station. There is no source code, no build system, and no test suite. The primary artifact is a single long-form markdown document that is the source material for an intended 30–60-page PDR-style engineering-spec PDF. The audience framing inside the document is "Senior Technical Director review; doctrine-level engineering assessment."

Not a git repository. `git status` will fail until the user initializes one; do not `git init` without asking.

## Layout

- `ref-docs/` — Source reference material. The current canonical file is `Claude - DS-1 Orbital Battle Station Plans.md`. Treat files here as authoritative inputs.
- `docs/` — Intended home for derived/written deliverables (drafts, extracted sections, PDF exports). Currently empty.
- `to-dos/` — Intended home for task lists and scope tracking. Currently empty.

When asked to produce new writing, put drafts in `docs/`, not `ref-docs/`.

## Document conventions (load-bearing)

The spec is a **hybrid canon / real-physics** document. New content must preserve these conventions or it will be internally inconsistent:

- **Geometry of record: 120 km diameter (DS-1).** The 160 km figure (current Wookieepedia / DK *Incredible Cross-Sections*) is flagged as the alternate throughout and is the adopted figure for DS-2 (Appendix A). The document explicitly calls the 120-vs-160 choice a "first-order configuration variable" to be frozen at PDR — any rescaling cascades through mass, volume, surface area, and radiator budgets.
- **Design-basis mass: 1.0 × 10¹⁸ kg.** Lower bound ~2 × 10¹⁷ kg (modern-warship density scaling). Do not silently change this.
- **Alderaan shot energy: 2.24 × 10³² J** (Earth gravitational binding energy, 3GM²/5R). Sustained reactor average: 2.6 × 10²⁷ W at 24-hour recharge. These numbers are repeated across §2, §3, §7 — they must stay consistent.
- **Hypermatter is specified at c² (9 × 10¹⁶ J/kg) specific energy.** This is the single irreducible physics concession; most downstream numbers assume it. Do not introduce alternative reactor physics without updating the handwavium ledger.
- **Discredited figures to avoid resurrecting:** the 900-km DS-2 diameter (Saxton Executor-flyby reading) is explicitly rejected in §A.1 — do not cite it approvingly.
- **Handwavium ledger (HW-1 … HW-10) in §9 is a structured constraint.** New physics concessions should extend that table, not appear silently in prose.
- **Tone:** PDR-ready. Tables with units, equations with substituted values, order-of-magnitude arithmetic shown. "Handwavium" is used as a technical term of art, not a pejorative. Star Wars canon is treated as source material, not fan enthusiasm.

## Source-citation discipline

The document's final "Primary source citations" section groups references as **Canon/Legends** (Wookieepedia, DK cross-sections, WEG *Death Star Technical Companion*, novelizations), **Physicist analyses** (Siegel, Saxton, Wong, Allain, Cox, Minton), **Economic/construction** (Centives/Lehigh, Feinstein arXiv:1511.09054), **Real physics** (Alcubierre, White, Lentz, NIF/LLNL, ITER, CERN/ALPHA), and **Materials/asteroids** (NASA Psyche, Marchis et al., MatWeb). New claims in the same register should be cited in the same grouping style. Do not invent citations.

## Working on this repo

- Read `ref-docs/Claude - DS-1 Orbital Battle Station Plans.md` before proposing changes or additions — it is the single source of truth for the numerical design basis and the overall argument structure (§1 structure → §2 reactor → §3 superlaser → §4 propulsion → §5 ECLSS → §6 defense → §7 C3 → §8 vulnerabilities → §9 handwavium ledger → §10 minimum-handwave reconstruction → Appendix A DS-2).
- Edits to that file are real edits to the master document; prefer `Edit` over `Write` and preserve the existing table/equation formatting.
- No `bash`, `test`, `lint`, or `build` commands apply. There is nothing to run.
