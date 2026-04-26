# DS-1 Orbital Battle Station — Engineering Specification

A speculative systems-engineering specification for the DS-1 Death Star, structured as a Preliminary Design Review (PDR) document package. Hybrid canon + real-physics analysis; audience framing is "Senior Technical Director review."

**Status:** Draft 0.2 · 2026-04-26 · Phases 0–2 complete · Phase 3 nearly complete — all 30 figures at DRAFT; S3.5 elevation pass and Phase 4 peer review next

## The question this project answers

*Can you design a 120-km planet-killing battle station on paper using mostly real physics, and honestly track where you cheat?*

Short answer: yes, if you accept **one** irreducible physics concession — a bulk substrate with specific energy density at or above c² ("hypermatter"). With that one concession, every downstream subsystem — reactor, superlaser, shield, drive, turbolasers — follows as a large-but-finite extrapolation of known engineering (10–15 orders of magnitude beyond current capability, but internally consistent). Remove hypermatter and the concept collapses across six independent physics walls. The full accounting is in the ten-entry **handwavium ledger** (`docs/10-handwavium-ledger.md`), which every subsystem claim in the spec traces back to.

## What's in this repository

```
DS-1_Plans/
├── ref-docs/      # Source authority — the monolithic markdown spec
├── docs/          # Derived PDR document tree: executive summary, 11 subsystems,
│                  # DS-2 delta, 7 engineering-artifact appendices (MPT budget,
│                  # nomenclature, references, figures index, FMEA, V&V plan,
│                  # DS-2 rebudget, figure-generation prompts)
├── to-dos/        # Phase plan + sprint backlog + live PROJECT-STATUS
├── code-artifacts/# Reference implementations of the interactive console (read-only)
├── proj-code/     # Final Vite + React + TypeScript interactive console
│                  # (companion artifact to the PDF)
├── typeset/       # Typst build pipeline for the published PDF
├── CHANGELOG.md   # Project-level history (component changelogs live in their subdirs)
├── CLAUDE.md      # Conventions for AI assistants working in this repo
├── NOTICE.md      # Rights + third-party acknowledgements
└── README.md      # This file
```

## The deliverable

A 30–60-page typeset PDF produced by the Typst pipeline in `typeset/`, backed by the interactive console in `proj-code/`. The PDF is for distribution and citation; the console is for exploration and peer review.

## Quick start

### Read the spec as markdown
Open `docs/README.md` for the document-set navigation. Reading order is listed there.

### Build the PDF (Phase 5)
Requires pandoc ≥ 3.0, Typst ≥ 0.11, and the JetBrains Mono + Chakra Petch fonts.
```
./typeset/build.sh
# output: dist/DS-1-PDR-v0.2.pdf
```

### Run the interactive console (Phase 5 companion)
Zero-install path — open `proj-code/DS1-Engineering-Console.html` in a browser (uses CDN React + Recharts). Dev path:
```
cd proj-code
npm install
npm run dev
```

### Generate figures (Phase 3)

`docs/appendix-D2-figure-prompts.md` partitions the 30 figures across four production tools: Google Gemini Nano Banana 2 for the 13 illustrative plates (cutaways, schematics, sphere maps), Mermaid for 8 flowcharts and one sequence diagram, Graphviz for 2 fault trees, and matplotlib for 7 plots. Output lands in `docs/figures/`; reproducible source artifacts (`.mmd` / `.dot` / `.py` / prompt text) live alongside in `docs/figures/_sources/`.

The 17 programmatic figures are rendered and committed (DRAFT status). To regenerate from sources:

```
# matplotlib (creates a local venv; one-time)
cd docs/figures/_sources
python3 -m venv .venv && .venv/bin/pip install matplotlib numpy
.venv/bin/python F-figures.py

# Mermaid (requires npm i -g @mermaid-js/mermaid-cli)
./render-mermaid.sh

# Graphviz (requires brew install graphviz)
dot -Tsvg F-9.1.dot -o ../F-9.1.svg && dot -Tsvg F-9.2.dot -o ../F-9.2.svg
```

## Project phases

- **Phase 0 · Foundation** · done 2026-04-21
- **Phase 1 · Document split** · done 2026-04-21 (ref-doc → 13 sections + appendices)
- **Phase 2 · Engineering artifacts** · done 2026-04-22 (MPT budget, FMEA, V&V, nomenclature, references, figure index, DS-2 rebudget, HW→DR gap closure)
- **Phase 3 · Figures** · all 30 at DRAFT (2026-04-26) — 8 Mermaid + 2 Graphviz + 7 matplotlib rendered locally; 13 Nano Banana 2 illustrative figures generated and renamed to bare `F-{id}.png`. S3.5 elevation pass (DRAFT → FINAL) is next.
- **Phase 4 · Peer review** · not started (numerical cross-check, citation audit, handwavium traceability)
- **Phase 5 · Publication** · scaffolded (Typst template + build pipeline in place; PDF build pending figures)

Live status: `to-dos/PROJECT-STATUS.md`. Phase detail: `to-dos/phase-*.md`.

## Key numerical baseline

All subsystem documents are consistent with these (`docs/01-design-basis.md`):

| | DS-1 | DS-2 |
|---|---|---|
| Diameter | 120 km | 160 km |
| Design-basis mass | 1.0 × 10¹⁸ kg | 2.37 × 10¹⁸ kg |
| Per-shot energy | 2.24 × 10³² J (Earth binding energy) | same |
| Sustained reactor | 2.6 × 10²⁷ W | 3-core sum 7.8 × 10²⁷ W |
| Recharge | ~24 h | ~3–5 min (canon) |
| Crew | 1.7 × 10⁶ | 637,835 |
| Hypermatter specific energy | 9 × 10¹⁶ J/kg (= c²) | same |

## Methodology

The spec uses a deliberate **honest-accounting** pattern. Every claim that exceeds real-physics envelope cites an **HW-ID** (HW-1 … HW-10) from the handwavium ledger. Every stakeholder requirement (SR-01 … SR-08) traces to one or more **derived requirements** (DR-01 … DR-16) with a verification class:

- **A** — Analysis (numerical demonstration within stated assumptions)
- **I** — Inspection (canon reconciliation)
- **T** — Test-eligible via a real-world analog program
- **C** — Concession (satisfied only by the cited HW-ID)

8 of 16 DRs are Concession-class. That ratio is the honest measure of how much we're cheating.

## Rights

Licensed under [CC-BY-NC-4.0](LICENSE) — attribution required, non-commercial use. See [NOTICE.md](NOTICE.md) for plain-English terms, third-party acknowledgements (Star Wars IP, real-physics program names, software dependencies), and the contact channel for commercial / rights inquiries.

## Contributing / feedback

This project is being developed toward formal technical-fiction publication. Issues and peer-review feedback are welcome via GitHub; please open an issue rather than a PR at this stage so contributions can be tracked against the phase plan.

## References

Primary sources are consolidated in `docs/appendix-C-references.md`:
- Canon + Legends (Wookieepedia, WEG *Death Star Technical Companion* 1991, DK *Incredible Cross-Sections*, Rogue One UVG)
- Physicist analyses (Saxton, Wong, Siegel, Allain, Cox, Minton)
- Economic (Centives / Lehigh; Feinstein arXiv:1511.09054)
- Real-physics programs (NIF, TAE, Epirus, HELIOS, Psyche, ALPHA, NEXT-C, VASIMR, Lentz, MARAUDER)

All cited programs' status is current as of April 2026 — tracked in `proj-code/src/data/realWorld2026.ts` and the Ledger tab.
