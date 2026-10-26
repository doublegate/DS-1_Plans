import React, { useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { THEME } from '../theme';
import {
  Panel, StatBlock, SectionHeader, Pill, StationDiagram,
} from '../components';
import { ENERGY_COMPARISONS } from '../data';
import type { TabPropsWithFiring } from '../types';

export const CommandTab: React.FC<TabPropsWithFiring> = ({ firing, startFire, onNavigate }) => {
  const [showLabels, setShowLabels] = useState(true);

  return (
    <div>
      <SectionHeader
        kicker="§00–01 · EXECUTIVE SUMMARY & DESIGN BASIS"
        title="DS-1 Orbital Battle Station — Command Overview"
        description="Spherical battle station. 120 km nominal diameter (ANH baseline). Structural design-basis mass 1.0 × 10¹⁸ kg. Primary armament: hypermatter-sourced superlaser delivering ≥ 2.24 × 10³² J per full-power shot."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Tiered KPI column: 4 primary hero cards + unified 4-metric secondary envelope panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Panel accent={THEME.amber} padding="p-4" title="PRIMARY GEOMETRY" code="§01.2">
              <StatBlock label="Diameter" value="120" unit="km" tone="amber" note="ANH baseline (160 km DS-2)" />
            </Panel>
            <Panel accent={THEME.red} padding="p-4" title="WEAPON OUTPUT" code="§04.1">
              <StatBlock label="Alderaan shot" value="2.24" unit="× 10³² J" tone="red" note="Earth gravitational binding" />
            </Panel>
            <Panel accent={THEME.cyan} padding="p-4" title="MASS ENVELOPE" code="§02.2">
              <StatBlock label="Dry mass" value="1.00" unit="× 10¹⁸ kg" tone="cyan" note="1,105 kg/m³ bulk density" />
            </Panel>
            <Panel accent={THEME.green} padding="p-4" title="COMPLEMENT" code="§06.1">
              <StatBlock label="Crew baseline" value="1.7" unit="× 10⁶" tone="green" note="+ 400,000 maintenance droids" />
            </Panel>
          </div>

          <Panel
            accent={THEME.border}
            title="SECONDARY ENVELOPE & FORCE POSTURE PARAMETERS"
            code="§01.2–01.4"
            padding="p-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBlock compact label="Presented area" value="45,200" unit="km²" tone="default" note="4πR² outer hull" />
              <StatBlock compact label="Interior volume" value="9.05" unit="× 10¹⁴ m³" tone="default" note="357 deck levels" />
              <StatBlock compact label="TIE complement" value="7,200" unit="craft" tone="default" note="100 tactical wings" />
              <StatBlock compact label="Orbital build" value="19" unit="years" tone="default" note="Geonosis → Yavin" />
            </div>
          </Panel>

          <Panel title="EXECUTIVE SUMMARY & TRACEABILITY THESIS" accent={THEME.amber} code="§00.1">
            <p className="text-sm leading-relaxed mb-3 max-w-[68ch]" style={{ color: THEME.text }}>
              The DS-1 Orbital Battle Station is <span style={{ color: THEME.amber }}>engineerable-on-paper</span> if, and only if, one accepts a single irreducible physics concession: a bulk-matter substrate with specific energy density at or above c² (canonical{' '}
              <span style={{ color: THEME.amber }}>hypermatter</span>, 9 × 10¹⁶ J/kg).
            </p>
            <p className="text-xs leading-relaxed mb-3 max-w-[70ch]" style={{ color: THEME.textMuted }}>
              Given that concession, every downstream subsystem — reactor, superlaser, shield, sublight drive, turbolasers, and closed-loop ECLSS — follows as a finite extrapolation of known engineering. Remove hypermatter and the concept collapses across six independent physics walls.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2" style={{ borderTop: `1px solid ${THEME.border}` }}>
              <span className="text-xs" style={{ color: THEME.textDim }}>Traceability jump:</span>
              <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-1')} title="Inspect HW-1..HW-10 Physics Concessions">
                HW-1..HW-10 CONCESSIONS ↗
              </Pill>
              <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'DR-01')} title="Inspect DR-01..DR-16 V&V Matrix">
                DR-01..DR-16 V&amp;V MATRIX ↗
              </Pill>
              <Pill tone="amber" onClick={() => onNavigate?.('ledger', 'E-01')} title="Inspect Top-10 RPN Failure Modes">
                FMEA REGISTER ↗
              </Pill>
            </div>
          </Panel>
        </div>

        {/* Live diagram */}
        <Panel accent={THEME.amber} title="STATION CUTAWAY SCHEMATIC" code="DS-1 · OPERATIONAL">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ color: THEME.textDim }}>
              Click callout tags on diagram to inspect subsystem
            </span>
            <button
              type="button"
              onClick={() => setShowLabels(v => !v)}
              aria-pressed={showLabels}
              className="px-2 py-0.5 text-[11px] uppercase tracking-wider"
              style={{
                background: showLabels ? `${THEME.amber}20` : THEME.bg,
                color: showLabels ? THEME.amber : THEME.textMuted,
                border: `1px solid ${showLabels ? THEME.amber : THEME.border}`,
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              CALLOUTS: {showLabels ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="aspect-square">
            <StationDiagram
              buildProgress={1}
              firing={firing}
              showLabels={showLabels}
              size={360}
              onSelectSubsystem={tabId => onNavigate?.(tabId)}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={startFire}
              disabled={firing > 0}
              className="flex-1 py-2.5 text-xs tracking-widest uppercase transition"
              style={{
                background: firing > 0 ? THEME.green : THEME.red,
                color: '#fff',
                border: `1px solid ${firing > 0 ? THEME.greenGlow : THEME.redGlow}`,
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                opacity: firing > 0 ? 0.85 : 1,
                cursor: firing > 0 ? 'default' : 'pointer',
              }}
            >
              {firing > 0 ? '▶ PRIMARY SUPERLASER FIRING SEQUENCE ACTIVE...' : '◊ COMMENCE PRIMARY IGNITION'}
            </button>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="WITHIN EXTRAPOLATED ENGINEERING ENVELOPE" accent={THEME.green} code="§11.1">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs" style={{ color: THEME.text }}>
            {[
              'Modular spherical pressure hull (§02)',
              'Equatorial trench thermal stiffener (§02.4)',
              'Multi-wall Whipple meteoroid armor (§02.3)',
              '16-Psyche M-type asteroid ISRU (§02.5)',
              'NEXT-C scaled milli-g ion array (§05.1)',
              'ISS/SSN closed-loop ECLSS (§06.2)',
              'MARAUDER compact-toroid turbolasers (§07.2)',
              'Epirus Leonidas HPM ion cannons (§07.3)',
              'Distributed 24-zone C3 lattice (§08.1)',
              'Overdense plasma-mirror ray shields (§07.5)',
            ].map(x => (
              <li key={x} className="flex items-start gap-2">
                <div className="mt-1.5" style={{ width: 5, height: 5, background: THEME.green, flexShrink: 0 }} />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="IRREDUCIBLE PHYSICS WALLS (HANDWAVIUM REQUIRED)" accent={THEME.red} code="§10.1">
          <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
            {[
              ['Superlaser volume coupling', 'Optical skin depth ≪ 1 mm in silicate crust', 'HW-5'],
              ['Hypermatter reactor core', 'Requires ≥ c² (9 × 10¹⁶ J/kg) stable bulk storage', 'HW-1'],
              ['Waste heat at 10³² J scale', '10²⁹ J/shot exceeds Stefan-Boltzmann radiator limit', 'HW-4'],
              ['Hyperdrive 120-km soliton', '~10⁴⁵ J metric field energy (~50 solar rest-masses)', 'HW-7'],
              ['Deck gravity & inertial plates', 'Static 1 g flat-deck field without rotation', 'HW-8'],
              ['Tractor beam attractive force', 'Configurable pull on uncharged hulls at 100 km', 'HW-9'],
            ].map(([x, n, hw]) => (
              <li key={x} className="flex items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <div className="mt-1.5" style={{ width: 5, height: 5, background: THEME.red, flexShrink: 0 }} />
                  <div>
                    <span style={{ color: THEME.text, fontWeight: 600 }}>{x}</span>
                    <span style={{ color: THEME.textMuted }}> · {n}</span>
                  </div>
                </div>
                <Pill tone="red" onClick={() => onNavigate?.('physics', hw)}>
                  {hw}
                </Pill>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Energy scale chart — horizontal bar layout so labels never clip */}
      <Panel title="ENERGY-SCALE RECONCILIATION (LOGARITHMIC)" accent={THEME.red} code="§03.1 / §04.1">
        <p className="text-xs mb-4" style={{ color: THEME.textMuted }}>
          Alderaan&apos;s destruction at 2.24 × 10³² J matches Earth&apos;s gravitational binding energy (3GM²/5R) and equals one full week of the Sun&apos;s total bolometric luminosity.
        </p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={ENERGY_COMPARISONS}
              layout="vertical"
              margin={{ top: 5, right: 30, bottom: 20, left: 170 }}
            >
              <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
              <XAxis
                type="number"
                scale="log"
                domain={[1e13, 1e40]}
                tick={{ fill: THEME.textMuted, fontSize: 12, fontFamily: 'JetBrains Mono' }}
                tickFormatter={(v: number) => v.toExponential(0)}
                stroke={THEME.border}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={172}
                tick={{ fill: THEME.text, fontSize: 12, fontFamily: 'JetBrains Mono' }}
                stroke={THEME.border}
              />
              <Tooltip
                contentStyle={{
                  background: THEME.panel,
                  border: `1px solid ${THEME.amber}`,
                  fontSize: 12,
                  fontFamily: 'JetBrains Mono',
                }}
                formatter={(v) => [`${Number(v ?? 0).toExponential(2)} J`, 'Energy']}
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
