# Phase 4 — Peer Review

**Goal:** A senior-engineer read of the complete document tree, with every numerical claim, citation, and handwavium concession traced to a source or an HW-ID. No unresolved inconsistencies.
**Status:** Not started.

---

## Sprint S4.0 — Geometry freeze

The 120-vs-160 km choice is flagged throughout as a PDR-level decision. Resolve it before any other Phase-4 sprint — otherwise the cross-check sprints below may need to run twice.

- [ ] Review the 120-vs-160 km arguments in ref-doc and `01-design-basis.md` §3
- [ ] Decision options:
  - (a) Retain 120 km for DS-1 (ANH Legends / ref-doc baseline)
  - (b) Adopt 160 km for both DS-1 and DS-2 (current Wookieepedia consistency; cleaner DS-2 comparison)
  - (c) Keep 120 km DS-1 / 160 km DS-2 split (current state; highlights delta)
- [ ] Commit decision to `PROJECT-STATUS.md` decision log
- [ ] If (b), rescale every MPT row in `appendix-A` by 2.37× volume / 1.78× surface
- [ ] If scaling, update `01-design-basis.md` §3 §4 and every reference to M, V, A_s in subsystem docs

**Recommendation:** (c) is the current state and has the pedagogical advantage of showing evolution between DS-1 and DS-2. Default unless strong argument for (a) or (b).

## Sprint S4.1 — Numerical cross-check

Systematic pass verifying every load-bearing number appears identically wherever cited.

- [ ] Tabulate each number in `01-design-basis.md` §§3–10
- [ ] `grep` each number across `docs/*.md`; flag any variant spellings (e.g., "1.0e18" vs "10^18" vs "1.0 × 10¹⁸")
- [ ] Adopt a canonical format for scientific notation and apply consistently
- [ ] Check unit dimensioning: every energy in J, every power in W, every mass in kg (exception: tonnes for heavy-industry throughput per ref-doc usage)
- [ ] Verify `appendix-A` §A.2 mass rows sum to 1.0 × 10¹⁸ kg with margin ≥ 0
- [ ] Verify `appendix-A` §A.3 sustained power rows are bounded by 2.6 × 10²⁷ W
- [ ] Verify `appendix-A` §A.4 thermal rows each cite a disposal mechanism
- [ ] Verify `appendix-A` §A.5 volume rows sum to ≤ V

## Sprint S4.2 — Citation audit

Every external claim traceable to a source in `appendix-C`.

- [ ] Enumerate every "per [author/work]" in-text citation in `docs/*.md`
- [ ] Confirm each source appears in `appendix-C`
- [ ] Reverse-check: no source in `appendix-C` is unreferenced from the main text
- [ ] Where a source is cited with a specific value (e.g. "Lentz 2021, ~0.1 M☉"), confirm the value in the source or mark as paraphrase
- [ ] Spot-check a handful of online references for current accessibility (defer DOI-add to Phase 5)

## Sprint S4.3 — Handwavium traceability

The single-most-important integrity check: every physics concession in the spec is accounted in the HW register.

- [ ] For each subsystem doc, scan for claims that exceed real-physics envelope
- [ ] Confirm each such claim cites an HW-ID
- [ ] Confirm each HW-ID has at least one DR (derived requirement) in `01-design-basis.md` §12
- [ ] Confirm `appendix-F-vnv-plan.md` §F.4 bidirectional table is complete
- [ ] If a new concession is discovered: add HW-11 (or whichever) to `10-handwavium-ledger.md`, add DR-xx to `01-design-basis.md`, add row to `appendix-F` §F.3

Dependency: Phase 2 S2.4 (HW-4/6/8/9 explicit DRs) should be completed before S4.3.

## Sprint S4.4 — Consistency of derived-requirement → V&V class

- [ ] Every DR-xx in `01-design-basis.md` §12 has class in `appendix-F` §F.3
- [ ] Every evidence claim in `appendix-F` §F.5 points to a real section in a subsystem doc
- [ ] Every Concession-class DR in `appendix-F` cites a specific HW-ID
- [ ] `appendix-E-fmea.md` action column references the fix-list row in `09-vulnerability-analysis.md` §9.3

## Sprint S4.5 — Reader pass

One slow-read of the full document tree by a reviewer who did not author it (senior-engineer persona, defensive-engineering / aerospace background preferred). Review checklist:

- [ ] Does the exec summary accurately frame the body?
- [ ] Does a subsystem doc ever contradict `01-design-basis.md`?
- [ ] Are numerical claims adequately sourced?
- [ ] Are equations dimensionally consistent?
- [ ] Is the handwavium discipline honestly maintained, or does it creep into narrative?
- [ ] Are the figures (Phase 3) referenced in the right sections?
- [ ] Does the reviewer finish with a clear picture of "what is engineerable" vs "what is not"?

Reviewer notes → issue list → triage to backlog.

## Exit criteria

- [ ] Geometry freeze committed
- [ ] Every number in subsystem docs matches `01-design-basis.md` / `appendix-A`
- [ ] Every external claim is sourced in `appendix-C`
- [ ] Every HW-ID has a citing DR; every physics-violating claim cites an HW-ID
- [ ] No unresolved numerical inconsistencies in the issue list
- [ ] Reviewer sign-off recorded in `PROJECT-STATUS.md`
