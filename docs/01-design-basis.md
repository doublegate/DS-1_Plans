# 01 — Design Basis

**Document:** DS-1 Orbital Battle Station Engineering Specification
**Section:** Consolidated numerical baseline and derived requirements
**Source:** New synthesis. All numbers traceable to ref-doc §§1–7.
**Related:** every subsystem document depends on this file.

---

## 1. Purpose

This document consolidates the numerical design basis for the DS-1 specification into one place, so that every subsystem document in this tree can be checked against a single reference card. Changes here propagate everywhere — do not edit without running a consistency pass (see `appendix-F-vnv-plan.md` and the peer-review phase in `../to-dos/phase-4-peer-review.md`).

## 2. Stakeholder requirements (canon-derived)

The "stakeholder" for this speculative engineering exercise is the body of Star Wars canon and Legends depictions. Derived stakeholder requirements:

| SR-ID | Stakeholder requirement | Authoritative source |
|---|---|---|
| SR-01 | The station shall destroy an Earth-analog planet (Alderaan) in a single shot | *A New Hope* / novelization |
| SR-02 | Full-power recharge shall complete within 24 hours | Canon cadence |
| SR-03 | The station shall be a rigid sphere of diameter on the order of 120–160 km | ANH Legends / post-2016 Wookieepedia |
| SR-04 | The station shall house a permanent population ≥ 1 × 10⁶ | Reconciled WEG/DK sources |
| SR-05 | The station shall mount a complete defensive weapon suite against capital and small craft | *Death Star Technical Companion* |
| SR-06 | The station shall possess Class-4 hyperdrive capability | Canon |
| SR-07 | The station's construction shall be achievable on a ~19-year schedule | Canon build timeline |
| SR-08 | The station shall retain combat effectiveness after hull closure delay (DS-2) | *Return of the Jedi* |

## 3. Reference configuration (geometry of record)

| Parameter | Symbol | Value | Notes |
|---|---|---|---|
| Diameter | D | 120 km | DS-1 adopted |
| Radius | R | 6.0 × 10⁴ m | D/2 |
| Surface area | A_s | 4.52 × 10¹⁰ m² (45,200 km²) | 4πR² |
| Volume | V | 9.05 × 10¹⁴ m³ | (4/3)πR³ |
| Great-circle arc pole-to-pole | s_pp | 188 km | πR |
| Alternate diameter (flagged) | D_alt | 160 km | DS-2 canon; scaling factor 2.37× on volume |
| Diameter discredited | — | 900 km | Saxton Executor-flyby reading; explicitly rejected — do not cite |

**Configuration variable freeze.** The 120-vs-160 km choice is a first-order PDR decision. If 160 km is adopted, every mass, volume, surface-area, radiator, and ECLSS figure in this spec must be rescaled. Open item tracked in `../to-dos/phase-4-peer-review.md` (sprint S4.0).

## 4. Mass budget

Design-basis dry mass **M = 1.0 × 10¹⁸ kg**. Lower bound ~2 × 10¹⁷ kg (modern-warship density scaling at 120 km). See `02-structural-and-materials.md` for the subsystem breakdown.

**Perspective factors:** 0.07% of Earth's oceans; 2 × 10¹² × ISS; 10¹⁰ × Nimitz; 1.7 × 10⁸ × Great Pyramid; 1,250 × Mount Everest above base.

**Self-gravity.** Surface g = GM/R² = **1.85 × 10⁻² m/s² ≈ 1.9 milli-g**. Central pressure P_c = 3GM²/(8πR⁴) ≈ 1.2 MPa — three orders below quadanium yield. Self-gravity is not the structural driver.

**Structural driver.** Thermal gradient at 1 AU: ΔT ≈ 250 K across the sunlit/shadow terminator. α·L·ΔT ≈ 360 m of differential expansion across the hull. Expansion joints at km scale are mandatory (canonically: supplementary trenches).

## 5. Energy baseline

| Quantity | Symbol | Value | Derivation |
|---|---|---|---|
| Alderaan-shot energy | U₀ | **2.24 × 10³² J** | 3GM_Earth² / (5 R_Earth) |
| Peak shot power (1-s pulse) | P_peak | 2.24 × 10³² W = 585,000 L☉ | U₀ / 1 s |
| Sustained reactor (24-h recharge) | P_sus | 2.6 × 10²⁷ W = 6,800 L☉ | U₀ / 86,400 s |
| Required energy density of storage | ε_min | ~c² = 9 × 10¹⁶ J/kg | To close in <10²⁵ kg |
| Canonical hypermatter specific energy | ε_hyp | 9 × 10¹⁶ J/kg | *Incredible Cross-Sections* |
| Upper-bound shot energy (debris kinetics) | U_max | 10³⁸ J | Wong, StarDestroyer.net; not design-driven |

