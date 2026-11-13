---
title: Bootstrap your editor with k6 x agent
description: Use `k6 x agent init` to scaffold k6 skills and wire the k6 MCP server into Claude Code, Cursor, GitHub Copilot, Codex CLI, OpenCode, or Cline.
weight: 90
---

# Bootstrap your editor with k6 x agent

The `k6 x agent` command scaffolds an AI-assisted k6 testing workflow in your project. A single invocation drops portable [`SKILL.md`](https://docs.claude.com/en/docs/agents/skills) bundles into your editor's expected locations and registers the k6 MCP server in your editor's MCP configuration — so you don't have to author MCP client configuration by hand.

`k6 x agent` is a [subcommand extension](../../extensions/create/subcommand-extensions/) shipped with k6. The first time you run it, k6 transparently fetches the extension; subsequent invocations start immediately.

## What `k6 x agent init` does for you

For each editor you target, `init` will:

- **Install bundled skills:** Write portable `SKILL.md` files (or the editor's equivalent rule format) into the locations your editor reads from. Skills auto-activate based on user intent, for example "write a smoke test" or "convert this Playwright script".
- **Register the k6 MCP server:** Surgically merge a `k6` entry into the editor's MCP config (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`, …) so your assistant can call `validate_script`, `run_script`, and the rest of the [k6 MCP tools](./tools-prompts-resources/).
- **Stay out of your way:** Files written by `k6 x agent` carry an ownership marker. Re-running `init` is idempotent. Files you've edited locally are never overwritten unless you pass `--force`.

## Prerequisites

- k6 v2.0 or later on your `PATH` ([install k6](../install-k6/)).
- A project directory you want to scaffold into (run the command from the project root).
- One of the editors in [Supported targets](#supported-targets).

## Quickstart

From the root of your k6 project:

```sh
k6 x agent init claude-code           # one editor
k6 x agent init claude-code cursor    # several
k6 x agent init --all                 # every supported target
k6 x agent status                     # verify what got installed
```

Then open your editor and ask it to plan or write a k6 test. The bundled skills auto-activate based on intent — for example, "write a smoke test for the login flow" or "convert this Playwright script to k6".

{{< admonition type="note" >}}
Before any disk writes, you can run `k6 x agent init --dry-run <target>` to preview every file the command would create or merge, with byte counts and write modes.
{{< /admonition >}}

## Supported targets

| Target           | CLI name         | Skills location                  | MCP config                                  |
| ---------------- | ---------------- | -------------------------------- | ------------------------------------------- |
| Claude Code      | `claude-code`    | `.claude/skills/<name>/`         | `.mcp.json` + `.claude/settings.local.json` |
| OpenCode         | `opencode`       | `.opencode/skills/<name>/`       | `opencode.json`                             |
| OpenAI Codex CLI | `codex-cli`      | `.codex/skills/<name>/`          | `.codex/mcp.json`                           |
| GitHub Copilot   | `vscode-copilot` | `.github/copilot/skills/<name>/` | `.vscode/mcp.json`                          |
| Cursor           | `cursor`         | `.cursor/rules/<name>.mdc`       | `.cursor/mcp.json`                          |
| Cline            | `cline`          | `.clinerules/<name>.md`          | global (snippet printed as a notice)        |

{{< admonition type="note" >}}
Cline's MCP configuration is global rather than project-scoped. `k6 x agent init cline` prints the JSON snippet you need to paste into `cline_mcp_settings.json` instead of writing it for you.
{{< /admonition >}}

If your editor isn't listed, see [Editors not supported by `k6 x agent`](#editors-not-supported-by-k6-x-agent) below for manual setup.

## Bundled skills

The skills below are embedded in the binary and installed for every target. They are written in portable `SKILL.md` format and auto-activate when your assistant detects matching intent in the conversation.

| Skill                     | Triggers on                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `k6-test-planner`         | "plan tests", "design a test strategy", "what k6 tests should I write" |
| `k6-load-test`            | "write a k6 script", "load test", "stress / soak / spike test"         |
| `k6-smoke-test`           | "smoke test", "sanity check", "quick health check"                     |
| `k6-browser-test`         | "browser test", "UI test with k6", "test the frontend"                 |
| `k6-playwright-converter` | A Playwright script that needs to be ported to `k6/browser`            |

Run `k6 x agent skills show <name>` to print a skill's full `SKILL.md` to stdout.

## Commands

| Command                         | Description                                                |
| ------------------------------- | ---------------------------------------------------------- |
| `k6 x agent init <target>...`   | Write or update files for one or more targets.             |
| `k6 x agent init --all`         | Initialize every registered target.                        |
| `k6 x agent status`             | Show what is installed in the current workspace.           |
| `k6 x agent list`               | List available targets and bundled skills.                 |
| `k6 x agent skills list`        | List skills shipped in the binary.                         |
| `k6 x agent skills show <name>` | Print a skill's `SKILL.md` to stdout.                      |

### `init` flags

| Flag        | Description                                                                              |
| ----------- | ---------------------------------------------------------------------------------------- |
| `--all`     | Apply to every registered target. Cannot be combined with positional target names.       |
| `--force`   | Overwrite a managed file even if it has been edited locally.                             |
| `--dry-run` | Print the plan (paths, write modes, sizes) without touching disk.                        |

### Example status output

```
Agent installation status

[+] Claude Code
   - .mcp.json detected
[-] Cursor
   - Missing: .cursor/mcp.json
   - Hint: k6 x agent init cursor

[+] k6 MCP support
   - Found at /usr/local/bin/k6
```

A `[+]` next to **k6 MCP support** confirms that the editor will be able to launch `k6 x mcp` when your assistant connects.

## Safety

`k6 x agent` is conservative about what it writes:

- It never creates or modifies user-owned top-level files such as `AGENTS.md` or `README.md`.
- For shared JSON config files (`.mcp.json`, `.cursor/mcp.json`, `.vscode/mcp.json`, `opencode.json`), only the `k6` entry is touched. Other servers and unrelated keys in the file are preserved.
- Files inside `xk6-subcommand-agent`-owned folders are stamped with an ownership marker. Re-running `init` is idempotent, and `--force` is required to overwrite a file you have edited locally.
- `--dry-run` prints the full plan before any disk write, so you can review every path and write mode up front.

For the full design, see [`xk6-subcommand-agent/docs/DESIGN.md`](https://github.com/grafana/xk6-subcommand-agent/blob/main/docs/DESIGN.md).

## Troubleshooting

- **`folder already exists` or file collision** — re-run with `--force` to overwrite managed files. `k6 x agent` never deletes files it does not own.
- **Status shows `[-] k6 MCP support`** — `k6` is not on the editor's `PATH`. Install k6 from [Install k6](../install-k6/), and make sure your editor is launched in a shell that can find it.
- **Cline MCP entry missing** — Cline's MCP configuration is global. Copy the JSON snippet printed by `k6 x agent init cline` into `cline_mcp_settings.json`.
- **Unsupported editor** — see [Editors not supported by `k6 x agent`](#editors-not-supported-by-k6-x-agent) for manual MCP setup guidance.

## Editors not supported by `k6 x agent`

If your editor or MCP client isn't in the [Supported targets](#supported-targets) table, you can still register the k6 MCP server manually — it works with any client that speaks stdio.

Before you start:

- If you launch the server via the **k6 subcommand** (`k6 x mcp`), ensure `k6` is on your `PATH`.
- If you launch the **standalone** `mcp-k6` binary, ensure both `mcp-k6` and `k6` are on your `PATH`.
- If you launch the server **in Docker**, ensure Docker is installed and running.

### How MCP works

The Model Context Protocol (MCP) is a standard way for AI assistants to communicate with external tools. At its core, an MCP server is a program that:

1. Reads JSON-RPC messages from **stdin**.
1. Writes JSON-RPC responses to **stdout**.
1. Advertises tools, resources, and prompts that the AI can use.

When you configure an MCP client, you define the command it should launch — the MCP server binary — and the client communicates with it over stdio.

### What to configure

Most MCP clients ask for the following information:

| Field | Description |
|-------|-------------|
| **name** | An identifier for the server (for example, `k6`). |
| **command** | The program to run. For `k6 x mcp`, this is `k6`. For native installs, `mcp-k6`. For Docker, `docker`. |
| **args** | Command-line arguments. For `k6 x mcp`, this is `["x", "mcp"]`. For Docker, include `run`, `--rm`, `-i`, and the image name. |
| **env** | Optional environment variables to pass to the server. |
| **transport** | Usually `stdio` (some clients assume this by default). |

Consult your client's documentation for the exact configuration file location and format. Look for sections about "MCP servers", "tool servers", or "stdio servers".

## Next steps

- Learn what your assistant can do once the server is wired up: [Tools, prompts, and resources](./tools-prompts-resources/).
