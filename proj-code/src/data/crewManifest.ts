import type { CrewRow } from '../types';
import { THEME } from '../theme';

export const CREW_MANIFEST: readonly CrewRow[] = [
  { role: 'Ground forces',           count: 607360, color: '#b45309'   },
  { role: 'Passengers/contractors',  count: 450000, color: '#475569'   },
  { role: 'Navy crew',               count: 342953, color: THEME.amber },
  { role: 'TIE/support pilots',      count: 167216, color: THEME.cyan  },
  { role: 'Gunners',                 count:  57276, color: THEME.red   },
  { role: 'Skeleton crew',           count:  56914, color: '#64748b'   },
  { role: 'Starship support',        count:  42782, color: '#0e7490'   },
  { role: 'Stormtroopers',           count:  25984, color: '#fff'      },
];
