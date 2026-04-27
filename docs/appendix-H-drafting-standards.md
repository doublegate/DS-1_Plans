# Appendix H — Drafting and Schematic Standards

**Source:** New synthesis (Phase 7 S7.1 + S7.2, 2026-04-26).
**Scope:** Drafting and schematic conventions for all CDR-depth figures (Phases 8 onward). Extends the PDR Nano Banana 2 global style spec in `appendix-D2-figure-prompts.md` §D2.3 — that style remains in force for the illustrative figure family; this appendix adds engineering-drawing conventions for technical schematics, dimensioned drawings, and notational cribs.

---

## H.1 Purpose

Real CDR programmes hand drawings to fabrication shops; the drawings must follow industry-standard notation so a stranger can build from them. This spec narrates concept-level CDR fidelity rather than producing fab-ready prints — but the **notation discipline** is the same. Every CDR-depth figure that depicts a component, interface, mechanism, or process should follow the conventions in this appendix so a senior engineer reading the spec recognises the standards being invoked even when the underlying analysis is speculative.

This appendix anchors three things:
1. Title-block and revision-control conventions for engineering plates.
2. Geometric Dimensioning and Tolerancing (GD&T) cheat sheet — narration register only; the spec does not call out fab tolerances at production precision.
3. Schematic notation packs for electrical (IEC 60617), fluid/plumbing (ISO 14617), and thermal block diagrams.

---

## H.2 Title block and revision control

Every CDR-depth illustrative or schematic plate carries a **title block** in the upper-right corner, sized to ~12% of the plate's longest dimension. The title block is part of the plate raster (for Nano Banana 2 outputs) or rendered as Typst chrome (for programmatic outputs).

**Title block contents (top to bottom):**

| Field | Source |
|---|---|
| Project | "DS-1 ENGINEERING SPEC" |
| Figure ID | F-N.N (per `appendix-D` §D.3) |
| Sheet | sheet of total (e.g., "1 of 1" for single-plate figures; "1 of 3" for multi-plate) |
| Scale | dimensional scale or "NOT TO SCALE" for schematic plates |
| Drawn | author handle (matches `git config user.name`) |
| Reviewed | CCB Chief Engineer slot (or "pending") |
| Approved | CCB Chair slot (or "pending") |
| Rev | revision letter or number (see §H.3) |

**Revision triangle** sits adjacent to the title block. Convention: an equilateral triangle containing the current revision letter; revisions logged in `appendix-G` §G.5 change-request workflow with a one-line "Δ" annotation describing the diff (e.g., "Rev B: relabelled standoff layer 0.5–2 m per CR-0042").

---

## H.3 Revision lettering

Revisions follow the IPC-2615 / ASME Y14.35 convention:

- **Rev 0** — initial release (typically v0.X-rc tag)
- **Rev A, B, C, …** — major revisions (Major-class CR per `appendix-G` §G.4)
- **Rev A.1, A.2, …** — minor revisions within a major rev (Minor-class CR)
- Letters I, O, Q, S, X, Z are **skipped** (legibility / confusion with digits)

Phase 7 S7.3 illustrative re-renders (F-2.1, F-A.1, F-7.4 with the cm/m and hex-leakage corrections) bump those figures to **Rev A**. New CDR-depth figures authored in Phase 8 onward start at Rev 0.

---

## H.4 GD&T crib (narration register)

