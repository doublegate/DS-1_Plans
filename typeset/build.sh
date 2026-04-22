#!/usr/bin/env bash
# =============================================================================
# DS-1 Engineering Spec — Typst build pipeline
#
# Flow:
#   1. Convert each docs/*.md to Typst via pandoc → typeset/generated/*.typ
#   2. Run typst compile on typeset/main.typ
#   3. Emit dist/DS-1-PDR-v0.2.pdf
#
# Requirements:
#   - pandoc >= 3.0 (typst writer shipped in 3.0)
#   - typst  >= 0.11
#   - Fonts: JetBrains Mono, Chakra Petch (installed system-wide)
#
# Usage:
#   ./typeset/build.sh            # full clean build
#   ./typeset/build.sh --watch    # watch mode (iterative authoring)
# =============================================================================

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DIR="$PROJECT_ROOT/docs"
TYPESET_DIR="$PROJECT_ROOT/typeset"
GEN_DIR="$TYPESET_DIR/generated"
DIST_DIR="$PROJECT_ROOT/dist"

MAIN_TYP="$TYPESET_DIR/main.typ"
OUT_PDF="$DIST_DIR/DS-1-PDR-v0.2.pdf"

# Section files included by main.typ (must match main.typ order)
SECTIONS=(
  00-abstract-and-scope
  01-design-basis
  02-structural-and-materials
  03-power-generation
  04-superlaser
  05-propulsion
  06-life-support
  07-defensive-systems
  08-command-control-communications
  09-vulnerability-analysis
  10-handwavium-ledger
  11-minimum-handwave-reconstruction
  12-ds2-delta-specification
  appendix-A-mass-power-thermal-budget
  appendix-A2-ds2-mass-power-thermal-budget
  appendix-B-nomenclature
  appendix-C-references
  appendix-D-figures-and-tables
  appendix-E-fmea
  appendix-F-vnv-plan
)

# Not included in the published PDF (working documents / indexes):
#   - docs/README.md
#   - docs/appendix-D2-figure-prompts.md

command -v pandoc >/dev/null 2>&1 || { echo "pandoc not found. Install pandoc >= 3.0." >&2; exit 1; }
command -v typst  >/dev/null 2>&1 || { echo "typst not found. Install typst >= 0.11." >&2; exit 1; }

mkdir -p "$GEN_DIR" "$DIST_DIR"

echo "[1/2] Converting markdown sections to Typst..."
for section in "${SECTIONS[@]}"; do
  src="$DOCS_DIR/$section.md"
  dst="$GEN_DIR/$section.typ"
  if [[ ! -f "$src" ]]; then
    echo "  WARN: missing $src — writing placeholder"
    printf '// placeholder: %s.md not yet present\n' "$section" > "$dst"
    continue
  fi
  echo "  - $section.md → $(basename "$dst")"
  pandoc --from=gfm --to=typst --wrap=none "$src" -o "$dst"
done

echo "[2/2] Compiling Typst to PDF..."
if [[ "${1:-}" == "--watch" ]]; then
  echo "  (watch mode — Ctrl-C to exit)"
  typst watch "$MAIN_TYP" "$OUT_PDF"
else
  typst compile "$MAIN_TYP" "$OUT_PDF"
  echo ""
  echo "Output: $OUT_PDF"
  if command -v du >/dev/null 2>&1; then
    du -h "$OUT_PDF" | awk '{print "Size:   "$1}'
  fi
fi
