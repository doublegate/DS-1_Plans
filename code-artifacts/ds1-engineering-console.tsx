import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
  ComposedChart, ScatterChart, Scatter, ZAxis
} from 'recharts';
import {
  Activity, Radio, Zap, Shield, Target, Cpu, Gauge, Users,
  Rocket, Atom, Crosshair, AlertTriangle, Layers, Settings,
  Building2, Flame, Binary, Waves, Orbit, HardDrive, Radiation,
  Eye, LineChart as LC, Grid3x3, ChevronRight, Play, Pause,
  RotateCcw, Info, GitBranch, Ruler, Package, Skull, Search,
  CircleDot, Triangle, Square, Hexagon, Sigma, FlaskConical,
  Telescope, AlertOctagon
} from 'lucide-react';

/* =========================================================================
 * DS-1 ORBITAL BATTLE STATION — INTERACTIVE ENGINEERING VISUALIZATION
 * =========================================================================
 * A React application that visualizes the complete engineering specification
 * of the DS-1 Death Star: structural, materials, power, superlaser, propulsion,
 * ECLSS, weapons, C3, vulnerability, and DS-2 modifications.
 *
 * Aesthetic: Imperial engineering terminal / DoD systems console.
 * Data-first, schematic-heavy, no decorative filler.
 * ========================================================================= */

// ============================== THEME CONSTANTS ==============================
const THEME = {
  bg: '#0a0a0e',
  surface: '#12141a',
  panel: '#1a1d26',
  panelHi: '#222632',
  border: '#2d3340',
  borderHi: '#3d4452',
  text: '#e8e8ed',
  textMuted: '#8a8f9a',
  textDim: '#5a5f6a',
  amber: '#e8a317',
  amberGlow: '#ffb830',
  red: '#dc2626',
  redGlow: '#ff3a3a',
  cyan: '#0891b2',
  cyanGlow: '#22d3ee',
  green: '#16a34a',
  greenGlow: '#4ade80',
  purple: '#7c3aed',
};

// ============================== DATASETS =====================================

const MASS_BUDGET = [
  { name: 'Primary hull', fraction: 35, mass: 3.5e17, material: 'Quadanium / maraging steel', color: THEME.amber },
  { name: 'Armor (Whipple)', fraction: 25, mass: 2.5e17, material: 'Composite + spaced belts', color: '#d4921a' },
  { name: 'Internal structure', fraction: 20, mass: 2.0e17, material: 'Durasteel / Ti-6Al-4V', color: '#b88016' },
  { name: 'Reactor + shield', fraction: 8, mass: 8.0e16, material: 'Agrinium / borated steel', color: THEME.red },
  { name: 'Weapons', fraction: 4, mass: 4.0e16, material: 'Kyber arrays, turrets', color: THEME.cyan },
  { name: 'Propulsion', fraction: 3, mass: 3.0e16, material: 'Ion drives, hyperdrive nodes', color: THEME.purple },
  { name: 'Consumables', fraction: 2, mass: 2.0e16, material: 'Atmosphere, water, food', color: THEME.green },
  { name: 'Fighters/craft', fraction: 1, mass: 1.0e16, material: 'TIE, AT-AT, shuttle', color: '#64748b' },
  { name: 'Margin', fraction: 2, mass: 2.0e16, material: 'Reserve', color: '#475569' },
];

const CREW_MANIFEST = [
  { role: 'Ground forces', count: 607360, color: '#b45309' },
  { role: 'Passengers/contractors', count: 450000, color: '#475569' },
  { role: 'Navy crew', count: 342953, color: THEME.amber },
  { role: 'TIE/support pilots', count: 167216, color: THEME.cyan },
  { role: 'Gunners', count: 57276, color: THEME.red },
  { role: 'Skeleton crew', count: 56914, color: '#64748b' },
  { role: 'Starship support', count: 42782, color: '#0e7490' },
  { role: 'Stormtroopers', count: 25984, color: '#fff' },
];

const WEAPONS_DS1 = [
  { name: 'Heavy turbolasers', count: 5000, model: 'Taim & Bak XX-9', mode: 'Anti-capital' },
  { name: 'Standard turbolasers', count: 5000, model: 'Taim & Bak D6', mode: 'Anti-corvette' },
  { name: 'Laser cannons', count: 2500, model: 'Borstel SB-920', mode: 'Anti-fighter' },
  { name: 'Ion cannons', count: 2500, model: 'Borstel MS-1', mode: 'Disable/disable-only' },
  { name: 'Tractor beams', count: 768, model: 'Phylon Q7 (mod)', mode: 'Capture' },
];

const WEAPONS_DS2 = [
  { name: 'Heavy turbolasers', count: 15000 },
  { name: 'Standard turbolasers', count: 15000 },
  { name: 'Laser cannons', count: 7500 },
  { name: 'Ion cannons', count: 5000 },
  { name: 'Tractor beams', count: 768 },
];

const CONSTRUCTION_PHASES = [
  {
    phaseNum: 1,
    label: 'Concept & Design',
    startYear: -3,
    endYear: 0,
    era: 'Geonosis / Mustafar',
    tasks: [
      'Separatist blueprints recovered; Geonosian Ultimate Weapon plans finalized',
      'Imperial Department of Military Research commences systems design',
      'Raith Sienar + Bevel Lemelisk assigned chief architects',
      'Materials and ISRU strategy frozen: M-type asteroid feedstock from Despayre subsector',
    ],
    deliverable: 'Frozen architecture baseline',
    costCumulative: 0.02e18,
    description: 'Pre-construction design phase. 10⁴ engineers, 10⁵ droids across three shipyards produce the integrated design specification.',
  },
  {
    phaseNum: 2,
    label: 'Central Truss & Reactor Core',
    startYear: 0,
    endYear: 3,
    era: 'Despayre orbit',
    tasks: [
      'Geostationary assembly jig positioned over Despayre',
      'Central N-S axial truss erected (~60 km)',
      'Reactor containment vessel manufactured and installed',
      'Initial hypermatter charge delivered under Sentinel escort',
    ],
    deliverable: 'Reactor-ready core',
    costCumulative: 0.25e18,
    description: 'Core infrastructure assembled first. Asteroid stream from 16-Psyche-class body (transport: 2 × 10⁹ kg/s sustained mass flow).',
  },
  {
    phaseNum: 3,
    label: 'Primary Superstructure',
    startYear: 3,
    endYear: 8,
    era: 'Despayre → Horuz system',
    tasks: [
      '24 latitudinal ring frames positioned',
      'Radial spokes fastened to central truss',
      'Equatorial stiffening torus (engine trench) closed',
      'Meridian trenches at poles + mid-latitudes installed',
    ],
    deliverable: 'Structural skeleton complete (skinless)',
    costCumulative: 1.2e18,
    description: 'Skeletal frame — hollow sphere defining geometry. Thermal-expansion joint tolerances set for 250 K ΔT across terminator.',
  },
  {
    phaseNum: 4,
    label: 'Hull Plating & Armor',
    startYear: 8,
    endYear: 13,
    era: 'Horuz system',
    tasks: [
      'Outer quadanium plating welded (5-cm bumper layer)',
      'Whipple standoff (0.5–2 m) + Kevlar-analog stuffing installed',
      'Inner durasteel pressure wall (10–20 cm)',
      '45,200 km² surface finish applied',
    ],
    deliverable: 'Pressurizable hull envelope',
    costCumulative: 3.8e18,
    description: 'Closure of the sphere. Pressure-integrity acceptance testing at 1 atm. Galen Erso arrives at this time; reactor shielding geometry covertly sabotaged.',
  },
  {
    phaseNum: 5,
    label: 'Superlaser & Weapons',
    startYear: 13,
    endYear: 16,
    era: 'Horuz / Jedha kyber hauling',
    tasks: [
      '8 tributary kyber amplifier stages installed (northern bowl)',
      '10-km compound focusing lens aligned (active-optic phased array)',
      '4 induction hyperphase generators synced',
      '15,000 turbolaser batteries + 2,500 ion cannons + 768 tractor projectors fielded',
    ],
    deliverable: 'Weapons-hot station',
    costCumulative: 5.5e18,
    description: 'Primary armament commissioning. Kyber mass arrives from Jedha, Utapau, Hurikane, Wutai (~10⁶ kg of large-lattice crystals).',
  },
  {
    phaseNum: 6,
    label: 'Systems Integration & Crew',
    startYear: 16,
    endYear: 18,
    era: 'Horuz',
    tasks: [
      'ECLSS primary + bioregenerative loops activated',
      '1.7 M crew + 400 k maintenance droids embarked',
      '7,200 TIEs + 1,400 AT-AT/AT-ST complement loaded',
      'Command lattice burn-in: Overbridge + 24 zone command centers',
    ],
    deliverable: 'Crew-certified operational',
    costCumulative: 6.4e18,
    description: 'Human/droid embarkation. ECLSS at 425,000× ISS throughput enters continuous ops.',
  },
  {
    phaseNum: 7,
    label: 'Operational Trials',
    startYear: 18,
    endYear: 19,
    era: 'Horuz → Scarif',
    tasks: [
      'Single-reactor ignition test (Jedha, ~1/8 power)',
      'Single-reactor ignition test (Scarif, continent-scale)',
      'Full-power Alderaan shot',
      'Transit to Yavin; operational loss at the 2-m exhaust port',
    ],
    deliverable: 'Operational → catastrophic loss at Yavin',
    costCumulative: 6.6e18,
    description: 'Operational shakedown and combat employment. Total operational life: ~20 days.',
  },
];

const ENERGY_COMPARISONS = [
  { label: 'Hiroshima (Little Boy)', joules: 6.3e13 },
  { label: 'Tsar Bomba', joules: 2.1e17 },
  { label: 'Chicxulub impact', joules: 4.2e23 },
  { label: 'Moon binding energy', joules: 1.24e29 },
  { label: 'Earth binding energy', joules: 2.24e32 },
  { label: 'Alderaan shot (canon)', joules: 2.24e32 },
  { label: 'Sun output / week', joules: 2.31e32 },
  { label: 'Sun output / year', joules: 1.21e34 },
  { label: 'Debris-kinetics upper (Wong)', joules: 1e38 },
];

const REACTOR_OPTIONS = [
  { option: 'D-T tokamak (DEMO)', specific: 3.4e14, fuelPerShot: 6.6e17, feasibility: 5, handwavium: 'Low' },
  { option: 'p-B¹¹ aneutronic', specific: 7e13, fuelPerShot: 3.2e18, feasibility: 15, handwavium: 'Medium' },
  { option: 'Antimatter annihilation', specific: 9e16, fuelPerShot: 2.49e15, feasibility: 40, handwavium: 'High' },
  { option: 'Kerr BH spin-down', specific: 2.6e16, fuelPerShot: 1e16, feasibility: 20, handwavium: 'Very high' },
  { option: 'Hypermatter (canon)', specific: 9e16, fuelPerShot: 2.5e15, feasibility: 100, handwavium: 'Total' },
];

