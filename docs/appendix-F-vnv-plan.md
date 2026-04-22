# Appendix F — Verification and Validation (V&V) Plan

**Source:** New synthesis. Maps each derived requirement in `01-design-basis.md` to a verification method.
**Related:** `01-design-basis.md`, `10-handwavium-ledger.md`, `appendix-E-fmea.md`

---

## F.1 Purpose

Every requirement in this specification must be traceable to a verification method. Because the DS-1 is a speculative artifact, many requirements cannot be verified by the conventional Analysis / Demonstration / Inspection / Test (A/D/I/T) rubric; those are explicitly categorized as **Concession** and bound to a specific HW-ID in `10-handwavium-ledger.md`. This is an honest-accounting pattern that keeps the concession register small and visible.

## F.2 Verification classes

| Class | Code | Definition in this spec |
|---|---|---|
| Analysis | A | Numerical or analytical demonstration that the requirement is met under stated assumptions (Stefan-Boltzmann radiator calc, mass-budget closure, diffraction-limit calculation, etc.). |
| Demonstration | D | Operational test under canon depiction — i.e., the behavior is shown on-screen or in canon source material. |
| Inspection | I | Canon reconciliation — confirming that architectural elements match authoritative source documents (counts, designations, layouts). |
| Test | T | Real-world laboratory or operational analog (e.g., Leonidas drone-kill demos, NIF beam-combining benchmarks, MARAUDER plasma-toroid data). |
| Concession | C | Requirement is not verifiable; satisfied only by the cited HW-ID. No further action, but the concession is registered and visible. |

## F.3 Requirements verification matrix

Requirements from `01-design-basis.md` §12:

| DR-ID | Derived requirement | Class | Method / HW-ID | Subsystem doc |
|---|---|---|---|---|
| DR-01 | Reactor sustained output ≥ 2.6 × 10²⁷ W | **C** | HW-1, HW-3 | `03` |
| DR-02 | Energy-storage buffer ≥ 2.24 × 10³² J at < 10²⁵ kg | **C** | HW-3 | `03` |
| DR-03 | Beam-to-target coupling sufficient for planetary-volume deposition | **C** | HW-5 | `04` |
| DR-04 | Mass envelope ≤ 1.0 × 10¹⁸ kg | **A** | `appendix-A` mass closure | `02` |
| DR-05 | Hull resists ΔT ≈ 250 K without fatigue | **A** | Expansion-joint analysis @ km scale | `02` §2.4 |
| DR-06 | ECLSS closes mass balance ≥ 90% over 3-year endurance | **A** | Scale-up from ISS Sabatier + OGA + WRS | `06` §6.3 |
| DR-07 | Defensive-weapon inventory matches canon ±5% | **I** | Canon-source reconciliation (WEG + Disney) | `07` §7.1 |
| DR-08 | Hyperdrive Class 4 / Class 24 | **C** | HW-7 | `05` §5.2 |
| DR-09 | Construction schedule 19 ± 2 years | **C** | HW-10 | `02` §2.5 |
| DR-10 | All external apertures have ray and particle shield | **A** | FMEA row-by-row coverage | `07` §7.5, `appendix-E` |
| DR-11 | No single point of failure in shield generation | **A** | Redundant-generator architecture | `09` §9.3, `12` §12.4 |
| DR-12 | Zone-level distributed C2 with < 500 ms anti-fighter kill chain | **A** | Light-time + slew-rate calculation | `08` §8.3 |
| DR-13 | Per-shot waste-heat routing via beam envelope | **C** | HW-4 | `03` §3.3 |
| DR-14 | Net station Δv per shot ≤ 1 m/s | **C** | HW-6 | `04` §4.6, `05` §5.3 |
| DR-15 | Interior decks present ≥ 0.9 g uniform vertical gravity | **C** | HW-8 | `06` §6.4 |
| DR-16 | Configurable attractive force on remote uncharged hulls | **C** | HW-9 | `07` §7.4 |

Of 16 derived requirements: 8 Concession, 6 Analysis, 1 Inspection, 1 Test-eligible through DEW analogs, 0 Demonstration.

## F.4 Handwavium concession accounting

Every Concession-class requirement must cite an HW-ID. Bidirectional check:

