import React, { useState, useEffect, useMemo } from 'react';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { THEME } from '../theme';
import { GLOSSARY_ENTRIES } from '../data';
import { Pill } from './Pill';
import type { NavigateFn, GlossaryEntry } from '../types';

export interface GlossaryDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: NavigateFn;
}

const CATEGORIES: ReadonlyArray<'ALL' | GlossaryEntry['category']> = [
  'ALL',
  'V&V Class',
  'Symbol',
  'Acronym',
  'Canon Hardware',
];

export const GlossaryDrawer: React.FC<GlossaryDrawerProps> = ({ open, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'ALL' | GlossaryEntry['category']>('ALL');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY_ENTRIES.filter(entry => {
      if (category !== 'ALL' && entry.category !== category) return false;
      if (!q) return true;
      return (
        entry.term.toLowerCase().includes(q) ||
        entry.expansion.toLowerCase().includes(q) ||
        entry.detail.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  if (!open) return null;

  const toneForCategory = (cat: GlossaryEntry['category']) => {
    switch (cat) {
      case 'V&V Class':
        return 'red' as const;
      case 'Symbol':
        return 'amber' as const;
      case 'Acronym':
        return 'cyan' as const;
      case 'Canon Hardware':
        return 'green' as const;
    }
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end"
      style={{ background: 'rgba(10, 10, 14, 0.75)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Nomenclature and Verification Glossary"
        className="w-full max-w-xl h-full flex flex-col overflow-hidden"
        style={{
          background: THEME.surface,
          borderLeft: `1px solid ${THEME.amber}`,
          fontFamily: "'JetBrains Mono', monospace",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: THEME.panel, borderBottom: `1px solid ${THEME.border}` }}
        >
          <div className="flex items-center gap-2.5">
            <BookOpen size={16} color={THEME.amber} />
            <div>
              <div
                className="text-sm tracking-widest uppercase"
                style={{ color: THEME.text, fontFamily: "'Chakra Petch', sans-serif", fontWeight: 600 }}
              >
                NOMENCLATURE &amp; V&amp;V GLOSSARY
              </div>
              <div className="text-[11px]" style={{ color: THEME.textDim }}>
                Appendix B Symbols / Acronyms &amp; Appendix F Verification Classes
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 text-xs uppercase tracking-widest"
            style={{
              background: THEME.bg,
              color: THEME.amber,
              border: `1px solid ${THEME.border}`,
              fontFamily: "'Chakra Petch', sans-serif",
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            CLOSE [ESC]
          </button>
        </div>

        {/* Search + Filter Controls */}
        <div className="p-4 space-y-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <div className="relative flex items-center">
            <Search size={14} color={THEME.textDim} className="absolute left-3 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Filter symbols, acronyms, V&V classes, hardware (e.g., U₀, MARAUDER, CR27200)..."
              aria-label="Search nomenclature glossary"
              className="w-full pl-9 pr-3 py-2 text-xs"
              style={{
                background: THEME.bg,
                color: THEME.text,
                border: `1px solid ${THEME.border}`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="px-2.5 py-1 text-[11px] uppercase tracking-wider"
                  style={{
                    background: active ? THEME.amber : THEME.panel,
                    color: active ? THEME.bg : THEME.textMuted,
                    border: `1px solid ${active ? THEME.amber : THEME.border}`,
                    fontFamily: "'Chakra Petch', sans-serif",
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Entries list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs" style={{ color: THEME.textMuted }}>
              No glossary entries match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map(entry => (
              <div
                key={entry.term}
                className="p-3.5"
                style={{ background: THEME.panel, border: `1px solid ${THEME.border}` }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div
                    className="text-sm font-semibold"
                    style={{ color: THEME.amber, fontFamily: "'Chakra Petch', sans-serif" }}
                  >
                    {entry.term}
                  </div>
                  <Pill tone={toneForCategory(entry.category)}>{entry.category}</Pill>
                </div>
                <div className="text-xs font-semibold mb-1" style={{ color: THEME.text }}>
                  {entry.expansion}
                </div>
                <p className="text-xs leading-relaxed mb-2" style={{ color: THEME.textMuted }}>
                  {entry.detail}
                </p>
                {entry.relatedTab && (
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate(entry.relatedTab!);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider px-2 py-0.5"
                    style={{
                      color: THEME.cyan,
                      background: `${THEME.cyan}14`,
                      border: `1px solid ${THEME.cyan}45`,
                      fontFamily: "'Chakra Petch', sans-serif",
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>OPEN IN {entry.relatedTab.toUpperCase()} TAB</span>
                    <ChevronRight size={12} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};
