import React from 'react';
import type { ScannerLineProps } from '../types';
import { THEME } from '../theme';

export const ScannerLine: React.FC<ScannerLineProps> = ({ color = THEME.amber }) => (
  <div className="relative h-0.5 overflow-hidden" style={{ background: `${color}15` }}>
    <div
      className="absolute inset-y-0 w-16"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        animation: 'scanMove 4s linear infinite',
      }}
    />
  </div>
);
