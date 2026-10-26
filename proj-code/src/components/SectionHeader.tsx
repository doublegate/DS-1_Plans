import React from 'react';
import type { SectionHeaderProps } from '../types';
import { THEME } from '../theme';

export const SectionHeader: React.FC<SectionHeaderProps> = ({ kicker, title, description, actions }) => (
  <div className="mb-6">
    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
      <div className="flex flex-wrap items-baseline gap-3">
        <h2
          className="text-2xl md:text-3xl tracking-wide"
          style={{ color: THEME.text, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}
        >
          {title}
        </h2>
        {kicker && (
          <span
            className="text-xs tracking-[0.2em] uppercase px-2 py-0.5"
            style={{
              color: THEME.amber,
              border: `1px solid ${THEME.amber}45`,
              background: `${THEME.amber}12`,
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 600,
            }}
          >
            {kicker}
          </span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    {description && (
      <p className="max-w-2xl text-sm leading-relaxed" style={{ color: THEME.textMuted }}>
        {description}
      </p>
    )}
  </div>
);
