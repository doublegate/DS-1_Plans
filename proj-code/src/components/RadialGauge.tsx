import React from 'react';
import type { RadialGaugeProps } from '../types';
import { THEME } from '../theme';

// Circular progress-ring gauge. Reused from the JSX reference (removed from the
// cleanup-pass TSX but kept here as a first-class primitive for future tabs).
export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  max = 100,
  label,
  unit = '',
  color = THEME.amber,
  size = 120,
}) => {
  const pct = Math.min(value / max, 1);
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  return (
    <div style={{ width: size }} className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={THEME.border} strokeWidth="4" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text
          x={size / 2}
          y={size / 2 + 3}
          textAnchor="middle"
          fontSize="14"
          fontFamily="'JetBrains Mono', monospace"
          fill={THEME.text}
          fontWeight="bold"
        >
          {value.toFixed(0)}
          {unit}
        </text>
      </svg>
      <span className="text-[10px] tracking-widest uppercase mt-1" style={{ color: THEME.textMuted }}>
        {label}
      </span>
    </div>
  );
};
