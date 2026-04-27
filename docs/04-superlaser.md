# 04 — The Superlaser

**Source:** Ref-doc §3 (verbatim-equivalent)
**Related:** `01-design-basis.md`, `03-power-generation.md`, `05-propulsion.md` (recoil coupling), `10-handwavium-ledger.md`

---

## 4.1 Canonical architecture

Per Wookieepedia's Mk I Superlaser and Legends *Death Star Technical Companion*: the SFS-CR27200 hypermatter reactor drives 64 tributary shafts feeding **eight giant kyber crystal amplifier stages** (14 gunners each, 132 total), which generate eight coherent beams that converge on a central compound-kyber focusing lens. Four induction hyperphase generators initiate firing; spherical targeting-field generators shape the convergent beam. Dish diameter ~36 km (Saxton scaling), effective emitting aperture ~10 km.

![F-4.1 — Superlaser amplifier chain. 64 tributary shafts → 8 kyber amplifier stages → compound-kyber focusing lens → 10 km aperture.](../figures/F-4.1.png)

*See Figure F-3.3 (in `03-power-generation.md` §3.2) for the upstream reactor-to-amplifier conversion chain.*

## 4.2 Diffraction limit versus aperture ablation

Targeting is not the problem. For D = 10 km, λ = 500 nm (canonical green): Airy half-angle θ = 1.22λ/D ≈ **6.1 × 10⁻¹¹ rad**. At 1 AU the spot is ~9 m across; at 1 light-second, ~1.8 cm. A 10-km coherent aperture can hit a pencil at planetary distances.

**Delivering the power through the aperture is the problem.** Intensity at the 10-km aperture: I = P/A ≈ **2.85 × 10²⁰ W/cm²**. Laser-induced damage thresholds of the best transparent optical materials (fused silica, KDP, sapphire) are 10⁹–10¹¹ W/cm² at nanosecond pulses; NIF's final-optics engineering limit is ~3 × 10¹⁰ W/cm² at 351 nm. **The superlaser exceeds material damage thresholds by ten orders of magnitude.** Any refractive focusing optic, crystal, or dielectric coating is destroyed in less than a photon transit time.

The focusing element therefore **cannot be refractive**. It must be one of:
- A phased-array emitter generating the coherent wavefront directly at the aperture (a ~10-km-baseline optical analog of a radar phased array)
- A plasma-mirror or magnetically-confined virtual active optic (NIF-ARC roadmap contemplates relativistic electron mirrors for exawatt-class focusing)
- A non-EM weapon altogether (see §4.5 below)

![F-4.2 — Beam intensity at aperture vs material LIDT. Aperture intensity 2.85 × 10²⁰ W/cm² exceeds best refractive-optic LIDT by ~10¹⁰ orders.](../figures/F-4.2.png)

## 4.3 Kyber crystal → real optical analog

The eight tributary kyber crystals map cleanly onto **Nd:glass-analog laser gain media** (NIF uses 3,100 Nd-doped glass slabs), pumped by hypermatter-annihilation gamma/particle flux rather than xenon flashlamps. The "induction hyperphase generators" map onto **master-oscillator phase-lock hardware for coherent beam combining (CBC)**; Fraunhofer ILT and MIT Lincoln Labs have demonstrated CBC at kilowatt scale with 100-kW roadmap targets. "Compound kyber" plays the role of large **KDP/LBO nonlinear crystals** used at NIF for 1ω→3ω frequency tripling. The Force-attunement is unsalvageable as physics and should be treated as authorial flavor.

## 4.4 Real beam-combining benchmarks

NIF delivers 2.2 MJ in 192 beams (incoherent/power combining) in 10–30 ns, peak 500 TW. Ratio to Alderaan shot: **10²⁶ NIFs stacked**. Each NIF is the size of three football fields; the stack has mass ~10³⁴ kg, five Jupiters. Coherent beam combining (near-diffraction-limit) has demonstrated kilowatt class and targets NIF-ARC exawatt (10¹⁸ W) pulses — still **14 orders below** the Alderaan-shot peak power.

