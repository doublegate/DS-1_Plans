# Appendix A — Consolidated Mass, Power, and Thermal Budget

**Source:** New synthesis. All figures traceable to ref-doc / subsystem documents in this tree.
**Related:** `01-design-basis.md`, every subsystem document.

---

## A.1 Purpose

Single-page engineering ledger consolidating the mass, power, and thermal numbers scattered across the subsystem documents. This document is the checkbook — if a change to any subsystem does not close here, the change is not yet consistent.

## A.2 Mass budget (DS-1, 120 km, M = 1.0 × 10¹⁸ kg)

From `02-structural-and-materials.md` §2.2:

| # | Subsystem | Mass fraction | Mass (kg) | Source doc |
|---|---|---|---|---|
| M-01 | Primary hull / load-bearing superstructure | 35% | 3.5 × 10¹⁷ | `02` §2.2 |
| M-02 | Armor (Whipple + composite + spaced belts) | 25% | 2.5 × 10¹⁷ | `02` §2.2, §2.6 |
| M-03 | Internal structure, decks, bulkheads | 20% | 2.0 × 10¹⁷ | `02` §2.2 |
| M-04 | Reactor + reactor shielding | 8% | 8.0 × 10¹⁶ | `03` + `02` §2.2 |
| M-05 | Weapons (superlaser + 15,000 turrets + kyber + tractor) | 4% | 4.0 × 10¹⁶ | `04` + `07` |
| M-06 | Propulsion (123 hyperdrives + ion arrays + reaction-mass bunker) | 3% | 3.0 × 10¹⁶ | `05` |
| M-07 | Atmosphere (1 atm in 10% of volume) | 0.012% | 1.2 × 10¹⁴ | `06` §6.2 |
| M-08 | Consumables, fuel, water, crew (3-year endurance) | 2% | 2 × 10¹⁶ | `06` §6.3 |
| M-09 | Fighter/capital-ship complement | 1% | 1 × 10¹⁶ | `06` §6.6 |
| M-10 | Margin | ~2% | 2 × 10¹⁶ | |
| | **Total** | **100%** | **1.0 × 10¹⁸** | |

**DS-2 scaling note.** If adopting 160 km DS-2 (`12-ds2-delta-specification.md` §12.1), multiply line items M-01…M-03 by 2.37. Full rescaling is a PDR action item (`../to-dos/phase-4-peer-review.md` sprint S4.0).

## A.3 Power budget

### A.3.1 Shot-time (peak)

| # | Load | Peak (W) | Source |
|---|---|---|---|
| P-01 | Superlaser output (1-s pulse) | 2.24 × 10³² | `04` §4.6 |
| P-02 | Reactor→beam conversion chain (≥99.99999% efficient) | 2.24 × 10³² (≈1:1 with P-01) | `03` §3.3 |
| P-03 | Photon-pressure recoil impulse (into hull) | 7.5 × 10²³ kg·m/s ÷ 1 s = 7.5 × 10²³ N | `04` §4.6 |

### A.3.2 Steady-state (24-hour recharge)

| # | Load | Sustained (W) | Source |
|---|---|---|---|
| P-10 | Reactor sustained average (recharge) | 2.6 × 10²⁷ | `03` §3.1 |
| P-11 | All 10,000 turbolaser batteries simultaneously (worst-case) | 10¹⁹ | `07` §7.2 |
| P-12 | Ion-drive array (milli-g on 10¹⁸ kg) | 4.5 × 10¹⁴ | `05` §5.1 |
| P-13 | ECLSS scrubber-loop electrical (1.7M crew) | 1.5 × 10⁹ | `06` §6.3 |
| P-14 | Crew + equipment waste-heat load | 2 × 10⁹ | `06` §6.5 |
| P-15 | Tractor-capture against *Falcon*-class (100 km range, 1 g) | 3 × 10¹⁰ | `07` §7.4 |

Observation: even the sum of P-11…P-15 under worst case is 10¹⁹ W — nine orders below reactor steady-state capacity. **Reactor is never power-limited on defensive systems**; the constraint is always thermal (§A.4) and storage (`03` §3.4).

