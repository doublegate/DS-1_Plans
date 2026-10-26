import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import { THEME } from '../theme';
import {
  Panel, StatBlock, SectionHeader, Pill,
} from '../components';
import { MASS_BUDGET } from '../data';
import type { NavigableTabProps, MassBudgetRow } from '../types';

export const StructureTab: React.FC<NavigableTabProps> = ({ onNavigate }) => {
  const [selected, setSelected] = useState<MassBudgetRow>(MASS_BUDGET[0]);

  return (
    <div>
      <SectionHeader
        kicker="§02 · STRUCTURAL ARCHITECTURE & MATERIALS"
        title="Structure, Materials, and Mass Budget"
        description="120-km sphere encloses 9.05 × 10¹⁴ m³. Spherical geometry chosen for minimum surface/volume ratio; equatorial and mid-latitude trenches act as thermal-expansion stiffeners, accommodating ~360 m of ΔL across the 250 K sun/shade terminator gradient."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Geometry readouts */}
        <Panel title="GEOMETRY OF RECORD" accent={THEME.amber} code="§02.1">
          <div className="grid grid-cols-2 gap-3">
            <StatBlock label="Radius (R)" value="60" unit="km" note="120 km diameter (DR-04)" />
            <StatBlock label="Surface area (A_s)" value="4.52" unit="× 10¹⁰ m²" note="45,200 km² outer hull" />
            <StatBlock label="Volume (V)" value="9.05" unit="× 10¹⁴ m³" note="~86% internal void fraction" />
            <StatBlock label="Great circle" value="377" unit="km" note="Equatorial trench circumference" />
            <StatBlock label="Pole to pole" value="188" unit="km arc" note="Meridian expansion sector" />
            <StatBlock label="Surface g" value="1.85" unit="× 10⁻² m/s²" note="Self-gravity only" />
            <StatBlock label="Central pressure" value="1.2" unit="MPa" note="Gravitational self-compression" />
            <StatBlock label="ΔT across hull" value="250" unit="K" note="Sunlit vs. shadow hemisphere (DR-05)" />
          </div>
        </Panel>

        {/* Mass composition pie + persistent interactive 9-row breakdown */}
        <Panel title="MASS BUDGET · 1.0 × 10¹⁸ kg TOTAL" accent={THEME.amber} code="§02.2 / Appx A">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MASS_BUDGET}
                    dataKey="fraction"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={88}
                    paddingAngle={1}
                    onMouseEnter={(_, i) => setSelected(MASS_BUDGET[i])}
                    onClick={(_, i) => setSelected(MASS_BUDGET[i])}
                  >
                    {MASS_BUDGET.map((m, i) => (
                      <Cell
                        key={i}
                        fill={m.color}
                        stroke={selected.name === m.name ? '#fff' : THEME.panel}
                        strokeWidth={selected.name === m.name ? 2 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: THEME.panel,
                      border: `1px solid ${THEME.amber}`,
                      fontSize: 12,
                      fontFamily: 'JetBrains Mono',
                    }}
                    formatter={(v, _n, p) => {
                      const row = p?.payload as MassBudgetRow | undefined;
                      return [
                        `${v ?? 0}% · ${row ? row.mass.toExponential(1) : ''} kg`,
                        row?.name ?? '',
                      ];
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1">
              {MASS_BUDGET.map(m => {
                const isSel = selected.name === m.name;
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setSelected(m)}
                    onMouseEnter={() => setSelected(m)}
                    className="w-full flex items-center justify-between px-2 py-1 text-xs text-left transition-colors"
                    style={{
                      background: isSel ? THEME.panelHi : 'transparent',
                      border: `1px solid ${isSel ? THEME.amber : 'transparent'}`,
                      color: isSel ? THEME.text : THEME.textMuted,
                      cursor: 'pointer',
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span style={{ width: 8, height: 8, background: m.color, display: 'inline-block', flexShrink: 0 }} />
                      <span>{m.name}</span>
                    </span>
                    <span className="tabular-nums font-semibold" style={{ color: isSel ? THEME.amber : THEME.text }}>
                      {m.fraction}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 p-3 border" style={{ borderColor: THEME.border, background: THEME.bg }}>
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold" style={{ color: THEME.amber, fontFamily: "'Chakra Petch', sans-serif" }}>
                {selected.name.toUpperCase()}
              </div>
              <div className="text-xs tabular-nums" style={{ color: THEME.cyan }}>
                {selected.mass.toExponential(2)} kg · {selected.fraction}% of dry mass
              </div>
            </div>
            <div className="text-xs mt-1" style={{ color: THEME.textMuted }}>
              Material specification: {selected.material}
            </div>
          </div>
        </Panel>
      </div>

      {/* Materials canonical → real-analog mapping */}
      <Panel title="CANON MATERIALS → REAL-WORLD ANALOGS" accent={THEME.amber} code="§02.3" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${THEME.border}`, color: THEME.textMuted }}>
                <th className="text-left py-2 px-3">CANON MATERIAL</th>
                <th className="text-left py-2 px-3">APPLICATION</th>
                <th className="text-left py-2 px-3">REAL ANALOG</th>
                <th className="text-left py-2 px-3">ρ (g/cm³)</th>
                <th className="text-left py-2 px-3">σ_y (MPa)</th>
                <th className="text-left py-2 px-3">T_max (K)</th>
              </tr>
            </thead>
            <tbody style={{ color: THEME.text }}>
              {[
                ['Quadanium steel', 'Outer hull plating', '18Ni-300 maraging steel', '8.00', '1,700–2,400', '773'],
                ['Quadanium steel (hot)', 'Trench & exhaust zones', 'Inconel 718 superalloy', '8.19', '≤ 1,512', '973'],
                ['Durasteel', 'Internal deck trusses', 'Ti-6Al-4V / CNT laminate', '4.43', '880 / ≤ 60,000', '820'],
                ['Agrinium', 'Reactor radiation shield', 'Borated SS + W inserts', '7.80', '~600', '1,200'],
                ['Transparisteel', 'Armored viewports', 'ALON / MgAl₂O₄ spinel', '3.69', '≥ 3,000 comp.', '2,327'],
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
        <div className="mt-3 text-xs pt-3 flex flex-wrap items-center justify-between gap-2" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}` }}>
          <span>
            Throughput constraint dominates: terrestrial maraging-steel output (~50,000 t/yr) would require 10¹¹ years. M-type asteroid ISRU with self-replicating robotics is mandatory.
          </span>
          <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-10')}>
            HW-10 · KARDASHEV-II ISRU ↗
          </Pill>
        </div>
      </Panel>

      {/* Asteroid ISRU */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="M-TYPE ASTEROID FEEDSTOCK" accent={THEME.cyan} code="§02.5">
          <div className="space-y-3">
            {[
              ['16 Psyche', '2.72 × 10¹⁹ kg', '222 km dia.', '30–60% Fe-Ni', 'Canonical primary feedstock'],
              ['216 Kleopatra', '2.97 × 10¹⁸ kg', '135 km mean', 'Low-density M', 'Marginal 3× station mass'],
              ['21 Lutetia', '1.70 × 10¹⁸ kg', '98 km mean', 'M-type variant', 'Secondary reserve'],
              ['Main-belt M total', '~1.0 × 10²¹ kg', 'Distributed', 'Fe-Ni-Co rich', '1,000+ station equivalents'],
            ].map(([n, m, d, f, note], i) => (
              <div key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}` : 'none' }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{n}</span>
                  <span className="text-xs tabular-nums" style={{ color: THEME.cyan }}>{m}</span>
                </div>
                <div className="text-xs mt-0.5 flex justify-between" style={{ color: THEME.textMuted }}>
                  <span>{d} · {f}</span>
                  <span style={{ color: THEME.textDim }}>{note}</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="EXTRACTION THROUGHPUT" accent={THEME.cyan} code="§02.5 / DR-09">
          <div className="space-y-3">
            <StatBlock compact label="Mass required" value="1.0 × 10¹⁸" unit="kg" note="Design-basis dry mass (DR-04)" />
            <StatBlock compact label="Program window" value="19" unit="years" note="Concurrent orbital assembly (DR-09)" />
            <StatBlock compact label="Sustained mass flow" value="1.6 × 10⁹" unit="kg/s" note="10¹⁰× current mining projections" tone="red" />
            <StatBlock compact label="Refining power" value="1.6 × 10¹⁶" unit="W continuous" note="1,000× terrestrial civilization" tone="red" />
            <StatBlock compact label="Enabling concession" value="K-II ISRU" note="Self-replicating von Neumann swarms" tone="cyan" />
          </div>
        </Panel>

        <Panel title="STRUCTURAL LOADS & MARGINS" accent={THEME.amber} code="§02.4">
          <div className="space-y-3">
            <div>
              <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>Superlaser momentum recoil</div>
              <div className="text-sm font-semibold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                7.47 × 10²³ N·s / shot
              </div>
              <div className="text-xs" style={{ color: THEME.textDim }}>Requires axial thrust bracing; Δv ≤ 1 m/s via HW-6 (DR-14)</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>Terminator thermal ΔL</div>
              <div className="text-sm font-semibold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                ~360 m expansion
              </div>
              <div className="text-xs" style={{ color: THEME.textDim }}>α = 12×10⁻⁶ /K × 120 km × 250 K → trench slip joints (DR-05)</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>Moment of inertia (I)</div>
              <div className="text-sm font-semibold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                1.44 × 10²⁴ kg·m²
              </div>
              <div className="text-xs" style={{ color: THEME.textDim }}>(2/5)MR² uniform-sphere reference baseline</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>Hoop stress @ 1g spin</div>
              <div className="text-sm font-semibold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                144 MPa
              </div>
              <div className="text-xs" style={{ color: THEME.textDim }}>Station does not spin; artificial gravity plates used (HW-8)</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};
