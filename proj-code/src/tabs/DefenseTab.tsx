import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, SectionHeader, Pill,
} from '../components';
import {
  WEAPONS_DS1, VULNERABILITY_MATRIX,
} from '../data';
import type { NavigableTabProps, WeaponRow } from '../types';

export const DefenseTab: React.FC<NavigableTabProps> = ({ onNavigate }) => {
  return (
    <div>
      <SectionHeader
        kicker="§07–09 · DEFENSIVE SYSTEMS, C3 & VULNERABILITY ANALYSIS"
        title="Weapons, Shields, and Vulnerability Analysis"
        description="15,000 turbolaser batteries + 2,500 ion cannons + 2,500 laser cannons + 768 tractor projectors. Ray-shield + particle-shield dual architecture. Primary vulnerability: single-point 2-m thermal exhaust port combining Erso containment sabotage with genuine enthalpic venting necessity."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="DS-1 SURFACE WEAPONS COMPLEMENT" accent={THEME.red} code="§07.1 / DR-07">
          <div className="h-60 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={WEAPONS_DS1}
                layout="vertical"
                margin={{ top: 5, right: 25, left: 145, bottom: 10 }}
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
                  width={140}
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
                  formatter={(v, _n, p) => {
                    const row = p?.payload as WeaponRow | undefined;
                    return [
                      `${Number(v ?? 0).toLocaleString()} · ${row?.model ?? ''} · ${row?.mode ?? ''}`,
                      'Batteries',
                    ];
                  }}
                />
                <Bar dataKey="count" fill={THEME.red} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs flex flex-wrap items-center justify-between gap-2" style={{ color: THEME.textMuted }}>
            <span>Canon reconciliation (WEG 40008 + DK + Disney canon): 15,000 turbolaser-class + ancillaries (±5%).</span>
            <Pill tone="amber" onClick={() => onNavigate?.('ledger', 'DR-07')}>DR-07 · INVENTORY [I] ↗</Pill>
          </div>
        </Panel>

        <Panel title="CANON WEAPONS → REAL DEW ANALOGS" accent={THEME.cyan} code="§07.2–07.4">
          <div className="space-y-3">
            {[
              {
                canon: 'Turbolaser (XX-9 / D6)',
                real: 'MARAUDER compact plasma toroid',
                status: 'AFRL Phillips Lab · Shiva Star 9.5 MJ capacitor bank',
                scale: '3,000–10,000 km/s magnetically confined plasma ring',
                color: THEME.red,
              },
              {
                canon: 'Ion cannon (Borstel MS-1)',
                real: 'Epirus Leonidas IFPC-HPM',
                status: 'Operational 2024–2026 · US Army RCCTO / Leonidas AGV',
                scale: '49-drone single-pulse electronic soft-kill demonstrated',
                color: THEME.cyan,
              },
              {
                canon: 'Point-defense laser (SB-920)',
                real: 'HELIOS Mk 5 Mod 0 fiber laser',
                status: 'USS Preble DDG-88 · Fleet operational 2025–2026',
                scale: '60 kW continuous wave (scalable to 150 kW)',
                color: THEME.amber,
              },
              {
                canon: 'Tractor beam (Phylon Q7)',
                real: 'No macroscopic attractive analog',
                status: 'Optical/acoustic tweezers operate at pN on 100 μm scale',
                scale: 'Requires gravitic concession HW-9 / DR-16 at 100 km',
                color: THEME.purple,
              },
            ].map((w, i) => (
              <div key={i} className="p-3" style={{ background: THEME.bg, border: `1px solid ${w.color}45` }}>
                <div className="flex items-baseline gap-2 justify-between mb-1">
                  <span className="text-xs" style={{ color: w.color, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{w.canon}</span>
                  <span className="text-xs" style={{ color: THEME.textDim }}>→</span>
                  <span className="text-xs" style={{ color: THEME.text }}>{w.real}</span>
                </div>
                <div className="text-xs" style={{ color: THEME.textMuted }}>{w.status}</div>
                <div className="text-[11px] mt-0.5" style={{ color: THEME.textDim }}>{w.scale}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Shields */}
      <Panel title="DUAL-LAYER SHIELD ARCHITECTURE" accent={THEME.cyan} code="§07.5 / DR-10" className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              RAY SHIELD · Electromagnetic / Coherent Energy Deflection
            </div>
            <ul className="space-y-2.5 text-xs" style={{ color: THEME.text }}>
              {[
                ['Overdense plasma-mirror shell', 'Real physics: EM waves at frequency ω reflect when plasma frequency ωₚ > ω (terrestrial ionosphere analog).'],
                ['University of Leicester (2014)', 'Toohie et al. (J. Phys. Special Topics) verified magnetic plasma-shell reflection constraints.'],
                ['NUDT empirical validation (2024)', 'Demonstrated lab-scale plasma shield blocking 170 kW high-power microwave pulses at 3 m.'],
                ['Operational blind-spot tradeoff', 'Overdense plasma blocks outbound optical/radar sensors, explaining intermittent shield windowing during fire control.'],
              ].map(([h, d], i) => (
                <li key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                  <div style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{h}</div>
                  <div className="text-xs mt-0.5" style={{ color: THEME.textMuted }}>{d}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest mb-3" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              PARTICLE SHIELD · Kinetic &amp; Ordnance Deflection
            </div>
            <ul className="space-y-2.5 text-xs" style={{ color: THEME.text }}>
              {[
                ['Lorentz magnetic deflection', 'Deflects charged particle beams; ineffective against neutral kinetic projectiles or proton torpedoes.'],
                ['Mini-magnetosphere (Bamford et al.)', 'Rutherford Appleton Lab — demonstrated solar-wind plasma stand-off cavity at modest dipole fields.'],
                ['Whipple bumper standoff (§02.3)', '5-cm outer Quadanium bumper + 0.5–2 m standoff vaporizes hypervelocity micrometeoroids up to 10 km/s.'],
                ['Reactive / Chobham-analog armor', 'Required against heavy kinetic penetrators and torpedo warheads across trench apertures.'],
              ].map(([h, d], i) => (
                <li key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                  <div style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{h}</div>
                  <div className="text-xs mt-0.5" style={{ color: THEME.textMuted }}>{d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3 flex flex-wrap items-center justify-between gap-2" style={{ background: THEME.bg, border: `1px solid ${THEME.red}55` }}>
          <div className="flex items-start gap-2 max-w-4xl">
            <AlertTriangle size={14} style={{ color: THEME.red, marginTop: 2, flexShrink: 0 }} />
            <div className="text-xs" style={{ color: THEME.textMuted, lineHeight: 1.55 }}>
              <strong style={{ color: THEME.red }}>The Yavin aperture defect (FMEA E-02 / DR-10):</strong> The 2.0-m thermal exhaust port carried a ray shield (reflecting laser cannon bolts) but omitted a particle shield to permit continuous high-enthalpy gas ejection — admitting MG7-A proton torpedoes.
            </div>
          </div>
          <div className="flex gap-1.5">
            <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'DR-10')}>DR-10 ↗</Pill>
            <Pill tone="amber" onClick={() => onNavigate?.('ledger', 'E-02')}>FMEA E-02 ↗</Pill>
          </div>
        </div>
      </Panel>

      {/* Vulnerability matrix */}
      <Panel title="COMPARATIVE VULNERABILITY MATRIX · DS-1 VS DS-2" accent={THEME.red} code="§09.1">
        <p className="text-xs mb-4" style={{ color: THEME.textMuted }}>
          Severity scored 0–5 (5 = mission-ending single-point catastrophe). DS-2 retired the exhaust-port defect via millimeter microports but introduced a planetary-surface shield SPOF.
        </p>
        <div className="space-y-3">
          {VULNERABILITY_MATRIX.map((v, i) => (
            <div key={i} className="p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
              <div className="flex flex-wrap items-baseline gap-3 justify-between mb-1.5">
                <span className="text-xs" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{v.issue}</span>
                <div className="flex items-center gap-3 text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
                  <span style={{ color: THEME.textMuted }}>DS-1 ({v.ds1}/5)</span>
                  <div className="flex gap-0.5" aria-label={`DS-1 severity ${v.ds1} of 5`}>
                    {Array.from({ length: 5 }, (_, j) => (
                      <div key={j} style={{ width: 8, height: 12, background: j < v.ds1 ? THEME.red : THEME.border }} />
                    ))}
                  </div>
                  <span style={{ color: THEME.textMuted }}>DS-2 ({v.ds2}/5)</span>
                  <div className="flex gap-0.5" aria-label={`DS-2 severity ${v.ds2} of 5`}>
                    {Array.from({ length: 5 }, (_, j) => (
                      <div
                        key={j}
                        style={{
                          width: 8,
                          height: 12,
                          background: j < v.ds2 ? (v.ds2 > v.ds1 ? THEME.red : THEME.amber) : THEME.border,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-xs" style={{ color: THEME.textDim }}>{v.note}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Exhaust port detail */}
      <Panel title="THE 2.0-METER THERMAL EXHAUST PORT · ROOT-CAUSE ANALYSIS" accent={THEME.red} code="§07.7 / §09.2 / E-01" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <svg viewBox="0 0 300 300" className="w-full max-h-72 mx-auto" role="img" aria-label="2-meter thermal exhaust port cutaway">
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
              <rect x="110" y="130" width="10" height="60" fill="#0a0a0e" stroke={THEME.amber} strokeWidth="0.6" />
              <line x1="115" y1="190" x2="115" y2="260" stroke={THEME.amber} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="115" cy="270" r="7" fill={THEME.red}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Exhaust port */}
              <ellipse cx="115" cy="130" rx="7" ry="3" fill={THEME.red} opacity="0.85">
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
              <text x="24" y="116" fill={THEME.textMuted} fontSize="10" fontFamily="'JetBrains Mono'">MERIDIAN TRENCH WALL</text>
              <text x="145" y="145" fill={THEME.amber} fontSize="10" fontFamily="'JetBrains Mono'">2.0-m port (ray-shielded)</text>
              <text x="145" y="220" fill={THEME.amber} fontSize="10" fontFamily="'JetBrains Mono'">60-km straight shaft</text>
              <text x="145" y="282" fill={THEME.red} fontSize="10" fontFamily="'JetBrains Mono'">Main reactor core</text>
              <text x="145" y="34" fill={THEME.cyan} fontSize="10" fontFamily="'JetBrains Mono'">MG7-A proton torpedo</text>
            </svg>
          </div>
          <div>
            <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
              <strong style={{ color: THEME.red }}>Why a hypermatter reactor must vent openly.</strong> Even at 10⁻⁹–10⁻⁴ thermal-channel loss on a 2.24 × 10³² J pulse, open-cycle enthalpic gas dumping is mandatory because blackbody hull radiation cannot clear the entropy before structural melt (HW-4 / DR-13).
            </p>
            <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
              <strong style={{ color: THEME.amber }}>The Galen Erso containment trap.</strong> Per <em>Catalyst</em> and the <em>Rogue One</em> engineering dossier, Erso specified a reactor-shielding reflection geometry that coupled local dampener overpressure into a whole-core chain instability, forcing a straight, unbaffled emergency relief shaft (FMEA E-01, E-10).
            </p>
            <div className="text-xs uppercase tracking-widest mb-2 mt-4" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              DS-2 Architectural Remediation (§12.5)
            </div>
            <ul className="space-y-1.5 text-xs mb-4" style={{ color: THEME.text }}>
              {[
                'Distributed ~1.8 × 10⁷ millimeter-scale effusion capillaries (sub-ordnance bore)',
                'Non-line-of-sight labyrinthine expansion plenums with ≥ 90° chicane turns',
                'Fail-closed magnetic blast shutters isolating manifold sectors',
                'Overlapping particle + ray shields on all external exhaust louvers (DR-10)',
                'Magnetic buffer cells decoupling vent back-pressure from core containment (E-03)',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5" style={{ width: 5, height: 5, background: THEME.green, flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              <Pill tone="amber" onClick={() => onNavigate?.('ledger', 'E-01')}>FMEA E-01 (RPN 480) ↗</Pill>
              <Pill tone="amber" onClick={() => onNavigate?.('ledger', 'E-05')}>FMEA E-05 (RPN 540) ↗</Pill>
              <Pill tone="amber" onClick={() => onNavigate?.('ledger', 'E-10')}>FMEA E-10 (RPN 300) ↗</Pill>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