## A.4 Thermal budget

### A.4.1 Shot-time thermal

| # | Heat source | Per shot (J) | Disposal mechanism | Source |
|---|---|---|---|---|
| T-01 | Reactor-to-beam conversion loss (0.1% at canonical U₀) | 2.24 × 10²⁹ | Carried out by beam itself (HW-4) | `03` §3.3 |
| T-02 | Stefan-Boltzmann capacity over 4.5 × 10¹⁰ m² at 3,000 K | 2 × 10²² | Passive radiation (insufficient by 10⁷ in 24 h) | `03` §3.3 |

**Net shot-thermal statement:** there is no radiator solution. HW-4 (beam = entropy exporter) is the only closure.

### A.4.2 Steady-state thermal

| # | Heat source | Sustained (W) | Source |
|---|---|---|---|
| T-10 | Reactor steady-state waste (≥ 0.001% of 2.6e27) | ≥ 2.6 × 10²² | `03` §3.3 |
| T-11 | Ion-drive open-cycle (exhaust carries) | 1.5 × 10¹⁷ (carried by propellant) | `05` §5.1 |
| T-12 | Crew + equipment | 2 × 10⁹ | `06` §6.5 |
| T-13 | Turbolaser firing (not continuous) | 10¹⁵ per active turret | `07` §7.2 |

**Radiator-area requirement (3,000 K):**
- To shed T-10: ~10¹² m² (still larger than hull). Requires exotic-channel venting (hypermatter-specific modes) through the meridian exhaust port or DS-2 distributed microports.
- To shed T-12 at 300 K: 4.8 × 10⁵ m² = 0.48 km². Trivially accommodated in equatorial-trench radiator geometry.

## A.5 Volume budget

From `02-structural-and-materials.md` §2.1 (V = 9.05 × 10¹⁴ m³):

| Use | Fraction | Volume (m³) | Source |
|---|---|---|---|
| Pressurized habitable | 1% | 9 × 10¹² | `06` §6.2 |
| Hangar bays (TIE + AT-AT + assault shuttles) | < 1% | ~4 × 10⁷ | `06` §6.6 |
| Reactor / reactor shielding / superlaser amplifier chain | ~5% (estimated) | ~4.5 × 10¹³ | ref-doc §2, §3 |
| Water/ice reserve (3-year) | < 0.1% | ~6.5 × 10⁵ | `06` §6.3 |
| Internal transit infrastructure | — | — | `06` §6.7 |
| Remaining structural/void | balance | balance | |

## A.6 Consistency checks

A subsystem-edit review must verify:
- **Mass closure**: lines M-01…M-10 sum to ≤ 1.0 × 10¹⁸ kg (margin ≥ 0)
- **Power closure**: sustained load ≤ reactor sustained output with thermal-reject closure
- **Thermal closure**: every load disposed via named mechanism (radiation / exhaust / HW-4 beam-export)
- **Volume closure**: habitable + hangar + reactor + propulsion compartments ≤ 100% of V

Any edit that breaks closure is a defect (filed against `../to-dos/phase-4-peer-review.md`).

## A.7 DS-2 — see parallel appendix

DS-2's mass / power / thermal budget is maintained as a parallel document in `appendix-A2-ds2-mass-power-thermal-budget.md` (produced under Phase 2 S2.5, 2026-04-22). Do not duplicate DS-2 numbers here; any DS-1-vs-DS-2 comparison should pull from both files.

Scaling factors at a glance (full rebudget in A2):

| Quantity | DS-1 → DS-2 factor |
|---|---|
| Volume | × 2.370 |
| Surface area | × 1.778 |
| Structural mass | × 2.370 (→ 2.37 × 10¹⁸ kg) |
| Reactor cores | × 3 |
| Turbolasers (heavy + std + laser) | × 3 |
| Ion cannons | × 2 |
| Tractor projectors | × 1 (count invariant; architectural constant) |
| Military crew | × 0.4 (→ 637,835) |
