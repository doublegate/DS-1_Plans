import type { DerivedRequirement } from '../types';

// DR-01..DR-16 verification matrix. Source: docs/01-design-basis.md §12 + docs/appendix-F-vnv-plan.md §F.3.
export const DERIVED_REQUIREMENTS: readonly DerivedRequirement[] = [
  { id: 'DR-01', text: 'Reactor sustained output ≥ 2.6 × 10²⁷ W', sr: 'SR-01,02', cls: 'C', refs: 'HW-1, HW-3' },
  { id: 'DR-02', text: 'Energy-storage buffer ≥ 2.24 × 10³² J at < 10²⁵ kg', sr: 'SR-01,02', cls: 'C', refs: 'HW-3' },
  { id: 'DR-03', text: 'Beam-to-target coupling sufficient for planetary-volume deposition', sr: 'SR-01', cls: 'C', refs: 'HW-5' },
  { id: 'DR-04', text: 'Structural mass envelope ≤ 1.0 × 10¹⁸ kg', sr: 'SR-03', cls: 'A', refs: 'Mass budget closure' },
  { id: 'DR-05', text: 'Hull resists ΔT ≈ 250 K without fatigue', sr: 'SR-03', cls: 'A', refs: 'Expansion-joint analysis' },
  { id: 'DR-06', text: 'ECLSS closes mass balance ≥ 90% over 3-year endurance', sr: 'SR-04', cls: 'A', refs: 'ISS Sabatier + OGA + WRS scale-up' },
  { id: 'DR-07', text: 'Defensive-weapon inventory matches canon ±5%', sr: 'SR-05', cls: 'I', refs: 'Canon-source reconciliation' },
  { id: 'DR-08', text: 'Hyperdrive Class 4 primary / Class 24 backup', sr: 'SR-06', cls: 'C', refs: 'HW-7' },
  { id: 'DR-09', text: 'Construction schedule 19 ± 2 years', sr: 'SR-07', cls: 'C', refs: 'HW-10' },
  { id: 'DR-10', text: 'All external apertures have ray + particle shield', sr: 'SR-08', cls: 'A', refs: 'FMEA E-02, E-21 coverage' },
  { id: 'DR-11', text: 'No single point of failure in shield generation', sr: 'SR-08', cls: 'A', refs: 'Redundant-generator architecture' },
  { id: 'DR-12', text: 'Zone-level distributed C2 with <500 ms anti-fighter kill chain', sr: 'SR-05', cls: 'A', refs: 'Light-time + slew-rate derivation' },
  { id: 'DR-13', text: 'Per-shot waste-heat routing via beam envelope (≥ 2.24 × 10²⁹ J)', sr: 'SR-01,02', cls: 'C', refs: 'HW-4' },
  { id: 'DR-14', text: 'Net station Δv per shot ≤ 1 m/s on 10¹⁸ kg envelope', sr: 'SR-01', cls: 'C', refs: 'HW-6' },
  { id: 'DR-15', text: 'Interior decks present ≥ 0.9 g uniform vertical gravity', sr: 'SR-04', cls: 'C', refs: 'HW-8' },
  { id: 'DR-16', text: 'Configurable attractive force on remote uncharged hulls (Falcon-class at 100 km)', sr: 'SR-05', cls: 'C', refs: 'HW-9' },
];
