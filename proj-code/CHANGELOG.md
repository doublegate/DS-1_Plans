# CHANGELOG — proj-code/ vs code-artifacts/

**Latest synthesis:** 2026-04-22 (v1.1 refactor)
**Base references:** `code-artifacts/DS1-Engineering-Console.html`, `code-artifacts/ds1-engineering-console.tsx`
**Not included:** `code-artifacts/DS1-Engineering-Console.jsx` — functionally equivalent to the TSX but with residual bugs the TSX already fixed; the TSX is treated as the canonical source form.

---

## Final v1.0 — 2026-04-22

### Bug fixes

1. **Duplicate `opacity` attribute (SVG build-stage 3).**
   The JSX-era ring-frame `<g>` element had `opacity={...}` followed by `opacity="0.5"` on the same element — JSX-invalid and produced inconsistent rendering across React reconcilers.
   **Fix:** collapsed into a single expression `opacity={Math.min((buildProgress - 0.15) * 8 * 0.5, 0.5)}`.
   Applies to: `DS1-Engineering-Console.html` (TSX reference was already clean).

2. **Non-deterministic `Math.random()` during render (SVG build-stage 6).**
   The HTML reference mixed a non-deterministic weapon-speckle calculation (`const a = Math.random() * 2 * Math.PI; const r = sphereR * (0.5 + Math.random() * 0.35)`) with a separate seeded-deterministic path — the result was the speckle jumped on every render, and a dead variable `a` was defined but unused.
   **Fix:** replaced with fully seeded calculation:
   ```
   const seed = i * 2.39996;
   const ax = seed;
   const ay = seed * 1.618;
   const r = sphereR * (0.5 + ((i * 7) % 10) / 28);
   ```
   Applies to: `DS1-Engineering-Console.html` (TSX reference was already clean).

### Data model additions

3. **`HANDWAVIUM` table enriched.**
   Added `subsystem` (which subsystem doc in `../docs/` owns the concession) and `traces` (array of DR-IDs from the V&V matrix). Every existing HW-1..HW-10 entry augmented; no entries added or removed; no existing fields renamed.
   Applies to: both files.

4. **New `DERIVED_REQUIREMENTS` constant.**
   12 rows (DR-01..DR-12) mirroring `../docs/01-design-basis.md` §12 and `../docs/appendix-F-vnv-plan.md` §F.3. Each row: `id`, `text`, `sr` (source stakeholder requirement), `cls` (A/D/I/T/C), `refs`.
   Applies to: both files.

5. **New `FMEA_REGISTER` constant.**
   Top-10-RPN rows from `../docs/appendix-E-fmea.md` §E.2-E.3: mix of DS-1 (`E-01`..`E-10`) and DS-2 (`E-20`, `E-21`) failure modes. Each row: `id`, `item`, `mode`, `effect`, `s`/`o`/`d`/`rpn`, `mitigation`, `variant`.
   Applies to: both files.

6. **New `REAL_WORLD_2026` constant.**
   8 real-physics analog programs cited in the spec, with `thenStatus` (cited baseline) / `currentStatus` (as of April 2026) / `gap`. Programs: NIF, TAE p-B¹¹, Epirus Leonidas, HELIOS Mk 5 Mod 0, NASA Psyche, CERN ALPHA, Lentz soliton, NEXT-C. Reflects online research on 2025-2026 milestones (NIF 8.6 MJ record Apr 2025; TAE+NIFS p-B¹¹ in confined plasma Dec 2025; Leonidas AGV Mar 2026; Psyche Mars gravity assist May 2026).
   Applies to: both files.

### UI additions

7. **New `LedgerTab` component.**
   Added at the end of the component file (before `App`). Renders four cross-referenced sections:
   - **Handwavium Register** table — HW-1..HW-10 with subsystem ownership and DR traceability (gap markers highlighted amber for the HW-4/6/8/9 narrative-only entries).
   - **Derived Requirements (V&V Matrix)** 2-column grid — DR-01..DR-12 with verification-class badges (Concession / Analysis / Inspection); legend shows class counts (4 C / 6 A / 1 I / 1 T-eligible).
   - **FMEA Top-RPN Register** — horizontal-bar ranking of 10 failure modes, filterable by DS-1 / DS-2 / all; each row shows ID, item, mode → effect, mitigation, S/O/D/RPN.
   - **Real-World Analog Programs (as of 2026-04)** — 2-column card grid; each card shows program, cited subsystem, then-status → current-status → gap.
   Plus a closing panel explaining the ledger's role in Phase 4 S4.3 peer review.
   Uses only existing primitives (`Panel`, `SectionHeader`, `Pill`) and React `useState` for the FMEA variant filter.
   Applies to: both files.

