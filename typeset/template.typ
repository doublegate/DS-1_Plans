// =============================================================================
// DS-1 Orbital Battle Station — Engineering Specification
// Typst template. See ./main.typ for entry point.
// Palette matches docs/appendix-B-nomenclature.md and the console in proj-code/.
// =============================================================================

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
  // Page setup — A4 with generous margins; PDR register
  set document(title: title, author: "DS-1 Plans project")
  set page(
    paper: "a4",
    margin: (top: 2.5cm, bottom: 2.5cm, left: 2.5cm, right: 2.5cm),
    fill: palette.bg,
    numbering: "1 / 1",
    number-align: right,
    header: context {
      if counter(page).get().first() > 1 [
        #set text(size: 8pt, fill: palette.dim, font: "JetBrains Mono")
        #title #h(1fr) #subtitle
        #line(length: 100%, stroke: 0.3pt + palette.border)
      ]
    },
  )

  // Typography — monospace-first engineering register
  set text(
    font: ("JetBrains Mono", "IBM Plex Mono", "DejaVu Sans Mono", "Menlo"),
    size: 10pt,
    fill: palette.text,
    lang: "en",
  )
  set par(justify: true, leading: 0.65em, first-line-indent: 0pt)

  // Heading hierarchy
  show heading.where(level: 1): it => {
    pagebreak(weak: true)
    v(1em)
    block(fill: palette.amber, inset: (x: 6pt, y: 3pt))[
      #set text(fill: palette.bg, weight: "bold", size: 14pt, font: "Chakra Petch")
      #it.body
    ]
    v(0.6em)
    line(length: 100%, stroke: 1pt + palette.amber)
    v(0.5em)
  }
  show heading.where(level: 2): it => {
    v(1em)
    set text(fill: palette.amber, weight: "semibold", size: 12pt, font: "Chakra Petch")
    it.body
    v(0.3em)
    line(length: 30%, stroke: 0.5pt + palette.amber)
  }
  show heading.where(level: 3): it => {
    v(0.6em)
    set text(fill: palette.cyan, weight: "semibold", size: 10.5pt, font: "Chakra Petch")
    it.body
  }
  show heading.where(level: 4): it => {
    v(0.3em)
    set text(fill: palette.cream, weight: "semibold", size: 10pt)
    it.body
  }

  // Tables
  set table(
    stroke: 0.3pt + palette.border,
    inset: (x: 6pt, y: 4pt),
  )
  show table.cell.where(y: 0): set text(weight: "bold", fill: palette.amber, size: 9pt)

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

  // ---- Table of contents ----
  set page(margin: (top: 2.5cm, bottom: 2.5cm, left: 2.5cm, right: 2.5cm))
  {
    set text(fill: palette.text, size: 10pt)
    heading(level: 1, numbering: none)[Contents]
    outline(title: none, indent: auto, depth: 3)
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
