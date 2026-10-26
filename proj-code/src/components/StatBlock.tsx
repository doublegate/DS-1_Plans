import React from 'react';
import type { StatBlockProps } from '../types';
import { THEME } from '../theme';

export const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  unit,
  tone = 'amber',
  note = null,
  compact = false,
}) => {
  const color =
    tone === 'amber'
      ? THEME.amber
      : tone === 'red'
      ? THEME.red
      : tone === 'cyan'
      ? THEME.cyan
      : tone === 'green'
      ? THEME.green
      : tone === 'purple'
      ? THEME.purple
      : THEME.text;
  return (
    <div className={compact ? 'flex flex-col py-1' : 'flex flex-col py-1.5'}>
      <span
        className="text-[11px] tracking-widest uppercase mb-1"
        style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 500 }}
      >
        {label}
      </span>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className={`${compact ? 'text-xl' : 'text-2xl'} font-bold tabular-nums`}
          style={{ color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs" style={{ color: THEME.textDim }}>
            {unit}
          </span>
        )}
      </div>
      {note && (
        <span className="text-xs mt-1 leading-snug" style={{ color: THEME.textDim }}>
          {note}
        </span>
      )}
    </div>
  );
};
