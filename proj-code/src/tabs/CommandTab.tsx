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

export const CommandTab: React.FC<TabPropsWithFiring> = ({ firing, startFire }) => {
  const alderaan = useCountUp(2.24);
  const mass = useCountUp(10);
  const crew = useCountUp(1.7);
  const dia = useCountUp(120);

  return (
    <div>
      <SectionHeader
        kicker="SECTION I · EXECUTIVE DASHBOARD"
        title="DS-1 Orbital Battle Station — Command Overview"
        description="Spherical battle station. 120 km nominal diameter (ANH reference). Structural mass 10¹⁸ kg. Primary armament: hypermatter-sourced superlaser, Alderaan-class output ≥2.24×10³² J per shot. Hybrid canon / real-physics engineering specification."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Key stats panel */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Panel accent={THEME.amber} padding="p-4">
            <StatBlock label="Diameter" value={dia.toFixed(0)} unit="km" tone="amber" note="ANH canon; 160 km DS-2" />
          </Panel>
          <Panel accent={THEME.red} padding="p-4">
            <StatBlock label="Alderaan shot" value={alderaan.toFixed(2)} unit="× 10³² J" tone="red" note="Earth binding energy" />
          </Panel>
          <Panel accent={THEME.cyan} padding="p-4">
            <StatBlock label="Dry mass" value={mass.toFixed(0)} unit="× 10¹⁷ kg" tone="cyan" note="~10¹⁸ kg design basis" />
          </Panel>
          <Panel accent={THEME.green} padding="p-4">
            <StatBlock label="Crew" value={crew.toFixed(1)} unit="× 10⁶" tone="green" note="1.7 M personnel" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="Surface area" value="45,200" unit="km²" note="4πr² presented" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="Volume" value="9.05" unit="× 10¹⁴ m³" note="Interior envelope" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="TIE complement" value="7,200" note="~100 wings" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="Build time" value="19" unit="years" note="Orbital assembly" />
          </Panel>
        </div>

        {/* Live diagram */}
        <Panel accent={THEME.amber} title="STATION SCHEMATIC" code="DS-1 · OPERATIONAL">
          <div className="aspect-square">
            <StationDiagram buildProgress={1} firing={firing} showLabels={false} size={360} />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={startFire}
              disabled={firing > 0}
              className="flex-1 py-2 text-xs tracking-widest uppercase transition"
              style={{
                background: firing > 0 ? THEME.green : THEME.red,
                color: '#fff',
                fontFamily: "'Chakra Petch', sans-serif",
                opacity: firing > 0 ? 0.5 : 1,
                cursor: firing > 0 ? 'default' : 'pointer',
              }}
            >
              {firing > 0 ? 'FIRING...' : 'COMMENCE PRIMARY IGNITION'}
            </button>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="EXECUTIVE SUMMARY" accent={THEME.amber} code="DOC-001 §0">
          <p className="text-sm leading-relaxed mb-3" style={{ color: THEME.text }}>
            The DS-1 Orbital Battle Station is <span style={{ color: THEME.amber }}>engineerable-on-paper</span> if, and only if, one accepts a single irreducible physics concession: a bulk-matter substrate with specific energy density at or above c² (canonical <span style={{ color: THEME.amber }}>hypermatter</span>).
          </p>
          <p className="text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
            Given that concession, every downstream subsystem — reactor, superlaser, shield, drive, turbolasers — follows as a finite extrapolation of known engineering. Remove hypermatter and the concept collapses across six independent physics walls.
          </p>
        </Panel>

        <Panel title="WHAT WORKS" accent={THEME.green} code="§10">
          <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
            {[
              'Modular sphere construction',
              'Equatorial trench as stiffener',
              'Whipple micrometeoroid shielding',
              'M-type asteroid ISRU',
              'Ion-array sublight at milli-g',
              'ECLSS scaled from ISS + submarine',
              'MARAUDER-class compact-toroid turbolasers',
              'HPM ion cannons (Leonidas-class)',
              'Distributed zone-level C3',
            ].map(x => (
              <li key={x} className="flex items-start gap-2">
                <div className="mt-1" style={{ width: 5, height: 5, background: THEME.green, flexShrink: 0 }} />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="WHAT FAILS" accent={THEME.red} code="§10">
          <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
            {[
              ['Superlaser', 'optics + EM-matter coupling gap'],
              ['Hypermatter reactor', 'c²-class storage'],
              ['Hyperdrive', 'metric engineering'],
              ['Tractor beam', 'no pull mechanism'],
              ['Gravity plates', 'no mechanism'],
              ['Waste heat at hypermatter scale', '10²⁹ J/shot'],
            ].map(([x, n]) => (
              <li key={x} className="flex items-start gap-2">
                <div className="mt-1" style={{ width: 5, height: 5, background: THEME.red, flexShrink: 0 }} />
                <div>
                  <span style={{ color: THEME.text }}>{x}</span>
                  <span style={{ color: THEME.textDim }}> · {n}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Energy scale chart */}
      <Panel title="ENERGY-SCALE RECONCILIATION" accent={THEME.red} code="§2.1">
        <p className="text-xs mb-4" style={{ color: THEME.textMuted }}>
          Alderaan's destruction at 2.24 × 10³² J matches Earth's gravitational binding energy and equals one week of the Sun's total luminosity. Log-scale comparison.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ENERGY_COMPARISONS} layout="horizontal" margin={{ top: 10, right: 20, bottom: 60, left: 20 }}>
              <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
              <XAxis
                dataKey="label"
                tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                angle={-35}
                textAnchor="end"
                interval={0}
                stroke={THEME.border}
                height={80}
              />
              <YAxis
                scale="log"
                domain={[1e13, 1e40]}
                tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                tickFormatter={v => v.toExponential(0)}
                stroke={THEME.border}
              />
              <Tooltip
                contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.amber}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                formatter={v => `${v.toExponential(2)} J`}
              />
              <Bar dataKey="joules" fill={THEME.amber}>
                {ENERGY_COMPARISONS.map((e, i) => {
                  const isAlderaan = e.label.includes('Alderaan');
                  const isWong = e.label.includes('Wong');
                  const color = isAlderaan ? THEME.red : isWong ? THEME.purple : THEME.amber;
                  return <Cell key={i} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
};

