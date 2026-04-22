# Phase 2 — Engineering Artifacts

**Goal:** Produce the synthesis appendices that a real PDR document package would ship — consolidated budgets, nomenclature, bibliography, figures/tables index, FMEA, V&V plan.
**Status:** v1 complete (2026-04-21). v2 sprint S2.4 outstanding.

---

## Sprint S2.1 — Nomenclature + references

- [x] `docs/appendix-B-nomenclature.md` — symbols, units, real-world acronyms, in-universe acronyms, canon glossary, HW-ID convention
- [x] `docs/appendix-C-references.md` — reformat ref-doc's primary-source-citations section into canon/physicist/economic/propulsion-physics/reactor-physics/systems-physics/materials/naval-military groupings

## Sprint S2.2 — Consolidated MPT budget + figures index

- [x] `docs/appendix-A-mass-power-thermal-budget.md` — single-page checkbook: mass budget (M-01..M-10), shot-time and steady-state power budgets (P-01..P-15), shot-time and steady-state thermal budgets (T-01..T-13), volume budget, consistency checks, DS-2 delta scaling
- [x] `docs/appendix-D-figures-and-tables.md` — index of every table already in the doc tree (T-1.1 onwards); list of every figure required for the PDF (F-2.1..F-A.1) with production-path guidance

## Sprint S2.3 — FMEA + V&V plan

- [x] `docs/appendix-E-fmea.md` — formalize ref-doc §8 into a standard FMEA with Severity / Occurrence / Detection / RPN scoring. DS-1 register (E-01..E-14). DS-2 delta register (E-20..E-24). Top-RPN ranking and action table.
- [x] `docs/appendix-F-vnv-plan.md` — requirements verification matrix with five classes (Analysis, Demonstration, Inspection, Test, Concession). Every DR-xx mapped. Bidirectional HW-ID accounting. Real-world V&V analogs.

## Sprint S2.4 — Gap closure (complete 2026-04-22)

- [x] Add explicit derived requirements DR-13..DR-16 for HW-4 (waste-heat routing), HW-6 (recoil), HW-8 (gravity), HW-9 (tractor)
  - [x] Updated `docs/01-design-basis.md` §12
  - [x] Updated `docs/appendix-F-vnv-plan.md` §F.3
  - [x] Updated bidirectional-check table in `docs/appendix-F-vnv-plan.md` §F.4
- [x] Updated `PROJECT-STATUS.md` risk R-4 to closed
- [x] Propagated DR-13..DR-16 into proj-code data tables and Ledger tab badge counts

## Sprint S2.5 — DS-2 full MPT rebudget (complete 2026-04-22)

- [x] Decided on separate appendix form (clean separation from DS-1 numbers); produced `docs/appendix-A2-ds2-mass-power-thermal-budget.md`
  - [x] Mass budget rebuilt for 160 km at 2.37 × 10¹⁸ kg with per-subsystem scaling factors (volume vs surface vs weapon-count vs crew-ratio)
  - [x] Power budget rebuilt with 3-core reactor summation; capital-ship-vs-planet-kill cadence ambiguity flagged as OI-A2.1
  - [x] Thermal budget rebuilt with × 1.687 net radiator-demand factor; millimeter-microport sizing rule stated
  - [x] Volume budget rebuilt; Endor-moon shield-tower-volume reclamation noted
  - [x] `appendix-A` §A.7 retired to a pointer

## Exit criteria

- [x] Six appendix files exist and are cross-referenced from subsystem documents
- [x] Every MPT value in a subsystem document matches its appendix-A row
- [x] Every table in the spec appears in `appendix-D` §D.2
- [x] Every required figure is enumerated in `appendix-D` §D.3
- [x] Every stakeholder requirement has a traceable DR in `01-design-basis.md` §12 and a class in `appendix-F` §F.3
- [ ] Every HW-ID has an explicit DR in `01-design-basis.md` (pending S2.4)
- [ ] DS-2 MPT is a complete rebudget, not a scaling note (pending S2.5)

## Retrospective (v1)

- Appendix authoring revealed the HW-ID-without-DR gap immediately — the bidirectional-check pattern in `appendix-F` §F.4 is the mechanism that caught it.
- Adopting a single MPT budget checkbook (`appendix-A`) is the right pattern; subsystem documents defer to it rather than maintaining parallel budgets.
- The FMEA RPN scoring is speculative but useful as a prioritization frame; E-13 (reactor waste-heat rejection) bottoms out at RPN 1000 and is an honest reminder that HW-4 is the single largest unretirable concession.
