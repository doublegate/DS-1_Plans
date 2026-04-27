# Appendix G — Configuration Management Plan

**Source:** New synthesis (Phase 6 S6.2, 2026-04-26).
**Scope:** Configuration control across the CDR transition (v0.2 PDR → v1.0 CDR). Establishes baseline-control, change-request workflow, version-tag schema, CCB roles, and ledger-growth gating. Companion to `to-dos/cdr-conventions.md`.

---

## G.1 Purpose

Real CDR programmes maintain a Configuration Management (CM) plan to ensure that the design baseline remains coherent across iterations and that every change is traceable. This appendix is the in-document version for the DS-1 spec — it parallels what NASA NPR 7120.5F §3.6, MIL-STD-973 §5, or ECSS-M-ST-40C would prescribe for a real flight program, scaled to a single-author technical-fiction document.

For the v0.2 PDR baseline (frozen at commit `a4fc0c0`, tag `v0.2`), this appendix retroactively documents the CM that was in fact applied through Phases 0–5, then defines the forward-looking CM for Phases 6–19.

## G.2 Baselines

A **baseline** is a frozen reference state, identified by a release tag, that downstream work is measured against.

| Baseline | Tag | Frozen | Scope |
|---|---|---|---|
| **PDR baseline** | `v0.2` | 2026-04-26 | Numerical baseline (DS-1 = 120 km / 1.0 × 10¹⁸ kg; DS-2 = 160 km / 2.37 × 10¹⁸ kg; Alderaan = 2.24 × 10³² J; hypermatter = c²); 16 DRs; HW-1..HW-10; 30 figures; FMEA top-10. Frozen — changes require CCB Major-class disposition. |
| **CDR-foundation baseline** | `v0.3` (pending) | TBD | CDR conventions, configuration management, drafting standards, ICD template. Methodology layer; numerical baseline unchanged from PDR. |
| **CDR-detail baseline** | `v0.5` (pending) | TBD | All 8 subsystems at component-level CDR depth. New component-level numerical detail extends but does not contradict PDR baseline. |
| **CDR-interface baseline** | `v0.6` (pending) | TBD | All ICDs in place; bidirectional consistency clean. |
| **CDR-program baseline** | `v0.8` (pending) | TBD | RAM, cost, schedule, regulatory, DS-2 deltas complete. |
| **CDR baseline** | `v1.0` (pending) | TBD | All audits clean; final typeset. **The CDR product baseline.** |

Each baseline is captured by an annotated git tag, a release PDF, a SHA-256, and a CHANGELOG entry. Baselines are immutable — corrections post-tag generate a new tag (e.g., `v0.3.1`).

## G.3 Configuration Items (CIs)

A **Configuration Item** is anything the CCB controls. The DS-1 CI inventory:

| CI Class | Examples | Owner |
|---|---|---|
| **Numerical baseline** | `01-design-basis.md` constants; `appendix-A` MPT; `appendix-A2` DS-2 rebudget | Chief Engineer |
| **Architecture** | Subsystem geometry; topology; redundancy structure | Chief Engineer |
| **Requirements** | SR-NN, DR-NN, RR-NN, MR-NN, OR-NN, DR2-NN | Chief Engineer |
| **Handwavium ledger** | HW-1..HW-15 | CCB Chair (decision) + Chief Engineer (analysis) |
| **ICDs** | `docs/icd/ICD-NN-MM.md` | Both subsystem owners; bidirectional approval |
| **Figures** | `docs/figures/F-*.png` + `_sources/*` | Original author (programmatic) or User (Nano Banana 2) |
| **FMEA** | `appendix-E-fmea.md` rows | Safety Lead |
| **Software architecture** | `docs/cdr/software-architecture.md`, `appendix-K`, state machines | Software Lead |
| **Cost / schedule** | `appendix-N`, `appendix-O` | CCB Chair (programmatic owner) |
| **Compliance** | `appendix-P` | Regulatory Lead |
| **Build pipeline** | `typeset/build.sh`, `typeset/template.typ`, `typeset/main.typ` | Chief Engineer (toolchain owner) |

For a single-author project, all roles are held by the same person; the CI table documents the **discipline** that would apply to a multi-author project and clarifies who would own what.

## G.4 Change-request workflow

```
                  ┌──────────────┐
                  │ CR-NNNN issue│  (GitHub Issue, "Peer Review" template)
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐
                  │  CCB Triage  │  Severity: Major / Minor
                  └──────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
       ┌──────────┐          ┌────────────────┐
       │  Major   │          │     Minor      │
       │ → Impact │          │  → Disposition │
       │ Analysis │          │    (fast path) │
       └────┬─────┘          └────┬───────────┘
            │                     │
            ▼                     │
       ┌──────────┐               │
       │  CCB     │               │
       │ Disposn  │               │
       └────┬─────┘               │
            │                     │
            └───────┬─────────────┘
                    ▼
            ┌─────────────┐
            │  Approve →  │  Implementation commit + appendix-G row
            │  Defer →    │  Backlog
            │  Reject →   │  Issue closed with rationale
            └──────┬──────┘
                   ▼
            ┌─────────────┐
            │ Verification│  Next phase audit
            └─────────────┘
```

**Severity matrix:**

| Class | Triggers | Process |
|---|---|---|
| **Major** | Numerical baseline change · architecture change · HW ledger entry · removal of a DR · figure that re-baselines a numerical claim | Full impact analysis; CCB disposition; minor version bump |
| **Minor** | Editorial · cross-reference fix · figure re-render with same content · table-cell typo · prose clarification | Fast-path disposition; bundled with adjacent commits; no version bump |

CR numbering: `CR-NNNN` zero-padded. The first CR after this appendix is `CR-0001`.

## G.5 CCB roles

