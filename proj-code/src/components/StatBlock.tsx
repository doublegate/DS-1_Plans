import React from 'react';
import type { StatBlockProps } from '../types';
import { THEME } from '../theme';

export const StatBlock: React.FC<StatBlockProps> = ({ label, value, unit, tone = 'amber', note = null }) => {
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