const HANDWAVIUM = [
  { id: 'HW-1', wall: '5×10⁵ L☉ in 1-s pulse through solid matter', escape: 'Hypermatter channels + deflector shielding' },
  { id: 'HW-2', wall: 'Antimatter unproducible at scale (10²⁴× universe age at CERN rate)', escape: 'Hypermatter is tachyonic, formed in hyperspace' },
  { id: 'HW-3', wall: 'No storage holds 10³² J in <10²⁵ kg', escape: 'Hypermatter as combined fuel + capacitor' },
  { id: 'HW-4', wall: 'Waste heat >10²⁹ J per shot, cannot radiate', escape: 'Beam itself carries entropy; exhaust venting' },
  { id: 'HW-5', wall: 'EM laser cannot volume-couple to planet core', escape: '"Superlaser" is a hypermatter particle beam, not EM' },
  { id: 'HW-6', wall: 'Momentum recoil of 10²³ kg·m/s not observed', escape: 'Station hypermatter-dense at ≥10²⁵ kg, or reactionless' },
  { id: 'HW-7', wall: 'Hyperdrive ~10⁴⁵ J field energy for 120-km bubble', escape: 'Hypermatter / Lentz-class plasma soliton' },
  { id: 'HW-8', wall: 'No mechanism for plate-scale metric manipulation', escape: '"Gravity generators" (unspecified)' },
  { id: 'HW-9', wall: 'No configurable attractive force on uncharged hull', escape: '"Gravitic manipulation" (unspecified)' },
  { id: 'HW-10', wall: '10¹⁸ kg in 19 years requires ~10¹⁶ W industrial power', escape: 'Kardashev-II ISRU + self-replicating robotics' },
];

const COST_BREAKDOWN = [
  { category: 'Raw materials (M-type ISRU)', usd: 852e15, fraction: 14 },
  { category: 'In-space fabrication', usd: 1700e15, fraction: 28 },
  { category: 'Kyber crystal acquisition', usd: 400e15, fraction: 7 },
  { category: 'Hypermatter charge', usd: 1200e15, fraction: 20 },
  { category: 'Weapons & shields', usd: 600e15, fraction: 10 },
  { category: 'ECLSS & crew provisioning', usd: 300e15, fraction: 5 },
  { category: 'R&D + program overhead', usd: 500e15, fraction: 8 },
  { category: 'Security + Sienar/KDY margin', usd: 488e15, fraction: 8 },
];

const DS1_VS_DS2 = [
  { param: 'Diameter', ds1: '120 km', ds2: '160 km' },
  { param: 'Presented surface', ds1: '45,200 km²', ds2: '80,400 km²' },
  { param: 'Volume', ds1: '9.05 × 10¹⁴ m³', ds2: '2.14 × 10¹⁵ m³' },
  { param: 'Superlaser recharge', ds1: '~24 hours', ds2: '~3–5 minutes' },
  { param: 'Superlaser architecture', ds1: '8 equal tributaries', ds2: '7 + 1 central large' },
  { param: 'Target classes', ds1: 'Planet only', ds2: 'Planet + capital ship' },
  { param: 'Reactor cores', ds1: '1 hypermatter', ds2: '3 hypermatter' },
  { param: 'Heavy turbolasers', ds1: '5,000', ds2: '15,000' },
  { param: 'Laser cannons', ds1: '2,500', ds2: '7,500' },
  { param: 'Ion cannons', ds1: '2,500', ds2: '5,000' },
  { param: 'Tractor beams', ds1: '768', ds2: '768' },
  { param: 'Military crew', ds1: '1.7 M', ds2: '637,835' },
  { param: 'Primary shield', ds1: 'On-station', ds2: 'Endor moon (SLD-26)' },
  { param: 'Exhaust venting', ds1: 'Single 2-m port', ds2: 'Millions of mm-scale tubes' },
  { param: 'Cost (program total)', ds1: '$6.6 × 10¹⁸', ds2: '~$1.5 × 10¹⁹ (estimated)' },
  { param: 'Build time', ds1: '19 years', ds2: '< 4 years (unfinished at loss)' },
];

const VULNERABILITY_MATRIX = [
  { issue: 'Single exhaust port', ds1: 5, ds2: 1, note: 'DS-2 distributed mm-scale microports' },
  { issue: 'Single shield node', ds1: 2, ds2: 5, note: 'DS-2 offloaded to Endor (worse SPOF)' },
  { issue: 'Slow anti-fighter tracking', ds1: 5, ds2: 2, note: 'DS-2 added 7,500 laser cannons' },
  { issue: 'Friendly-fire lockout shadow zones', ds1: 4, ds2: 2, note: 'DS-2 fire control improved' },
  { issue: 'Single tractor-beam coupling', ds1: 4, ds2: 3, note: 'Canon suggests improvement, unverified' },
  { issue: 'Reactor compartmentalization', ds1: 5, ds2: 3, note: 'DS-2 still reactor-cored, but 3 cores' },
  { issue: 'Centralized C2', ds1: 3, ds2: 3, note: 'Distributed zone-C3 present in both' },
  { issue: 'Unfinished hull (operational)', ds1: 0, ds2: 5, note: 'DS-2 Endor trap posture' },
];

const PROPULSION_DATA = [
  { engine: 'NSTAR (Dawn)', isp: 3100, thrust: 0.092, power: 2.3e3 },
  { engine: 'NEXT-C (DART)', isp: 4190, thrust: 0.236, power: 7.4e3 },
  { engine: 'Hall-effect (krypton)', isp: 2500, thrust: 0.170, power: 4.2e3 },
  { engine: 'VX-200 VASIMR', isp: 4900, thrust: 5.0, power: 2e5 },
  { engine: 'Sepma 30-5 (canon)', isp: 1e7, thrust: 1e10, power: 1e17 },
];

const ECLSS_DAILY = [
  { input: 'O₂ consumed', kg: 1428000, perPerson: 0.84 },
  { input: 'CO₂ produced', kg: 1700000, perPerson: 1.00 },
  { input: 'Potable water', kg: 5950000, perPerson: 3.5 },
  { input: 'Hygiene water', kg: 8500000, perPerson: 5.0 },
  { input: 'Food (dry+wet)', kg: 3400000, perPerson: 2.0 },
  { input: 'Solid waste', kg: 200000, perPerson: 0.12 },
];

// Fighter complement
const FIGHTER_COMPLEMENT = [
  { craft: 'TIE/ln + Interceptor + Bomber', count: 7200 },
  { craft: 'Strike/support cruisers docked', count: 4 },
  { craft: 'Assault shuttles', count: 3600 },
  { craft: 'Dropships', count: 1860 },
  { craft: 'AT-AT walkers', count: 1400 },
  { craft: 'AT-ST walkers', count: 1400 },
];

// ============================== SUBCOMPONENTS ================================

const Panel = ({ children, className = '', accent = THEME.border, title = null, code = null, padding = 'p-5' }) => (
  <div
    className={`relative ${padding} ${className}`}
    style={{
      background: THEME.panel,
      border: `1px solid ${accent}`,
      fontFamily: "'JetBrains Mono', monospace",
    }}
  >
    {title && (
      <div className="flex items-center justify-between mb-3 pb-2"
        style={{ borderBottom: `1px solid ${THEME.border}` }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 6, height: 6, background: accent }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}>
            {title}
          </span>
        </div>
        {code && (
          <span className="text-[10px] tracking-wider" style={{ color: THEME.textDim }}>
            {code}
          </span>
        )}
      </div>
    )}
    {children}
  </div>
);

const StatBlock = ({ label, value, unit, tone = 'amber', note = null }) => {
  const color = tone === 'amber' ? THEME.amber : tone === 'red' ? THEME.red : tone === 'cyan' ? THEME.cyan : tone === 'green' ? THEME.green : THEME.text;
  return (
    <div className="flex flex-col py-2">
      <span className="text-[10px] tracking-widest uppercase mb-1" style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch', sans-serif" }}>
        {label}
      </span>
      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tabular-nums" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>
          {value}
        </span>
        {unit && <span className="text-xs" style={{ color: THEME.textDim }}>{unit}</span>}
      </div>
      {note && <span className="text-[10px] mt-0.5" style={{ color: THEME.textDim }}>{note}</span>}
    </div>
  );
};

const SectionHeader = ({ kicker, title, description }) => (
  <div className="mb-6">
    {kicker && (
      <div className="flex items-center gap-2 mb-2">
        <div style={{ width: 20, height: 1, background: THEME.amber }} />
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: THEME.amber, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 500 }}>
          {kicker}
        </span>
      </div>
    )}
    <h2 className="text-2xl md:text-3xl mb-2 tracking-wide" style={{ color: THEME.text, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}>
      {title}
    </h2>
    {description && (
      <p className="max-w-3xl text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
        {description}
      </p>
    )}
  </div>
);

const Pill = ({ children, tone = 'default' }) => {
  const color = tone === 'amber' ? THEME.amber : tone === 'red' ? THEME.red : tone === 'cyan' ? THEME.cyan : tone === 'green' ? THEME.green : THEME.textMuted;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-[10px] tracking-wider uppercase"
      style={{
        color,
        border: `1px solid ${color}40`,
        background: `${color}10`,
        fontFamily: "'Chakra Petch', sans-serif",
      }}
    >
      {children}
    </span>
  );
};

// Animated counter hook
const useCountUp = (target, duration = 1500) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start = null;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
};

// ============================== STATION SVG ==================================
// Interactive cross-section renderer; accepts buildProgress [0..1] and firing state

