import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  ComposedChart, ScatterChart, Scatter, ZAxis,
} from 'recharts';
import {
  Activity, Radio, Zap, Shield, Target, Cpu, Gauge, Users,
  Rocket, Atom, Crosshair, AlertTriangle, Layers, Settings,
  Building2, Flame, Binary, Waves, Orbit, HardDrive, Radiation,
  Eye, LineChart as LC, Grid3x3, ChevronRight, Play, Pause,
  RotateCcw, Info, GitBranch, Ruler, Package, Skull, Search,
  CircleDot, Triangle, Square, Hexagon, Sigma, FlaskConical,
  Telescope, AlertOctagon,
} from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, StatBlock, SectionHeader, Pill,
  RadialGauge, ScannerLine, StationDiagram,
} from '../components';
import { useCountUp } from '../hooks/useCountUp';
import {
  MASS_BUDGET, CREW_MANIFEST, WEAPONS_DS1, WEAPONS_DS2,
  CONSTRUCTION_PHASES, ENERGY_COMPARISONS, REACTOR_OPTIONS,
  HANDWAVIUM, DERIVED_REQUIREMENTS, FMEA_REGISTER, REAL_WORLD_2026,
  COST_BREAKDOWN, DS1_VS_DS2, VULNERABILITY_MATRIX, PROPULSION_DATA,
  ECLSS_DAILY, FIGHTER_COMPLEMENT,
} from '../data';
import type { TabPropsWithFiring } from '../types';

