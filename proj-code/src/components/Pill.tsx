import React from 'react';
import type { PillProps } from '../types';
import { THEME } from '../theme';

export const Pill: React.FC<PillProps> = ({
  children,
  tone = 'default',
  onClick,
  title,
  active = false,
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
      : THEME.textMuted;

  const fgColor =
    tone === 'amber'
      ? '#fbbf24'
      : tone === 'red'
      ? '#f87171'
      : tone === 'cyan'
      ? '#22d3ee'
      : tone === 'green'
      ? '#4ade80'
      : tone === 'purple'
      ? '#c084fc'
      : THEME.textMuted;

  const sharedStyle: React.CSSProperties = {
    color: active ? THEME.bg : fgColor,
    border: `1px solid ${active ? color : `${color}66`}`,
    background: active ? color : `${color}14`,
    fontFamily: "'Chakra Petch', sans-serif",
    fontWeight: 600,
    cursor: onClick ? 'pointer' : 'default',
  };

  if (onClick) {
    return (
      <button
        type="button"
        data-pill="true"
        onClick={onClick}
        title={title}
        className="pill inline-flex items-center gap-1 px-2 py-0.5 text-[11px] tracking-wider uppercase transition-colors hover:opacity-90"
        style={sharedStyle}
      >
        {children}
      </button>
    );
  }

  return (
    <span
      data-pill="true"
      title={title}
      className="pill inline-flex items-center gap-1 px-2 py-0.5 text-[11px] tracking-wider uppercase"
      style={sharedStyle}
    >
      {children}
    </span>
  );
};
