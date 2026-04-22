# proj-code — DS-1 Engineering Console (Final v1.1)

**Status:** Final v1.1, 2026-04-22 (refactored to Vite + TypeScript module tree)
**Reference:** synthesized from `../code-artifacts/` + enhancements from `../docs/` and `../to-dos/`

---

## What this is

An interactive engineering console for the DS-1 Orbital Battle Station specification. Companion to the PDR markdown document tree in `../docs/` — not a replacement. Features:

- **Station SVG** — animated 520-px cutaway with 7-phase build sequence and firing animation
- **Nine tabs:** Command, Structure, Construction, Reactor, Drive & ECLSS, Defense, DS-2 Appendix, Physics, and **Ledger** (cross-references HW-1..HW-10 × DR-01..DR-16 × top-10 FMEA × real-world programs current to April 2026)
- **Print stylesheet** for exporting the Ledger tab as a PDF appendix that sits alongside the Typst-built main spec

## Two distribution paths

| Path | Artifact | Use when |
|---|---|---|
| **CDN distributable** | `DS1-Engineering-Console.html` | You want zero-install review in a browser |
| **Vite source** | `src/` tree + `package.json` | You want to modify, bundle, or host |

The CDN HTML remains the portable artifact; the Vite source is the authoritative edit target going forward.

## Directory layout

```
proj-code/
├── DS1-Engineering-Console.html   # CDN distributable (self-contained)
├── index.html                     # Vite entry (development / production build)
├── package.json                   # npm deps for Vite source
├── tsconfig.json                  # TypeScript config (strict on boundaries, loose on bodies)
├── vite.config.ts                 # Vite build config
├── README.md                      # this file
├── CHANGELOG.md                   # diff ledger vs code-artifacts/
└── src/
    ├── main.tsx                   # Vite root (renders <App />)
    ├── App.tsx                    # top-level orchestrator (tab switcher, firing state, footer)
    ├── theme.ts                   # design tokens — single source of palette
    ├── types.ts                   # TypeScript interfaces for every data shape and component prop
    ├── hooks/
    │   └── useCountUp.ts          # animated counter hook
    ├── styles/
    │   ├── global.css             # body, animations, recharts overrides, focus ring
    │   └── print.css              # print-ready export (Ledger tab → PDF)
    ├── data/                      # 16 single-table modules + barrel index.ts
    │   ├── massBudget.ts          // mass fractions
    │   ├── crewManifest.ts
    │   ├── weapons.ts             // DS-1 + DS-2
    │   ├── constructionPhases.ts  // 7-phase build
    │   ├── energyComparisons.ts
    │   ├── reactorOptions.ts
    │   ├── handwavium.ts          // HW-1..HW-10
    │   ├── derivedRequirements.ts // DR-01..DR-16
    │   ├── fmea.ts                // top-10 RPN
    │   ├── realWorld2026.ts       // current-status analogs
    │   ├── costBreakdown.ts
    │   ├── ds1VsDs2.ts
    │   ├── vulnerability.ts
    │   ├── propulsion.ts
    │   ├── eclss.ts
    │   └── fighterComplement.ts
    ├── components/                // 7 UI primitives + barrel index.ts
    │   ├── Panel.tsx
    │   ├── StatBlock.tsx
    │   ├── SectionHeader.tsx
    │   ├── Pill.tsx
    │   ├── RadialGauge.tsx
    │   ├── ScannerLine.tsx
    │   └── StationDiagram.tsx     // 245-line SVG with build/firing stages
    └── tabs/                      // 9 tabs + barrel index.ts
        ├── CommandTab.tsx
        ├── StructureTab.tsx
        ├── ConstructionTab.tsx
        ├── ReactorTab.tsx
        ├── DriveTab.tsx
        ├── DefenseTab.tsx
        ├── DS2Tab.tsx
        ├── PhysicsTab.tsx
        └── LedgerTab.tsx
```

## How to use

### As a reviewer (zero install)

Open `DS1-Engineering-Console.html` in any modern browser, or serve over HTTP:

```
python3 -m http.server 8000
# visit http://localhost:8000/DS1-Engineering-Console.html
```

The CDN assets (React 18, Recharts, Tailwind, Babel) load on first visit and are cached after.

### As a developer (Vite source)

```
cd proj-code
npm install         # or: bun install / pnpm install
npm run dev         # http://localhost:5173 — hot reload
npm run build       # bundled output → ../dist/proj-code/
npm run typecheck   # tsc --noEmit
```

### Printing the Ledger tab as a PDF appendix

From the dev build, navigate to the Ledger tab, then Cmd/Ctrl-P. The print stylesheet switches to a print-safe palette (white background, black borders, bordered pills instead of color fills) and gives you a clean portrait-A4 export.

## TypeScript strictness note

`tsconfig.json` runs with `"strict": false` but `"strictNullChecks": true` and `"strictFunctionTypes": true`. This keeps type safety at the data-table and component-prop boundaries (where it matters most) while tolerating the looser typing in tab bodies — a pragmatic migration stance for a codebase that came in as ~2,500 lines of JSX. Full strict mode is a future sprint.

## Numerical baseline (must match spec)

All numbers match `../docs/01-design-basis.md`:

- Diameter: 120 km (DS-1), 160 km (DS-2)
- Mass: 1.0 × 10¹⁸ kg (DS-1) · 2.37 × 10¹⁸ kg (DS-2; see `../docs/appendix-A2-*.md`)
- Shot energy: 2.24 × 10³² J
- Sustained reactor: 2.6 × 10²⁷ W (DS-1)
- Hypermatter specific energy: 9 × 10¹⁶ J/kg (= c²)
- Crew: 1.7 × 10⁶ (DS-1) · 637,835 (DS-2)
- Recharge: ~24 h (DS-1) · ~3-5 min (DS-2)

Any edit to these in the console must be propagated to the spec, and vice versa. The `data/` modules are where to look.

## Relationship to the rest of the project

| Directory | Purpose |
|---|---|
| `../ref-docs/` | Source authority markdown |
| `../docs/` | Derived PDR document tree |
| `../to-dos/` | Phase plan + sprint backlog |
| `../code-artifacts/` | Reference HTML / JSX / TSX (do not modify) |
| `../typeset/` | Typst build for the published PDF |
| `../proj-code/` | **This directory — interactive companion** |
