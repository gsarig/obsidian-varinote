# Contributing to Varinote

Thanks for your interest in contributing!

## Getting started

1. Fork and clone the repository into `<vault>/.obsidian/plugins/varinote/` of a test vault.
2. Install dependencies and start the watch build:

```bash
npm install
npm run dev
```

3. Enable the plugin in Obsidian (**Settings -> Community plugins**) and reload after changes.

## Before opening a pull request

All three must pass:

```bash
npm run lint   # ESLint (eslint-plugin-obsidianmd + typescript-eslint)
npm test       # Vitest unit suite
npm run build  # typecheck + production bundle
```

There is also an end-to-end suite (`npm run test:e2e`) that drives a real Obsidian instance; CI runs it on every push and pull request.

Please add or update tests alongside logic changes, keep user-facing strings in `src/labels.json`, and avoid Node/Electron APIs so the plugin keeps working on mobile. See `AGENTS.md` for the full project conventions; they apply to human contributors too.

## Reporting bugs and requesting features

Open a GitHub issue with reproduction steps (for bugs) or a short description of the use case (for features).

## Releasing (maintainer only)

Bump `version` in `manifest.json` and `package.json` (SemVer, no leading `v`), update `versions.json`, and push a matching tag. The release workflow builds the plugin, attests the release assets, and creates a draft GitHub release.
