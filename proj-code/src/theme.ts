// DS-1 engineering console — design tokens.
// Dark-terminal palette. Amber/cyan/red/green semantic roles.
// Matches docs/appendix-B-nomenclature.md §B.5 and typeset/template.typ palette.

export const THEME = {
  bg:        '#0a0a0e',
  surface:   '#12141a',
  panel:     '#1a1d26',
  panelHi:   '#222632',
  border:    '#2d3340',
  borderHi:  '#3d4452',
  text:      '#e8e8ed',
  textMuted: '#8a8f9a',
  textDim:   '#5a5f6a',
  amber:     '#e8a317',
  amberGlow: '#ffb830',
  red:       '#dc2626',
  redGlow:   '#ff3a3a',
  cyan:      '#0891b2',
  cyanGlow:  '#22d3ee',
  green:     '#16a34a',
  greenGlow: '#4ade80',
  purple:    '#7c3aed',
} as const;

export type Theme = typeof THEME;
export type ThemeTone = 'amber' | 'red' | 'cyan' | 'green' | 'default';

export const toneColor = (tone: ThemeTone): string => {
  switch (tone) {
    case 'amber':   return THEME.amber;
    case 'red':     return THEME.red;
    case 'cyan':    return THEME.cyan;
    case 'green':   return THEME.green;
    default:        return THEME.textMuted;
  }
};
