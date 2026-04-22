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

export const PhysicsTab: React.FC = () => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION VII · HANDWAVIUM LEDGER"
        title="Physics Walls and Canonical Escapes"
        description="Ten independent points where canon requires new physics. Accept these concessions and every remaining extrapolation is finite (10–15 orders of magnitude) — unprecedented rather than impossible. Refuse them and the station dissolves."
      />

      <div className="grid grid-cols-1 gap-3 mb-6">
        {HANDWAVIUM.map((h, i) => (
          <Panel key={i} accent={THEME.amber} padding="p-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 text-center py-2" style={{ background: THEME.red, color: '#fff', fontFamily: "'Chakra Petch'", fontWeight: 700, fontSize: 14 }}>
                  {h.id}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <AlertOctagon size={12} style={{ color: THEME.red }} />
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>Physics wall</span>
                </div>
                <div className="text-sm mb-3" style={{ color: THEME.text }}>{h.wall}</div>
                <div className="flex items-center gap-2 mb-1">
                  <Settings size={12} style={{ color: THEME.cyan }} />
                  <span className="text-[10px] uppercase tracking-widest" style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>Canon escape</span>
                </div>
                <div className="text-xs" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'" }}>{h.escape}</div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="MINIMUM-HANDWAVE HARD-SF RECONSTRUCTION" accent={THEME.green} code="§10">
        <p className="text-sm mb-4" style={{ color: THEME.textMuted, lineHeight: 1.6 }}>
          If forced to design the weapon with as little new physics as possible:
        </p>
        <div className="space-y-4">
          {[
            { n: 1, title: 'Reactor', text: '~10¹⁶ kg asteroid-scale inventory of stable condensed matter — magnetically-stabilized neutron-star chunk or Alcubierre-cavity "mass tank" — annihilated at c² specific energy against a matter substrate over 24 hours. Sustained ~3 × 10²⁷ W.' },
            { n: 2, title: 'Conversion', text: 'Aneutronic-style direct conversion of charged annihilation products to a coherent relativistic particle jet. The beam is the heat sink.' },
            { n: 3, title: 'Beam', text: 'Not a photon laser. Relativistic (γ ~ 2–5) hadronic jet focused by magnetic quadrupole/solenoid active optics; the 10-km "dish" is a phased magnetic aperture, not a crystal lens.' },
            { n: 4, title: 'Firing cycle', text: '24-hour recharge matches ~10²⁷ W sustained → 10³² J buffer fill time, if buffer is c²-class.' },
            { n: 5, title: 'Recoil', text: 'Station mass boosted to ≥10²⁵ kg by dense reactor core; 750 m/s recoil per shot invisible on orbital scales.' },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center" style={{ background: THEME.green, color: '#000', fontFamily: "'Chakra Petch'", fontWeight: 700, fontSize: 12 }}>
                {s.n}
              </div>
              <div>
                <div className="text-sm" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{s.title}</div>
                <div className="text-xs mt-1" style={{ color: THEME.text, lineHeight: 1.6 }}>{s.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.green}40` }}>
          <div className="text-xs" style={{ color: THEME.text, lineHeight: 1.6 }}>
            This reduces handwavium to: <strong style={{ color: THEME.green }}>(a) a substrate with ≥c² effective storage density, stable under magnetic confinement</strong>; <strong style={{ color: THEME.green }}>(b) a 10-km magnetic/plasma active optic</strong>. Everything else is extrapolation of existing physics by 10–15 orders of magnitude.
          </div>
        </div>
      </Panel>

      <Panel title="DOCTRINAL LESSON" accent={THEME.amber} className="mt-6">
        <p className="text-sm mb-3" style={{ color: THEME.text, lineHeight: 1.7 }}>
          The Death Star is coherent as engineering fiction because <strong style={{ color: THEME.amber }}>almost every subsystem except the reactor-weapon pair</strong> maps cleanly onto real or plausibly-extrapolated hardware. Modular sphere construction, equatorial stiffening trenches, Whipple armor, M-type asteroid ISRU, ion-array sublight at milli-g, ECLSS scaled from ISS and submarines, MARAUDER-class plasma-toroid turbolasers, Leonidas-class HPM ion cannons, distributed zone-level C3 — all real today or recognizable extrapolations.
        </p>
        <p className="text-sm mb-3" style={{ color: THEME.text, lineHeight: 1.7 }}>
          The <strong style={{ color: THEME.red }}>reactor-weapon pair is the irreducible concession</strong>. No chain of known physics delivers 2.24 × 10³² J in a 1-second pulse from a 120-km envelope on a 24-hour cycle. Hypermatter is canonically fuel, capacitor, and radiator in one substrate.
        </p>
        <p className="text-sm" style={{ color: THEME.text, lineHeight: 1.7 }}>
          <strong style={{ color: THEME.green }}>The doctrinal takeaway</strong>: megastructures fail not where the physics is hardest but where the redundancy design is softest. The Empire's failure was never imagination — it was redundancy discipline. A civilization that could source 10¹⁸ kg of structural alloy from M-type asteroids and buffer 10³² J in c²-class condensed matter had every capability it needed for fault-tolerant design. It chose the terror doctrine's aesthetic preference for monolithic single-point systems. Two battle stations and several Super Star Destroyers later, the lesson was still unlearned.
        </p>
      </Panel>
    </div>
  );
};
