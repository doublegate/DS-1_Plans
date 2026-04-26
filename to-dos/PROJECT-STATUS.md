# PROJECT-STATUS

**Project:** DS-1 Orbital Battle Station Engineering Specification
**Draft version:** 0.2
**Last updated:** 2026-04-26
**Current phase:** Phase 3 nearly complete — all 30 figures at DRAFT; S3.5 elevation pass next

---

## Health

| Dimension | Status | Notes |
|---|---|---|
| Scope | Green | Ref-doc covers all 10 subsystems + DS-2 appendix; no scope gaps |
| Schedule | Not-started-baseline | No external deadline; self-paced |
| Quality | Green | Source-of-truth ref-doc is PDR-register; derivatives match |
| Risk | Amber | Phase 3 figure production is the largest schedule unknown |

## Milestone checklist

- [x] **M-00 Foundation** — repository skeleton + CLAUDE.md conventions (completed 2026-04-21)
- [x] **M-01 Document split** — ref-doc decomposed into `docs/00..12*.md` (completed 2026-04-21)
- [x] **M-02 Engineering artifacts** — `appendix-A..F.md` produced (completed 2026-04-21)
- [x] **M-02b Phase 2 gap closure** — DR-13..DR-16 added; DS-2 full MPT rebudget (completed 2026-04-22)
- [x] **M-06 Typesetting decision** — Typst selected (completed 2026-04-22)
- [x] **M-09 Console refactor** — Vite + TS types + module split + print CSS (completed 2026-04-22)
- [x] **M-10 Git init** — local repo initialized (completed 2026-04-22)
- [x] **M-03 Figures v1** — all 30 at DRAFT (8 Mermaid + 2 Graphviz + 7 matplotlib programmatic, 2026-04-26; 13 Nano Banana 2 illustrative landed same day). One additional Nano Banana 2 generation labeled "F-5.2 Reactor Detailed Schematic" was a content miss (image showed ion-array layout, not a reactor) and was relocated to `docs/figures/_iterations/F-5.1.alt-crop.png` rather than promoted.
- [x] **M-11 Nano Banana 2 run** — completed 2026-04-26. 13 of 13 illustrative figures generated and committed: F-2.1, F-2.2, F-2.5, F-4.1, F-4.3, F-4.4, F-4.5, F-5.1, F-7.1, F-7.3, F-7.4, F-8.1, F-A.1.
- [ ] **M-04 Peer-review pass** — numerical cross-check, citation audit, handwavium traceability
- [ ] **M-05 Figures FINAL** — publication-ready figures
- [ ] **M-07 PDF build v1** — first Typst-built PDF
- [x] **M-12 GitHub public push** — completed 2026-04-22. Public repo at https://github.com/doublegate/DS-1_Plans. 2 commits on `main`. 12 topics set. License shown as "Other" (expected — GitHub's licensee library does not auto-classify Creative Commons licenses; canonical CC-BY-NC-4.0 text is in `LICENSE`).
- [ ] **M-08 Release** — tagged final artifact

## Current deliverables (docs/ tree)

| File | Exists | Status |
|---|---|---|
| `docs/README.md` | ✓ | Draft |
| `docs/00-abstract-and-scope.md` | ✓ | Draft |
| `docs/01-design-basis.md` | ✓ | Draft |
| `docs/02-structural-and-materials.md` | ✓ | Draft |
| `docs/03-power-generation.md` | ✓ | Draft |
| `docs/04-superlaser.md` | ✓ | Draft |
| `docs/05-propulsion.md` | ✓ | Draft |
| `docs/06-life-support.md` | ✓ | Draft |
| `docs/07-defensive-systems.md` | ✓ | Draft |
| `docs/08-command-control-communications.md` | ✓ | Draft |
| `docs/09-vulnerability-analysis.md` | ✓ | Draft |
| `docs/10-handwavium-ledger.md` | ✓ | Draft |
| `docs/11-minimum-handwave-reconstruction.md` | ✓ | Draft |
| `docs/12-ds2-delta-specification.md` | ✓ | Draft |
| `docs/appendix-A-mass-power-thermal-budget.md` | ✓ | Draft |
| `docs/appendix-B-nomenclature.md` | ✓ | Draft |
| `docs/appendix-C-references.md` | ✓ | Draft |
| `docs/appendix-D-figures-and-tables.md` | ✓ | Draft (figures all TBD) |
| `docs/appendix-E-fmea.md` | ✓ | Draft |
| `docs/appendix-F-vnv-plan.md` | ✓ | Draft |

## Open risks / flags