Third-party concordance on U₀: Siegel (2.2e32), Saxton (2.4e32), Minton (2.24e32), Allain (~1e32), Cox ("about one week of Sun's output" = 2.31e32). The design basis adopts the mean rounded value U₀ = 2.24 × 10³² J.

## 6. Waste-heat envelope

Even at 0.1% inefficiency on the 2.24 × 10³² J shot, waste heat is 2.24 × 10²⁹ J per shot. Stefan-Boltzmann over the full 4.5 × 10¹⁰ m² hull:

| Hull temperature | Radiated power | Time to shed 10²⁹ J |
|---|---|---|
| 300 K (passive) | 2.1 × 10¹¹ W | ~10¹⁸ s (infeasible) |
| 1,000 K (structural ceiling) | 2.6 × 10¹⁸ W | 2,780 years |
| 2,500 K (tungsten melt) | 1.0 × 10²¹ W | ~7 years |
| 5,800 K (solar effective) | 2.6 × 10²² W | ~100 days |

**Consequence.** To reset within a 24-hour cycle, conversion-chain efficiency must exceed 1 − 10⁻⁹ = 99.9999999%. The only internally consistent resolution is that the **superlaser beam itself carries away nearly all entropy**; the weapon is the primary radiator. Tracked as HW-4 in `10-handwavium-ledger.md`.

## 7. Crew and ECLSS baseline

| Parameter | Value | Source |
|---|---|---|
| Design crew | N = 1.7 × 10⁶ | Reconciled canon |
| At-Yavin head count (Rogue One UVG) | 1,565,231 personnel-equivalent | 1.196M mil + 400k droids + 250k non-mil |
| Pressurized volume | 9 × 10¹² m³ (1% of total) | |
| Atmosphere mass at 1 atm | 1.1 × 10¹³ kg | |
| O₂ consumed / CO₂ produced (total) | 1.43 × 10⁶ kg/d / 1.70 × 10⁶ kg/d | |
| Potable water | 5.95 × 10⁶ kg/d | |
| Metabolic heat | 1.7 × 10⁸ W | N × 100 W |
| Crew-plus-equipment waste heat | ~2 × 10⁹ W | One hyperscale data center — trivial vs reactor |

Full breakdown in `06-life-support.md`.

## 8. Propulsion baseline

| Parameter | Value |
|---|---|
| Moment of inertia | I = (2/5)MR² = 1.44 × 10²⁴ kg·m² |
| Per-shot photon recoil | Δv ≈ 0.8 m/s (10¹⁸ kg station, pure-EM) |
| Particle-beam recoil (γ = 2–5) | 10²–10³× worse; mandates axial back-brace |
| Reorient 90° in 1 hr | L ~ 6.3 × 10²⁰ kg·m²/s; 10¹⁶ N·s tangential impulse |
| Hyperdrive class (DS-1) | Class 4.0 primary / Class 24 backup (123× SSP06) |
| Hyperdrive field energy (Lentz scaling) | ~10⁴⁵ J for a 120-km bubble |

## 9. Defensive-system baseline (DS-1)

| System | Count | Source |
|---|---|---|
| Heavy turbolasers | 5,000 | WEG Tech Companion |
| Standard turbolasers | 5,000 | WEG |
| Laser cannons | 2,500 | WEG |
| Ion cannons | 2,500 | WEG |
| Tractor-beam emplacements | 768 (24 × 32) | Invariant across all sources — architectural constant |
| TIE/ln, Interceptor, Bomber (combined) | 7,000–7,293 | WEG / *Blueprints* |

Disney-canon aggregate: "~15,000 turbolaser batteries" = 5,000 + 5,000 + 2,500 + 2,500. Consistent.

## 10. Environmental design envelope

- Orbital regime: deep space, 1 AU solar flux baseline; design envelope extends to 0.3–5 AU
- Sub-solar equilibrium T: 270–390 K (emissivity-dependent)
- Deep-shadow limb T: 70–120 K
- Interplanetary meteoroid flux (deep space, 45,200 km² presented area): ~4.5 × 10⁶ mg-class/yr; ~4.5 × 10³ g-class/yr; 10¹–10² kg-class/yr

## 11. Irreducible physics concessions (summary)

