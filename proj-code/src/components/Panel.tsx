import React from 'react';
import type { PanelProps } from '../types';
import { THEME } from '../theme';

export const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
  accent = THEME.border,
  title = null,
  code = null,
  padding = 'p-5',
  id,
  highlighted = false,
  onCodeClick,
}) => (
  <div
    id={id}
    data-panel="true"
    className={`panel relative ${padding} ${className}`}
    style={{
      background: highlighted ? THEME.panelHi : THEME.panel,
      border: `1px solid ${highlighted ? THEME.amber : accent}`,
      boxShadow: highlighted ? `inset 0 0 0 1px ${THEME.amber}` : 'none',
      fontFamily: "'JetBrains Mono', monospace",
    }}
  >
    {title && (
      <div
        className="flex items-center justify-between gap-2 mb-3 pb-2"
        style={{ borderBottom: `1px solid ${THEME.border}` }}
      >
        <div className="flex items-center gap-2">
          <div style={{ width: 6, height: 6, background: accent, flexShrink: 0 }} />
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}
          >
            {title}
          </span>
        </div>
        {code && (
          onCodeClick ? (
            <button
              type="button"
              onClick={onCodeClick}
              className="text-[11px] tracking-wider px-1.5 py-0.5 transition-colors"
              style={{
                color: THEME.amber,
                background: `${THEME.amber}12`,
                border: `1px solid ${THEME.amber}40`,
                fontFamily: "'JetBrains Mono', monospace",
                cursor: 'pointer',
              }}
              title={`Jump to ${code}`}
            >
              {code} ↗
            </button>
          ) : (
            <span className="text-[11px] tracking-wider" style={{ color: THEME.textDim }}>
              {code}
            </span>
          )
        )}
      </div>
    )}
    {children}
  </div>
);
