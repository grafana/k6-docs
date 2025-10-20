# Repository Guidelines

## Project Structure & Module Organization
- Markdown sources live in `docs/sources/k6/<version>`; update both `next` and the current `vX.Y.x` folder when fixing published content.
- `docs/sources/k6/*/shared` holds reusable fragments invoked through the `shared` shortcode; keep shared snippets backward-compatible.
- `docs/Makefile` and the checked-in `make-docs` script wrap the containerised Hugo toolchain used to serve the site locally.
- Utility scripts in `scripts/` (for example, `apply-patch`) help port commits between versions—run them from the repository root.

## Build, Test, and Development Commands
- `npm start` builds the docs in Docker/Podman and serves them at `http://localhost:3002/docs/k6/`.
- `cd docs && make docs PULL=false` skips image pulls when you already have `grafana/docs-base:latest` locally.
- `cd docs && make vale` runs Vale linting inside the writers-toolkit container.
- `cd docs && make update` refreshes `docs.mk` and `make-docs` from the upstream Writers’ Toolkit.

## Coding Style & Naming Conventions
- Prettier enforces single quotes, trailing commas, and a 100-character Markdown width; run `npx prettier --write docs/sources/k6/path/to/file.md` before committing.
- Name Markdown files with lowercase hyphenated slugs (for example, `docs/sources/k6/next/testing/load-testing.md`) to match URL patterns.
- Embedded code blocks are linted via ESLint/MDX; prefer declarations over assignments, keep snippets runnable, and include needed imports/constants.
- Follow the Grafana Writers’ Toolkit for tone, front matter expectations, and shortcode usage to stay aligned with brand guidance.

## Testing Guidelines
- Preview every change with `npm start` and verify both the `next` and targeted version folders render as expected.
- Run `make vale` for terminology, style, and broken-link checks; treat warnings as actionable feedback.
- Use `scripts/apply-patch HEAD~ docs/sources/k6/next docs/sources/k6/v1.0.x` (adjust arguments) to sync updates across supported versions.

## Commit & Pull Request Guidelines
- Commits follow `type(scope): short description (#issue)`; scopes mirror directories (for example, `docs(browser)` or `fix(k6-operator)`).
- Group related edits per commit and describe user-visible changes in the body when necessary.
- Pull requests should list affected pages, note any version backports, attach screenshots for UI-oriented edits, and link related issues or discussions.
- Request reviewers from CODEOWNERS and wait for the deploy preview check before merging.
