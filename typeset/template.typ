// =============================================================================
// DS-1 Orbital Battle Station — Engineering Specification
// Typst template. See ./main.typ for entry point.
// Palette matches docs/appendix-B-nomenclature.md and the console in proj-code/.
// =============================================================================

// pandoc 3.9's typst writer emits `#horizontalrule` for markdown `---` thematic
// breaks, but Typst has no such built-in. Define it as a thin muted line that
// matches the panel-border palette.
#let horizontalrule = line(length: 100%, stroke: 0.5pt + rgb("#2a2f3a"))

#let palette = (
  bg:      rgb("#0a0e1a"),
  panel:   rgb("#11151f"),
  amber:   rgb("#f5a623"),
  cream:   rgb("#f0e6d2"),
  white:   rgb("#ffffff"),
  cyan:    rgb("#4ec9b0"),
  red:     rgb("#e74c3c"),
  green:   rgb("#2ecc71"),
  text:    rgb("#e8e8ed"),
  muted:   rgb("#9aa0ab"),
  dim:     rgb("#6d7380"),
  border:  rgb("#2a2f3a"),
)

#let ds1-doc(
  title: "DS-1 Orbital Battle Station",
  subtitle: "Engineering Specification",
  version: "Draft 0.2",
  date: "2026-04-22",
  classification: "SPECULATIVE / EDUCATIONAL — hybrid canon / real-physics technical fiction",
  body,
) = {
  // Page setup — A4 with tight margins for PDR-target page count
  set document(title: title, author: "DS-1 Plans project")
  set page(
    paper: "a4",
    margin: (top: 2cm, bottom: 2cm, left: 2cm, right: 2cm),
    fill: palette.bg,
    numbering: "1 / 1",
    number-align: right,
    header: context {
      if counter(page).get().first() > 1 [
        #set text(size: 7pt, fill: palette.dim, font: "JetBrains Mono")
        #title #h(1fr) #subtitle
        #line(length: 100%, stroke: 0.3pt + palette.border)
      ]
    },
  )

  // Typography — monospace-first engineering register; 9pt body for compression
  set text(
    font: ("JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", "Menlo"),
    size: 9pt,
    fill: palette.text,
    lang: "en",
  )
  set par(justify: true, leading: 0.55em, first-line-indent: 0pt, spacing: 0.7em)

  // Heading hierarchy. Level-1 does NOT force-pagebreak — body sections flow
  // continuously to hit the 30-60 page target. Front-matter pagebreaks are
  // explicit in the template body below. Part-level pagebreaks (Subsystem
  // Specifications / Cross-Cutting Analysis / Appendices) are added at
  // those headings via explicit pagebreak() calls in main.typ.
  show heading.where(level: 1): it => {
    v(0.8em)
    block(fill: palette.amber, inset: (x: 6pt, y: 2pt))[
      #set text(fill: palette.bg, weight: "bold", size: 12pt, font: "Chakra Petch")
      #it.body
    ]
    v(0.3em)
    line(length: 100%, stroke: 1pt + palette.amber)
    v(0.3em)
  }
  show heading.where(level: 2): it => {
    v(0.6em)
    set text(fill: palette.amber, weight: "semibold", size: 10.5pt, font: "Chakra Petch")
    it.body
    v(0.15em)
    line(length: 30%, stroke: 0.5pt + palette.amber)
  }
  show heading.where(level: 3): it => {
    v(0.4em)
    set text(fill: palette.cyan, weight: "semibold", size: 9.5pt, font: "Chakra Petch")
    it.body
  }
  show heading.where(level: 4): it => {
    v(0.2em)
    set text(fill: palette.cream, weight: "semibold", size: 9pt)
    it.body
  }

  // Tables — tight cell padding to compress vertical space
  set table(
    stroke: 0.3pt + palette.border,
    inset: (x: 5pt, y: 2.5pt),
  )
  show table.cell.where(y: 0): set text(weight: "bold", fill: palette.amber, size: 8.5pt)

  // Figure images — cap width so illustrative plates flow inside one page
  // rather than getting pushed to the next-page top with whitespace above.
  // Captions render in dim small text per PDR convention.
  set image(width: 65%)
  show figure: it => {
    block(breakable: false, it)
  }
  show figure.caption: it => {
    set text(size: 7.5pt, fill: palette.muted, style: "italic")
    it
  }

  // Links
  show link: it => {
    set text(fill: palette.cyan)
    underline(it)
  }

  // Code (inline + block)
  show raw: it => {
    set text(font: "JetBrains Mono", fill: palette.cream, size: 9pt)
    if it.block {
      block(
        fill: palette.panel,
        inset: 8pt,
        radius: 2pt,
        stroke: 0.3pt + palette.border,
        width: 100%,
        it,
      )
    } else {
      box(fill: palette.panel, inset: (x: 3pt, y: 1pt), outset: (y: 2pt), radius: 1pt, it)
    }
  }

  // ---- Cover page ----
  set page(margin: (top: 3cm, bottom: 3cm, left: 3cm, right: 3cm))
  align(center)[
    #v(4cm)
    #block[
      #set text(size: 9pt, fill: palette.amber, font: "Chakra Petch", tracking: 3pt)
      #upper("Engineering Specification · Preliminary Design Review")
    ]
    #v(1.5cm)
    #text(size: 28pt, weight: "bold", fill: palette.white, font: "Chakra Petch")[#title]
    #v(0.3cm)
    #text(size: 16pt, fill: palette.cream, font: "Chakra Petch")[#subtitle]
    #v(2cm)
    #line(length: 40%, stroke: 1pt + palette.amber)
    #v(2cm)
    #grid(
      columns: (auto, auto),
      column-gutter: 2cm,
      row-gutter: 0.4em,
      align: (right, left),
      text(fill: palette.muted)[Version:],        text(fill: palette.white)[#version],
      text(fill: palette.muted)[Date:],           text(fill: palette.white)[#date],
      text(fill: palette.muted)[Classification:], text(size: 9pt, fill: palette.amber)[#classification],
    )
    #v(1fr)
    #block[
      #set text(size: 8pt, fill: palette.dim, font: "JetBrains Mono")
      Hybrid canon / real-physics engineering reconstruction. \
      Source authority: `ref-docs/Claude - DS-1 Orbital Battle Station Plans.md` \
      Derived document tree: `docs/`
    ]
  ]
  pagebreak()

  // ---- Approval block ----
  set page(margin: (top: 2cm, bottom: 2cm, left: 2cm, right: 2cm))
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[Approval]
    text(size: 9pt, fill: palette.muted)[
      This Preliminary Design Review package is offered for senior-engineer review
      against the load-bearing requirements in §1 design basis and the verification
      plan in Appendix F. Approval signatures below indicate that the named
      reviewer has read the indicated section, agrees that the numerical baseline
      and traceability matrix are internally consistent, and that the handwavium
      ledger fully accounts for every claim that exceeds real-physics envelope.
    ]
    v(0.8em)
    table(
      columns: (1fr, 1.2fr, 1fr, 1.4fr),
      align: (left, left, left, left),
      stroke: 0.3pt + palette.border,
      [*Role*], [*Section scope*], [*Reviewer*], [*Signature / Date*],
      [Lead reviewer],              [Whole document],     [pending], [—],
      [Structures \& materials],    [§2, App A],          [pending], [—],
      [Reactor \& weapon],          [§3, §4, App A],      [pending], [—],
      [Propulsion],                 [§5],                 [pending], [—],
      [Life support \& C3],         [§6, §8],             [pending], [—],
      [Defensive \& vulnerability], [§7, §9, App E],      [pending], [—],
      [Handwavium \& V\&V],         [§10, §11, App F],    [pending], [—],
      [DS-2 delta],                 [§12, App A2],        [pending], [—],
    )
    v(1em)
    text(size: 9pt, fill: palette.dim)[
      Reviewer-pass status: Phase 4 internal audit closed 2026-04-26 (zero
      numerical discrepancies, zero broken citations, all HW↔DR traceability
      bidirectional). External senior-engineer signatures pending.
    ]
  }
  pagebreak()

  // ---- Revision history ----
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[Revision History]
    table(
      columns: (auto, auto, 1fr),
      align: (left, left, left),
      stroke: 0.3pt + palette.border,
      [*Version*], [*Date*], [*Summary*],
      [0.1], [2026-04-21], [Initial commit. Phase 1 ref-doc → 13-section + 6-appendix split. Numerical baseline frozen: DS-1 = 120 km / 1.0 × 10¹⁸ kg, Alderaan = 2.24 × 10³² J, hypermatter = c² = 9 × 10¹⁶ J/kg.],
      [0.2-rc1], [2026-04-22], [Phase 2 close: appendices A through F authored; HW-1..HW-10 ledger and DR-01..DR-16 V\&V matrix bidirectionally traced; DS-2 rebudget at 2.37 × 10¹⁸ kg; Typst pipeline scaffolded; CC-BY-NC-4.0 license adopted; public GitHub mirror.],
      [0.2-rc2], [2026-04-26], [Phase 3 close: 17 programmatic figures rendered (Mermaid + Graphviz + matplotlib) and 13 illustrative figures generated (Nano Banana 2). All 30 inline-embedded in subsystem markdown with PDR-register captions. First end-to-end Typst PDF build (M-07).],
      [0.2], [2026-04-26], [Phase 4 close: numerical cross-check, citation audit, HW traceability, V\&V consistency, and senior-engineer reader pass complete. Three §3.6 → §4.6 cross-references and one dead reverse-citation (Bobrick \& Martire) remediated. Phase 5 publication.],
    )
  }
  pagebreak()

  // ---- Distribution / classification ----
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[Distribution and Classification]
    block(
      fill: palette.amber.transparentize(90%),
      stroke: 0.5pt + palette.amber,
      inset: 12pt,
      radius: 2pt,
      width: 100%,
    )[
      #text(fill: palette.amber, weight: "semibold", size: 10pt, font: "Chakra Petch")[
        SPECULATIVE / EDUCATIONAL — hybrid canon / real-physics technical fiction
      ]
      #v(0.4em)
      #set text(size: 9pt, fill: palette.cream)
      This document is a speculative engineering-spec exercise applied to a
      copyrighted intellectual-property reference. It is offered as
      educational technical-fiction analysis under fair-use doctrine and is
      licensed for non-commercial reuse under
      #text(fill: palette.cyan)[CC-BY-NC-4.0] (see `LICENSE`).
      Star Wars and the Death Star concept remain trademarks and copyrighted
      property of Lucasfilm Ltd. and the Walt Disney Company.
    ]
    v(0.8em)
    text(size: 9pt, fill: palette.muted)[*Distribution.*]
    v(0.2em)
    set text(size: 9pt, fill: palette.text)
    [
      - *Public mirror:* https://github.com/doublegate/DS-1\_Plans
      - *Source authority:* `ref-docs/Claude - DS-1 Orbital Battle Station Plans.md`
      - *Derived document tree:* `docs/`
      - *Canonical PDF artifact:* `dist/DS-1-PDR-v0.2.pdf` (this build)
      - *Reproducibility:* every figure has a source artifact archived in
        `docs/figures/_sources/` (Mermaid `.mmd`, Graphviz `.dot`, matplotlib
        `F-figures.py`, plus per-illustrative prompt-blocks in `docs/appendix-D2-figure-prompts.md`).
        The Typst build pipeline is `typeset/build.sh` (requires pandoc ≥ 3.0,
        typst ≥ 0.11, JetBrains Mono, Chakra Petch).
    ]
    v(0.5em)
    text(size: 9pt, fill: palette.muted)[*Errata channel.*]
    v(0.2em)
    set text(size: 9pt, fill: palette.text)
    [
      Issues are tracked at the public GitHub repository above. Use the
      *Peer Review* template for numerical / citation / canon corrections;
      *Bug Report* for console (`proj-code/`) or Typst-build problems;
      *Question* for everything else. Pull requests are welcome from Phase 4
      onward.
    ]
  }
  pagebreak()

  // ---- Table of contents ----
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[Contents]
    outline(title: none, indent: auto, depth: 2)
  }
  pagebreak()

  // ---- List of figures ----
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[List of Figures]
    outline(title: none, indent: auto, target: figure.where(kind: image))
  }
  pagebreak()

  // ---- List of tables ----
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[List of Tables]
    outline(title: none, indent: auto, target: figure.where(kind: table))
  }
  pagebreak()

  // ---- Acronym short-list ----
  // Curated subset; full glossary lives in Appendix B.
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[Acronyms (short-list)]
    text(size: 9pt, fill: palette.muted)[Full nomenclature in Appendix B.]
    v(0.6em)
    table(
      columns: (auto, 1fr),
      align: (left, left),
      stroke: 0.3pt + palette.border,
      [*Term*], [*Expansion*],
      [PDR],     [Preliminary Design Review (this document register)],
      [DS-1 / DS-2], [First / Second Death Star Orbital Battle Station],
      [HW-{n}],  [Handwavium concession ID, n = 1..10 (see §10 / Appendix F §F.4)],
      [DR-{n}],  [Derived Requirement, n = 01..16 (see §1 / Appendix F §F.3)],
      [SR-{n}],  [Stakeholder Requirement, n = 01..08 (see §1)],
      [A / I / T / C], [V\&V class: Analysis / Inspection / Test-eligible / Concession],
      [MPT],     [Mass / Power / Thermal (consolidated budget in Appendix A / A2)],
      [FMEA],    [Failure Modes \& Effects Analysis (Appendix E)],
      [V\&V],    [Verification \& Validation (Appendix F)],
      [RPN],     [Risk Priority Number = Severity × Occurrence × Detection],
      [ECLSS],   [Environmental Control \& Life Support System (§6.3)],
      [ISRU],    [In-Situ Resource Utilisation (§2.5)],
      [LIDT],    [Laser-Induced Damage Threshold (§4.2)],
      [CIWS],    [Close-In Weapon System (§9.3 doctrine fix)],
      [KKV],     [Kinetic Kill Vehicle (§7.6 / §7.5)],
      [SLD-26],  [DS-2 Endor planetary shield generator (§12.4)],
      [SSP06 / SSP05], [Isu-Sim hyperdrive generator classes (§5.2)],
      [SFS-CR27200], [Sienar Fleet Systems hypermatter reactor designation (§3 / §4.1)],
      [c²],      [Hypermatter specific energy = 9 × 10¹⁶ J/kg (HW-3 storage; HW-2 production)],
      [L☉],      [Solar luminosity, 3.828 × 10²⁶ W (used as scale-reference)],
      [M☉],      [Solar mass, 1.989 × 10³⁰ kg (used as scale-reference)],
    )
  }
  pagebreak()

  // ---- Body ----
  set page(numbering: "1")
  counter(page).update(1)
  body
}

