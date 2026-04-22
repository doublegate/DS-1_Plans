import React from 'react';
import type { PillProps } from '../types';
import { THEME } from '../theme';

export const Pill: React.FC<PillProps> = ({ children, tone = 'default' }) => {
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

