# Phase Plan — DS-1 Engineering Specification

Five phases from a single source ref-doc to a peer-reviewable PDR-ready PDF. Each phase has explicit entry and exit criteria; do not progress until exit criteria are met.

---

## Phase 0 — Foundation (complete)

**Entry:** Empty repository.
**Exit:**
- Repository directory structure (`docs/`, `ref-docs/`, `to-dos/`)
- `CLAUDE.md` with document conventions
- Ref-doc in `ref-docs/`

**Status:** Complete (2026-04-21).

---

## Phase 1 — Document Split (complete)

**Entry:** Ref-doc is the sole content artifact.
**Exit:**
- `docs/00..12*.md` produced — executive summary, design basis, 11 subsystem sections, DS-2 appendix
- `docs/README.md` navigation file
- All cross-references between section files resolve by filename

**Deliverables:**
- `docs/00-abstract-and-scope.md`
- `docs/01-design-basis.md`
- `docs/02-structural-and-materials.md` through `docs/12-ds2-delta-specification.md`

See `phase-1-document-split.md`.

**Status:** Complete (2026-04-21).

---

## Phase 2 — Engineering Artifacts (complete for v1)

**Entry:** Phase 1 exit met.
**Exit:**
- Six appendices exist: MPT budget, nomenclature, references, figures/tables index, FMEA, V&V plan
- All subsystem documents cross-reference the appendices where applicable
- Every HW-ID in ledger is cited from at least one subsystem document

**Deliverables:**
- `docs/appendix-A-mass-power-thermal-budget.md`
- `docs/appendix-B-nomenclature.md`
- `docs/appendix-C-references.md`
- `docs/appendix-D-figures-and-tables.md`
- `docs/appendix-E-fmea.md`
- `docs/appendix-F-vnv-plan.md`

See `phase-2-engineering-artifacts.md`.

**Status:** v1 complete (2026-04-21). v2 sprint S2.4 (explicit DRs for HW-4/6/8/9) still outstanding.

---

## Phase 3 — Figures and Diagrams

**Entry:** Phase 2 v1 complete. Figure inventory known in `appendix-D` §D.3.
**Exit:**
- Every figure in `appendix-D` §D.3 is status DRAFT or FINAL
- Production path chosen: Mermaid for network / fault-tree / sequence diagrams; vector art commissioned for cutaways / sphere maps / schematic cross-sections
- `appendix-D` §D.3 status column updated

**Sprints:**
- S3.0 — Production-path decision
- S3.1 — Structural figures (F-2.1 … F-2.6)
- S3.2 — Reactor + weapon figures (F-3.1 … F-4.5)
- S3.3 — Propulsion + ECLSS + C3 figures (F-5.1 … F-8.3)
- S3.4 — Vulnerability + DS-2 figures (F-9.1 … F-A.1)

See `phase-3-figures-and-diagrams.md`.

**Status:** Not started.

---

## Phase 4 — Peer Review

**Entry:** Phase 3 exit met (figures at least DRAFT).
**Exit:**
- Numerical cross-check complete: every value in a subsystem doc matches `01-design-basis.md` and `appendix-A`
- Citation audit complete: every external claim has a source in `appendix-C`
- Handwavium traceability check: every HW-ID cited from a requirement; every narrative concession has a DR
- Geometry-freeze decision committed (R-1 from PROJECT-STATUS resolved)
- No unresolved numerical inconsistencies

**Sprints:**
- S4.0 — Geometry freeze (120 km vs 160 km)
- S4.1 — Numerical cross-check
- S4.2 — Citation audit
- S4.3 — Handwavium traceability

See `phase-4-peer-review.md`.

**Status:** Not started.

---

## Phase 5 — Publication

**Entry:** Phase 4 exit met.
**Exit:**
- Typesetting path decided (pandoc / LaTeX / Typst)
- Front matter assembled (cover, version, approval block, TOC, list of figures, list of tables)
- PDF built and reviewed
- Tagged artifact archived

**Sprints:**
- S5.1 — Typesetting setup
- S5.2 — Front matter + LaTeX/Typst template
- S5.3 — PDF build and review
- S5.4 — Release and archive

See `phase-5-publication.md`.

**Status:** Closed 2026-04-26 (v0.2 released; M-08).

---

# CDR Phase Plan (v0.2 → v1.0, Phases 6–19)

