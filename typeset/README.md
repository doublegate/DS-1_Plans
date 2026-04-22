# typeset/ — Typst build

Produces the published PDF from the markdown tree in `../docs/`.

## Prerequisites

- [Typst](https://typst.app) ≥ 0.11 (`pacman -S typst` / `brew install typst`)
- [pandoc](https://pandoc.org) ≥ 3.0 (Typst writer landed in 3.0)
- Fonts installed system-wide: **JetBrains Mono**, **Chakra Petch**

## Usage

One-shot build:

```
./typeset/build.sh
```

Watch mode (recompiles on Typst source changes):

```
./typeset/build.sh --watch
```

Output lands at `dist/DS-1-PDR-v0.2.pdf`.

## Flow

1. Each `docs/*.md` section (listed in `SECTIONS` in `build.sh`) is converted to Typst via `pandoc --to=typst` and placed under `typeset/generated/`.
2. `typeset/main.typ` `#include`s each section in the reading order mirrored from `docs/README.md`.
3. `typeset/template.typ` applies the PDR-register styling (palette, headings, cover page, TOC, figure helpers, `pill`/`stat` helpers usable inline).
4. `typst compile` produces the final PDF.

## Files

- `main.typ` — thin shell; applies template and includes sections in order.
- `template.typ` — palette, page layout, heading styles, cover page, TOC setup, figure/table/pill/stat helpers.
- `build.sh` — the orchestration script.
- `generated/` — pandoc output (gitignored; regenerated on every build).

## Excluded from the published PDF

Working / index / prompt documents not shipped to readers:
- `docs/README.md` (document-set navigation — not spec content)
- `docs/appendix-D2-figure-prompts.md` (image-generation prompts — internal tooling)

## Figure handling

Figures live in `docs/figures/` (created during Phase 3 per `docs/appendix-D2-figure-prompts.md`). Reference them from markdown with:

```
![F-2.1 Station cutaway, quarter-section. Quadanium plating, 24 ring frames, central truss, superlaser dish, meridian trench.](../figures/F-2.1.png)
```

pandoc converts to Typst's `#figure` environment; the template auto-numbers and captions.

## Tuning knobs

Font fallbacks in `template.typ`:
```typst
set text(font: ("JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", "Menlo"), ...)
```
Edit if your system lacks any of these. Chakra Petch is used for headings; substitute with another condensed sans if unavailable.

Palette colors: all at the top of `template.typ` as a single `palette` dictionary. Change once; applies everywhere.

## Iteration contract

Any change to `docs/*.md` → rerun `build.sh`. Any change to `typeset/template.typ` → `typst compile` (fast; pandoc step is cached unless sources changed). CI-style: run `build.sh` in a pre-commit hook once the repo has real collaborators.
