# Phase 5 — Publication

**Goal:** Compile the reviewed markdown tree and figures into a typeset 30–60-page PDF suitable for senior-engineer distribution. Archive a tagged release artifact.
**Status:** Not started.

---

## Sprint S5.1 — Typesetting path (complete 2026-04-22, committed as D-8)

**Decision:** **Typst** (committed to PROJECT-STATUS.md decision log as D-8).

Scaffolded:
- `typeset/main.typ` — thin shell, includes sections in reading order
- `typeset/template.typ` — palette, page layout, heading styles, cover page, TOC setup, `figure-plate`/`pill`/`stat` helpers
- `typeset/build.sh` — orchestrates pandoc (markdown → Typst) + `typst compile` → `dist/DS-1-PDR-v0.2.pdf`
- `typeset/README.md` — prerequisites, usage, tuning knobs

- [x] Commit decision to `PROJECT-STATUS.md` decision log (D-8)
- [x] Set up build-environment artifacts
- [ ] Verify the build runs end-to-end on user's machine (user action: install pandoc ≥ 3.0 + Typst ≥ 0.11 + JetBrains Mono + Chakra Petch)
- [ ] Iterate template to 30–60-page target after Phase 3 figures land

## Sprint S5.2 — Front matter and template

Front matter for PDR document:

- [ ] Cover page (title, document type, revision, date, author, classification, distribution statement)
- [ ] Approval block (signature lines for senior engineer, chief engineer, program manager — even if this is a speculative document, the form matters for PDR register)
- [ ] Revision history table
- [ ] Table of contents (auto-generated)
- [ ] List of figures (from `appendix-D` §D.3)
- [ ] List of tables (from `appendix-D` §D.2)
- [ ] List of acronyms (short form of `appendix-B` §§B.3–B.4)
- [ ] Executive summary (from `00-abstract-and-scope.md`)
- [ ] Definition of classification / distribution note ("SPECULATIVE / EDUCATIONAL — hybrid canon/real-physics technical fiction")

## Sprint S5.3 — PDF build v1

- [ ] Build script that concatenates `docs/00..12*.md` + `appendix-*.md` in order
- [ ] First render: check for layout overflow, broken references, missing figures, ugly widows/orphans
- [ ] Iterate template until PDF hits 30–60 page target with readable density
- [ ] Check all Mermaid diagrams render correctly in PDF
- [ ] Check all plots are embedded at appropriate resolution (300 dpi for print)
- [ ] Verify cross-references resolve (`see [03-power-generation.md]` → page number in PDF)

## Sprint S5.4 — Review + release

- [ ] Proof-read PDF against source markdown for conversion artifacts
- [ ] Spot-check every figure renders correctly
- [ ] Spot-check every equation renders correctly
- [ ] Generate SHA-256 of final PDF
- [ ] Archive:
  - Final PDF
  - Source markdown tree (tagged snapshot)
  - Figure source artifacts (SVG + Mermaid + matplotlib scripts)
  - Build manifest (template version, pandoc/typst version, command used)
- [ ] Tag release (e.g. `v1.0` if adopting git; otherwise dated archive)
- [ ] Update `PROJECT-STATUS.md` milestones M-07, M-08 to complete

## Sprint S5.5 — Distribution (optional)

- [ ] Internal distribution list (if any)
- [ ] Web-hosted mirror (if project goes public; defer if not)
- [ ] Errata tracking mechanism (issue list or backlog in this repo)

## Exit criteria

- [ ] PDF artifact exists, is typeset to PDR-register density, is between 30 and 60 pages
- [ ] All figures render correctly
- [ ] All cross-references resolve to page numbers
- [ ] Build is reproducible (manifest + archived source artifacts)
- [ ] Release tagged and archived

## Tooling sketch (for reference)

A plausible one-shot build command (adjust per template decision):

```
pandoc \
  docs/00-abstract-and-scope.md \
  docs/01-design-basis.md \
  docs/02-structural-and-materials.md \
  docs/03-power-generation.md \
  docs/04-superlaser.md \
  docs/05-propulsion.md \
  docs/06-life-support.md \
  docs/07-defensive-systems.md \
  docs/08-command-control-communications.md \
  docs/09-vulnerability-analysis.md \
  docs/10-handwavium-ledger.md \
  docs/11-minimum-handwave-reconstruction.md \
  docs/12-ds2-delta-specification.md \
  docs/appendix-A-mass-power-thermal-budget.md \
  docs/appendix-B-nomenclature.md \
  docs/appendix-C-references.md \
  docs/appendix-D-figures-and-tables.md \
  docs/appendix-E-fmea.md \
  docs/appendix-F-vnv-plan.md \
  -o DS-1-PDR-v1.pdf \
  --template=eisvogel \
  --toc --toc-depth=3 \
  --number-sections \
  --pdf-engine=xelatex \
  --filter pandoc-mermaid
```

Actual command to be confirmed during S5.3.
