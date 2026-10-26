import React, { useState, useEffect } from 'react';
import { Printer, ExternalLink } from 'lucide-react';
import { THEME } from '../theme';
import {
  Panel, SectionHeader, Pill,
} from '../components';
import {
  HANDWAVIUM, DERIVED_REQUIREMENTS, FMEA_REGISTER, REAL_WORLD_2026, PRIMARY_SOURCES,
} from '../data';
import type { NavigableTabProps, VerificationClass, ReferenceSource } from '../types';

export const LedgerTab: React.FC<NavigableTabProps> = ({ onNavigate, focusId }) => {
  const [filter, setFilter] = useState<'all' | 'DS-1' | 'DS-2'>('all');
  const [sourceCat, setSourceCat] = useState<'ALL' | ReferenceSource['category']>('ALL');
  const [localFocus, setLocalFocus] = useState<string | null>(focusId ?? null);

  useEffect(() => {
    if (!focusId) return;
    setLocalFocus(focusId);
    const el = document.getElementById(focusId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusId]);

  const clsColor = (cls: VerificationClass): string =>
    cls === 'C' ? THEME.red : cls === 'A' ? THEME.cyan : cls === 'T' ? THEME.green : THEME.amber;

  const clsLabel = (cls: VerificationClass): string =>
    cls === 'C'
      ? 'Concession [C]'
      : cls === 'A'
      ? 'Analysis [A]'
      : cls === 'T'
      ? 'Test [T]'
      : cls === 'I'
      ? 'Inspection [I]'
      : 'Demo [D]';

  const fmeaShown = FMEA_REGISTER.filter(r => filter === 'all' || r.variant === filter);
  const maxRpn = Math.max(...FMEA_REGISTER.map(r => r.rpn));
  const sourcesShown = PRIMARY_SOURCES.filter(s => sourceCat === 'ALL' || s.category === sourceCat);

  const focusElement = (id: string) => {
    setLocalFocus(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div>
      <SectionHeader
        kicker="APPENDIX B–F · TRACEABILITY & VERIFICATION LEDGER"
        title="Handwavium · Derived Requirements · FMEA · Real-World Analogs"
        description="Authoritative bidirectional cross-reference matrix: every physics concession (HW-1..HW-10) traces to a derived requirement (DR-01..DR-16) and owning subsystem; every top-RPN failure mode traces to an architectural mitigation; every real-world analog program is tracked with 2026 verification citations."
        actions={
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-widest transition-colors"
            style={{
              background: THEME.amber,
              color: THEME.bg,
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
            }}
            title="Export A4 Dossier Appendix via Print Stylesheet"
          >
            <Printer size={14} />
            <span>PRINT A4 DOSSIER</span>
          </button>
        }
      />

      {/* Row 1: Handwavium ledger with subsystem + DR traceability */}
      <Panel title="HANDWAVIUM REGISTER (BIDIRECTIONAL TRACEABILITY)" code="§10 / HW-1 … HW-10" accent={THEME.red} className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${THEME.border}`, color: THEME.textMuted }}>
                <th className="text-left py-2 pr-3 font-semibold tracking-wider uppercase text-[11px]">ID</th>
                <th className="text-left py-2 pr-3 font-semibold tracking-wider uppercase text-[11px]">Physics Wall</th>
                <th className="text-left py-2 pr-3 font-semibold tracking-wider uppercase text-[11px]">Canonical Escape</th>
                <th className="text-left py-2 pr-3 font-semibold tracking-wider uppercase text-[11px]">Owning Subsystem</th>
                <th className="text-left py-2 font-semibold tracking-wider uppercase text-[11px]">Citing DRs</th>
              </tr>
            </thead>
            <tbody>
              {HANDWAVIUM.map(hw => (
                <tr
                  key={hw.id}
                  id={`ledger-${hw.id}`}
                  style={{
                    borderBottom: `1px solid ${THEME.border}40`,
                    background: localFocus === hw.id ? `${THEME.red}18` : 'transparent',
                  }}
                >
                  <td className="py-2 pr-3">
                    <Pill
                      tone="red"
                      onClick={() => onNavigate?.('physics', hw.id)}
                      title={`Inspect ${hw.id} in Physics Tab`}
                    >
                      {hw.id} ↗
                    </Pill>
                  </td>
                  <td className="py-2 pr-3" style={{ color: THEME.text }}>{hw.wall}</td>
                  <td className="py-2 pr-3" style={{ color: THEME.textMuted }}>{hw.escape}</td>
                  <td className="py-2 pr-3">
                    <Pill
                      tone="amber"
                      onClick={() => onNavigate?.(hw.subsystemTab)}
                      title={`Jump to ${hw.subsystem}`}
                    >
                      {hw.subsystem} ↗
                    </Pill>
                  </td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-1.5">
                      {hw.traces.map(tr => (
                        <Pill
                          key={tr}
                          tone="cyan"
                          onClick={() => focusElement(tr)}
                          title={`Scroll to ${tr} below`}
                        >
                          {tr} ↓
                        </Pill>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 text-xs" style={{ color: THEME.textDim }}>
          All 10 HW-IDs trace bidirectionally to explicit derived requirements (closed under Phase 2 S2.4; DR-13..DR-16 cover waste-heat enthalpic venting, momentum recoil, artificial gravity plates, and tractor gravitic coupling).
        </div>
      </Panel>

      {/* Row 2: Derived requirements verification matrix */}
      <Panel title="DERIVED REQUIREMENTS (V&V MATRIX)" code="Appx F · DR-01 … DR-16" accent={THEME.cyan} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
          {DERIVED_REQUIREMENTS.map(dr => {
            const isHighlighted = localFocus === dr.id;
            const hwRefs = dr.refs.match(/HW-\d+/g) ?? [];
            const fmeaRefs = dr.refs.match(/E-\d+/g) ?? [];
            return (
              <div
                key={dr.id}
                id={dr.id}
                className="flex items-start gap-3 p-2 transition-colors"
                style={{
                  borderBottom: `1px solid ${THEME.border}40`,
                  background: isHighlighted ? THEME.panelHi : 'transparent',
                  outline: isHighlighted ? `1px solid ${THEME.cyan}` : 'none',
                }}
              >
                <span className="mt-0.5">
                  <Pill
                    tone={dr.cls === 'C' ? 'red' : dr.cls === 'A' ? 'cyan' : 'amber'}
                    active={isHighlighted}
                    onClick={() => setLocalFocus(dr.id)}
                  >
                    {dr.id}
                  </Pill>
                </span>
                <div className="flex-1">
                  <div className="text-xs font-medium" style={{ color: THEME.text }}>{dr.text}</div>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs" style={{ color: THEME.textDim }}>
                    <span>Source: {dr.sr}</span>
                    <span className="font-semibold" style={{ color: clsColor(dr.cls) }}>
                      {clsLabel(dr.cls)}
                    </span>
                    <span>· {dr.refs}</span>
                    {hwRefs.map(hwId => (
                      <Pill
                        key={hwId}
                        tone="red"
                        onClick={() => onNavigate?.('physics', hwId)}
                        title={`Open ${hwId} in Physics Tab`}
                      >
                        {hwId} ↗
                      </Pill>
                    ))}
                    {fmeaRefs.map(eId => (
                      <Pill
                        key={eId}
                        tone="amber"
                        onClick={() => focusElement(eId)}
                        title={`Scroll to FMEA ${eId}`}
                      >
                        {eId} ↓
                      </Pill>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-3 flex flex-wrap items-center gap-4 text-xs" style={{ color: THEME.textMuted, borderTop: `1px solid ${THEME.border}` }}>
          <span className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, background: THEME.red, display: 'inline-block' }} />
            <span>[C] Concession (8 / 16)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, background: THEME.cyan, display: 'inline-block' }} />
            <span>[A] Analysis (7 / 16)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, background: THEME.amber, display: 'inline-block' }} />
            <span>[I] Inspection (1 / 16)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span style={{ width: 8, height: 8, background: THEME.green, display: 'inline-block' }} />
            <span>[T] Subscale Real-World Analog Programs (8 tracked below)</span>
          </span>
        </div>
      </Panel>

      {/* Row 3: FMEA top-RPN entries */}
      <Panel title="FAILURE MODES & EFFECTS — TOP-RPN REGISTER" code="Appx E · RPN = S × O × D" accent={THEME.amber} className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs tracking-widest uppercase" style={{ color: THEME.textMuted }}>
              Station Variant Filter:
            </span>
            {(['all', 'DS-1', 'DS-2'] as const).map(v => (
              <button
                key={v}
                type="button"
                onClick={() => setFilter(v)}
                className="text-xs px-2.5 py-1 tracking-wider uppercase"
                style={{
                  color: filter === v ? THEME.bg : THEME.textMuted,
                  background: filter === v ? THEME.amber : 'transparent',
                  border: `1px solid ${filter === v ? THEME.amber : THEME.border}`,
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <span className="text-xs" style={{ color: THEME.textDim }}>
            Severity (S) × Occurrence (O) × Detection (D) ∈ [1, 1000]
          </span>
        </div>
        <div className="space-y-2.5">
          {fmeaShown.map(r => {
            const pct = (r.rpn / maxRpn) * 100;
            const tone = r.rpn >= 500 ? THEME.red : r.rpn >= 300 ? THEME.amber : THEME.cyan;
            const isHighlighted = localFocus === r.id;
            return (
              <div
                key={r.id}
                id={r.id}
                className="flex flex-col md:flex-row md:items-center gap-3 p-2.5"
                style={{
                  borderBottom: `1px solid ${THEME.border}40`,
                  background: isHighlighted ? THEME.panelHi : 'transparent',
                  outline: isHighlighted ? `1px solid ${THEME.amber}` : 'none',
                }}
              >
                <div className="flex items-center gap-2" style={{ minWidth: 110 }}>
                  <Pill tone={r.variant === 'DS-1' ? 'amber' : 'cyan'} onClick={() => setLocalFocus(r.id)}>
                    {r.id}
                  </Pill>
                  <span className="text-xs" style={{ color: THEME.textDim }}>{r.variant}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold" style={{ color: THEME.text }}>{r.item}</div>
                  <div className="text-xs mt-0.5" style={{ color: THEME.textMuted }}>
                    {r.mode} → <span style={{ color: THEME.textDim }}>{r.effect}</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: THEME.green }}>
                    ⤷ Mitigation: {r.mitigation}
                  </div>
                </div>
                <div className="w-full md:w-56">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2" style={{ background: THEME.border }}>
                      <div className="h-full" style={{ width: `${pct}%`, background: tone, transition: 'width 0.5s ease' }} />
                    </div>
                    <span className="text-xs font-bold tabular-nums" style={{ color: tone, minWidth: 42, textAlign: 'right' }}>
                      {r.rpn}
                    </span>
                  </div>
                  <div className="flex justify-end gap-3 text-[11px] mt-1 tabular-nums" style={{ color: THEME.textDim }}>
                    <span>S:{r.s}</span>
                    <span>O:{r.o}</span>
                    <span>D:{r.d}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Row 4: Real-world analog program status as-of 2026 */}
      <Panel title="REAL-WORLD ANALOG PROGRAMS — 2026 BENCHMARK STATUS" code="Appx C / Class [T]" accent={THEME.green} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REAL_WORLD_2026.map(p => (
            <div
              key={p.program}
              className="p-3.5 flex flex-col justify-between"
              style={{ border: `1px solid ${THEME.border}`, background: `${THEME.surface}90` }}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="text-xs font-semibold" style={{ color: THEME.text }}>{p.program}</div>
                    <div className="text-[11px] mt-0.5" style={{ color: THEME.textDim }}>Cited in {p.citedIn}</div>
                  </div>
                  <Pill tone="green">2026 VERIFIED</Pill>
                </div>
                <div className="text-xs mb-1.5" style={{ color: THEME.textMuted }}>
                  <span style={{ color: THEME.textDim }}>PDR baseline:</span> {p.thenStatus}
                </div>
                <div className="text-xs mb-2" style={{ color: THEME.text }}>
                  <span style={{ color: THEME.green, fontWeight: 600 }}>2026 status:</span> {p.currentStatus}
                </div>
              </div>
              <div className="pt-2 mt-2 space-y-1.5" style={{ borderTop: `1px solid ${THEME.border}50` }}>
                <div className="text-xs" style={{ color: THEME.amber }}>
                  Scaling gap: {p.gap}
                </div>
                {p.citation && (
                  <div className="flex items-center justify-between gap-2 text-[11px]" style={{ color: THEME.textDim }}>
                    <span>Ref: {p.citation}</span>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 underline"
                        style={{ color: THEME.cyan }}
                      >
                        <span>Source</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Row 5: Appendix C Primary Sources & Literature Index */}
      <Panel title="PRIMARY SOURCE CITATIONS & LITERATURE INDEX" code="Appendix C" accent={THEME.amber} className="mb-6">
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {([
            'ALL',
            'Canon & Legends',
            'Physicist Analyses',
            'Economic Models',
            'Propulsion & FTL',
            'Reactor & Directed Energy',
            'Spacecraft Systems & ISRU',
          ] as const).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSourceCat(cat)}
              className="px-2.5 py-1 text-[11px] uppercase tracking-wider"
              style={{
                background: sourceCat === cat ? THEME.amber : THEME.bg,
                color: sourceCat === cat ? THEME.bg : THEME.textMuted,
                border: `1px solid ${sourceCat === cat ? THEME.amber : THEME.border}`,
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {sourcesShown.map(src => (
            <div
              key={src.id}
              className="p-3 flex flex-col justify-between"
              style={{ background: THEME.bg, border: `1px solid ${THEME.border}` }}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Pill tone="amber">{src.id} · {src.category}</Pill>
                  <span className="text-xs tabular-nums" style={{ color: THEME.textDim }}>{src.year}</span>
                </div>
                <div className="text-xs font-semibold mt-1" style={{ color: THEME.text }}>
                  {src.title}
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: THEME.cyan }}>
                  {src.authorsOrOrg}
                </div>
                <div className="text-xs mt-1.5 leading-relaxed" style={{ color: THEME.textMuted }}>
                  {src.relevance}
                </div>
              </div>
              {src.url && (
                <div className="mt-2 pt-2 flex justify-end" style={{ borderTop: `1px solid ${THEME.border}40` }}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs underline"
                    style={{ color: THEME.amber }}
                  >
                    <span>Open Primary Reference</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </Panel>

      {/* Closing note */}
      <Panel accent={THEME.border} title="TRACEABILITY GOVERNANCE NOTE" code="§10 / Appx F">
        <div className="text-xs leading-relaxed" style={{ color: THEME.textMuted }}>
          This ledger operationalizes the honest-accounting discipline across <code style={{ color: THEME.amber }}>docs/10-handwavium-ledger.md</code>, the derived-requirements verification table in <code style={{ color: THEME.amber }}>docs/01-design-basis.md §1.5</code>, and the FMEA and V&amp;V registers in <code style={{ color: THEME.amber }}>docs/appendix-E-fmea.md</code> and <code style={{ color: THEME.amber }}>docs/appendix-F-vnv-plan.md</code>. Any engineering claim in the specification that exceeds known physics without an inline <code style={{ color: THEME.red }}>HW-ID</code> citation is classified as a CDR audit defect.
        </div>
      </Panel>
    </div>
  );
};