const StationDiagram = ({ buildProgress = 1, firing = 0, showLabels = true, variant = 'DS1', size = 520 }) => {
  const R = size / 2;
  const cx = R;
  const cy = R;
  const sphereR = R * 0.85;
  const coreR = sphereR * 0.13;
  const dishR = sphereR * 0.25;
  const dishCx = cx;
  const dishCy = cy - sphereR * 0.42;

  const stage = (threshold) => buildProgress >= threshold;

  const ds2 = variant === 'DS2';

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      <defs>
        <radialGradient id="hullGrad" cx="0.5" cy="0.35" r="0.7">
          <stop offset="0%" stopColor="#3a4050" />
          <stop offset="60%" stopColor="#1e232c" />
          <stop offset="100%" stopColor="#0a0a0e" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={THEME.amberGlow} stopOpacity="1" />
          <stop offset="40%" stopColor={THEME.amber} stopOpacity="0.8" />
          <stop offset="100%" stopColor={THEME.red} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dishGrad" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#0a0a0e" />
          <stop offset="60%" stopColor="#1a1d26" />
          <stop offset="100%" stopColor="#2d3340" />
        </radialGradient>
        <radialGradient id="dishFiring" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor={THEME.greenGlow} />
          <stop offset="60%" stopColor={THEME.green} />
          <stop offset="100%" stopColor="#064e3b" />
        </radialGradient>
        <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <pattern id="griddot" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill={THEME.border} />
        </pattern>
      </defs>

      {/* Background grid */}
      <rect width={size} height={size} fill="url(#griddot)" opacity="0.4" />

      {/* Phase 1: Design phase - blueprint overlay (pre-Phase 2) */}
      {buildProgress < 0.05 && (
        <g opacity={1 - buildProgress * 20}>
          <circle cx={cx} cy={cy} r={sphereR} fill="none" stroke={THEME.cyan} strokeWidth="0.5" strokeDasharray="4 4" />
          <text x={cx} y={cy} textAnchor="middle" fill={THEME.cyan} fontSize="11" fontFamily="'Chakra Petch'" opacity="0.7">
            DESIGN PHASE
          </text>
        </g>
      )}

      {/* Phase 2: Central truss + reactor core */}
      {stage(0.05) && (
        <g opacity={Math.min((buildProgress - 0.05) * 10, 1)}>
          <line x1={cx} y1={cy - sphereR * 0.95} x2={cx} y2={cy + sphereR * 0.95} stroke={THEME.amber} strokeWidth="1" opacity="0.6" strokeDasharray="2 4" />
          {/* Reactor core */}
          <circle
            cx={cx}
            cy={cy}
            r={coreR}
            fill="url(#coreGlow)"
            filter="url(#glowF)"
          >
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={coreR * 0.6} fill={THEME.amberGlow} opacity="0.6">
            <animate attributeName="r" values={`${coreR * 0.4};${coreR * 0.7};${coreR * 0.4}`} dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Phase 3: Skeletal superstructure - 24 latitudinal rings */}
      {stage(0.15) && (
        <g opacity={Math.min((buildProgress - 0.15) * 8, 1)} stroke={THEME.amber} fill="none" strokeWidth="0.5">
          {[...Array(11)].map((_, i) => {
            const lat = (i + 1) * 15 - 90;
            const y = cy - sphereR * Math.sin(lat * Math.PI / 180);
            const rAt = sphereR * Math.cos(lat * Math.PI / 180);
            return <ellipse key={i} cx={cx} cy={y} rx={rAt} ry={rAt * 0.15} stroke={THEME.amber} fill="none" strokeWidth="0.3" opacity="0.4" />;
          })}
          {/* Meridians */}
          {[...Array(8)].map((_, i) => {
            const a = i * Math.PI / 4;
            return <ellipse key={`m${i}`} cx={cx} cy={cy} rx={sphereR * Math.abs(Math.cos(a))} ry={sphereR} stroke={THEME.amber} fill="none" strokeWidth="0.3" opacity="0.3" transform={`rotate(${i * 22.5} ${cx} ${cy})`} />;
          })}
        </g>
      )}

      {/* Phase 4: Hull plating - solid sphere */}
      {stage(0.4) && (
        <g opacity={Math.min((buildProgress - 0.4) * 5, 1)}>
          <circle cx={cx} cy={cy} r={sphereR} fill="url(#hullGrad)" stroke={THEME.border} strokeWidth="0.5" />
          {/* Equatorial trench */}
          <ellipse cx={cx} cy={cy + 1} rx={sphereR} ry={4} fill="#0a0a0e" stroke={THEME.amber} strokeWidth="0.5" opacity="0.9" />
          {/* Mid-latitude trenches */}
          <ellipse cx={cx} cy={cy - sphereR * 0.55} rx={sphereR * 0.82} ry={2} fill="#0a0a0e" opacity="0.5" />
          <ellipse cx={cx} cy={cy + sphereR * 0.55} rx={sphereR * 0.82} ry={2} fill="#0a0a0e" opacity="0.5" />
          {/* Meridian trench (north) */}
          <path
            d={`M ${cx - 1} ${cy - sphereR * 0.15} L ${cx + 1} ${cy - sphereR * 0.15} L ${cx + 0.5} ${cy - sphereR * 0.75} L ${cx - 0.5} ${cy - sphereR * 0.75} Z`}
            fill={THEME.amber}
            opacity="0.4"
          />

          {/* Surface detail speckle */}
          {[...Array(80)].map((_, i) => {
            const a = (i * 137.5) * Math.PI / 180;
            const rad = sphereR * (0.2 + (i % 7) * 0.1);
            const x = cx + rad * Math.cos(a);
            const y = cy + rad * Math.sin(a);
            return <circle key={i} cx={x} cy={y} r="0.5" fill={THEME.textDim} opacity="0.3" />;
          })}

          {/* Reactor shows through */}
          <circle cx={cx} cy={cy} r={coreR} fill="url(#coreGlow)" opacity="0.4" />
        </g>
      )}

      {/* Phase 5: Superlaser dish */}
      {stage(0.65) && (
        <g opacity={Math.min((buildProgress - 0.65) * 4, 1)}>
          {/* Dish bowl - darker concave area */}
          <circle cx={dishCx} cy={dishCy} r={dishR} fill={firing > 0 ? "url(#dishFiring)" : "url(#dishGrad)"} stroke={THEME.amber} strokeWidth="0.8" />
          <circle cx={dishCx} cy={dishCy} r={dishR * 0.6} fill="none" stroke={THEME.amber} strokeWidth="0.3" opacity="0.6" />
          <circle cx={dishCx} cy={dishCy} r={dishR * 0.3} fill={firing > 0 ? THEME.greenGlow : THEME.border} opacity={firing > 0 ? 1 : 0.8}>
            {firing > 0 && <animate attributeName="r" values={`${dishR * 0.2};${dishR * 0.4};${dishR * 0.2}`} dur="0.6s" repeatCount="indefinite" />}
          </circle>

          {/* 8 tributary marks (7+1 for DS2) */}
          {[...Array(ds2 ? 8 : 8)].map((_, i) => {
            const a = (i * 360 / 8) * Math.PI / 180;
            const xx = dishCx + dishR * 0.78 * Math.cos(a);
            const yy = dishCy + dishR * 0.78 * Math.sin(a);
            const isCenter = ds2 && i === 0;
            return <circle key={i} cx={xx} cy={yy} r={isCenter ? 3 : 2} fill={firing > 0 ? THEME.greenGlow : THEME.amber} opacity={firing > 0 ? 1 : 0.7} />;
          })}
        </g>
      )}

      {/* Phase 6: Weapons batteries (dot speckle) */}
      {stage(0.75) && (
        <g opacity={Math.min((buildProgress - 0.75) * 4, 1)}>
          {[...Array(120)].map((_, i) => {
            // seeded deterministic positions
            const seed = i * 2.39996;
            const ax = seed;
            const ay = seed * 1.618;
            const r = sphereR * (0.5 + ((i * 7) % 10) / 28);
            const x = cx + r * Math.cos(ax);
            const y = cy + r * Math.sin(ay);
            // keep inside visible disk
            const d = Math.hypot(x - cx, y - cy);
            if (d > sphereR * 0.95) return null;
            return <circle key={i} cx={x} cy={y} r="0.6" fill={THEME.cyan} opacity="0.5" />;
          })}
        </g>
      )}

      {/* Phase 7: Operational - power glow */}
      {stage(0.9) && (
        <g opacity={Math.min((buildProgress - 0.9) * 10, 1)}>
          <circle cx={cx} cy={cy} r={sphereR + 2} fill="none" stroke={THEME.amber} strokeWidth="0.3" opacity="0.4">
            <animate attributeName="r" values={`${sphereR + 1};${sphereR + 6};${sphereR + 1}`} dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Firing sequence: 8 tributary beams converging */}
      {firing > 0 && firing < 0.6 && stage(0.65) && (
        <g filter="url(#glowF)">
          {[...Array(8)].map((_, i) => {
            const a = (i * 45) * Math.PI / 180;
            const x1 = dishCx + dishR * 0.78 * Math.cos(a);
            const y1 = dishCy + dishR * 0.78 * Math.sin(a);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={dishCx}
                y2={dishCy}
                stroke={THEME.greenGlow}
                strokeWidth={2 + firing * 4}
                opacity={firing * 2}
              />
            );
          })}
        </g>
      )}

      {/* Main superlaser beam */}
      {firing > 0.3 && (
        <g filter="url(#glowF)">
          <line
            x1={dishCx}
            y1={dishCy - dishR * 0.3}
            x2={dishCx}
            y2={-20}
            stroke={THEME.greenGlow}
            strokeWidth={6}
            opacity={Math.min((firing - 0.3) * 3, 1)}
          />
          <line
            x1={dishCx}
            y1={dishCy - dishR * 0.3}
            x2={dishCx}
            y2={-20}
            stroke="#fff"
            strokeWidth={2}
            opacity={Math.min((firing - 0.3) * 3, 1)}
          />
        </g>
      )}

      {/* Labels */}
      {showLabels && stage(0.65) && (
        <g fontSize="8" fontFamily="'JetBrains Mono', monospace" fill={THEME.textMuted}>
          <line x1={dishCx + dishR + 6} y1={dishCy} x2={dishCx + dishR + 40} y2={dishCy} stroke={THEME.border} strokeWidth="0.5" />
          <text x={dishCx + dishR + 44} y={dishCy + 3}>SUPERLASER</text>

          <line x1={cx + coreR + 4} y1={cy} x2={cx + sphereR + 40} y2={cy} stroke={THEME.border} strokeWidth="0.5" />
          <text x={cx + sphereR + 44} y={cy + 3}>REACTOR CORE</text>

          <line x1={cx + sphereR} y1={cy} x2={cx + sphereR + 40} y2={cy + 30} stroke={THEME.border} strokeWidth="0.5" />
          <text x={cx + sphereR + 44} y={cy + 33}>EQUATORIAL TRENCH</text>

          <line x1={cx} y1={cy - sphereR * 0.4} x2={cx - 60} y2={cy - sphereR * 0.6} stroke={THEME.border} strokeWidth="0.5" />
          <text x={cx - 140} y={cy - sphereR * 0.6 + 3}>EXHAUST PORT</text>
        </g>
      )}
    </svg>
  );
};

// Scanner line animation for panel headers
const ScannerLine = ({ color = THEME.amber }) => (
  <div className="relative h-0.5 overflow-hidden" style={{ background: `${color}15` }}>
    <div
      className="absolute inset-y-0 w-16"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        animation: 'scanMove 4s linear infinite',
      }}
    />
  </div>
);

