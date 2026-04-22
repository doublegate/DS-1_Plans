import type { FmeaRow } from '../types';

// Top-RPN rows from docs/appendix-E-fmea.md. S × O × D scoring.
export const FMEA_REGISTER: readonly FmeaRow[] = [
  { id: 'E-13', item: 'Reactor waste-heat rejection', mode: 'Radiator area insufficient for 10²⁹ J/shot', effect: 'Hull overheat within cycle', s: 10, o: 10, d: 10, rpn: 1000, mitigation: 'HW-4 concession; beam carries entropy', variant: 'DS-1' },
  { id: 'E-05', item: 'Turbolaser friendly-fire interlock', mode: 'Geometry lockout creates trench shadow zones', effect: 'Attackers fly trench through gap', s: 9, o: 10, d: 6, rpn: 540, mitigation: 'Geometry-aware sectoring vs blanket lockout', variant: 'DS-1' },
  { id: 'E-01', item: 'Main reactor exhaust port', mode: 'Single 2-m duct with LOS to reactor core', effect: 'Proton-torpedo ingress → runaway', s: 10, o: 6, d: 8, rpn: 480, mitigation: 'Distributed mm-microports (DS-2)', variant: 'DS-1' },
  { id: 'E-20', item: 'Planetary shield generator (Endor)', mode: 'Single-point ground capture', effect: 'Shield drops, superstructure exposed', s: 10, o: 9, d: 5, rpn: 450, mitigation: '3+ redundant off-station generators; voting logic', variant: 'DS-2' },
  { id: 'E-08', item: 'Sensor suite (anti-small-craft)', mode: 'Large-craft optimized; low fast-frame perf', effect: 'Starfighter threats detected too late', s: 8, o: 8, d: 6, rpn: 384, mitigation: 'Dedicated fast-frame low-RCS tracking radars', variant: 'DS-1' },
  { id: 'E-02', item: 'Exhaust-port shield', mode: 'Ray-only shield; particle weapons pass', effect: 'Permits torpedo-ingress exploit', s: 10, o: 6, d: 6, rpn: 360, mitigation: 'Particle shield on every external aperture', variant: 'DS-1' },
  { id: 'E-03', item: 'Reactor compartmentalization', mode: 'No magnetic buffer cell between vent and core', effect: 'Single-duct ingress reaches core directly', s: 10, o: 4, d: 8, rpn: 320, mitigation: 'Magnetic buffer cells', variant: 'DS-1' },
  { id: 'E-10', item: 'Reactor containment stability', mode: 'Sabotaged containment geometry (Erso)', effect: 'Torpedo-scale ingress → runaway', s: 10, o: 3, d: 10, rpn: 300, mitigation: 'Supplier/construction vetting; flight monitoring', variant: 'DS-1' },
  { id: 'E-04', item: 'Turbolaser anti-fighter tracking', mode: 'Turrets too slow for X-wing-scale targets', effect: 'Attackers run trench unopposed', s: 9, o: 8, d: 4, rpn: 288, mitigation: 'CIWS + phased-array <500 ms kill chain', variant: 'DS-1' },
  { id: 'E-21', item: 'Unfinished hull (DS-2)', mode: 'Direct flight corridor to reactor core', effect: 'Fighter strike reaches reactor', s: 10, o: 7, d: 4, rpn: 280, mitigation: 'Hull closure before hostile ops; bulkhead closure', variant: 'DS-2' },
];

