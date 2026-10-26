// TypeScript types for all data tables and component props.
// Source-of-truth for shapes. Data files in src/data/ reference these.

import type { ThemeTone } from './theme';
import type { ReactNode, CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';

export type TabId =
  | 'command'
  | 'structure'
  | 'construction'
  | 'reactor'
  | 'drive'
  | 'defense'
  | 'ds2'
  | 'physics'
  | 'ledger';

export type NavigateFn = (tab: TabId, focusId?: string) => void;

// ---------- Data shapes ----------

export interface MassBudgetRow {
  name: string;
  fraction: number;        // percent of total mass
  mass: number;            // kg
  material: string;
  color: string;           // hex
}

export interface CrewRow {
  role: string;
  count: number;
  color: string;
}

export interface WeaponRow {
  name: string;
  count: number;
  model?: string;
  mode?: string;
}

export interface ConstructionPhase {
  phaseNum: number;
  label: string;
  startYear: number;
  endYear: number;
  era: string;
  tasks: string[];
  deliverable: string;
  costCumulative: number;  // USD
  description: string;
}

export interface EnergyComparison {
  label: string;
  joules: number;
}

export interface ReactorOption {
  option: string;
  specific: number;        // J/kg
  fuelPerShot: number;     // kg
  feasibility: number;     // 0..100
  handwavium: 'Low' | 'Medium' | 'High' | 'Very high' | 'Total';
}

export interface HandwaviumEntry {
  id: string;              // "HW-1" .. "HW-10"
  wall: string;            // the physics wall
  escape: string;          // canonical escape hatch
  subsystem: string;       // owning subsystem doc(s)
  subsystemTab: TabId;     // target tab in console
  traces: string[];        // DR-IDs that cite this HW
}

export type VerificationClass = 'A' | 'D' | 'I' | 'T' | 'C';
//                              Analysis / Demo / Inspection / Test / Concession

export interface DerivedRequirement {
  id: string;              // "DR-01" .. "DR-16"
  text: string;
  sr: string;              // stakeholder-requirement IDs (comma-sep)
  cls: VerificationClass;
  refs: string;
}

export interface FmeaRow {
  id: string;              // "E-01" etc.
  item: string;
  mode: string;            // failure mode
  effect: string;
  s: number;               // severity 1..10
  o: number;               // occurrence 1..10
  d: number;               // detection 1..10
  rpn: number;             // S × O × D
  mitigation: string;
  variant: 'DS-1' | 'DS-2';
}

export interface RealWorldProgram {
  program: string;
  citedIn: string;
  thenStatus: string;      // as stated in the ref-doc
  currentStatus: string;   // current as of 2026
  gap: string;
  citation?: string;
  url?: string;
}

export interface ReferenceSource {
  id: string;
  category: 'Canon & Legends' | 'Physicist Analyses' | 'Economic Models' | 'Propulsion & FTL' | 'Reactor & Directed Energy' | 'Spacecraft Systems & ISRU';
  title: string;
  authorsOrOrg: string;
  year: string;
  relevance: string;
  url?: string;
}

export interface GlossaryEntry {
  term: string;
  category: 'Symbol' | 'Acronym' | 'Canon Hardware' | 'V&V Class';
  expansion: string;
  detail: string;
  relatedTab?: TabId;
}

export interface CostCategory {
  category: string;
  usd: number;
  fraction: number;        // percent
}

export interface DS1Vs2Row {
  param: string;
  ds1: string;
  ds2: string;
}

export interface VulnerabilityRow {
  issue: string;
  ds1: number;             // severity 0..5
  ds2: number;             // severity 0..5
  note: string;
}

export interface PropulsionRow {
  engine: string;
  isp: number;             // seconds
  thrust: number;          // N
  power: number;           // W
}

export interface EclssRow {
  input: string;
  kg: number;              // total per day
  perPerson: number;       // kg per person per day
}

export interface FighterRow {
  craft: string;
  count: number;
}

// ---------- Component prop shapes ----------

export interface PanelProps {
  children: ReactNode;
  className?: string;
  accent?: string;
  title?: string | null;
  code?: string | null;
  padding?: string;
  id?: string;
  highlighted?: boolean;
  onCodeClick?: () => void;
}

export interface StatBlockProps {
  label: string;
  value: string | number;
  unit?: string;
  tone?: ThemeTone;
  note?: string | null;
  compact?: boolean;
}

export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export interface PillProps {
  children: ReactNode;
  tone?: ThemeTone;
  onClick?: () => void;
  title?: string;
  active?: boolean;
}

export interface RadialGaugeProps {
  value: number;
  max?: number;
  label: string;
  unit?: string;
  color?: string;
  size?: number;
}

export interface ScannerLineProps {
  color?: string;
}

export interface StationDiagramProps {
  buildProgress?: number;  // 0..1
  firing?: number;         // 0..1
  showLabels?: boolean;
  variant?: 'DS1' | 'DS2';
  size?: number;
  onSelectSubsystem?: (tab: TabId) => void;
}

export interface TabDef {
  id: TabId;
  label: string;
  icon: LucideIcon;
  code: string;
  group: 'Overview' | 'Subsystems' | 'Verification & Delta';
}

export interface TabPropsWithFiring {
  firing: number;
  startFire: () => void;
  onNavigate?: NavigateFn;
  focusId?: string | null;
}

export interface NavigableTabProps {
  onNavigate?: NavigateFn;
  focusId?: string | null;
}

// Re-export convenience for tabs that accept inline style
export type { CSSProperties };
