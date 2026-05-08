---
title: Configure MCP clients
description: Configure VS Code, Cursor, Claude Code, Codex, and other MCP clients to launch the k6 MCP server via `k6 x mcp`, natively, or with Docker.
weight: 100
---

# Configure MCP clients

The k6 MCP server communicates over **stdio** (stdin/stdout). Your MCP client registers it as a subprocess (`k6 x mcp`, the standalone `mcp-k6` binary, or `docker run ...`) to establish a connection.

## Prerequisites

- If you launch the server via the **k6 subcommand** (`k6 x mcp`), ensure `k6` is available on your `PATH`.
- If you launch the **standalone** `mcp-k6` binary, ensure `mcp-k6` and `k6` are available on your `PATH`.
- If you launch the server **in Docker**, ensure Docker is installed and running.

## VS Code

VS Code supports MCP servers through the GitHub Copilot extension. To use the k6 MCP server, you must use **Copilot Edits** (agent mode), which allows the assistant to call k6 commands and read test results.

1. Open your user or workspace settings JSON (`settings.json`).
2. Add the MCP server configuration.

### k6 subcommand

```json
{
  "mcp": {
    "servers": {
      "k6": {
        "command": "k6",
        "args": ["x", "mcp"]
      }
    }
  }
}
```

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

## Cursor

Cursor reads MCP server definitions from your configuration. Add an entry to register the k6 MCP server as a local server using the stdio transport.

Create or update your global configuration file (**~/.cursor/mcp.json**) or your project-specific file (**.cursor/mcp.json**):

### k6 subcommand

```json
{
  "mcpServers": {
    "k6": {
      "command": "k6",
      "args": ["x", "mcp"]
    }
  }
}
```

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

Restart Cursor or reload MCP servers, then verify the connection by invoking the `info` tool from chat.

## Claude Code (CLI)

Add the k6 MCP server to Claude Code using the `claude mcp add` command.

### k6 subcommand

```sh
claude mcp add --scope=user --transport=stdio k6 -- k6 x mcp
```

The trailing `--` separates Claude Code's flags from the command it should launch, so `x` is passed to k6 instead of being parsed by `claude`.

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

1. Locate your Codex configuration file. 
If you are unsure of the location, run codex help config to find the file path.
1. Add the MCP server configuration under the `mcpServers` key.

### k6 subcommand

```json
{
  "mcpServers": {
    "k6": {
      "command": "k6",
      "args": ["x", "mcp"]
    }
  }
}
```

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

If your MCP client is not in the previous list, you can use the k6 MCP server with any client that supports stdio-based MCP servers.

### How MCP works

The Model Context Protocol (MCP) is a standard way for AI assistants to communicate with external tools. At its core, an MCP server is a program that:

1. Reads JSON-RPC messages from **stdin**.
1. Writes JSON-RPC responses to **stdout**.
1. Advertises available tools, resources, and prompts that the AI can use.

When you configure an MCP client, you define a specific command, the MCP server binary, for the client to launch and communicate with over stdio. The client then sends requests to list tools or execute functions, and the server returns the results.

### What you need to configure

Most MCP clients require the following information:

| Field | Description |
|-------|-------------|
| **name** | An identifier for the server (for example, `k6`). |
| **command** | The program to run. For `k6 x mcp`, this is `k6`. For native installs, `mcp-k6`. For Docker, `docker`. |
| **args** | Command-line arguments. For `k6 x mcp`, this is `["x", "mcp"]`. For Docker, include `run`, `--rm`, `-i`, and the image name. |
| **env** | Optional environment variables to pass to the server. |
| **transport** | Usually `stdio` (some clients assume this by default). |

Consult your client's documentation for the exact configuration file location and format. Look for sections about "MCP servers", "tool servers", or "stdio servers".
