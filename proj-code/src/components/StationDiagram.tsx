import React, { useState, useEffect, useRef } from 'react';
import type { StationDiagramProps } from '../types';
import { THEME } from '../theme';

export const StationDiagram: React.FC<StationDiagramProps> = ({ buildProgress = 1, firing = 0, showLabels = true, variant = 'DS1', size = 520 }) => {
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

