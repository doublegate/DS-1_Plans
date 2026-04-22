# 06 — Life Support and Crew Logistics

**Source:** Ref-doc §5 (verbatim-equivalent)
**Related:** `01-design-basis.md`, `10-handwavium-ledger.md`, `appendix-A-mass-power-thermal-budget.md`

---

## 6.1 Crew manifest

Reconciled from *Star Wars: Absolutely Everything You Need to Know*, *Death Star Technical Companion* (WEG 40008), *Blueprints: The Ultimate Collection*, and *Rogue One: Ultimate Visual Guide*:

| Role | Count |
|---|---|
| Imperial Army/Navy crew | 342,953 |
| Gunners | 57,276 |
| Stormtroopers | 25,984 |
| Ground forces troops | 607,360 |
| TIE and support-ship pilots/crew | 167,216 |
| Starship support staff | 42,782 |
| Skeleton-crew minimum | 56,914 |
| Passengers / contractors / prisoners | ~450,000 |
| **Design crew figure** | **N = 1.7 × 10⁶** |

Plus 400,000 maintenance droids and ~250,000 civilian contractors/catering (Wikipedia *Death Star*). The *Rogue One Ultimate Visual Guide* cites 1,196,294 military personnel + 400,000 maintenance droids + 250,000 non-military as the at-Yavin total of 1,565,231 personnel-equivalent consumers.

## 6.2 Atmosphere and metabolic budgets

Pressurized habitable volume: 1% of total (9 × 10¹² m³) → atmosphere mass at 1 atm ≈ 1.1 × 10¹³ kg. Initial fill equals ~10⁴× Earth's troposphere by volume: a massive one-time logistics event requiring harvesting an ice-moon's worth of nitrogen and oxygen.

| Consumable / product | per person / day | Total at N = 1.7M |
|---|---|---|
| O₂ consumed | 0.84 kg | 1.43 × 10⁶ kg/d (1,428 t/d) |
| CO₂ produced | 1.00 kg | 1.70 × 10⁶ kg/d |
| Potable water | 3.5 kg | 5.95 × 10⁶ kg/d |
| Hygiene water | 5 kg | 8.5 × 10⁶ kg/d |
| Food (dry + water) | 2 kg | 3.4 × 10⁶ kg/d |
| Solid waste | 0.12 kg | 2 × 10⁵ kg/d |
| Metabolic heat | 100 W | 170 MW total |

Scale factors: **425,000×** ISS ECLSS; **12,143×** a Virginia-class SSN over a 90-day deployment; **213,000×** Biosphere 2; **285×** a Nimitz-class CVN's open-loop provisioning.

## 6.3 ECLSS architecture

**Primary (physicochemical) loop** — scale-up of ISS Sabatier + Oxygen Generation Assembly (OGA) + Water Recovery System (WRS). Sabatier fundamentally limits CO₂-loop closure to ~50% without methane pyrolysis (OGA makes 2H₂ per H₂O; Sabatier needs 4H₂ per CO₂). ISS achieves ~90% water recovery; scaling to 1.7M crew requires 500,000× larger throughput and ~1.5 GW of scrubber-loop electrical power — trivial on the hypermatter budget.

**Secondary (bioregenerative) loop** — Biosphere 2 scaling: 8 persons / 1.27 ha, so 1.7M crew linear-extrapolates to **~270,000 ha = 2,700 km² of closed greenhouse**. Feasible only if significant interior volume is allocated to hydroponic/aquaponic decks. The WEG canonical mention of "food replicators in each zone" reads as precision-fermentation / cellular agriculture; Solar Foods Solein-style protein fermentation at 100 g/m²/day supplies 170,000 kg/d protein on 1.7 × 10⁶ m² of fermenter cross-section.

**Water makeup** at 10% loss = 600 t/d — one medium freighter per week. Three-year stored reserves of 6.5 × 10⁸ kg are accommodated as unpressurized ice in hull voids (doubles as radiation shielding).

