import type { MassBudgetRow } from '../types';
import { THEME } from '../theme';

export const MASS_BUDGET: readonly MassBudgetRow[] = [
  { name: 'Primary hull',       fraction: 35, mass: 3.5e17, material: 'Quadanium / maraging steel', color: THEME.amber },
  { name: 'Armor (Whipple)',    fraction: 25, mass: 2.5e17, material: 'Composite + spaced belts',   color: '#d4921a'    },
  { name: 'Internal structure', fraction: 20, mass: 2.0e17, material: 'Durasteel / Ti-6Al-4V',      color: '#b88016'    },
  { name: 'Reactor + shield',   fraction:  8, mass: 8.0e16, material: 'Agrinium / borated steel',   color: THEME.red    },
  { name: 'Weapons',            fraction:  4, mass: 4.0e16, material: 'Kyber arrays, turrets',      color: THEME.cyan   },
  { name: 'Propulsion',         fraction:  3, mass: 3.0e16, material: 'Ion drives, hyperdrive nodes', color: THEME.purple },
  { name: 'Consumables',        fraction:  2, mass: 2.0e16, material: 'Atmosphere, water, food',    color: THEME.green  },
  { name: 'Fighters/craft',     fraction:  1, mass: 1.0e16, material: 'TIE, AT-AT, shuttle',        color: '#64748b'    },
  { name: 'Margin',             fraction:  2, mass: 2.0e16, material: 'Reserve',                    color: '#475569'    },
];
