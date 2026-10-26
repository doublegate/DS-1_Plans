import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter,
} from 'recharts';
import { Atom } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, StatBlock, SectionHeader, Pill,
} from '../components';
import {
  CREW_MANIFEST, PROPULSION_DATA, ECLSS_DAILY, FIGHTER_COMPLEMENT,
} from '../data';
import type { NavigableTabProps, PropulsionRow, CrewRow } from '../types';

export const DriveTab: React.FC<NavigableTabProps> = ({ onNavigate }) => {
  const [selectedCrew, setSelectedCrew] = useState<CrewRow | null>(null);
  const totalCrew = CREW_MANIFEST.reduce((acc, r) => acc + r.count, 0);

  return (
    <div>
      <SectionHeader
        kicker="§05–06 · PROPULSION, HYPERDRIVE & LIFE SUPPORT"
        title="Drive Systems and Closed-Loop ECLSS"
        description="Sublight: two Sepma 30-5 ion engines plus equatorial thruster array. Hyperdrive: 123 Isu-Sim SSP06 field generators, Class 4 primary. ECLSS: 425,000× ISS closed-loop throughput serving ~1.75 M embarked personnel."
      />

      {/* Propulsion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="SUBLIGHT PROPULSION BENCHMARKS" accent={THEME.cyan} code="§05.1">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.55 }}>
            NEXT-C scaling: 1 milli-g acceleration on 1.0 × 10¹⁸ kg requires 4.24 × 10¹³ thrusters drawing 4.5 × 10¹⁴ W. Canonical 10 MGLT rating maps to a reactor-fed micro- to milli-g orbital-maneuvering regime.
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, left: 25, bottom: 30 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis
                  type="number"
                  dataKey="isp"
                  name="Isp"
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  scale="log"
                  domain={[1e3, 1e8]}
                  tickFormatter={(v: number) => `${v.toExponential(0)}s`}
                  label={{ value: 'Specific Impulse Isp (s)', position: 'insideBottom', offset: -8, fill: THEME.textMuted, fontSize: 11 }}
                />
                <YAxis
                  type="number"
                  dataKey="thrust"
                  name="Thrust"
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  scale="log"
                  domain={[0.01, 1e11]}
                  tickFormatter={(v: number) => `${v.toExponential(0)}N`}
                  label={{ value: 'Thrust (N)', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: THEME.panel,
                    border: `1px solid ${THEME.cyan}`,
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono',
                  }}
                  cursor={{ stroke: THEME.cyan }}
                  formatter={(_v, _n, p) => {
                    const row = p?.payload as PropulsionRow | undefined;
                    return [
                      row
                        ? `${row.engine}: Isp ${row.isp.toExponential(1)} s, Thrust ${row.thrust.toExponential(1)} N, Power ${row.power.toExponential(1)} W`
                        : '',
                      'Thruster',
                    ];
                  }}
                />
                <Scatter data={PROPULSION_DATA} fill={THEME.cyan}>
                  {PROPULSION_DATA.map((d, i) => (
                    <Cell key={i} fill={d.engine.includes('canon') ? THEME.amber : THEME.cyan} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs" style={{ color: THEME.textDim }}>
            <span>Amber point: Sepma 30-5 canonical relativistic ion array (Isp ~ 10⁷ s).</span>
            <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-6')}>HW-6 · RECOIL &amp; DRIVE ↗</Pill>
          </div>
        </Panel>

        <Panel title="HYPERDRIVE · METRIC SOLITON CONCESSION" accent={THEME.purple} code="§05.2 / HW-7">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <StatBlock compact label="Field generators" value="123" unit="× SSP06" note="Isu-Sim sector-coherent array" />
            <StatBlock compact label="Hyperdrive class" value="Class 4" note="Primary; Class 24 backup (DR-08)" />
            <StatBlock compact label="Bubble field energy" value="~10⁴⁵" unit="J" tone="red" note="~50 solar rest-energies" />
            <StatBlock compact label="Nearest metric analog" value="Lentz soliton" note="Class. Quantum Grav. 38 (2021)" tone="cyan" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
              <thead>
                <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                  <th className="text-left py-1.5 pr-2">METRIC FRAMEWORK</th>
                  <th className="text-left py-1.5 pr-2">ENERGY FLOOR</th>
                  <th className="text-left py-1.5">ARCHITECTURAL FIT</th>
                </tr>
              </thead>
              <tbody style={{ color: THEME.text }}>
                {[
                  ['Alcubierre warp (1994)', '~10⁶⁴ J negative', 'Poor · violates energy conditions'],
                  ['Lentz plasma soliton (2021)', '~0.1–50 M☉c² (+E)', 'Best GR positive-energy fit'],
                  ['Morris-Thorne wormhole', '~−M☉c² exotic', 'Poor · fixed portal endpoints'],
                  ['Randall-Sundrum brane bulk', 'Tunable brane tension', 'Matches canon "hyperspace" manifold'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                    {r.map((c, j) => (
                      <td
                        key={j}
                        className="py-1.5 pr-2"
                        style={
                          j === 2
                            ? { color: c.includes('Matches') ? THEME.green : c.includes('Best') ? THEME.cyan : THEME.textDim }
                            : {}
                        }
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-7')}>HW-7 · SOLITON ENERGY ↗</Pill>
            <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'DR-08')}>DR-08 · CLASS 4 SPEC ↗</Pill>
          </div>
        </Panel>
      </div>

      {/* ECLSS */}
      <SectionHeader
        kicker="§06 · ENVIRONMENTAL CONTROL & LIFE SUPPORT"
        title="ECLSS & Embarked Force Complement"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title={`CREW MANIFEST · ${(totalCrew / 1e6).toFixed(2)}M EMBARKED`} accent={THEME.green} code="§06.1">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CREW_MANIFEST}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={82}
                  innerRadius={38}
                  paddingAngle={1}
                  onMouseEnter={(_, i) => setSelectedCrew(CREW_MANIFEST[i])}
                  onClick={(_, i) => setSelectedCrew(CREW_MANIFEST[i])}
                >
                  {CREW_MANIFEST.map((m, i) => (
                    <Cell
                      key={i}
                      fill={m.color}
                      stroke={selectedCrew?.role === m.role ? THEME.amber : THEME.panel}
                      strokeWidth={selectedCrew?.role === m.role ? 2 : 1}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: THEME.panel,
                    border: `1px solid ${THEME.green}`,
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono',
                  }}
                  formatter={(v) => [Number(v ?? 0).toLocaleString(), 'Personnel']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Complete 8-row crew manifest (no .slice(0,5) truncation!) */}
          <div className="space-y-1 text-xs mt-2" style={{ fontFamily: "'JetBrains Mono'" }}>
            {CREW_MANIFEST.map(m => {
              const active = selectedCrew?.role === m.role;
              return (
                <button
                  key={m.role}
                  type="button"
                  onClick={() => setSelectedCrew(m)}
                  onMouseEnter={() => setSelectedCrew(m)}
                  className="w-full flex justify-between items-center px-1.5 py-0.5 text-left"
                  style={{
                    background: active ? THEME.panelHi : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div style={{ width: 7, height: 7, background: m.color, flexShrink: 0 }} />
                    <span style={{ color: active ? THEME.amber : THEME.text }}>{m.role}</span>
                  </div>
                  <span className="tabular-nums" style={{ color: THEME.textMuted }}>
                    {m.count.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title="DAILY ECLSS MASS THROUGHPUT" accent={THEME.green} code="§06.2 / DR-06">
          <div className="space-y-3">
            {ECLSS_DAILY.map((e, i) => {
              const maxVal = Math.max(...ECLSS_DAILY.map(x => x.kg));
              const pct = (e.kg / maxVal) * 100;
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: THEME.text }}>{e.input}</span>
                    <span className="tabular-nums" style={{ color: THEME.green, fontFamily: "'JetBrains Mono'" }}>
                      {(e.kg / 1000).toLocaleString()} t/day ({e.perPerson} kg/p)
                    </span>
                  </div>
                  <div className="h-2" style={{ background: THEME.bg }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: THEME.green }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 text-xs" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.55 }}>
            Scale factor: 425,000× ISS · 12,143× Virginia-class SSN (90-d patrol) · 285× Nimitz-class CVN provisioning. Closes ≥ 90% mass balance over 3-year endurance via Sabatier + OGA + WRS loops (DR-06).
          </div>
        </Panel>

        <Panel title="EMBARKED STRIKE & GARRISON CRAFT" accent={THEME.cyan} code="§06.6">
          <div className="space-y-2.5">
            {FIGHTER_COMPLEMENT.map((c, i) => (
              <div
                key={i}
                className="flex justify-between items-baseline py-2"
                style={{ borderBottom: i < FIGHTER_COMPLEMENT.length - 1 ? `1px solid ${THEME.border}50` : 'none' }}
              >
                <span className="text-xs" style={{ color: THEME.text, fontFamily: "'Chakra Petch'" }}>{c.craft}</span>
                <span className="text-sm tabular-nums" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>
                  {c.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 text-xs" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.55 }}>
            Hangar bay volumetric allocation consumes ~0.003% of the 9.05 × 10¹⁴ m³ sphere interior; AT-AT / drop-barge staging bays occupy ~2 × 10⁷ m³ along the equatorial trench.
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="ARTIFICIAL GRAVITY · HANDWAVIUM ANALYSIS" accent={THEME.purple} code="§06.4 / HW-8">
          <div className="grid grid-cols-2 gap-3">
            <StatBlock compact label="ω for 1g @ R=60km" value="0.0128" unit="rad/s" note="Spin period: 491 s (8.2 min)" />
            <StatBlock compact label="Equatorial rim v" value="767" unit="m/s" note="Mach 2.2 tangential speed" />
            <StatBlock compact label="Coriolis @ 1.5 m/s walk" value="0.038" unit="m/s²" note="≈ 0.004 g — imperceptible" />
            <StatBlock compact label="Centrifugal hoop stress" value="144" unit="MPa" note="Within maraging steel envelope" />
          </div>
          <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.purple}55` }}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <Atom size={14} style={{ color: THEME.purple, marginTop: 2, flexShrink: 0 }} />
                <div className="text-xs" style={{ color: THEME.textMuted, lineHeight: 1.55 }}>
                  Centrifugal rotation yields 1 g only along the equatorial belt with cos(lat) falloff to 0 g at the poles, and contradicts horizontal deck plates in the northern hemisphere. Canon requires flat-field &ldquo;gravity plates&rdquo; (HW-8 / DR-15).
                </div>
              </div>
              <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-8')}>HW-8 ↗</Pill>
            </div>
          </div>
        </Panel>

        <Panel title="NON-REACTOR HOTEL & ECLSS THERMAL LOADS" accent={THEME.cyan} code="§06.5">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { src: 'Crew metabolic', w: 0.17 },
                  { src: 'ECLSS processing', w: 0.50 },
                  { src: 'Lighting & HVAC', w: 1.00 },
                  { src: 'Droids & avionics', w: 0.40 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 25, left: 125, bottom: 15 }}
              >
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  label={{ value: 'Thermal Load (GW)', position: 'insideBottom', offset: -8, fill: THEME.textMuted, fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="src"
                  tick={{ fill: THEME.text, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  width={120}
                  stroke={THEME.border}
                />
                <Tooltip
                  contentStyle={{
                    background: THEME.panel,
                    border: `1px solid ${THEME.cyan}`,
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono',
                  }}
                  formatter={(v) => [`${v ?? 0} GW`, 'Thermal Load']}
                />
                <Bar dataKey="w" fill={THEME.cyan} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 text-xs" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.55 }}>
            Total hotel/ECLSS load is ~2.07 GW — radiating at 300 K requires only 4.5 km² (0.01% of the 45,200 km² hull). Life support is thermally trivial; the hypermatter reactor dominates thermal architecture by 18 orders of magnitude.
          </div>
        </Panel>
      </div>
    </div>
  );
};
