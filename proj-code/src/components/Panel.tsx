import React from 'react';
import type { PanelProps } from '../types';
import { THEME } from '../theme';

export const Panel: React.FC<PanelProps> = ({ children, className = '', accent = THEME.border, title = null, code = null, padding = 'p-5' }) => (
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
