---
title: 'Installation'
excerpt: 'A step-by-step guide on how to install xk6-browser.'
---

xk6-browser is currently being developed as a [k6 extension](/extensions). You have to run a k6 version built with the browser extension to use the [browser-level APIs](/javascript-api/xk6-browser/#browser-level-apis) in your k6 tests.

To find out more about how to use xk6 or what it is, check out this guide - [Build a k6 binary with extensions](/extensions/guides/build-a-k6-binary-with-extensions/).

### Download a release binary

The quickest way to get started is to [download a release binary from GitHub](https://github.com/grafana/xk6-browser/releases).

This option is recommended if you don't want to build your own binary with [xk6](https://github.com/grafana/xk6), which can be challenging in some cases.

### Build from source

If you want to get the latest changes of the xk6-browser extension, you can also build a binary from source.

To build a binary with the extension:
1. Ensure you have [Go](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed.
2. Run the following commands in a terminal:

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Build the xk6-browser binary
xk6 build --output xk6-browser --with github.com/grafana/xk6-browser

... [INFO] Build environment ready
... [INFO] Building k6
... [INFO] Build complete: xk6-browser
```

xk6 will create the `xk6-browser` binary in the current working directory.
