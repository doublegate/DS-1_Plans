# Appendix E — Failure Modes and Effects Analysis (FMEA)

**Source:** New synthesis formalizing ref-doc §8 into a standard FMEA register.
**Related:** `09-vulnerability-analysis.md`, `07-defensive-systems.md`, `12-ds2-delta-specification.md`

---

## E.1 Purpose

Formal FMEA register for the DS-1 and DS-2 architectures, derived from the vulnerability analysis in ref-doc §8 and the canonical loss patterns (Battle of Yavin, Battle of Endor). Uses standard FMEA scoring: Severity (S), Occurrence (O), Detection (D), Risk Priority Number (RPN = S × O × D). Scores are 1–10.

**Scoring convention adopted:**
- **Severity.** 10 = total station loss; 7–9 = catastrophic subsystem loss; 4–6 = mission abort; 1–3 = degraded performance.
- **Occurrence.** 10 = near-certain under canonical operating conditions; 7–9 = high likelihood given doctrine; 4–6 = contingent on sabotage or unusual adversary; 1–3 = rare.
- **Detection.** 10 = essentially undetectable before failure; 7–9 = detectable only late; 4–6 = detectable via standard sensor suite; 1–3 = readily detectable.

Scoring is inherently speculative for an in-universe design; these values reflect the ref-doc narrative plus engineering judgment.

## E.2 DS-1 register

| # | Item / function | Failure mode | Effect | S | O | D | RPN | Mitigation (→ design-fix) |
|---|---|---|---|---|---|---|---|---|
| E-01 | Main reactor exhaust port (single 2-m duct) | Proton-torpedo ingress, line-of-sight to reactor core | Runaway reactor, total station loss | 10 | 6 | 8 | 480 | Distributed millimeter microports (DS-2 adopted) — `09` §9.3 row 2 |
| E-02 | Ray-only shield on exhaust port | Particle weapons pass through shield | Permits E-01 exploitation | 10 | 6 | 6 | 360 | Particle shield on every external aperture — `09` §9.3 row 9 |
| E-03 | Reactor compartmentalization | No magnetic-buffer cell between vent and core | Single-duct ingress reaches core directly | 10 | 4 | 8 | 320 | Insert magnetic buffer cells — `09` §9.3 row 4 |
| E-04 | Turbolaser anti-fighter tracking | Turrets too slow to track X-wing-scale targets | Attackers run trench unopposed | 9 | 8 | 4 | 288 | CIWS + phased-array auto-track; < 500 ms kill chain — `09` §9.3 row 1 |
| E-05 | Friendly-fire safety interlock | Turret geometry lockout creates shadow zones in trench | Attackers fly trench through gap | 9 | 10 | 6 | 540 | Geometry-aware sectoring instead of blanket lockout — `09` §9.3 row 1 |
| E-06 | Standing CAP | Only 1 squadron launched of 7,000+ TIEs aboard | Enemy strike force reaches trench unopposed in force | 9 | 9 | 3 | 243 | Doctrinal: maintain multi-squadron CAP at alert; automation to accelerate launch cycle |
| E-07 | Tractor-beam power coupling | 7 reactor-coupling terminals on single 35-km tower (single-source) | Sabotage or single strike releases captured vessel | 4 | 6 | 4 | 96 | Mesh tractor power across N independent busbars — `09` §9.3 row 6 |
| E-08 | Sensor suite anti-small-craft | Large-craft optimized; low fast-frame performance | Starfighter threats detected too late | 8 | 8 | 6 | 384 | Dedicated fast-frame low-RCS tracking radars — `09` §9.3 row 8 |
| E-09 | Command centralization | Overbridge single command node | Decapitation strike disables C2 | 8 | 3 | 4 | 96 | Reduce Overbridge load; already-distributed zone C2 — `09` §9.3 row 7, `08` §8.3 |
| E-10 | Reactor containment stability | Sabotaged containment geometry (Erso) | Torpedo-scale ingress propagates to runaway | 10 | 3 | 10 | 300 | Supplier / construction vetting; in-flight monitoring — doctrinal |
| E-11 | Hull mass integrity | Micrometeoroid / KKV impact | Pressure-wall breach, Whipple-stack consumption | 3 | 9 | 2 | 54 | Whipple shielding as designed — `02` §2.6 |
| E-12 | Superlaser recoil | Uncompensated shot impulse disturbs aim for next shot | Degraded weapon performance | 4 | 8 | 3 | 96 | Counter-pulse ion thrusters — `05` §5.3 |
| E-13 | Reactor waste-heat rejection | Insufficient radiator area for per-shot 10²⁹ J | Hull overheat within cycle | 10 | 10 | 10 | 1000 | HW-4 concession (beam carries entropy) — `10` |
| E-14 | Hyperdrive field coherence | 123-generator phase-lock loss | Tidal stress within interior; mission abort | 9 | 2 | 6 | 108 | Redundant drive nodes; graceful degradation — `05` §5.2 |

