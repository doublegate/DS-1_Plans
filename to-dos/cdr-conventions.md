# CDR Conventions

**Source:** Phase 6 S6.1 (CDR foundation, 2026-04-26).
**Scope:** Conventions that govern all CDR-depth content authored in Phases 6–19. Extends the PDR conventions in `CLAUDE.md` and `to-dos/PROJECT-STATUS.md`. PDR rules remain in force unless explicitly superseded here.

---

## C.1 Document subtree

CDR-depth content lives in a parallel subtree to keep the PDR navigable as an executive-summary layer:

| Tree | Purpose |
|---|---|
| `docs/00-*.md` … `docs/12-*.md` | PDR sections; trim to ~5-page summary + forward-pointers when corresponding `docs/cdr/` content lands (S6.5 / Phase 8 closure). |
| `docs/cdr/NN-detailed-{slug}.md` | CDR-depth subsystem expansions, mirroring section IDs. Split into `NN.M-*.md` part-files when a section passes ~30 pages. |
| `docs/cdr/11-detailed-minimum-handwave.md` (+ 10 part-files) | Per-HW-ID quantified-removal analyses (Phase 16). |
| `docs/cdr/12-ds2/12.N-{topic}.md` | Selective DS-2 CDR-depth deltas (Phase 15). |
| `docs/cdr/analysis/{class}.md` | Narrated FEA-class analyses (Phase 10): structural · thermal · electrical · optical-plasma · control. |
| `docs/icd/ICD-NN-MM.md` | Interface Control Documents (Phase 9). |
| `docs/appendix-{G..Q}.md` | New CDR appendices. |

The Typst build (`typeset/main.typ`) includes the trees in this order: front matter → PDR summaries (`docs/00..12`) → CDR detail (`docs/cdr/`) → ICDs (`docs/icd/`) → Appendices (`docs/appendix-*.md`).

---

## C.2 Requirement-numbering extensions

| Namespace | Range | Purpose |
|---|---|---|
| `SR-NN` | SR-01..SR-08 (frozen) | Stakeholder requirements (PDR baseline) |
| `DR-NN` | DR-01..DR-16 (PDR); DR-17.. open | Derived requirements (continuation in CDR) |
| `DR2-NN` | DR2-01.. open | DS-2-specific derived requirements (avoids collision with DR-NN) |
| `RR-NN` | RR-01.. open | Reliability requirements (Phase 12) |
| `MR-NN` | MR-01.. open | Manufacturing requirements (Phase 12) |
| `OR-NN` | OR-01.. open | Operational requirements (Phase 12) |
| `HW-N` | HW-1..HW-10 (PDR); HW-11..HW-15 reserved | Handwavium concessions; ledger growth gated by CCB (see `appendix-G`) |

Every new DR / RR / MR / OR carries a verification class `A / I / T / C` (Analysis / Inspection / Test-eligible / Concession), same scheme as PDR. Any class-`C` DR cites at least one HW-ID. Every HW-ID has at least one citing requirement.

---

## C.3 ICD policy

One ICD per **real subsystem-pair boundary** that exchanges power, data, mechanical load, thermal, fluid, EMI/EMC, or radiation. A boundary that exists only as a logical reference (e.g., subsystem A "knows about" subsystem B but has no exchange) does not get an ICD.

ICD numbering: `ICD-NN-MM.md` where NN < MM (always lower subsystem ID first) so each pair has exactly one canonical ICD.

**Bidirectional consistency** is the central discipline: every signal/flow appears in **both** subsystem doc bodies (with the ICD reference) **and** in the ICD itself. Mismatches are CDR audit findings (Phase 18 S18.2). Each ICD carries a "verification matrix" cross-referenced from `appendix-F`.

External boundaries (DS-1 ↔ Imperial Fleet docking; DS-1 ↔ Sienar Fleet Systems contractors) use `ICD-EXT-{name}.md`.

---

## C.4 FEA-narration style

Real CDR includes finite-element-class analyses. This spec does **not** actually run FEA — the analyses are **narrated** with cited published validation cases. Conventions:

1. **State the model** — type (lumped-node / 1D-Euler / 2D-shell / 3D-FEM analog), boundary conditions, load cases, mesh-density assumption. Don't pretend to have run a sim that wasn't run.
2. **Cite the validation case** — every analytical result references a published real-engineering validation case at adjacent scale (e.g., for hull stress: ISS pressurization analysis; for radiator FEA: NIF target-bay thermal analysis).
3. **Quantify margins** — every analysis closes with a margin table (worst-case load / allowable / margin %). Margins below 25% are flagged in the FMEA as low-margin items.
4. **Reproducibility** — analyses that produce plots have their source `.py` archived in `docs/figures/_sources/` (matplotlib generators) just like PDR Phase 3 figures.