**Food stores** at 2 kg/day × 1.7M × 3 years = 3.7 × 10⁹ kg — well under canonical hangar cargo capacity.

**Nitrogen makeup** at ~0.25 kg/day per module (scaled ISS leak rate) ≈ 5 × 10⁴ kg/d, via cryogenic N₂ reserves.

## 6.4 Artificial gravity

Canon: "gravity generators" / "gravity plates" — explicit handwavium. Tracked as HW-8.

**Rotational alternative analysis.** For 1 g at r = 60 km: ω = √(g/r) = 0.0128 rad/s; period T = 491 s (8.2 min); equatorial tangential velocity v = 767 m/s. Coriolis on a walking crewmember at 1.5 m/s is 0.038 m/s² (~0.004 g) — well below the human-adaptation threshold (~0.21 rad/s per Stone & Letko 1965). Hoop stress σ = ρω²r² = 144 MPa at ρ = 1000 kg/m³ — marginally feasible with composite hulls. **But:** effective g drops as cos(latitude); only a narrow equatorial band is 1 g, poles are 0 g. And the station is visibly non-rotating on screen.

Real-physics speculation on "gravity plates":

| Mechanism | Status |
|---|---|
| Metric engineering (local Alcubierre-like curvature) | Same exotic-matter problem as hyperdrive |
| Gravitomagnetic field from rotating superconductors (Tajmar 2006) | Disputed / non-replicated |
| Mascon shell of neutronium-density material under decks | 10¹⁸ kg/m² shell — not viable |
| Constant 1-g linear thrust | Mass-ratio kills it |

The plates remain the least-justifiable and most-canonical system on the station.

## 6.5 Waste heat (crew and equipment only)

| Source | Power |
|---|---|
| Crew metabolic (1.7M × 100 W) | 1.7 × 10⁸ W |
| Life-support overhead (3× metabolic) | 5 × 10⁸ W |
| Lighting, electronics, air circulation | 1 × 10⁹ W |
| Droid/equipment (400,000 × ~1 kW avg) | 4 × 10⁸ W |
| **Subtotal non-reactor** | **~2 × 10⁹ W (2 GW)** |

Crew thermal is negligible — fewer than one modern hyperscale data center. Radiator area at 300 K surfaces is 4.8 × 10⁵ m² = 0.48 km². The real heat rejection problem is the reactor (`03-power-generation.md` §3.3), not the crew.

## 6.6 Hangar bays and military complement

Canonical (WEG *Death Star Technical Companion* + *Blueprints* reconciliation):

| Asset | Count |
|---|---|
| TIE/ln, TIE Interceptor, TIE Bomber (combined) | 7,000–7,293 (100 wings) |
| Strike/support cruisers docked | 4 |
| Assault shuttles | 3,600 |
| Dropships | 1,860 |
| AT-AT walkers | 1,400 |
| AT-ST walkers | 1,400 |

Hangar-bay volumetric demand: 7,200 × ~3,200 m³ (TIE service volume with launch racks) = 2.3 × 10⁷ m³, ~0.003% of station volume. AT-AT complement another ~2 × 10⁷ m³. Total hangar demand is well under 1% of internal volume.

## 6.7 Internal logistics

Great-circle arc ~188 km, so traversal at 5 km/h takes 37.7 h — 1,000× a Nimitz carrier. Canonical mitigation: 3D turbolift network, officer-only high-speed monorail shuttle circumnavigating the station, hangar-internal tractor beams. Realistic transit times: turbolift 1.2–2.4 h end-to-end at 50–100 km/h; pressurized-vacuum Hyperloop-class tube transit at Mach 5 crosses in 3–7 minutes.

---

## Cross-references

- HW-8 (artificial gravity): `10-handwavium-ledger.md`
- Atmosphere mass contribution to mass budget: `02-structural-and-materials.md` §2.2
- Crew/equipment waste-heat plug-in to total heat budget: `appendix-A-mass-power-thermal-budget.md`