## E.3 DS-2 register (delta from DS-1)

| # | Item / function | Failure mode | Effect | S | O | D | RPN | Mitigation |
|---|---|---|---|---|---|---|---|---|
| E-20 | Planetary shield generator (Endor SLD-26) | Single-point ground capture | Shield drops, superstructure exposed | 10 | 9 | 5 | 450 | 3+ redundant generators on independent bodies with voting logic — `09` §9.3 row 3; DR-11 |
| E-21 | Unfinished hull | Direct flight corridor to reactor core during combat ops | Fighter strike reaches reactor | 10 | 7 | 4 | 280 | Do not operate near hostiles until hull closure; interior bulkhead closure — `09` §9.3 row 5 |
| E-22 | Distributed microport array | Individual port failure | Local hotspot; negligible | 2 | 4 | 3 | 24 | Acceptable degradation; DS-2 fix works |
| E-23 | Reactor-tower (power regulator) | Direct-fire vulnerability to capital vessel at point-blank range | Wedge/Lando strike — total station loss | 10 | 3 | 5 | 150 | Harden regulator; internal bulkhead isolation; local CIWS |
| E-24 | Multi-core reactor architecture | Single-core offline | One core loses combat effectiveness; 3-of-3 needed for full shot | 5 | 4 | 3 | 60 | Redundancy already present — `12` §12.5 |

## E.4 Top-RPN items (ranked)

| Rank | RPN | Item | Priority action |
|---|---|---|---|
| 1 | 1000 | E-13 reactor waste-heat rejection | Acknowledged HW-4 concession; no design action |
| 2 | 540 | E-05 friendly-fire interlock creating trench shadow zones | Immediate doctrinal fix; cheap |
| 3 | 480 | E-01 single exhaust port with line-of-sight to core | DS-2 microport architecture |
| 4 | 450 | E-20 Endor single-point shield generator | 3+ redundant off-station generators |
| 5 | 384 | E-08 sensor suite blind to small craft | Dedicated fast-frame tracking radars |
| 6 | 360 | E-02 ray-only shield on critical aperture | Particle shield on all external vents |
| 7 | 320 | E-03 reactor with no magnetic buffer cell | Interpose buffer between vent and core |
| 8 | 300 | E-10 containment stability (sabotage vector) | Construction-phase security + flight monitoring |
| 9 | 288 | E-04 slow turbolaser anti-fighter tracking | CIWS + phased-array |
| 10 | 280 | E-21 unfinished-hull corridor to reactor | Hull closure before hostile ops |

Seven of the top ten items are resolved by the `09-vulnerability-analysis.md` unified fix list. E-13 remains as the single irreducible concession (HW-4).

## E.5 Change-control

FMEA entries are maintained alongside the subsystem document changes. Any new vulnerability identified in the subsystem docs should be added here with its own E-xx ID. Sprint S4.3 (`../to-dos/phase-4-peer-review.md`) includes a cross-check that every row of `09-vulnerability-analysis.md` §9.3 has at least one FMEA entry.
