# 05 — Propulsion

**Source:** Ref-doc §4 (verbatim-equivalent)
**Related:** `01-design-basis.md`, `04-superlaser.md` (recoil coupling), `10-handwavium-ledger.md`

---

## 5.1 Sublight: ion drive array

Canon: two Sepma 30-5 ion engines plus a dense array on the southern hemisphere; MGLT rating 10. Real ion-propulsion state of the art:

| Engine | Power | Thrust | Isp | Exhaust v |
|---|---|---|---|---|
| NSTAR (Dawn, DS1) | 2.3 kW | 92 mN | 3,100 s | 30 km/s |
| NEXT-C (DART 2021) | 7.4 kW | 236 mN | 4,190 s | 41 km/s |
| Hall-effect (Starlink, krypton) | 4.2 kW | 170 mN | 2,500 s | 25 km/s |
| VX-200 VASIMR | 200 kW | 5 N | 4,900 s peak (variable to 30,000 s) | 48 km/s |

**Thrust scaling (for M = 10¹⁸ kg).** One milli-g acceleration needs F = 10¹³ N, requiring 4.24 × 10¹³ NEXT-C units drawing ~4.5 × 10¹⁴ W jet power. One micro-g needs 4.24 × 10¹⁰ thrusters drawing ~4.5 × 10¹¹ W — twice current global electrical capacity. Chemical propulsion is categorically impossible (MN-class thrust per engine but prohibitive mass ratio). The canonical MGLT 10 is consistent with a reactor-limited ion array delivering **micro- to milli-g accelerations**.

**Reaction-mass wall.** At NEXT-C Isp 4,190 s, a 100 km/s Δv burn needs propellant mass ratio m₀/m_f = 11.5, i.e., 1.05 × 10¹⁶ kg of xenon/krypton — annual global xenon production is ~50–70 tonnes, a gap of fourteen orders. At VASIMR theoretical Isp 30,000 s the propellant drops to 4 × 10¹⁴ kg, still massive but conceivable as an in-situ-harvested reaction-mass bunker. **The practical solution is that gross translation is in hyperspace; sublight is for parking, station-keeping, and aim-point fine control.**

**Waste heat (open-cycle).** Even 30% loss on 5 × 10¹⁷ W drive power is 1.5 × 10¹⁷ W. At 1,500 K radiator temperature this requires 5 × 10¹¹ m² of radiator — forty times the station's projected area. The only resolution is **open-cycle evaporative cooling**: the propellant exhaust carries the waste heat. This is standard plasma-drive physics.

## 5.2 Hyperdrive: explicit handwavium

Canon: **123 Isu-Sim SSP06 hyperdrive generators** linked to a single navigational matrix yielding **Class 4.0** (primary) / **Class 24** (backup) — 8× slower than the *Falcon*'s Class 0.5 SSP05. "Class" is a travel-time multiplier, not a velocity. Canon asserts hypermatter-charged particle emissions from the reactor feed the generators.

Speculative-physics framings:

| Framework | Mechanism | Energy floor | Exotic matter | Canon fit |
|---|---|---|---|---|
| Alcubierre (1994) | Warp bubble: contract ahead, expand behind | Original ~10⁶⁴ J; Van Den Broeck (1999) ~3 M☉; White (2011+) ~Voyager-mass | Yes (negative energy) | Poor — no hyperspace manifold |
| Lentz soliton (2021, *Class. Quantum Grav.* 38) | Hyperbolic shift-vector sourced by classical positive-energy plasma | ~0.1 M☉ ≈ 10⁴⁶ J for 200-m, 1-m-shell, c-velocity bubble | No | Best fit for "hypermatter-charged particle emissions" narrative |
| Morris-Thorne wormhole | Stabilized throat | ~−M☉c² of negative energy | Yes | Poor — fixed endpoints |
| Randall-Sundrum brane / Kaluza-Klein | Bulk-dimension shortcut | Unknown; arbitrarily tunable | Unknown | Excellent — matches "hyperspace" as separate manifold |

Scaling the Lentz soliton to a 120-km bubble gives approximately **E ~ 10⁴⁵ J** of active field energy (50 solar masses of rest-energy). The canonical resolution is that hypermatter sources this in a resonant-cavity sense — the reactor generates and reabsorbs the field energy rather than dissipating it. Tracked as HW-7.

**Thermal entry/exit:** Even 0.001% dissipation on 10⁴⁵ J is 10⁴⁰ J — enough to vaporize the station and a small moon. Canon is adamant that hyperspace transitions are clean. This is the hardest handwavium flag in the whole system.

**Array-coherence failure mode:** 123 SSP06 generators must phase-lock to produce a single coherent bubble. Loss of any node risks tidal stresses across the interior — a plausible in-fiction vulnerability beyond the thermal-exhaust-port exploit.

## 5.3 Attitude control and station-keeping

Moment of inertia I = (2/5)MR² = **1.44 × 10²⁴ kg·m²**. A 90° reorient in 1 hour requires L ~ 6.3 × 10²⁰ kg·m²/s, delivered at lever arm 60 km by 10¹⁶ N·s tangential impulse — ~10¹³ NEXT-C-years of firing or (more realistically) large reaction-control-thruster banks at the equatorial ring.

Superlaser-recoil compensation is the single largest impulse event. A pure-photon shot gives Δv ≈ 0.8 m/s on a 10¹⁸ kg station; this is handled by a counter-pulse from opposite-hemisphere ion thrusters over ~1 hour. Particle-beam recoil is 10²–10³× worse, reinforcing the narrative preference for a pure-photon primary beam description even when the physical weapon must be hadronic.

**Orbital positioning via micro-hyperspace-jumps.** Canon permits short-hop in-system translation via hyperdrive. This is physically defensible given that sublight translation of 10¹⁸ kg across gigameters is more costly in reaction mass than exercising an existing FTL capability.

---

## Cross-references

- Recoil structural event: `02-structural-and-materials.md` §2.4 and `04-superlaser.md` §4.6
- HW-7: `10-handwavium-ledger.md`
- Equatorial-trench housing for ion array: `02-structural-and-materials.md` §2.1
