import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, Layers, Building2, Flame, Rocket, Shield,
  Hexagon, Atom, Binary,
} from 'lucide-react';
import { THEME } from './theme';
import { ScannerLine } from './components';
import {
  CommandTab, StructureTab, ConstructionTab, ReactorTab,
  DriveTab, DefenseTab, DS2Tab, PhysicsTab, LedgerTab,
} from './tabs';
import type { TabDef } from './types';

// =============================================================================
// DS-1 ORBITAL BATTLE STATION — MAIN APP
// Top-level orchestrator: tab switcher, superlaser firing state, footer.
// Source: docs/00-abstract-and-scope.md through docs/12-ds2-delta-specification.md
// Companion artifact to the Typst-built PDF produced by ../typeset/build.sh
// =============================================================================

export default function App() {
  const [tab, setTab] = useState('command');
  const [firing, setFiring] = useState(0);
  const firingRaf = useRef(null);

  // Superlaser firing animation sequencer
  const startFire = () => {
    if (firing > 0) return;
    const start = performance.now();
    const step = (t) => {
      const dt = (t - start) / 1000; // s
      const f = Math.min(dt / 3.5, 1); // 3.5 s sequence
      setFiring(f);
      if (f < 1) firingRaf.current = requestAnimationFrame(step);
      else {
        setTimeout(() => setFiring(0), 800);
      }
    };
    firingRaf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => firingRaf.current && cancelAnimationFrame(firingRaf.current), []);

  const TABS = [
    { id: 'command', label: 'Command', icon: Activity, code: '§0' },
    { id: 'structure', label: 'Structure', icon: Layers, code: '§1' },
    { id: 'construction', label: 'Construction', icon: Building2, code: '§3' },
    { id: 'reactor', label: 'Reactor', icon: Flame, code: '§2-3' },
    { id: 'drive', label: 'Drive & ECLSS', icon: Rocket, code: '§4-5' },
    { id: 'defense', label: 'Defense', icon: Shield, code: '§6' },
    { id: 'ds2', label: 'DS-2 Appendix', icon: Hexagon, code: 'Appx A' },
    { id: 'physics', label: 'Physics', icon: Atom, code: '§9-10' },
    { id: 'ledger', label: 'Ledger', icon: Binary, code: 'HW/DR/FMEA' },
  ];

  return (
    <div className="min-h-screen" style={{ background: THEME.bg, color: THEME.text, fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Embed fonts + global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

        @keyframes scanMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        body {
          background: ${THEME.bg};
          font-family: 'JetBrains Mono', monospace;
        }
        * {
          box-sizing: border-box;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${THEME.panel};
        }
        ::-webkit-scrollbar-thumb {
          background: ${THEME.border};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${THEME.amber};
        }
        input[type=range] {
          -webkit-appearance: none;
          background: ${THEME.panel};
          border: 1px solid ${THEME.border};
          height: 4px;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: ${THEME.amber};
          cursor: pointer;
          border: 2px solid ${THEME.bg};
          box-shadow: 0 0 8px ${THEME.amber};
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: ${THEME.amber};
          cursor: pointer;
          border: 2px solid ${THEME.bg};
          box-shadow: 0 0 8px ${THEME.amber};
        }
      `}</style>

      {/* Top command bar */}
      <header
        style={{
          background: THEME.surface,
          borderBottom: `1px solid ${THEME.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            {/* Logo mark */}
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke={THEME.amber} strokeWidth="1.5" />
                <circle cx="12" cy="14" r="3" fill="none" stroke={THEME.amber} strokeWidth="1" />
                <line x1="2" y1="18" x2="34" y2="18" stroke={THEME.amber} strokeWidth="0.6" />
                <circle cx="18" cy="18" r="2" fill={THEME.amber}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <div>
              <div className="text-lg md:text-xl tracking-wider" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600, letterSpacing: '0.08em' }}>
                DS-1 ORBITAL BATTLE STATION
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>
                Engineering Specification · Interactive Console
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[10px]" style={{ color: THEME.textMuted }}>
            <div className="flex items-center gap-1.5">
              <div style={{ width: 6, height: 6, background: THEME.green, animation: 'pulse 2s infinite' }} />
              <span>LINK ACTIVE</span>
            </div>
            <div>STARDATE · Y19 · HORUZ</div>
            <div style={{ color: THEME.amber }}>CLASSIFIED · IMDEP-1</div>
          </div>
        </div>
        <ScannerLine />
      </header>

      {/* Tab navigation */}
      <nav className="px-4 md:px-6 py-2 max-w-[1800px] mx-auto overflow-x-auto" style={{ background: THEME.surface, borderBottom: `1px solid ${THEME.border}` }}>
        <div className="flex gap-1">
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase whitespace-nowrap transition-colors"
                style={{
                  background: active ? THEME.panel : 'transparent',
                  color: active ? THEME.amber : THEME.textMuted,
                  border: `1px solid ${active ? THEME.amber : 'transparent'}`,
                  borderBottom: active ? `1px solid ${THEME.amber}` : `1px solid transparent`,
                  fontFamily: "'Chakra Petch'",
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                <Icon size={14} />
                {t.label}
                <span className="text-[9px] opacity-60 ml-1">{t.code}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="px-4 md:px-6 py-6 max-w-[1800px] mx-auto">
        {tab === 'command' && <CommandTab firing={firing} startFire={startFire} />}
        {tab === 'structure' && <StructureTab />}
        {tab === 'construction' && <ConstructionTab />}
        {tab === 'reactor' && <ReactorTab firing={firing} startFire={startFire} />}
        {tab === 'drive' && <DriveTab />}
        {tab === 'defense' && <DefenseTab />}
        {tab === 'ds2' && <DS2Tab />}
        {tab === 'physics' && <PhysicsTab />}
        {tab === 'ledger' && <LedgerTab />}
      </main>

      {/* Footer */}
      <footer style={{ background: THEME.surface, borderTop: `1px solid ${THEME.border}` }} className="mt-12">
        <ScannerLine color={THEME.border} />
        <div className="px-6 py-6 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                SOURCE AUTHORITY
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>Wookieepedia (canon + Legends)</li>
                <li>Death Star Technical Companion (WEG 40008)</li>
                <li>Star Wars: Incredible Cross-Sections (DK)</li>
                <li>Star Wars: Complete Locations (DK)</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                PHYSICS SOURCES
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>Lehigh / Centives steel analysis</li>
                <li>Feinstein (2015) arXiv:1511.09054</li>
                <li>Lentz (2021) Class. Quantum Grav. 38</li>
                <li>NIF / ITER / NASA NTRS</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                WEAPONS ANALOGS
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>MARAUDER / Shiva Star (AFRL)</li>
                <li>Epirus Leonidas HPM</li>
                <li>HELIOS Mk 5 Mod 0 (USN)</li>
                <li>Bamford mini-magnetosphere (RAL)</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                APPLICATION BUILD
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>Hybrid canon / real-physics visualization</li>
                <li>Eight primary system modules</li>
                <li>Interactive build timeline</li>
                <li>Vulnerability + handwavium ledger</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-4 text-[10px] flex flex-col md:flex-row justify-between gap-2" style={{ borderTop: `1px solid ${THEME.border}`, color: THEME.textDim }}>
            <div>Specification reference document: DS-1 Orbital Battle Station · Hard-Physics Engineering Specification</div>
            <div style={{ color: THEME.amber }}>For systems-engineering study purposes only · No recommendation to construct</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
