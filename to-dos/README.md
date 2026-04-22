# DS-1 Plans — Work Tracking

This directory is the plan-and-backlog area for the DS-1 Orbital Battle Station engineering-specification project. See `../docs/README.md` for the deliverable document tree and `../CLAUDE.md` for project conventions.

## Files

| File | Purpose |
|---|---|
| `PROJECT-STATUS.md` | Live snapshot of where the project is right now |
| `phase-plan.md` | All five phases at a glance, with entry/exit criteria |
| `phase-1-document-split.md` | Phase 1: extract source ref-doc into derived document tree |
| `phase-2-engineering-artifacts.md` | Phase 2: MPT budget, nomenclature, references, FMEA, V&V — synthesis deliverables |
| `phase-3-figures-and-diagrams.md` | Phase 3: produce figures enumerated in `appendix-D-figures-and-tables.md` |
| `phase-4-peer-review.md` | Phase 4: numerical cross-check, citation audit, handwavium traceability |
| `phase-5-publication.md` | Phase 5: typesetting, front matter, PDF build, archive |
| `sprint-backlog.md` | Flat list of granular tasks keyed to sprints |

## Definition of done (project-level)

The project is complete when:
1. The `docs/` tree compiles to a typeset 30–60-page PDF
2. Every figure in `appendix-D-figures-and-tables.md` is FINAL
3. Every derived requirement in `appendix-F-vnv-plan.md` has verification evidence or an HW-ID
4. A senior-engineer peer review has completed with no unresolved numerical inconsistencies
5. A tagged release artifact is archived

## Working method

- Phase transitions require explicit exit-criteria sign-off (see `phase-plan.md`)
- Sprints are loose time-boxes (notional ~1 week); adjust freely
- Every sprint closes with a PROJECT-STATUS update
- Backlog items are moved to their phase file on entry, not batched
