import type { PropulsionRow } from '../types';

export const PROPULSION_DATA: readonly PropulsionRow[] = [
  { engine: 'NSTAR (Dawn)', isp: 3100, thrust: 0.092, power: 2.3e3 },
  { engine: 'NEXT-C (DART)', isp: 4190, thrust: 0.236, power: 7.4e3 },
  { engine: 'Hall-effect (krypton)', isp: 2500, thrust: 0.170, power: 4.2e3 },
  { engine: 'VX-200 VASIMR', isp: 4900, thrust: 5.0, power: 2e5 },
  { engine: 'Sepma 30-5 (canon)', isp: 1e7, thrust: 1e10, power: 1e17 },
];
