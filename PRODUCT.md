# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary audience:** A broad general science-fiction and educational audience exploring how an orbital battle station works when subjected to real physics and systems-engineering rigor, alongside technical peer reviewers, physicists, and systems engineers auditing the underlying budgets and trade studies.
- **User situation and job:** Visitors arrive either to explore the interactive station cutaway, subsystem budgets, and real-physics vs. canon comparisons, or to read and cross-examine the full Preliminary Design Review (PDR) specification and its explicit accounting of where fictional physics is required.

## Product Purpose

- **What it does:** Delivers a speculative systems-engineering Preliminary Design Review (PDR) package for the DS-1 Orbital Battle Station (and DS-2 delta specification) across three complementary surfaces:
  1. **Interactive Engineering Console (`proj-code/`):** A web application for exploring the 9 subsystem modules, interactive build and superlaser firing sequences, real-world 2026 technology analogs, and the cross-referenced Handwavium / Derived Requirements / FMEA ledger.
  2. **Public Web Publication & PDR Reader (planned):** A public-facing web landing page and web-based PDR specification reader to make the long-form engineering study accessible in the browser alongside the interactive console.
  3. **Typeset PDR Specification (`docs/` + `typeset/`):** A 30–60-page PDF engineering document package built via Pandoc and Typst for citation, distribution, and offline review.
- **Why it exists:** To answer a concrete systems-engineering question—*Can you design a 120-km planet-killing battle station on paper using mostly real physics, and honestly track where you cheat?*—making order-of-magnitude physics, structural scaling, energetics, and engineering trade studies tangible and educational without hand-waving past the math.

## Positioning

- **Honest-accounting hybrid canon + real-physics engineering:** Unlike fan wikis that catalog lore uncritically or popular-science articles that dismiss the Death Star with a single back-of-the-envelope calculation, this project treats the station as a full PDR baseline. It isolates **one irreducible primary physics concession**—a bulk substrate with specific energy density at or above $c^2$ (`HW-1`, hypermatter at $9 \times 10^{16}\text{ J/kg}$)—and proves that every major downstream subsystem follows as a finite, internally consistent extrapolation of real-world physics and active experimental programs, while bounding all ten physics departures in a structured **Handwavium Ledger (`HW-1` … `HW-10`)** traced to stakeholder and derived requirements (`SR-01..08`, `DR-01..16`).

## Operating Context

- **Interactive exploration & educational discovery:** Readers switch between high-level station visualizations (7-phase construction sequence, superlaser firing sequence, DS-1 vs. DS-2 scaling) and granular subsystem tables, equations, and real-world analog comparisons (NIF, ITER, TAE, Epirus Leonidas, HELIOS, NASA Psyche, CERN ALPHA, NEXT-C, VASIMR, Lentz soliton warp, AFRL MARAUDER).
- **Document reading & cross-referencing:** Readers navigate between the narrative PDR sections (`docs/00-abstract-and-scope.md` through `docs/12-ds2-delta-specification.md`), engineering appendices (`Appendix A–F`), and the interactive console tabs labeled by specification section (`§0` through `§9-10`, `Appx A`, `HW/DR/FMEA`).
- **Offline & print workflows:** The interactive console ships both as a Vite/TypeScript web application (`proj-code/src/`) and as a zero-install standalone HTML artifact (`proj-code/DS1-Engineering-Console.html`), and supports printing the Ledger tab directly to a portrait-A4 PDF appendix (`proj-code/src/styles/print.css`) to accompany the Typst-compiled specification.

## Capabilities and Constraints

- **Load-bearing numerical baseline (must remain synchronized across `ref-docs/`, `docs/`, and `proj-code/src/data/`):**
  - **Geometry of record:** DS-1 diameter = $120\text{ km}$; DS-2 diameter = $160\text{ km}$ (the discredited 900-km Saxton figure is explicitly rejected and must never be cited approvingly).
  - **Design-basis mass:** $1.0 \times 10^{18}\text{ kg}$ for DS-1 (lower bound $\sim 2 \times 10^{17}\text{ kg}$); $2.37 \times 10^{18}\text{ kg}$ for DS-2.
  - **Superlaser shot energy:** $2.24 \times 10^{32}\text{ J}$ (Earth gravitational binding energy, $3GM^2/5R$).
  - **Sustained reactor output:** $2.6 \times 10^{27}\text{ W}$ for DS-1 (~24-hour recharge); $7.8 \times 10^{27}\text{ W}$ 3-core sum for DS-2 (~3–5 minute recharge).
  - **Hypermatter specific energy (`HW-1`):** $9 \times 10^{16}\text{ J/kg}$ ($= c^2$).
  - **Crew complement:** $1.7 \times 10^6$ (DS-1) and $637,835$ (DS-2).
