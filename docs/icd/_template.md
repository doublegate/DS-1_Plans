# ICD-NN-MM — {Subsystem A name} ↔ {Subsystem B name}

**Parent doc:** `docs/cdr/NN-detailed-{slug}.md` and `docs/cdr/MM-detailed-{slug}.md`
**Specification:** Phase 6 S6.3 template; Phase 9 instances
**CCB approval:** {pending / signature row}
**Revision:** see §I.6 (per-ICD revision history)

---

## I.1 Purpose

One paragraph: what this ICD covers, why this interface exists. Identify both subsystems by their PDR section number and CDR-detail document path.

## I.2 Scope

Bullet list of in-scope and out-of-scope flows. Each in-scope flow gets a row in §I.3 below; each out-of-scope flow is named here so the bidirectional audit (Phase 18 S18.2) can confirm it appears as out-of-scope on the other side too.

## I.3 Applicable documents

| Reference | Title | Section |
|---|---|---|
| `01-design-basis.md` | Design basis | (relevant DRs) |
| `docs/cdr/NN-detailed-{slug}.md` | {Subsystem A detailed design} | (relevant component sections) |
| `docs/cdr/MM-detailed-{slug}.md` | {Subsystem B detailed design} | (relevant component sections) |
| `docs/appendix-F-vnv-plan.md` | V&V plan | (verification rows for this ICD) |
| External (where applicable) | (e.g., MIL-STD-1553 for data buses; NEMA standards for connectors) | — |

## I.4 Interface tables

For each interface class that exists at this boundary, fill the matching subsection. Omit subsections for classes that do not apply (note them in §I.2 out-of-scope).

### I.4.1 Power interface

| Item | Subsystem A side | Subsystem B side | Tolerance |
|---|---|---|---|
| Voltage class | (e.g., 28 V DC nominal; 270 V DC for high-current) | (matching) | ±N% |
| Steady-state current | (max, nominal) | (matching) | |
| Peak current (transient) | (duration, magnitude) | (matching) | |
| Regulation | (linear, switching, ripple budget) | (consumer requirement) | |
| Fault tolerance | (k-of-N, failover time) | (must-tolerate window) | |
| Connector | (type, pin count) | (matching) | |
| Cable / busbar specification | (cross-section, insulation, derating) | — | |

### I.4.2 Data interface

| Item | Subsystem A side | Subsystem B side | Tolerance |
|---|---|---|---|
| Protocol | (e.g., MIL-STD-1553B / SpaceWire / TTEthernet / Imperial-equivalent) | (matching) | |
| Bandwidth | (nominal, peak) | (consumer) | |
| Latency budget | (one-way, round-trip) | (consumer) | |
| Message format | (cite ICD §I.5 for detailed packet definitions) | — | |
| Synchronization | (master/slave, clock domain, time source) | (matching) | |
| Fault detection | (CRC, parity, heartbeats) | (matching) | |

### I.4.3 Mechanical interface

| Item | Subsystem A side | Subsystem B side | Tolerance |
|---|---|---|---|
| Mounting interface | (bolt pattern, fastener spec, torque) | (matching) | per GD&T crib in `appendix-H` |
| Alignment | (precision, datum) | (matching) | |
| Mass envelope | (max kg, CG envelope) | (consumer accommodation) | |
| Volume envelope | (bounding box) | (consumer accommodation) | |
| Vibration | (qualification level) | (consumer must tolerate) | |
| Shock | (qualification level) | (consumer must tolerate) | |

### I.4.4 Thermal interface

| Item | Subsystem A side | Subsystem B side | Tolerance |
|---|---|---|---|
| Heat flux | (W/m² · direction) | (consumer must accept / reject) | |
| Conductive interface | (contact area, thermal conductance) | (matching) | |
| Radiative coupling | (emissivity, view factor) | (matching) | |
| Operating temp range | (min/max) | (consumer must tolerate) | |
| Thermal cycling | (cycles · ΔT · ramp rate) | (qualification target) | |

### I.4.5 Fluid interface

| Item | Subsystem A side | Subsystem B side | Tolerance |
|---|---|---|---|
| Working fluid | (medium, purity) | (matching) | |
| Pressure | (nominal, max, MEOP) | (matching) | |
| Flow rate | (nominal, peak) | (consumer) | |
| Connection | (fitting type, sealing) | (matching) | |
| Materials compatibility | (wetted materials) | (matching) | |

### I.4.6 EMI / EMC interface

| Item | Specification |
|---|---|
| Conducted emissions | (MIL-STD-461 or analog, applicable category) |
| Radiated emissions | (matching) |
| Conducted susceptibility | (consumer side immunity) |
| Radiated susceptibility | (matching) |
| Grounding scheme | (single-point / multi-point / hybrid) |
| Shielding | (cable, enclosure) |

### I.4.7 Radiation interface

| Item | Specification |
|---|---|
| Total ionizing dose (TID) | (lifetime spec) |
| Single-event-effect (SEE) tolerance | (LET threshold) |
| Neutron fluence | (lifetime spec) |
| Operational vs survival mode | (consumer-side hardening) |

## I.5 Detailed packet / signal definitions

Where the data interface (§I.4.2) requires bit-level detail (e.g., word formats, message catalog, error codes), provide it here as a numbered packet table. Cross-reference back to §I.4.2 by message ID.

## I.6 Verification matrix

For each interface row in §I.4, identify the verification approach. Cite the V&V plan (`appendix-F`) for the verification class (A / I / T / C).

| Interface row | Verification class | Method | Pass criterion | Status |
|---|---|---|---|---|
| §I.4.1 Voltage class | A | Power-flow analysis (see `docs/cdr/analysis/electrical.md`) | within ±N% over operating envelope | TBD |
| §I.4.2 Latency | A | C3 latency budget analysis (`docs/cdr/analysis/control.md`) | < N ms round-trip | TBD |
| (etc.) | | | | |

## I.7 Open items

Bulleted list of unresolved items at this boundary. Each open item gets a CR number from `appendix-G` change-request log when it lands as a CCB action.

## I.8 Revision history

| Rev | Date | Change | Author |
|---|---|---|---|
| 0 | YYYY-MM-DD | Initial authorship. | (author) |

---

## Notes for ICD authors (delete before promoting to instance)

- **Bidirectional consistency is the central discipline.** Every signal/flow you list here must appear on **both** subsystem CDR-detail docs (with `→ ICD-NN-MM` cross-reference). Mismatches are CDR audit findings.
- **Omit subsections (§I.4.X) that don't apply.** Note the omission in §I.2 out-of-scope.
- **Always reference the parent CDR-detail docs** in §I.1 and §I.3 — never inline content that belongs in the subsystem doc.
- **Numbers come from `01-design-basis.md` + `appendix-A` MPT.** Don't introduce new numerical claims here; ICDs allocate budgets, they don't set them.
- **Fill §I.6 verification matrix even if everything is TBD** — it's the placeholder that Phase 18 audit will fill in.
- **External ICDs** (DS-1 ↔ Imperial Fleet docking; DS-1 ↔ Sienar Fleet Systems) use `ICD-EXT-{name}.md` and may add subsections for procurement / contract terms.
