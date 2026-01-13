---
title: Configure MCP clients
description: Configure VS Code, Cursor, Claude Code, Codex, and other MCP clients to launch mcp-k6 over stdio.
weight: 100
---

# Configure MCP clients

`mcp-k6` communicates over **stdio** (stdin/stdout). Your MCP client launches `mcp-k6` (or `docker run ...`) and connects to it as a subprocess.

## Prerequisites

- If you run `mcp-k6` **natively**, ensure `mcp-k6` and `k6` are available on your `PATH`.
- If you run `mcp-k6` **in Docker**, ensure Docker is installed and running.

## VS Code

VS Code supports MCP servers through the GitHub Copilot extension (agent mode). To enable `mcp-k6`:

1. Open your user or workspace settings JSON (`settings.json`).
1. Add the MCP server configuration.

### Docker

```json
{
  "mcp": {
    "servers": {
      "k6": {
        "command": "docker",
        "args": ["run", "--rm", "-i", "grafana/mcp-k6:latest"]
      }
    }
  }
}
```

### Native

```json
{
  "mcp": {
    "servers": {
      "k6": {
        "command": "mcp-k6"
      }
    }
  }
}
```

Reload VS Code after updating the configuration.

## Cursor

Cursor reads MCP server definitions from your MCP configuration. Add an entry that launches `mcp-k6` over stdio.

Create or update `~/.cursor/mcp.json` (or the project-specific `.cursor/mcp.json`):

### Docker

```json
{
  "mcpServers": {
    "k6": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "grafana/mcp-k6:latest"]
    }
  }
}
```

### Native

```json
{
  "mcpServers": {
    "k6": {
      "command": "mcp-k6"
    }
  }
}
```

Restart Cursor (or reload MCP servers), then verify the connection by invoking the `info` tool from chat.

## Claude Code (CLI)

Add `mcp-k6` to Claude Code using the `claude mcp add` command.

### Docker

```sh
claude mcp add --scope=user --transport=stdio k6 docker run --rm -i grafana/mcp-k6:latest
```

### Native

```sh
claude mcp add --scope=user --transport=stdio k6 mcp-k6
```

Use `--scope=local` to add the configuration to the current project instead of globally.

Reload the workspace after adding the server.

## Codex

Codex CLI supports MCP servers over stdio.

1. Locate your Codex configuration file. Run `codex help config` if you're unsure of the path.
1. Add the MCP server configuration under the `mcpServers` key.

### Docker

```json
{
  "mcpServers": {
    "k6": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "grafana/mcp-k6:latest"]
    }
  }
}
```

### Native

```json
{
  "mcpServers": {
    "k6": {
      "command": "mcp-k6"
    }
  }
}
```

Restart Codex or reload its configuration to activate the server.

## Other MCP clients

If your MCP client isn't listed above, you can still use `mcp-k6` as long as it supports stdio-based MCP servers.

### How MCP works

The Model Context Protocol (MCP) is a standard way for AI assistants to communicate with external tools. At its core, an MCP server is a program that:

1. Reads JSON-RPC messages from **stdin**.
1. Writes JSON-RPC responses to **stdout**.
1. Advertises available tools, resources, and prompts that the AI can use.

When you configure an MCP client, you're telling it to launch a specific command (the MCP server binary) and communicate with it over stdio. The client sends requests like "list available tools" or "call this tool with these arguments", and the server responds with results.

### What you need to configure

Most MCP clients require the following information:

| Field | Description |
|-------|-------------|
| **name** | An identifier for the server (for example, `k6`). |
| **command** | The program to run. For native installs, this is `mcp-k6`. For Docker, this is `docker`. |
| **args** | Command-line arguments. For Docker, include `run`, `--rm`, `-i`, and the image name. |
| **env** | Optional environment variables to pass to the server. |
| **transport** | Usually `stdio` (some clients assume this by default). |

Consult your client's documentation for the exact configuration file location and format. Look for sections about "MCP servers", "tool servers", or "stdio servers".
