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

export const DriveTab: React.FC = () => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION V · PROPULSION & LIFE SUPPORT"
        title="Drive Systems and ECLSS"
        description="Sublight: two Sepma 30-5 ion engines plus southern-hemisphere array. Hyperdrive: 123 Isu-Sim SSP06 generators, Class 4 primary. ECLSS: 425,000× ISS throughput serving 1.7 M personnel."
      />

      {/* Propulsion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="SUBLIGHT PROPULSION BENCHMARKS" accent={THEME.cyan} code="§4.1">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            NEXT-C scaling: one milli-g at 10¹⁸ kg needs 4.24 × 10¹³ thrusters drawing 4.5 × 10¹⁴ W. Canonical MGLT 10 → reactor-limited micro- to milli-g regime.
          </p>
          <div className="h-48">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 10, right: 20, left: 30, bottom: 40 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis
                  type="number"
                  dataKey="isp"
                  name="Isp"
                  tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  scale="log"
                  domain={[1e3, 1e8]}
                  tickFormatter={v => `${v.toExponential(0)}s`}
                  label={{ value: 'Specific Impulse (s)', position: 'insideBottom', offset: -5, fill: THEME.textMuted, fontSize: 10 }}
                />
                <YAxis
                  type="number"
                  dataKey="thrust"
                  name="Thrust"
                  tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  scale="log"
                  domain={[0.01, 1e11]}
                  tickFormatter={v => `${v.toExponential(0)}N`}
                  label={{ value: 'Thrust (N)', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.cyan}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  cursor={{ stroke: THEME.cyan }}
                  formatter={(v, n, p) => [`${p.payload.engine}: Isp ${p.payload.isp.toExponential(1)}s, Thrust ${p.payload.thrust.toExponential(1)}N, Power ${p.payload.power.toExponential(1)}W`, '']}
                />
                <Scatter data={PROPULSION_DATA} fill={THEME.cyan}>
                  {PROPULSION_DATA.map((d, i) => (
                    <Cell key={i} fill={d.engine.includes('canon') ? THEME.amber : THEME.cyan} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="HYPERDRIVE · EXPLICIT HANDWAVIUM" accent={THEME.purple} code="§4.2">
          <div className="space-y-3 mb-4">
            <StatBlock label="Generators" value="123" unit="× SSP06" note="Isu-Sim coherent array" />
            <StatBlock label="Class" value="Class 4" note="Primary; Class 24 backup" />
            <StatBlock label="Bubble field energy" value="~10⁴⁵" unit="J" tone="red" note="50 solar rest-energies" />
            <StatBlock label="Speculative framing" value="Lentz soliton" note="2021, Class. Quantum Grav. 38" tone="cyan" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px]" style={{ fontFamily: "'JetBrains Mono'" }}>
              <thead>
                <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                  <th className="text-left py-1.5 pr-2">FRAMEWORK</th>
                  <th className="text-left py-1.5 pr-2">ENERGY FLOOR</th>
                  <th className="text-left py-1.5">FIT</th>
                </tr>
              </thead>
              <tbody style={{ color: THEME.text }}>
                {[
                  ['Alcubierre (1994)', '~10⁶⁴ J orig.', 'Poor · no hyperspace'],
                  ['Lentz soliton (2021)', '~0.1 M☉', 'Best fit'],
                  ['Morris-Thorne WH', '~−M☉c²', 'Poor · fixed ends'],
                  ['Randall-Sundrum brane', 'Tunable', 'Excellent · bulk shortcut'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                    {r.map((c, j) => (
                      <td key={j} className="py-1.5 pr-2" style={j === 2 ? { color: c.includes('Excellent') ? THEME.green : c.includes('Best') ? THEME.cyan : THEME.textDim } : {}}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* ECLSS */}
      <SectionHeader
        kicker="LIFE SUPPORT"
        title="ECLSS · Environmental Control & Life Support"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="CREW MANIFEST · 1.7 M TOTAL" accent={THEME.green} code="§5.1">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={CREW_MANIFEST}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={40}
                  paddingAngle={1}
                >
                  {CREW_MANIFEST.map((m, i) => <Cell key={i} fill={m.color} stroke={THEME.panel} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.green}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  formatter={v => v.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-[10px] mt-2" style={{ fontFamily: "'JetBrains Mono'" }}>
            {CREW_MANIFEST.slice(0, 5).map(m => (
              <div key={m.role} className="flex justify-between">
                <div className="flex items-center gap-1.5">
                  <div style={{ width: 6, height: 6, background: m.color }} />
                  <span style={{ color: THEME.text }}>{m.role}</span>
                </div>
                <span style={{ color: THEME.textMuted }}>{(m.count / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="DAILY ECLSS THROUGHPUT" accent={THEME.green} code="§5.2">
          <div className="space-y-2.5">
            {ECLSS_DAILY.map((e, i) => {
              const maxVal = Math.max(...ECLSS_DAILY.map(x => x.kg));
              const pct = (e.kg / maxVal) * 100;
              return (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span style={{ color: THEME.text }}>{e.input}</span>
                    <span style={{ color: THEME.green, fontFamily: "'JetBrains Mono'" }}>
                      {(e.kg / 1000).toLocaleString()} t/day
                    </span>
                  </div>
                  <div className="h-1.5" style={{ background: THEME.bg }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: THEME.green }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            425,000× ISS · 12,143× SSN-774 (90-d) · 213,000× Biosphere 2 · 285× CVN-68 provisioning.
          </div>
        </Panel>

        <Panel title="FIGHTER COMPLEMENT" accent={THEME.cyan} code="§5.6">
          <div className="space-y-2">
            {FIGHTER_COMPLEMENT.map((c, i) => (
              <div key={i} className="flex justify-between items-baseline py-2" style={{ borderBottom: i < 5 ? `1px solid ${THEME.border}50` : 'none' }}>
                <span className="text-[11px]" style={{ color: THEME.text, fontFamily: "'Chakra Petch'" }}>{c.craft}</span>
                <span className="text-sm" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>
                  {c.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Hangar volumetric demand ~0.003% of station volume. AT-AT load another 2×10⁷ m³.
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="ARTIFICIAL GRAVITY · HANDWAVIUM ANALYSIS" accent={THEME.purple} code="§5.4">
          <div className="grid grid-cols-2 gap-3">
            <StatBlock label="ω for 1g @ R=60km" value="0.0128" unit="rad/s" note="Period: 491 s (8.2 min)" />
            <StatBlock label="Equatorial v" value="767" unit="m/s" note="Tangential speed" />
            <StatBlock label="Coriolis @ 1.5 m/s walk" value="0.038" unit="m/s²" note="≈0.004 g — tolerable" />
            <StatBlock label="Hoop stress" value="144" unit="MPa" note="At ρ=1000 kg/m³" />
          </div>
          <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.purple}40` }}>
            <div className="flex items-start gap-2">
              <Atom size={14} style={{ color: THEME.purple, marginTop: 2, flexShrink: 0 }} />
              <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
                Rotation works only as an equatorial strip with cos(lat) falloff — poles are 0 g. Station visibly does not rotate. Canon: "gravity plates" (unspecified mechanism). Tajmar 2006 gravitomagnetic field from rotating superconductors disputed/non-replicated. HW-8 in handwavium ledger.
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="THERMAL BUDGET · NON-REACTOR LOADS" accent={THEME.cyan} code="§5.5">
          <div className="h-40">
            <ResponsiveContainer>
              <BarChart data={[
                { src: 'Crew metabolic', w: 0.17 },
                { src: 'ECLSS overhead', w: 0.5 },
                { src: 'Lighting + HVAC', w: 1.0 },
                { src: 'Droid/equipment', w: 0.4 },
              ]} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
                <XAxis type="number" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} label={{ value: 'GW', position: 'insideBottom', offset: -5, fill: THEME.textMuted, fontSize: 10 }} />
                <YAxis type="category" dataKey="src" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} width={80} stroke={THEME.border} />
                <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.cyan}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={v => `${v} GW`} />
                <Bar dataKey="w" fill={THEME.cyan} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Total non-reactor load: ~2 GW · radiator area at 300 K = 0.48 km² (trivial). The reactor is the real heat-rejection problem, not the crew.
          </div>
        </Panel>
      </div>
    </div>
  );
};