// ---- Helpers usable inside body ----

#let figure-plate(id, caption, image-path, width: 100%) = figure(
  image(image-path, width: width),
  caption: [#text(fill: palette.amber)[#id] · #caption],
  placement: auto,
)

#let pill(label, tone: "amber") = {
  let color = if tone == "red" { palette.red }
    else if tone == "cyan" { palette.cyan }
    else if tone == "green" { palette.green }
    else { palette.amber }
  box(
    stroke: 0.5pt + color,
    fill: color.transparentize(85%),
    inset: (x: 4pt, y: 1pt),
    outset: (y: 1pt),
    radius: 1pt,
  )[#text(size: 8pt, fill: color, weight: "medium")[#upper(label)]]
}

#let stat(label, value, unit: none, tone: "amber") = {
  let color = if tone == "red" { palette.red }
    else if tone == "cyan" { palette.cyan }
    else { palette.amber }
  block[
    #text(size: 7.5pt, fill: palette.muted, tracking: 1pt)[#upper(label)] \
    #text(size: 16pt, fill: color, weight: "bold")[#value]
    #if unit != none { text(size: 9pt, fill: palette.dim)[ #unit] }
  ]
}

#let handwavium-pill(id) = pill(id, tone: "red")
#let dr-pill(id) = pill(id, tone: "cyan")
#let fmea-pill(id) = pill(id, tone: "amber")

