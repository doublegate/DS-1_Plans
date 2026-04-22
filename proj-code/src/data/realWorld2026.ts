import type { RealWorldProgram } from '../types';

// Real-world analog programs cited in the spec. Status current as of April 2026.
export const REAL_WORLD_2026: readonly RealWorldProgram[] = [
  { program: 'NIF laser fusion (LLNL)', citedIn: '04 Superlaser §4.4', thenStatus: '2.2 MJ, 500 TW peak, 192 beams (2022 ignition)', currentStatus: '8.6 MJ record yield (2025-04-07); target gain >4; 10th ignition 2025-10-01 at 3.5 MJ; Enhanced Yield Capability project approved 2026', gap: '10²⁶× below Alderaan-shot peak power' },
  { program: 'TAE Technologies p-¹¹B (FRC "Norm")', citedIn: '03 Power §3.2', thenStatus: '70 M°C (2025); Tri-Alpha/NIFS Nature Comms 2023 detection', currentStatus: 'First p-B¹¹ in magnetically confined plasma 2025-12 (TAE+NIFS); Copernicus reactor 2026; 50 MWe plant siting underway', gap: 'Net-electricity target in 2030s; still 10²⁴× below reactor steady-state' },
  { program: 'Epirus Leonidas HPM', citedIn: '07 Defense §7.3', thenStatus: 'CENTCOM deployment Jan 2025; 49-drone single-pulse kill Aug 2025', currentStatus: 'Leonidas AGV unveiled 2026-03 (Epirus + GDLS + Kodiak AI); 4 IFPC-HPM delivered to US Army', gap: 'Closest operational analog to canon ion cannons; soft-kill only' },
  { program: 'HELIOS Mk 5 Mod 0 (Lockheed)', citedIn: '07 Defense §7.2', thenStatus: '60 kW fiber, scalable 150 kW; USS Preble DDG-88 operational 2025', currentStatus: 'In fleet service; integration path to cruiser/carrier combat systems', gap: '26 orders below Saxton turbolaser inference' },
  { program: 'NASA Psyche mission', citedIn: '02 Structural §2.5', thenStatus: 'En-route; launched 2023-10-13', currentStatus: 'Mars gravity assist 2026-05; arrival at 16 Psyche 2029-08; Apr 2025 xenon pressure issue resolved Jun 2025 via backup line', gap: 'Will directly characterize M-type ISRU feedstock class' },
  { program: 'CERN ALPHA antihydrogen', citedIn: '03 Power §3.2', thenStatus: '~2 M atoms/yr synthesis (≈ 3 × 10⁻²⁰ kg/yr)', currentStatus: 'Continued ALPHA-g gravitational measurements; no break in production-rate scaling', gap: '~10³⁴ years of current output per Alderaan shot' },
  { program: 'Lentz soliton (2021 Class. Quantum Grav.)', citedIn: '05 Propulsion §5.2', thenStatus: 'Classical positive-energy plasma warp-metric solution', currentStatus: 'Bobrick & Martire 2021 review; no experimental realization; remains theoretical', gap: '10⁴⁵ J field energy for 120-km bubble unresolved' },
  { program: 'NASA NEXT-C ion thruster', citedIn: '05 Propulsion §5.1', thenStatus: '7.4 kW, 236 mN, 4,190 s Isp (DART 2021)', currentStatus: 'Operational on multiple deep-space missions; Psyche uses NEXT-derived SPT-140 Hall thrusters', gap: '10¹⁰× scale-up needed for milli-g on 10¹⁸ kg' },
];

