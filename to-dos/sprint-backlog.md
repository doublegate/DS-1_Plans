# Sprint Backlog

Flat list of every granular task across all phases. Status markers: `[ ]` pending, `[~]` in progress, `[x]` complete. Phase/sprint IDs in brackets. Tasks carried forward from a completed phase stay in their phase file; this backlog is a single scan-surface.

---

## Currently open (next actions)

- [ ] [S2.4] Add DR-13..DR-16 for HW-4, HW-6, HW-8, HW-9
- [ ] [S2.4] Update `appendix-F` §F.3 + §F.4 with new DRs
- [ ] [S2.5] Build complete DS-2 MPT rebudget (separate appendix or embed in `appendix-A` §A.7)
- [x] [S3.0] Commit figure-production path to decision log    (D-7 / D-12 / D-13)
- [x] [S3.x] Run Nano Banana 2 prompts for the 13 illustrative figures    (M-11 closed 2026-04-26)
- [x] [S3.6] Embed figures inline in subsystem markdown + Typst build verification    (D-14 closed 2026-04-26)
- [~] [S3.5] Elevation pass: 17 programmatic FINAL; 13 illustrative still need re-render for label artifacts (F-2.1 unit error, F-A.1/F-7.4 hex-code leak)
- [ ] [S4.0] Commit geometry-freeze decision (120 vs 160 km for DS-1)

## Phase 2 — engineering artifacts (outstanding)

- [ ] [S2.4] HW-IDs → DR coverage gap closure
- [ ] [S2.5] DS-2 MPT full rebudget

## Phase 3 — figures and diagrams

### S3.0 — decision
- [ ] Production path recommendation memo

### S3.1 — structural
- [x] F-2.1 Station cutaway, quarter-section            (Nano Banana 2 — DRAFT)
- [x] F-2.2 Equatorial trench cross-section             (Nano Banana 2 — DRAFT)
- [x] F-2.3 Load-path hierarchy block diagram           (Mermaid — DRAFT)
- [x] F-2.4 Thermal gradient plot                       (matplotlib — DRAFT)
- [x] F-2.5 Whipple shield stack cross-section          (Nano Banana 2 — DRAFT)
- [x] F-2.6 M-type asteroid ISRU flowchart              (Mermaid — DRAFT)

### S3.2 — reactor + weapon
- [x] F-3.1 Specific-energy vs fuel-mass log-log        (matplotlib — DRAFT)
- [x] F-3.2 Stefan-Boltzmann radiated power plot        (matplotlib — DRAFT)
- [x] F-3.3 Reactor → beam block diagram                (Mermaid — DRAFT)
- [x] F-4.1 Superlaser amplifier-chain schematic        (Nano Banana 2 — DRAFT)
- [x] F-4.2 Aperture intensity vs damage threshold plot (matplotlib — DRAFT)
- [x] F-4.3 Phased-array focusing geometry              (Nano Banana 2 — DRAFT)
- [x] F-4.4 Planet-kill coupling-model panels           (Nano Banana 2 — DRAFT)
- [x] F-4.5 Recoil / back-brace force path diagram      (Nano Banana 2 — DRAFT)

### S3.3 — propulsion + ECLSS + C3
- [x] F-5.1 Sublight ion-array layout                   (Nano Banana 2 — DRAFT)
- [x] F-5.2 Hyperdrive 123-generator phase-lock topology (Mermaid — DRAFT)
- [x] F-5.3 Lentz-soliton scaling plot                  (matplotlib — DRAFT)
- [x] F-6.1 ECLSS flow diagram                          (Mermaid — DRAFT)
- [x] F-6.2 Internal transit mode comparison            (matplotlib — DRAFT)
- [x] F-6.3 Hangar volumetric allocation                (matplotlib — DRAFT)
- [x] F-8.1 Zone map (24 zones)                         (Nano Banana 2 — DRAFT)
- [x] F-8.2 C3 hierarchy + latency diagram              (Mermaid — DRAFT)
- [x] F-8.3 Anti-fighter kill chain timeline            (Mermaid — DRAFT)

