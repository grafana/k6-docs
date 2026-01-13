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

- **Write accurate, up-to-date scripts** by consulting embedded k6 documentation and TypeScript type definitions, reducing guesswork and hallucinated APIs.
- **Verify your scripts are correct** before you run them, catching syntax errors, missing imports, and runtime issues early.
- **Run tests locally** and report results, so you can iterate on scripts without leaving your editor.
- **Generate scripts from requirements** using guided prompts that follow k6 best practices.
- **Convert Playwright tests to k6 browser scripts** while preserving test logic and applying browser-testing patterns.
- **Automate Grafana Cloud k6 provisioning** by discovering Terraform resources in your project.

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

After installing, configure your AI assistant or editor to launch `mcp-k6`:

- [Configure MCP clients](./configure-mcp-clients/)

## Next steps

- Learn about available tools, prompts, and resources: [Tools, prompts, and resources](./tools-prompts-resources/)
- Understand safety limits and common issues: [Security, limits, and troubleshooting](./security-limits-and-troubleshooting/)