PDR closed at v0.2 (M-08). The CDR transition takes the spec from PDR-fidelity (architecture-establishing) to **real-CDR fidelity** (component-level, ICD-complete, narrated FEA-class analysis, full FMEA, R/A/M tree, software architecture, manufacturing/CONOPS, cost & schedule, regulatory). Approved scope is in `/Users/parobek/.claude/plans/what-s-next-in-the-vast-stonebraker.md` (locked decisions: real-CDR fidelity · DS-2 delta+selective · all 4 optional modules · §11 expand · periodic incremental v0.3..v1.0 · `proj-code/` frozen). Wall-clock: 60–80 sessions; 7 incremental tags between v0.2 and v1.0.

## Phase 6 — CDR Foundation (Conventions, Templates, Configuration Management)

**Entry:** v0.2 PDR released.
**Exit:**
- `to-dos/cdr-conventions.md` exists (drawing standards, ICD template, FEA-narration style, requirement-numbering extensions, CCB workflow, tone rubric)
- `docs/appendix-G-configuration-management.md` exists (baseline control, change-request workflow, version-tag schema, CCB roles, HW ledger growth rules)
- `docs/icd/_template.md` exists (ICD skeleton)
- Typst template extended (part-headings, 2-column body option, table-of-ICDs scaffold)
- Existing PDR docs `02..09.md` retrofitted with summary + index pattern (or this work deferred to Phase 8 closure if CDR docs not yet authored)

**Sprints:** S6.1 conventions · S6.2 appendix-G · S6.3 ICD template · S6.4 Typst extension · S6.5 PDR-doc retrofit (deferrable).
**Tag:** v0.3-rc.

## Phase 7 — Drawing & Schematic Standards (+ S3.5 closeout)

**Entry:** Phase 6 v0.3-rc met.
**Exit:**
- `docs/appendix-H-drafting-standards.md` exists (title-block, GD&T crib, schematic notation pack)
- 3 standards-illustrating figures rendered
- S3.5 illustrative carry-forward closed: F-2.1 / F-A.1 / F-7.4 re-rendered, remaining 13 §D.3 status rows DRAFT → FINAL, M-05 closed

**Sprints:** S7.1+S7.2 standards doc · S7.3 illustrative re-renders (user-driven Nano Banana 2).
**Tag:** v0.3 (after S7.3 closes).

## Phase 8 — Detailed Subsystem Design (largest phase: 8 sprints)

**Entry:** v0.3 met. Foundation in place; ready to author CDR-depth content.
**Exit:**
- `docs/cdr/02-detailed-structural.md` … `docs/cdr/09-detailed-vulnerability.md` exist with component-level depth
- ~24 part-files split as needed for sections passing ~30 pages
- ~120 new tables (component allowables, joint catalogs, etc.)
- `appendix-A` MPT extended to component-level resolution
- ~40–60 new figures embedded (Mermaid + matplotlib + Graphviz + Nano Banana 2)

**Sprints (one per subsystem):** S8.1 structural · S8.2 power · S8.3 superlaser · S8.4 propulsion · S8.5 ECLSS · S8.6 defensive · S8.7 C3 · S8.8 vulnerability deep-dive.
**Tags:** v0.4 after S8.4 (subsystems §2–§5); v0.5 after S8.8 (subsystems §6–§9).

## Phase 9 — Interface Control Documents

**Entry:** v0.5 met (subsystem detail authored).
**Exit:** ~18 ICDs in `docs/icd/ICD-NN-MM.md`; `appendix-I-icd-index.md` aggregates; bidirectional consistency clean.
**Sprints:** S9.1 inventory · S9.2 tier-1 (mech+power) · S9.3 tier-2 (data+control) · S9.4 tier-3 (consumables) · S9.5 external.
**Tag:** v0.6-rc.

## Phase 10 — Detailed Analysis & Simulation Narrative

**Entry:** Phase 9 v0.6-rc met.
**Exit:** `docs/cdr/analysis/` directory complete; `appendix-J` aggregates; quantitative plots produced; analysis outputs feed back into MPT margins.
**Sprints:** S10.1 structural · S10.2 thermal · S10.3 electrical · S10.4 optical/plasma · S10.5 control loops.
**Tag:** v0.6.

## Phase 11 — Software / Firmware Architecture