### S3.4 — defensive, vulnerability, DS-2
- [x] F-7.1 Ray vs particle shield diagram              (Nano Banana 2 — DRAFT)
- [x] F-7.2 Tractor-beam busbar architecture            (Mermaid — DRAFT)
- [x] F-7.3 MARAUDER plasma-toroid acceleration stages  (Nano Banana 2 — DRAFT)
- [x] F-7.4 Thermal-exhaust-port geometry comparison    (Nano Banana 2 — DRAFT)
- [x] F-9.1 Yavin exploit fault tree                    (Graphviz — DRAFT)
- [x] F-9.2 Endor exploit fault tree                    (Graphviz — DRAFT)
- [x] F-A.1 DS-1 vs DS-2 configuration plate            (Nano Banana 2 — DRAFT)

### S3.5 — elevation pass
- [x] Consistency pass (typography, units, legends) — programmatic figures verified palette-compliant
- [x] Accessibility pass (colorblind safety, contrast) — D2.7 palette amber/cream/cyan/red/green is Okabe-Ito-adjacent; contrast ≥ 4.5:1 vs `#0a0e1a` background
- [~] Update `appendix-D` §D.3 status column — 17 / 30 flipped FINAL; 13 illustrative remain DRAFT
- [ ] Re-run Nano Banana 2 for label-artifact figures (F-2.1 inset, F-A.1, F-7.4)
- [ ] Milestone M-05 check-off (after illustrative iteration)

## Phase 4 — peer review

### S4.0 — geometry freeze
- [x] Decide 120 vs 160 km; commit to decision log    (D-6 closed 2026-04-22)

