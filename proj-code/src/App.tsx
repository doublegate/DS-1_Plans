import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Activity, Layers, Building2, Flame, Rocket, Shield,
  Hexagon, Atom, Binary, BookOpen, Printer,
} from 'lucide-react';
import { THEME } from './theme';
import { ScannerLine, GlossaryDrawer } from './components';
import {
  CommandTab, StructureTab, ConstructionTab, ReactorTab,
  DriveTab, DefenseTab, DS2Tab, PhysicsTab, LedgerTab,
} from './tabs';
import type { TabDef, TabId, NavigateFn } from './types';

// =============================================================================
// DS-1 ORBITAL BATTLE STATION — MAIN APP
// Top-level orchestrator: URL-hash synced tab switcher, WAI-ARIA tablist,
// superlaser firing state, nomenclature glossary drawer, and A4 print trigger.
// Source: docs/00-abstract-and-scope.md through docs/12-ds2-delta-specification.md
// Companion artifact to the Typst-built PDF produced by ../typeset/build.sh
// =============================================================================

const TABS: readonly TabDef[] = [
  { id: 'command',      label: 'Command',       icon: Activity,  code: '§00–01',   group: 'Overview' },
  { id: 'structure',    label: 'Structure',     icon: Layers,    code: '§02',      group: 'Subsystems' },
  { id: 'construction', label: 'Construction',  icon: Building2, code: '§02.5',    group: 'Subsystems' },
  { id: 'reactor',      label: 'Reactor',       icon: Flame,     code: '§03–04',   group: 'Subsystems' },
  { id: 'drive',        label: 'Drive & ECLSS', icon: Rocket,    code: '§05–06',   group: 'Subsystems' },
  { id: 'defense',      label: 'Defense',       icon: Shield,    code: '§07–09',   group: 'Subsystems' },
  { id: 'physics',      label: 'Physics',       icon: Atom,      code: '§10–11',   group: 'Verification & Delta' },
  { id: 'ds2',          label: 'DS-2 Delta',    icon: Hexagon,   code: '§12 / A2', group: 'Verification & Delta' },
  { id: 'ledger',       label: 'Ledger',        icon: Binary,    code: 'Appx B–F', group: 'Verification & Delta' },
];

const VALID_TAB_IDS = new Set<string>(TABS.map(t => t.id));