![F-4.3 — Phased-array focusing geometry. Refractive-optic ablation vs distributed phased-array active optic; both yield ~9 m Airy spot at 1 AU.](../figures/F-4.3.png)

## 4.5 Why a pure EM laser cannot destroy a planet

Even ignoring optics, a 500 nm EM beam deposits energy in the top millimeters of a silicate/iron planet (optical skin depth ≪ 1 mm for rock). The result is: vaporize the sunlit hemisphere, launch an ablation jet at P_abl ~ I/c ≈ 3 × 10¹¹ Pa (megabar pressures), couple a few percent of beam energy to bulk motion, and leave the core gravitationally intact. You boil the oceans and scorch the lit crust; you do not explode the planet.

**The canon weapon is not an EM laser.** Multiple Legends sources (*AOTC Incredible Cross-Sections*; *Death Star Technical Companion*, 1991) describe the superlaser output as a **"hypermatter particle beam."** It is green because of Cherenkov-analog radiation from relativistic charged-particle flux in vacuum. The destructive agent is mass, not photons. Tracked as HW-5.

Hard-SF reconstructions converge on one of:
- **Relativistic hadronic matter jet** (γ ~ 2–5). Coupling to a planetary core is efficient because a dense jet burrows hydrodynamically. A 2.5 × 10¹⁵ kg jet at γ = 2 carries ~10³² J kinetic and reaches the core.
- **Gravitic disruptor / graviton beam**, coupling directly to rest mass. Requires GR handwavium from the Alcubierre family.
- **Hypermatter projectile beam** (canon), combining the mass-penetration advantage with annihilation-on-impact to deposit energy uniformly through the target volume.

![F-4.4 — Planet-kill coupling models. Optical ablation (insufficient) vs relativistic hadronic jet (candidate) vs canon hypermatter projectile beam (reference, HW-5).](../figures/F-4.4.png)

## 4.6 Recoil and firing rate

Pure-EM momentum of 2.24 × 10³² J is p = U/c = 7.5 × 10²³ kg·m/s. Against a 120-km hollow sphere at ~10¹⁸ kg this is Δv = 750 km/s per shot — not observed. The three possible resolutions:
- (a) Station mass is hypermatter-dense at the core, ≥10²⁵ kg total;
- (b) The beam is reactionless (Alcubierre-family exotic-matter physics);
- (c) The ANH novelization reading — "another abstract problem in mass-energy conversion" — where the Death Star supplies only a triggering energy and Alderaan's rest mass supplies the rest, converting ~10⁻¹⁰ of its rest-mass by unspecified mechanism.

Tracked as HW-6.

DS-1 firing rate is canonically **24 hours full-power recharge** (implying sustained reactor average 2.6 × 10²⁷ W = 6,800 L☉). *Rogue One* single-reactor-ignition mode at Scarif/Jedha runs at ~1/8 power, enough to crater a continent. DS-2 drops recharge to ~3–5 minutes with capital-ship targeting — see `12-ds2-delta-specification.md` §A.3.

![F-4.5 — Recoil and back-brace force path. Beam exit impulse → kyber amplifier mount → axial pole-to-pole back-brace; resolution via HW-6 (hypermatter mass) or reactionless beam.](../figures/F-4.5.png)

---

## Cross-references

- Axial structural back-brace: `02-structural-and-materials.md` §2.4
- Reactor coupling and conversion-chain efficiency: `03-power-generation.md`
- Recoil attitude-control response: `05-propulsion.md` §4.3
- HW-5 (particle-beam not EM), HW-6 (recoil): `10-handwavium-ledger.md`
- DS-2 superlaser upgrades (tributary arch, 3-min recharge): `12-ds2-delta-specification.md`
