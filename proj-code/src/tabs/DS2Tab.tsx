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

export const DS2Tab: React.FC = () => {
  return (
    <div>
      <SectionHeader
        kicker="APPENDIX A · DS-2 MODIFICATIONS"
        title="Return of the Jedi Variant"
        description="160-km diameter (current canon). Superlaser recharge cut from 24 h to ~3-5 min; 3 hypermatter reactor cores. Primary shield offloaded to Endor forest moon. Distributed mm-scale exhaust porting. Operated with incomplete hull as tactical feint."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="DS-1 vs DS-2 COMPARATIVE SCHEMATIC" accent={THEME.amber} code="SCALE TO FRAME">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-center mb-2" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>DS-1 · 120 km</div>
              <div className="aspect-square">
                <StationDiagram buildProgress={1} firing={0} showLabels={false} size={220} variant="DS1" />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-center mb-2" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>DS-2 · 160 km</div>
              <div className="aspect-square">
                <StationDiagram buildProgress={0.72} firing={0} showLabels={false} size={220} variant="DS2" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[10px]" style={{ color: THEME.textDim, lineHeight: 1.5 }}>
            DS-2 rendered at build-progress 72% to reflect canonical "incomplete superstructure" posture at the Battle of Endor. Core systems (superlaser, reactor, C3, shield) were complete; hull closure was the lagging item.
          </div>
        </Panel>

        <Panel title="SUPERLASER UPGRADES" accent={THEME.red} code="§A.3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
              <thead>
                <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                  <th className="text-left py-2 pr-2">PARAMETER</th>
                  <th className="text-left py-2 pr-2">DS-1</th>
                  <th className="text-left py-2">DS-2</th>
                </tr>
              </thead>
              <tbody style={{ color: THEME.text }}>
                {[
                  ['Tributary arch.', '8 equal', '7 + 1 center'],
                  ['Full-power recharge', '~24 h', '~3-5 min'],
                  ['Capital-ship targeting', 'No', 'Yes'],
                  ['Reactor cores', '1 hypermatter', '3 hypermatter'],
                  ['Targeting field', 'Spherical', 'Advanced focusing'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 4 ? `1px solid ${THEME.border}50` : 'none' }}>
                    {r.map((c, j) => (
                      <td key={j} className="py-2 pr-2" style={j === 0 ? { color: THEME.amber } : j === 2 ? { color: THEME.red } : {}}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.amber}40` }}>
            <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
              <strong style={{ color: THEME.amber }}>Capital-ship kill arithmetic.</strong> Needs ~10¹⁵–10¹⁸ J (vaporize 10⁶–10⁸ kg at ~10¹⁰ J/kg coupling). 3-min recharge at capital-ship power is 5.5×10¹²–5.5×10¹⁵ W — 10⁹–10¹² × below planet-kill draw. Consistent with DS-1-class reactor at low duty cycle.
            </div>
          </div>
        </Panel>
      </div>

      {/* Weapons comparison */}
      <Panel title="WEAPONS COMPLEMENT · DS-1 vs DS-2" accent={THEME.red} code="§A.6" className="mb-6">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={WEAPONS_DS1.map((w, i) => ({ name: w.name, ds1: w.count, ds2: WEAPONS_DS2[i].count }))} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
              <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
              <XAxis dataKey="name" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} angle={-15} textAnchor="end" interval={0} height={50} stroke={THEME.border} />
              <YAxis tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} />
              <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.red}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={v => v.toLocaleString()} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Chakra Petch' }} />
              <Bar dataKey="ds1" fill={THEME.amber} name="DS-1" />
              <Bar dataKey="ds2" fill={THEME.red} name="DS-2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-[10px]" style={{ color: THEME.textDim, lineHeight: 1.5 }}>
          DS-2 triples most weapon counts. Tractor-beam count invariant at 768 — strongly suggests geometric constant (24 zones × 32 per zone) rather than capacity limit.
        </div>
      </Panel>

      {/* Comparative param table */}
      <Panel title="FULL PARAMETER COMPARISON" accent={THEME.amber} code="§A" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
            <thead>
              <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left py-2 px-3">PARAMETER</th>
                <th className="text-left py-2 px-3">DS-1</th>
                <th className="text-left py-2 px-3">DS-2</th>
              </tr>
            </thead>
            <tbody>
              {DS1_VS_DS2.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${THEME.border}40` }}>
                  <td className="py-2 px-3" style={{ color: THEME.textMuted }}>{row.param}</td>
                  <td className="py-2 px-3" style={{ color: THEME.amber }}>{row.ds1}</td>
                  <td className="py-2 px-3" style={{ color: THEME.red }}>{row.ds2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Shield offload analysis */}
      <Panel title="SLD-26 ENDOR SHIELD · DECOUPLED ARCHITECTURE ANALYSIS" accent={THEME.cyan} code="§A.4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-xs mb-4" style={{ color: THEME.text, lineHeight: 1.6 }}>
              DS-2's SLD-26 Planetary Shield Generator (CoMar) sits on the Endor forest moon (radius ~2,450 km). Geostationary coupling via repulsorlift. The field caused measurable Endor seismic and hydrological disturbance.
            </p>
            <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              Engineering rationales (ranked)
            </div>
            <ol className="space-y-3 text-xs" style={{ color: THEME.text }}>
              {[
                { title: 'Power-draw coexistence', desc: 'Three reactor cores + rapid-fire superlaser + in-hull shield may exceed thermal-rejection budget. Offload to planetary thermal mass.' },
                { title: 'Volume recovery', desc: 'DS-1 had many on-hull shield towers consuming internal volume. Offloading frees interior for weapons/hangars.' },
                { title: 'Planetary-scale power tap', desc: 'Canon hints SLD-26 was "slowly destroying Endor" — consistent with geothermal/tidal-dissipation extraction via repulsor coupling.' },
                { title: 'Political / operational', desc: 'Garrisons Endor, projects power onto inhabited worlds, forms part of the Emperor\'s trap posture.' },
              ].map((r, i) => (
                <li key={i} className="pl-4 relative">
                  <span className="absolute left-0 top-0" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{i + 1}.</span>
                  <div style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{r.title}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: THEME.textMuted }}>{r.desc}</div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="p-4" style={{ background: THEME.bg, border: `1px solid ${THEME.red}` }}>
              <div className="flex items-start gap-2 mb-2">
                <Skull size={16} style={{ color: THEME.red, flexShrink: 0, marginTop: 2 }} />
                <div className="text-sm" style={{ color: THEME.red, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                  WORST-PRACTICE ENGINEERING
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
                Single point of failure. A ground assault (Ewok-assisted strike team) disabled the generator and dropped the shield in a single combat event. This is worse than DS-1's exhaust port in one respect: the compromise vector was terrestrial infantry, not an exotic exploit.
              </p>
              <div className="text-[11px] uppercase tracking-widest mb-2 mt-4" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                Correct Redundant Design
              </div>
              <ul className="space-y-1.5 text-[11px]" style={{ color: THEME.text }}>
                {[
                  'At least 3 independent generators on 3 independent planetary/L-point nodes',
                  'Voting logic with graceful degradation',
                  'ICBM LCC Permissive Action Links analog',
                  'Station-local fallback shield at reduced capacity',
                  'Decoy nodes to prevent targeting convergence',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5" style={{ width: 4, height: 4, background: THEME.green, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.amber}40` }}>
              <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
                <strong style={{ color: THEME.amber }}>DS-2 did all the right things on the exhaust-port problem</strong> (mm-scale distributed porting, particle shields, CIWS) — then gave it all back by picking a single planetary-surface shield node. The Empire's failure was never imagination; it was redundancy discipline.
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

