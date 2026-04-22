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

export const ReactorTab: React.FC<TabPropsWithFiring> = ({ firing, startFire }) => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION IV · POWER & PRIMARY WEAPON"
        title="Hypermatter Reactor and Superlaser"
        description="Canonical SFS-CR27200 hypermatter reactor drives 8 tributary kyber amplifier stages feeding a 10-km active optic. Alderaan shot requires ≥2.24×10³² J. Sustained reactor output 2.6×10²⁷ W = 6,800 L☉. Every energy-storage technology we know requires station-mass-or-greater reservoirs; only c²-class specific energy closes the gap."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="REACTOR STATE" accent={THEME.red} code="CR27200">
          <div className="relative aspect-square mb-3">
            <svg viewBox="0 0 200 200">
              <defs>
                <radialGradient id="rcore">
                  <stop offset="0%" stopColor={THEME.amberGlow} />
                  <stop offset="40%" stopColor={THEME.red} />
                  <stop offset="100%" stopColor={THEME.bg} stopOpacity="0" />
                </radialGradient>
                <filter id="reactorGlow">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
              </defs>
              <circle cx="100" cy="100" r="95" fill="none" stroke={THEME.border} strokeWidth="1" />
              <circle cx="100" cy="100" r="80" fill="none" stroke={THEME.red} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 3" />
              <circle cx="100" cy="100" r="60" fill="url(#rcore)" filter="url(#reactorGlow)">
                <animate attributeName="r" values="55;68;55" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="100" r="35" fill={THEME.amberGlow}>
                <animate attributeName="r" values="30;42;30" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="100" cy="100" r="15" fill="#fff" opacity="0.9">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>
              {/* Containment rings */}
              {[60, 75, 90].map((r, i) => (
                <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={THEME.amber} strokeWidth="0.3" opacity="0.3" strokeDasharray="1 4" />
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Peak output</div>
              <div style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>2.24 × 10³² W</div>
            </div>
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Sustained</div>
              <div style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>2.6 × 10²⁷ W</div>
            </div>
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Recharge</div>
              <div style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>24 h</div>
            </div>
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Solar equivalent</div>
              <div style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>6,800 L☉</div>
            </div>
          </div>
        </Panel>

        {/* Reactor options comparison */}
        <Panel title="REACTOR OPTION TRADESPACE" accent={THEME.red} code="§2.2" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={REACTOR_OPTIONS} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis
                  dataKey="option"
                  tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  stroke={THEME.border}
                />
                <YAxis tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} label={{ value: 'Feasibility', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.red}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  formatter={(v, n, p) => [`${v}% · ${p.payload.handwavium} handwavium`, n]}
                />
                <Bar dataKey="feasibility">
                  {REACTOR_OPTIONS.map((r, i) => {
                    const color = r.handwavium === 'Total' ? THEME.red : r.handwavium === 'Very high' ? '#b91c1c' : r.handwavium === 'High' ? THEME.amber : r.handwavium === 'Medium' ? THEME.cyan : THEME.green;
                    return <Cell key={i} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* Superlaser firing sequence diagram */}
      <Panel title="SUPERLASER FIRING SEQUENCE" accent={THEME.red} code="§3" className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square relative">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <radialGradient id="slDish">
                    <stop offset="0%" stopColor="#0a0a0e" />
                    <stop offset="100%" stopColor="#1a1d26" />
                  </radialGradient>
                  <radialGradient id="slDishFire">
                    <stop offset="0%" stopColor={THEME.greenGlow} />
                    <stop offset="100%" stopColor="#064e3b" />
                  </radialGradient>
                  <filter id="slGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" />
                  </filter>
                </defs>

                {/* Reactor core */}
                <circle cx="200" cy="320" r="28" fill="url(#rcore)" filter="url(#slGlow)">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="200" y="372" textAnchor="middle" fill={THEME.amber} fontSize="9" fontFamily="'Chakra Petch'">REACTOR CORE</text>

                {/* 8 kyber amplifier stages arranged in a ring */}
                {[...Array(8)].map((_, i) => {
                  const a = (i * 45 - 90) * Math.PI / 180;
                  const cx = 200 + 90 * Math.cos(a);
                  const cy = 180 + 90 * Math.sin(a);
                  const isFiring = firing > 0.05 * (i + 1) && firing < 0.6;
                  return (
                    <g key={i}>
                      {/* Tributary line from reactor to amplifier */}
                      <line x1="200" y1="320" x2={cx} y2={cy}
                        stroke={isFiring ? THEME.greenGlow : THEME.amber}
                        strokeWidth={isFiring ? 2 : 0.5}
                        opacity={isFiring ? 0.9 : 0.4}
                        strokeDasharray={isFiring ? "" : "2 3"}
                      />
                      {/* Amplifier */}
                      <rect x={cx - 10} y={cy - 10} width="20" height="20"
                        fill={isFiring ? THEME.greenGlow : THEME.panel}
                        stroke={THEME.amber} strokeWidth="1"
                        transform={`rotate(45 ${cx} ${cy})`}
                      />
                    </g>
                  );
                })}

                {/* Convergence to focusing lens */}
                {[...Array(8)].map((_, i) => {
                  const a = (i * 45 - 90) * Math.PI / 180;
                  const cx = 200 + 90 * Math.cos(a);
                  const cy = 180 + 90 * Math.sin(a);
                  const isConv = firing > 0.15 && firing < 0.6;
                  return (
                    <line key={`c${i}`} x1={cx} y1={cy} x2="200" y2="90"
                      stroke={isConv ? THEME.greenGlow : 'transparent'}
                      strokeWidth={isConv ? 1.5 : 0}
                      opacity={isConv ? 0.8 : 0}
                      filter="url(#slGlow)"
                    />
                  );
                })}

                {/* Compound focusing lens */}
                <circle cx="200" cy="90" r="32"
                  fill={firing > 0.15 ? "url(#slDishFire)" : "url(#slDish)"}
                  stroke={THEME.amber}
                  strokeWidth="1.5"
                  filter={firing > 0.15 ? "url(#slGlow)" : ""}
                />
                <circle cx="200" cy="90" r="14"
                  fill={firing > 0.2 ? THEME.greenGlow : THEME.border}
                >
                  {firing > 0.2 && <animate attributeName="r" values="10;18;10" dur="0.4s" repeatCount="indefinite" />}
                </circle>

                {/* Main beam output */}
                {firing > 0.3 && (
                  <g filter="url(#slGlow)">
                    <line x1="200" y1="58" x2="200" y2={firing > 0.6 ? -50 : 280 - firing * 400} stroke={THEME.greenGlow} strokeWidth="8" opacity={Math.min((firing - 0.3) * 3, 1)} />
                    <line x1="200" y1="58" x2="200" y2={firing > 0.6 ? -50 : 280 - firing * 400} stroke="#fff" strokeWidth="3" opacity={Math.min((firing - 0.3) * 3, 1)} />
                  </g>
                )}

                {/* Labels */}
                <text x="200" y="135" textAnchor="middle" fill={THEME.amber} fontSize="9" fontFamily="'Chakra Petch'">FOCUSING LENS · 10 km</text>
                {[...Array(8)].map((_, i) => {
                  const a = (i * 45 - 90) * Math.PI / 180;
                  const cx = 200 + 118 * Math.cos(a);
                  const cy = 180 + 118 * Math.sin(a);
                  return <text key={`l${i}`} x={cx} y={cy + 3} textAnchor="middle" fill={THEME.textMuted} fontSize="7" fontFamily="'JetBrains Mono'">T{i + 1}</text>;
                })}
              </svg>
            </div>
            <button
              onClick={startFire}
              disabled={firing > 0}
              className="w-full mt-3 py-3 text-sm uppercase tracking-widest transition"
              style={{
                background: firing > 0 ? THEME.red : '#7f1d1d',
                color: '#fff',
                border: `1px solid ${THEME.red}`,
                fontFamily: "'Chakra Petch'",
                fontWeight: 600,
                opacity: firing > 0 ? 0.5 : 1,
                cursor: firing > 0 ? 'default' : 'pointer',
              }}
            >
              {firing > 0 ? '▶ FIRING SEQUENCE ACTIVE' : '◊ AUTHORIZE FULL-POWER IGNITION'}
            </button>
          </div>

          <div>
            <div className="text-xs mb-4" style={{ color: THEME.textMuted, lineHeight: 1.7 }}>
              Canonical architecture: reactor drives 64 tributary shafts feeding 8 giant kyber crystal amplifier stages (14 gunners each, 132 total). Eight coherent beams converge on a 10-km compound focusing lens. Four induction hyperphase generators initiate firing.
            </div>
            <div className="space-y-3">
              <StatBlock label="Target energy" value="2.24 × 10³²" unit="J" tone="red" note="Earth gravitational binding energy" />
              <StatBlock label="Peak power" value="2.24 × 10³²" unit="W" tone="red" note="1-second pulse" />
              <StatBlock label="Aperture diameter" value="10" unit="km" tone="amber" note="Effective emitting" />
              <StatBlock label="Diffraction spot @ 1 AU" value="~9" unit="m" tone="cyan" note="1.22λ/D · 500 nm" />
              <StatBlock label="Intensity at aperture" value="2.85 × 10²⁰" unit="W/cm²" tone="red" note="10¹⁰× damage threshold" />
              <StatBlock label="NIF-equivalent stack" value="10²⁶" unit="NIFs" tone="red" note="At 2.2 MJ × 192 beams" />
            </div>

            <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.red}40` }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} style={{ color: THEME.red, marginTop: 2, flexShrink: 0 }} />
                <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
                  <strong style={{ color: THEME.red }}>Physics wall:</strong> a pure EM laser deposits energy in the top millimeters of a silicate planet (optical skin depth ≪ 1 mm for rock). You boil the oceans and scorch the lit crust — you do not explode the planet. Canon resolution: the weapon is a <strong style={{ color: THEME.amber }}>hypermatter particle beam</strong> (green Cherenkov-analog), not EM.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Kyber → real analog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="KYBER → REAL ANALOG" accent={THEME.cyan} code="§3.3">
          {[
            ['Kyber crystal', 'Nd:glass laser gain medium', 'NIF uses 3,100 slabs'],
            ['Hypermatter pump', 'Gamma/particle flash pump', 'Replaces xenon flashlamps'],
            ['Induction hyperphase', 'MO phase-lock (CBC)', 'Fraunhofer/MIT coherent combining'],
            ['Compound kyber lens', 'KDP/LBO nonlinear optic', 'NIF 1ω→3ω triplers'],
            ['Force attunement', 'Unphysical', 'Authorial flavor'],
          ].map(([canon, real, note], i) => (
            <div key={i} className="py-2" style={{ borderBottom: i < 4 ? `1px solid ${THEME.border}` : 'none' }}>
              <div className="flex items-baseline gap-2 justify-between">
                <span className="text-xs" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{canon}</span>
                <ChevronRight size={12} style={{ color: THEME.textDim }} />
                <span className="text-xs" style={{ color: THEME.cyan }}>{real}</span>
              </div>
              <div className="text-[10px] mt-1" style={{ color: THEME.textDim }}>{note}</div>
            </div>
          ))}
        </Panel>

        <Panel title="WASTE-HEAT WALL" accent={THEME.red} code="§2.3">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            Accept 0.1% inefficiency on 2.24×10³² J: waste = 2.24×10²⁹ J per shot. Stefan-Boltzmann on 4.5×10¹⁰ m² hull:
          </p>
          {[
            ['300 K (passive)', '2.1 × 10¹¹ W', '~10¹⁸ s (impossible)'],
            ['1,000 K (red hot)', '2.6 × 10¹⁸ W', '2,780 years'],
            ['2,500 K (W melt)', '1.0 × 10²¹ W', '~7 years'],
            ['5,800 K (solar)', '2.6 × 10²² W', '~100 days'],
          ].map(([T, P, t], i) => (
            <div key={i} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
              <span className="text-[11px]" style={{ color: THEME.text, fontFamily: "'JetBrains Mono'" }}>{T}</span>
              <div className="text-right">
                <div className="text-[11px]" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>{P}</div>
                <div className="text-[9px]" style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>{t}</div>
              </div>
            </div>
          ))}
          <div className="mt-3 pt-2 text-[10px]" style={{ color: THEME.red, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            <strong>Required efficiency</strong>: 1 − 10⁻⁹ = 99.9999999%. Only self-consistent resolution: the superlaser beam itself carries away the entropy.
          </div>
        </Panel>

        <Panel title="ENERGY STORAGE WALL" accent={THEME.red} code="§2.4">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            Buffering 2.24×10³² J for a 1-second pulse:
          </p>
          {[
            ['Li-ion', '2.24 × 10²⁶ kg', '≈ 30× Earth'],
            ['Supercap', '6.2 × 10²⁷ kg', 'Non-viable'],
            ['CFRP flywheel', '4.5 × 10²⁶ kg', 'Non-viable'],
            ['D-T fusion', '6.6 × 10¹⁷ kg', 'Approaches station mass'],
            ['p-B¹¹ fuel', '3.2 × 10¹⁸ kg', 'Exceeds station mass'],
            ['Antimatter', '2.5 × 10¹⁵ kg', 'Tractable mass'],
          ].map(([tech, mass, note], i) => {
            const isGood = note === 'Tractable mass';
            return (
              <div key={i} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: i < 5 ? `1px solid ${THEME.border}50` : 'none' }}>
                <span className="text-[11px]" style={{ color: THEME.text, fontFamily: "'JetBrains Mono'" }}>{tech}</span>
                <div className="text-right">
                  <div className="text-[11px]" style={{ color: isGood ? THEME.green : THEME.red, fontFamily: "'JetBrains Mono'" }}>{mass}</div>
                  <div className="text-[9px]" style={{ color: THEME.textDim }}>{note}</div>
                </div>
              </div>
            );
          })}
          <div className="mt-3 pt-2 text-[10px]" style={{ color: THEME.amber, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Only c²-class (hypermatter / antimatter) specific energy closes the gap. HW-3 in handwavium ledger.
          </div>
        </Panel>
      </div>
    </div>
  );
};