Forbidden: "FEA shows…" without a model description; "we simulated…" — never used for analyses we didn't run.

---

## C.5 Drawing & schematic conventions

Detailed in `docs/appendix-H-drafting-standards.md` (Phase 7 S7.1+S7.2). Brief:

- **Cutaway / isometric drawings** continue the PDR Nano Banana 2 palette (`docs/appendix-D2-figure-prompts.md` §D2.3 global style).
- **Title block** in upper-right of each plate: figure ID, revision triangle, sheet-of, scale, draftsman, CCB approval slot.
- **GD&T crib** in `appendix-H`: the spec narrates GD&T conventions but does not actually call out tolerances at fab-ready precision (we are at concept-CDR fidelity, not production drawings).
- **Schematic notation:** electrical follows IEC 60617; plumbing/fluid follows ISO 14617; thermal block-diagrams follow the `appendix-D2` D2.7 palette.
- **Revision triangle** numbering matches `appendix-G` change-request log.

---

## C.6 Tone rubric (regulatory humor calibration)

Phase 14 (regulatory / compliance) is the spec's largest tonal risk — it is easy to drift from PDR-register technical fiction into outright parody. Calibration rules:

| Tone | Allowed | Forbidden |
|---|---|---|
| **Imperial doctrinal** | "The Outer Space Treaty's prohibition on weapons of mass destruction in orbit (Article IV) is treated as not applicable to the Galactic Empire as a non-signatory power; nonetheless, a noncompliance disclosure is filed for completeness." | "lol of course we don't sign treaties, we are the EMPIRE" |
| **Deadpan technical** | "The planet-kill event causes an environmental impact that exceeds the NEPA categorical-exclusion threshold by 32 orders of magnitude." | "the environmental impact is, like, the whole planet, dude" |
| **Real-engineering register** | "ITAR Category XV applies to space-launched weapons; the Imperial-side analog is the Bureau of Ships and Services export-control regime." | gratuitous Star Wars references that don't serve the engineering point |

Rule: every paragraph must read as if it could appear in a real DoD or NASA program-protection document, with the only departure being the fictional context. If a sentence makes the reader smile, that's fine; if it makes them disengage from the technical register, it's wrong.

Tone audit happens in Phase 18 S18.5.

---

## C.7 CCB workflow (configuration control)

**Configuration Control Board (CCB)** approves baseline changes. Roles:

| Role | Responsibility |
|---|---|
| **CCB Chair** | Decision authority; tie-breaker |
| **Chief Engineer** | Technical correctness; numerical baseline integrity |
| **Safety Lead** | FMEA / reliability tree impact |
| **Software Lead** | Software architecture impact (Phase 11 onward) |
| **Regulatory Lead** | Compliance impact (Phase 14 onward) |

For a single-author project, all 5 roles are held by the same person (the user). The CCB process is documented for reproducibility — a real review by an external panel would use the same workflow.

**Change-request lifecycle** (per `appendix-G`):

1. **Issue** — a `CR-NNNN` ticket on GitHub Issues with the proposed change, justification, scope.
2. **Triage** — CCB assigns severity (Major / Minor) and impact analysis owner.
3. **Impact analysis** — author quantifies impact on numerical baseline, traceability matrix, FMEA, ICDs, build pipeline.
4. **Disposition** — Approve / Reject / Defer; if Approve, generates an `appendix-G` revision-history row and a commit with the change.
5. **Verification** — next phase audit confirms the change landed cleanly.

Major changes (numerical baseline, geometry, top-level architecture) bump the version `0.X` digit. Minor changes bump the `0.X.Y` patch (not currently used; reserved for v1.0+).

---

## C.8 Version-tag schema

