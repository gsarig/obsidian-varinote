# Varinote: agent guide

Instructions for any AI agent working on this repository. Varinote is an Obsidian community plugin that prompts for template-variable values in a modal when a note is created, then substitutes them into the note's content.

## Project overview

- **Language:** TypeScript, bundled to `main.js` with esbuild.
- **Entry point:** `src/main.ts` (the `Varinote` plugin class). Compiled to `main.js` at the plugin root and loaded by Obsidian.
- **Release artifacts:** `main.js`, `manifest.json`, `styles.css`. Never commit `main.js` (it is gitignored and attached to GitHub releases instead).
- **Mobile:** `isDesktopOnly` is `false`. Avoid Node and Electron APIs so the plugin keeps working on mobile.

## Architecture

The runtime flow, following the code:

1. `src/main.ts` -> `onload()` registers the `trigger-modal` command and, once the workspace layout is ready, a `vault.on('create')` listener (via `registerEvent`, no leak).
2. New-file creation and the command both funnel into the same pair of steps: `src/utils/processActiveFile.ts` (create-event path) or `src/commands/triggerModal.ts` (command path, works on the active file) find a ```` ```varinote ```` block in the note via regex, skip it if the file lives in the configured Templates folder (`processActiveFile` only; the command has no such check), then call `parser.ts`'s `parseVarinoteProperties` to extract `name|type::Label|Default` properties.
3. `src/utils/triggerModal.ts` opens `VNModal` (`src/components/VNModal.tsx`) seeded with the parsed properties. `createSettingsFromProperties` (`src/utils/createSettingsFromProperties.ts`) dispatches each property to a field renderer under `src/fields/` (text, dropdown, toggle, slider) based on `property.type`, using plain Obsidian `Setting` API, not React JSX (see note below).
4. On modal close, `triggerModal`'s callback strips the varinote block from the note and calls `stringUtils.ts`'s `replacePlaceholders`, which runs every `{{$var}}` placeholder through `evaluateExpression.ts`. That function tries `evaluateToggle.ts` first (`{{$var::a,b}}` syntax), then falls back to variable substitution plus `evaluateCalculation.ts` for arithmetic (`{{$var * 2}}`).

**Key modules:**

| Area | Files |
|---|---|
| Property parsing | `src/utils/parser.ts` (`name\|type::Label\|Default` syntax) |
| Template-folder detection | `src/utils/templateUtils.ts` (`getTemplateFolderPath`, reads the core Templates plugin's configured folder) |
| Modal + field rendering | `src/components/VNModal.tsx`, `src/utils/createSettingsFromProperties.ts`, `src/fields/*.ts` |
| Placeholder substitution chain | `src/utils/stringUtils.ts` -> `evaluateExpression.ts` -> `evaluateToggle.ts` / `evaluateCalculation.ts` |
| Content mutation | `src/utils/triggerModal.ts` (strips the varinote block, applies substitutions, writes via `vault.process`) |
| User-facing strings | `src/labels.json` (read via `src/utils/getLabel.ts`; never hardcode strings) |

**Note on React:** `package.json` depends on `react`/`react-dom` and `tsconfig.json` sets `"jsx": "react-jsx"`, but no file in `src/` imports React or uses JSX; the modal and fields are built entirely with Obsidian's `Modal`/`Setting` API. Treat this as an unused dependency, not an architectural pattern to follow.

## Environment and tooling

- **Node:** current LTS (18+).
- **Package manager:** npm.
- **Bundler:** esbuild (`esbuild.config.mjs`).

```bash
npm install       # install deps
npm run dev       # watch build into the plugin folder
npm run build     # tsc typecheck + production bundle
npm test          # run the Vitest unit suite
```

## Testing

Two layers. Run both before pushing.

1. **Unit tests (`npm test`, Vitest).** Cover the pure logic where regressions actually happen: property parsing, toggle/calculation/expression evaluation, placeholder replacement. These modules import no `obsidian`, so they run without a mock.
2. **In-app verification / E2E (wdio).** Drive a real Obsidian instance against a fixture vault: create a note from a template, confirm the modal appears, fill fields, confirm substitution and block-stripping in the resulting note.

## Manifest rules (`manifest.json`)

- Never change `id` after release. Treat it as a stable API.
- Keep `minAppVersion` accurate when using newer Obsidian APIs.
- Bump `version` (SemVer, no leading `v`) and update `versions.json` (plugin version -> minimum app version) together.

## Releasing

Tagging a commit triggers `.github/workflows/release.yml`, which builds and creates a single draft release (`main.js`, `manifest.json`, `styles.css`). Tags carry no leading `v`. Unlike Sentinel, there is currently no beta/prerelease branch and no `manifest-beta.json` in this repo; a `beta` tag would still produce an ordinary draft release with the standard `manifest.json`.

## Obsidian policies (must follow)

- **Local first, no telemetry.** Default to offline. Do not add network calls without an obvious user-facing reason, clear documentation, and opt-in. Never transmit vault contents.
- **Clean up listeners.** Register and remove every workspace, DOM, and interval listener so the plugin unloads without leaks. Prefer the `register*` helpers (`registerEvent`, `registerDomEvent`, `registerInterval`).
- **Scope.** Read and write only what the feature needs inside the vault.

## UI copy

- Sentence case for headings, buttons, settings.
- Bold for literal UI labels; arrow notation for navigation (**Settings -> Community plugins**).
- Keep strings in `src/labels.json`, not inline.

## Coding conventions

- TypeScript strict where practical; keep `main.ts` limited to lifecycle.
- Split files by responsibility; keep modules small.
- Prefer `async/await`; handle errors and surface them via `Notice` with a `labels.json` string.
- Bundle everything into `main.js`; no unbundled runtime dependencies.

## Do / don't

**Do:** add tests alongside logic changes; use stable command and action IDs; validate settings input; keep listeners cleaned up.

**Don't:** commit `main.js`; add network calls without disclosure; change `manifest.json` `id`; run auto-fixers on lint findings (report them instead).

## References

- Sample plugin: https://github.com/obsidianmd/obsidian-sample-plugin
- API docs: https://docs.obsidian.md
- Developer policies: https://docs.obsidian.md/Developer+policies