For a single-author project (the user), all five CCB roles are held by the same person. The role definitions exist so a real review by an external panel (e.g., the senior-engineer signatures pending from the Approval block) can use the same workflow.

| Role | Primary responsibility | Veto authority |
|---|---|---|
| **CCB Chair** | Tie-breaker; programmatic decision; tag authority | Any change |
| **Chief Engineer** | Numerical baseline; traceability matrix; toolchain | Numerical / architectural changes |
| **Safety Lead** | FMEA · reliability tree · vulnerability analysis | Failure-mode / safety changes |
| **Software Lead** | Software architecture · FDIR · CONOPS state machines | Software architecture changes |
| **Regulatory Lead** | Compliance dossier · tone discipline | Regulatory / compliance changes |

The CDR Approval block in the front matter (Phase 19 S19.1) carries five signature slots, one per role.

## G.6 Handwavium ledger growth gating

PDR ledger: HW-1..HW-10 (frozen). CDR may need HW-11..HW-15 to capture concessions surfaced during component-level design.

**Allocation procedure:**

1. **Surface** — a CDR-depth analysis (typically in Phase 8 or Phase 16) identifies a physics-violating claim that no existing HW-ID covers.
2. **Triage** — CCB checks if an existing HW-ID can be **extended** to cover the claim (preferred) rather than allocating a new ID.
3. **Allocate** — if a new ID is required, the next reserved number is taken (HW-11 first), and a full ledger entry is authored (ID, name, mechanism narration, order-of-magnitude, citing requirements, real-physics nearest analog).
4. **Propagate** — the new HW entry lands in:
   - `docs/10-handwavium-ledger.md` §10.2 register
   - `docs/appendix-F-vnv-plan.md` §F.4 bidirectional table
   - `proj-code/src/data/handwavium.ts` (data parity is exempt from the v1.0 console freeze)
   - `proj-code/CHANGELOG.md` data-parity entry

**Hard cap: HW-15.** If CDR analysis surfaces a 16th concession, the architecture is fundamentally insufficient and a v0.X-rc with redesign block is mandatory before continuing.

**Reverse direction (HW retirement):** if CDR analysis closes a PDR concession (new real-physics literature retires the gap), the HW-ID is deprecated but not removed — the entry gains a "deprecated 2026-MM-DD; see DR-NN" annotation. Deprecated HW-IDs are not reused.

## G.7 Version-tag schema (CDR)

See `to-dos/cdr-conventions.md` §C.8 for the full table. Briefly:

- **`-rc` tags** mark the close of a phase but precede the integration release. They do not get GitHub Release artifacts; they exist for review checkpoints.
- **non-`-rc` tags** (`v0.3`, `v0.4`, …, `v1.0`) get GitHub Release artifacts: the PDF, SHA-256, release notes mirroring the v0.2 structure (artifact metadata → spec contents → methodology → audit summary → reproducibility → version history → open follow-ups → acknowledgements).
- **CR-driven patches** (e.g., `v0.3.1`) get tags but no separate releases unless the patch warrants reviewer notification.

## G.8 Audit cadence

Phase-boundary audits use the **3-parallel-Explore-agent pattern** (validated in PDR Phase 4 and Phase 0–3 gap analysis). One agent per audit dimension:

| Phase boundary | Audit dimensions |
|---|---|
| Phase 6 close (v0.3-rc) | Convention compliance · template render |
| Phase 8a / 8b close (v0.4 / v0.5) | Numerical traceback · requirement coverage · figure embed integrity |
| Phase 9 close (v0.6-rc) | ICD bidirectional consistency · interface inventory completeness |
| Phase 10 close (v0.6) | Analysis output ↔ MPT margin reconciliation |
| Phase 12 close (v0.7) | RAM tree ↔ DR/RR coverage · CONOPS ↔ state machine coverage |
| Phase 15 close (v0.8) | DS-2 delta consistency (DS-1 + delta = DS-2 reconciled) |
| Phase 16 close (v0.9-rc) | FMEA completeness · §11 traceability |
| Phase 18 (v1.0-rc1) | Full Phase-4-pattern: 6 dimensions |
| Phase 19 close (v1.0) | Final build sanity (page count · figure count match LoF · equations · links) |

Audit findings are remediated in-place before tag.

## G.9 Repository and toolchain configuration

| Item | State |
|---|---|
| **Public mirror** | https://github.com/doublegate/DS-1_Plans (CC-BY-NC-4.0) |
| **Default branch** | `main` |
| **Tag style** | Annotated, `vN.M` format |
| **Build pipeline** | `./typeset/build.sh` (pandoc ≥ 3.0 + Typst ≥ 0.11 + JetBrains Mono + Chakra Petch); four patches per `CLAUDE.md` "Build-pipeline patches required for current toolchain" |
| **Figure render toolchain** | matplotlib in `docs/figures/_sources/.venv`; `mmdc` global (npm `@mermaid-js/mermaid-cli`); `dot` system (Graphviz) |
| **Console freeze** | `proj-code/` frozen at PDR data parity through v1.0; HW/DR/FMEA data parity maintained per CR; v2.0 thread for full CDR-mirror console |

## G.10 Open items and forward references

- **External senior-engineer reviewer signatures** carried forward from v0.2 Approval block. CDR Approval block (Phase 19 S19.1) extends to 5 signature slots (CCB Chair, Chief Engineer, Safety, Software Lead, Regulatory). Slots are filled when external review occurs.
- **HW-11..HW-15 allocation** — track via this appendix; first allocation will likely surface in Phase 8 (component-level analyses).
- **CR log** — first row populated by the first Major change after v0.3-rc.

## G.11 Revision history (this appendix)

| Rev | Date | Change |
|---|---|---|
| 0 | 2026-04-26 | Initial authorship (Phase 6 S6.2). |
