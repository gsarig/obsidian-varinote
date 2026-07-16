# Copilot instructions

## Project overview

Varinote is an Obsidian community plugin (TypeScript, bundled with esbuild) that prompts for template-variable values in a modal when a note is created, then substitutes them into the note. `AGENTS.md` is the authoritative contributor guide; review comments must be consistent with it.

## What to focus on

Review for **correctness, security, and reliability**, in that order.

- Correctness: property parsing (`src/utils/parser.ts`), the evaluation chain (`evaluateExpression`/`evaluateToggle`/`evaluateCalculation`), placeholder substitution
- Security: this plugin makes no network calls by design; flag any that appear. Vault content must never leave the vault.
- Reliability: the `vault.on('create')` flow, modal lifecycle, content mutation through `vault.process`

## What to skip

- **Style**: indentation, quote style, naming conventions. Do not comment on them.
- **Configurability**: do not suggest making intentional hardcoded values configurable unless there is a concrete correctness or security reason.
- **Speculative edge cases**: only flag an edge case that is realistically reachable given the surrounding code.
- **Hedged suggestions** ("consider", "could", "might"): only raise them when they address a real defect.

## Known issues already tracked (do not re-flag)

- **`evaluateCalculation` uses `new Function` on user-influenced strings.** Known, documented, and tracked with a planned follow-up (safe arithmetic parser vs. accept-and-document decision).
- **Several utils call `this.app` in unbound free functions**, resolving through the deprecated global `app`. Known and tracked; the fix (threading the `App` instance) is a planned follow-up.

## Known-intentional decisions (do not flag)

- **Node 24 in CI** is the active Node.js LTS line (since October 2025).
- **`obsidian` npm typings version does not match `manifest.json`'s `minAppVersion`**: the typings package publishes on its own cadence (npm has no 1.7.7).
- **Top-level `cacheDir` in `wdio.conf.mts`** is the documented wdio-obsidian-service mechanism.
- **This repo has no beta/prerelease channel** (no `manifest-beta.json`); that is a deliberate difference from the author's Sentinel plugin.
- **UI strings live in `src/labels.json`** and tests read labels from there; do not suggest inlining strings.
- **E2E tests assert observed behavior.** Do not suggest loosening or altering a test to accommodate a code change; behavior changes are product decisions that must be flagged as such.

## Public API (breaking-change alert)

Flag any change to these explicitly:

- `manifest.json` `id` and the `trigger-modal` command ID
- The ```` ```varinote ```` block syntax (`name|type::Label|Default`) and the `{{$variable}}` / `{{$variable::a,b}}` placeholder syntax: they live inside users' templates, so changes silently break existing vaults
