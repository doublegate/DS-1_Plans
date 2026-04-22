# Contributing

Thanks for looking at this project. A few things to know before you file an issue or (later) a PR.

## Project stage

This repository is being actively developed toward a formal technical-fiction publication. Phase 3 (figure generation) is in progress; Phase 4 (peer review) is next; Phase 5 (typeset PDF release) is scaffolded but pending figures. See `to-dos/PROJECT-STATUS.md` for live status and `to-dos/phase-plan.md` for the phase map.

## What kind of feedback is most useful right now

The most valuable contributions at this stage are **numerical corrections**, **citation fixes**, and **canon reconciliations**. The spec claims specific numbers (1.0 × 10¹⁸ kg mass, 2.24 × 10³² J per shot, etc.) and traces every physics-violating claim to a numbered **handwavium ID** (HW-1..HW-10). If you spot:

- A number that contradicts another section or the design basis
- A citation that doesn't support the claim it's attached to
- A canonical source the spec missed or misread
- A missing HW-ID trace on a claim that exceeds real-physics envelope

…please open an issue using the **Peer Review** template.

## What's out of scope right now

- **New feature requests** (additional subsystems, alternate timelines, non-DS-1 stations). The scope is locked per the current phase plan.
- **Refactors of the Markdown structure.** The `docs/` tree split is baselined at Phase 1.
- **Scope expansion in `proj-code/`.** Phase 3 figure generation is the priority; the console's remaining deferred items (full strict TypeScript, unit tests) will be picked up later.

## Issues

Use the templates:
- **Peer Review** — numerical, citation, canon, or handwavium-trace issues
- **Bug Report** — problems with the console (`proj-code/`) or Typst build (`typeset/`)
- **Question** — anything else

## Pull Requests

Hold off on PRs until Phase 4 peer review opens. File an issue first; I'll mark the issue with `pr-welcome` if a PR is appropriate.

When PRs do open:
- Reference the issue number in the PR description
- Keep PRs tightly scoped (one concern per PR)
- Update `to-dos/PROJECT-STATUS.md` if the change touches a milestone
- Don't modify `ref-docs/` directly — it's the source-of-authority baseline; changes go through `docs/` first
- Never edit anything in `code-artifacts/` — those are frozen reference implementations

## Commit message style

Conventional commits where practical:
- `feat:` new content or feature
- `fix:` numerical / citation / rendering fix
- `docs:` documentation-only change
- `refactor:` structural change with no content impact
- `chore:` tooling, CI, housekeeping

## License

This project is licensed under [CC-BY-NC-4.0](LICENSE). By contributing, you agree that your contribution is licensed under the same terms.

## Code of Conduct

Be thoughtful, be specific, and keep feedback focused on the work. This project deliberately does not ship a formal Code of Conduct file — see `NOTICE.md` for rationale. Behavioral issues can be raised privately via the contact channel listed in `NOTICE.md`.
