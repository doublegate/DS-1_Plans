import React, { useEffect } from 'react';
import { Settings, AlertOctagon } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, SectionHeader, Pill,
} from '../components';
import { HANDWAVIUM } from '../data';
import type { NavigableTabProps } from '../types';

export const PhysicsTab: React.FC<NavigableTabProps> = ({ onNavigate, focusId }) => {
  useEffect(() => {
    if (!focusId) return;
    const el = document.getElementById(focusId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusId]);

  return (
    <div>
      <SectionHeader
        kicker="§10–11 · HANDWAVIUM LEDGER & MINIMUM-HANDWAVE RECONSTRUCTION"
        title="Physics Walls and Canonical Escapes"
        description="Ten independent points where canonical performance exceeds known physics. Accept these bounded concessions (HW-1..HW-10) and every remaining subsystem closes via finite (10–15 order-of-magnitude) engineering extrapolation."
      />

      <div className="grid grid-cols-1 gap-3 mb-6">
        {HANDWAVIUM.map(h => {
          const isFocused = focusId === h.id;
          return (
            <Panel
              key={h.id}
              id={h.id}
              accent={THEME.red}
              highlighted={isFocused}
              padding="p-4"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex md:flex-col items-center md:items-stretch justify-between gap-2">
                  <div
                    className="w-20 text-center py-2"
                    style={{
                      background: THEME.red,
                      color: '#fff',
                      fontFamily: "'Chakra Petch'",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {h.id}
                  </div>
                  <Pill
                    tone="amber"
                    onClick={() => onNavigate?.(h.subsystemTab)}
                    title={`Open ${h.subsystem} tab`}
                  >
                    {h.subsystem} ↗
                  </Pill>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <AlertOctagon size={13} style={{ color: THEME.red }} />
                      <span
                        className="text-xs uppercase tracking-widest"
                        style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch'", fontWeight: 600 }}
                      >
                        Irreducible Physics Wall
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs" style={{ color: THEME.textDim }}>Citing DRs:</span>
                      {h.traces.map(dr => (
                        <Pill
                          key={dr}
                          tone="cyan"
                          onClick={() => onNavigate?.('ledger', dr)}
                          title={`Inspect ${dr} in V&V Ledger`}
                        >
                          {dr} ↗
                        </Pill>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm font-semibold mb-3" style={{ color: THEME.text }}>
                    {h.wall}
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <Settings size={13} style={{ color: THEME.cyan }} />
                    <span
                      className="text-xs uppercase tracking-widest"
                      style={{ color: THEME.textMuted, fontFamily: "'Chakra Petch'", fontWeight: 600 }}
                    >
                      Canonical / Spec Escape Mechanism
                    </span>
                  </div>
                  <div className="text-xs" style={{ color: THEME.cyan, fontFamily: "'JetBrains Mono'" }}>
                    {h.escape}
                  </div>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel title="MINIMUM-HANDWAVE HARD-SF RECONSTRUCTION" accent={THEME.green} code="§11.1–11.5">
        <p className="text-sm mb-4" style={{ color: THEME.textMuted, lineHeight: 1.6 }}>
          If tasked to reconstruct the DS-1 primary weapon architecture with the minimum possible departure from relativistic physics:
        </p>
        <div className="space-y-4">
          {[
            {
              n: 1,
              title: 'Condensed-Matter Annihilation Core',
              text: '~10¹⁶ kg inventory of magnetically stabilized c²-class condensed matter annihilated over a 24-hour recharge cycle (~2.6 × 10²⁷ W sustained thermal power).',
            },
            {
              n: 2,
              title: 'Direct Magnetohydrodynamic Conversion',
              text: 'Aneutronic-style direct inductive conversion of charged annihilation products into a coherent relativistic beam; the outbound jet itself carries away the reaction entropy (resolving HW-4).',
            },
            {
              n: 3,
              title: 'Relativistic Hadronic / Plasma Jet (Not Photon Laser)',
              text: 'A γ ~ 2–5 relativistic baryonic/leptonic jet focused by a 10-km superconducting magnetic quadrupole/solenoid aperture, penetrating planetary crust via deep hadronic shower rather than surface optical reflection (resolving HW-5).',
            },
            {
              n: 4,
              title: '24-Hour Buffer Cycle',
              text: '86,400-second recharge integrates 2.6 × 10²⁷ W sustained output to fill the 2.24 × 10³² J shot buffer without exceeding core containment flux limits.',
            },
            {
              n: 5,
              title: 'Inertial / Counter-Jet Recoil Compensation',
              text: 'Either effective gravitational mass is boosted to ≥ 10²⁵ kg by the hypermatter core, or counter-propagating exhaust plumes cancel the 7.5 × 10²³ N·s shot impulse (HW-6 / DR-14).',
            },
          ].map(s => (
            <div key={s.n} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                style={{
                  background: THEME.green,
                  color: '#000',
                  fontFamily: "'Chakra Petch'",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {s.n}
              </div>
              <div>
                <div className="text-sm" style={{ color: THEME.green, fontFamily: "'Chakra Petch'", fontWeight: 600 }}>
                  {s.title}
                </div>
                <div className="text-xs mt-1" style={{ color: THEME.text, lineHeight: 1.6 }}>
                  {s.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3" style={{ background: THEME.bg, border: `1px solid ${THEME.green}45` }}>
          <div className="text-xs" style={{ color: THEME.text, lineHeight: 1.6 }}>
            This collapses ten concessions down to two core axioms: <strong style={{ color: THEME.green }}>(a) a stable c²-density bulk energy substrate</strong>, and <strong style={{ color: THEME.green }}>(b) a 10-km phased magnetic/plasma active aperture</strong>. Every other structural, thermal, and life-support requirement closes by finite scaling.
          </div>
        </div>
      </Panel>

      <Panel title="DOCTRINAL SYSTEMS-ENGINEERING LESSON" accent={THEME.amber} code="§09.4 / §11.6" className="mt-6">
        <p className="text-sm mb-3" style={{ color: THEME.text, lineHeight: 1.7 }}>
          The Death Star holds together as rigorous engineering fiction because <strong style={{ color: THEME.amber }}>almost every subsystem outside the reactor-weapon pair</strong> maps onto real or defensibly extrapolated hardware: modular spherical pressure hulls, equatorial thermal-expansion trenches, Whipple meteoroid shields, 16-Psyche M-type asteroid ISRU, NEXT-C scaled ion propulsion, ISS/submarine closed-loop ECLSS, MARAUDER compact-toroid turbolasers, and Epirus Leonidas HPM ion cannons.
        </p>
        <p className="text-sm" style={{ color: THEME.text, lineHeight: 1.7 }}>
          <strong style={{ color: THEME.green }}>The core takeaway:</strong> Megastructures fail not where the physics is hardest, but where fault-tree redundancy is softest. A civilization capable of refining 10¹⁸ kg of maraging steel from metallic asteroids and buffering 2.24 × 10³² J in hypermatter had every resource needed for N+2 fault tolerance — yet lost two battle stations to single-point architectural vulnerabilities (FMEA E-01 and E-20).
        </p>
      </Panel>
    </div>
  );
};