- **Structured traceability:** Every claim exceeding known physics must cite an `HW-ID` (`HW-1` … `HW-10` in PDR, with `HW-11` … `HW-15` reserved under CCB gating in CDR). Every stakeholder requirement (`SR-01` … `SR-08`) traces to derived requirements (`DR-01` … `DR-16` in PDR, extending to `DR-17..`, `DR2-NN`, `RR-NN`, `MR-NN`, and `OR-NN` in CDR) classified by verification method: **A** (Analysis), **I** (Inspection), **T** (Test-eligible via real-world analog), or **C** (Concession, satisfied only by a cited `HW-ID`; 8 of 16 PDR DRs are Concession-class).
- **Technical architecture & dual-distribution constraint:**
  - `proj-code/` uses React 19.3, TypeScript 5.9, Vite 8.3, Recharts 3.10, and `lucide-react` 1.61.
  - Per CDR conventions (`CLAUDE.md` and `to-dos/cdr-conventions.md`), `proj-code/` is frozen at PDR feature parity through v1.0 except for HW/DR/FMEA/real-world data parity updates, while a full CDR-mirror console or expanded web publication surface is tracked separately.
  - Changes to `proj-code/src/` data and capabilities must track parity considerations with the standalone `proj-code/DS1-Engineering-Console.html` distributable and the markdown specification in `docs/`.
  - `ref-docs/Claude - DS-1 Orbital Battle Station Plans.md` is the canonical source authority; derived edits land in `docs/` (`docs/cdr/`, `docs/icd/`), and `code-artifacts/` is frozen.
- **Licensing & IP boundaries:** Licensed under **CC-BY-NC-4.0** (`LICENSE`, `NOTICE.md`). Non-commercial educational/speculative engineering work; Star Wars terminology is used nominatively as analytical subject matter, and real-world research programs are cited from public literature without implied endorsement.

## Brand Commitments

- **In-universe / technical framing:** Framed as a "Senior Technical Director review; doctrine-level engineering assessment" (`CLASSIFIED · IMDEP-1`, `STARDATE · Y19 · HORUZ`), while remaining immediately approachable and illuminating to a general sci-fi and educational audience.
- **Voice and register:** PDR/CDR-ready, precise, and candid. Show units in tables, show substituted values and order-of-magnitude arithmetic in equations, and use "handwavium" strictly as a neutral, rigorous systems-engineering term of art rather than a joke or pejorative. Treat Star Wars canon as empirical baseline requirements rather than fan prose.

## Evidence on Hand

- **Authoritative specification corpus:** Master reference specification (`ref-docs/Claude - DS-1 Orbital Battle Station Plans.md`), 13 PDR section documents (`docs/00-abstract-and-scope.md` through `docs/12-ds2-delta-specification.md`), Appendices `A`, `A2`, `B`, `C`, `D`, `D2`, `E`, `F`, plus CDR foundation artifacts (`docs/appendix-G-configuration-management.md`, `docs/appendix-H-drafting-standards.md`, `docs/icd/_template.md`, `to-dos/cdr-conventions.md`).
- **Committed figure inventory (`docs/figures/`):** All 30 PDR figures (`F-2.1` through `F-A.1`) are rendered, committed, and inline-embedded across the subsystem markdown (`17` programmatic Mermaid/Graphviz/matplotlib figures at FINAL status with reproducible sources in `docs/figures/_sources/`; `13` Nano Banana 2 illustrative plates committed at DRAFT status pending minor Rev A label re-renders on `F-2.1`, `F-7.4`, and `F-A.1`).
- **Structured engineering datasets (`proj-code/src/data/`):** 16 typed data modules covering mass budget, crew manifest, weapons, 7-phase construction timeline, energy comparisons, reactor options, `HW-1..10` handwavium ledger, `DR-01..16` derived requirements, top-10 RPN FMEA, real-world 2026 analog programs, cost breakdown, DS-1 vs. DS-2 delta, vulnerabilities, propulsion, ECLSS, and fighter complement.
- **Interactive & typeset artifacts:** Functional 9-tab React 19 / Vite 8 console (`proj-code/`), standalone CDN console (`proj-code/DS1-Engineering-Console.html`), and verified 74-page Typst PDF build pipeline (`typeset/main.typ`, `typeset/template.typ`, `typeset/build.sh`, released at tag `v0.2` and extended with CDR helpers at `v0.3-rc`).
- **Known absences (do not fabricate):** Phase 7–19 CDR detailed subsystem expansions (`docs/cdr/`), full ICDs (`docs/icd/ICD-NN-MM.md`), and the 3 reference drafting figures (`F-H.1..F-H.3`) are in progress. Do not invent external endorsements, fictional reviewer quotes, or unverified citations outside `docs/appendix-C-references.md`.

## Product Principles

1. **Honest Accounting Over Hand-Waving:** Every departure from known physics is isolated, quantified, and traced to `HW-1..10` and `DR-01..16` so any reader can see exactly where real engineering ends and speculative physics begins.
2. **Accessible Rigor:** Present extreme orders of magnitude ($10^{18}\text{ kg}$, $10^{27}\text{ W}$, $10^{32}\text{ J}$) through clear interactive comparisons, real-world 2026 laboratory analogs, and visual staging so general sci-fi and educational visitors grasp the scale without losing PDR-level precision.
3. **Single Numerical Truth Across Surfaces:** Whether a visitor reads the landing page, browses the web PDR reader, operates the interactive console, or prints the PDF specification, every physical constant, mass budget, and requirement ID must reconcile to `docs/01-design-basis.md`.
4. **Deadpan Engineering Authority:** Let the contrast between a dry, disciplined systems-engineering review and a 120-km moon-sized superweapon carry the personality—never break register with wink-at-the-camera parody or ungrounded fan lore.
