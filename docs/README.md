# DS-1 Orbital Battle Station — Engineering Specification Document Set

**Status:** Draft 0.1 (derived from source ref-doc, 2026-04-21)
**Audience:** Senior Technical Director review; PDR-level engineering assessment
**Source of truth:** `../ref-docs/Claude - DS-1 Orbital Battle Station Plans.md`

This directory is the working document tree for a PDR-style engineering specification of the DS-1 Orbital Battle Station. The source ref-doc is a single long-form markdown file; this tree splits it into standalone section documents and adds the engineering artifacts (mass/power/thermal budget, nomenclature, references, FMEA, V&V plan, figures index) that a real Preliminary Design Review package would ship.

## Reading order

1. `00-abstract-and-scope.md` — executive summary, stated concessions, scope of spec
2. `01-design-basis.md` — consolidated numerical baseline and derived requirements (read before any subsystem doc)
3. Subsystem documents `02-*.md` through `08-*.md` — structural, power, weapon, propulsion, ECLSS, defense, C3
4. Cross-cutting analysis `09-*.md` through `12-*.md` — vulnerability, handwavium ledger, minimum-handwave reconstruction, DS-2 delta
5. Appendices `appendix-A` through `appendix-F` — engineering artifacts supporting all of the above

## File index

| File | Purpose | Origin |
|---|---|---|
| `00-abstract-and-scope.md` | Executive summary and spec scope | Lifted from ref-doc §Executive summary |
| `01-design-basis.md` | Numerical baseline + derived requirements | New synthesis |
| `02-structural-and-materials.md` | Geometry, mass budget, materials, load paths, ISRU, Whipple | Ref §1 |
| `03-power-generation.md` | Hypermatter reactor, storage, waste-heat wall | Ref §2 |
| `04-superlaser.md` | Beam architecture, optics, recoil, firing rate | Ref §3 |
| `05-propulsion.md` | Sublight ion array, hyperdrive, attitude control | Ref §4 |
| `06-life-support.md` | ECLSS, crew logistics, hangar bays, internal transit | Ref §5 |
| `07-defensive-systems.md` | Turbolasers, ion cannons, tractor beams, shields, armor | Ref §6 |
| `08-command-control-communications.md` | Overbridge, sensors, C3 timing, Yavin anti-fighter gap | Ref §7 |
| `09-vulnerability-analysis.md` | DS-1/DS-2 death patterns and unified fix list | Ref §8 |
| `10-handwavium-ledger.md` | HW-1 through HW-10 physics-concession register | Ref §9 |
| `11-minimum-handwave-reconstruction.md` | Hard-SF baseline with minimum new physics | Ref §10 |
| `12-ds2-delta-specification.md` | DS-2 as formalized delta against DS-1 | Ref Appendix A |
| `appendix-A-mass-power-thermal-budget.md` | Consolidated MPT budget across all subsystems | New synthesis |
| `appendix-B-nomenclature.md` | Symbols, units, acronyms, canon glossary | New synthesis |
| `appendix-C-references.md` | Formatted bibliography | Lifted from ref-doc source-citations |
| `appendix-D-figures-and-tables.md` | Index of tables that exist + figures that must be drawn | New synthesis |
| `appendix-E-fmea.md` | Failure Modes & Effects Analysis | New synthesis extending ref §8 |
| `appendix-F-vnv-plan.md` | Verification & Validation plan | New synthesis |

## Conventions (inherited from `../CLAUDE.md`)

- **Geometry of record:** 120 km DS-1, 160 km DS-2. Any rescaling cascades through mass/volume/radiator budgets.
- **Design-basis mass:** 1.0 × 10¹⁸ kg.
- **Alderaan shot:** 2.24 × 10³² J; sustained reactor 2.6 × 10²⁷ W at 24-hour recharge.
- **Hypermatter specific energy:** c² = 9 × 10¹⁶ J/kg. Single irreducible physics concession.
- **Discredited figures (do not resurrect):** 900-km DS-2 diameter.
- **Handwavium is a technical term of art**, not a pejorative. Every concession is accounted against the HW-1..HW-10 ledger in `10-handwavium-ledger.md`.

## Intended publication target

A 30–60-page typeset PDF compiled from this markdown tree. Publication pipeline is decided in Phase 5 (see `../to-dos/phase-5-publication.md`); current working assumption is pandoc → LaTeX → PDF with a custom header template.

## Relationship to source ref-doc

The ref-doc remains the single authoritative source. These derived documents are not a replacement — they are a restructured, peer-review-friendly view of the same content, augmented with the engineering-artifact appendices that the source document lacks. Any conflict between a derived document and the ref-doc is a bug in the derived document; the ref-doc wins until explicitly revised.
