# 12 — DS-2 Delta Specification

**Source:** Ref-doc Appendix A (*Return of the Jedi* modifications), verbatim-equivalent
**Related:** `04-superlaser.md`, `07-defensive-systems.md`, `09-vulnerability-analysis.md`

---

## 12.1 Diameter and configuration

Current canon (Visual Dictionary / Complete Locations, post-2016): **160 km** diameter, "approximately 3–4% of Endor's 4,900-km diameter." Disney Wiki / some Legends: 200 km. The fan-derived 900-km figure (Saxton via Executor flyby) is **discredited** — the surface shown in that shot is a flat ILM model, not curved. **Adopted for this spec: 160 km.**

Scaling consequences vs. DS-1 120 km:
- Volume × 2.37
- Surface area × 1.78
- Mass (if proportional) × 2.37 → 2.37 × 10¹⁸ kg

These propagate into the consolidated MPT budget (`appendix-A-mass-power-thermal-budget.md`).

![F-A.1 — DS-1 vs DS-2 configuration comparison plate. 120 km/1.0×10¹⁸ kg vs 160 km/2.37×10¹⁸ kg side-by-side; superlaser, shield, and exhaust deltas annotated.](../figures/F-A.1.png)

## 12.2 Incomplete-construction aesthetic

Canonically: a mix of real unfinished construction and a feint to lure the Rebellion. Core systems (superlaser, reactor, C3, shield) were complete; hull closure was the lagging item. Engineering implications:
- Internal airtight bulkheading handles pressure loss (standard starship practice)
- Unfinished hull actually helps waste-heat rejection by increasing radiator area
- The real new vulnerability is hull-penetration flight paths direct to the reactor — the vector Lando exploited

Operating core systems before hull closure is standard (ISS did it); doing so against a known adversary is tactically negligent.

## 12.3 Superlaser upgrade

| Parameter | DS-1 | DS-2 |
|---|---|---|
| Tributary architecture | 8 equal | 7 equal + 1 central large |
| Full-power recharge | ~24 h | "Few minutes" (canon); "every 3 min" (d6holocron) |
| Target class | Planet | Planet and capital ship |
| Reactor cores | 1 hypermatter annihilator | 3 hypermatter reactors (Legends) |

**Energy arithmetic.** A capital-ship kill needs ~10¹⁵–10¹⁸ J (vaporize 10⁶–10⁸ kg at ~10¹⁰ J/kg coupling). A 3-min recharge at capital-ship power is 5.5 × 10¹²–5.5 × 10¹⁵ W — 10⁹–10¹² × below planet-kill power draw. **Capital-ship shots are consistent with DS-1-class reactor output at low duty cycle.** The reactor scale-up is only mandatory if DS-2 maintains planet-kill capability at 3-minute cadence, which canon implies but the films never demonstrate. Conservative reading: DS-2 has modestly scaled reactor capacity + vastly improved capacitor bank and kyber-focusing-lens bandwidth, allowing rapid partial-power discharges.

## 12.4 Shield decoupling — Endor ground generator

DS-2's SLD-26 Planetary Shield Generator (CoMar) is on the Endor forest moon (radius ~2,450 km), not on the station. Geostationary position held via repulsorlift coupling; the field caused Endor seismic disturbance and lake displacement.

**Engineering rationales, ranked plausibility:**
1. **Power-draw coexistence.** Three reactor cores at rapid-fire plus a 160-km in-hull shield bubble may exceed the in-hull thermal-rejection budget. Offloading to a ground facility exploits Endor's thermal mass, atmosphere, and ground-plane area as heat sink.
2. **Volume recovery.** DS-1 had many surface shield-projection towers consuming internal volume; offloading frees interior for weapons/reactors/hangars.
3. **Planetary-scale power tap.** Canon hints the SLD-26 was "slowly destroying Endor" — consistent with geothermal or tidal-dissipation energy extraction via the repulsor coupling. Partially handwavium but physically coherent as a tidal-dissipation model.
4. **Political/aesthetic.** Garrisons Endor with elite stormtroopers, projects power onto inhabited worlds in view, forms part of the trap.

**Vulnerability:** Single point of failure. A ground assault disabled the generator and dropped the shield. **Worst-practice engineering.** Correct redundant design would place at least three independent generators on three independent planetary bodies or L-point stations, with voting logic and graceful degradation — the same principle as ICBM LCC Permissive Action Links. Tracked as DR-11 in `01-design-basis.md`.

## 12.5 Reactor, hyperdrive, and thermal venting

DS-2 has **three hypermatter reactor cores** (Legends *Death Star II* article). Multi-core carries:
- Redundancy (one core offline, station operational)
- Power summation for rapid-recharge superlaser
- Differential fueling/maintenance

Real-world analog: *Gerald R. Ford*-class CVN has 2 × A1B reactors. The architecture is engineering-sound.

DS-2 replaced the DS-1 single 2-m exhaust port with **millions of millimeter-scale heat-dispersion tubes** — canonically cited and a real-engineering correct fix (`07-defensive-systems.md` §7.7).

DS-2 hyperdrive class is canonically **unspecified / incomplete** at the Battle of Endor; some Legends cite Class 2 but no primary verification. The station was held in geostationary station-keeping during the battle; hyperdrive was not operational.

*See Figure F-7.4 (in `07-defensive-systems.md` §7.7) for the DS-1 vs DS-2 exhaust-port comparison.*

## 12.6 DS-2 weapons complement

| System | DS-2 count | Ratio to DS-1 |
|---|---|---|
| Superlaser | 1 (new architecture) | — |
| Heavy turbolasers | 15,000 | 3× |
| Standard turbolasers | 15,000 | 3× |
| Laser cannons | 7,500 | 3× |
| Ion cannons | 5,000 | 2× |
| Tractor beam emplacements | 768 | 1× |
| TIE complement | "thousands" | Similar |
| Military crew | 637,835 | ~40% of DS-1 |

The tractor-beam count's invariance across DS-1 and DS-2 strongly suggests 768 is a geometric/architectural constant (24 zones × 32 per zone, or similar) rather than a capacity-limited figure.

---

## Cross-references

- Superlaser physics: `04-superlaser.md`
- Defensive-system doctrine: `07-defensive-systems.md`
- Vulnerability analysis DS-2 death pattern: `09-vulnerability-analysis.md` §9.2
- Redundant-generator requirement DR-11: `01-design-basis.md`
