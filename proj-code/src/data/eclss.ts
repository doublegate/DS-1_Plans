import type { EclssRow } from '../types';

export const ECLSS_DAILY: readonly EclssRow[] = [
  { input: 'O₂ consumed', kg: 1428000, perPerson: 0.84 },
  { input: 'CO₂ produced', kg: 1700000, perPerson: 1.00 },
  { input: 'Potable water', kg: 5950000, perPerson: 3.5 },
  { input: 'Hygiene water', kg: 8500000, perPerson: 5.0 },
  { input: 'Food (dry+wet)', kg: 3400000, perPerson: 2.0 },
  { input: 'Solid waste', kg: 200000, perPerson: 0.12 },
];
