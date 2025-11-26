# k6-docs Repository Guide

## About

Official documentation for **Grafana k6** load testing tool. Built with Hugo, deployed to <https://grafana.com/docs/k6/>.

## Repository structure

**Key directories:**

- **`docs/sources/k6/`** - All documentation content
  - `next/` - Next major release docs
  - `v{VERSION}/` - Version-specific docs (for example, `v1.4.x`)
  - `{VERSION}/shared/` - Reusable content for `{{< docs/shared >}}` shortcode
- **`scripts/`** - Maintenance scripts
  - `apply-patch` - Port changes between versions
  - `md-k6.py` - Validate and run code snippets
- **`vale/styles/`** - Documentation linting rules

## Version management

- **`next/`** - Upcoming major release features
- **`v{MAJOR}.{MINOR}.x/`** - Released versions (highest number = "latest" on site)

**Where to make changes:**

- **Current release**: Update both `next/` and `v{LATEST_VERSION}/`, then use `scripts/apply-patch HEAD~ docs/sources/k6/next docs/sources/k6/v1.4.x`
- **Next release only**: Update `next/` only
- **Bug fixes**: Use `apply-patch` to port to latest and two previous versions

## Code validation

**ESLint:** All JavaScript snippets are validated. Use `<!-- eslint-skip -->` for intentionally incomplete code.

**md-k6.py:** Snippets are executed in CI for changed files in `docs/sources/k6/next/`. Control with HTML comments:

- `<!-- md-k6:skip -->` - Skip snippet
- `<!-- md-k6:skipall -->` - Skip entire file
- `<!-- md-k6:nofail -->` - Allow errors
- `<!-- md-k6:env.VAR=value -->` - Set environment variables
- `<!-- md-k6:arg.--flag=value -->` - Add CLI arguments
- `<!-- md-k6:nothresholds -->` - Disable thresholds
- `<!-- md-k6:fixedscenarios -->` - Don't override scenarios

**Run locally:** `python3 scripts/md-k6.py [-d 5s] <path>`

## Hugo shortcodes

Always preserve shortcodes when editing:

- **Admonitions:** `{{< admonition type="note|caution|warning" >}}...{{< /admonition >}}` (use sparingly)
- **Shared content:** `{{< docs/shared lookup="path/to/file.md" source="k6" version="next" >}}`
- **Others:** Refer to [Writers' Toolkit](https://grafana.com/docs/writers-toolkit/write/shortcodes/) for tabs, collapsible sections, etc.

## k6 terminology

**Product names:** Grafana k6 (first mention) → k6; k6 OSS; Grafana Cloud k6 (always full); k6 Studio

**Core concepts:** VUs (virtual users), Iterations, Scenarios, Thresholds, Checks, Metrics (`http_req_duration`, Counter, Gauge, Rate, Trend), Executors (`shared-iterations`, `constant-vus`, `ramping-vus`), Options, Init context, Default function

**API pattern:**

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = { vus: 10, duration: '30s' };
const baseUrl = __ENV.BASE_URL || 'https://test.k6.io';

export default function () {
  const res = http.get(`${baseUrl}/`);
  check(res, { 'is status 200': (r) => r.status === 200 });
  sleep(1);
}
```

## Local development

**Prerequisites:** Docker/Podman, Node.js ≥16, `npm` ≥7

**Build:** `npm start` → <http://localhost:3002/docs/k6/> (auto-rebuilds on changes)

**Lint:** `npm install` then `npx eslint "**/*.md"` (or auto-runs on commit via husky)

## Deployment & releases

**Auto-deploy:** PRs merged to `main` with `docs/sources/` changes sync via `publish-technical-documentation.yml` → <https://grafana.com/docs/k6/>

**New release:** Duplicate `next/` → rename to `v{MAJOR}.{MINOR}.x/`, verify locally, commit. Highest version becomes "latest".

## AI agent checklist

**All edits:** Check version (next/ vs. current), preserve front matter + shortcodes, use active voice/present tense/second person, validate code

**Code examples:** Full working scripts, add `<!-- md-k6:skip -->` if incomplete, include imports, explain behavior, use proper syntax

**APIs:** Show imports, provide examples, document parameters/returns, link related content

**Structural changes:** Update both versions, fix navigation + links, use `apply-patch`, test build

## Best practices

**Writing:** Assume developer knowledge, focus on practical solutions, explain when/why, include working examples, link related docs

**Code quality:** Complete runnable examples, realistic scenarios, idiomatic k6 patterns, explain non-obvious logic, keep concise

**Maintenance:** Sync versions with `apply-patch`, update all references, verify links, monitor CI, review carefully

## Resources

- [k6 documentation](https://grafana.com/docs/k6/)
- [k6 GitHub repository](https://github.com/grafana/k6)
- [Grafana Writers' Toolkit](https://grafana.com/docs/writers-toolkit/)
- [Contributing guide](./CONTRIBUTING/README.md)
- [Code of conduct](./CODE_OF_CONDUCT.md)

---

<!-- docs-ai-begin -->
<!-- version: 1.2.0 -->

## Style guide (AI toolkit)

**Role:** Technical writer for Grafana Labs. Audience: developers who understand programming.

**Base:** Follow [Google Developer Documentation Style Guide](https://developers.google.com/style) - active voice, second person, present tense, conversational tone, sentence case.

**Product naming:** Full name first (Grafana Alloy), then short (Alloy). Always "Grafana Cloud" (full). No abbreviations: "OpenTelemetry" not "OTel", "Kubernetes" not "K8s".

**Structure:** Front matter YAML `title` = h1 heading. Add intro after headings. Start with goal + prerequisites. End with next steps/related resources.

**Writing:** Simple words (use/help/show not utilize/assist/demonstrate). Verbs + nouns. Complete sentences in lists. allowlist/blocklist, primary/secondary. "refer to" not "see".

**Formatting:** Inline links `[text](url)`. Bold `**text**`. Italics `_text_`. Backticks for: user input, files, code identifiers, configuration options, status codes. Placeholders: _`<UPPERCASE_WITH_UNDERSCORES>`_ in prose, `<UPPERCASE>` in code blocks.

**Code blocks:** Introduce with colon, use language identifier (`javascript`, `sh`), explain placeholders after. For CLI: `sh` for commands, `text`/`json`/`yaml` for output.

**APIs:** Specify HTTP method (`GET`), full path in backticks, placeholders like `{userId}`.

<!-- docs-ai-end -->