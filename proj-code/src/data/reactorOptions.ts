import type { ReactorOption } from '../types';

export const REACTOR_OPTIONS: readonly ReactorOption[] = [
  { option: 'D-T tokamak (DEMO)', specific: 3.4e14, fuelPerShot: 6.6e17, feasibility: 5, handwavium: 'Low' },
  { option: 'p-B¹¹ aneutronic', specific: 7e13, fuelPerShot: 3.2e18, feasibility: 15, handwavium: 'Medium' },
  { option: 'Antimatter annihilation', specific: 9e16, fuelPerShot: 2.49e15, feasibility: 40, handwavium: 'High' },
  { option: 'Kerr BH spin-down', specific: 2.6e16, fuelPerShot: 1e16, feasibility: 20, handwavium: 'Very high' },
  { option: 'Hypermatter (canon)', specific: 9e16, fuelPerShot: 2.5e15, feasibility: 100, handwavium: 'Total' },
];