export const LedgerTab: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const clsColor = (cls) => cls === 'C' ? THEME.red : cls === 'A' ? THEME.cyan : cls === 'T' ? THEME.green : THEME.amber;
  const clsLabel = (cls) => cls === 'C' ? 'Concession' : cls === 'A' ? 'Analysis' : cls === 'T' ? 'Test' : cls === 'I' ? 'Inspection' : 'Demo';
  const fmeaShown = FMEA_REGISTER.filter(r => filter === 'all' || r.variant === filter);
  const maxRpn = Math.max(...FMEA_REGISTER.map(r => r.rpn));

  return (
    <div>
      <SectionHeader
        kicker="Traceability & Verification Ledger"
        title="Handwavium · Derived Requirements · FMEA · Real-World Analogs"
        description="Single cross-reference view: every physics concession is tied to a derived requirement and a subsystem document; every top-RPN failure mode is tied to a mitigation; every cited real-world program has its status current as of April 2026."
      />

      {/* Row 1: Handwavium ledger with subsystem + DR traceability */}
      <Panel title="Handwavium Register" code="HW-1 … HW-10" accent={THEME.red} className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${THEME.border}`, color: THEME.textMuted }}>
                <th className="text-left py-2 pr-3 font-normal tracking-wider uppercase text-[10px]">ID</th>
                <th className="text-left py-2 pr-3 font-normal tracking-wider uppercase text-[10px]">Physics Wall</th>
                <th className="text-left py-2 pr-3 font-normal tracking-wider uppercase text-[10px]">Canonical Escape</th>
                <th className="text-left py-2 pr-3 font-normal tracking-wider uppercase text-[10px]">Subsystem</th>
                <th className="text-left py-2 font-normal tracking-wider uppercase text-[10px]">Traces</th>
              </tr>
            </thead>
            <tbody>
              {HANDWAVIUM.map((hw) => (
                <tr key={hw.id} style={{ borderBottom: `1px solid ${THEME.border}40` }}>
                  <td className="py-2 pr-3"><Pill tone="red">{hw.id}</Pill></td>
                  <td className="py-2 pr-3" style={{ color: THEME.text }}>{hw.wall}</td>
                  <td className="py-2 pr-3" style={{ color: THEME.textMuted }}>{hw.escape}</td>
                  <td className="py-2 pr-3" style={{ color: THEME.textDim }}>{hw.subsystem}</td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-1">
                      {hw.traces.map((tr) => (
                        <span key={tr} className="text-[10px] tracking-wider" style={{ color: tr.includes('gap') ? THEME.amber : THEME.cyan }}>
                          {tr}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[10px]" style={{ color: THEME.textDim }}>
          All HW-IDs now trace to explicit derived requirements (bidirectional check closed 2026-04-22 under Phase 2 S2.4). DR-13..DR-16 cover waste-heat routing, recoil, gravity plates, and tractor mechanism.
        </div>
      </Panel>

      {/* Row 2: Derived requirements verification matrix */}
      <Panel title="Derived Requirements (V&V Matrix)" code="DR-01 … DR-16" accent={THEME.cyan} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {DERIVED_REQUIREMENTS.map((dr) => (
            <div key={dr.id} className="flex items-start gap-3 py-1.5" style={{ borderBottom: `1px solid ${THEME.border}40` }}>
              <span className="mt-0.5"><Pill tone={dr.cls === 'C' ? 'red' : dr.cls === 'A' ? 'cyan' : 'amber'}>{dr.id}</Pill></span>
              <div className="flex-1">
                <div className="text-xs" style={{ color: THEME.text }}>{dr.text}</div>
                <div className="flex items-center gap-3 mt-1 text-[10px]" style={{ color: THEME.textDim }}>
                  <span>from {dr.sr}</span>
                  <span style={{ color: clsColor(dr.cls) }}>class: {clsLabel(dr.cls)}</span>
                  <span>· {dr.refs}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-4 text-[10px]" style={{ color: THEME.textMuted }}>
          <span className="flex items-center gap-1"><span style={{ width: 8, height: 8, background: THEME.red, display: 'inline-block' }} /> Concession (8 / 16)</span>
          <span className="flex items-center gap-1"><span style={{ width: 8, height: 8, background: THEME.cyan, display: 'inline-block' }} /> Analysis (6 / 16)</span>
          <span className="flex items-center gap-1"><span style={{ width: 8, height: 8, background: THEME.amber, display: 'inline-block' }} /> Inspection (1 / 16)</span>
          <span>· Test-eligible via real-world analogs: 8 programs tracked below</span>
        </div>
      </Panel>

      {/* Row 3: FMEA top-RPN entries */}
      <Panel title="Failure Modes & Effects — Top-RPN Register" code="S × O × D" accent={THEME.amber} className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] tracking-widest uppercase" style={{ color: THEME.textMuted }}>Variant:</span>
          {['all', 'DS-1', 'DS-2'].map(v => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className="text-[10px] px-2 py-0.5 tracking-wider uppercase"
              style={{
                color: filter === v ? THEME.bg : THEME.textMuted,
                background: filter === v ? THEME.amber : 'transparent',
                border: `1px solid ${filter === v ? THEME.amber : THEME.border}`,
                fontFamily: "'Chakra Petch', sans-serif",
                cursor: 'pointer',
              }}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {fmeaShown.map((r) => {
            const pct = (r.rpn / maxRpn) * 100;
            const tone = r.rpn >= 500 ? THEME.red : r.rpn >= 300 ? THEME.amber : THEME.cyan;
            return (
              <div key={r.id} className="flex items-center gap-3 py-2" style={{ borderBottom: `1px solid ${THEME.border}40` }}>
                <div style={{ width: 42 }}><Pill tone={r.variant === 'DS-1' ? 'amber' : 'cyan'}>{r.id}</Pill></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs" style={{ color: THEME.text }}>{r.item}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.textMuted }}>{r.mode} → <span style={{ color: THEME.textDim }}>{r.effect}</span></div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.green }}>⤷ {r.mitigation}</div>
                </div>
                <div style={{ width: 200 }}>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5" style={{ background: `${THEME.border}` }}>
                      <div className="h-full" style={{ width: `${pct}%`, background: tone, transition: 'width 0.5s ease' }} />
                    </div>
                    <span className="text-[11px] tabular-nums" style={{ color: tone, minWidth: 36, textAlign: 'right' }}>{r.rpn}</span>
                  </div>
                  <div className="flex gap-2 text-[9px] mt-0.5" style={{ color: THEME.textDim }}>
                    <span>S:{r.s}</span><span>O:{r.o}</span><span>D:{r.d}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Row 4: Real-world analog program status as-of April 2026 */}
      <Panel title="Real-World Analog Programs — Current Status" code="as of 2026-04" accent={THEME.green} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REAL_WORLD_2026.map((p) => (
            <div key={p.program} className="p-3" style={{ border: `1px solid ${THEME.border}`, background: `${THEME.surface}80` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-xs font-semibold" style={{ color: THEME.text }}>{p.program}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.textDim }}>cited in {p.citedIn}</div>
                </div>
                <Pill tone="green">2026</Pill>
              </div>
              <div className="text-[10px] mb-1" style={{ color: THEME.textMuted }}>
                <span style={{ color: THEME.textDim }}>spec-cited baseline:</span> {p.thenStatus}
              </div>
              <div className="text-[10px] mb-2" style={{ color: THEME.text }}>
                <span style={{ color: THEME.green }}>current:</span> {p.currentStatus}
              </div>
              <div className="text-[10px] pt-2" style={{ borderTop: `1px solid ${THEME.border}40`, color: THEME.amber }}>
                gap: {p.gap}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Closing note */}
      <Panel accent={THEME.border}>
        <div className="text-xs leading-relaxed" style={{ color: THEME.textMuted }}>
          This ledger operationalizes the handwavium-discipline pattern described in <code style={{ color: THEME.amber }}>docs/10-handwavium-ledger.md</code>, the derived-requirements table in <code style={{ color: THEME.amber }}>docs/01-design-basis.md §12</code>, and the FMEA and V&V registers in <code style={{ color: THEME.amber }}>docs/appendix-E-fmea.md</code> and <code style={{ color: THEME.amber }}>docs/appendix-F-vnv-plan.md</code>. Any new engineering claim in the spec that exceeds real-physics envelope without an HW-ID cite is a defect; any DR without a verification class is a defect. These tables are the authoritative view for peer review (Phase 4, sprint S4.3).
        </div>
      </Panel>
    </div>
  );
};
