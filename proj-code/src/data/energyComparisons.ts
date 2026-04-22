import type { EnergyComparison } from '../types';

export const ENERGY_COMPARISONS: readonly EnergyComparison[] = [
  { label: 'Hiroshima (Little Boy)', joules: 6.3e13 },
  { label: 'Tsar Bomba', joules: 2.1e17 },
  { label: 'Chicxulub impact', joules: 4.2e23 },
  { label: 'Moon binding energy', joules: 1.24e29 },
  { label: 'Earth binding energy', joules: 2.24e32 },
  { label: 'Alderaan shot (canon)', joules: 2.24e32 },
  { label: 'Sun output / week', joules: 2.31e32 },
  { label: 'Sun output / year', joules: 1.21e34 },
  { label: 'Debris-kinetics upper (Wong)', joules: 1e38 },
];