// ---- CDR helpers (Phase 6 S6.4) ----

// `#cdr-callout(body)` highlights content authored at CDR depth that extends
// or supersedes a PDR claim. Renders a left-rule + light tinted block so the
// reader can quickly distinguish CDR-new material from PDR baseline.
#let cdr-callout(body) = block(
  fill: rgb("#4ec9b0").transparentize(92%),
  stroke: (left: 2pt + rgb("#4ec9b0")),
  inset: (x: 8pt, y: 6pt),
  width: 100%,
  body,
)

// `#two-col(body)` renders content in a 2-column layout, intended for
// tabular-heavy sections (FMEA, ICD interface tables, R/A/M registers)
// where single-column wastes horizontal space at A4 width. Body must
// be content; the caller is responsible for column-break-friendly layout.
#let two-col(body) = columns(2, gutter: 1em, body)

// `#icd-header(id, a-name, b-name)` renders a consistent ICD top-of-page
// header. Used in `docs/icd/ICD-NN-MM.md` instances. The `id` is the bare
// numeric pair (e.g. "03-04"); a-name and b-name are the subsystem labels.
#let icd-header(id, a-name, b-name) = block[
  #set text(font: "Chakra Petch", size: 11pt, fill: palette.amber, weight: "bold", tracking: 1pt)
  #upper("ICD-" + id)
  #h(0.7em)
  #text(fill: palette.cream, weight: "regular", size: 10pt)[#a-name #h(0.3em) ↔ #h(0.3em) #b-name]
  #v(0.2em)
  #line(length: 100%, stroke: 0.8pt + palette.amber)
]

// `#requirement-row(id, text, class)` renders a single requirement-row
// table cell with the verification-class badge in line. Class is one of
// "A" (Analysis), "I" (Inspection), "T" (Test-eligible), "C" (Concession).
#let requirement-row(id, text, class) = {
  let badge-color = if class == "C" { palette.red }
    else if class == "A" { palette.cyan }
    else if class == "I" { palette.amber }
    else if class == "T" { palette.green }
    else { palette.dim }
  [#text(fill: palette.amber, weight: "semibold")[#id] · #text · #pill(class, tone: if class == "C" { "red" } else if class == "A" { "cyan" } else if class == "T" { "green" } else { "amber" })]
}
