import React from 'react';
import type { SectionHeaderProps } from '../types';
import { THEME } from '../theme';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ kicker, title, description }) => (
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
