import type { CostCategory } from '../types';

export const COST_BREAKDOWN: readonly CostCategory[] = [
  { category: 'Raw materials (M-type ISRU)', usd: 852e15, fraction: 14 },
  { category: 'In-space fabrication', usd: 1700e15, fraction: 28 },
  { category: 'Kyber crystal acquisition', usd: 400e15, fraction: 7 },
  { category: 'Hypermatter charge', usd: 1200e15, fraction: 20 },
  { category: 'Weapons & shields', usd: 600e15, fraction: 10 },
  { category: 'ECLSS & crew provisioning', usd: 300e15, fraction: 5 },
  { category: 'R&D + program overhead', usd: 500e15, fraction: 8 },
  { category: 'Security + Sienar/KDY margin', usd: 488e15, fraction: 8 },
];