// ============================== TABS =========================================

// ------- COMMAND (Overview) -------
const CommandTab = ({ firing, startFire }) => {
  const alderaan = useCountUp(2.24);
  const mass = useCountUp(10);
  const crew = useCountUp(1.7);
  const dia = useCountUp(120);

  return (
    <div>
      <SectionHeader
        kicker="SECTION I · EXECUTIVE DASHBOARD"
        title="DS-1 Orbital Battle Station — Command Overview"
        description="Spherical battle station. 120 km nominal diameter (ANH reference). Structural mass 10¹⁸ kg. Primary armament: hypermatter-sourced superlaser, Alderaan-class output ≥2.24×10³² J per shot. Hybrid canon / real-physics engineering specification."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Key stats panel */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Panel accent={THEME.amber} padding="p-4">
            <StatBlock label="Diameter" value={dia.toFixed(0)} unit="km" tone="amber" note="ANH canon; 160 km DS-2" />
          </Panel>
          <Panel accent={THEME.red} padding="p-4">
            <StatBlock label="Alderaan shot" value={alderaan.toFixed(2)} unit="× 10³² J" tone="red" note="Earth binding energy" />
          </Panel>
          <Panel accent={THEME.cyan} padding="p-4">
            <StatBlock label="Dry mass" value={mass.toFixed(0)} unit="× 10¹⁷ kg" tone="cyan" note="~10¹⁸ kg design basis" />
          </Panel>
          <Panel accent={THEME.green} padding="p-4">
            <StatBlock label="Crew" value={crew.toFixed(1)} unit="× 10⁶" tone="green" note="1.7 M personnel" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="Surface area" value="45,200" unit="km²" note="4πr² presented" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="Volume" value="9.05" unit="× 10¹⁴ m³" note="Interior envelope" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="TIE complement" value="7,200" note="~100 wings" />
          </Panel>
          <Panel accent={THEME.border} padding="p-4">
            <StatBlock label="Build time" value="19" unit="years" note="Orbital assembly" />
          </Panel>
        </div>

        {/* Live diagram */}
        <Panel accent={THEME.amber} title="STATION SCHEMATIC" code="DS-1 · OPERATIONAL">
          <div className="aspect-square">
            <StationDiagram buildProgress={1} firing={firing} showLabels={false} size={360} />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={startFire}
              disabled={firing > 0}
              className="flex-1 py-2 text-xs tracking-widest uppercase transition"
              style={{
                background: firing > 0 ? THEME.green : THEME.red,
                color: '#fff',
                fontFamily: "'Chakra Petch', sans-serif",
                opacity: firing > 0 ? 0.5 : 1,
                cursor: firing > 0 ? 'default' : 'pointer',
              }}
            >
              {firing > 0 ? 'FIRING...' : 'COMMENCE PRIMARY IGNITION'}
            </button>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="EXECUTIVE SUMMARY" accent={THEME.amber} code="DOC-001 §0">
          <p className="text-sm leading-relaxed mb-3" style={{ color: THEME.text }}>
            The DS-1 Orbital Battle Station is <span style={{ color: THEME.amber }}>engineerable-on-paper</span> if, and only if, one accepts a single irreducible physics concession: a bulk-matter substrate with specific energy density at or above c² (canonical <span style={{ color: THEME.amber }}>hypermatter</span>).
          </p>
          <p className="text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
            Given that concession, every downstream subsystem — reactor, superlaser, shield, drive, turbolasers — follows as a finite extrapolation of known engineering. Remove hypermatter and the concept collapses across six independent physics walls.
          </p>
        </Panel>

        <Panel title="WHAT WORKS" accent={THEME.green} code="§10">
          <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
            {[
              'Modular sphere construction',
              'Equatorial trench as stiffener',
              'Whipple micrometeoroid shielding',
              'M-type asteroid ISRU',
              'Ion-array sublight at milli-g',
              'ECLSS scaled from ISS + submarine',
              'MARAUDER-class compact-toroid turbolasers',
              'HPM ion cannons (Leonidas-class)',
              'Distributed zone-level C3',
            ].map(x => (
              <li key={x} className="flex items-start gap-2">
                <div className="mt-1" style={{ width: 5, height: 5, background: THEME.green, flexShrink: 0 }} />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="WHAT FAILS" accent={THEME.red} code="§10">
          <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
            {[
              ['Superlaser', 'optics + EM-matter coupling gap'],
              ['Hypermatter reactor', 'c²-class storage'],
              ['Hyperdrive', 'metric engineering'],
              ['Tractor beam', 'no pull mechanism'],
              ['Gravity plates', 'no mechanism'],
              ['Waste heat at hypermatter scale', '10²⁹ J/shot'],
            ].map(([x, n]) => (
              <li key={x} className="flex items-start gap-2">
                <div className="mt-1" style={{ width: 5, height: 5, background: THEME.red, flexShrink: 0 }} />
                <div>
                  <span style={{ color: THEME.text }}>{x}</span>
                  <span style={{ color: THEME.textDim }}> · {n}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Energy scale chart */}
      <Panel title="ENERGY-SCALE RECONCILIATION" accent={THEME.red} code="§2.1">
        <p className="text-xs mb-4" style={{ color: THEME.textMuted }}>
          Alderaan's destruction at 2.24 × 10³² J matches Earth's gravitational binding energy and equals one week of the Sun's total luminosity. Log-scale comparison.
        </p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ENERGY_COMPARISONS} layout="horizontal" margin={{ top: 10, right: 20, bottom: 60, left: 20 }}>
              <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
              <XAxis
                dataKey="label"
                tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                angle={-35}
                textAnchor="end"
                interval={0}
                stroke={THEME.border}
                height={80}
              />
              <YAxis
                scale="log"
                domain={[1e13, 1e40]}
                tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                tickFormatter={v => v.toExponential(0)}
                stroke={THEME.border}
              />
              <Tooltip
                contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.amber}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                formatter={v => `${v.toExponential(2)} J`}
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

// ------- STRUCTURE -------
const StructureTab = () => {
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

// ------- CONSTRUCTION -------
const ConstructionTab = () => {
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

// ------- REACTOR + SUPERLASER -------
const ReactorTab = ({ firing, startFire }) => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION IV · POWER & PRIMARY WEAPON"
        title="Hypermatter Reactor and Superlaser"
        description="Canonical SFS-CR27200 hypermatter reactor drives 8 tributary kyber amplifier stages feeding a 10-km active optic. Alderaan shot requires ≥2.24×10³² J. Sustained reactor output 2.6×10²⁷ W = 6,800 L☉. Every energy-storage technology we know requires station-mass-or-greater reservoirs; only c²-class specific energy closes the gap."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="REACTOR STATE" accent={THEME.red} code="CR27200">
          <div className="relative aspect-square mb-3">
            <svg viewBox="0 0 200 200">
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
              {/* Containment rings */}
              {[60, 75, 90].map((r, i) => (
                <circle key={i} cx="100" cy="100" r={r} fill="none" stroke={THEME.amber} strokeWidth="0.3" opacity="0.3" strokeDasharray="1 4" />
              ))}
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Peak output</div>
              <div style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>2.24 × 10³² W</div>
            </div>
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Sustained</div>
              <div style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>2.6 × 10²⁷ W</div>
            </div>
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Recharge</div>
              <div style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>24 h</div>
            </div>
            <div>
              <div className="text-[10px]" style={{ color: THEME.textMuted }}>Solar equivalent</div>
              <div style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>6,800 L☉</div>
            </div>
          </div>
        </Panel>

        {/* Reactor options comparison */}
        <Panel title="REACTOR OPTION TRADESPACE" accent={THEME.red} code="§2.2" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={REACTOR_OPTIONS} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis
                  dataKey="option"
                  tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                  angle={-20}
                  textAnchor="end"
                  interval={0}
                  height={70}
                  stroke={THEME.border}
                />
                <YAxis tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} label={{ value: 'Feasibility', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.red}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  formatter={(v, n, p) => [`${v}% · ${p.payload.handwavium} handwavium`, n]}
                />
                <Bar dataKey="feasibility">
                  {REACTOR_OPTIONS.map((r, i) => {
                    const color = r.handwavium === 'Total' ? THEME.red : r.handwavium === 'Very high' ? '#b91c1c' : r.handwavium === 'High' ? THEME.amber : r.handwavium === 'Medium' ? THEME.cyan : THEME.green;
                    return <Cell key={i} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* Superlaser firing sequence diagram */}
      <Panel title="SUPERLASER FIRING SEQUENCE" accent={THEME.red} code="§3" className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="aspect-square relative">
              <svg viewBox="0 0 400 400" className="w-full h-full">
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
                <text x="200" y="372" textAnchor="middle" fill={THEME.amber} fontSize="9" fontFamily="'Chakra Petch'">REACTOR CORE</text>

                {/* 8 kyber amplifier stages arranged in a ring */}
                {[...Array(8)].map((_, i) => {
                  const a = (i * 45 - 90) * Math.PI / 180;
                  const cx = 200 + 90 * Math.cos(a);
                  const cy = 180 + 90 * Math.sin(a);
                  const isFiring = firing > 0.05 * (i + 1) && firing < 0.6;
                  return (
                    <g key={i}>
                      {/* Tributary line from reactor to amplifier */}
                      <line x1="200" y1="320" x2={cx} y2={cy}
                        stroke={isFiring ? THEME.greenGlow : THEME.amber}
                        strokeWidth={isFiring ? 2 : 0.5}
                        opacity={isFiring ? 0.9 : 0.4}
                        strokeDasharray={isFiring ? "" : "2 3"}
                      />
                      {/* Amplifier */}
                      <rect x={cx - 10} y={cy - 10} width="20" height="20"
                        fill={isFiring ? THEME.greenGlow : THEME.panel}
                        stroke={THEME.amber} strokeWidth="1"
                        transform={`rotate(45 ${cx} ${cy})`}
                      />
                    </g>
                  );
                })}

                {/* Convergence to focusing lens */}
                {[...Array(8)].map((_, i) => {
                  const a = (i * 45 - 90) * Math.PI / 180;
                  const cx = 200 + 90 * Math.cos(a);
                  const cy = 180 + 90 * Math.sin(a);
                  const isConv = firing > 0.15 && firing < 0.6;
                  return (
                    <line key={`c${i}`} x1={cx} y1={cy} x2="200" y2="90"
                      stroke={isConv ? THEME.greenGlow : 'transparent'}
                      strokeWidth={isConv ? 1.5 : 0}
                      opacity={isConv ? 0.8 : 0}
                      filter="url(#slGlow)"
                    />
                  );
                })}

                {/* Compound focusing lens */}
                <circle cx="200" cy="90" r="32"
                  fill={firing > 0.15 ? "url(#slDishFire)" : "url(#slDish)"}
                  stroke={THEME.amber}
                  strokeWidth="1.5"
                  filter={firing > 0.15 ? "url(#slGlow)" : ""}
                />
                <circle cx="200" cy="90" r="14"
                  fill={firing > 0.2 ? THEME.greenGlow : THEME.border}
                >
                  {firing > 0.2 && <animate attributeName="r" values="10;18;10" dur="0.4s" repeatCount="indefinite" />}
                </circle>

                {/* Main beam output */}
                {firing > 0.3 && (
                  <g filter="url(#slGlow)">
                    <line x1="200" y1="58" x2="200" y2={firing > 0.6 ? -50 : 280 - firing * 400} stroke={THEME.greenGlow} strokeWidth="8" opacity={Math.min((firing - 0.3) * 3, 1)} />
                    <line x1="200" y1="58" x2="200" y2={firing > 0.6 ? -50 : 280 - firing * 400} stroke="#fff" strokeWidth="3" opacity={Math.min((firing - 0.3) * 3, 1)} />
                  </g>
                )}

                {/* Labels */}
                <text x="200" y="135" textAnchor="middle" fill={THEME.amber} fontSize="9" fontFamily="'Chakra Petch'">FOCUSING LENS · 10 km</text>
                {[...Array(8)].map((_, i) => {
                  const a = (i * 45 - 90) * Math.PI / 180;
                  const cx = 200 + 118 * Math.cos(a);
                  const cy = 180 + 118 * Math.sin(a);
                  return <text key={`l${i}`} x={cx} y={cy + 3} textAnchor="middle" fill={THEME.textMuted} fontSize="7" fontFamily="'JetBrains Mono'">T{i + 1}</text>;
                })}
              </svg>
            </div>
            <button
              onClick={startFire}
              disabled={firing > 0}
              className="w-full mt-3 py-3 text-sm uppercase tracking-widest transition"
              style={{
                background: firing > 0 ? THEME.red : '#7f1d1d',
                color: '#fff',
                border: `1px solid ${THEME.red}`,
                fontFamily: "'Chakra Petch'",
                fontWeight: 600,
                opacity: firing > 0 ? 0.5 : 1,
                cursor: firing > 0 ? 'default' : 'pointer',
              }}
            >
              {firing > 0 ? '▶ FIRING SEQUENCE ACTIVE' : '◊ AUTHORIZE FULL-POWER IGNITION'}
            </button>
          </div>

          <div>
            <div className="text-xs mb-4" style={{ color: THEME.textMuted, lineHeight: 1.7 }}>
              Canonical architecture: reactor drives 64 tributary shafts feeding 8 giant kyber crystal amplifier stages (14 gunners each, 132 total). Eight coherent beams converge on a 10-km compound focusing lens. Four induction hyperphase generators initiate firing.
            </div>
            <div className="space-y-3">
              <StatBlock label="Target energy" value="2.24 × 10³²" unit="J" tone="red" note="Earth gravitational binding energy" />
              <StatBlock label="Peak power" value="2.24 × 10³²" unit="W" tone="red" note="1-second pulse" />
              <StatBlock label="Aperture diameter" value="10" unit="km" tone="amber" note="Effective emitting" />
              <StatBlock label="Diffraction spot @ 1 AU" value="~9" unit="m" tone="cyan" note="1.22λ/D · 500 nm" />
              <StatBlock label="Intensity at aperture" value="2.85 × 10²⁰" unit="W/cm²" tone="red" note="10¹⁰× damage threshold" />
              <StatBlock label="NIF-equivalent stack" value="10²⁶" unit="NIFs" tone="red" note="At 2.2 MJ × 192 beams" />
            </div>

            <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.red}40` }}>
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} style={{ color: THEME.red, marginTop: 2, flexShrink: 0 }} />
                <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
                  <strong style={{ color: THEME.red }}>Physics wall:</strong> a pure EM laser deposits energy in the top millimeters of a silicate planet (optical skin depth ≪ 1 mm for rock). You boil the oceans and scorch the lit crust — you do not explode the planet. Canon resolution: the weapon is a <strong style={{ color: THEME.amber }}>hypermatter particle beam</strong> (green Cherenkov-analog), not EM.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Panel>

      {/* Kyber → real analog */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="KYBER → REAL ANALOG" accent={THEME.cyan} code="§3.3">
          {[
            ['Kyber crystal', 'Nd:glass laser gain medium', 'NIF uses 3,100 slabs'],
            ['Hypermatter pump', 'Gamma/particle flash pump', 'Replaces xenon flashlamps'],
            ['Induction hyperphase', 'MO phase-lock (CBC)', 'Fraunhofer/MIT coherent combining'],
            ['Compound kyber lens', 'KDP/LBO nonlinear optic', 'NIF 1ω→3ω triplers'],
            ['Force attunement', 'Unphysical', 'Authorial flavor'],
          ].map(([canon, real, note], i) => (
            <div key={i} className="py-2" style={{ borderBottom: i < 4 ? `1px solid ${THEME.border}` : 'none' }}>
              <div className="flex items-baseline gap-2 justify-between">
                <span className="text-xs" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{canon}</span>
                <ChevronRight size={12} style={{ color: THEME.textDim }} />
                <span className="text-xs" style={{ color: THEME.cyan }}>{real}</span>
              </div>
              <div className="text-[10px] mt-1" style={{ color: THEME.textDim }}>{note}</div>
            </div>
          ))}
        </Panel>

        <Panel title="WASTE-HEAT WALL" accent={THEME.red} code="§2.3">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            Accept 0.1% inefficiency on 2.24×10³² J: waste = 2.24×10²⁹ J per shot. Stefan-Boltzmann on 4.5×10¹⁰ m² hull:
          </p>
          {[
            ['300 K (passive)', '2.1 × 10¹¹ W', '~10¹⁸ s (impossible)'],
            ['1,000 K (red hot)', '2.6 × 10¹⁸ W', '2,780 years'],
            ['2,500 K (W melt)', '1.0 × 10²¹ W', '~7 years'],
            ['5,800 K (solar)', '2.6 × 10²² W', '~100 days'],
          ].map(([T, P, t], i) => (
            <div key={i} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
              <span className="text-[11px]" style={{ color: THEME.text, fontFamily: "'JetBrains Mono'" }}>{T}</span>
              <div className="text-right">
                <div className="text-[11px]" style={{ color: THEME.amber, fontFamily: "'JetBrains Mono'" }}>{P}</div>
                <div className="text-[9px]" style={{ color: THEME.red, fontFamily: "'JetBrains Mono'" }}>{t}</div>
              </div>
            </div>
          ))}
          <div className="mt-3 pt-2 text-[10px]" style={{ color: THEME.red, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            <strong>Required efficiency</strong>: 1 − 10⁻⁹ = 99.9999999%. Only self-consistent resolution: the superlaser beam itself carries away the entropy.
          </div>
        </Panel>

        <Panel title="ENERGY STORAGE WALL" accent={THEME.red} code="§2.4">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            Buffering 2.24×10³² J for a 1-second pulse:
          </p>
          {[
            ['Li-ion', '2.24 × 10²⁶ kg', '≈ 30× Earth'],
            ['Supercap', '6.2 × 10²⁷ kg', 'Non-viable'],
            ['CFRP flywheel', '4.5 × 10²⁶ kg', 'Non-viable'],
            ['D-T fusion', '6.6 × 10¹⁷ kg', 'Approaches station mass'],
            ['p-B¹¹ fuel', '3.2 × 10¹⁸ kg', 'Exceeds station mass'],
            ['Antimatter', '2.5 × 10¹⁵ kg', 'Tractable mass'],
          ].map(([tech, mass, note], i) => {
            const isGood = note === 'Tractable mass';
            return (
              <div key={i} className="flex justify-between items-baseline py-1.5" style={{ borderBottom: i < 5 ? `1px solid ${THEME.border}50` : 'none' }}>
                <span className="text-[11px]" style={{ color: THEME.text, fontFamily: "'JetBrains Mono'" }}>{tech}</span>
                <div className="text-right">
                  <div className="text-[11px]" style={{ color: isGood ? THEME.green : THEME.red, fontFamily: "'JetBrains Mono'" }}>{mass}</div>
                  <div className="text-[9px]" style={{ color: THEME.textDim }}>{note}</div>
                </div>
              </div>
            );
          })}
          <div className="mt-3 pt-2 text-[10px]" style={{ color: THEME.amber, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Only c²-class (hypermatter / antimatter) specific energy closes the gap. HW-3 in handwavium ledger.
          </div>
        </Panel>
      </div>
    </div>
  );
};

// ------- DRIVE + ECLSS -------
const DriveTab = () => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION V · PROPULSION & LIFE SUPPORT"
        title="Drive Systems and ECLSS"
        description="Sublight: two Sepma 30-5 ion engines plus southern-hemisphere array. Hyperdrive: 123 Isu-Sim SSP06 generators, Class 4 primary. ECLSS: 425,000× ISS throughput serving 1.7 M personnel."
      />

      {/* Propulsion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="SUBLIGHT PROPULSION BENCHMARKS" accent={THEME.cyan} code="§4.1">
          <p className="text-xs mb-3" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
            NEXT-C scaling: one milli-g at 10¹⁸ kg needs 4.24 × 10¹³ thrusters drawing 4.5 × 10¹⁴ W. Canonical MGLT 10 → reactor-limited micro- to milli-g regime.
          </p>
          <div className="h-48">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 10, right: 20, left: 30, bottom: 40 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis
                  type="number"
                  dataKey="isp"
                  name="Isp"
                  tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  scale="log"
                  domain={[1e3, 1e8]}
                  tickFormatter={v => `${v.toExponential(0)}s`}
                  label={{ value: 'Specific Impulse (s)', position: 'insideBottom', offset: -5, fill: THEME.textMuted, fontSize: 10 }}
                />
                <YAxis
                  type="number"
                  dataKey="thrust"
                  name="Thrust"
                  tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
                  stroke={THEME.border}
                  scale="log"
                  domain={[0.01, 1e11]}
                  tickFormatter={v => `${v.toExponential(0)}N`}
                  label={{ value: 'Thrust (N)', angle: -90, position: 'insideLeft', fill: THEME.textMuted, fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.cyan}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  cursor={{ stroke: THEME.cyan }}
                  formatter={(v, n, p) => [`${p.payload.engine}: Isp ${p.payload.isp.toExponential(1)}s, Thrust ${p.payload.thrust.toExponential(1)}N, Power ${p.payload.power.toExponential(1)}W`, '']}
                />
                <Scatter data={PROPULSION_DATA} fill={THEME.cyan}>
                  {PROPULSION_DATA.map((d, i) => (
                    <Cell key={i} fill={d.engine.includes('canon') ? THEME.amber : THEME.cyan} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="HYPERDRIVE · EXPLICIT HANDWAVIUM" accent={THEME.purple} code="§4.2">
          <div className="space-y-3 mb-4">
            <StatBlock label="Generators" value="123" unit="× SSP06" note="Isu-Sim coherent array" />
            <StatBlock label="Class" value="Class 4" note="Primary; Class 24 backup" />
            <StatBlock label="Bubble field energy" value="~10⁴⁵" unit="J" tone="red" note="50 solar rest-energies" />
            <StatBlock label="Speculative framing" value="Lentz soliton" note="2021, Class. Quantum Grav. 38" tone="cyan" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[10px]" style={{ fontFamily: "'JetBrains Mono'" }}>
              <thead>
                <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                  <th className="text-left py-1.5 pr-2">FRAMEWORK</th>
                  <th className="text-left py-1.5 pr-2">ENERGY FLOOR</th>
                  <th className="text-left py-1.5">FIT</th>
                </tr>
              </thead>
              <tbody style={{ color: THEME.text }}>
                {[
                  ['Alcubierre (1994)', '~10⁶⁴ J orig.', 'Poor · no hyperspace'],
                  ['Lentz soliton (2021)', '~0.1 M☉', 'Best fit'],
                  ['Morris-Thorne WH', '~−M☉c²', 'Poor · fixed ends'],
                  ['Randall-Sundrum brane', 'Tunable', 'Excellent · bulk shortcut'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                    {r.map((c, j) => (
                      <td key={j} className="py-1.5 pr-2" style={j === 2 ? { color: c.includes('Excellent') ? THEME.green : c.includes('Best') ? THEME.cyan : THEME.textDim } : {}}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* ECLSS */}
      <SectionHeader
        kicker="LIFE SUPPORT"
        title="ECLSS · Environmental Control & Life Support"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Panel title="CREW MANIFEST · 1.7 M TOTAL" accent={THEME.green} code="§5.1">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={CREW_MANIFEST}
                  dataKey="count"
                  nameKey="role"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  innerRadius={40}
                  paddingAngle={1}
                >
                  {CREW_MANIFEST.map((m, i) => <Cell key={i} fill={m.color} stroke={THEME.panel} />)}
                </Pie>
                <Tooltip
                  contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.green}`, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                  formatter={v => v.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1 text-[10px] mt-2" style={{ fontFamily: "'JetBrains Mono'" }}>
            {CREW_MANIFEST.slice(0, 5).map(m => (
              <div key={m.role} className="flex justify-between">
                <div className="flex items-center gap-1.5">
                  <div style={{ width: 6, height: 6, background: m.color }} />
                  <span style={{ color: THEME.text }}>{m.role}</span>
                </div>
                <span style={{ color: THEME.textMuted }}>{(m.count / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="DAILY ECLSS THROUGHPUT" accent={THEME.green} code="§5.2">
          <div className="space-y-2.5">
            {ECLSS_DAILY.map((e, i) => {
              const maxVal = Math.max(...ECLSS_DAILY.map(x => x.kg));
              const pct = (e.kg / maxVal) * 100;
              return (
                <div key={i}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span style={{ color: THEME.text }}>{e.input}</span>
                    <span style={{ color: THEME.green, fontFamily: "'JetBrains Mono'" }}>
                      {(e.kg / 1000).toLocaleString()} t/day
                    </span>
                  </div>
                  <div className="h-1.5" style={{ background: THEME.bg }}>
                    <div className="h-full" style={{ width: `${pct}%`, background: THEME.green }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            425,000× ISS · 12,143× SSN-774 (90-d) · 213,000× Biosphere 2 · 285× CVN-68 provisioning.
          </div>
        </Panel>

        <Panel title="FIGHTER COMPLEMENT" accent={THEME.cyan} code="§5.6">
          <div className="space-y-2">
            {FIGHTER_COMPLEMENT.map((c, i) => (
              <div key={i} className="flex justify-between items-baseline py-2" style={{ borderBottom: i < 5 ? `1px solid ${THEME.border}50` : 'none' }}>
                <span className="text-[11px]" style={{ color: THEME.text, fontFamily: "'Chakra Petch'" }}>{c.craft}</span>
                <span className="text-sm" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>
                  {c.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Hangar volumetric demand ~0.003% of station volume. AT-AT load another 2×10⁷ m³.
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="ARTIFICIAL GRAVITY · HANDWAVIUM ANALYSIS" accent={THEME.purple} code="§5.4">
          <div className="grid grid-cols-2 gap-3">
            <StatBlock label="ω for 1g @ R=60km" value="0.0128" unit="rad/s" note="Period: 491 s (8.2 min)" />
            <StatBlock label="Equatorial v" value="767" unit="m/s" note="Tangential speed" />
            <StatBlock label="Coriolis @ 1.5 m/s walk" value="0.038" unit="m/s²" note="≈0.004 g — tolerable" />
            <StatBlock label="Hoop stress" value="144" unit="MPa" note="At ρ=1000 kg/m³" />
          </div>
          <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.purple}40` }}>
            <div className="flex items-start gap-2">
              <Atom size={14} style={{ color: THEME.purple, marginTop: 2, flexShrink: 0 }} />
              <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
                Rotation works only as an equatorial strip with cos(lat) falloff — poles are 0 g. Station visibly does not rotate. Canon: "gravity plates" (unspecified mechanism). Tajmar 2006 gravitomagnetic field from rotating superconductors disputed/non-replicated. HW-8 in handwavium ledger.
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="THERMAL BUDGET · NON-REACTOR LOADS" accent={THEME.cyan} code="§5.5">
          <div className="h-40">
            <ResponsiveContainer>
              <BarChart data={[
                { src: 'Crew metabolic', w: 0.17 },
                { src: 'ECLSS overhead', w: 0.5 },
                { src: 'Lighting + HVAC', w: 1.0 },
                { src: 'Droid/equipment', w: 0.4 },
              ]} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} horizontal={false} />
                <XAxis type="number" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} label={{ value: 'GW', position: 'insideBottom', offset: -5, fill: THEME.textMuted, fontSize: 10 }} />
                <YAxis type="category" dataKey="src" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} width={80} stroke={THEME.border} />
                <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.cyan}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={v => `${v} GW`} />
                <Bar dataKey="w" fill={THEME.cyan} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 pt-3 text-[10px]" style={{ color: THEME.textDim, borderTop: `1px dashed ${THEME.border}`, lineHeight: 1.5 }}>
            Total non-reactor load: ~2 GW · radiator area at 300 K = 0.48 km² (trivial). The reactor is the real heat-rejection problem, not the crew.
          </div>
        </Panel>
      </div>
    </div>
  );
};

// ------- DEFENSE / VULNERABILITY -------
const DefenseTab = () => {
  return (
    <div>
      <SectionHeader
        kicker="SECTION VI · DEFENSIVE SYSTEMS"
        title="Weapons, Shields, and Vulnerability Analysis"
        description="15,000 turbolaser batteries + 2,500 ion cannons + 768 tractor projectors. Ray-shield + particle-shield dual architecture. Primary vulnerability: single-point 2-m thermal exhaust port (Erso sabotage + genuine thermal-venting necessity)."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="DS-1 WEAPONS COMPLEMENT" accent={THEME.red} code="§6.1">
          <div className="h-56 mb-3">
            <ResponsiveContainer>
              <BarChart data={WEAPONS_DS1} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
                <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
                <XAxis dataKey="name" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} angle={-20} textAnchor="end" interval={0} height={60} stroke={THEME.border} />
                <YAxis tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} />
                <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.red}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={(v, n, p) => `${v.toLocaleString()} · ${p.payload.model} · ${p.payload.mode}`} />
                <Bar dataKey="count" fill={THEME.red} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
            <div>Total batteries: 15,000 turbolaser + ancillaries.</div>
            <div>Canon reconciliation: WEG + DK + Disney canon all yield ~15 k aggregate.</div>
          </div>
        </Panel>

        <Panel title="CANON → REAL DEW ANALOGS" accent={THEME.cyan} code="§6.2–6.3">
          <div className="space-y-3">
            {[
              {
                canon: 'Turbolaser',
                real: 'MARAUDER compact plasma toroid',
                status: 'AFRL Phillips Lab · Shiva Star 9.5 MJ',
                scale: '3,000–10,000 km/s plasma ring · 5 lb TNT eq.',
                color: THEME.red,
              },
              {
                canon: 'Ion cannon',
                real: 'Epirus Leonidas HPM',
                status: 'Operational 2024 · USA CENTCOM',
                scale: '49-drone single-pulse kill demonstrated',
                color: THEME.cyan,
              },
              {
                canon: 'Laser cannon',
                real: 'HELIOS Mk 5 Mod 0',
                status: 'USS Preble DDG-88 · 2025 operational',
                scale: '60 kW (scalable 150 kW)',
                color: THEME.amber,
              },
              {
                canon: 'Tractor beam',
                real: '~None at scale',
                status: 'Optical tweezers · pN on 100 μm',
                scale: 'No known configurable attractive force',
                color: THEME.purple,
              },
            ].map((w, i) => (
              <div key={i} className="p-3" style={{ background: THEME.bg, border: `1px solid ${w.color}40` }}>
                <div className="flex items-baseline gap-2 justify-between mb-1">
                  <span className="text-xs" style={{ color: w.color, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{w.canon}</span>
                  <span className="text-[10px]" style={{ color: THEME.textDim }}>→</span>
                  <span className="text-xs" style={{ color: THEME.text }}>{w.real}</span>
                </div>
                <div className="text-[10px]" style={{ color: THEME.textMuted }}>{w.status}</div>
                <div className="text-[10px] mt-0.5" style={{ color: THEME.textDim }}>{w.scale}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Shields */}
      <Panel title="SHIELD ARCHITECTURE" accent={THEME.cyan} code="§6.5" className="mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              RAY SHIELD · Energy deflection
            </div>
            <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
              {[
                ['Plasma-mirror overdense shell', 'Real physics: EM at ω blocked for ωₚ > ω. Ionosphere is everyday example.'],
                ['Leicester (2014)', 'Journal Phys. Special Topics confirmed plasma-shield principle permissible.'],
                ['NUDT (2024)', 'Lab-scale plasma shield vs 170 kW microwaves at 3 m range.'],
                ['Downside', 'Shield blocks sensors, comms, outbound weapons. Explains on-screen intermittent shield-down-to-fire.'],
              ].map(([h, d], i) => (
                <li key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                  <div style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>{h}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.textMuted }}>{d}</div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest mb-3" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              PARTICLE SHIELD · Matter deflection
            </div>
            <ul className="space-y-2 text-xs" style={{ color: THEME.text }}>
              {[
                ['Magnetic deflection', 'Charged particles only — useless vs photons/neutrals.'],
                ['Mini-magnetosphere (Bamford et al.)', 'Rutherford Appleton Lab — solar wind deflection at modest B.'],
                ['Whipple Shields', 'Micrometeoroids to ~10 km/s.'],
                ['Composite / reactive armor', 'Bulk kinetic penetrators (Chobham/Relikt analog).'],
              ].map(([h, d], i) => (
                <li key={i} className="pb-2" style={{ borderBottom: i < 3 ? `1px solid ${THEME.border}50` : 'none' }}>
                  <div style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'" }}>{h}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: THEME.textMuted }}>{d}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.red}40` }}>
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} style={{ color: THEME.red, marginTop: 2, flexShrink: 0 }} />
            <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
              <strong style={{ color: THEME.red }}>The gap exploited at Yavin</strong> is precisely ray-without-particle: the 2-m exhaust port was ray-shielded (blocks blaster fire) but particle-penetrable (admits proton torpedoes). Canon explicitly: "the Death Star had to forgo all but the most rudimentary shielding capabilities in order to achieve such destructive power."
            </div>
          </div>
        </div>
      </Panel>

      {/* Vulnerability matrix */}
      <Panel title="VULNERABILITY MATRIX · DS-1 VS DS-2" accent={THEME.red} code="§8">
        <p className="text-xs mb-4" style={{ color: THEME.textMuted }}>
          Severity 0–5 where 5 = catastrophic/mission-ending. DS-2 fixed some failure modes and introduced others.
        </p>
        <div className="space-y-3">
          {VULNERABILITY_MATRIX.map((v, i) => (
            <div key={i} className="p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}>
              <div className="flex items-baseline gap-3 justify-between mb-2">
                <span className="text-xs" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{v.issue}</span>
                <div className="flex items-center gap-3 text-[10px]" style={{ fontFamily: "'JetBrains Mono'" }}>
                  <span style={{ color: THEME.textMuted }}>DS-1</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} style={{ width: 8, height: 12, background: j < v.ds1 ? THEME.red : THEME.border }} />
                    ))}
                  </div>
                  <span style={{ color: THEME.textMuted }}>DS-2</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} style={{ width: 8, height: 12, background: j < v.ds2 ? (v.ds2 > v.ds1 ? THEME.red : THEME.amber) : THEME.border }} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-[10px]" style={{ color: THEME.textDim }}>{v.note}</div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Exhaust port detail */}
      <Panel title="THE THERMAL EXHAUST PORT · §6.7" accent={THEME.red} code="YAVIN LOSS" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <svg viewBox="0 0 300 300" className="w-full">
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
              <rect x="110" y="130" width="10" height="60" fill="#0a0a0e" stroke={THEME.amber} strokeWidth="0.5" />
              <line x1="115" y1="190" x2="115" y2="260" stroke={THEME.amber} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <circle cx="115" cy="270" r="6" fill="url(#rcore)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Exhaust port */}
              <ellipse cx="115" cy="130" rx="7" ry="3" fill={THEME.red} opacity="0.8">
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
              <text x="10" y="112" fill={THEME.textMuted} fontSize="9" fontFamily="'JetBrains Mono'">HULL SURFACE</text>
              <text x="150" y="145" fill={THEME.amber} fontSize="9" fontFamily="'JetBrains Mono'">2-m port</text>
              <text x="150" y="220" fill={THEME.amber} fontSize="9" fontFamily="'JetBrains Mono'">Heat duct</text>
              <text x="150" y="282" fill={THEME.red} fontSize="9" fontFamily="'JetBrains Mono'">Main reactor</text>
              <text x="160" y="32" fill={THEME.cyan} fontSize="9" fontFamily="'JetBrains Mono'">T-65 X-wing torpedo</text>
            </svg>
          </div>
          <div>
            <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
              <strong style={{ color: THEME.red }}>Why a hypermatter reactor must vent.</strong> Even at 0.01% thermal-channel efficiency on 10²⁴–10³³ W, waste is 10²⁰–10²⁹ W. No Stefan-Boltzmann radiator at 3,000 K can dispose of 10²⁰ W — would require 10¹⁴ m² (10× station surface). A concentrated aperture venting is <em>not a pure design flaw</em>, it is architecturally necessary.
            </p>
            <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
              <strong style={{ color: THEME.amber }}>The Erso sabotage.</strong> Galen Erso (per <em>Catalyst</em> + <em>Rogue One</em> novelization) coerced a reactor-containment geometry whose shielding reflected too many particles back into the reactor, forcing a single-consolidated-vent architecture with instability propagation. The sabotage converted a necessary feature into a catastrophic one.
            </p>
            <div className="text-[11px] uppercase tracking-widest mb-2 mt-4" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              DS-2 Correct Engineering Fix
            </div>
            <ul className="space-y-1.5 text-[11px]" style={{ color: THEME.text }}>
              {[
                'Distributed mm-scale porting (sub-minimum-ordnance geometry)',
                'Labyrinthine baffles with 90°+ turns denying line-of-sight',
                'Active blast doors (failure-closed default)',
                'Particle shields on every external aperture with local CIWS',
                'Magnetic reactor-buffer cells between vent manifold and core',
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="mt-1.5" style={{ width: 4, height: 4, background: THEME.green, flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>
    </div>
  );
};

// ------- DS-2 APPENDIX -------
const DS2Tab = () => {
  return (
    <div>
      <SectionHeader
        kicker="APPENDIX A · DS-2 MODIFICATIONS"
        title="Return of the Jedi Variant"
        description="160-km diameter (current canon). Superlaser recharge cut from 24 h to ~3-5 min; 3 hypermatter reactor cores. Primary shield offloaded to Endor forest moon. Distributed mm-scale exhaust porting. Operated with incomplete hull as tactical feint."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Panel title="DS-1 vs DS-2 COMPARATIVE SCHEMATIC" accent={THEME.amber} code="SCALE TO FRAME">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] text-center mb-2" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>DS-1 · 120 km</div>
              <div className="aspect-square">
                <StationDiagram buildProgress={1} firing={0} showLabels={false} size={220} variant="DS1" />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-center mb-2" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>DS-2 · 160 km</div>
              <div className="aspect-square">
                <StationDiagram buildProgress={0.72} firing={0} showLabels={false} size={220} variant="DS2" />
              </div>
            </div>
          </div>
          <div className="mt-3 text-[10px]" style={{ color: THEME.textDim, lineHeight: 1.5 }}>
            DS-2 rendered at build-progress 72% to reflect canonical "incomplete superstructure" posture at the Battle of Endor. Core systems (superlaser, reactor, C3, shield) were complete; hull closure was the lagging item.
          </div>
        </Panel>

        <Panel title="SUPERLASER UPGRADES" accent={THEME.red} code="§A.3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
              <thead>
                <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                  <th className="text-left py-2 pr-2">PARAMETER</th>
                  <th className="text-left py-2 pr-2">DS-1</th>
                  <th className="text-left py-2">DS-2</th>
                </tr>
              </thead>
              <tbody style={{ color: THEME.text }}>
                {[
                  ['Tributary arch.', '8 equal', '7 + 1 center'],
                  ['Full-power recharge', '~24 h', '~3-5 min'],
                  ['Capital-ship targeting', 'No', 'Yes'],
                  ['Reactor cores', '1 hypermatter', '3 hypermatter'],
                  ['Targeting field', 'Spherical', 'Advanced focusing'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < 4 ? `1px solid ${THEME.border}50` : 'none' }}>
                    {r.map((c, j) => (
                      <td key={j} className="py-2 pr-2" style={j === 0 ? { color: THEME.amber } : j === 2 ? { color: THEME.red } : {}}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.amber}40` }}>
            <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
              <strong style={{ color: THEME.amber }}>Capital-ship kill arithmetic.</strong> Needs ~10¹⁵–10¹⁸ J (vaporize 10⁶–10⁸ kg at ~10¹⁰ J/kg coupling). 3-min recharge at capital-ship power is 5.5×10¹²–5.5×10¹⁵ W — 10⁹–10¹² × below planet-kill draw. Consistent with DS-1-class reactor at low duty cycle.
            </div>
          </div>
        </Panel>
      </div>

      {/* Weapons comparison */}
      <Panel title="WEAPONS COMPLEMENT · DS-1 vs DS-2" accent={THEME.red} code="§A.6" className="mb-6">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={WEAPONS_DS1.map((w, i) => ({ name: w.name, ds1: w.count, ds2: WEAPONS_DS2[i].count }))} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
              <CartesianGrid stroke={THEME.border} strokeDasharray="2 2" opacity={0.4} />
              <XAxis dataKey="name" tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} angle={-15} textAnchor="end" interval={0} height={50} stroke={THEME.border} />
              <YAxis tick={{ fill: THEME.textMuted, fontSize: 9, fontFamily: 'JetBrains Mono' }} stroke={THEME.border} />
              <Tooltip contentStyle={{ background: THEME.panel, border: `1px solid ${THEME.red}`, fontSize: 11, fontFamily: 'JetBrains Mono' }} formatter={v => v.toLocaleString()} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Chakra Petch' }} />
              <Bar dataKey="ds1" fill={THEME.amber} name="DS-1" />
              <Bar dataKey="ds2" fill={THEME.red} name="DS-2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-[10px]" style={{ color: THEME.textDim, lineHeight: 1.5 }}>
          DS-2 triples most weapon counts. Tractor-beam count invariant at 768 — strongly suggests geometric constant (24 zones × 32 per zone) rather than capacity limit.
        </div>
      </Panel>

      {/* Comparative param table */}
      <Panel title="FULL PARAMETER COMPARISON" accent={THEME.amber} code="§A" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono'" }}>
            <thead>
              <tr style={{ color: THEME.textMuted, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left py-2 px-3">PARAMETER</th>
                <th className="text-left py-2 px-3">DS-1</th>
                <th className="text-left py-2 px-3">DS-2</th>
              </tr>
            </thead>
            <tbody>
              {DS1_VS_DS2.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${THEME.border}40` }}>
                  <td className="py-2 px-3" style={{ color: THEME.textMuted }}>{row.param}</td>
                  <td className="py-2 px-3" style={{ color: THEME.amber }}>{row.ds1}</td>
                  <td className="py-2 px-3" style={{ color: THEME.red }}>{row.ds2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Shield offload analysis */}
      <Panel title="SLD-26 ENDOR SHIELD · DECOUPLED ARCHITECTURE ANALYSIS" accent={THEME.cyan} code="§A.4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-xs mb-4" style={{ color: THEME.text, lineHeight: 1.6 }}>
              DS-2's SLD-26 Planetary Shield Generator (CoMar) sits on the Endor forest moon (radius ~2,450 km). Geostationary coupling via repulsorlift. The field caused measurable Endor seismic and hydrological disturbance.
            </p>
            <div className="text-[11px] uppercase tracking-widest mb-2" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
              Engineering rationales (ranked)
            </div>
            <ol className="space-y-3 text-xs" style={{ color: THEME.text }}>
              {[
                { title: 'Power-draw coexistence', desc: 'Three reactor cores + rapid-fire superlaser + in-hull shield may exceed thermal-rejection budget. Offload to planetary thermal mass.' },
                { title: 'Volume recovery', desc: 'DS-1 had many on-hull shield towers consuming internal volume. Offloading frees interior for weapons/hangars.' },
                { title: 'Planetary-scale power tap', desc: 'Canon hints SLD-26 was "slowly destroying Endor" — consistent with geothermal/tidal-dissipation extraction via repulsor coupling.' },
                { title: 'Political / operational', desc: 'Garrisons Endor, projects power onto inhabited worlds, forms part of the Emperor\'s trap posture.' },
              ].map((r, i) => (
                <li key={i} className="pl-4 relative">
                  <span className="absolute left-0 top-0" style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{i + 1}.</span>
                  <div style={{ color: THEME.cyan, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>{r.title}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: THEME.textMuted }}>{r.desc}</div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="p-4" style={{ background: THEME.bg, border: `1px solid ${THEME.red}` }}>
              <div className="flex items-start gap-2 mb-2">
                <Skull size={16} style={{ color: THEME.red, flexShrink: 0, marginTop: 2 }} />
                <div className="text-sm" style={{ color: THEME.red, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                  WORST-PRACTICE ENGINEERING
                </div>
              </div>
              <p className="text-xs mb-3" style={{ color: THEME.text, lineHeight: 1.6 }}>
                Single point of failure. A ground assault (Ewok-assisted strike team) disabled the generator and dropped the shield in a single combat event. This is worse than DS-1's exhaust port in one respect: the compromise vector was terrestrial infantry, not an exotic exploit.
              </p>
              <div className="text-[11px] uppercase tracking-widest mb-2 mt-4" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                Correct Redundant Design
              </div>
              <ul className="space-y-1.5 text-[11px]" style={{ color: THEME.text }}>
                {[
                  'At least 3 independent generators on 3 independent planetary/L-point nodes',
                  'Voting logic with graceful degradation',
                  'ICBM LCC Permissive Action Links analog',
                  'Station-local fallback shield at reduced capacity',
                  'Decoy nodes to prevent targeting convergence',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5" style={{ width: 4, height: 4, background: THEME.green, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.amber}40` }}>
              <div className="text-[11px]" style={{ color: THEME.textMuted, lineHeight: 1.5 }}>
                <strong style={{ color: THEME.amber }}>DS-2 did all the right things on the exhaust-port problem</strong> (mm-scale distributed porting, particle shields, CIWS) — then gave it all back by picking a single planetary-surface shield node. The Empire's failure was never imagination; it was redundancy discipline.
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};

// ------- PHYSICS LEDGER -------
const PhysicsTab = () => {
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

// ============================== MAIN APP =====================================
export default function App() {
  const [tab, setTab] = useState('command');
  const [firing, setFiring] = useState(0);
  const firingRaf = useRef(null);

  // Superlaser firing animation sequencer
  const startFire = () => {
    if (firing > 0) return;
    const start = performance.now();
    const step = (t) => {
      const dt = (t - start) / 1000; // s
      const f = Math.min(dt / 3.5, 1); // 3.5 s sequence
      setFiring(f);
      if (f < 1) firingRaf.current = requestAnimationFrame(step);
      else {
        setTimeout(() => setFiring(0), 800);
      }
    };
    firingRaf.current = requestAnimationFrame(step);
  };

  useEffect(() => () => firingRaf.current && cancelAnimationFrame(firingRaf.current), []);

  const TABS = [
    { id: 'command', label: 'Command', icon: Activity, code: '§0' },
    { id: 'structure', label: 'Structure', icon: Layers, code: '§1' },
    { id: 'construction', label: 'Construction', icon: Building2, code: '§3' },
    { id: 'reactor', label: 'Reactor', icon: Flame, code: '§2-3' },
    { id: 'drive', label: 'Drive & ECLSS', icon: Rocket, code: '§4-5' },
    { id: 'defense', label: 'Defense', icon: Shield, code: '§6' },
    { id: 'ds2', label: 'DS-2 Appendix', icon: Hexagon, code: 'Appx A' },
    { id: 'physics', label: 'Physics', icon: Atom, code: '§9-10' },
  ];

  return (
    <div className="min-h-screen" style={{ background: THEME.bg, color: THEME.text, fontFamily: "'JetBrains Mono', monospace" }}>
      {/* Embed fonts + global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');

        @keyframes scanMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        body {
          background: ${THEME.bg};
          font-family: 'JetBrains Mono', monospace;
        }
        * {
          box-sizing: border-box;
        }
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: ${THEME.panel};
        }
        ::-webkit-scrollbar-thumb {
          background: ${THEME.border};
        }
        ::-webkit-scrollbar-thumb:hover {
          background: ${THEME.amber};
        }
        input[type=range] {
          -webkit-appearance: none;
          background: ${THEME.panel};
          border: 1px solid ${THEME.border};
          height: 4px;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          background: ${THEME.amber};
          cursor: pointer;
          border: 2px solid ${THEME.bg};
          box-shadow: 0 0 8px ${THEME.amber};
        }
        input[type=range]::-moz-range-thumb {
          width: 14px;
          height: 14px;
          background: ${THEME.amber};
          cursor: pointer;
          border: 2px solid ${THEME.bg};
          box-shadow: 0 0 8px ${THEME.amber};
        }
      `}</style>

      {/* Top command bar */}
      <header
        style={{
          background: THEME.surface,
          borderBottom: `1px solid ${THEME.border}`,
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between max-w-[1800px] mx-auto">
          <div className="flex items-center gap-4">
            {/* Logo mark */}
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke={THEME.amber} strokeWidth="1.5" />
                <circle cx="12" cy="14" r="3" fill="none" stroke={THEME.amber} strokeWidth="1" />
                <line x1="2" y1="18" x2="34" y2="18" stroke={THEME.amber} strokeWidth="0.6" />
                <circle cx="18" cy="18" r="2" fill={THEME.amber}>
                  <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
            <div>
              <div className="text-lg md:text-xl tracking-wider" style={{ color: THEME.text, fontFamily: "'Chakra Petch'", fontWeight: 600, letterSpacing: '0.08em' }}>
                DS-1 ORBITAL BATTLE STATION
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'" }}>
                Engineering Specification · Interactive Console
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[10px]" style={{ color: THEME.textMuted }}>
            <div className="flex items-center gap-1.5">
              <div style={{ width: 6, height: 6, background: THEME.green, animation: 'pulse 2s infinite' }} />
              <span>LINK ACTIVE</span>
            </div>
            <div>STARDATE · Y19 · HORUZ</div>
            <div style={{ color: THEME.amber }}>CLASSIFIED · IMDEP-1</div>
          </div>
        </div>
        <ScannerLine />
      </header>

      {/* Tab navigation */}
      <nav className="px-4 md:px-6 py-2 max-w-[1800px] mx-auto overflow-x-auto" style={{ background: THEME.surface, borderBottom: `1px solid ${THEME.border}` }}>
        <div className="flex gap-1">
          {TABS.map(t => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex items-center gap-2 px-4 py-2.5 text-xs tracking-widest uppercase whitespace-nowrap transition-colors"
                style={{
                  background: active ? THEME.panel : 'transparent',
                  color: active ? THEME.amber : THEME.textMuted,
                  border: `1px solid ${active ? THEME.amber : 'transparent'}`,
                  borderBottom: active ? `1px solid ${THEME.amber}` : `1px solid transparent`,
                  fontFamily: "'Chakra Petch'",
                  fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                }}
              >
                <Icon size={14} />
                {t.label}
                <span className="text-[9px] opacity-60 ml-1">{t.code}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main content */}
      <main className="px-4 md:px-6 py-6 max-w-[1800px] mx-auto">
        {tab === 'command' && <CommandTab firing={firing} startFire={startFire} />}
        {tab === 'structure' && <StructureTab />}
        {tab === 'construction' && <ConstructionTab />}
        {tab === 'reactor' && <ReactorTab firing={firing} startFire={startFire} />}
        {tab === 'drive' && <DriveTab />}
        {tab === 'defense' && <DefenseTab />}
        {tab === 'ds2' && <DS2Tab />}
        {tab === 'physics' && <PhysicsTab />}
      </main>

      {/* Footer */}
      <footer style={{ background: THEME.surface, borderTop: `1px solid ${THEME.border}` }} className="mt-12">
        <ScannerLine color={THEME.border} />
        <div className="px-6 py-6 max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                SOURCE AUTHORITY
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>Wookieepedia (canon + Legends)</li>
                <li>Death Star Technical Companion (WEG 40008)</li>
                <li>Star Wars: Incredible Cross-Sections (DK)</li>
                <li>Star Wars: Complete Locations (DK)</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                PHYSICS SOURCES
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>Lehigh / Centives steel analysis</li>
                <li>Feinstein (2015) arXiv:1511.09054</li>
                <li>Lentz (2021) Class. Quantum Grav. 38</li>
                <li>NIF / ITER / NASA NTRS</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                WEAPONS ANALOGS
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>MARAUDER / Shiva Star (AFRL)</li>
                <li>Epirus Leonidas HPM</li>
                <li>HELIOS Mk 5 Mod 0 (USN)</li>
                <li>Bamford mini-magnetosphere (RAL)</li>
              </ul>
            </div>
            <div>
              <div className="text-xs mb-2 tracking-widest" style={{ color: THEME.amber, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                APPLICATION BUILD
              </div>
              <ul className="text-[10px] space-y-1" style={{ color: THEME.textMuted }}>
                <li>Hybrid canon / real-physics visualization</li>
                <li>Eight primary system modules</li>
                <li>Interactive build timeline</li>
                <li>Vulnerability + handwavium ledger</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-4 text-[10px] flex flex-col md:flex-row justify-between gap-2" style={{ borderTop: `1px solid ${THEME.border}`, color: THEME.textDim }}>
            <div>Specification reference document: DS-1 Orbital Battle Station · Hard-Physics Engineering Specification</div>
            <div style={{ color: THEME.amber }}>For systems-engineering study purposes only · No recommendation to construct</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
