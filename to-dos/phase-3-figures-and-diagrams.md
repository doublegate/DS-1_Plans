# Phase 3 — Figures and Diagrams

**Goal:** Produce every figure enumerated in `docs/appendix-D-figures-and-tables.md` §D.3 to at least DRAFT status, with a subset elevated to FINAL for the publication PDF.
**Status:** Not started.

---

## Sprint S3.0 — Production-path decision

**Entry:** Phase 2 v1 complete.
**Deliverable:** `PROJECT-STATUS.md` D-5 decision entry naming the production paths.

Options considered:
1. **Hand-drawn vector** (Illustrator / Affinity / Inkscape) — highest publication quality; requires designer / time-intensive self-production.
2. **Mermaid + Graphviz embeds** — version-controllable, diffable; good for network/fault-tree/sequence diagrams; weak for cutaways and spatial schematics.
3. **Typst / TikZ in-doc** — if typesetting lands on Typst or LaTeX, diagrams live alongside prose; tight integration; moderate learning curve.
4. **ASCII / Unicode line art** — lowest quality; NOT PDR-appropriate; use only as temporary placeholder.

**Recommendation:** Mixed. Mermaid for fault trees, sequence diagrams, network topology, block diagrams. Commissioned vector art for cutaway, trench cross-section, sphere map, and schematic cross-sections. Plots (Stefan-Boltzmann, specific-energy vs fuel mass, damage threshold vs intensity) produced with matplotlib/gnuplot + exported as SVG.

**Open action:** commit to production path before starting S3.1.

## Sprint S3.1 — Structural figures (ref §1 / docs `02`)

Target: each figure at DRAFT.

- [ ] F-2.1 — Station cutaway, quarter-section (isometric line drawing)
- [ ] F-2.2 — Equatorial trench cross-section (schematic)
- [ ] F-2.3 — Load-path hierarchy (block diagram: hull → ring frames → spokes → axial brace)
- [ ] F-2.4 — Thermal gradient across sun/shade terminator (plot: T vs angular position from sub-solar point)
- [ ] F-2.5 — Whipple shield stack cross-section (labeled layers: bumper / standoff / stuffed / pressure wall)
- [ ] F-2.6 — M-type asteroid ISRU throughput flowchart (mining → smelting → fabrication → orbital assembly)

## Sprint S3.2 — Reactor + weapon figures (ref §2–§3 / docs `03`–`04`)

- [ ] F-3.1 — Reactor specific-energy vs required fuel mass (log-log plot across Li-ion → hypermatter)
- [ ] F-3.2 — Hull radiated power vs temperature (Stefan-Boltzmann plot; mark 300/1000/2500/5800 K lines)
- [ ] F-3.3 — Reactor → beam conversion chain block diagram
- [ ] F-4.1 — Superlaser amplifier chain schematic (64 tributary shafts → 8 kyber stages → compound-kyber focus)
- [ ] F-4.2 — Beam intensity at aperture vs material damage threshold (plot, log-log, 10 orders of divergence annotated)
- [ ] F-4.3 — Phased-array focusing geometry (array of emitters → coherent wavefront)
- [ ] F-4.4 — Planet-kill coupling models (three panels: optical ablation / relativistic jet / graviton)
- [ ] F-4.5 — Recoil & back-brace force path (structural diagram: firing impulse → axial back-brace → hypermatter core)

## Sprint S3.3 — Propulsion + ECLSS + C3 figures (ref §4–§7 / docs `05`–`08`)

- [ ] F-5.1 — Sublight ion-array layout on southern hemisphere (top-view schematic)
- [ ] F-5.2 — 123 SSP06 hyperdrive field-generator phase-lock topology (network diagram)
- [ ] F-5.3 — Lentz-soliton scaling: field energy vs bubble size (plot)
- [ ] F-6.1 — ECLSS primary + secondary loop architecture (flow diagram, Sabatier + OGA + WRS + bioregenerative)
- [ ] F-6.2 — Internal transit: great-circle traversal time by mode (bar chart, walk/turbolift/monorail/Hyperloop)
- [ ] F-6.3 — Hangar complement volumetric allocation (pie/bar chart across TIE/AT-AT/assault shuttle/dropship)
- [ ] F-8.1 — Zone map (sphere map with 24 latitudinal operational zones)
- [ ] F-8.2 — C3 hierarchy and latency budget (network diagram; Overbridge → zone → turret with ms annotations)
- [ ] F-8.3 — Anti-fighter kill chain timeline (sequence diagram with < 500 ms budget)

## Sprint S3.4 — Defensive, vulnerability, DS-2 figures (ref §6, §8, App A / docs `07`, `09`, `12`)

- [ ] F-7.1 — Ray vs particle shield functional diagram (conceptual; ray shield vs plasma penetrator, particle shield vs KKV)
- [ ] F-7.2 — Tractor-beam mesh busbar architecture (block diagram: DS-1 single-coupling vs distributed-mesh improvement)
- [ ] F-7.3 — MARAUDER plasma-toroid acceleration stages (coaxial formation / conical compression / magnetic acceleration)
- [ ] F-7.4 — Thermal-exhaust-port geometry comparison (DS-1 single 2-m port vs DS-2 millimeter-microport array)
- [ ] F-9.1 — Yavin exploit fault tree (single exhaust port → ray-only shield → slow turbolasers → friendly-fire interlock → starfighter ingress → reactor runaway)
- [ ] F-9.2 — Endor exploit fault tree (Endor single generator → ground capture → shield drop → unfinished hull → reactor tower strike)
- [ ] F-A.1 — DS-1 vs DS-2 configuration comparison plate (side-by-side with scale bar and subsystem deltas)

## Sprint S3.5 — Elevation pass (DRAFT → FINAL)

- [ ] Review DRAFT figures for publication fitness
- [ ] Consistency pass: uniform typography, consistent SI units, uniform color/hatching legend
- [ ] Accessibility: colorblind-safe palette, sufficient contrast
- [ ] Update `appendix-D` §D.3 status column from DRAFT to FINAL
- [ ] Re-run PROJECT-STATUS milestone M-05

## Exit criteria

- [ ] Every figure row in `appendix-D` §D.3 has status ≥ DRAFT
- [ ] At least half of figures have status FINAL
- [ ] Figure production path committed and documented
- [ ] Source artifacts (SVG / Mermaid source / matplotlib script) archived alongside rendered output
