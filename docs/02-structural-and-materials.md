# 02 — Structural and Materials Architecture

**Source:** Ref-doc §1 (verbatim-equivalent)
**Related:** `01-design-basis.md`, `03-power-generation.md` (waste-heat ↔ structure coupling), `appendix-A-mass-power-thermal-budget.md`

---

## 2.1 Geometry of record

Adopted: **120 km diameter**, radius R = 60 km = 6.0 × 10⁴ m.
- Surface area: 4πR² = **4.52 × 10¹⁰ m² (45,200 km²)** — matches Wookieepedia's "over 45,000 km²" baseline.
- Volume: (4/3)πR³ = **9.05 × 10¹⁴ m³**.
- Great-circle arc pole-to-pole: 188 km.
- Alternate canon diameter: 160 km (current Wookieepedia, DK *Incredible Cross-Sections*); Centives used 140 km; scaling to 160 km increases volume by 2.37× and drives mass proportionally. This is a **first-order configuration variable**; it must be frozen at PDR (see `01-design-basis.md` §3).

The **equatorial trench** is canonically a continuous circumferential depression housing sublight ion engines, docking, and (in some Legends sources) the 123 SSP06 hyperdrive field-generator array. Its in-universe origin is a model-building artifact, but the feature is independently justified by three real engineering needs: a stiffening belt to absorb differential thermal expansion (~360 m of ΔL across the sun/shade terminator at ΔT ≈ 250 K), a heat-rejection channel with recessed radiator geometry, and a continuous service-and-assembly corridor. A senior engineer would add this trench if canon had not already specified it.

The **meridian trench** near the north pole houses the 2-m thermal exhaust port that destroyed DS-1 at Yavin. See §2.7 below and `09-vulnerability-analysis.md`.

![F-2.1 — Station cutaway, quarter-section. Quadanium plating, 24 ring frames, central truss, superlaser dish, meridian trench.](../figures/F-2.1.png)

## 2.2 Mass budget

Design-basis dry mass M = **1.0 × 10¹⁸ kg**. Lower bound (modern-warship density scaling at 120 km): ~2 × 10¹⁷ kg. Earth's oceans for perspective: 1.4 × 10²¹ kg; DS-1 is 0.07% of that. Mass is 2 × 10¹² × the ISS, 10¹⁰ × a Nimitz carrier, 1.7 × 10⁸ × the Great Pyramid, and 1,250 × Mount Everest above base.

| Subsystem | Mass fraction | Mass (kg) |
|---|---|---|
| Primary hull and load-bearing superstructure (quadanium/maraging-class) | 35% | 3.5 × 10¹⁷ |
| Armor layer (Whipple + composite + spaced belts) | 25% | 2.5 × 10¹⁷ |
| Internal structure, decks, bulkheads (durasteel) | 20% | 2.0 × 10¹⁷ |
| Reactor and reactor shielding (agrinium-class) | 8% | 8.0 × 10¹⁶ |
| Weapons (superlaser optics, 15,000 turret batteries, kyber arrays, tractor projectors) | 4% | 4.0 × 10¹⁶ |
| Propulsion (123 hyperdrive generators, ion arrays, reaction-mass bunker) | 3% | 3.0 × 10¹⁶ |
| Atmosphere (1 atm in 10% of interior volume) | 0.012% | 1.2 × 10¹⁴ |
| Consumables, fuel, water, crew (3-year endurance) | 2% | 2 × 10¹⁶ |
| Fighter/capital-ship complement | 1% | 1 × 10¹⁶ |
| Margin | ~2% | 2 × 10¹⁶ |

Consolidated in `appendix-A-mass-power-thermal-budget.md`.

## 2.3 Materials: canon to real-analog mapping

**Quadanium steel** (canon hull plating, produced on Despayre) maps to **18Ni-300 maraging steel** (ρ 8.0 g/cm³, σ_y 1,700–2,400 MPa, T_max 773 K) and **Inconel 718** (ρ 8.19, σ_y up to 1,512 MPa, T_max 973 K) in hot zones. **Durasteel** (internal structural) maps to **Ti-6Al-4V** and, aspirationally, **graphene/CNT laminates** whose theoretical 5,000–60,000 MPa strengths would dramatically reduce structural mass — though no such composite has ever been produced at even metric-ton scale. **Agrinium** (canon reactor shield) maps to **borated stainless with tungsten inserts** for gamma/neutron capture. **Transparisteel** viewports map to **aluminum oxynitride (ALON)** or magnesium-aluminate spinel, both real transparent ceramics with compressive strengths above 3,000 MPa.

The **throughput constraint dominates, not strength**. Current world maraging-steel production is ~50,000 t/yr; Inconel-class ~5,000 t/yr. Scaling to 10¹⁵ t of premium alloy at premium-alloy rates takes 10¹¹ years — 10× the age of the universe. This is the single point where canon diverges from real engineering most sharply, and it is where the brief adopts self-replicating asteroid-mining industry as the enabling assumption. See HW-10 in `10-handwavium-ledger.md`.

## 2.4 Structural load paths and self-gravity

A 120-km sphere is the correct geometry: minimum surface-area-to-volume ratio minimizes shielding and radiator mass per unit pressurized volume, and internal-pressure stress σ = pr/(2t) is isotropic with no corner concentrations. The load-path hierarchy is: outer quadanium shell → 24 latitudinal ring frames (matching the canonical 24 operational zones) → radial spokes → central reactor truss along the N-S axis, with the equatorial trench as a stiffening compression/tension torus.

