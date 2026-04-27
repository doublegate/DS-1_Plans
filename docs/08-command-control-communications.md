# 08 — Command, Control, and Communications (C3)

**Source:** Ref-doc §7 (verbatim-equivalent)
**Related:** `01-design-basis.md`, `07-defensive-systems.md`, `09-vulnerability-analysis.md`

---

## 8.1 Overbridge and hierarchy

The DS-1 Overbridge sits in the northern hemisphere directly above the superlaser dish, with four corner turbolifts, flanking operations offices, and the command triumvirate's conference room. DS-2 carries forward the same geometry.

**DS-1 command triumvirate:**
- **Grand Moff Wilhuff Tarkin** — station commander; civilian governor rank outranking military; author of the Tarkin Doctrine.
- **Admiral Conan Antonio Motti** — Chief of Imperial Navy on-station.
- **General Cassio Tagge** — Chief of Imperial Army; responsible for ground, security, and defensive battle-analysis; canonically raised the starfighter-threat concern that was dismissed.
- **Darth Vader** — Emperor's personal representative; on-station nominally subordinate to Tarkin but with enforcement authority.

Support: General Moradmin Bast (adjutant), General Hurst Romodi (operations), Colonel Wullf Yularen (ISB), Chief Siward Cass.

DS-2 command: Moff Tiaan Jerjerrod (Director of Imperial Energy Systems), with the Emperor aboard and Vader operational.

## 8.2 Sensor suite

Canon modalities (WEG Tech Companion): EM emissions, acoustic/pressure/vibration (internal), motion, gravitational and magnetic fields, heat, trace chemicals, sensor-emission back-detection. Hyperwave/subspace for FTL comm.

| Canon system | Real-physics analog |
|---|---|
| Hyperwave / subspace radio | Pure handwavium — no FTL comm in standard model |
| Long-range realspace sensors | Synthetic aperture radar, phased arrays |
| Gravitational-field sensor | LIGO-class laser interferometers (strain sensitivity 10⁻²³ Hz⁻¹/²) |
| Neutrino detection | Super-Kamiokande / IceCube scale, coincidence-tagged reactor signatures |
| Optical long-range | VLBI (EHT demonstrated 20 μas angular resolution) |
| Magnetic/IR signature | Magnetometer arrays + large IR telescopes |

A 100-km-diameter aperture at 1 μm gives diffraction-limited angular resolution ~10⁻¹¹ rad — ~10 m at 10⁶ km range. Passive optical reconnaissance at million-km ranges can literally read surface textures on a frigate. Stealth in this regime is impossible without canonical sensor-baffling / stygium-cloaking handwavium.

## 8.3 Internal C3 timing

Light crosses 120 km in **0.40 ms**, 200 km in 0.67 ms. Centralized fire control from the Overbridge introduces ≥0.4 ms one-way + ≥0.4 ms ack; at turret slew rates of 100°/s against starfighter angular motion >1,000°/s at 100 m range, 1 ms of delay = 1° slew lag = guaranteed miss.

**Architectural answer: distributed zone command.** Each of 24 zones has its own gunnery bridge with local fire control; zone commanders answer the Overbridge on sub-second cadence, individual turret engagement is fully autonomous. Canon explicitly states this ("it was more efficient to have the various zones' active bridge responsible for their own sections during normal events"). **This is the one subsystem that maps essentially perfectly onto best-practice modern real-world engineering**, and is the template a real designer would copy without modification.

![F-8.1 — 24-zone station map. Equirectangular projection of latitudinal operational zones; Overbridge, superlaser, meridian exhaust port, equatorial trench, and zone command bridges marked.](../figures/F-8.1.png)

![F-8.2 — C3 hierarchy and latency budget. Overbridge → 24 zone command bridges → local fire control → individual turret; Yavin gap and DS-2 CIWS fix.](../figures/F-8.2.png)

## 8.4 The Yavin anti-fighter gap

Core C3 failure: mismatch between DS-1 battery design (anti-capital, multi-ton-scale turrets at capital-ship slew rates) and the actual threat (X-wings at starfighter agility). "They're too small, they're evading our turbolasers." Compounded by the friendly-fire safety interlock (`07-defensive-systems.md` §7.7). DS-2 explicitly fixes both: 7,500 laser cannons, improved fire control at the Emperor's tower.

![F-8.3 — Anti-fighter kill-chain timeline. Sequence diagram with <500 ms budget vs Yavin >5 s failure; turret slew 100°/s vs target angular ~1000°/s.](../figures/F-8.3.png)

---

## Cross-references

- Anti-fighter kill-chain derived requirement (DR-12): `01-design-basis.md`
- Friendly-fire lockout and geometry-aware sectoring fix: `07-defensive-systems.md` §7.7
- Formalized vulnerability analysis: `09-vulnerability-analysis.md`
- DS-2 CIWS-analog correction: `12-ds2-delta-specification.md`
