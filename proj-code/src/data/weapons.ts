import type { WeaponRow } from '../types';

export const WEAPONS_DS1: readonly WeaponRow[] = [
  { name: 'Heavy turbolasers',    count: 5000, model: 'Taim & Bak XX-9', mode: 'Anti-capital'        },
  { name: 'Standard turbolasers', count: 5000, model: 'Taim & Bak D6',   mode: 'Anti-corvette'       },
  { name: 'Laser cannons',        count: 2500, model: 'Borstel SB-920',  mode: 'Anti-fighter'        },
  { name: 'Ion cannons',          count: 2500, model: 'Borstel MS-1',    mode: 'Disable/disable-only'},
  { name: 'Tractor beams',        count:  768, model: 'Phylon Q7 (mod)', mode: 'Capture'             },
];

export const WEAPONS_DS2: readonly WeaponRow[] = [
  { name: 'Heavy turbolasers',    count: 15000 },
  { name: 'Standard turbolasers', count: 15000 },
  { name: 'Laser cannons',        count:  7500 },
  { name: 'Ion cannons',          count:  5000 },
  { name: 'Tractor beams',        count:   768 },
];