8. **TABS array extended.**
   New entry: `{ id: 'ledger', label: 'Ledger', icon: Binary, code: 'HW/DR/FMEA' }`. Placed after Physics. Tab count: 8 → 9.
   Applies to: both files.

9. **Tab dispatcher extended.**
   `{tab === 'ledger' && <LedgerTab />}` added after the existing `physics` dispatch.
   Applies to: both files.

### Things deliberately NOT changed

- No changes to existing tabs (CommandTab, StructureTab, ConstructionTab, ReactorTab, DriveTab, DefenseTab, DS2Tab, PhysicsTab). The reference implementations are already well-structured and mature; deep modification would risk regressions without commensurate benefit at this stage.
- No changes to existing `THEME` colors. The dark-terminal palette is consistent across the console and matches the PDR register.
- No changes to the `StationDiagram` SVG geometry (beyond the bug fixes above). The 7-phase build progression is faithful to the ref-doc §1 and `../docs/02-structural-and-materials.md`.
- No changes to `ENERGY_COMPARISONS`, `REACTOR_OPTIONS`, `COST_BREAKDOWN`, `DS1_VS_DS2`, `VULNERABILITY_MATRIX`, `PROPULSION_DATA`, `ECLSS_DAILY`, `FIGHTER_COMPLEMENT`, `MASS_BUDGET`, `CREW_MANIFEST`, `CONSTRUCTION_PHASES`, `WEAPONS_DS1`, `WEAPONS_DS2`. These match the spec numerical baseline; any change requires a spec revision first.

### Deferred / future work

- **TypeScript types.** The `.tsx` file is still JSX-shaped (types implicit). Adding proper `interface` definitions for all 14 data-table shapes and the component props is a natural next step but deferred because it would not change runtime behavior and the spec uses the source illustratively.
- **Module split.** The `.tsx` is still a single file (~2,700 lines with additions). Splitting into `src/data/`, `src/tabs/`, `src/components/` is a refactor that preserves behavior and improves maintainability; deferred for the same reason.
- **Vite scaffold.** No `package.json`, `tsconfig.json`, `vite.config.ts`, or `index.html` added. The HTML file IS the distributable — developers wanting to work with the TSX source can drop it into any existing React project. A minimal Vite scaffold could be generated in a later phase if a full single-page app is desired.
- **Sources tab.** The `REAL_WORLD_2026` data includes natural-language citations; a dedicated sources panel with live links would be a useful Phase 4 addition.
- **Print stylesheet.** The console is screen-only; a print CSS would allow the Ledger tab in particular to be exported as PDF appendix material to sit alongside the main document PDF.

---

## Final v1.1 — 2026-04-22 (full refactor per user decision D-10)

### Scaffolding

