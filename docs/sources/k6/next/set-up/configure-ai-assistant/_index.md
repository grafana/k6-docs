---
title: Configure your AI assistant
description: Connect the k6 MCP server to your AI assistant or editor to get help writing, validating, and running k6 scripts.
weight: 110
---

# Configure your AI assistant

The k6 MCP server is an experimental [Model Context Protocol](https://modelcontextprotocol.io/) server for k6.
Once connected to your AI assistant or MCP-compatible editor, it helps you write better k6 scripts faster and run them with confidence.

## What your assistant can do for you

With the k6 MCP server, your AI assistant can:

- **Write accurate scripts:** Create up-to-date scripts by **referring to** embedded k6 documentation and TypeScript definitions to reduce API hallucinations.
- **Validate scripts:** Catch syntax errors, missing imports, and `export default function` declarations before execution.
- **Run tests locally:** Execute scripts and review results without leaving your editor.
- **Generate scripts:** Create tests from requirements using guided prompts that follow k6 best practices.
- **Convert browser tests:** Transform Playwright tests into k6 browser scripts while preserving test logic.
- **Automate provisioning:** Discover Terraform resources in your project to automate Grafana Cloud k6 setup.

## Run the k6 MCP server

The simplest path is to invoke the server through k6 itself. To pin a specific version or run without a k6 install on the host, use the standalone `mcp-k6` distribution instead.

### k6 subcommand (recommended)

If you already have [k6 installed](../install-k6/), you also have the k6 MCP server — invoke it as a subcommand:

```sh
k6 x mcp
```

The server is registered as an [official subcommand extension](../../extensions/create/subcommand-extensions/#use-automatic-extension-resolution). The first time you run `k6 x mcp`, k6 transparently fetches and runs the extension; subsequent invocations start immediately. By default the server speaks the **stdio** transport that every MCP client expects.

Verify the command works:

```sh
k6 x mcp --help
```

{{< admonition type="note" >}}
Auto-extension resolution runs the latest released version. To pin a specific version, use the standalone `mcp-k6` distribution below.
{{< /admonition >}}

### Docker

Pull the image:

```sh
docker pull grafana/mcp-k6:latest
docker run --rm grafana/mcp-k6 --version
```

### Homebrew (macOS)

{{< admonition type="note" >}}
If you run `mcp-k6` natively, you must also have k6 installed and available in your PATH.
{{< /admonition >}}

```sh
brew tap grafana/grafana
brew install mcp-k6
mcp-k6 --version
```

### Linux packages (deb/rpm)

Install `mcp-k6` from the `.deb` or `.rpm` packages published on the [mcp-k6 GitHub releases](https://github.com/grafana/mcp-k6/releases).

1. Open the releases page and select a version.
1. Download the package that matches your Linux distribution and CPU architecture.

You can check your CPU architecture with:

```sh
uname -m
```

Use the following mapping to pick the right asset:

| `uname -m` | Debian/Ubuntu asset | Fedora/RHEL asset |
| --- | --- | --- |
| `x86_64` | `amd64` (`.deb`) | `x86_64` (`.rpm`) |
| `aarch64` | `arm64` (`.deb`) | `aarch64` (`.rpm`) |

#### Debian/Ubuntu (`.deb`)

If you have the GitHub CLI (`gh`) installed, you can download a specific release asset from the terminal:

```sh
MCP_K6_VERSION="vX.Y.Z"

# For amd64/x86_64:
gh release download "$MCP_K6_VERSION" --repo grafana/mcp-k6 --pattern "*linux*amd64*.deb"

# For arm64/aarch64:
# gh release download "$MCP_K6_VERSION" --repo grafana/mcp-k6 --pattern "*linux*arm64*.deb"

sudo apt install ./mcp-k6_*.deb
mcp-k6 --version
```

If you downloaded the `.deb` in your browser, run `apt` from the directory where you saved it:

```sh
sudo apt install ./mcp-k6_*.deb
mcp-k6 --version
```

#### Fedora/RHEL (`.rpm`)

```sh
MCP_K6_VERSION="vX.Y.Z"

# For x86_64:
gh release download "$MCP_K6_VERSION" --repo grafana/mcp-k6 --pattern "*linux*x86_64*.rpm"

# For aarch64:
# gh release download "$MCP_K6_VERSION" --repo grafana/mcp-k6 --pattern "*linux*aarch64*.rpm"

sudo dnf install ./mcp-k6-*.rpm
mcp-k6 --version
```

If your distro uses `yum` instead of `dnf`, run:

```sh
sudo yum install ./mcp-k6-*.rpm
```

### Build from source

Clone and install with `make`:

```sh
git clone https://github.com/grafana/mcp-k6
cd mcp-k6
make install
```

## Server flags

The k6 MCP server accepts the following flags, whether you launch it via `k6 x mcp` or the standalone `mcp-k6` binary:

| Flag | Default | Description |
| --- | --- | --- |
| `--transport` | `stdio` | Transport to use: `stdio` or `http`. |
| `--addr` | `:8080` | Listen address (HTTP transport only). |
| `--endpoint` | `/mcp` | HTTP endpoint path (HTTP transport only). |
| `--stateless` | `false` | Disable session tracking (HTTP transport only). |
| `--preload` | `false` | Download all embedded documentation bundles at startup. |

### Run over HTTP

For shared development hosts where multiple clients connect to one server, start the k6 MCP server with the streamable HTTP transport:

```sh
k6 x mcp --transport=http --addr=:8080
```

Clients then connect to `http://<host>:8080/mcp`.

{{< admonition type="caution" >}}
The HTTP transport has no built-in authentication. Don't expose it on a public network — bind it to localhost or a trusted internal interface, and put it behind your own auth proxy if multiple users need access.
{{< /admonition >}}

## Troubleshooting

If your AI assistant cannot connect to the server:

- **Check the logs:** Most editors (like Cursor or VS Code) have an "MCP Output" or "Logs" tab. Check there for "command not found" errors.
- **Verify k6 is on PATH:** If running via `k6 x mcp`, run `which k6` to confirm k6 is globally accessible. If running natively, also run `which mcp-k6`.
- **Check k6 version:** Auto-extension resolution requires a recent k6 release. Run `k6 version` and confirm you're on a version that supports `k6 x` subcommands.
- **Docker permissions:** Ensure the Docker daemon is running and that your user has permission to execute `docker run`.
- **Use MCP Inspector:** Use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to debug the connection independently of your editor.

### Configure your editor

Once `k6 x mcp` runs (or you've installed `mcp-k6` standalone), refer to [Configure MCP clients](./configure-mcp-clients/) to register the server with your editor and establish a connection.

- [Configure MCP clients](./configure-mcp-clients/)

## Next steps

- Learn about available tools, prompts, and resources: [Tools, prompts, and resources](./tools-prompts-resources/)
