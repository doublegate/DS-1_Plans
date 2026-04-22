import type { HandwaviumEntry } from '../types';

// HW-1..HW-10 ledger. Traces field cites the DR-IDs that reference each concession.
// Bidirectional check closed 2026-04-22 under Phase 2 S2.4.
export const HANDWAVIUM: readonly HandwaviumEntry[] = [
  { id: 'HW-1', wall: '5×10⁵ L☉ in 1-s pulse through solid matter', escape: 'Hypermatter channels + deflector shielding', subsystem: '03 Power / 04 Superlaser', traces: ['DR-01'] },
  { id: 'HW-2', wall: 'Antimatter unproducible at scale (10²⁴× universe age at CERN rate)', escape: 'Hypermatter is tachyonic, formed in hyperspace', subsystem: '03 Power', traces: ['DR-01', 'DR-02'] },
  { id: 'HW-3', wall: 'No storage holds 10³² J in <10²⁵ kg', escape: 'Hypermatter as combined fuel + capacitor', subsystem: '03 Power', traces: ['DR-01', 'DR-02'] },
  { id: 'HW-4', wall: 'Waste heat >10²⁹ J per shot, cannot radiate', escape: 'Beam itself carries entropy; exhaust venting', subsystem: '03 Power / 07 Defense', traces: ['DR-13'] },
  { id: 'HW-5', wall: 'EM laser cannot volume-couple to planet core', escape: '"Superlaser" is a hypermatter particle beam, not EM', subsystem: '04 Superlaser', traces: ['DR-03'] },
  { id: 'HW-6', wall: 'Momentum recoil of 10²³ kg·m/s not observed', escape: 'Station hypermatter-dense at ≥10²⁵ kg, or reactionless', subsystem: '04 Superlaser / 05 Propulsion', traces: ['DR-14'] },
  { id: 'HW-7', wall: 'Hyperdrive ~10⁴⁵ J field energy for 120-km bubble', escape: 'Hypermatter / Lentz-class plasma soliton', subsystem: '05 Propulsion', traces: ['DR-08'] },
  { id: 'HW-8', wall: 'No mechanism for plate-scale metric manipulation', escape: '"Gravity generators" (unspecified)', subsystem: '06 Life Support', traces: ['DR-15'] },
  { id: 'HW-9', wall: 'No configurable attractive force on uncharged hull', escape: '"Gravitic manipulation" (unspecified)', subsystem: '07 Defense', traces: ['DR-16'] },
  { id: 'HW-10', wall: '10¹⁸ kg in 19 years requires ~10¹⁶ W industrial power', escape: 'Kardashev-II ISRU + self-replicating robotics', subsystem: '02 Structural', traces: ['DR-09'] },
];
