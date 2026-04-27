// =============================================================================
// DS-1 Engineering Specification — main Typst entry point
//
// This file is the thin shell that applies the template and includes the
// per-section content. Content lives in .typ files generated from docs/*.md
// via pandoc (see build.sh) and placed in typeset/generated/.
// =============================================================================

#import "template.typ": ds1-doc, palette, figure-plate, pill, stat, handwavium-pill, dr-pill, fmea-pill, cdr-callout, two-col, icd-header

#show: ds1-doc.with(
  title: "DS-1 Orbital Battle Station",
  subtitle: "Engineering Specification — Preliminary Design Review",
  version: "Draft 0.2",
  date: "2026-04-22",
)

// =============================================================================
// BODY
// =============================================================================
// Each section corresponds to a markdown file in docs/. The pandoc build emits
// typeset/generated/<section>.typ which we include here.
//
// Order matches docs/README.md reading order. If you add a new section, mirror
// the order and update appendix-D figures-and-tables index too.
// =============================================================================

#include "generated/00-abstract-and-scope.typ"
#include "generated/01-design-basis.typ"

#pagebreak()
= Subsystem Specifications

#include "generated/02-structural-and-materials.typ"
#include "generated/03-power-generation.typ"
#include "generated/04-superlaser.typ"
#include "generated/05-propulsion.typ"
#include "generated/06-life-support.typ"
#include "generated/07-defensive-systems.typ"
#include "generated/08-command-control-communications.typ"

#pagebreak()
= Cross-Cutting Analysis

#include "generated/09-vulnerability-analysis.typ"
#include "generated/10-handwavium-ledger.typ"
#include "generated/11-minimum-handwave-reconstruction.typ"
#include "generated/12-ds2-delta-specification.typ"

#pagebreak()
= Appendices

#include "generated/appendix-A-mass-power-thermal-budget.typ"
#include "generated/appendix-A2-ds2-mass-power-thermal-budget.typ"
#include "generated/appendix-B-nomenclature.typ"
#include "generated/appendix-C-references.typ"
#include "generated/appendix-D-figures-and-tables.typ"
#include "generated/appendix-E-fmea.typ"
#include "generated/appendix-F-vnv-plan.typ"
#include "generated/appendix-G-configuration-management.typ"
#include "generated/appendix-H-drafting-standards.typ"

// Note: appendix-D2 (figure prompts) is an internal working document and
// intentionally NOT included in the published PDF.
