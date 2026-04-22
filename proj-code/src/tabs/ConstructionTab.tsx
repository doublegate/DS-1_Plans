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

export const ConstructionTab: React.FC = () => {
  const [buildProgress, setBuildProgress] = useState(1);
  const [playing, setPlaying] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    if (playing) {
      const start = performance.now();
      const startProg = buildProgress >= 1 ? 0 : buildProgress;
      const step = (t) => {
        const dt = (t - start) / 1000;
        const p = Math.min(startProg + dt / 15, 1);
        setBuildProgress(p);
        if (p < 1) raf.current = requestAnimationFrame(step);
        else setPlaying(false);
      };
      raf.current = requestAnimationFrame(step);
    }
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [playing]);

  // Find active phase
  const activePhase = useMemo(() => {
    const yearNow = -3 + buildProgress * 22;
    return CONSTRUCTION_PHASES.find(p => yearNow >= p.startYear && yearNow <= p.endYear) || CONSTRUCTION_PHASES[CONSTRUCTION_PHASES.length - 1];
  }, [buildProgress]);

  const currentYear = -3 + buildProgress * 22;
  const cumulativeCost = activePhase.costCumulative;

  return (
    <div>
      <SectionHeader
        kicker="SECTION III · ASSEMBLY"
        title="19-Year Orbital Construction"
        description="Interactive build-process scrubber. Seven phases from concept (Year -3, Geonosis) to catastrophic loss at Yavin (Year +19). Each phase commits a defined deliverable and cumulative program cost."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Animation pane */}
        <div className="lg:col-span-2">
          <Panel title="STATION UNDER CONSTRUCTION" accent={THEME.amber} code={`T = Y${currentYear >= 0 ? '+' : ''}${currentYear.toFixed(1)}`}>
            <div className="aspect-square mb-3">
              <StationDiagram buildProgress={buildProgress} firing={0} showLabels={false} size={360} />
            </div>
            {/* Timeline scrubber */}
            <div className="mb-3">
              <div className="flex justify-between text-[10px] mb-1" style={{ color: THEME.textMuted }}>
                <span>Y-3</span>
                <span style={{ color: THEME.amber }}>Y{currentYear >= 0 ? '+' : ''}{currentYear.toFixed(1)}</span>
                <span>Y+19</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={buildProgress}
                onChange={(e) => { setPlaying(false); setBuildProgress(parseFloat(e.target.value)); }}
                className="w-full"
                style={{ accentColor: THEME.amber }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setPlaying(!playing)}
                className="flex-1 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                style={{
                  background: playing ? THEME.red : THEME.amber,
                  color: '#000',
                  fontFamily: "'Chakra Petch'",
                  fontWeight: 600,
                }}
              >
                {playing ? <><Pause size={12} /> PAUSE</> : <><Play size={12} /> PLAY</>}
              </button>
              <button
                onClick={() => { setPlaying(false); setBuildProgress(0); }}
                className="px-4 py-2 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                style={{
                  background: THEME.panel,
                  border: `1px solid ${THEME.border}`,
                  color: THEME.text,
                  fontFamily: "'Chakra Petch'",
                }}
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </Panel>
        </div>

        {/* Active phase detail */}
        <div className="lg:col-span-3">
          <Panel title={`PHASE ${activePhase.phaseNum} · ${activePhase.label.toUpperCase()}`} accent={THEME.amber} code={`Y${activePhase.startYear >= 0 ? '+' : ''}${activePhase.startYear} → Y+${activePhase.endYear}`}>
            <div className="flex items-center gap-3 mb-4">
              <Pill tone="amber">{activePhase.era}</Pill>
              <Pill tone="cyan">DELIVERABLE: {activePhase.deliverable}</Pill>
            </div>

            <p className="text-sm mb-4" style={{ color: THEME.textMuted, lineHeight: 1.6 }}>
              {activePhase.description}
            </p>

            <div className="mb-4">
              <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: THEME.textMuted }}>Tasks</div>
              {activePhase.tasks.map((t, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <div className="mt-2" style={{ width: 5, height: 5, background: THEME.amber, flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: THEME.text, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
              <div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Cumulative cost</div>
                <div className="text-lg font-bold" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>
                  ${(cumulativeCost / 1e15).toFixed(2)} quadrillion
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Phase progress</div>
                <div className="text-lg font-bold" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'" }}>
                  {((currentYear - activePhase.startYear) / (activePhase.endYear - activePhase.startYear) * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted }}>Overall program</div>
                <div className="text-lg font-bold" style={{ color: THEME.green, fontFamily: "'JetBrains Mono'" }}>
                  {(buildProgress * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      {/* Phase timeline strip */}
      <Panel title="CONSTRUCTION TIMELINE" accent={THEME.amber} code="§3">
        <div className="relative">
          {/* Timeline axis */}
          <div className="absolute left-0 right-0 top-[22px] h-0.5" style={{ background: THEME.border }} />
          <div className="grid grid-cols-7 gap-1">
            {CONSTRUCTION_PHASES.map((p, i) => {
              const yearMid = (p.startYear + p.endYear) / 2;
              const progressAtPhase = (yearMid + 3) / 22;
              const isActive = activePhase.phaseNum === p.phaseNum;
              const isPast = buildProgress >= progressAtPhase;
              return (
                <div key={i} className="relative">
                  <div
                    className="w-11 h-11 mx-auto flex items-center justify-center text-xs font-bold relative z-10 cursor-pointer transition-all"
                    style={{
                      background: isActive ? THEME.amber : isPast ? THEME.panel : THEME.bg,
                      color: isActive ? '#000' : isPast ? THEME.amber : THEME.textDim,
                      border: `1px solid ${isActive ? THEME.amber : THEME.border}`,
                      fontFamily: "'Chakra Petch'",
                    }}
                    onClick={() => setBuildProgress(progressAtPhase)}
                  >
                    {p.phaseNum}
                  </div>
                  <div className="text-[9px] text-center mt-2 px-1" style={{ color: isActive ? THEME.amber : THEME.textMuted, fontFamily: "'Chakra Petch'" }}>
                    {p.label}
                  </div>
                  <div className="text-[8px] text-center" style={{ color: THEME.textDim, fontFamily: "'JetBrains Mono'" }}>
                    Y{p.startYear >= 0 ? '+' : ''}{p.startYear}→Y+{p.endYear}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Panel>

      {/* Cost trajectory chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Panel title="CUMULATIVE PROGRAM COST" accent={THEME.amber} code="$6.6 × 10¹⁸ total">
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={CONSTRUCTION_PHASES.map(p => ({ year: p.endYear, phase: `P${p.phaseNum}`, cost: p.costCumulative / 1e15 }))}>
                <defs>
                  <linearGradient id="costFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={THEME.amber} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={THEME.amber} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis dataKey="year" tick={{ fill: THEME.textMuted, fontSize: 10, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} label={{ value: 'YEAR', position: 'insideBottom', offset: -5, fill: THEME.textMuted, fontSize: 10 }} />
                <YAxis tick={{ fill: THEME.textMuted, fontSize: 10, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} label={{ value: 'USD quadrillion', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 10 }} />
                <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.amber}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={v => `$${v.toFixed(2)}Q`} />
                <Area type="stepAfter" dataKey="cost" stroke={THEME.amber} strokeWidth={2} fill="url(#costFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="COST BREAKDOWN · $6.1 Q SHOWN" accent={THEME.amber} code="§Cost">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={COST_BREAKDOWN} layout="vertical" margin={{ top: 5, right: 20, left: 130, bottom: 5 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
                <XAxis type="number" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} />
                <YAxis type="category" dataKey="category" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} width={130} stroke={THEME.border} />
                <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.amber}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={v => `$${(v / 1e15).toFixed(0)} Q`} />
                <Bar dataKey="usd" fill={THEME.amber} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}` }}>
            Feinstein (2015) + Lehigh/Centives + Death Star Technical Companion synthesis. Steel-equivalent alone is $852 Q (2012 USD); program total ~$6.1 Q × Gross Galactic Product benchmark $6.09 sextillion.
          </div>
        </Panel>
      </div>
    </div>
  );
};

