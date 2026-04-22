# Phase 1 — Document Split

**Goal:** Decompose the single ref-doc into a navigable, peer-reviewable document tree under `docs/`.
**Status:** Complete (2026-04-21).

---

## Sprint S1.0 — Scaffolding

- [x] Create `docs/README.md` with reading order and file index
- [x] Commit to filename conventions: `NN-subsystem-name.md` for sections, `appendix-X-name.md` for appendices
- [x] Commit to cross-reference convention: relative filenames without anchors (`see [03-power-generation.md]`)

## Sprint S1.1 — Front matter

- [x] `docs/00-abstract-and-scope.md` — lift executive summary, add scope block, add reference-configuration table
- [x] `docs/01-design-basis.md` — new synthesis: stakeholder requirements, geometry, mass, energy, ECLSS, propulsion, defense, environmental envelope, HW summary, DR traceability

## Sprint S1.2 — Subsystems (§1–§4)

- [x] `docs/02-structural-and-materials.md` (ref §1)
- [x] `docs/03-power-generation.md` (ref §2)
- [x] `docs/04-superlaser.md` (ref §3)
- [x] `docs/05-propulsion.md` (ref §4)

## Sprint S1.3 — Subsystems (§5–§7)

- [x] `docs/06-life-support.md` (ref §5)
- [x] `docs/07-defensive-systems.md` (ref §6)
- [x] `docs/08-command-control-communications.md` (ref §7)

## Sprint S1.4 — Cross-cutting and DS-2

- [x] `docs/09-vulnerability-analysis.md` (ref §8)
- [x] `docs/10-handwavium-ledger.md` (ref §9)
- [x] `docs/11-minimum-handwave-reconstruction.md` (ref §10)
- [x] `docs/12-ds2-delta-specification.md` (ref Appendix A)

## Exit criteria

- [x] All 13 section files produced
- [x] Navigation file exists
- [x] Cross-references resolve by filename
- [x] Section files preserve every numerical claim, table, and HW-ID from source

## Retrospective

- Straight extraction + light editing worked; the ref-doc's structure mapped cleanly onto a per-section file layout with almost no re-organization needed.
- HW-IDs (HW-1…HW-10) were already implicit in the source; making them explicit markers at the derived-document level paid off during appendix authoring.
- The 120-vs-160 km configuration flag needs to be committed earlier next iteration — Phase 4 S4.0 is correct placement, but its impact is already visible in `appendix-A-mass-power-thermal-budget.md` §A.7.
- Carries forward as tech debt: HW-4, HW-6, HW-8, HW-9 lack explicit DRs and are carried in narrative only. Addressed in Phase 4 S4.3.
