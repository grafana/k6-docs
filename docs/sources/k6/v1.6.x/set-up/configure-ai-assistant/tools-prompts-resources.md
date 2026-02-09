---
title: Tools, prompts, and resources
description: Learn what MCP tools, prompts, and resources mcp-k6 provides, and how to use them.
weight: 200
---

# Tools, prompts, and resources

`mcp-k6` exposes three kinds of MCP primitives:

- **Tools**: Allow your AI assistant to perform actions, such as validating or running a script.
- **Prompts**: Guided workflows that help you generate scripts or convert existing tests.
- **Resources**: Reference data, which includes docs and type definitions, that your assistant can consult for accurate answers.

## Tools

Tools are the core capability of `mcp-k6`. Your AI assistant calls them automatically when it needs to validate code, run a test, or look up documentation.

### info

Returns runtime information about the server and local environment:

- `mcp-k6` version
- Detected `k6` version
- Login status for Grafana Cloud k6 (via the k6 CLI)

### validate_script

Validates a k6 script by running it with minimal load:

- 1 VU
- 1 iteration
- 30s timeout

This validation catches syntax errors, missing imports, missing export default function declarations, and common runtime issues early, before you scale up.

### run_script

Runs a k6 script locally with configurable parameters:

- `vus` (default: 1, max: 50)
- `duration` (default: `30s`, max: `5m`)
- `iterations` (overrides `duration` if provided)

Returns stdout/stderr, exit code, and (when available) parsed metrics.

### list_sections

Lists k6 documentation sections as a depth-limited tree, so your assistant can explore docs without pulling large amounts of content into context.

Parameters include:

- `version` (optional): The k6 version to query. Use `all` to list all available versions.
- `category` (optional): The documentation category, such as `using-k6` or `javascript-api`.
- `root_slug` (optional):  The specific branch to explore.
- `depth` (default: 1, max: 5): The number of levels to include in the tree.

### get_documentation

Fetches the full Markdown for a specific documentation section.

Use the `slug` returned from `list_sections`.

### search_terraform

Searches for Grafana Cloud k6-related resources in the Grafana Terraform provider schema.

Prerequisites:

- Terraform installed (`terraform` on your `PATH`)
- A Terraform project initialized with the Grafana provider (`terraform init`)

## Prompts

Prompts are guided workflows that you invoke explicitly. Unlike tools, which your assistant calls on its own, you trigger a prompt when you want structured help generating or converting a script.

### generate_script

Generates a production-ready k6 script from plain-English requirements.

The prompt guides your assistant through:

- Researching relevant k6 docs
- Applying best practices
- Writing the script and validating it

### convert_playwright_script

Converts a Playwright test to a `k6/browser` script.

The prompt guides your assistant through:

- Mapping Playwright APIs to k6 equivalents
- Applying browser-testing best practices
- Validating the converted script

### How to invoke prompts

The way you invoke a prompt depends on your MCP client:

| Client | How to invoke |
| --- | --- |
| **Claude Code** | Type `/mcp__k6__generate_script` or `/mcp__k6__convert_playwright_script` in the chat. |
| **Codex CLI** | Type `/mcp` to list available prompts, then invoke by name. |
| **Cursor** | Type `/` in chat to open the prompt list and select the prompt. |

{{< admonition type="note" >}}
Prompt support varies by client. If your client doesn't show prompts, you can describe your goal in chat and your assistant will use the underlying tools directly.
{{< /admonition >}}

## Resources

Resources are reference data your assistant can read to produce accurate, up-to-date answers.

### docs://k6/best_practices

A curated best-practices document intended for AI-assisted script authoring.

### types://k6/...

k6 TypeScript type definitions, exposed as MCP resources. These help your assistant:

- Discover valid import paths
- Verify option names and shapes (`options`, scenario config, thresholds)
- Avoid hallucinated APIs when generating scripts

## Recommended workflows

### Validate, then run

Use this loop for most authoring:

1. Ask your assistant to validate the script (`validate_script`).
2. Fix any issues and repeat until validation passes.
3. Run the script with a small load (for example, 1–5 VUs) before scaling up.

### Explore documentation during authoring

When you need a specific k6 API or option shape:

- Your assistant can use `list_sections` and `get_documentation` to find authoritative docs.
- Type definitions (`types://k6/...`) confirm exact signatures and option shapes.

### Terraform + Grafana Cloud k6 provisioning

If you manage Grafana Cloud k6 resources via Terraform:

- Ask your assistant to search for relevant resources with `search_terraform`.
- Review the schema and apply changes in your Terraform project.