| Tag | Phase block | Meaning |
|---|---|---|
| `v0.2` | Phases 0–5 | PDR release (released 2026-04-26) |
| `v0.3-rc` | Phase 6 close | CDR foundation in place |
| `v0.3` | Phase 7 close | Drafting standards + S3.5 illustrative carry-forward closed |
| `v0.4` | Phase 8a (S8.1–S8.4) | First half of detailed subsystem design (§2–§5) |
| `v0.5` | Phase 8b (S8.5–S8.8) | Second half of detailed subsystem design (§6–§9) |
| `v0.6-rc` | Phase 9 close | ICD set complete |
| `v0.6` | Phase 10 close | Narrated analyses complete |
| `v0.7-rc` | Phase 11 close | Software architecture complete |
| `v0.7` | Phase 12 close | RAM + manufacturing + CONOPS complete |
| `v0.8-rc1` | Phase 13 close | Cost / schedule / programmatic risk complete |
| `v0.8-rc2` | Phase 14 close | Regulatory / compliance complete |
| `v0.8` | Phase 15 close | DS-2 CDR-depth deltas complete |
| `v0.9-rc` | Phase 16 close | Full FMEA + §11 expansion complete |
| `v0.9` | Phase 17 close | All figures FINAL |
| `v1.0-rc1` | Phase 18 close | All audits clean |
| `v1.0` | Phase 19 close | **CDR publication; final release** |

Each tag is annotated; `gh release create` with the appropriate PDF artifact at the v0.3, v0.4, v0.5, v0.6, v0.7, v0.8, v0.9, v1.0 milestones (not at the rc tags). Reproducibility: every PDF SHA-256 captured in CHANGELOG; build instructions tied to the toolchain in CLAUDE.md.

---

## C.9 Handwavium ledger growth rules

The PDR has HW-1..HW-10 (frozen). CDR may need HW-11..HW-15 to capture concessions surfaced during component-level design. **Reserve numbers; do not allocate freely.**

Ledger-growth gating (CCB-controlled):

1. **A new HW-ID is allowed** only when a concrete, defensible analysis surfaces a physics-violating claim that no existing HW-ID covers.
2. **Each new HW-ID** must include the same fields as PDR entries: ID, name, mechanism narration, magnitude, citing requirements, real-physics nearest analog.
3. **HW table updates** propagate to: `docs/10-handwavium-ledger.md`, `docs/appendix-F-vnv-plan.md` §F.4 (bidirectional table), `proj-code/src/data/handwavium.ts` (data parity), and the `proj-code/CHANGELOG.md` note. The `proj-code/` console is frozen at PDR data parity through v1.0 — HW table updates to data files are exempt from the freeze (data parity must be maintained).
4. **Reverse direction:** if CDR-depth analysis *retires* a PDR concession (e.g., new real-physics literature closes the gap), the HW-ID is **deprecated** but not removed; the ledger entry gains a "deprecated, see DR-N" annotation.

Hard cap: HW-15. If we run out of slots before v1.0, the architecture is flawed and a v0.X-rc should be tagged with a redesign block.

---

## C.10 Build pipeline notes for CDR

The PDR pipeline (pandoc 3.9 / typst 0.14 + four patches in `typeset/build.sh`) carries forward unchanged for CDR. Additional considerations:

- **Page count discipline.** PDR was 74 pages. CDR target is 300–500. Typst level-1 pagebreak strategy is already removed; new part headings (`=` at part level in main.typ) get explicit `#pagebreak()` calls.
- **2-column body** for tabular-heavy sections (FMEA, ICDs, R/A/M tables). Implement as a Typst environment block in template.typ; subsystem-design prose stays single-column.
- **Build time.** 150+ figures may push pandoc + typst compile to multi-minute. Use `typst watch` with section subset for authoring; full build only at tag.
- **`typst compile --root`** stays as-is.
- **Figure path rewriting** in build.sh stays as-is; figures in `docs/figures/` continue at PDR path convention.

---

## C.11 PDR convention preservation

Unless explicitly modified above, the following PDR conventions are **preserved unchanged**:

- Load-bearing constants (DS-1 = 120 km / 1.0 × 10¹⁸ kg; DS-2 = 160 km / 2.37 × 10¹⁸ kg; Alderaan = 2.24 × 10³² J; sustained reactor = 2.6 × 10²⁷ W; hypermatter = c² = 9 × 10¹⁶ J/kg; crew = 1.7 × 10⁶ DS-1 / 637,835 DS-2; surface area = 4.52 × 10¹⁰ m²; volume = 9.05 × 10¹⁴ m³)
- Traceability matrix discipline (HW-ID + DR + verification class)
- Source-citation grouping (Canon/Legends · Physicist · Economic · Real-physics programs · Materials/asteroids)
- Figure-embedding convention (inline `![F-{id} — title. desc.](../figures/F-{id}.png)`; dual-home rule)
- Conventional commits + comprehensive technical commit messages
- Public CC-BY-NC-4.0 mirror; trademark acknowledgements
- Phase-boundary parallel-Explore-agent audits
- Periodic incremental release cadence
