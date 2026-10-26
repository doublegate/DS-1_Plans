import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Skull } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, SectionHeader, Pill, StationDiagram,
} from '../components';
import {
  WEAPONS_DS1, WEAPONS_DS2, DS1_VS_DS2,
} from '../data';
import type { NavigableTabProps } from '../types';

export const DS2Tab: React.FC<NavigableTabProps> = ({ onNavigate }) => {
  const weaponsComparison = WEAPONS_DS1.map((w, i) => ({
    name: w.name,
    ds1: w.count,
    ds2: WEAPONS_DS2[i].count,
  }));

  return (
    <div>
      <SectionHeader
        kicker="§12 / APPENDIX A2 · DS-2 DELTA SPECIFICATION"
        title="DS-2 Mobile Battle Station — Redesign & Delta Budget"
        description="160-km diameter (1.33× linear scale, 2.37 × 10¹⁸ kg design-basis mass). Superlaser recharge compressed from 24 h to ~3–5 min across 3 hypermatter cores (7.8 × 10²⁷ W sum). Exhaust port replaced by ~1.8 × 10⁷ millimeter capillaries; primary shield offloaded to Endor moon (SLD-26)."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="DS-1 vs DS-2 COMPARATIVE SCHEMATIC" accent={THEME.amber} code="§12.1 · SCALE TO FRAME">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-center mb-2 font-semibold" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>
                DS-1 · 120 km (1.00 × 10¹⁸ kg)
              </div>
              <div className="aspect-square">
                <StationDiagram buildProgress={1} firing={0} showLabels={false} size={220} variant="DS1" />
              </div>
            </div>
            <div>
              <div className="text-xs text-center mb-2 font-semibold" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'" }}>
                DS-2 · 160 km (2.37 × 10¹⁸ kg)
              </div>
              <div className="aspect-square">
                <StationDiagram buildProgress={0.72} firing={0} showLabels={false} size={220} variant="DS2" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs flex flex-wrap items-center justify-between gap-2" style={{ color: THEME.textDim, lineHeight: 1.55 }}>
            <span>
              DS-2 rendered at 72% hull closure matching the Battle of Endor posture: superlaser, 3 reactor cores, and C3 were fully operational while southern-hemisphere armor plating remained open (FMEA E-21).
            </span>
            <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'E-21')}>FMEA E-21 ↗</Pill>
          </div>
        </Panel>

        <Panel title="SUPERLASER & REACTOR ARCHITECTURE UPGRADES" accent={THEME.red} code="§12.3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
              <thead>
                <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                  <th className="text-left py-2 pr-2">PARAMETER</th>
                  <th className="text-left py-2 pr-2">DS-1 (MK I)</th>
                  <th className="text-left py-2">DS-2 (MK II)</th>
                </tr>
              </thead>
              <tbody style={{ color: THEME.text }}>
                {[
                  ['Tributary geometry', '8 equal peripheral', '7 peripheral + 1 central'],
                  ['Full-power recharge', '~24 hours (86,400 s)', '~3–5 minutes (conservative: low-duty)'],
                  ['Capital-ship targeting', 'No (planetary grid only)', 'Yes (vernier phase-steering)'],
                  ['Hypermatter cores', '1 × SFS-CR27200 (2.6×10²⁷ W)', '3 × cores (7.8×10²⁷ W sum)'],
                  ['Low-power shot cadence', 'Single-reactor test mode', '3-min anti-cruiser fire (~10¹⁸ J)'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 4 ? `1px solid ${THEME.border}50` : 'none' }}>
                    {r.map((c, j) => (
                      <td
                        key={j}
                        className="py-2 pr-2"
                        style={j === 0 ? { color: THEME.amber } : j === 2 ? { color: THEME.cyan } : {}}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.amber}45` }}>
            <div className="text-xs" style={{ color: THEME.textMuted, lineHeight: 1.55 }}>
              <strong style={{ color: THEME.amber }}>Capital-ship kill arithmetic (§12.3):</strong> Vaporizing a Mon Calamari Star Cruiser (~10⁸ kg hull) requires ~10¹⁵–10¹⁸ J — 14 orders of magnitude below an Alderaan planet-kill shot. A 3-minute recharge at capital-ship energy draws only 5.5 × 10¹²–5.5 × 10¹⁵ W, easily sustained by the existing reactor without violating the 24-hour planetary-shot buffer cycle.
            </div>
          </div>
        </Panel>
      </div>

      {/* Weapons comparison — horizontal layout so battery names never clip */}
      <Panel title="SURFACE WEAPONS COMPLEMENT · DS-1 vs DS-2" accent={THEME.red} code="§12.6" className="mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weaponsComparison}
              layout="vertical"
              margin={{ top: 5, right: 25, left: 150, bottom: 10 }}
            >
              <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                stroke={THEME.border}
              />
              <YAxis
                type="category"
                dataKey="name"
                width={145}
                tick={{ fill: THEME.text, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                stroke={THEME.border}
              />
              <Tooltip
                contentStyle={{
                  background: THEME.panel,
                  border: `1px solid ${THEME.red}`,
                  fontSize: 12,
                  fontFamily: 'JetBrains Mono',
                }}
                formatter={(v) => [Number(v ?? 0).toLocaleString(), 'Emplacements']}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: 'Chakra Petch' }} />
              <Bar dataKey="ds1" fill={THEME.amber} name="DS-1 (120 km)" />
              <Bar dataKey="ds2" fill={THEME.cyan} name="DS-2 (160 km)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-xs" style={{ color: THEME.textDim, lineHeight: 1.55 }}>
          DS-2 triples turbolaser and laser-cannon density across its 1.78× larger surface area. Tractor-beam projector count remains invariant at 768 (24 sector bridges × 32 projectors per sector).
        </div>
      </Panel>

      {/* Comparative param table */}
      <Panel title="FULL DS-1 vs DS-2 PARAMETER DELTA MATRIX" accent={THEME.amber} code="§12.2 / Appx A2" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
            <thead>
              <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left py-2 px-3">PARAMETER</th>
                <th className="text-left py-2 px-3">DS-1 BASELINE</th>
                <th className="text-left py-2 px-3">DS-2 REDESIGN DELTA</th>
              </tr>
            </thead>
            <tbody>
              {DS1_VS_DS2.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${THEME.border}40` }}>
                  <td className="py-2 px-3" style={{ color: THEME.text }}>{row.param}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: THEME.amber }}>{row.ds1}</td>
                  <td className="py-2 px-3 tabular-nums" style={{ color: THEME.cyan }}>{row.ds2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Shield offload analysis */}
      <Panel title="SLD-26 ENDOR PLANETARY SHIELD · DECOUPLED SPOF ANALYSIS" accent={THEME.cyan} code="§12.4 / DR-11 / E-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-xs mb-4" style={{ color: THEME.text, lineHeight: 1.6 }}>
              DS-2&apos;s CoMar SLD-26 Planetary Shield Generator was emplaced on the Forest Moon of Endor (radius ~2,450 km), projecting an umbilical envelope around the orbital station via geostationary repulsorlift station-keeping.
            </p>
            <div className="text-xs uppercase tracking-widest mb-2" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              Engineering Rationales (Ranked)
            </div>
            <ol className="space-y-3 text-xs" style={{ color: THEME.text }}>
              {[
                {
                  title: 'Thermal & power-bus isolation',
                  desc: 'Operating 3 hypermatter cores + rapid-fire superlaser + full-envelope shield inside an open superstructure exceeded onboard radiator loops; offloading dumped waste heat into Endor’s planetary crust.',
                },
                {
                  title: 'Open-frame construction protection',
                  desc: 'With 28% of the hull unplated during Phase 3–4 assembly, onboard sector shield projectors lacked continuous structural mounting rings.',
                },
                {
                  title: 'Planetary geothermal/tidal sink',
                  desc: 'Canon notes SLD-26 caused measurable Endor seismic and hydrological disruption — consistent with planetary-scale ground-sink coupling.',
                },
                {
                  title: 'Operational fleet-trap posture',
                  desc: 'Projected an apparently vulnerable unfinished hull while maintaining an impenetrable external barrier to bait the Rebel Fleet into a decisive engagement.',
                },
              ].map((r, i) => (
                <li key={i} className="pl-5 relative">
                  <span className="absolute left-0 top-0" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                    {i + 1}.
                  </span>
                  <div style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{r.title}</div>
                  <div className="text-xs mt-0.5" style={{ color: THEME.textMuted }}>{r.desc}</div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="p-4" style={{ background: THEME.bg, border: `1px solid ${THEME.red}` }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Skull size={16} style={{ color: THEME.red, flexShrink: 0 }} />
                  <div className="text-sm" style={{ color: THEME.red, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                    NON-COMPLIANCE WITH DR-11 (SINGLE POINT OF FAILURE)
                  </div>
                </div>
                <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'E-20')}>E-20 (RPN 450) ↗</Pill>
              </div>
              <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
                Violates Derived Requirement <strong style={{ color: THEME.cyan }}>DR-11</strong> (&ldquo;No single point of failure in shield generation&rdquo;). A single commando/indigenous ground raid destroyed the bunker and collapsed the entire orbital barrier, allowing starfighters to fly directly into the unplated reactor core through open superstructure bays.
              </p>
              <div className="text-xs uppercase tracking-widest mb-2 mt-4" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                Post-Endor Retrofit Specification (§12.4)
              </div>
              <ul className="space-y-1.5 text-xs" style={{ color: THEME.text }}>
                {[
                  'N ≥ 3 geographically separated surface/Lagrange-point SLD-26 nodes with 2-of-3 quorum sustainment',
                  'Automated onboard reserve particle shield across all reactor-core access shafts (DR-10)',
                  'Fail-closed armored bulkhead iris doors along all unfinished superstructure corridors (E-21)',
                  'ICBM Launch Control Center Permissive Action Link interlocks preventing single-bunker takedown',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5" style={{ width: 5, height: 5, background: THEME.green, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 p-3 flex items-center justify-between gap-2" style={{ background: THEME.bg, border: `1px solid ${THEME.amber}45` }}>
              <div className="text-xs" style={{ color: THEME.textMuted, lineHeight: 1.55 }}>
                <strong style={{ color: THEME.amber }}>Systems engineering lesson:</strong> DS-2 solved the 2-m thermal exhaust port completely, then recreated an even higher-occurrence single point of failure on the forest floor below.
              </div>
              <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'DR-11')}>DR-11 ↗</Pill>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
