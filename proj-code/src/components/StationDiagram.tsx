import React, { useMemo } from 'react';
import type { StationDiagramProps, TabId } from '../types';
import { THEME } from '../theme';

// Precomputed normalized geometry tables so 60fps RAF animations do zero redundant trig.
const LAT_INDICES = Array.from({ length: 11 }, (_, i) => (i + 1) * 15 - 90);
const MERIDIAN_INDICES = Array.from({ length: 8 }, (_, i) => i);
const SURFACE_SPECKLES = Array.from({ length: 80 }, (_, i) => {
  const a = ((i * 137.5) * Math.PI) / 180;
  const radNorm = 0.2 + (i % 7) * 0.1;
  return { ux: radNorm * Math.cos(a), uy: radNorm * Math.sin(a) };
});
const WEAPON_SPECKLES = Array.from({ length: 120 }, (_, i) => {
  const seed = i * 2.39996;
  const rNorm = 0.5 + ((i * 7) % 10) / 28;
  const ux = rNorm * Math.cos(seed);
  const uy = rNorm * Math.sin(seed * 1.618);
  return { ux, uy, valid: Math.hypot(ux, uy) <= 0.95 };
}).filter(p => p.valid);

const StationDiagramBase: React.FC<StationDiagramProps> = ({
  buildProgress = 1,
  firing = 0,
  showLabels = true,
  variant = 'DS1',
  size = 520,
  onSelectSubsystem,
}) => {
  const R = size / 2;
  const cx = R;
  const cy = R;
  const sphereR = R * 0.82;
  const coreR = sphereR * 0.13;
  const dishR = sphereR * 0.25;
  const dishCx = cx;
  const dishCy = cy - sphereR * 0.42;

  const stage = (threshold: number): boolean => buildProgress >= threshold;
  const ds2 = variant === 'DS2';

  const callouts = useMemo(() => {
    if (!showLabels || !stage(0.65)) return [];
    return [
      {
        id: 'reactor' as TabId,
        label: 'SUPERLASER DISH · §04',
        x1: dishCx + dishR * 0.72,
        y1: dishCy - dishR * 0.25,
        bx: cx + sphereR * 0.16,
        by: cy - sphereR * 0.88,
        bw: sphereR * 0.78,
        accent: THEME.green,
      },
      {
        id: 'defense' as TabId,
        label: ds2 ? 'MM-CAPILLARY VENTS · §12' : '2M EXHAUST PORT · §07',
        x1: cx,
        y1: cy - sphereR * 0.72,
        bx: cx - sphereR * 0.96,
        by: cy - sphereR * 0.88,
        bw: sphereR * 0.82,
        accent: THEME.red,
      },
      {
        id: 'reactor' as TabId,
        label: ds2 ? '3× HYPERMATTER CORES · §12' : 'CR27200 REACTOR · §03',
        x1: cx + coreR,
        y1: cy,
        bx: cx + sphereR * 0.16,
        by: cy + sphereR * 0.48,
        bw: sphereR * 0.80,
        accent: THEME.amber,
      },
      {
        id: 'structure' as TabId,
        label: 'EQUATORIAL TRENCH · §02',
        x1: cx - sphereR * 0.55,
        y1: cy + 2,
        bx: cx - sphereR * 0.96,
        by: cy + sphereR * 0.48,
        bw: sphereR * 0.80,
        accent: THEME.cyan,
      },
    ];
  }, [showLabels, buildProgress, dishCx, dishCy, dishR, cx, cy, sphereR, coreR, ds2]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="w-full h-full"
      role="img"
      aria-label={`${variant} Orbital Battle Station cutaway schematic at ${(buildProgress * 100).toFixed(0)}% build completion`}
    >
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
          <circle cx={cx} cy={cy} r={sphereR} fill="none" stroke={THEME.cyan} strokeWidth="0.8" strokeDasharray="4 4" />
          <text x={cx} y={cy} textAnchor="middle" fill={THEME.cyan} fontSize="12" fontFamily="'Chakra Petch'" opacity="0.85">
            DESIGN PHASE · GEONOSIS / MUSTAFAR
          </text>
        </g>
      )}

      {/* Phase 2: Central truss + reactor core */}
      {stage(0.05) && (
        <g opacity={Math.min((buildProgress - 0.05) * 10, 1)}>
          <line
            x1={cx}
            y1={cy - sphereR * 0.95}
            x2={cx}
            y2={cy + sphereR * 0.95}
            stroke={THEME.amber}
            strokeWidth="1"
            opacity="0.6"
            strokeDasharray="2 4"
          />
          <circle cx={cx} cy={cy} r={coreR} fill="url(#coreGlow)" filter="url(#glowF)">
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
          {LAT_INDICES.map((lat, i) => {
            const y = cy - sphereR * Math.sin((lat * Math.PI) / 180);
            const rAt = sphereR * Math.cos((lat * Math.PI) / 180);
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={y}
                rx={rAt}
                ry={rAt * 0.15}
                stroke={THEME.amber}
                fill="none"
                strokeWidth="0.3"
                opacity="0.4"
              />
            );
          })}
          {MERIDIAN_INDICES.map(i => {
            const a = (i * Math.PI) / 4;
            return (
              <ellipse
                key={`m${i}`}
                cx={cx}
                cy={cy}
                rx={sphereR * Math.abs(Math.cos(a))}
                ry={sphereR}
                stroke={THEME.amber}
                fill="none"
                strokeWidth="0.3"
                opacity="0.3"
                transform={`rotate(${i * 22.5} ${cx} ${cy})`}
              />
            );
          })}
        </g>
      )}

      {/* Phase 4: Hull plating - solid sphere */}
      {stage(0.4) && (
        <g opacity={Math.min((buildProgress - 0.4) * 5, 1)}>
          <circle cx={cx} cy={cy} r={sphereR} fill="url(#hullGrad)" stroke={THEME.border} strokeWidth="0.6" />
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
          {SURFACE_SPECKLES.map((pt, i) => (
            <circle
              key={i}
              cx={cx + pt.ux * sphereR}
              cy={cy + pt.uy * sphereR}
              r="0.5"
              fill={THEME.textDim}
              opacity="0.35"
            />
          ))}

          {/* Reactor shows through */}
          <circle cx={cx} cy={cy} r={coreR} fill="url(#coreGlow)" opacity="0.45" />
        </g>
      )}

      {/* Phase 5: Superlaser dish */}
      {stage(0.65) && (
        <g opacity={Math.min((buildProgress - 0.65) * 4, 1)}>
          <circle
            cx={dishCx}
            cy={dishCy}
            r={dishR}
            fill={firing > 0 ? 'url(#dishFiring)' : 'url(#dishGrad)'}
            stroke={THEME.amber}
            strokeWidth="0.8"
          />
          <circle cx={dishCx} cy={dishCy} r={dishR * 0.6} fill="none" stroke={THEME.amber} strokeWidth="0.3" opacity="0.6" />
          <circle
            cx={dishCx}
            cy={dishCy}
            r={dishR * 0.3}
            fill={firing > 0 ? THEME.greenGlow : THEME.border}
            opacity={firing > 0 ? 1 : 0.8}
          >
            {firing > 0 && (
              <animate
                attributeName="r"
                values={`${dishR * 0.2};${dishR * 0.4};${dishR * 0.2}`}
                dur="0.6s"
                repeatCount="indefinite"
              />
            )}
          </circle>

          {/* 8 tributary marks (7+1 for DS2) */}
          {MERIDIAN_INDICES.map(i => {
            const a = ((i * 360) / 8) * (Math.PI / 180);
            const xx = dishCx + dishR * 0.78 * Math.cos(a);
            const yy = dishCy + dishR * 0.78 * Math.sin(a);
            const isCenter = ds2 && i === 0;
            return (
              <circle
                key={i}
                cx={xx}
                cy={yy}
                r={isCenter ? 3 : 2}
                fill={firing > 0 ? THEME.greenGlow : THEME.amber}
                opacity={firing > 0 ? 1 : 0.75}
              />
            );
          })}
        </g>
      )}

      {/* Phase 6: Weapons batteries (dot speckle) */}
      {stage(0.75) && (
        <g opacity={Math.min((buildProgress - 0.75) * 4, 1)}>
          {WEAPON_SPECKLES.map((pt, i) => (
            <circle
              key={i}
              cx={cx + pt.ux * sphereR}
              cy={cy + pt.uy * sphereR}
              r="0.65"
              fill={THEME.cyan}
              opacity="0.55"
            />
          ))}
        </g>
      )}

      {/* Phase 7: Operational - power glow */}
      {stage(0.9) && (
        <g opacity={Math.min((buildProgress - 0.9) * 10, 1)}>
          <circle cx={cx} cy={cy} r={sphereR + 2} fill="none" stroke={THEME.amber} strokeWidth="0.4" opacity="0.4">
            <animate attributeName="r" values={`${sphereR + 1};${sphereR + 6};${sphereR + 1}`} dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      )}

      {/* Firing sequence: 8 tributary beams converging */}
      {firing > 0 && firing < 0.6 && stage(0.65) && (
        <g filter="url(#glowF)">
          {MERIDIAN_INDICES.map(i => {
            const a = (i * 45 * Math.PI) / 180;
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

      {/* Interactive in-bounds callout labels */}
      {callouts.map((c, idx) => {
        const anchorX = c.bx < cx ? c.bx + c.bw : c.bx;
        const anchorY = c.by + 11;
        return (
          <g
            key={idx}
            onClick={onSelectSubsystem ? () => onSelectSubsystem(c.id) : undefined}
            style={{ cursor: onSelectSubsystem ? 'pointer' : 'default' }}
          >
            <line
              x1={c.x1}
              y1={c.y1}
              x2={anchorX}
              y2={anchorY}
              stroke={c.accent}
              strokeWidth="0.9"
              strokeDasharray="2 2"
              opacity="0.85"
            />
            <circle cx={c.x1} cy={c.y1} r="2.2" fill={c.accent} />
            <rect
              x={c.bx}
              y={c.by}
              width={c.bw}
              height="20"
              fill="#0a0a0ee6"
              stroke={c.accent}
              strokeWidth="0.8"
            />
            <text
              x={c.bx + c.bw / 2}
              y={c.by + 13}
              textAnchor="middle"
              fontSize="10"
              fontFamily="'Chakra Petch', sans-serif"
              fontWeight="600"
              fill={THEME.text}
            >
              {c.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const StationDiagram = React.memo(StationDiagramBase);
