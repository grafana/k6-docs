---
title: Configure your AI assistant
description: Connect mcp-k6 to your AI assistant or editor to get help writing, validating, and running k6 scripts.
weight: 110
---

# Configure your AI assistant

`mcp-k6` is an experimental [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server for k6.
Once connected to your AI assistant or MCP-compatible editor, it helps you write better k6 scripts faster and run them with confidence.

## What your assistant can do for you

With `mcp-k6`, your AI assistant can:

- **Write accurate scripts:** Create up-to-date scripts by **referring to** embedded k6 documentation and TypeScript definitions to reduce API hallucinations.
- **Validate scripts:** Catch syntax errors, missing imports, and `export default function` declarations before execution.
- **Run tests locally:** Execute scripts and review results without leaving your editor.
- **Generate scripts:** Create tests from requirements using guided prompts that follow k6 best practices.
- **Convert browser tests:** Transform Playwright tests into k6 browser scripts while preserving test logic.
- **Automate provisioning:** Discover Terraform resources in your project to automate Grafana Cloud k6 setup.

## Install mcp-k6

Choose one of the following installation methods.

{{< admonition type="note" >}}
If you run `mcp-k6` natively, you must also have `k6` available on your `PATH`. If you run `mcp-k6` in Docker, the image already includes k6.
{{< /admonition >}}

### Docker (recommended)

Pull the image:

```sh
docker pull grafana/mcp-k6:latest
```

### Homebrew (macOS)

```sh
brew tap grafana/grafana
brew install mcp-k6
mcp-k6 --version
```

### Linux packages (deb/rpm)

Download the package from the [mcp-k6 GitHub releases](https://github.com/grafana/mcp-k6/releases) and install it with your system package manager.

### Build from source

Clone and install with `make`:

```sh
git clone https://github.com/grafana/mcp-k6
cd mcp-k6
make install
```

## Connect to your assistant

After you install `mcp-k6`, refer to [Configure MCP clients](./configure-mcp-clients.md) to register the server with your editor and establish a connection.

- [Configure MCP clients](./configure-mcp-clients/)

## Next steps

- Learn about available tools, prompts, and resources: [Tools, prompts, and resources](./tools-prompts-resources/)
- Understand safety limits and common issues: [Security, limits, and troubleshooting](./security-limits-and-troubleshooting/)
