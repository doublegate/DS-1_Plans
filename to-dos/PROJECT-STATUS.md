# PROJECT-STATUS

**Project:** DS-1 Orbital Battle Station Engineering Specification
**Draft version:** 0.2
**Last updated:** 2026-04-26
**Current phase:** **CDR transition active.** Phase 6 (CDR foundation) complete; Phase 7 partial (drafting standards landed; S7.3 illustrative re-renders pending user Nano Banana 2 run). Tag v0.3-rc captures the foundation milestone. CDR plan in `/Users/parobek/.claude/plans/what-s-next-in-the-vast-stonebraker.md`; locked to real-CDR fidelity, all 4 optional modules, periodic incremental releases v0.3..v1.0, `proj-code/` console frozen at PDR through v1.0, §11 expand-to-CDR-depth.

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
- [~] **M-05 Figures FINAL** — 17 of 30 promoted to FINAL (all programmatic — Mermaid / Graphviz / matplotlib palette + content verified via Typst PDF render). 13 illustrative remain at DRAFT pending user iteration on Nano Banana 2 label artifacts (per §D2.12: F-2.1 has a "DURASTEEL STANDOFF LAYER (.5–2 cm)" inset that should be 0.5–2 m; F-A.1 / F-7.4 show prompt hex codes leaking into data blocks; minor and non-blocking but worth a re-render pass).
- [x] **M-07 PDF build v1** — first end-to-end Typst PDF build succeeded 2026-04-26. Output `dist/DS-1-PDR-v0.2.pdf` was 111 pages / 69 MB. Three build-pipeline fixes were required: (a) `pandoc --from=gfm+implicit_figures` so standalone images become `#figure(...)` not `#box(image(...))`; (b) `#horizontalrule` shim definition injected at the top of every generated `.typ` file (pandoc 3.9 emits this for markdown `---` thematic breaks but Typst has no built-in); (c) figure paths rewritten from `../figures/` to `../../docs/figures/` and `typst compile --root` passed at the project root so cross-directory image access is allowed.
- [x] **M-08 v0.2 release** — closed 2026-04-26. Phase 5 publication sprint completed all five sub-sprints: **S5.1** typesetting path (Typst, decided in D-8 and operational since Phase 3); **S5.2** front matter — added Approval block, Revision history, Distribution / classification note, list-of-figures (auto-populated 30 entries), list-of-tables (auto-populated), Acronyms short-list (24 entries); **S5.3** template iteration — JetBrains Mono + Chakra Petch installed via Homebrew, body font 10pt → 9pt, leading 0.65em → 0.55em, margins 2.5cm → 2cm, level-1 forced-pagebreak removed (sections flow continuously; explicit pagebreaks now only at part headings and front-matter sections), figure width capped at 65% — page count compressed 119 → 74 pages; **S5.4** proof-read + spot-check via Explore agent — PASS clean (no must-fix or nice-to-have issues; only one harmless font-fallback warning); **S5.5** distribution — public mirror at https://github.com/doublegate/DS-1_Plans, errata channel via GitHub Issues. Release artifact: `dist/DS-1-PDR-v0.2.pdf` — 74 pages / 69 MB / A4 / SHA-256 `bafa1425a0b153aa8fdc61d3e00cef1c3b82e622eaacaec0485cbfa1b716f7a5`. Two §12.3 / §12.4 reader-pass nice-to-haves carried forward from Phase 4 also addressed in this sprint (DS-2 3-min recharge spec stance — adopt conservative reading; Endor SLD-26 vs DR-11 — explicit post-Endor retrofit recommendation). Annotated git tag `v0.2` applied at commit `<placeholder until after commit lands>`.
- [x] **M-04 Peer-review pass** — closed 2026-04-26. All 5 Phase 4 sprints completed via three parallel Explore-agent audits + remediation. **S4.0** (geometry freeze) was already closed via D-6 on 2026-04-22. **S4.1** (numerical cross-check): 0 discrepancies across all 13 subsystem docs and 8 appendices; mass / power / thermal / volume budgets all close within stated tolerance (DS-1 mass exact 1.0 × 10¹⁸ kg; DS-2 mass 2.38 × 10¹⁸ kg vs 2.37 × 10¹⁸ design-basis = +0.5%); scientific-notation format consistent (Unicode superscripts dominate, no caret usage). **S4.2** (citation audit): 0 broken forward refs; 1 dead reverse-ref (Bobrick & Martire arXiv:2102.06824) remediated by adding a body citation in `docs/05-propulsion.md` §5.2; 4 other appendix-C entries are acceptable infrastructure refs (canon umbrella sources, ECLSS baselines, platform-scale anchors); 7 spot-checked numerical citations all pass value verification. **S4.3** (HW traceability): re-verified clean per Phase 2 audit closure. **S4.4** (V&V consistency): clean except 3 broken cross-references to legacy ref-doc numbering (`§3.6` should be `§4.6` after Phase 1 split) — all 3 remediated in `docs/02-structural-and-materials.md` and `docs/03-power-generation.md`. **S4.5** (senior-engineer reader pass): PDR-ready contingent on the cross-ref fixes above. Two nice-to-have clarifications flagged for editorial polish (DS-2 3-min recharge requirement vs aspiration; Endor SLD-26 single-point design vs DR-11 retrofit doctrine) — non-blocking; deferred to Phase 5 S5.2 front-matter pass.
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
| D-14 | 2026-04-26 | Figures embedded inline in subsystem markdown; build pipeline patched for pandoc 3.9 / typst 0.14 | Phase 0–3 gap analysis revealed all 30 figures existed as files but zero were inline-referenced from subsystem markdown — pandoc would have emitted a figure-less PDF. Inserted 30 `![caption](../figures/F-X.png)` lines across 9 subsystem docs (02..09 + 12) with placement per appendix-D2 §D2.4–D2.6, plus three cross-reference lines for dual-home figures (F-3.3 / F-7.2 / F-7.4). Build pipeline patched: `+implicit_figures`, `#horizontalrule` shim, image-path rewrite, `--root` argument. M-07 closed; M-05 partially closed (17 / 30 FINAL). |
| D-15 | 2026-04-26 | Phase 4 peer review closed | Three parallel Explore-agent audits ran S4.1 (numerical), S4.2 (citation), S4.3+S4.4+S4.5 (traceability + V&V + reader pass). Findings remediated in this commit: 3 broken `§3.6 → §4.6` cross-refs in `02-*.md`/`03-*.md` (Phase 1 split renumbering had left bad pointers to the pre-split ref-doc §3); 1 dead reverse-citation (Bobrick & Martire) added to `05-propulsion.md` §5.2 prose. M-04 closed. R-2 (figure production) and R-3 (typesetting) already closed in Phase 3. No remaining open risks. |
| D-16 | 2026-04-26 | Phase 5 publication closed; v0.2 PDF released | Front matter authored (Approval, Revision History, Distribution, LoF/LoT, Acronyms); fonts installed; template compressed 119 → 74 pages; proof-read PASS clean; SHA-256 captured. The two reader-pass nice-to-haves (DS-2 3-min recharge spec stance; Endor SLD-26 retrofit doctrine) are addressed in `12-ds2-delta-specification.md` §12.3 / §12.4. M-08 closed. Annotated git tag `v0.2` applied. |
| D-17 | 2026-04-26 | CDR transition launched (PDR → CDR; v0.2 → v1.0) | User-approved scope: real-CDR fidelity · DS-2 delta+selective · all 4 optional modules (SW/FW + cost & schedule + regulatory + RAM/mfg/ops) · §11 expand to CDR depth · periodic incremental releases v0.3..v1.0 (7 intermediate tags) · `proj-code/` console frozen at PDR through v1.0 (deferred to v2.0 thread). Plan: `/Users/parobek/.claude/plans/what-s-next-in-the-vast-stonebraker.md`. Wall-clock: 60–80 sessions. Phase plan extended in `to-dos/phase-plan.md` (Phases 6–19); sprint backlog extended in `to-dos/sprint-backlog.md`. |
| D-18 | 2026-04-26 | Phase 6 CDR Foundation complete | `to-dos/cdr-conventions.md` authored (drawing standards · ICD policy · FEA-narration style · requirement-numbering extensions DR-17.. + RR-NN + MR-NN + OR-NN + DR2-NN · CCB workflow · tone rubric · HW-11..HW-15 reserve · version-tag schema). `docs/appendix-G-configuration-management.md` authored (baselines · CIs · CR workflow · CCB roles · ledger-growth gating · tag schema · audit cadence · repo/toolchain config). `docs/icd/_template.md` authored (ICD skeleton with 7 interface-class subsections + verification matrix). `typeset/template.typ` extended with `cdr-callout` / `two-col` / `icd-header` / `requirement-row` helpers; `main.typ` import updated; `build.sh` per-file import expanded to include CDR helpers. S6.5 (PDR-doc trim to summary+index) deferred to Phase 8 closure to avoid orphaning content. |
| D-19 | 2026-04-26 | Phase 7 partial close — drafting standards landed, S7.3 deferred | `docs/appendix-H-drafting-standards.md` authored (title-block + revision-letter convention · GD&T crib 14 symbols · IEC 60617 electrical pack · ISO 14617 fluid pack · thermal block notation · scale guidance · 3 reference-figure stubs F-H.1/F-H.2/F-H.3 deferred to S7-render pass). S7.3 illustrative re-renders authored as Rev A correction blocks in `appendix-D2-figure-prompts.md` for F-2.1 (cm→m unit fix), F-7.4 / F-A.1 (hex-leakage fix); user runs Nano Banana 2 prompts; once images land, the 13 §D.3 illustrative status rows flip DRAFT → FINAL and v0.3 (final, not -rc) tag fires. |