### S4.1 — numerical cross-check    (closed 2026-04-26)
- [x] Canonical format for scientific notation       (Unicode superscript dominates; no caret usage)
- [x] Numerical grep across docs/*.md                (0 discrepancies across 13 subsystem docs + 8 appendices)
- [x] Mass-budget closure check                      (DS-1: exact 1.0 × 10¹⁸ kg; DS-2: 2.38 × 10¹⁸ kg @ +0.5%)
- [x] Power-budget closure check                     (defensive sum 9 orders below sustained reactor)
- [x] Thermal-budget closure check                   (HW-4 beam-as-entropy-exporter properly cited)
- [x] Volume-budget closure check                    (1% habitable, < 1% hangar; documented)

### S4.2 — citation audit    (closed 2026-04-26)
- [x] Forward check: every citation in main text has entry in appendix-C    (0 broken)
- [x] Reverse check: every appendix-C entry is cited somewhere               (1 dead — Bobrick & Martire — remediated)
- [x] Value verification for specifically-cited numbers                      (7 spot-checks, all PASS)

### S4.3 — handwavium traceability    (closed 2026-04-26 via re-verification of Phase 2 closure)
- [x] Every subsystem claim-that-exceeds-physics cites an HW-ID
- [x] Every HW-ID has at least one citing DR
- [x] `appendix-F` §F.4 bidirectional table complete
- [x] R-4 risk closure in PROJECT-STATUS    (already closed 2026-04-22 via S2.4)

### S4.4 — V&V consistency    (closed 2026-04-26)
- [x] Every DR-xx has class in `appendix-F` §F.3                  (16/16 with class assigned)
- [x] Evidence pointers in `appendix-F` §F.5 valid                (3 broken §3.6 → §4.6 cross-refs remediated)
- [x] `appendix-E` FMEA action column references `09` §9.3        (E-01..E-24 all reference fix list)

### S4.5 — reader pass    (closed 2026-04-26)
- [x] Senior-engineer slow-read                                                 (synthesized via Explore agent)
- [x] Issue list triaged to backlog                                             (must-fix remediated; nice-to-haves deferred to Phase 5 S5.2)
- [x] Reviewer sign-off — verdict: **PDR-ready contingent on cross-ref fixes**, all of which were applied in this sprint

## Phase 5 — publication    (closed 2026-04-26 — M-08)

### S5.1 — typesetting path    (closed)
- [x] Pandoc-LaTeX / Typst / custom-LaTeX decision    (D-8: Typst, 2026-04-22)
- [x] Build environment prepared                      (typeset/build.sh patched + JetBrains Mono / Chakra Petch installed)

### S5.2 — front matter    (closed)
- [x] Cover page                                      (existing; refined with v0.2 metadata)
- [x] Approval block                                  (8-row reviewer table; pending external sign-offs)
- [x] Revision history table                          (4 rows: 0.1 / 0.2-rc1 / 0.2-rc2 / 0.2)
- [x] TOC + list-of-figures + list-of-tables          (TOC depth 2; LoF auto-populated 30 entries; LoT auto-populated)
- [x] Acronym short-list                              (24 entries; full glossary in Appendix B)
- [x] Distribution / classification note              (CC-BY-NC-4.0 + GitHub URL + reproducibility pointers + errata channel)

### S5.3 — PDF build v1    (closed)
- [x] Build script (`typeset/build.sh` patched 2026-04-26 for pandoc 3.9 / typst 0.14 compatibility)
- [x] First render (M-07 closed 2026-04-26: 111-page / 69 MB PDF at `dist/DS-1-PDR-v0.2.pdf`)
- [x] Mermaid / plots render correctly (verified by extracting page samples post-build)
- [x] Template iteration                              (compressed 119 → 74 pages — close to 60-page target given 30 figures + 21 sections; body 9pt, margins 2cm, level-1 pagebreak removed, figure cap 65%)
- [x] Cross-references resolve in PDF                 (Typst auto-numbers Figure 1..30; "See Figure F-X" prose cross-refs render correctly)
- [x] Install JetBrains Mono + Chakra Petch           (brew --cask font-jetbrains-mono + font-chakra-petch; build now uses intended typography)

### S5.4 — release    (closed)
- [x] Proof-read                                      (Explore-agent pass; PASS clean — no must-fix or nice-to-have findings)
- [x] Figure spot-check                               (4 figures sampled: F-3.1, F-7.4, F-9.1, F-A.1 — all render with captions)
- [x] Equation spot-check                             (substituted-value form renders; Unicode superscripts and Greek letters all legible)
- [x] SHA-256 of final PDF                            (`bafa1425a0b153aa8fdc61d3e00cef1c3b82e622eaacaec0485cbfa1b716f7a5`)
- [x] Archive source + manifest                       (CHANGELOG `[0.2]` entry includes SHA-256 + git commit + reproducibility command)
- [x] Tag release                                     (annotated git tag `v0.2`)
- [x] Milestones M-07, M-08 check-off                 (M-07 closed 2026-04-26 earlier; M-08 closed with this sprint)

### S5.5 — distribution    (in place; ongoing)
- [x] Public mirror                                   (https://github.com/doublegate/DS-1_Plans, M-12 closed 2026-04-22)
- [x] Errata tracking                                 (.github/ISSUE_TEMPLATE/ — Peer Review / Bug Report / Question)
- [x] GitHub Release asset upload                     (closed 2026-04-26 via `gh release create v0.2 dist/DS-1-PDR-v0.2.pdf`; release at https://github.com/doublegate/DS-1_Plans/releases/tag/v0.2)

---

# CDR Backlog (Phases 6–19, v0.2 → v1.0)

## Currently open (next actions)

- [~] [S6.1] Author `to-dos/cdr-conventions.md`                (in progress)
- [~] [S6.2] Author `docs/appendix-G-configuration-management.md`
- [~] [S6.3] Create `docs/icd/_template.md`
- [~] [S6.4] Extend `typeset/template.typ` for CDR
- [~] [S7.1] [S7.2] Author `docs/appendix-H-drafting-standards.md`
- [~] [S7.3a] Author corrected Nano Banana 2 prompts for re-render of F-2.1 / F-A.1 / F-7.4
- [ ] [S6.5] Trim `02..09.md` to summary+index pattern  (deferred to Phase 8 closure — would orphan content otherwise)
- [ ] [S7.3b] User runs corrected Nano Banana 2 prompts; flip 13 §D.3 status rows DRAFT→FINAL  (user-driven)

## Phase 6 — CDR Foundation

### S6.1 — CDR conventions
- [ ] Drawing standards (title-block, revision triangle, GD&T narration register)
- [ ] ICD template policy (one ICD per real subsystem-pair boundary; bidirectional consistency)
- [ ] FEA-narration style (analyses are narrated, not actually run; cite published validation cases)
- [ ] Requirement-numbering extensions: DR-17.. continuation; new RR-NN reliability; new MR-NN manufacturing; new OR-NN operational
- [ ] DS-2 namespace: DR2-NN to prevent collision
- [ ] Configuration Control Board (CCB) workflow + roles
- [ ] Tone rubric for regulatory humor (Phase 14 calibration)
- [ ] Handwavium ledger growth rules (HW-11..HW-15 reserved)

### S6.2 — Appendix-G configuration management
- [ ] Baseline control: PDR baseline = v0.2 frozen; CDR baselines per tag
- [ ] Change-request workflow (CR-NNNN issue → CCB triage → resolution)
- [ ] Version-tag schema for v0.3..v1.0
- [ ] CCB roles (Chair, Chief Engineer, Safety, Software Lead, Regulatory)
- [ ] HW-ledger growth gating

### S6.3 — ICD template
- [ ] Skeleton: front-matter (purpose, scope, applicable docs, change history)
- [ ] Interface tables: power · data · mechanical · thermal · fluid · EMI/EMC · radiation
- [ ] Bidirectional verification table

### S6.4 — Typst template extension
- [ ] New part-headings ("Detailed Design", "Interface Control Documents", "Programmatic")
- [ ] CDR cover variant (extended approval block placeholders)
- [ ] Table-of-ICDs section after LoT
- [ ] Optional 2-column body for tabular-heavy sections (FMEA, ICDs, R/A/M)
- [ ] Color-tag for new content vs PDR baseline

### S6.5 — Trim PDR section docs    (deferred to Phase 8 closure)
- [ ] Trim `docs/02..09-*.md` to summary + forward-pointers; relocate detail to `docs/cdr/`

## Phase 7 — Drawing & Schematic Standards

### S7.1+S7.2 — Appendix-H standards
- [ ] Title-block exemplar (Imperial-style)
- [ ] Revision-triangle convention
- [ ] ASME Y14.5-style GD&T crib (narrated)
- [ ] Electrical schematic notation (IEC 60617)
- [ ] Plumbing/fluid notation (ISO 14617)
- [ ] Thermal block-diagram conventions

### S7.3 — S3.5 illustrative re-renders (PDR carry-forward)
- [x] Author corrected prompts for F-2.1 (cm/m), F-A.1 / F-7.4 (hex leakage)
- [ ] User runs Nano Banana 2 prompts (user task)
- [ ] Drop renders to `docs/figures/`, replace existing PNGs
- [ ] Flip 13 `appendix-D` §D.3 illustrative status rows DRAFT → FINAL
- [ ] Close M-05

## Phase 8 — Detailed Subsystem Design (largest)

### S8.1 — `docs/cdr/02-detailed-structural.md`
- [ ] Truss families catalog (primary / secondary / tertiary; cross-section profiles)
- [ ] Joint catalog (welded · bolted · pinned; allowables tables)
- [ ] Material allowables (Quadanium analog 18Ni-300 maraging; Inconel 718; Ti-6Al-4V)
- [ ] Modal analysis narrative (~6 modes; frequency/damping/mode-shape narrative)
- [ ] Fatigue analysis (Goodman/Miner; thermal-cycle spectrum; superlaser-firing impulse spectrum)
- [ ] Buckling (Euler column / Johnson-Schwartz plate / shell)
- [ ] Micrometeoroid/orbital-debris (NASA MEM-class flux model; updated Whipple stack)
- [ ] Component-level mass roll-up reconciles to PDR §2.2 budget

### S8.2 — `docs/cdr/03-detailed-power.md`
- [ ] Reactor core component breakdown (confinement coil family; hypermatter injector; neutronium-liner narrative)
- [ ] Primary heat-rejection loops (per-loop sizing)
- [ ] Power conditioning (regulators, fault current limiters, breakers)
- [ ] Redundancy tree (k-of-N analysis)
- [ ] Component-level power roll-up reconciles to PDR §3 + appendix-A

### S8.3 — `docs/cdr/04-detailed-superlaser.md`
- [ ] 8 tributary chambers component-level
- [ ] Beam-combiner mechanical + optical
- [ ] Focusing-array actuator catalog
- [ ] Recoil management (axial back-brace detail)
- [ ] Alignment metrology (interferometric / fiducial / closed-loop)

### S8.4 — `docs/cdr/05-detailed-propulsion.md`
- [ ] Sublight ion-array per-thruster spec
- [ ] Gimbal + control authority
- [ ] Hyperdrive 123-generator phase-lock electronics
- [ ] Navicomputer interface
- [ ] Hyperdrive coherence failure-mode analysis

### S8.5 — `docs/cdr/06-detailed-eclss.md`
- [ ] Atmosphere management per zone (24 zones × atmosphere processors)
- [ ] Water/waste loops (Sabatier + WRS scaling)
- [ ] Food chain (Solein-style fermentation + bioregenerative)
- [ ] Radiation shelter strategy (storm/transit/combat)

### S8.6 — `docs/cdr/07-detailed-defensive.md`
- [ ] Ray/particle shield generator family
- [ ] Turbolaser battery breakdown (15,000 batteries × architecture)
- [ ] Tractor-projector array (768 emitters × architecture; busbar mesh detail)
- [ ] MARAUDER plasma-toroid component-level

### S8.7 — `docs/cdr/08-detailed-c3.md`
- [ ] Hierarchical comm net (Overbridge → 24 zones → turret)
- [ ] HoloNet coupling
- [ ] Sensor suite (per-modality + per-band)
- [ ] Command bunker layout
- [ ] EMP hardening

### S8.8 — `docs/cdr/09-detailed-vulnerability.md`
- [ ] Yavin fault-tree CDR-class extension
- [ ] Endor fault-tree CDR-class extension
- [ ] 5–7 new threat scenarios at component-level (insider, supply-chain, EMP, kinetic, swarm, spoofing, debris)

## Phase 9 — Interface Control Documents

### S9.1 — Boundary inventory
- [ ] List 9 subsystems × 8/2 = 36 binomial pairs; prune to ~18 real interfaces

### S9.2 — Tier-1 ICDs (mech+power)
- [ ] ICD-02-03 (structural ↔ power)
- [ ] ICD-03-04 (power ↔ superlaser)
- [ ] ICD-03-05 (power ↔ propulsion)
- [ ] ICD-03-07 (power ↔ defensive)
- [ ] ICD-02-04 (structural ↔ superlaser; back-brace)

### S9.3 — Tier-2 ICDs (data+control)
- [ ] ICD-03-08 (power ↔ C3)
- [ ] ICD-04-08 (superlaser ↔ C3)
- [ ] ICD-05-08 (propulsion ↔ C3)
- [ ] ICD-07-08 (defensive ↔ C3)
- [ ] ICD-06-08 (ECLSS ↔ C3)

### S9.4 — Tier-3 ICDs (consumables+utilities)
- [ ] ICD-02-06 (structural ↔ ECLSS; pressurized volume)
- [ ] ICD-06-07 (ECLSS ↔ defensive; CIWS gun crew air)
- [ ] ICD-02-07 (structural ↔ defensive; turret mounts)

### S9.5 — External ICDs
- [ ] ICD-EXT-Fleet (DS-1 ↔ Imperial Fleet docking)
- [ ] ICD-EXT-Sienar (DS-1 ↔ Sienar Fleet Systems prime contractor — programmatic)

## Phase 10 — Detailed Analysis & Simulation

### S10.1 — Structural
- [ ] Stress concentration at critical joints
- [ ] Fatigue (Goodman/Miner with thermal+firing+orbit cycles)
- [ ] Buckling (Euler column / shell)
- [ ] Modal (6+ modes narrated)

### S10.2 — Thermal
- [ ] Lumped-node model (24 zones × atmosphere × hull radiator)
- [ ] Radiator FEA narrative
- [ ] Transient cooldown post-Alderaan-shot

### S10.3 — Electrical
- [ ] Power-grid load-flow analogy
- [ ] Fault-current narrative
- [ ] Protection coordination

### S10.4 — Optical/plasma
- [ ] Beam-train ray-trace narrative
- [ ] Plasma confinement stability (q-profile, MHD modes)

### S10.5 — Control loops
- [ ] Superlaser focusing servo (Bode plot, step response, stability margins)
- [ ] Attitude-control servo
- [ ] Hyperdrive sequencer

## Phase 11 — Software / Firmware Architecture

### S11.1 — Mission-mode state machine
### S11.2 — Per-subsystem firmware spec
### S11.3 — Cyber/physical security narrative
### S11.4 — Software V&V plan addendum

## Phase 12 — RAM + Manufacturing + Operational Envelope

### S12.1 — Reliability tree
### S12.2 — Spare-parts strategy + maintenance regime
### S12.3 — Manufacturing/integration plan
### S12.4 — CONOPS (peacetime / transit / combat / planet-kill / post-strike)
### S12.5 — Operational envelope (thermal/radiation/loading windows)

## Phase 13 — Cost / Schedule / Programmatic Risk

### S13.1 — Cost model (WBS + parametric)
### S13.2 — Schedule (build-time decomposition; critical path)
### S13.3 — Programmatic risk register (R-CDR-NN)

## Phase 14 — Regulatory / Compliance (humorous register)

### S14.1 — OST / Liability / Registration noncompliance disclosure
### S14.2 — Planet-kill EIS (NEPA-style)
### S14.3 — ITAR/EAR Imperial analog
### S14.4 — OSHA-of-the-Empire occupational safety

## Phase 15 — DS-2 CDR-Depth Selective Expansions

### S15.1 — `12.1-three-core-reactor.md`
### S15.2 — `12.2-sld-26.md`
### S15.3 — `12.3-microport-venting.md`
### S15.4 — `12.4-superlaser-multimode.md`
### S15.5 — `12.5-ciws-network.md`

## Phase 16 — Full FMEA Expansion + §11 Minimum-Handwave at CDR Depth

### S16.1 — FMEA inventory (E-25..E-200+)
### S16.2 — RPN ranking + new top-25 Pareto
### S16.3 — §11 Minimum-handwave CDR expansion (per-HW-ID quantified-removal analyses)
### S16.4 — FMEA → DR cross-link audit

## Phase 17 — CDR Figure Production

### S17.1 — Programmatic figures batch
### S17.2 — Nano Banana 2 prompt expansion (~17 new prompts)
### S17.3 — Elevation pass
### S17.4 — Figure index regeneration

## Phase 18 — CDR Peer Review & Audit

### S18.1 — Numerical cross-check at CDR depth
### S18.2 — ICD bidirectional audit
### S18.3 — FMEA / reliability tree consistency
### S18.4 — Citation audit (forward + reverse)
### S18.5 — SW / CONOPS / regulatory tone-and-content
### S18.6 — Senior-engineer slow-read

## Phase 19 — CDR Publication (v1.0)

### S19.1 — Typst template polish
### S19.2 — TOC / LoF / LoT regeneration
### S19.3 — Final PDF build + SHA-256
### S19.4 — Tag v1.0; GitHub release; CHANGELOG/PROJECT-STATUS final

---

## Notes on backlog hygiene

- When a task starts: change `[ ]` to `[~]` and update PROJECT-STATUS.md current phase if crossing a boundary
- When a task completes: change `[~]` to `[x]` and consider whether any follow-up task needs to be added
- Periodic prune: move completed sprints' backlog items out of this file into their phase file's retrospective section
- New discoveries: add under the appropriate phase block, not at the top — preserve the plan shape