**Self-gravity is real but small.** For M = 10¹⁸ kg, R = 6 × 10⁴ m: surface g = GM/R² = **1.85 × 10⁻² m/s² ≈ 1.9 milli-g**. Central pressure from self-compression P_c = 3GM²/(8πR⁴) ≈ **1.2 MPa**, three orders below quadanium yield. Self-gravity is not the structural driver.

**Thermal gradient is the structural driver.** At 1 AU in direct solar insolation, sub-solar-point equilibrium temperature is 270–390 K depending on finish; deep-shadow limb is 70–120 K. **ΔT ≈ 250 K across the hull**, producing α·L·ΔT ≈ 12×10⁻⁶ × 1.2×10⁵ × 250 ≈ **360 m of differential expansion**. The hull must incorporate expansion joints at kilometer scale — the canonical supplementary trenches halfway to each pole serve this function naturally.

**Superlaser recoil is a structural event.** Photon-pressure recoil at 2.24 × 10³² W is ~10¹⁹ N over the firing interval, comparable to local self-weight at some reference point in the structure. The design must include an axial back-brace running pole-to-pole through the reactor core to absorb firing impulse. See `04-superlaser.md` §4.6 for the momentum-conservation argument that requires either a hypermatter-dense ~10²⁵ kg station core or a reactionless beam.

![F-2.3 — Load-path hierarchy. Hull → 24 ring frames → radial spokes → central N-S axial truss → reactor mount + axial back-brace.](../figures/F-2.3.png)

![F-2.4 — Hull thermal gradient across sun/shade terminator. Hull temperature vs angular position from sub-solar point; ΔT ≈ 320 K drives ~360 m differential expansion.](../figures/F-2.4.png)

## 2.5 In-situ resource utilization

**M-type asteroid feedstock is the correct answer.** 16 Psyche (mean diameter 222 km, mass 2.72 × 10¹⁹ kg, metal fraction 30–60% per revised 2022 NASA/Brown estimates) holds ~10¹⁹ kg of extractable metal — a single station consumes <10% of one body. 216 Kleopatra (mass 2.97 × 10¹⁸ kg post-2021 low-density revision) alone is marginal but adequate with metal-fraction generosity. 21 Lutetia and the broader M-type main-belt inventory hold ~10²¹ kg of metal, enough for 1,000+ stations.

Mercury is 3.3 × 10²³ kg — five orders of magnitude more than needed, and routinely proposed for Dyson-swarm-class projects — but disassembling Mercury is a Kardashev-II-class enterprise. M-type asteroid mining is the plausible path.

**Throughput.** Acquiring 10¹⁸ kg in 20 years requires **1.6 × 10⁹ kg/s sustained** — 10¹⁰× current single-mining-vehicle projections (Planetary Resources, DSI). Processing power at 10 MJ/kg specific energy requires ~1.6 × 10¹⁶ W continuous over two decades, roughly 100,000× current human primary energy consumption. The enabling technology must be self-replicating robotic fleets (~10¹⁰ units) supplied by Mercury-orbit solar-collector arrays of ~10⁹ km². The 19-year canonical build schedule implies this infrastructure is already in place.

Tracked as HW-10.

![F-2.6 — M-type asteroid ISRU throughput. Mining → orbital smelting → in-space fabrication → Despayre assembly jig pipeline.](../figures/F-2.6.png)

## 2.6 Micrometeorite and debris shielding

Interplanetary meteoroid flux in deep space delivers roughly 4.5 × 10⁶ mg-class impacts, 4.5 × 10³ g-class, and 10¹–10² kg-class impacts per year against the DS-1's 45,200 km² presented area. The Whipple-shield stack is:
- Outer quadanium bumper (2–5 cm, sacrificial)
- 0.5–2 m standoff
- Nextel/Kevlar-analog stuffed layer with B₄C tiles at 50 kg/m²
- Inner durasteel pressure wall (10–20 cm)

Areal mass 500–2,000 kg/m², total shield mass 2.3 × 10¹³ to 9 × 10¹³ kg — consistent with the 25% armor fraction in the mass budget.

![F-2.5 — Whipple shield stack cross-section. Quadanium bumper → standoff → Nextel/Kevlar-analog → B₄C tile → durasteel pressure wall, with hypervelocity-projectile deceleration.](../figures/F-2.5.png)

## 2.7 Meridian-trench exhaust-port geometry (structural context)

Thermal-management engineering is detailed in `03-power-generation.md` §2.3 and the vulnerability consequences in `09-vulnerability-analysis.md`. The structural implication is: the meridian trench is an engineered feature, not a model-construction artifact; any design that tries to eliminate it must replace its thermal function with distributed millimeter-scale porting (DS-2 approach — see `12-ds2-delta-specification.md`).

![F-2.2 — Equatorial trench cross-section. Trench wall plating, ion-engine arrays, overhead docking bays, recessed radiator geometry.](../figures/F-2.2.png)

---

## Cross-references

- Mass-budget flow-through: `appendix-A-mass-power-thermal-budget.md`
- ISRU throughput concession: HW-10 in `10-handwavium-ledger.md`
- Thermal-gradient driver couples to reactor thermal rejection in `03-power-generation.md`
- Recoil structural event couples to `04-superlaser.md` §4.6