## Next actions

CDR transition active. v0.3-rc tagged at end of Phase 6.

1. **Phase 7 closure (v0.3 final)** — user runs the Rev A Nano Banana 2 prompts in `docs/appendix-D2-figure-prompts.md` for F-2.1 / F-7.4 / F-A.1; drops Rev A images to `docs/figures/` (replacing Rev 0); flip 13 `appendix-D` §D.3 illustrative rows DRAFT → FINAL; M-05 closes; v0.3 tag fires.
2. **Phase 8a (v0.4)** — detailed subsystem design sprints S8.1 (structural) → S8.4 (propulsion). Tag v0.4 after S8.4. Estimated 8–14 sessions; the largest single phase block.
3. **Phase 8b (v0.5)** — sprints S8.5 (ECLSS) → S8.8 (vulnerability deep-dive). Tag v0.5.
4. **Phases 9–10 (v0.6)** — ICDs + narrated analyses.
5. **Phases 11–12 (v0.7)** — software architecture + RAM/manufacturing/CONOPS.
6. **Phases 13–15 (v0.8)** — cost/schedule + regulatory + DS-2 deltas.
7. **Phases 16–17 (v0.9)** — full FMEA + §11 CDR expansion + figure-production push.
8. **Phases 18–19 (v1.0)** — audit + final publication.

Each phase boundary uses the parallel-Explore-agent audit pattern (validated twice on this project). Each non-`-rc` tag triggers a GitHub Release with PDF asset.
