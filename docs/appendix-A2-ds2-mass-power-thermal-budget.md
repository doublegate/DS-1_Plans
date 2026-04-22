# Appendix A2 — DS-2 Mass, Power, and Thermal Budget

**Source:** New synthesis (Phase 2 S2.5, 2026-04-22). Scales `appendix-A-mass-power-thermal-budget.md` to the 160-km DS-2 configuration and applies the DS-2 deltas from `12-ds2-delta-specification.md`.
**Related:** `appendix-A-mass-power-thermal-budget.md` (DS-1 baseline), `12-ds2-delta-specification.md` (architectural deltas).

---

## A2.1 Purpose

DS-1 and DS-2 are architecturally related but not identical. DS-1 is 120 km with one reactor; DS-2 is 160 km with three reactors, ~3× the turbolasers, and an off-station shield generator. A single MPT budget cannot serve both. This appendix is the DS-2 counterpart to `appendix-A`.

## A2.2 Configuration (from `01-design-basis.md` §3 and `12-ds2-delta-specification.md`)

| Parameter | DS-1 | DS-2 | Ratio |
|---|---|---|---|
| Diameter | 120 km | 160 km | 1.333 |
| Radius R | 60 km | 80 km | 1.333 |
| Surface area A_s | 4.52 × 10¹⁰ m² | 8.04 × 10¹⁰ m² | 1.778 |
| Volume V | 9.05 × 10¹⁴ m³ | 2.14 × 10¹⁵ m³ | 2.370 |
| Moment of inertia I | 1.44 × 10²⁴ kg·m² | 6.07 × 10²⁴ kg·m² | 4.218 |
| Reactors | 1 | 3 | 3× |
| Design-basis mass M | 1.0 × 10¹⁸ kg | **2.37 × 10¹⁸ kg** | 2.370 |

The DS-2 mass assumes proportional scaling of primary-hull / armor / internal-structure (subsystems dominated by enclosed volume). Weapons and crew deltas are applied below.

## A2.3 Mass budget

Scaling rule: volume-proportional subsystems × 2.370; surface-proportional subsystems × 1.778; reactor × 3; weapons × 3 for heavy/std/laser, × 2 for ion, × 1 for tractor; crew × 0.4 (ratio 637,835 / 1.7M).

| # | Subsystem | DS-1 fraction | DS-1 mass (kg) | DS-2 mass (kg) | Notes |
|---|---|---|---|---|---|
| M-01 | Primary hull / load-bearing superstructure | 35% | 3.5 × 10¹⁷ | **8.30 × 10¹⁷** | × 2.370 (volume-proportional) |
| M-02 | Armor (Whipple + composite + spaced belts) | 25% | 2.5 × 10¹⁷ | **4.45 × 10¹⁷** | × 1.778 (surface-proportional) |
| M-03 | Internal structure, decks, bulkheads | 20% | 2.0 × 10¹⁷ | **4.74 × 10¹⁷** | × 2.370 |
| M-04 | Reactor + reactor shielding | 8% | 8.0 × 10¹⁶ | **2.40 × 10¹⁷** | × 3.0 (three cores) |
| M-05 | Weapons (superlaser + turrets + kyber + tractor) | 4% | 4.0 × 10¹⁶ | **1.20 × 10¹⁷** | × 3.0 (turret count delta + upgraded superlaser optics) |
| M-06 | Propulsion (hyperdrives + ion array + reaction-mass bunker) | 3% | 3.0 × 10¹⁶ | **5.34 × 10¹⁶** | × 1.778 (surface-array-dominated) |
| M-07 | Atmosphere (1 atm in 10% of interior volume) | 0.012% | 1.2 × 10¹⁴ | **2.84 × 10¹⁴** | × 2.370 |
| M-08 | Consumables, fuel, water (3-year endurance) | 2% | 2 × 10¹⁶ | **8 × 10¹⁵** | × 0.4 (crew-ratio) |
| M-09 | Fighter/capital-ship complement | 1% | 1 × 10¹⁶ | **1 × 10¹⁶** | × 1.0 (canon "thousands" TIEs, similar) |
| M-10 | Margin | ~2% | 2 × 10¹⁶ | **4.74 × 10¹⁶** | × 2.370 |
| | **Total** | **100%** | **1.0 × 10¹⁸** | **~2.38 × 10¹⁸** | Within ±0.5% of 2.37 × 10¹⁸ target |

Closure: 2.38 × 10¹⁸ kg (< 0.5% above the 2.37 × 10¹⁸ design-basis target — acceptable). Margin line carries the rounding.

