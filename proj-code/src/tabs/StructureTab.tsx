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

export const StructureTab: React.FC = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <SectionHeader
        kicker="SECTION II · STRUCTURAL ARCHITECTURE"
        title="Structure, Materials, and Mass Budget"
        description="120-km sphere encloses 9.05 × 10¹⁴ m³. Spherical geometry chosen for minimum surface/volume ratio; equatorial and mid-latitude trenches act as thermal-expansion stiffeners, accommodating ~360 m of ΔL across the 250 K sun/shade terminator gradient."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Geometry readouts */}
        <Panel title="GEOMETRY OF RECORD" accent={THEME.amber} code="§1.1">
          <div className="grid grid-cols-2 gap-3">
            <StatBlock label="Radius" value="60" unit="km" />
            <StatBlock label="Surface area" value="4.52" unit="× 10¹⁰ m²" />
            <StatBlock label="Volume" value="9.05" unit="× 10¹⁴ m³" />
            <StatBlock label="Great circle" value="377" unit="km" />
            <StatBlock label="Pole to pole" value="188" unit="km arc" />
            <StatBlock label="Surface g" value="1.85" unit="× 10⁻² m/s²" note="Self-gravity only" />
            <StatBlock label="Central pressure" value="1.2" unit="MPa" note="Self-compression" />
            <StatBlock label="ΔT across hull" value="250" unit="K" note="Sun / shadow" />
          </div>
        </Panel>

        {/* Mass composition pie */}
        <Panel title="MASS BUDGET · 10¹⁸ kg TOTAL" accent={THEME.amber} code="§1.2">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={MASS_BUDGET}
                  dataKey="fraction"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={1}
                  onMouseEnter={(_, i) => setSelected(MASS_BUDGET[i])}
                  onMouseLeave={() => setSelected(null)}
                >
                  {MASS_BUDGET.map((m, i) => (
                    <Cell key={i} fill={m.color} stroke={THEME.panel} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.amber}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  formatter={(v, _, p) => `${v}% · ${p.payload.mass.toExponential(1)} kg`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 min-h-[50px] p-3 border" style={{ borderColor: THEME.border, background: THEME.bg }}>
            {selected ? (
              <div>
                <div className="text-xs" style={{ color: THEME.amber, fontFamily: "'Chakra Petch', sans-serif" }}>{selected.name.toUpperCase()}</div>
                <div className="text-[10px] mt-1" style={{ color: THEME.textMuted }}>{selected.material}</div>
                <div className="text-[10px]" style={{ color: THEME.textDim }}>{selected.mass.toExponential(2)} kg · {selected.fraction}%</div>
              </div>
            ) : (
              <div className="text-[10px]" style={{ color: THEME.textDim }}>Hover segments for subsystem detail</div>
            )}
          </div>
        </Panel>
      </div>

      {/* Materials canonical → real-analog mapping */}
      <Panel title="CANON MATERIALS → REAL-WORLD ANALOGS" accent={THEME.amber} code="§1.3" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${THEME.border}`, color: THEME.textMuted }}>
                <th className="text-left py-2 px-3">CANON</th>
                <th className="text-left py-2 px-3">APPLICATION</th>
                <th className="text-left py-2 px-3">REAL ANALOG</th>
                <th className="text-left py-2 px-3">ρ (g/cm³)</th>
                <th className="text-left py-2 px-3">σ_y (MPa)</th>
                <th className="text-left py-2 px-3">T_max (K)</th>
              </tr>
            </thead>
            <tbody style={{ color: THEME.text }}>
              {[
                ['Quadanium steel', 'Hull plating', '18Ni-300 maraging', '8.0', '1,700–2,400', '773'],
                ['Quadanium steel (hot)', 'Hot zones', 'Inconel 718', '8.19', '≤ 1,512', '973'],
                ['Durasteel', 'Internal structure', 'Ti-6Al-4V / CNT laminate', '4.43', '880 / ≤ 60,000', '820'],
                ['Agrinium', 'Reactor shield', 'Borated SS + W inserts', '7.8', '~600', '1,200'],
                ['Transparisteel', 'Viewports', 'ALON / Mg-Al spinel', '3.69', '≥ 3,000 comp.', '2,327'],
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${THEME.border}50` }}>
                  {r.map((c, j) => (
                    <td key={j} className="py-2 px-3" style={j === 0 ? { color: THEME.amber } : j === 2 ? { color: THEME.cyan } : {}}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-[10px] pt-3" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}` }}>
          Throughput constraint dominates, not strength. World maraging-steel production ≈ 50,000 t/yr; scaling to 10¹⁵ t of premium alloy at premium rates takes 10¹¹ years — 10× age of universe. Hence M-type asteroid ISRU with self-replicating robotics.
        </div>
      </Panel>

      {/* Asteroid ISRU */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="M-TYPE ASTEROID FEEDSTOCK" accent={THEME.cyan} code="§1.5">
          <div className="space-y-3">
            {[
              ['16 Psyche', '2.72 × 10¹⁹ kg', '222 km dia.', '30–60% metal', 'Canonical candidate'],
              ['216 Kleopatra', '2.97 × 10¹⁸ kg', '135 km mean', 'Low-density M', 'Marginal supply'],
              ['21 Lutetia', '1.7 × 10¹⁸ kg', '98 km mean', 'M-type variant', 'Secondary'],
              ['Main-belt M total', '~10²¹ kg', 'Many bodies', 'Distributed', '1,000+ stations'],
            ].map(([n, m, d, f, note], i) => (
              <div key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}` : 'none' }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{n}</span>
                  <span className="text-[10px]" style={{ color: THEME.cyan }}>{m}</span>
                </div>
                <div className="text-[10px] mt-0.5 flex justify-between" style={{ color: THEME.textMuted }}>
                  <span>{d} · {f}</span>
                  <span style={{ color: THEME.textDim }}>{note}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="EXTRACTION THROUGHPUT" accent={THEME.cyan} code="§1.5">
          <div className="space-y-4">
            <StatBlock label="Mass required" value="10¹⁸" unit="kg" note="Design basis" />
            <StatBlock label="Program window" value="20" unit="years" note="Concurrent with assembly" />
            <StatBlock label="Sustained flow" value="1.6 × 10⁹" unit="kg/s" note="10¹⁰× current mining projections" tone="red" />
            <StatBlock label="Processing power" value="1.6 × 10¹⁶" unit="W continuous" note="100,000× human consumption" tone="red" />
            <StatBlock label="Enabling tech" value="KII ISRU" note="Self-replicating robotics" tone="cyan" />
          </div>
        </Panel>

        <Panel title="STRUCTURAL LOADS" accent={THEME.amber} code="§1.4">
          <div className="space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Superlaser recoil</div>
              <div className="text-sm" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                ~10¹⁹ N / shot
              </div>
              <div className="text-[10px]" style={{ color: THEME.textDim }}>Requires axial back-brace; 750 m/s Δv at 10¹⁸ kg</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Thermal ΔL</div>
              <div className="text-sm" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                ~360 m
              </div>
              <div className="text-[10px]" style={{ color: THEME.textDim }}>12×10⁻⁶ × 120 km × 250 K = expansion joints at km scale</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Moment of inertia</div>
              <div className="text-sm" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                1.44 × 10²⁴ kg·m²
              </div>
              <div className="text-[10px]" style={{ color: THEME.textDim }}>(2/5)MR² for uniform sphere</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Hoop stress @ rot 1g</div>
              <div className="text-sm" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                144 MPa
              </div>
              <div className="text-[10px]" style={{ color: THEME.textDim }}>Marginal with composites; station doesn't rotate</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};

