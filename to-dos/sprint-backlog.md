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
- [ ] GitHub Release asset upload                     (optional — `gh release create v0.2 dist/DS-1-PDR-v0.2.pdf` once user authorizes)

---

## Notes on backlog hygiene

- When a task starts: change `[ ]` to `[~]` and update PROJECT-STATUS.md current phase if crossing a boundary
- When a task completes: change `[~]` to `[x]` and consider whether any follow-up task needs to be added
- Periodic prune: move completed sprints' backlog items out of this file into their phase file's retrospective section
- New discoveries: add under the appropriate phase block, not at the top — preserve the plan shape