| HW-ID | Cited by | Purpose |
|---|---|---|
| HW-1 | DR-01 | Peak power density in 120-km envelope |
| HW-2 | DR-01 (indirectly via fuel), DR-02 | Fuel production |
| HW-3 | DR-01, DR-02 | Storage density |
| HW-4 | DR-13 | Beam = entropy exporter |
| HW-5 | DR-03 | Weapon-target coupling mechanism |
| HW-6 | DR-14 | Momentum conservation |
| HW-7 | DR-08 | FTL propulsion |
| HW-8 | DR-15 | Metric engineering |
| HW-9 | DR-16 | Attractive-force at distance on uncharged hull |
| HW-10 | DR-09 | Industrial-scale throughput |

**Status.** Bidirectional check now complete. Every HW-ID in the ledger has at least one citing DR; every Concession-class DR cites at least one HW-ID. Closed 2026-04-22 under Phase 2 S2.4.

## F.5 V&V evidence catalog

For Analysis-class and Test-class requirements, the supporting evidence is distributed across subsystem documents; this section indexes that evidence.

| DR-ID | Evidence location |
|---|---|
| DR-04 | `02-structural-and-materials.md` §2.2; closure check in `appendix-A` §A.2 §A.6 |
| DR-05 | `02-structural-and-materials.md` §2.4 (α·L·ΔT = 360 m differential expansion; km-scale joints canonical) |
| DR-06 | `06-life-support.md` §6.3 (500,000× ISS Sabatier + 2,700 km² bioregenerative greenhouse) |
| DR-07 | `07-defensive-systems.md` §7.1 (WEG/Disney cross-check: 5,000 + 5,000 + 2,500 + 2,500 = 15,000) |
| DR-10 | FMEA E-02, E-21 — ray+particle shield coverage on every aperture; see `appendix-E-fmea.md` |
| DR-11 | `12-ds2-delta-specification.md` §12.4 (Endor single-point lesson; 3+ body redundancy recommendation) |
| DR-12 | `08-command-control-communications.md` §8.3 (light-time + slew-rate derivation; kill-chain < 500 ms spec) |

## F.6 Real-world V&V analogs (for Test-class requirements)

Even this speculative design can be cross-validated against real laboratory and operational data. Current analogs are cited in the referenced subsystem documents:

| Real-world system | Bearing on DS-1 claim | Subsystem doc |
|---|---|---|
| NIF (2.2 MJ, 500 TW, 192-beam) | Upper-end of beam-combining demonstrated; DS-1 is 10²⁶× larger | `04` §4.4 |
| Epirus Leonidas HPM (49-drone kill, 2025) | Operational HPM supports "ion cannon" as real-physics weapon family | `07` §7.3 |
| MARAUDER / Shiva Star (9.5 MJ, 1-3% c plasma toroids) | Real compact-toroid weapon program; closest "turbolaser" analog | `07` §7.2 |
| NEXT-C / VX-200 VASIMR | Ion-propulsion state of the art; milli-g scaling | `05` §5.1 |
| TAE "Norm" FRC (70 M°C, 2025) | Aneutronic p-¹¹B fusion progress | `03` §3.2 |
| ISS ECLSS (Sabatier + OGA + WRS) | Baseline for 500,000× scale-up | `06` §6.3 |
| 16 Psyche / 216 Kleopatra data | ISRU feedstock inventory | `02` §2.5 |
| USS *Preble* HELIOS Mk 5 Mod 0 | Fielded 60-kW DEW; 26 orders below Saxton turbolaser | `07` §7.2 |

## F.7 V&V status summary

As of draft 0.1, all Analysis-class requirements have supporting calculations in the subsystem documents; all Inspection-class requirements are reconciled against canon; all Test-class references are cited but not formally cross-walked into a separate evidence binder. Formal evidence-binder assembly is a Phase 2 sprint (`../to-dos/phase-2-engineering-artifacts.md`).

Concession-class requirements are satisfied only by the cited HW-ID. If a future revision reduces the concession list (e.g., adopting the minimum-handwave baseline from `11-minimum-handwave-reconstruction.md`), the affected rows in F.3 shift class from C to A.
