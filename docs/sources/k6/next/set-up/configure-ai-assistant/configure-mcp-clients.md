---
title: Configure MCP clients
description: Configure VS Code, Cursor, Claude Code, Codex, and other MCP clients to launch mcp-k6 over stdio.
weight: 100
---

# Configure MCP clients

`mcp-k6` communicates over **stdio** (stdin/stdout). Your MCP client registers mcp-k6 (or docker run ...) as a subprocess to establish a connection.

## Prerequisites

- If you run `mcp-k6` **natively**, ensure `mcp-k6` and `k6` are available on your `PATH`.
- If you run `mcp-k6` **in Docker**, ensure Docker is installed and running.

## VS Code

VS Code supports MCP servers through the GitHub Copilot extension. To use `mcp-k6` tools, you must use **Copilot Edits** (agent mode), which allows the assistant to call k6 commands and read test results.

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

Cursor reads MCP server definitions from your configuration. Add an entry to register mcp-k6 as a local MCP server using the stdio transport.

Create or update your global configuration file (**~/.cursor/mcp.json**) or your project-specific file (**.cursor/mcp.json**):

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

1. Locate your Codex configuration file. 
If you are unsure of the location, run codex help config to find the file path.
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

If your MCP client is not in the previous list, you can use mcp-k6 with any client that supports stdio-based MCP servers.

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
| **command** | The program to run. For native installs, this is `mcp-k6`. For Docker, this is `docker`. |
| **args** | Command-line arguments. For Docker, include `run`, `--rm`, `-i`, and the image name. |
| **env** | Optional environment variables to pass to the server. |
| **transport** | Usually `stdio` (some clients assume this by default). |

Consult your client's documentation for the exact configuration file location and format. Look for sections about "MCP servers", "tool servers", or "stdio servers".