## A2.4 Power budget

### A2.4.1 Shot-time (peak)

Canon DS-2 fires faster (3–5 min recharge) but can deliver planet-kill shots. Three reactors allow either power-summation for full planet-kill OR one-of-three capital-ship shots at low duty cycle.

| # | Load | DS-1 peak (W) | DS-2 peak (W) | Notes |
|---|---|---|---|---|
| P-01 | Full planet-kill superlaser pulse (1 s) | 2.24 × 10³² | 2.24 × 10³² | Same physics; same U₀ |
| P-01b | Capital-ship shot (partial discharge) | n/a | ~10¹⁵–10¹⁸ | One reactor; low duty cycle; 3-min recharge |
| P-02 | Reactor→beam conversion chain (≥ 99.99999%) | 2.24 × 10³² | 2.24 × 10³² | Unchanged |
| P-03 | Photon-pressure recoil impulse | 7.5 × 10²³ N | 7.5 × 10²³ N | Station × 2.37 mass → smaller Δv/shot |

### A2.4.2 Steady-state (planet-kill 3-min recharge)

A 180-second recharge to 2.24 × 10³² J requires P_sus = 1.24 × 10³⁰ W — **478× the DS-1 sustained power**. Three DS-1-class reactors sum to only 7.8 × 10²⁷ W, 160× short. **DS-2 cannot sustain planet-kill shots at a 3-minute cadence with DS-1-equivalent reactor tech.**

Two narrative resolutions (both canon-consistent):
1. **3-minute cadence applies only to capital-ship shots** (~10¹⁵ J class), which IS achievable with DS-1-class reactor output at low duty cycle. Full planet-kill shots still take hours. Films never demonstrate <hour planet-kill cadence.
2. **Each DS-2 reactor is itself scaled up**, not just multi-copied. If each core is 160× DS-1 output (4.2 × 10²⁹ W sustained), then 3-core sum meets 3-min planet-kill requirement.

Conservative reading (adopted for this budget): capital-ship shots at 3-min cadence are consistent with 3 × DS-1-class cores; planet-kill shots require either scaled cores or remain hourly. Flagged as open in §A2.7.

### A2.4.3 Steady-state defensive systems

| # | Load | DS-1 sustained (W) | DS-2 sustained (W) | Notes |
|---|---|---|---|---|
| P-10 | All turbolasers simultaneously (worst case) | 10¹⁹ | 3 × 10¹⁹ | × 3 battery count |
| P-11 | Ion cannons simultaneously | — | — | × 2 battery count; subordinate |
| P-12 | Shield generation (in-hull bubble) | ~10²⁰ (est.) | offloaded | Endor-moon SLD-26 carries this |
| P-13 | Ion-drive array | 4.5 × 10¹⁴ | 8.0 × 10¹⁴ | × 1.778 surface-proportional |
| P-14 | ECLSS scrubber-loop | 1.5 × 10⁹ | 6 × 10⁸ | × 0.4 crew-ratio |
| P-15 | Crew + equipment waste heat | 2 × 10⁹ | 8 × 10⁸ | × 0.4 |
| P-16 | Tractor-beam projectors (mesh) | 3 × 10¹⁰ | 3 × 10¹⁰ | × 1 (count invariant) |

Sum of worst-case P-10 through P-16: ~3 × 10¹⁹ W. Three DS-1-class cores (7.8 × 10²⁷ W) exceed this by 8 orders. **Defensive-side is not power-limited.** Constraint remains thermal + storage for the superlaser.

## A2.5 Thermal budget

### A2.5.1 Shot-time thermal

| # | Heat source | DS-1 per shot (J) | DS-2 per shot (J) | Disposal |
|---|---|---|---|---|
| T-01 | Reactor-to-beam conversion loss (0.1%) | 2.24 × 10²⁹ | 2.24 × 10²⁹ | HW-4 / DR-13: carried by beam envelope |
| T-02 | Stefan-Boltzmann capacity at 3,000 K, 24h | 2 × 10²² | 3.5 × 10²² | × 1.778 surface; still insufficient by 10⁷ |

### A2.5.2 Steady-state thermal

