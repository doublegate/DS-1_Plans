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

export const DefenseTab: React.FC = () => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION VI · DEFENSIVE SYSTEMS"
        title="Weapons, Shields, and Vulnerability Analysis"
        description="15,000 turbolaser batteries + 2,500 ion cannons + 768 tractor projectors. Ray-shield + particle-shield dual architecture. Primary vulnerability: single-point 2-m thermal exhaust port (Erso sabotage + genuine thermal-venting necessity)."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="DS-1 WEAPONS COMPLEMENT" accent={THEME.red} code="§6.1">
          <div className="h-56 mb-3">
            <ResponsiveContainer>
              <BarChart data={WEAPONS_DS1} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis dataKey="name" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} angle={-20} textAnchor="end" interval={0} height={60} stroke={THEME.border} />
                <YAxis tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} />
                <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.red}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={(v, n, p) => `${v.toLocaleString()} · ${p.payload.model} · ${p.payload.mode}`} />
                <Bar dataKey="count" fill={THEME.red} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
            <div>Total batteries: 15,000 turbolaser + ancillaries.</div>
            <div>Canon reconciliation: WEG + DK + Disney canon all yield ~15 k aggregate.</div>
          </div>
        </Panel>

        <Panel title="CANON → REAL DEW ANALOGS" accent={THEME.cyan} code="§6.2–6.3">
          <div className="space-y-3">
            {[
              {
                canon: 'Turbolaser',
                real: 'MARAUDER compact plasma toroid',
                status: 'AFRL Phillips Lab · Shiva Star 9.5 MJ',
                scale: '3,000–10,000 km/s plasma ring · 5 lb TNT eq.',
                color: THEME.red,
              },
              {
                canon: 'Ion cannon',
                real: 'Epirus Leonidas HPM',
                status: 'Operational 2024 · USA CENTCOM',
                scale: '49-drone single-pulse kill demonstrated',
                color: THEME.cyan,
              },
              {
                canon: 'Laser cannon',
                real: 'HELIOS Mk 5 Mod 0',
                status: 'USS Preble DDG-88 · 2025 operational',
                scale: '60 kW (scalable 150 kW)',
                color: THEME.amber,
              },
              {
                canon: 'Tractor beam',
                real: '~None at scale',
                status: 'Optical tweezers · pN on 100 μm',
                scale: 'No known configurable attractive force',
                color: THEME.purple,
              },
            ].map((w, i) => (
              <div key={i} className="p-3" style={{ background: THEME.bg, border: `1px solid ${w.color}40` }}>
                <div className="flex items-baseline gap-2 justify-between mb-1">
                  <span className="text-xs" style={{ color: w.color, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{w.canon}</span>
                  <span className="text-[10px]" style={{ color: THEME.textDim }}>→</span>
                  <span className="text-xs" style={{ color: THEME.text }}>{w.real}</span>
                </div>
                <div className="text-[10px]" style={{ color: THEME.textMuted }}>{w.status}</div>
                <div className="text-[10px] mt-0.5" style={{ color: THEME.textDim }}>{w.scale}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Shields */}
      <Panel title="SHIELD ARCHITECTURE" accent={THEME.cyan} code="§6.5" className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              RAY SHIELD · Energy deflection
            </div>
            <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
              {[
                ['Plasma-mirror overdense shell', 'Real physics: EM at ω blocked for ωₚ > ω. Ionosphere is everyday example.'],
                ['Leicester (2014)', 'Journal Phys. Special Topics confirmed plasma-shield principle permissible.'],
                ['NUDT (2024)', 'Lab-scale plasma shield vs 170 kW microwaves at 3 m range.'],
                ['Downside', 'Shield blocks sensors, comms, outbound weapons. Explains on-screen intermittent shield-down-to-fire.'],
              ].map(([h, d], i) => (
                <li key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                  <div style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>{h}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.textMuted }}>{d}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              PARTICLE SHIELD · Matter deflection
            </div>
            <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
              {[
                ['Magnetic deflection', 'Charged particles only — useless vs photons/neutrals.'],
                ['Mini-magnetosphere (Bamford et al.)', 'Rutherford Appleton Lab — solar wind deflection at modest B.'],
                ['Whipple Shields', 'Micrometeoroids to ~10 km/s.'],
                ['Composite / reactive armor', 'Bulk kinetic penetrators (Chobham/Relikt analog).'],
              ].map(([h, d], i) => (
                <li key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                  <div style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'" }}>{h}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.textMuted }}>{d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.red}40` }}>
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} style={{ color: THEME.red, marginTop: 2, flexShrink: 0 }} />
            <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
              <strong style={{ color: THEME.red }}>The gap exploited at Yavin</strong> is precisely ray-without-particle: the 2-m exhaust port was ray-shielded (blocks blaster fire) but particle-penetrable (admits proton torpedoes). Canon explicitly: "the Death Star had to forgo all but the most rudimentary shielding capabilities in order to achieve such destructive power."
            </div>
          </div>
        </div>
      </Panel>

      {/* Vulnerability matrix */}
      <Panel title="VULNERABILITY MATRIX · DS-1 VS DS-2" accent={THEME.red} code="§8">
        <p className="text-xs mb-4" style={{ color: THEME.textMuted }}>
          Severity 0–5 where 5 = catastrophic/mission-ending. DS-2 fixed some failure modes and introduced others.
        </p>
        <div className="space-y-3">
          {VULNERABILITY_MATRIX.map((v, i) => (
            <div key={i} className="p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
              <div className="flex items-baseline gap-3 justify-between mb-2">
                <span className="text-xs" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{v.issue}</span>
                <div className="flex items-center gap-3 text-[10px]" style={{ fontFamily: "'JetBrains Mono'" }}>
                  <span style={{ color: THEME.textMuted }}>DS-1</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} style={{ width: 8, height: 12, background: j < v.ds1 ? THEME.red : THEME.border }} />
                    ))}
                  </div>
                  <span style={{ color: THEME.textMuted }}>DS-2</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} style={{ width: 8, height: 12, background: j < v.ds2 ? (v.ds2 > v.ds1 ? THEME.red : THEME.amber) : THEME.border }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-[10px]" style={{ color: THEME.textDim }}>{v.note}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Exhaust port detail */}
      <Panel title="THE THERMAL EXHAUST PORT · §6.7" accent={THEME.red} code="YAVIN LOSS" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <svg viewBox="0 0 300 300" className="w-full">
              <defs>
                <radialGradient id="hullG2">
                  <stop offset="0%" stopColor="#3a4050" />
                  <stop offset="100%" stopColor="#1e232c" />
                </radialGradient>
              </defs>

              {/* Trench cutaway */}
              <rect x="20" y="100" width="260" height="120" fill="url(#hullG2)" stroke={THEME.border} />
              <rect x="20" y="130" width="260" height="60" fill="#0a0a0e" />

              {/* Ducts */}
              <rect x="110" y="130" width="10" height="60" fill="#0a0a0e" stroke={THEME.amber} strokeWidth="0.5" />
              <line x1="115" y1="190" x2="115" y2="260" stroke={THEME.amber} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="115" cy="270" r="6" fill="url(#rcore)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Exhaust port */}
              <ellipse cx="115" cy="130" rx="7" ry="3" fill={THEME.red} opacity="0.8">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.5s" repeatCount="indefinite" />
              </ellipse>

              {/* Incoming torpedo */}
              <g>
                <rect x="105" y="30" width="20" height="8" fill={THEME.amber}>
                  <animateTransform attributeName="transform" type="translate" from="0 -60" to="0 90" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <polygon points="105,30 105,38 95,34" fill={THEME.amberGlow}>
                  <animateTransform attributeName="transform" type="translate" from="0 -60" to="0 90" dur="2.5s" repeatCount="indefinite" />
                </polygon>
                <circle cx="115" cy="20" r="3" fill={THEME.amberGlow}>
                  <animateTransform attributeName="transform" type="translate" from="0 -60" to="0 90" dur="2.5s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Labels */}
              <text x="10" y="112" fill={THEME.textMuted} fontSize="9" fontFamily="'JetBrains Mono'">HULL SURFACE</text>
              <text x="150" y="145" fill={THEME.amber} fontSize="9" fontFamily="'JetBrains Mono'">2-m port</text>
              <text x="150" y="220" fill={THEME.amber} fontSize="9" fontFamily="'JetBrains Mono'">Heat duct</text>
              <text x="150" y="282" fill={THEME.red} fontSize="9" fontFamily="'JetBrains Mono'">Main reactor</text>
              <text x="160" y="32" fill={THEME.cyan} fontSize="9" fontFamily="'JetBrains Mono'">T-65 X-wing torpedo</text>
            </svg>
          </div>
          <div>
            <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
              <strong style={{ color: THEME.red }}>Why a hypermatter reactor must vent.</strong> Even at 0.01% thermal-channel efficiency on 10²⁴–10³³ W, waste is 10²⁰–10²⁹ W. No Stefan-Boltzmann radiator at 3,000 K can dispose of 10²⁰ W — would require 10¹⁴ m² (10× station surface). A concentrated aperture venting is <em>not a pure design flaw</em>, it is architecturally necessary.
            </p>
            <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
              <strong style={{ color: THEME.amber }}>The Erso sabotage.</strong> Galen Erso (per <em>Catalyst</em> + <em>Rogue One</em> novelization) coerced a reactor-containment geometry whose shielding reflected too many particles back into the reactor, forcing a single-consolidated-vent architecture with instability propagation. The sabotage converted a necessary feature into a catastrophic one.
            </p>
            <div className="text-[11px] uppercase tracking-widest mb-2 mt-4" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              DS-2 Correct Engineering Fix
            </div>
            <ul className="space-y-1.5 text-[11px]" style={{ color: THEME.text }}>
              {[
                'Distributed mm-scale porting (sub-minimum-ordnance geometry)',
                'Labyrinthine baffles with 90°+ turns denying line-of-sight',
                'Active blast doors (failure-closed default)',
                'Particle shields on every external aperture with local CIWS',
                'Magnetic reactor-buffer cells between vent manifold and core',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5" style={{ width: 4, height: 4, background: THEME.green, flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
};

