#!/usr/bin/env node
/**
 * Synchronizes proj-code/DS1-Engineering-Console.html from the authoritative
 * proj-code/src/ TypeScript/React module tree (closes Risk R-6 in PROJECT-STATUS.md).
 *
 * Uses TypeScript's compiler API (jsx: Preserve) to strip TypeScript syntax while
 * preserving readable JSX, and pins @babel/standalone@7.26.9 so in-browser classic
 * <script type="text/babel" data-presets="react"> never triggers Babel 8's
 * ES-module react/jsx-runtime import error.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const OUT_HTML = path.join(ROOT, 'DS1-Engineering-Console.html');

const SOURCE_ORDER = [
  'theme.ts',
  'hooks/useCountUp.ts',
  'data/massBudget.ts',
  'data/crewManifest.ts',
  'data/weapons.ts',
  'data/constructionPhases.ts',
  'data/energyComparisons.ts',
  'data/reactorOptions.ts',
  'data/handwavium.ts',
  'data/derivedRequirements.ts',
  'data/fmea.ts',
  'data/realWorld2026.ts',
  'data/costBreakdown.ts',
  'data/ds1VsDs2.ts',
  'data/vulnerability.ts',
  'data/propulsion.ts',
  'data/eclss.ts',
  'data/fighterComplement.ts',
  'data/glossaryAndSources.ts',
  'components/Panel.tsx',
  'components/StatBlock.tsx',
  'components/SectionHeader.tsx',
  'components/Pill.tsx',
  'components/RadialGauge.tsx',
  'components/ScannerLine.tsx',
  'components/StationDiagram.tsx',
  'components/GlossaryDrawer.tsx',
  'tabs/CommandTab.tsx',
  'tabs/StructureTab.tsx',
  'tabs/ConstructionTab.tsx',
  'tabs/ReactorTab.tsx',
  'tabs/DriveTab.tsx',
  'tabs/DefenseTab.tsx',
  'tabs/DS2Tab.tsx',
  'tabs/PhysicsTab.tsx',
  'tabs/LedgerTab.tsx',
  'App.tsx',
];

function stripImportsAndExports(tsCode, filename) {
  const transpiled = ts.transpileModule(tsCode, {
    fileName: filename,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: false,
    },
  }).outputText;

  return transpiled
    // Remove ES import statements (multiline and single-line)
    .replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^\s*import\s+['"][^'"]+['"];?\s*$/gm, '')
    // Convert `export default function App` -> `function App`
    .replace(/^\s*export\s+default\s+function\s+/gm, 'function ')
    // Convert `export const` / `export function` -> `const` / `function`
    .replace(/^\s*export\s+(const|let|var|function)\s+/gm, '$1 ')
    // Remove trailing `export { ... }` lines
    .replace(/^\s*export\s*\{[^}]*\};?\s*$/gm, '')
    .trim();
}

const globalCss = fs.readFileSync(path.join(SRC, 'styles/global.css'), 'utf8');
const printCss = fs.readFileSync(path.join(SRC, 'styles/print.css'), 'utf8');

const iconShim = `
// ---- Inline SVG icon components (lucide-react shim for standalone HTML) ----
const _I = (pathDef, vb = "0 0 24 24") => ({ size = 16, color = "currentColor", style = {}, strokeWidth = 2, ...rest }) =>
  React.createElement("svg", {
    width: size, height: size, viewBox: vb, fill: "none",
    stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
    style, ...rest,
  }, typeof pathDef === "string"
      ? React.createElement("path", { d: pathDef })
      : pathDef.map((p, i) => React.createElement(p.t || "path", { key: i, ...p })));

const Activity = _I([{ t: "polyline", points: "22 12 18 12 15 21 9 3 6 12 2 12" }]);
const Layers = _I([{ t: "polygon", points: "12 2 2 7 12 12 22 7 12 2" }, { t: "polyline", points: "2 17 12 22 22 17" }, { t: "polyline", points: "2 12 12 17 22 12" }]);
const Building2 = _I([{ d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }, { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }, { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }, { d: "M10 6h4M10 10h4M10 14h4M10 18h4" }]);
const Flame = _I("M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z");
const Rocket = _I([{ d: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" }, { d: "m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" }, { d: "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" }, { d: "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" }]);
const Shield = _I("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z");
const Hexagon = _I("M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z");
const Atom = _I([{ t: "circle", cx: "12", cy: "12", r: "1" }, { d: "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" }, { d: "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" }]);
const Binary = _I([{ t: "rect", x: "14", y: "14", width: "4", height: "6", rx: "2" }, { t: "rect", x: "6", y: "4", width: "4", height: "6", rx: "2" }, { d: "M6 20h4M14 10h4M6 14h2v6M14 4h2v6" }]);
const AlertTriangle = _I([{ d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }, { d: "M12 9v4M12 17h.01" }]);
const Settings = _I([{ t: "circle", cx: "12", cy: "12", r: "3" }, { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" }]);
const ChevronRight = _I([{ t: "polyline", points: "9 18 15 12 9 6" }]);
const Play = _I([{ t: "polygon", points: "5 3 19 12 5 21 5 3" }]);
const Pause = _I([{ t: "rect", x: "6", y: "4", width: "4", height: "16" }, { t: "rect", x: "14", y: "4", width: "4", height: "16" }]);
const RotateCcw = _I([{ d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }, { d: "M3 3v5h5" }]);
const Skull = _I([{ t: "circle", cx: "9", cy: "12", r: "1" }, { t: "circle", cx: "15", cy: "12", r: "1" }, { d: "M8 20v2h8v-2M12.5 17l-.5-1-.5 1h1z" }, { d: "M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20" }]);
const Search = _I([{ t: "circle", cx: "11", cy: "11", r: "8" }, { d: "m21 21-4.3-4.3" }]);
const AlertOctagon = _I([{ t: "polygon", points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" }, { d: "M12 8v4M12 16h.01" }]);
const BookOpen = _I([{ d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" }, { d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" }]);
const Printer = _I([{ t: "polyline", points: "6 9 6 2 18 2 18 9" }, { d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" }, { t: "rect", x: "6", y: "14", width: "12", height: "8" }]);
const ExternalLink = _I([{ d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }, { t: "polyline", points: "15 3 21 3 21 9" }, { d: "M10 14 21 3" }]);
const Sliders = _I([{ d: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" }]);
`.trim();

const sections = SOURCE_ORDER.map(relPath => {
  const fullPath = path.join(SRC, relPath);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const cleaned = stripImportsAndExports(raw, relPath);
  return `// ============================================================================
// SOURCE: src/${relPath}
// ============================================================================
${cleaned}`;
}).join('\n\n');

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>DS-1 Orbital Battle Station — Interactive Engineering Console</title>
  <meta name="description" content="Interactive PDR/CDR engineering console for the DS-1 Orbital Battle Station specification." />

  <!-- Google Fonts: Chakra Petch + JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

  <!-- Tailwind (Play CDN) -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- React 18 + ReactDOM 18 UMD builds -->
  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>

  <!-- PropTypes needed by Recharts UMD -->
  <script crossorigin src="https://unpkg.com/prop-types@15.8.1/prop-types.min.js"></script>

  <!-- Recharts UMD (exposes window.Recharts) -->
  <script crossorigin src="https://unpkg.com/recharts@2.12.7/umd/Recharts.js"></script>

  <!-- Pinned Babel 7 Standalone (avoids Babel 8 ES-module jsx-runtime import crash) -->
  <script crossorigin src="https://unpkg.com/@babel/standalone@7.26.9/babel.min.js"></script>

  <style>
${globalCss}

${printCss}
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel" data-presets="react">
    const { useState, useEffect, useMemo, useRef, useCallback } = React;

    const {
      BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
      PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, XAxis, YAxis,
      CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
      ComposedChart, ScatterChart, Scatter, ZAxis
    } = Recharts;

${iconShim}

${sections}

    const rootEl = document.getElementById('root');
    if (ReactDOM.createRoot) {
      ReactDOM.createRoot(rootEl).render(<App />);
    } else {
      ReactDOM.render(<App />, rootEl);
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(OUT_HTML, html, 'utf8');
console.log(`[sync-standalone-html] Wrote ${OUT_HTML} (${(html.length / 1024).toFixed(1)} KB) from ${SOURCE_ORDER.length} src/ modules.`);