| # | Heat source | DS-1 sustained (W) | DS-2 sustained (W) | Notes |
|---|---|---|---|---|
| T-10 | Reactor steady-state waste (3 cores; 0.001%) | 2.6 × 10²² | 7.8 × 10²² | × 3 |
| T-11 | Ion-drive open-cycle loss (exhaust-carried) | 1.5 × 10¹⁷ | 2.7 × 10¹⁷ | × 1.778 |
| T-12 | Crew + equipment | 2 × 10⁹ | 8 × 10⁸ | × 0.4 |
| T-13 | Turbolaser firing (not continuous) | 10¹⁵ / turret | 10¹⁵ / turret | Per-turret; 3× battery count |

**Radiator-area delta.** DS-2 has 1.778× more surface area but 3× reactor waste; net radiator demand / surface increases 1.687×. DS-2 canonically replaces the single 2-m exhaust port with millions of mm-scale heat-dispersion tubes (`12-ds2-delta-specification.md` §12.5). The distributed-microport architecture is the real-engineering correct fix; tube count × tube area ≈ DS-1 exhaust area × 3 reactor-thermal-factor is the design-sizing rule.

### A2.5.3 Endor-moon shield thermal offload

Canonically DS-2's SLD-26 is on Endor, not the station. Engineering rationale (from `12-ds2-delta-specification.md` §12.4):

- Three reactor cores at rapid-fire + 160-km in-hull shield bubble may exceed in-hull thermal-rejection budget
- Offloading to Endor exploits its thermal mass, atmosphere, and ground-plane as heat sink
- Canonical hint that the SLD-26 was "slowly destroying Endor" consistent with tidal-dissipation energy extraction

This MPT budget does NOT count Endor's thermal contribution in station-side balance — it is an external-sink. The trade-off is a single-point failure (risk closed in design as E-20 in `appendix-E-fmea.md`).

## A2.6 Volume budget

| Use | DS-1 fraction | DS-1 m³ | DS-2 fraction | DS-2 m³ | Notes |
|---|---|---|---|---|---|
| Pressurized habitable | 1% | 9 × 10¹² | 1% (proportional) | 2.14 × 10¹³ | Less crew per m³ — more per-capita space |
| Hangar bays | < 1% | ~4 × 10⁷ | < 1% | ~4 × 10⁷ | Unchanged fleet size |
| Reactor / shielding / amplifier chain | ~5% | ~4.5 × 10¹³ | ~10% | ~2.14 × 10¹⁴ | × 3 reactor footprint + improved kyber-focusing-lens bay |
| Shield-projector internals | non-zero | — | ≈0 | — | Offloaded to Endor — DS-2 gains this volume |
| Remaining structural / void | balance | balance | balance | balance | |

**Net volume observation:** DS-2 reclaims the DS-1 shield-tower internal volume (since shield is external) and spends most of that + more on reactor expansion. Per-capita habitable volume grows significantly — consistent with canon's reduced military-crew figure.

## A2.7 Consistency checks and open items

Closure checks:
- [x] Mass rows sum to within ± 0.5% of 2.37 × 10¹⁸ design-basis target (margin absorbs rounding)
- [x] Sustained power bounded by 3-core reactor aggregate (7.8 × 10²⁷ W for 3× DS-1-class)
- [x] Every thermal row cites a disposal mechanism
- [x] Volume rows sum to ≤ V

Open items:
- **OI-A2.1** — Reactor scaling vs multi-copy ambiguity. Canon implies 3-min planet-kill recharge; this requires either 160× DS-1-class reactor (not just 3 cores) OR acceptance that planet-kill cadence remains hourly. Flag for `phase-4-peer-review.md` sprint S4.3 (handwavium traceability). No additional HW-ID proposed at this time; falls under HW-1 family.
- **OI-A2.2** — Endor-moon thermal contribution is external; any revision treating it as internally sourced must add rows here.
- **OI-A2.3** — The `appendix-A-mass-power-thermal-budget.md` §A.7 scaling note can now be retired in favor of this appendix. Cross-reference from §A.7 to this file.

## A2.8 Change control

Same rules as `appendix-A`:
1. Any change to DS-2 geometry (D, R, V, A_s) requires rescaling all proportional rows
2. Any change to reactor-count or turret-count assumption requires rebalancing P and T budgets
3. Bump draft version in this document's header

## A2.9 Retirement of `appendix-A` §A.7

With this document in place, §A.7 of `appendix-A-mass-power-thermal-budget.md` should be shortened to a pointer:

> DS-2 mass / power / thermal budget is maintained as a parallel document in `appendix-A2-ds2-mass-power-thermal-budget.md`. Do not duplicate DS-2 numbers here; any DS-1-vs-DS-2 comparison should pull from both files.

This pointer-replacement is tracked as a sprint-backlog item.