| HW-ID | Wall | Canonical escape hatch |
|---|---|---|
| HW-1 | 5 × 10⁵ L☉ in a 1-s pulse through solid matter | Hypermatter channels + deflector shielding |
| HW-2 | Antimatter unproducible at scale | Hypermatter = tachyonic, formed in hyperspace |
| HW-3 | No known storage holds 10³² J in <10²⁵ kg | Hypermatter as combined fuel + capacitor |
| HW-4 | Waste heat >10²⁹ J per shot cannot radiate | Beam carries entropy; exhaust-port venting |
| HW-5 | EM laser cannot volume-couple to planet core | Superlaser is a hypermatter particle beam |
| HW-6 | Momentum recoil 10²³ kg·m/s | ~10²⁵ kg hypermatter core, or beam reactionless |
| HW-7 | Hyperdrive at 10⁴⁵ J field energy | Hypermatter / Lentz-class plasma soliton |
| HW-8 | No mechanism for plate-scale metric manipulation | "Gravity generators" (unspecified) |
| HW-9 | No tractor mechanism for uncharged hull | "Gravitic manipulation" (unspecified) |
| HW-10 | 10¹⁸ kg in 19 yr ≈ 10¹⁶ W industrial power | Kardashev-II ISRU + self-replicating robotics |

Full register with commentary in `10-handwavium-ledger.md`. Every load-bearing engineering claim in a subsystem document should either stand on real physics or cite the HW-ID it depends on.

## 12. Derived engineering requirements

Traceability between stakeholder requirements and derived engineering requirements. This table is the seed for the Verification & Validation plan (`appendix-F-vnv-plan.md`).

| DR-ID | Derived requirement | Traces to SR | Verification class |
|---|---|---|---|
| DR-01 | Reactor sustained output ≥ 2.6 × 10²⁷ W | SR-01, SR-02 | Concession (HW-1, HW-3) |
| DR-02 | Energy-storage buffer ≥ 2.24 × 10³² J at <10²⁵ kg | SR-01, SR-02 | Concession (HW-3) |
| DR-03 | Beam-to-target coupling sufficient to deposit ≥ 1 × U₀ in planetary volume | SR-01 | Concession (HW-5) |
| DR-04 | Structural mass accommodates ≤ 1.0 × 10¹⁸ kg design envelope | SR-03 | Analysis (mass-budget propagation) |
| DR-05 | Hull resists ΔT ≈ 250 K without fatigue over station life | SR-03 | Analysis (expansion-joint design) |
| DR-06 | ECLSS closes mass balance to ≥ 90% over 3-year endurance | SR-04 | Analysis (ISS/Biosphere-2 extrapolation) |
| DR-07 | Defensive-weapon inventory matches canonical counts within ±5% | SR-05 | Inspection (canon reconciliation) |
| DR-08 | Hyperdrive delivers Class 4 / Class 24 travel-time class | SR-06 | Concession (HW-7) |
| DR-09 | Construction schedule 19 ± 2 years | SR-07 | Concession (HW-10) |
| DR-10 | All external apertures protected by both ray and particle shield | SR-08 (derived from DS-2 lesson) | Analysis (vulnerability register) |
| DR-11 | No external single point of failure in shield generation | SR-08 | Analysis (FMEA, `appendix-E-fmea.md`) |
| DR-12 | Zone-level distributed C2 with < 500 ms anti-fighter kill chain | SR-05 | Analysis (C3 timing, `08-command-control-communications.md`) |
| DR-13 | Per-shot waste-heat routing shall dispose of ≥ 2.24 × 10²⁹ J via the beam envelope rather than hull radiation | SR-01, SR-02 | Concession (HW-4) |
| DR-14 | Net recoil per shot shall produce ≤ 1 m/s station Δv on the 10¹⁸ kg design envelope | SR-01 | Concession (HW-6) |
| DR-15 | Interior habitable decks shall present ≥ 0.9 g uniform vertical gravity | SR-04 | Concession (HW-8) |
| DR-16 | Tractor projectors shall apply configurable attractive force on remote uncharged hulls up to *Falcon*-class at 100 km range | SR-05 | Concession (HW-9) |

## 13. Change control

Any edit to the values in §§3–10 of this document is a design-baseline change. Process:
1. Open an entry in `../to-dos/sprint-backlog.md` tagged `change-request`
2. Propagate the change to every subsystem document that references the value (grep before edit)
3. Update `appendix-A-mass-power-thermal-budget.md`
4. Update `appendix-D-figures-and-tables.md` if any table is affected
5. Bump draft version in this document's header