**Entry:** v0.6 met.
**Exit:** Mission-mode state machine documented; per-subsystem firmware spec; cyber/physical security narrative; software V&V plan addendum; `appendix-K` aggregates.
**Sprints:** S11.1 state machine · S11.2 firmware spec · S11.3 cybersec · S11.4 SW V&V.
**Tag:** v0.7-rc.

## Phase 12 — RAM + Manufacturing + Operational Envelope

**Entry:** Phase 11 v0.7-rc met.
**Exit:** Reliability tree per major function; spare-parts/maintenance regime; build sequence + Sienar prime-contractor narrative; CONOPS with mission classes; operational envelope; `appendix-L` `appendix-M` aggregate.
**Sprints:** S12.1 reliability · S12.2 spares/maint · S12.3 mfg/integration · S12.4 CONOPS · S12.5 envelope.
**Tag:** v0.7.

## Phase 13 — Cost / Schedule / Programmatic Risk

**Entry:** v0.7 met.
**Exit:** Cost model with WBS + parametric anchors; schedule with critical path; programmatic risk register; `appendix-N` `appendix-O` aggregate.
**Sprints:** S13.1 cost · S13.2 schedule · S13.3 risk register.
**Tag:** v0.8-rc1.

## Phase 14 — Regulatory / Compliance (humorous register)

**Entry:** Phase 13 v0.8-rc1 met.
**Exit:** OST/Liability/Registration noncompliance register; planet-kill EIS in NEPA-style; ITAR/EAR Imperial analog; OSHA-of-the-Empire; `appendix-P` aggregates; tone discipline maintained.
**Sprints:** S14.1 OST · S14.2 EIS · S14.3 export · S14.4 OSHA.
**Tag:** v0.8-rc2.

## Phase 15 — DS-2 CDR-Depth Selective Expansions

**Entry:** Phase 14 v0.8-rc2 met.
**Exit:** 5 DS-2 CDR-depth deltas in `docs/cdr/12-ds2/` (3-core reactor · SLD-26 · microport venting · multimode superlaser · CIWS network); `appendix-A2` updated; `appendix-Q` aggregates.
**Sprints:** S15.1..S15.5 (one per delta).
**Tag:** v0.8.

## Phase 16 — Full FMEA Expansion + §11 Minimum-Handwave at CDR Depth

**Entry:** v0.8 met.
**Exit:** FMEA expanded top-10 → 200+ rows; §11 expanded to CDR-depth (`docs/cdr/11-detailed-minimum-handwave.md` + 10 part-files); FMEA→DR cross-link audit clean; reliability-tree linkage validated.
**Sprints:** S16.1 FMEA inventory · S16.2 RPN ranking · S16.3 §11 expansion · S16.4 cross-link audit.
**Tag:** v0.9-rc.

## Phase 17 — CDR Figure Production

**Entry:** Phase 16 v0.9-rc met.
**Exit:** All figures DRAFT → FINAL; ~120–150 new images; `appendix-D` regenerated; LoF target ~150–180 entries.
**Sprints:** S17.1 programmatic batch · S17.2 Nano Banana 2 prompt expansion in `appendix-D2` · S17.3 elevation pass · S17.4 figure index.
**Tag:** v0.9.

## Phase 18 — CDR Peer Review & Audit

**Entry:** v0.9 met.
**Exit:** All Phase-4-pattern audit dimensions clean (numerical · ICD bidirectional · FMEA/reliability · citation forward+reverse · software/CONOPS/regulatory tone · senior-engineer slow-read).
**Sprints:** S18.1 numerical · S18.2 ICD · S18.3 FMEA · S18.4 citation · S18.5 SW/CONOPS/reg · S18.6 reader pass.
**Tag:** v1.0-rc1.

## Phase 19 — CDR Publication (v1.0)

**Entry:** Phase 18 v1.0-rc1 met.
**Exit:** Final typeset; CDR cover + extended approval block; final PDF + SHA-256; GitHub release with `dist/DS-1-CDR-v1.0.pdf`; CHANGELOG and PROJECT-STATUS final.
**Sprints:** S19.1 template polish · S19.2 TOC/LoF/LoT · S19.3 final build · S19.4 release.
**Tag:** **v1.0**.

---

## Gate review between phases

Each phase transition is a mini-gate:
- Exit criteria of current phase all green
- Entry criteria of next phase met
- PROJECT-STATUS updated with milestone check-off and risk re-score
- One paragraph retrospective (what worked, what didn't, what carries forward as tech debt)
