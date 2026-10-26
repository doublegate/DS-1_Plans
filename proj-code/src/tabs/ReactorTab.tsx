import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { AlertTriangle, ChevronRight, Sliders } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, StatBlock, SectionHeader, Pill,
} from '../components';
import { REACTOR_OPTIONS } from '../data';
import type { TabPropsWithFiring, ReactorOption } from '../types';

const STEFAN_BOLTZMANN = 5.670374419e-8; // W m^-2 K^-4
const HULL_AREA_M2 = 4.52389e10;         // 4 * pi * (60,000 m)^2
const SHOT_ENERGY_J = 2.24e32;           // Alderaan binding energy

export const ReactorTab: React.FC<TabPropsWithFiring> = ({ firing, startFire, onNavigate }) => {
  // Interactive Thermal & Coupling Trade-Study Calculator state
  const [logIneff, setLogIneff] = useState(-3);   // log10(1 - eta), from -9 to -1
  const [hullTempK, setHullTempK] = useState(1000); // K, from 300 to 5800
  const [cycleMode, setCycleMode] = useState<'DS1' | 'DS2'>('DS1');

  const tradeStudy = useMemo(() => {
    const ineff = Math.pow(10, logIneff);
    const wasteHeatJ = SHOT_ENERGY_J * ineff;
    const radPowerW = STEFAN_BOLTZMANN * HULL_AREA_M2 * Math.pow(hullTempK, 4);
    const cooldownSec = wasteHeatJ / radPowerW;
    const cooldownYears = cooldownSec / (365.25 * 86400);
    const targetCycleSec = cycleMode === 'DS1' ? 86400 : 240; // 24h vs 4 min
    const requiredPowerW = wasteHeatJ / targetCycleSec;
    const areaMultiple = requiredPowerW / radPowerW;
    const efficiencyPct = (1 - ineff) * 100;

    let timeLabel = '';
    if (cooldownYears >= 100) {
      timeLabel = `${cooldownYears.toExponential(2)} years`;
    } else if (cooldownYears >= 1) {
      timeLabel = `${cooldownYears.toFixed(1)} years`;
    } else if (cooldownSec >= 86400) {
      timeLabel = `${(cooldownSec / 86400).toFixed(1)} days`;
    } else if (cooldownSec >= 3600) {
      timeLabel = `${(cooldownSec / 3600).toFixed(1)} hours`;
    } else {
      timeLabel = `${cooldownSec.toFixed(0)} seconds`;
    }

    return {
      ineff,
      efficiencyPct,
      wasteHeatJ,
      radPowerW,
      timeLabel,
      areaMultiple,
      viable: areaMultiple <= 1.0,
    };
  }, [logIneff, hullTempK, cycleMode]);

  return (
    <div>
      <SectionHeader
        kicker="§03–04 · POWER GENERATION & SUPERLASER"
        title="Hypermatter Reactor and Mk I Superlaser"
        description="Canonical SFS-CR27200 hypermatter reactor drives 8 tributary kyber amplifier stages feeding a 10-km active compound optic. Alderaan shot requires ≥ 2.24 × 10³² J; sustained recharge output is 2.6 × 10²⁷ W (~6,800 L☉). Only c²-class specific energy closes the mass and storage equations."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="REACTOR TELEMETRY STATE" accent={THEME.red} code="SFS-CR27200 · §03.1">
          <div className="relative aspect-square mb-3 max-h-56 mx-auto">
            <svg viewBox="0 0 200 200" className="w-full h-full" role="img" aria-label="SFS-CR27200 hypermatter reactor core">
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
              {[60, 75, 90].map((r, i) => (
                <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={THEME.amber} strokeWidth="0.3" opacity="0.3" strokeDasharray="1 4" />
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <div className="text-[11px]" style={{ color: THEME.textMuted }}>Peak pulse power</div>
              <div className="font-semibold tabular-nums" style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>2.24 × 10³² W</div>
            </div>
            <div>
              <div className="text-[11px]" style={{ color: THEME.textMuted }}>Sustained output</div>
              <div className="font-semibold tabular-nums" style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>2.60 × 10²⁷ W</div>
            </div>
            <div>
              <div className="text-[11px]" style={{ color: THEME.textMuted }}>Recharge cycle</div>
              <div className="font-semibold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>24 h (86,400 s)</div>
            </div>
            <div>
              <div className="text-[11px]" style={{ color: THEME.textMuted }}>Solar equivalent</div>
              <div className="font-semibold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>6,800 L☉</div>
            </div>
          </div>
        </Panel>

        {/* Reactor options comparison — horizontal layout so option names never clip */}
        <Panel title="REACTOR CANDIDATE TRADESPACE" accent={THEME.red} code="§03.2 / DR-01" className="lg:col-span-2">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted }}>
            Candidate energy substrates evaluated against per-shot fuel mass (must be ≪ 10¹⁸ kg station dry mass) and engineering closure feasibility.
          </p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={REACTOR_OPTIONS}
                layout="vertical"
                margin={{ top: 5, right: 25, left: 165, bottom: 15 }}
              >
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  tickFormatter={(v: number) => `${v}%`}
                  stroke={THEME.border}
                />
                <YAxis
                  type="category"
                  dataKey="option"
                  width={160}
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
                    const row = p?.payload as ReactorOption | undefined;
                    return [
                      `${v ?? 0}% closure · Fuel/shot: ${row ? row.fuelPerShot.toExponential(2) : ''} kg · Handwavium: ${row?.handwavium ?? ''}`,
                      'Feasibility',
                    ];
                  }}
                />
                <Bar dataKey="feasibility">
                  {REACTOR_OPTIONS.map((r, i) => {
                    const color =
                      r.handwavium === 'Total'
                        ? THEME.red
                        : r.handwavium === 'Very high'
                        ? '#b91c1c'
                        : r.handwavium === 'High'
                        ? THEME.amber
                        : r.handwavium === 'Medium'
                        ? THEME.cyan
                        : THEME.green;
                    return <Cell key={i} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs" style={{ color: THEME.textDim }}>
            <span>Only c²-class substrates (9 × 10¹⁶ J/kg, 2.5 × 10¹⁵ kg fuel/shot) fit inside the 10¹⁸ kg hull budget.</span>
            <div className="flex gap-1.5">
              <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-1')}>HW-1</Pill>
              <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-2')}>HW-2</Pill>
              <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-3')}>HW-3</Pill>
            </div>
          </div>
        </Panel>
      </div>

      {/* Interactive Waste-Heat & Coupling Trade-Study Calculator */}
      <Panel
        title="INTERACTIVE TRADE STUDY · HYPERMATTER COUPLING & WASTE-HEAT REJECTION"
        accent={THEME.amber}
        code="§03.3 / HW-4 / DR-13"
        className="mb-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xs" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              <Sliders size={14} />
              <span>ADJUST COUPLING EFFICIENCY &amp; RADIATOR ENVELOPE</span>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: THEME.textMuted }}>Thermal Loss Fraction (1 − η)</span>
                <span className="tabular-nums font-semibold" style={{ color: THEME.amber }}>
                  10^{logIneff} ({tradeStudy.efficiencyPct.toFixed(Math.max(1, -logIneff - 2))}% coupled)
                </span>
              </div>
              <input
                type="range"
                min="-9"
                max="-1"
                step="0.5"
                value={logIneff}
                aria-label="Log10 thermal loss fraction"
                onChange={e => setLogIneff(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] mt-1" style={{ color: THEME.textDim }}>
                <span>10⁻⁹ (HW-4 floor)</span>
                <span>10⁻⁶</span>
                <span>10⁻³ (0.1% loss)</span>
                <span>10⁻¹ (10% loss)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: THEME.textMuted }}>Hull Radiator Temperature (T_rad)</span>
                <span className="tabular-nums font-semibold" style={{ color: THEME.cyan }}>
                  {hullTempK.toLocaleString()} K
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="5800"
                step="100"
                value={hullTempK}
                aria-label="Hull radiator temperature in Kelvin"
                onChange={e => setHullTempK(parseInt(e.target.value, 10))}
                className="w-full"
              />
              <div className="flex justify-between text-[11px] mt-1" style={{ color: THEME.textDim }}>
                <span>300 K (ambient)</span>
                <span>1,700 K (steel melt)</span>
                <span>3,700 K (W melt)</span>
                <span>5,800 K (solar)</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs" style={{ color: THEME.textMuted }}>Target Recharge Duty Cycle:</span>
              <div className="flex gap-1.5">
                {(['DS1', 'DS2'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCycleMode(mode)}
                    className="px-2.5 py-1 text-xs uppercase tracking-wider"
                    style={{
                      background: cycleMode === mode ? THEME.amber : THEME.bg,
                      color: cycleMode === mode ? THEME.bg : THEME.textMuted,
                      border: `1px solid ${cycleMode === mode ? THEME.amber : THEME.border}`,
                      fontFamily: "'Chakra Petch'",
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {mode === 'DS1' ? 'DS-1 (24 HR)' : 'DS-2 (4 MIN)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
                <div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Waste Heat / Shot</div>
                <div className="text-base font-bold tabular-nums mt-1" style={{ color: THEME.red }}>
                  {tradeStudy.wasteHeatJ.toExponential(2)} J
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: THEME.textDim }}>
                  From 2.24 × 10³² J pulse
                </div>
              </div>

              <div className="p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
                <div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Blackbody Rejection</div>
                <div className="text-base font-bold tabular-nums mt-1" style={{ color: THEME.cyan }}>
                  {tradeStudy.radPowerW.toExponential(2)} W
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: THEME.textDim }}>
                  σA_sT⁴ on 45,200 km²
                </div>
              </div>

              <div className="p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
                <div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Radiative Cooldown</div>
                <div className="text-base font-bold tabular-nums mt-1" style={{ color: THEME.amber }}>
                  {tradeStudy.timeLabel}
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: THEME.textDim }}>
                  Passive hull radiation
                </div>
              </div>

              <div className="p-3" style={{ background: THEME.bg, border: `1px solid ${tradeStudy.viable ? THEME.green : THEME.red}` }}>
                <div className="text-[11px] uppercase" style={{ color: THEME.textMuted }}>Area Multiple Req.</div>
                <div className="text-base font-bold tabular-nums mt-1" style={{ color: tradeStudy.viable ? THEME.green : THEME.red }}>
                  {tradeStudy.areaMultiple >= 100 ? tradeStudy.areaMultiple.toExponential(1) : tradeStudy.areaMultiple.toFixed(2)}× hull
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: tradeStudy.viable ? THEME.green : THEME.red }}>
                  {tradeStudy.viable ? 'CLOSES RADIATIVELY' : 'EXCEEDS HULL AREA'}
                </div>
              </div>
            </div>

            <div className="mt-3 p-3 flex flex-wrap items-center justify-between gap-2" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
              <div className="text-xs leading-relaxed" style={{ color: THEME.textMuted }}>
                {hullTempK > 1700 ? (
                  <span style={{ color: THEME.red }}>
                    <strong>Thermal limit exceeded:</strong> At {hullTempK.toLocaleString()} K, Quadanium/maraging steel (~1,700 K melt) vaporizes. Even at solar photosphere temperature (5,800 K), 10⁻³ waste heat takes ~100 days to radiate.
                  </span>
                ) : (
                  <span>
                    <strong>Analytical conclusion:</strong> Only 1 − η ≤ 10⁻⁹ combined with open-cycle hypermatter exhaust enthalpic dumping (the superlaser beam and 2-m exhaust port carrying the entropy) closes the cycle.
                  </span>
                )}
              </div>
              <div className="flex gap-1.5">
                <Pill tone="red" onClick={() => onNavigate?.('physics', 'HW-4')}>HW-4 · THERMAL WALL ↗</Pill>
                <Pill tone="cyan" onClick={() => onNavigate?.('ledger', 'DR-13')}>DR-13 · ENTHALPIC VENTING ↗</Pill>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Superlaser firing sequence diagram */}
      <Panel title="MK I SUPERLASER BEAM CONVERGENCE ARCHITECTURE" accent={THEME.red} code="§04.1–04.3" className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square relative max-h-[380px] mx-auto">
              <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Superlaser 8-tributary kyber convergence schematic">
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
                <text x="200" y="372" textAnchor="middle" fill={THEME.amber} fontSize="11" fontFamily="'Chakra Petch'" fontWeight="600">
                  SFS-CR27200 REACTOR CORE
                </text>

                {/* 8 kyber amplifier stages arranged in a ring */}
                {Array.from({ length: 8 }, (_, i) => {
                  const a = ((i * 45 - 90) * Math.PI) / 180;
                  const cx = 200 + 90 * Math.cos(a);
                  const cy = 180 + 90 * Math.sin(a);
                  const isFiring = firing > 0.05 * (i + 1) && firing < 0.6;
                  return (
                    <g key={i}>
                      <line
                        x1="200"
                        y1="320"
                        x2={cx}
                        y2={cy}
                        stroke={isFiring ? THEME.greenGlow : THEME.amber}
                        strokeWidth={isFiring ? 2 : 0.6}
                        opacity={isFiring ? 0.9 : 0.45}
                        strokeDasharray={isFiring ? '' : '2 3'}
                      />
                      <rect
                        x={cx - 10}
                        y={cy - 10}
                        width="20"
                        height="20"
                        fill={isFiring ? THEME.greenGlow : THEME.panel}
                        stroke={THEME.amber}
                        strokeWidth="1"
                        transform={`rotate(45 ${cx} ${cy})`}
                      />
                    </g>
                  );
                })}

                {/* Convergence to focusing lens */}
                {Array.from({ length: 8 }, (_, i) => {
                  const a = ((i * 45 - 90) * Math.PI) / 180;
                  const cx = 200 + 90 * Math.cos(a);
                  const cy = 180 + 90 * Math.sin(a);
                  const isConv = firing > 0.15 && firing < 0.6;
                  return (
                    <line
                      key={`c${i}`}
                      x1={cx}
                      y1={cy}
                      x2="200"
                      y2="90"
                      stroke={isConv ? THEME.greenGlow : 'transparent'}
                      strokeWidth={isConv ? 1.8 : 0}
                      opacity={isConv ? 0.85 : 0}
                      filter="url(#slGlow)"
                    />
                  );
                })}

                {/* Compound focusing lens */}
                <circle
                  cx="200"
                  cy="90"
                  r="32"
                  fill={firing > 0.15 ? 'url(#slDishFire)' : 'url(#slDish)'}
                  stroke={THEME.amber}
                  strokeWidth="1.5"
                  filter={firing > 0.15 ? 'url(#slGlow)' : ''}
                />
                <circle cx="200" cy="90" r="14" fill={firing > 0.2 ? THEME.greenGlow : THEME.border}>
                  {firing > 0.2 && <animate attributeName="r" values="10;18;10" dur="0.4s" repeatCount="indefinite" />}
                </circle>

                {/* Main beam output */}
                {firing > 0.3 && (
                  <g filter="url(#slGlow)">
                    <line
                      x1="200"
                      y1="58"
                      x2="200"
                      y2={firing > 0.6 ? -50 : 280 - firing * 400}
                      stroke={THEME.greenGlow}
                      strokeWidth="8"
                      opacity={Math.min((firing - 0.3) * 3, 1)}
                    />
                    <line
                      x1="200"
                      y1="58"
                      x2="200"
                      y2={firing > 0.6 ? -50 : 280 - firing * 400}
                      stroke="#fff"
                      strokeWidth="3"
                      opacity={Math.min((firing - 0.3) * 3, 1)}
                    />
                  </g>
                )}

                {/* Labels */}
                <text x="200" y="138" textAnchor="middle" fill={THEME.amber} fontSize="11" fontFamily="'Chakra Petch'" fontWeight="600">
                  COMPOUND FOCUSING LENS · 10 KM
                </text>
                {Array.from({ length: 8 }, (_, i) => {
                  const a = ((i * 45 - 90) * Math.PI) / 180;
                  const cx = 200 + 120 * Math.cos(a);
                  const cy = 180 + 120 * Math.sin(a);
                  return (
                    <text
                      key={`l${i}`}
                      x={cx}
                      y={cy + 4}
                      textAnchor="middle"
                      fill={THEME.textMuted}
                      fontSize="10"
                      fontFamily="'JetBrains Mono'"
                    >
                      T{i + 1}
                    </text>
                  );
                })}
              </svg>
            </div>
            <button
              type="button"
              onClick={startFire}
              disabled={firing > 0}
              className="w-full mt-3 py-2.5 text-xs uppercase tracking-widest transition"
              style={{
                background: firing > 0 ? THEME.green : THEME.red,
                color: '#fff',
                border: `1px solid ${firing > 0 ? THEME.greenGlow : THEME.redGlow}`,
                fontFamily: "'Chakra Petch'",
                fontWeight: 600,
                opacity: firing > 0 ? 0.85 : 1,
                cursor: firing > 0 ? 'default' : 'pointer',
              }}
            >
              {firing > 0 ? '▶ FIRING SEQUENCE ACTIVE...' : '◊ AUTHORIZE FULL-POWER IGNITION'}
            </button>
          </div>

          <div>
            <div className="text-xs mb-4" style={{ color: THEME.textMuted, lineHeight: 1.7 }}>
              Canonical architecture: reactor drives 64 tributary shafts feeding 8 giant kyber crystal amplifier stages (14 gunners each, 132 total). Eight coherent tributary beams converge at the 10-km northern hemisphere dish. Four induction hyperphase generators lock phase coherence.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <StatBlock compact label="Target energy (U₀)" value="2.24 × 10³²" unit="J" tone="red" note="Earth binding energy" />
              <StatBlock compact label="Peak pulse power" value="2.24 × 10³²" unit="W" tone="red" note="1-second pulse envelope" />
              <StatBlock compact label="Aperture diameter" value="10" unit="km" tone="amber" note="Northern hemisphere dish" />
              <StatBlock compact label="Diffraction spot @ 1 AU" value="~9.1" unit="m" tone="cyan" note="1.22λ/D at 500 nm" />
              <StatBlock compact label="Aperture intensity" value="2.85 × 10²⁰" unit="W/cm²" tone="red" note="Above Schwinger pair limit" />
              <StatBlock compact label="NIF-equivalent stack" value="1.0 × 10²⁶" unit="NIFs" tone="red" note="Compared to LLNL 2.2 MJ" />
            </div>

            <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.red}55` }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} style={{ color: THEME.red, marginTop: 2, flexShrink: 0 }} />
                <div className="text-xs" style={{ color: THEME.textMuted, lineHeight: 1.55 }}>
                  <strong style={{ color: THEME.red }}>Physics wall (HW-5 / DR-03):</strong> A pure EM photon laser deposits energy in the top millimeters of silicate crust (optical skin depth ≪ 1 mm), boiling oceans and scorching the lit hemisphere without unbinding the planetary core. Resolution: the superlaser is a <strong style={{ color: THEME.amber }}>relativistic hypermatter particle beam</strong> with green Cherenkov-analog optical emission.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Kyber → real analog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="KYBER OPTICS → REAL ANALOGS" accent={THEME.cyan} code="§04.3">
          {[
            ['Kyber crystal lattice', 'Nd:glass laser gain medium', 'LLNL NIF uses 3,072 laser glass slabs'],
            ['Hypermatter flash pump', 'Gamma / particle flashlamp', 'Replaces xenon flashlamp banks'],
            ['Induction hyperphase', 'Master-oscillator CBC phase-lock', 'Fraunhofer / MIT coherent combining'],
            ['Compound kyber lens', 'KDP / LBO nonlinear frequency optic', 'NIF 1ω → 3ω harmonic converters'],
            ['Force crystal attunement', 'No physical analog', 'Non-load-bearing canon flavor'],
          ].map(([canon, real, note], i) => (
            <div key={i} className="py-2" style={{ borderBottom: i < 4 ? `1px solid ${THEME.border}` : 'none' }}>
              <div className="flex items-baseline gap-2 justify-between">
                <span className="text-xs" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{canon}</span>
                <ChevronRight size={12} style={{ color: THEME.textDim }} />
                <span className="text-xs" style={{ color: THEME.cyan }}>{real}</span>
              </div>
              <div className="text-[11px] mt-1" style={{ color: THEME.textDim }}>{note}</div>
            </div>
          ))}
        </Panel>

        <Panel title="PASSIVE RADIATIVE WALL (0.1% LOSS)" accent={THEME.red} code="§03.3 / HW-4">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            At 0.1% inefficiency on 2.24 × 10³² J, waste heat is 2.24 × 10²⁹ J/shot. Stefan-Boltzmann rejection across the 4.52 × 10¹⁰ m² hull:
          </p>
          {[
            ['300 K (passive hull)', '2.1 × 10¹³ W', '~3.4 × 10⁸ years'],
            ['1,000 K (cherry red)', '2.6 × 10¹⁵ W', '~2,780 years'],
            ['2,500 K (liquid steel)', '1.0 × 10¹⁷ W', '~71 years'],
            ['5,800 K (solar surface)', '2.9 × 10¹⁸ W', '~2.4 years'],
          ].map(([T, P, t], i) => (
            <div key={i} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
              <span className="text-xs" style={{ color: THEME.text, fontFamily: "'JetBrains Mono'" }}>{T}</span>
              <div className="text-right">
                <div className="text-xs tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>{P}</div>
                <div className="text-[11px] tabular-nums" style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>{t}</div>
              </div>
            </div>
          ))}
          <div className="mt-3 pt-2 text-xs" style={{ color: THEME.red, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            <strong>Required coupling efficiency:</strong> 1 − 10⁻⁹ = 99.9999999%, with residual entropy vented down the beam and 2-m thermal exhaust port.
          </div>
        </Panel>

        <Panel title="ENERGY BUFFER STORAGE WALL" accent={THEME.red} code="§03.4 / HW-3">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            Capacitor/fuel mass required to buffer 2.24 × 10³² J for a 1-second discharge:
          </p>
          {[
            ['Li-ion battery bank', '2.24 × 10²⁶ kg', '≈ 37× Earth mass'],
            ['Graphene supercapacitor', '6.20 × 10²⁷ kg', 'Non-viable'],
            ['CFRP tensile flywheel', '4.50 × 10²⁶ kg', 'Non-viable'],
            ['D-T fusion fuel charge', '6.60 × 10¹⁷ kg', '66% of station dry mass'],
            ['p-¹¹B aneutronic fuel', '3.20 × 10¹⁸ kg', '3.2× station dry mass'],
            ['Hypermatter / Antimatter', '2.49 × 10¹⁵ kg', '0.25% of station mass'],
          ].map(([tech, mass, note], i) => {
            const isGood = note.includes('0.25%');
            return (
              <div key={i} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: i < 5 ? `1px solid ${THEME.border}50` : 'none' }}>
                <span className="text-xs" style={{ color: THEME.text, fontFamily: "'JetBrains Mono'" }}>{tech}</span>
                <div className="text-right">
                  <div className="text-xs tabular-nums" style={{ color: isGood ? THEME.green : THEME.red, fontFamily: "'JetBrains Mono'" }}>{mass}</div>
                  <div className="text-[11px]" style={{ color: THEME.textDim }}>{note}</div>
                </div>
              </div>
            );
          })}
          <div className="mt-3 pt-2 text-xs" style={{ color: THEME.amber, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Only c²-class (9 × 10¹⁶ J/kg) energy storage closes within the 10¹⁸ kg mass budget (HW-3 / DR-02).
          </div>
        </Panel>
      </div>
    </div>
  );
};
