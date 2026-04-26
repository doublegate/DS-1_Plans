# Sprint Backlog

Flat list of every granular task across all phases. Status markers: `[ ]` pending, `[~]` in progress, `[x]` complete. Phase/sprint IDs in brackets. Tasks carried forward from a completed phase stay in their phase file; this backlog is a single scan-surface.

---

## Currently open (next actions)

- [ ] [S2.4] Add DR-13..DR-16 for HW-4, HW-6, HW-8, HW-9
- [ ] [S2.4] Update `appendix-F` §F.3 + §F.4 with new DRs
- [ ] [S2.5] Build complete DS-2 MPT rebudget (separate appendix or embed in `appendix-A` §A.7)
- [ ] [S3.0] Commit figure-production path to decision log
- [ ] [S3.x] Run Nano Banana 2 prompts for the 13 illustrative figures (user-driven; M-11)
- [ ] [S4.0] Commit geometry-freeze decision (120 vs 160 km for DS-1)

## Phase 2 — engineering artifacts (outstanding)

- [ ] [S2.4] HW-IDs → DR coverage gap closure
- [ ] [S2.5] DS-2 MPT full rebudget

## Phase 3 — figures and diagrams

### S3.0 — decision
- [ ] Production path recommendation memo

### S3.1 — structural
- [ ] F-2.1 Station cutaway, quarter-section            (Nano Banana 2)
- [ ] F-2.2 Equatorial trench cross-section             (Nano Banana 2)
- [x] F-2.3 Load-path hierarchy block diagram           (Mermaid — DRAFT)
- [x] F-2.4 Thermal gradient plot                       (matplotlib — DRAFT)
- [ ] F-2.5 Whipple shield stack cross-section          (Nano Banana 2)
- [x] F-2.6 M-type asteroid ISRU flowchart              (Mermaid — DRAFT)

### S3.2 — reactor + weapon
- [x] F-3.1 Specific-energy vs fuel-mass log-log        (matplotlib — DRAFT)
- [x] F-3.2 Stefan-Boltzmann radiated power plot        (matplotlib — DRAFT)
- [x] F-3.3 Reactor → beam block diagram                (Mermaid — DRAFT)
- [ ] F-4.1 Superlaser amplifier-chain schematic        (Nano Banana 2)
- [x] F-4.2 Aperture intensity vs damage threshold plot (matplotlib — DRAFT)
- [ ] F-4.3 Phased-array focusing geometry              (Nano Banana 2)
- [ ] F-4.4 Planet-kill coupling-model panels           (Nano Banana 2)
- [ ] F-4.5 Recoil / back-brace force path diagram      (Nano Banana 2)

### S3.3 — propulsion + ECLSS + C3
- [ ] F-5.1 Sublight ion-array layout                   (Nano Banana 2)
- [x] F-5.2 Hyperdrive 123-generator phase-lock topology (Mermaid — DRAFT)
- [x] F-5.3 Lentz-soliton scaling plot                  (matplotlib — DRAFT)
- [x] F-6.1 ECLSS flow diagram                          (Mermaid — DRAFT)
- [x] F-6.2 Internal transit mode comparison            (matplotlib — DRAFT)
- [x] F-6.3 Hangar volumetric allocation                (matplotlib — DRAFT)
- [ ] F-8.1 Zone map (24 zones)                         (Nano Banana 2)
- [x] F-8.2 C3 hierarchy + latency diagram              (Mermaid — DRAFT)
- [x] F-8.3 Anti-fighter kill chain timeline            (Mermaid — DRAFT)

### S3.4 — defensive, vulnerability, DS-2
- [ ] F-7.1 Ray vs particle shield diagram              (Nano Banana 2)
- [x] F-7.2 Tractor-beam busbar architecture            (Mermaid — DRAFT)
- [ ] F-7.3 MARAUDER plasma-toroid acceleration stages  (Nano Banana 2)
- [ ] F-7.4 Thermal-exhaust-port geometry comparison    (Nano Banana 2)
- [x] F-9.1 Yavin exploit fault tree                    (Graphviz — DRAFT)
- [x] F-9.2 Endor exploit fault tree                    (Graphviz — DRAFT)
- [ ] F-A.1 DS-1 vs DS-2 configuration plate            (Nano Banana 2)

### S3.5 — elevation pass
- [ ] Consistency pass (typography, units, legends)
- [ ] Accessibility pass (colorblind safety, contrast)
- [ ] Update `appendix-D` §D.3 status column
- [ ] Milestone M-05 check-off

## Phase 4 — peer review

### S4.0 — geometry freeze
- [ ] Decide 120 vs 160 km; commit to decision log

### S4.1 — numerical cross-check
- [ ] Canonical format for scientific notation
- [ ] Numerical grep across docs/*.md
- [ ] Mass-budget closure check
- [ ] Power-budget closure check
- [ ] Thermal-budget closure check
- [ ] Volume-budget closure check

### S4.2 — citation audit
- [ ] Forward check: every citation in main text has entry in appendix-C
- [ ] Reverse check: every appendix-C entry is cited somewhere
- [ ] Value verification for specifically-cited numbers

### S4.3 — handwavium traceability
- [ ] Every subsystem claim-that-exceeds-physics cites an HW-ID
- [ ] Every HW-ID has at least one citing DR
- [ ] `appendix-F` §F.4 bidirectional table complete
- [ ] R-4 risk closure in PROJECT-STATUS

### S4.4 — V&V consistency
- [ ] Every DR-xx has class in `appendix-F` §F.3
- [ ] Evidence pointers in `appendix-F` §F.5 valid
- [ ] `appendix-E` FMEA action column references `09` §9.3

### S4.5 — reader pass
- [ ] Senior-engineer slow-read
- [ ] Issue list triaged to backlog
- [ ] Reviewer sign-off

## Phase 5 — publication

### S5.1 — typesetting path
- [ ] Pandoc-LaTeX / Typst / custom-LaTeX decision
- [ ] Build environment prepared

### S5.2 — front matter
- [ ] Cover page
- [ ] Approval block
- [ ] Revision history table
- [ ] TOC + list-of-figures + list-of-tables
- [ ] Acronym short-list
- [ ] Distribution / classification note

### S5.3 — PDF build v1
- [ ] Build script
- [ ] First render
- [ ] Template iteration to 30–60 pages
- [ ] Mermaid / plots render correctly
- [ ] Cross-references resolve in PDF

### S5.4 — release
- [ ] Proof-read
- [ ] Figure spot-check
- [ ] Equation spot-check
- [ ] SHA-256 of final PDF
- [ ] Archive source + manifest
- [ ] Tag release
- [ ] Milestones M-07, M-08 check-off

### S5.5 — distribution (optional)
- [ ] Internal distribution
- [ ] Web mirror
- [ ] Errata tracking

---

## Notes on backlog hygiene

- When a task starts: change `[ ]` to `[~]` and update PROJECT-STATUS.md current phase if crossing a boundary
- When a task completes: change `[~]` to `[x]` and consider whether any follow-up task needs to be added
- Periodic prune: move completed sprints' backlog items out of this file into their phase file's retrospective section
- New discoveries: add under the appropriate phase block, not at the top — preserve the plan shape