Geometric Dimensioning and Tolerancing per ASME Y14.5-2018 is the standard real fab drawings invoke. This spec **narrates** the conventions — the analyses cite GD&T symbology where it informs the engineering reasoning, but does not call out tolerances at fab-ready precision (we don't actually fab).

**Symbol crib:**

| Symbol | Name | When the spec invokes it |
|---|---|---|
| ⌀ | Diameter | Cylindrical features (e.g., reactor confinement coil bore) |
| ⌖ | True position | Bolt-pattern coordination across an interface (cite in ICDs) |
| ⏥ | Flatness | Mating surfaces of thrust mounts; superlaser primary mirror |
| ⏤ | Straightness | Long axial members (truss segments, beam ducts) |
| ⌭ | Cylindricity | Reactor pressure vessel; particle-beam waveguide |
| ⌯ | Symmetry | Ion engine nozzle pairs about the south-pole axis |
| ⏊ | Perpendicularity | Hull plate to local normal; turret base to mount |
| ∥ | Parallelism | Stacked Whipple shield layers |
| ∠ | Angularity | Deflector vane angle to flow |
| ⌒ | Profile of a line | Aerodynamic / hydrodynamic profile (rare in this spec) |
| ⌓ | Profile of a surface | Hull skin local profile control |
| ⊙ | Concentricity | Reactor → injector axial alignment |
| ↗ | Runout | Rotating-equipment families (centrifuge habitat sections in DS-2 Endor variants, if any) |
| Ⓜ | MMC (max material condition) | Fastener bonus tolerance — narrated when ICD bolt-patterns are at issue |
| ⓛ | LMC (least material condition) | (rare) |
| Ⓢ | RFS (regardless of feature size) | (default; rarely called out) |

**Datum reference frames** (DRFs) follow ASME Y14.5 §4: primary (3 contact points), secondary (2), tertiary (1). The spec invokes DRFs when describing how a component is located within an assembly (e.g., "the superlaser primary mirror is located by DRF |A|B|C| where A is the optical axis").

The spec does not call out **tolerance values** unless an analysis depends on them. Where used, tolerance is given to one significant figure and clearly flagged as concept-level (e.g., "alignment tolerance ~10 µrad on the 10-km aperture, two orders below diffraction limit").

---

## H.5 Schematic notation pack — Electrical (IEC 60617)

Electrical schematics in CDR-depth subsystem documents (especially §3 Power, §7 Defensive, §11 Software, ICDs ICD-03-NN) follow IEC 60617 (the international electrical-schematic symbol standard, equivalent to IEEE 315 / ANSI Y32.2 in the US). Subset relevant to this spec:

**Sources / sinks:**

| Symbol concept | Meaning |
|---|---|
| Battery / cell | Stored energy (rare; capacitor banks more common at scale) |
| Capacitor (C) | Energy storage — at hypermatter scale, the "primary capacitor bank" feeding the superlaser |
| Inductor (L) | Magnetic energy storage; reactor confinement coils |
| Generator (circle with G) | Hypermatter reactor primary output — labelled "HYPERMATTER" rather than mechanical-rotation-implied |
| Load (rectangle, R) | Aggregated subsystem load |

**Switches / protection:**

| Symbol concept | Meaning |
|---|---|
| Circuit breaker (CB) | Protective interruption; per-zone CBs at 24-zone bus distribution |
| Fuse (F) | One-shot protective interruption |
| Relay / contactor | Switched load distribution |
| Disconnect switch | Maintenance isolation |

**Conditioning / measurement:**

| Symbol concept | Meaning |
|---|---|
| Transformer (two coupled coils) | AC voltage transformation; not used at hypermatter DC scale, but relevant for some on-station auxiliaries |
| Rectifier / inverter | DC ↔ AC conversion |
| Voltage regulator | Output regulation per ICD §I.4.1 |
| Current sensor | Measurement |
| Voltage sensor | Measurement |
| Phasing / timing | Hyperdrive 123-generator phase-lock |

**Single-line vs three-line:** at-station schematics are typically **single-line** for power architecture (one trace per bus, regardless of phase/conductor count). Detail-level schematics within a subsystem may go three-line where the conductor count matters.

**Wire labelling:** every conductor between two symbols carries a label `BUS-NN-XX` where NN is the originating zone (1..24) and XX is a within-zone bus index. Cross-zone busbars carry the prefix `MAIN-NN`.

---

## H.6 Schematic notation pack — Fluid (ISO 14617)

Fluid schematics (§6 ECLSS atmosphere/water/waste loops; §3 reactor cooling loops; §5 propulsion reaction-mass plumbing) follow ISO 14617 (the international fluid-power symbol standard, equivalent to ANSI/ASA Y32.10 in the US).

**Subset relevant to this spec:**

| Symbol concept | Meaning |
|---|---|
| Pump (circle with vane) | Fluid driver; cite ICD §I.4.5 for capacity |
| Compressor (circle with arrow) | Gas compression |
| Valve (two-triangle bowtie) | Manual or actuated isolation |
| Check valve (ball-on-seat) | Backflow prevention |
| Heat exchanger (rectangle with chevron) | Thermal coupling between fluid loops |
| Pressure regulator (variable triangle) | Pressure setpoint |
| Filter (diamond with screen pattern) | Particulate removal |
| Tank (rectangle with sloped top) | Reservoir; reactor coolant accumulator |
| Pressure relief valve (PRV) | Overpressure protection |
| Flow meter (circle with F) | Measurement |

**Line conventions:**

- **Solid line** — pressurised flow.
- **Dashed line** — vent / drain / leak path.
- **Double line** — high-pressure or jacketed.

---

## H.7 Schematic notation pack — Thermal block

Thermal block diagrams use a simplified notation derived from heat-transfer textbook conventions, harmonised with the project palette per `appendix-D2 §D2.7`.

| Element | Convention |
|---|---|
| Heat source (Q̇_in) | Amber-filled box, label with source type and power |
| Heat sink / radiator (Q̇_out) | Cyan-filled box, label with sink type and capacity |
| Conductive path | Solid line, label thermal conductance G_c (W/K) |
| Convective path | Wavy line, label film coefficient h (W/m²K) |
| Radiative path | Dashed line, label emissivity ε and view factor F |
| Thermal resistance (R) | Resistor analog symbol with R_th (K/W) |
| Thermal mass (m·c_p) | Capacitor analog symbol with C_th (J/K) |
| Phase-change | Triangle with phase symbol (s/l/g) |

The thermal lumped-node analyses in `docs/cdr/analysis/thermal.md` (Phase 10 S10.2) use this notation.

---

## H.8 Drawing scale guidance

| Plate scope | Recommended plate size | Implied scale |
|---|---|---|
| Whole station overview | 16:9 landscape (e.g., F-A.1 plate format) | 1 mm = 1 km approx |
| Whole-subsystem cutaway | 4:3 landscape or 3:2 landscape | ~1 cm = 1 km |
| Component cutaway | 1:1 square (e.g., F-2.5 Whipple stack) | ~1 cm = 1 m or finer |
| Schematic (no spatial scale) | landscape, "NOT TO SCALE" in title block | — |
| Triptych comparison | 3:1 strip | per panel |

Match plate format to the figure's pedagogical purpose. Component-level CDR plates trend toward 1:1 (square) or 4:3 because they isolate a single object; subsystem-overview plates trend toward 16:9 because they show topology.

---

## H.9 Title-block exemplar (figure F-H.1)

> **F-H.1** — Title-block exemplar with revision triangle, sheet-of, scale, draftsman, CCB approval slots. (Authored as a Mermaid-rendered exemplar in `docs/figures/F-H.1.mmd`; renders with the project palette.)

[ figure F-H.1 — Mermaid; deferred to S7-render pass ]

## H.10 Schematic legend (figure F-H.2)

> **F-H.2** — Schematic legend: electrical (IEC 60617 subset) · fluid (ISO 14617 subset) · thermal (project palette). Single-page reference card. (Authored as a Mermaid-rendered legend in `docs/figures/F-H.2.mmd`.)

[ figure F-H.2 — Mermaid; deferred to S7-render pass ]

## H.11 GD&T quick-reference card (figure F-H.3)

> **F-H.3** — GD&T symbol crib with 14 symbols, datum reference frame example, MMC/LMC modifiers. (Authored via matplotlib for vector clarity in `docs/figures/_sources/F-H-figures.py`.)

[ figure F-H.3 — matplotlib; deferred to S7-render pass ]

---

## H.12 Cross-references

- `docs/appendix-D2-figure-prompts.md` §D2.3 — global style spec for Nano Banana 2 illustrative plates (preserved unchanged; this appendix is additive)
- `docs/appendix-G-configuration-management.md` §G.5 — change-request workflow; revision triangles tie back to CR-NNNN tickets
- `to-dos/cdr-conventions.md` §C.5 — short summary of these standards and their applicability
- `typeset/template.typ` — palette `palette.amber` / `palette.cyan` / `palette.red` / `palette.green` are the colour assignments these standards reference

## H.13 Revision history (this appendix)

| Rev | Date | Change |
|---|---|---|
| 0 | 2026-04-26 | Initial authorship (Phase 7 S7.1 + S7.2). Standards anchored to ASME Y14.5, IEC 60617, ISO 14617. Three reference figures (F-H.1 / F-H.2 / F-H.3) deferred to S7-render pass. |