| # | Flag | Impact | Owner | Status |
|---|---|---|---|---|
| R-1 | Geometry freeze: 120 km vs 160 km | — | — | **Closed 2026-04-22 via D-6:** DS-1 = 120 km, DS-2 = 160 km (option c) |
| R-2 | Figure production path | — | — | **Closed 2026-04-22 via D-7:** mixed — Mermaid/Graphviz/matplotlib for stubbable, Nano Banana 2 for custom figures via `docs/appendix-D2-figure-prompts.md` |
| R-3 | Typesetting path | — | — | **Closed 2026-04-22 via D-8:** Typst |
| R-4 | HW-4, HW-6, HW-8, HW-9 without explicit DR | — | — | **Closed 2026-04-22 via Phase 2 S2.4:** DR-13..DR-16 added |
| R-5 | LICENSE not yet committed (NOTICE placeholder in place) | — | — | **Closed 2026-04-22 via D-11:** CC-BY-NC-4.0 adopted; LICENSE file + NOTICE.md updated |
| R-6 | Vite build output parity with CDN distributable HTML | Low (two build paths diverge without discipline) | — | Open — track during proj-code Vite build verification |

## Decision log

| # | Date | Decision | Rationale |
|---|---|---|---|
| D-1 | 2026-04-21 | Adopt 120 km as DS-1 geometry of record | ANH Legends figure; ref-doc baseline; allows direct re-use of 10¹⁸ kg design-basis mass |
| D-2 | 2026-04-21 | Adopt 160 km for DS-2 | Current Wookieepedia / DK figure; 900 km explicitly rejected |
| D-3 | 2026-04-21 | Ten-item HW ledger as structured constraint | Honest-accounting pattern; keeps concessions visible and bounded |
| D-4 | 2026-04-21 | Split ref-doc into 13 section + 6 appendix files | Peer-review ergonomics; matches PDR convention |
| D-5 | 2026-04-22 | Completion scope = full PDR-register PDF artifact | User-specified (option b). Phases 3/4/5 go; no early stop |
| D-6 | 2026-04-22 | Geometry freeze = DS-1 120 km / DS-2 160 km (split) | User-specified (option c). Shows DS-1→DS-2 evolution; preserves ref-doc baseline |
| D-7 | 2026-04-22 | Figure production = mixed path; Nano Banana 2 prompt spec for custom figures | User-specified (option b with Nano Banana 2). Detailed prompt document at `docs/appendix-D2-figure-prompts.md` |
| D-8 | 2026-04-22 | Typesetting = Typst | User-specified. Build pipeline under `typeset/`; pandoc → Typst conversion for docs markdown |
| D-9 | 2026-04-22 | Git init + public GitHub repo; forward goal = formal technical-fiction publication | User-specified. Project initialized as local git repo; remote to be created by user |
| D-10 | 2026-04-22 | proj-code full refactor now: TS types + module split + Vite scaffold + print CSS | User-specified (all four). Monolithic .tsx retired; src/ tree authoritative; CDN-HTML kept as distributable |
| D-11 | 2026-04-22 | License = CC-BY-NC-4.0 | User-specified. Canonical text in LICENSE; NOTICE.md updated; README Rights section updated; compatible with future commercial-publication negotiation |
| D-12 | 2026-04-26 | Programmatic figures rendered via local toolchain (matplotlib in venv, system graphviz, npm-global mermaid-cli) | Phase 3 partial-execution. Source `.mmd`/`.dot`/`.py` archived in `docs/figures/_sources/` per D2.8 reproducibility requirement. SVG + PNG exports at 300 dpi committed alongside. |
| D-13 | 2026-04-26 | Nano Banana 2 illustrative figures landed; renamed to bare `F-{id}.png` per §D2.8 convention | All 13 illustrative figures generated by user, dropped with descriptive filenames (e.g. "F-2.1 - Station Cutaway_Quarter Section.png"), then renamed to `F-2.1.png` etc. so the documented Typst-build / pandoc image-reference path resolves. M-03 + M-11 closed. |

## Next actions

1. ~~Commit first git tree + push to public GitHub~~ — done (M-12, 2026-04-22).
2. ~~Run the 13 illustrative-figure Nano Banana 2 prompts~~ — done (M-11, 2026-04-26).
3. **Phase 4 peer review** — now the highest-priority item. S4.1 numerical cross-check (mass / power / thermal / volume budget closure across `docs/*.md` against `01-design-basis.md` and `appendix-A`) and S4.2 citation audit (forward `appendix-C` → text; reverse text → `appendix-C`) can run independently and in parallel.
4. **Phase 3 elevation pass S3.5** — DRAFT → FINAL: consistency pass (typography, units, legend uniformity), accessibility pass (colorblind-safe contrast), update `appendix-D` §D.3 status column. Some illustrative figures may need iteration (the "F-5.2 Reactor" misfire suggests prompt drift; review label legibility in the new Nano Banana 2 outputs and re-run any with clipped or missing labels).
5. **Phase 5 Typst build verification** — first end-to-end PDF build via `typeset/build.sh`; iterate template to 30–60-page target. Front matter (cover, approval block, revision history, TOC, list-of-figures, list-of-tables, acronym short-list) per S5.2.
6. **Optional reactor schematic** — if a §3 "reactor detailed schematic" figure is wanted, a new prompt block in `docs/appendix-D2-figure-prompts.md` is needed (the existing prompts cover the ion-array but not the reactor itself in isolation; F-3.3 covers the chain block-diagram only).