- **Vite + React 18 + TypeScript** scaffold added: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`, `src/main.tsx`.
- `tsconfig.json` runs with `strict: false` plus `strictNullChecks: true` and `strictFunctionTypes: true` — pragmatic migration stance: strong types at data-table and component-prop boundaries, lenient on extracted-JSX tab bodies. Full strict is a future sprint.

### Module split

- **Monolithic `DS1-Engineering-Console.tsx` retired.** Replaced with a src/ tree of 35 files:
  - `src/theme.ts` (design tokens)
  - `src/types.ts` (TypeScript interfaces for all 14 data shapes + 7 component prop shapes + TabDef / TabPropsWithFiring)
  - `src/hooks/useCountUp.ts`
  - `src/styles/global.css` + `src/styles/print.css`
  - `src/data/` — 16 per-table modules + `index.ts` barrel
  - `src/components/` — 7 primitives + `index.ts` barrel (added `RadialGauge` back from the JSX reference)
  - `src/tabs/` — 9 tab modules + `index.ts` barrel
  - `src/App.tsx` — top-level orchestrator

### Types at boundaries

- Every data table has a typed interface in `types.ts` (`MassBudgetRow`, `HandwaviumEntry`, `FmeaRow`, `RealWorldProgram`, etc.).
- Every component primitive has a typed props interface (`PanelProps`, `StatBlockProps`, `StationDiagramProps`, etc.).
- Verification-class union type (`'A' | 'D' | 'I' | 'T' | 'C'`) prevents illegal class strings in DR rows.
- FMEA `variant` constrained to `'DS-1' | 'DS-2'` literals.

### Print stylesheet

- New `src/styles/print.css` swaps the dark palette to a print-safe one on `@media print`, preserves table structure, hides nav / interactive chrome, renders pills as bordered text, adds a small page header. Primary target: exporting the Ledger tab as a PDF appendix that sits alongside the Typst-built main spec.

### Data updates propagated

- HANDWAVIUM `traces` field stripped of `(gap)` markers — every HW-ID now traces to an explicit DR after Phase 2 S2.4 closure (adds DR-13..DR-16 for waste-heat / recoil / gravity / tractor).
- Ledger tab legend updated: Concession 8/16 · Analysis 6/16 · Inspection 1/16 · 8 programs tracked (was 4/12 · 6/12 · 1/12 · 7 programs).

### CDN distributable retained

- `DS1-Engineering-Console.html` remains in place as the zero-install artifact. Updated to reflect the same Phase 2 S2.4 data changes as the Vite source.

### Files deleted

- `proj-code/DS1-Engineering-Console.tsx` (replaced by `src/` tree)

### Deferred items now resolved (from v1.0 CHANGELOG "Deferred / future work")

- [x] Real TypeScript types — types.ts boundary-typed
- [x] Module split — 35 files under src/
- [x] Vite scaffold — package.json / tsconfig / vite.config / index.html / main.tsx all present
- [x] Print stylesheet — src/styles/print.css

### Still deferred

- **Full strict TypeScript.** Tab bodies retain implicit-any for callback params and inline handlers. Tightening would require threading types through ~2,000 lines of JSX; scheduled as a cleanup sprint.
- **Unit / smoke tests.** No testing harness yet; would be the natural next sprint after Phase 3 figure iteration.
- **Sources panel with live links** in the Ledger tab (currently just natural-language citations).

---

## Final v1.0 — 2026-04-22 (initial synthesis)

### Bug fixes

1. **Duplicate `opacity` attribute (SVG build-stage 3).**
   The JSX-era ring-frame `<g>` element had `opacity={...}` followed by `opacity="0.5"` on the same element — JSX-invalid and produced inconsistent rendering across React reconcilers.
   **Fix:** collapsed into a single expression `opacity={Math.min((buildProgress - 0.15) * 8 * 0.5, 0.5)}`.
   Applies to: `DS1-Engineering-Console.html` (TSX reference was already clean).

2. **Non-deterministic `Math.random()` during render (SVG build-stage 6).**
   The HTML reference mixed a non-deterministic weapon-speckle calculation with a separate seeded-deterministic path — the result was the speckle jumped on every render, and a dead variable `a` was defined but unused.
   **Fix:** replaced with fully seeded calculation using index-based seeds.
   Applies to: `DS1-Engineering-Console.html` (TSX reference was already clean).

### Data model additions

3. **`HANDWAVIUM` enriched** with `subsystem` and `traces` fields.
4. **New `DERIVED_REQUIREMENTS`** constant (12 rows, later extended to 16 in v1.1).
5. **New `FMEA_REGISTER`** constant (top-10 RPN).
6. **New `REAL_WORLD_2026`** constant (8 programs with April 2026 currency).

### UI additions

7. **New `LedgerTab` component** — four cross-referenced sections (HW table / DR matrix / FMEA ranking / real-world analog cards).
8. **TABS array extended** — 8 → 9 tabs.

---

## Reference commit history

The reference files in `../code-artifacts/` represent their own prior evolution (HTML ← JSX ← TSX cleanup) which is out of scope for this ledger.
