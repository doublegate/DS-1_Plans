# 10 — Consolidated Handwavium Ledger

**Source:** Ref-doc §9 (verbatim-equivalent)
**Related:** every subsystem document traces at least one claim into this register.

---

## 10.1 Purpose

This document is the single register of physics concessions on which this specification depends. Every load-bearing engineering claim in a subsystem document should either stand on real physics or cite an HW-ID from this table. No new concession may be introduced in another document without adding a row here.

## 10.2 The register

| # | Physics wall | Canonical escape hatch | Primary affected subsystem |
|---|---|---|---|
| **HW-1** | 5 × 10⁵ solar luminosities in a 1-second pulse through solid matter | Hypermatter channels plus deflector shielding | `03-power-generation.md`, `04-superlaser.md` |
| **HW-2** | Antimatter is unproducible at scale | "Hypermatter" is tachyonic, formed in hyperspace | `03-power-generation.md` |
| **HW-3** | No known energy storage holds 10³² J in <10²⁵ kg | Hypermatter as combined fuel + capacitor | `03-power-generation.md` |
| **HW-4** | Waste heat > 10²⁹ J per shot cannot radiate | Beam itself carries entropy; exhaust-port / hyperspace venting | `03-power-generation.md`, `07-defensive-systems.md` §7.7 |
| **HW-5** | EM laser cannot volume-couple to planet core | "Superlaser" is a hypermatter particle beam, not EM | `04-superlaser.md` |
| **HW-6** | Momentum recoil of 10²³ kg·m/s | Station ~10²⁵⁺ kg hypermatter core, or beam reactionless (Alcubierre-class) | `04-superlaser.md`, `05-propulsion.md` |
| **HW-7** | Hyperdrive at 10⁴⁵ J field energy for 120-km bubble | Hypermatter reactor / Lentz-class plasma soliton | `05-propulsion.md` |
| **HW-8** | No mechanism for plate-scale metric manipulation | "Gravity generators" (unspecified) | `06-life-support.md` §6.4 |
| **HW-9** | No mechanism for pulling tractor beam on uncharged hull | "Gravitic manipulation" (unspecified) | `07-defensive-systems.md` §7.4 |
| **HW-10** | 10¹⁸ kg in 19 years requires ~10¹⁶ W industrial power | Kardashev-II ISRU + self-replicating robotics (partial physics) | `02-structural-and-materials.md` §2.5 |

## 10.3 Net effect

Reduce handwavium further and the station ceases to be coherent; accept the ten concessions above and every remaining engineering extrapolation is finite — 10–15 orders of magnitude, which is merely unprecedented rather than impossible.

## 10.4 Use in review

For the peer-review phase (`../to-dos/phase-4-peer-review.md`, sprint S4.3), every section document is checked for handwavium traceability:
- Each physics-violating claim must cite HW-ID
- No HW-ID in the ledger may be unreferenced (dead concession removal)
- No claim may be hidden behind new, undocumented handwavium

## 10.5 Relationship to V&V plan

The V&V plan (`appendix-F-vnv-plan.md`) classifies each derived requirement by verification class. "Concession" is a formal verification class — it means the requirement cannot be verified by analysis, demonstration, inspection, or test, and is satisfied only by the HW-ID cited. This is an honest-accounting pattern, not a cheat: it keeps the concession register small and visible.

---

## Cross-references

- Every subsystem document in this tree
- V&V plan verification classes: `appendix-F-vnv-plan.md`
- Minimum-handwave reconstruction (reducing HW count): `11-minimum-handwave-reconstruction.md`
