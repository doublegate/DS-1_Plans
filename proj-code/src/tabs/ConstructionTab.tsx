import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, SectionHeader, Pill, StationDiagram,
} from '../components';
import {
  CONSTRUCTION_PHASES, COST_BREAKDOWN,
} from '../data';
import type { NavigableTabProps } from '../types';

export const ConstructionTab: React.FC<NavigableTabProps> = ({ onNavigate }) => {
  const [buildProgress, setBuildProgress] = useState(1);
  const [playing, setPlaying] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      const start = performance.now();
      const startProg = buildProgress >= 1 ? 0 : buildProgress;
      const step = (t: number) => {
        const dt = (t - start) / 1000;
        const p = Math.min(startProg + dt / 15, 1);
        setBuildProgress(p);
        if (p < 1) raf.current = requestAnimationFrame(step);
        else setPlaying(false);
      };
      raf.current = requestAnimationFrame(step);
    }
    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [playing]);

  // Find active phase
  const activePhase = useMemo(() => {
    const yearNow = -3 + buildProgress * 22;
    return (
      CONSTRUCTION_PHASES.find(p => yearNow >= p.startYear && yearNow <= p.endYear) ||
      CONSTRUCTION_PHASES[CONSTRUCTION_PHASES.length - 1]
    );
  }, [buildProgress]);

  const currentYear = -3 + buildProgress * 22;
  const cumulativeCost = activePhase.costCumulative;
  const phasePct = Math.max(
    0,
    Math.min(100, ((currentYear - activePhase.startYear) / (activePhase.endYear - activePhase.startYear)) * 100)
  );

  return (
    <div>
      <SectionHeader
        kicker="§02.5 · ORBITAL ASSEMBLY & ECONOMICS"
        title="19-Year Orbital Construction Schedule"
        description="Interactive build-process scrubber across seven program phases from Geonosis concept freeze (Year -3) to operational loss at Yavin (Year +19). Each phase commits a defined engineering deliverable and cumulative quadrillion-credit expenditure."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Animation pane */}
        <div className="lg:col-span-2">
          <Panel
            title="STATION UNDER CONSTRUCTION"
            accent={THEME.amber}
            code={`T = Y${currentYear >= 0 ? '+' : ''}${currentYear.toFixed(1)}`}
          >
            <div className="aspect-square mb-3">
              <StationDiagram buildProgress={buildProgress} firing={0} showLabels={false} size={360} />
            </div>
            {/* Timeline scrubber */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1.5" style={{ color: THEME.textMuted }}>
                <span>Y-3 (Geonosis)</span>
                <span className="font-semibold tabular-nums" style={{ color: THEME.amber }}>
                  Y{currentYear >= 0 ? '+' : ''}{currentYear.toFixed(1)} · Phase {activePhase.phaseNum}
                </span>
                <span>Y+19 (Yavin)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={buildProgress}
                aria-label="Orbital construction timeline scrubber"
                aria-valuetext={`Year ${currentYear >= 0 ? '+' : ''}${currentYear.toFixed(1)}, Phase ${activePhase.phaseNum}: ${activePhase.label}`}
                onChange={e => {
                  setPlaying(false);
                  setBuildProgress(parseFloat(e.target.value));
                }}
                className="w-full"
                style={{ accentColor: THEME.amber }}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPlaying(!playing)}
                className="flex-1 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                style={{
                  background: playing ? THEME.red : THEME.amber,
                  color: playing ? '#fff' : '#000',
                  fontFamily: "'Chakra Petch'",
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {playing ? (
                  <>
                    <Pause size={13} /> PAUSE SCRUBBER
                  </>
                ) : (
                  <>
                    <Play size={13} /> PLAY 22-YR BUILD
                  </>
                )}
              </button>
              <button
                type="button"
                aria-label="Reset timeline to Year -3"
                onClick={() => {
                  setPlaying(false);
                  setBuildProgress(0);
                }}
                className="px-4 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-1.5"
                style={{
                  background: THEME.panel,
                  border: `1px solid ${THEME.border}`,
                  color: THEME.text,
                  fontFamily: "'Chakra Petch'",
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <RotateCcw size={13} />
                <span>RESET</span>
              </button>
            </div>
          </Panel>
        </div>

        {/* Active phase detail */}
        <div className="lg:col-span-3">
          <Panel
            title={`PHASE ${activePhase.phaseNum} · ${activePhase.label.toUpperCase()}`}
            accent={THEME.amber}
            code={`Y${activePhase.startYear >= 0 ? '+' : ''}${activePhase.startYear} → Y+${activePhase.endYear}`}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Pill tone="amber">{activePhase.era}</Pill>
              <Pill tone="cyan">DELIVERABLE: {activePhase.deliverable}</Pill>
              <Pill tone="red" onClick={() => onNavigate?.('ledger', 'DR-09')}>
                DR-09 · 19±2 YR SCHEDULE ↗
              </Pill>
            </div>

            <p className="text-sm mb-4" style={{ color: THEME.textMuted, lineHeight: 1.6 }}>
              {activePhase.description}
            </p>

            <div className="mb-4">
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: THEME.textMuted }}>
                Committed Work Packages
              </div>
              {activePhase.tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <div className="mt-2" style={{ width: 5, height: 5, background: THEME.amber, flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: THEME.text, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
              <div>
                <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>
                  Cumulative cost
                </div>
                <div className="text-lg font-bold tabular-nums" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                  ${(cumulativeCost / 1e15).toFixed(0)} Q
                </div>
                <div className="text-[11px]" style={{ color: THEME.textDim }}>
                  {(cumulativeCost / 1e18).toFixed(2)} × 10¹⁸ USD eq.
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>
                  Phase completion
                </div>
                <div className="text-lg font-bold tabular-nums" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'" }}>
                  {phasePct.toFixed(0)}%
                </div>
                <div className="text-[11px]" style={{ color: THEME.textDim }}>
                  Phase {activePhase.phaseNum} of 7
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest" style={{ color: THEME.textMuted }}>
                  Overall program
                </div>
                <div className="text-lg font-bold tabular-nums" style={{ color: THEME.green, fontFamily: "'JetBrains Mono'" }}>
                  {(buildProgress * 100).toFixed(0)}%
                </div>
                <div className="text-[11px]" style={{ color: THEME.textDim }}>
                  Total 22-yr window
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      {/* Phase timeline strip — semantic buttons with pause-on-select */}
      <Panel title="CONSTRUCTION PHASE MILESTONE SELECTOR" accent={THEME.amber} code="§02.5">
        <div className="relative">
          <div className="hidden md:block absolute left-0 right-0 top-[22px] h-0.5" style={{ background: THEME.border }} />
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {CONSTRUCTION_PHASES.map((p, i) => {
              const yearMid = (p.startYear + p.endYear) / 2;
              const progressAtPhase = (yearMid + 3) / 22;
              const isActive = activePhase.phaseNum === p.phaseNum;
              const isPast = buildProgress >= progressAtPhase;
              return (
                <button
                  key={i}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => {
                    setPlaying(false);
                    setBuildProgress(progressAtPhase);
                  }}
                  className="relative flex flex-col items-center p-2 text-center transition-colors"
                  style={{
                    background: isActive ? `${THEME.amber}16` : 'transparent',
                    border: `1px solid ${isActive ? THEME.amber : 'transparent'}`,
                    cursor: 'pointer',
                  }}
                >
                  <div
                    className="w-11 h-11 mx-auto flex items-center justify-center text-xs font-bold relative z-10 transition-all"
                    style={{
                      background: isActive ? THEME.amber : isPast ? THEME.panel : THEME.bg,
                      color: isActive ? '#000' : isPast ? THEME.amber : THEME.textDim,
                      border: `1px solid ${isActive ? THEME.amber : THEME.border}`,
                      fontFamily: "'Chakra Petch'",
                    }}
                  >
                    P{p.phaseNum}
                  </div>
                  <div
                    className="text-[11px] text-center mt-2 px-1 leading-tight"
                    style={{
                      color: isActive ? THEME.amber : THEME.text,
                      fontFamily: "'Chakra Petch'",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {p.label}
                  </div>
                  <div className="text-[11px] text-center mt-0.5 tabular-nums" style={{ color: THEME.textDim, fontFamily: "'JetBrains Mono'" }}>
                    Y{p.startYear >= 0 ? '+' : ''}{p.startYear}→Y+{p.endYear}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* Cost trajectory chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Panel title="CUMULATIVE SCHEDULE COST · $6,600 Q ($6.6 × 10¹⁸)" accent={THEME.amber} code="§02.5 / DR-09">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={CONSTRUCTION_PHASES.map(p => ({
                  year: p.endYear,
                  phase: `P${p.phaseNum}`,
                  cost: p.costCumulative / 1e15,
                }))}
                margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={THEME.amber} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={THEME.amber} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  label={{ value: 'PROGRAM YEAR', position: 'insideBottom', offset: -8, fill: THEME.textMuted, fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  label={{ value: 'USD Quadrillion (10¹⁵)', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: THEME.panel,
                    border: `1px solid ${THEME.amber}`,
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono',
                  }}
                  formatter={(v) => [`$${Number(v ?? 0).toFixed(0)} Q ($${(Number(v ?? 0) / 1000).toFixed(2)} × 10¹⁸)`, 'Cumulative Cost']}
                />
                <Area type="stepAfter" dataKey="cost" stroke={THEME.amber} strokeWidth={2} fill="url(#costFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 text-xs" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}` }}>
            Includes $6,040 Q direct subsystem fabrication plus $560 Q Despayre/Horuz fleet security, Scarif data-vault logistics, and Phase 7 shakedown reserves ($6,600 Q = $6.6 × 10¹⁸ total).
          </div>
        </Panel>

        <Panel title="DIRECT SUBSYSTEM COST BREAKDOWN · $6,040 Q" accent={THEME.amber} code="Feinstein 2015">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COST_BREAKDOWN} layout="vertical" margin={{ top: 5, right: 25, left: 150, bottom: 5 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: THEME.textMuted, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  tickFormatter={(v: number) => `${(v / 1e15).toFixed(0)}Q`}
                  stroke={THEME.border}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fill: THEME.text, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  width={145}
                  stroke={THEME.border}
                />
                <Tooltip
                  contentStyle={{
                    background: THEME.panel,
                    border: `1px solid ${THEME.amber}`,
                    fontSize: 12,
                    fontFamily: 'JetBrains Mono',
                  }}
                  formatter={(v) => [`$${(Number(v ?? 0) / 1e15).toFixed(0)} Quadrillion`, 'Allocation']}
                />
                <Bar dataKey="usd" fill={THEME.amber} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 text-xs" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}` }}>
            Feinstein (2015, arXiv:1511.09054) + Lehigh/Centives synthesis: raw quadanium/maraging steel feedstock alone is $852 Q; direct subsystem total is $6,040 Q against a $6.09 sextillion Gross Galactic Product.
          </div>
        </Panel>
      </div>
    </div>
  );
};