function parseHash(hashStr: string): { tab: TabId; focusId: string | null } {
  const cleaned = hashStr.replace(/^#/, '').trim();
  if (!cleaned) return { tab: 'command', focusId: null };
  const [rawTab, rawFocus] = cleaned.split(':');
  const tab = VALID_TAB_IDS.has(rawTab) ? (rawTab as TabId) : 'command';
  return { tab, focusId: rawFocus ? decodeURIComponent(rawFocus) : null };
}

export default function App() {
  const initial = typeof window !== 'undefined' ? parseHash(window.location.hash) : { tab: 'command' as TabId, focusId: null };
  const [tab, setTab] = useState<TabId>(initial.tab);
  const [focusId, setFocusId] = useState<string | null>(initial.focusId);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [firing, setFiring] = useState(0);
  const firingRaf = useRef<number | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const navigate: NavigateFn = useCallback((nextTab, nextFocus) => {
    setTab(nextTab);
    setFocusId(nextFocus ?? null);
    if (typeof window !== 'undefined') {
      const nextHash = nextFocus ? `#${nextTab}:${encodeURIComponent(nextFocus)}` : `#${nextTab}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, '', nextHash);
      }
      if (!nextFocus) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHash(window.location.hash);
      setTab(parsed.tab);
      setFocusId(parsed.focusId);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Superlaser firing animation sequencer
  const startFire = useCallback(() => {
    if (firing > 0) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setFiring(0.75);
      setTimeout(() => setFiring(0), 1200);
      return;
    }
    const start = performance.now();
    const step = (t: number) => {
      const dt = (t - start) / 1000;
      const f = Math.min(dt / 3.5, 1);
      setFiring(f);
      if (f < 1) firingRaf.current = requestAnimationFrame(step);
      else {
        setTimeout(() => setFiring(0), 800);
      }
    };
    firingRaf.current = requestAnimationFrame(step);
  }, [firing]);

  useEffect(() => () => {
    if (firingRaf.current !== null) cancelAnimationFrame(firingRaf.current);
  }, []);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = TABS.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const targetTab = TABS[nextIdx];
      navigate(targetTab.id);
      tabRefs.current[targetTab.id]?.focus();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: THEME.bg, color: THEME.text, fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Top command bar */}
      <header
        style={{
          background: THEME.surface,
          borderBottom: `1px solid ${THEME.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="px-4 md:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
                <circle cx="18" cy="18" r="16" fill="none" stroke={THEME.amber} strokeWidth="1.5" />
                <circle cx="12" cy="14" r="3" fill="none" stroke={THEME.amber} strokeWidth="1" />
                <line x1="2" y1="18" x2="34" y2="18" stroke={THEME.amber} strokeWidth="0.6" />
                <circle cx="18" cy="18" r="2" fill={THEME.amber}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <div>
              <h1
                className="text-lg md:text-xl tracking-wider m-0"
                style={{ color: THEME.text, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600, letterSpacing: '0.08em' }}
              >
                DS-1 ORBITAL BATTLE STATION
              </h1>
              <div
                className="text-[11px] tracking-[0.22em] uppercase"
                style={{ color: THEME.amber, fontFamily: "'Chakra Petch', sans-serif" }}
              >
                Engineering Specification · Interactive Telemetry &amp; Traceability Console
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-4 text-xs mr-2" style={{ color: THEME.textMuted }}>
              <div className="flex items-center gap-1.5">
                <div style={{ width: 6, height: 6, background: THEME.green, animation: 'pulse 2s infinite' }} />
                <span>LINK ACTIVE</span>
              </div>
              <div>SECTOR · HORUZ / DESPAYRE</div>
              <div style={{ color: THEME.amber }}>PDR v0.2 / CDR v0.3-RC</div>
            </div>

            <button
              type="button"
              onClick={() => setGlossaryOpen(true)}
              className="no-print inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
              style={{
                background: THEME.panel,
                color: THEME.cyan,
                border: `1px solid ${THEME.cyan}60`,
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Open Nomenclature & Verification Class Glossary (Appendix B & F)"
            >
              <BookOpen size={13} />
              <span>GLOSSARY · APPX B</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="no-print hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider transition-colors"
              style={{
                background: THEME.panel,
                color: THEME.amber,
                border: `1px solid ${THEME.border}`,
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
              }}
              title="Print current view as A4 Engineering Dossier"
            >
              <Printer size={13} />
              <span>PRINT A4</span>
            </button>
          </div>
        </div>
        <ScannerLine />
      </header>

      {/* Clustered Tab Navigation with WAI-ARIA tablist semantics */}
      <nav
        aria-label="Specification Subsystem Views"
        className="px-4 md:px-6 py-2 max-w-[1800px] mx-auto overflow-x-auto"
        style={{ background: THEME.surface, borderBottom: `1px solid ${THEME.border}` }}
      >
        <div role="tablist" aria-orientation="horizontal" className="flex items-center gap-1">
          {TABS.map((t, idx) => {
            const Icon = t.icon;
            const active = tab === t.id;
            const prevGroup = idx > 0 ? TABS[idx - 1].group : t.group;
            const showDivider = idx > 0 && prevGroup !== t.group;
            return (
              <React.Fragment key={t.id}>
                {showDivider && (
                  <div
                    aria-hidden="true"
                    className="mx-1.5 h-6"
                    style={{ width: 1, background: THEME.borderHi, flexShrink: 0 }}
                  />
                )}
                <button
                  ref={el => {
                    tabRefs.current[t.id] = el;
                  }}
                  id={`tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`tabpanel-${t.id}`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => navigate(t.id)}
                  onKeyDown={e => handleTabKeyDown(e, idx)}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs tracking-widest uppercase whitespace-nowrap transition-colors"
                  style={{
                    background: active ? THEME.panel : 'transparent',
                    color: active ? THEME.amber : THEME.textMuted,
                    border: `1px solid ${active ? THEME.amber : 'transparent'}`,
                    borderBottom: active ? `2px solid ${THEME.amber}` : '1px solid transparent',
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontWeight: active ? 600 : 500,
                    cursor: 'pointer',
                  }}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{t.label}</span>
                  <span
                    className="text-[11px] ml-1 px-1 py-0.2"
                    style={{
                      color: active ? THEME.amber : THEME.textDim,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {t.code}
                  </span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      </nav>

      {/* Main content tabpanel */}
      <main
        id={`tabpanel-${tab}`}
        role="tabpanel"
        aria-labelledby={`tab-${tab}`}
        className="px-4 md:px-6 py-6 max-w-[1800px] mx-auto"
      >
        {tab === 'command' && <CommandTab firing={firing} startFire={startFire} onNavigate={navigate} focusId={focusId} />}
        {tab === 'structure' && <StructureTab onNavigate={navigate} focusId={focusId} />}
        {tab === 'construction' && <ConstructionTab onNavigate={navigate} focusId={focusId} />}
        {tab === 'reactor' && <ReactorTab firing={firing} startFire={startFire} onNavigate={navigate} focusId={focusId} />}
        {tab === 'drive' && <DriveTab onNavigate={navigate} focusId={focusId} />}
        {tab === 'defense' && <DefenseTab onNavigate={navigate} focusId={focusId} />}
        {tab === 'ds2' && <DS2Tab onNavigate={navigate} focusId={focusId} />}
        {tab === 'physics' && <PhysicsTab onNavigate={navigate} focusId={focusId} />}
        {tab === 'ledger' && <LedgerTab onNavigate={navigate} focusId={focusId} />}
      </main>

      {/* Nomenclature & V&V Glossary Drawer */}
      <GlossaryDrawer
        open={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
        onNavigate={navigate}
      />

      {/* Footer */}
      <footer style={{ background: THEME.surface, borderTop: `1px solid ${THEME.border}` }} className="mt-12">
        <ScannerLine color={THEME.border} />
        <div className="px-6 py-6 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                CANON &amp; LEGENDS AUTHORITY
              </div>
              <ul className="text-xs space-y-1" style={{ color: THEME.textMuted }}>
                <li>Wookieepedia (Canon + Legends baselines)</li>
                <li>Death Star Technical Companion (WEG 40008)</li>
                <li>Star Wars: Incredible Cross-Sections (DK)</li>
                <li>Catalyst (Luceno) &amp; Rogue One UVG (DK)</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                PHYSICS &amp; ECONOMIC MODELS
              </div>
              <ul className="text-xs space-y-1" style={{ color: THEME.textMuted }}>
                <li>Lehigh / Centives steel feedstock analysis</li>
                <li>Feinstein (2015) arXiv:1511.09054</li>
                <li>Lentz (2021) Class. Quantum Grav. 38</li>
                <li>Bobrick &amp; Martire (2021) arXiv:2102.06824</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                EMPIRICAL ANALOG PROGRAMS
              </div>
              <ul className="text-xs space-y-1" style={{ color: THEME.textMuted }}>
                <li>LLNL NIF (8.6 MJ ignition) &amp; TAE p-¹¹B</li>
                <li>AFRL MARAUDER / Shiva Star compact toroids</li>
                <li>Epirus Leonidas IFPC-HPM &amp; USN HELIOS Mk 5</li>
                <li>NASA Psyche (2026 Mars assist) &amp; NEXT-C</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                SPECIFICATION PACKAGE
              </div>
              <ul className="text-xs space-y-1" style={{ color: THEME.textMuted }}>
                <li>13 PDR sections + 8 appendices (74-p Typst PDF)</li>
                <li>Bidirectional HW-1..10 × DR-01..16 × FMEA ledger</li>
                <li>Interactive coupling &amp; thermal trade-study engine</li>
                <li>URL-hash deep-linking &amp; A4 print dossier export</li>
              </ul>
            </div>
          </div>
          <div
            className="mt-6 pt-4 text-xs flex flex-col md:flex-row justify-between gap-2"
            style={{ borderTop: `1px solid ${THEME.border}`, color: THEME.textDim }}
          >
            <div>Specification reference: DS-1 Orbital Battle Station · Preliminary/Critical Design Review Package (CC-BY-NC-4.0)</div>
            <div style={{ color: THEME.amber }}>For systems-engineering study purposes only · No recommendation to construct</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
