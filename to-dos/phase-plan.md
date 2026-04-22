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

**Status:** Not started.

---

## Gate review between phases

Each phase transition is a mini-gate:
- Exit criteria of current phase all green
- Entry criteria of next phase met
- PROJECT-STATUS updated with milestone check-off and risk re-score
- One paragraph retrospective (what worked, what didn't, what carries forward as tech debt)
