---
title: 'Installation'
description: 'A step-by-step guide on how to install xk6-disruptor.'
weight: 03
---

# Installation

xk6-disruptor is a [k6 extension](https://grafana.com/docs/k6/<K6_VERSION>/extensions). You have to run a k6 version built with the disruptor extension to use the [disruptor APIs](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/) in your k6 tests.

The following sections explain the different options to get this custom binary.

## Download a release binary

The quickest way to get started is to [download a release binary from GitHub](https://github.com/grafana/xk6-disruptor/releases).

## Build from source

You can also use [xk6](https://github.com/grafana/xk6) to build a k6 binary.

To learn more about xk6, refer to [Build a k6 binary using Go](https://grafana.com/docs/k6/<K6_VERSION>/extensions/build-k6-binary-using-go).

To build the k6 binary with the xk6-disruptor extension:

1. Ensure you have [Go 1.19](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed.
2. Run the following commands in a terminal:

{{< code >}}

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Clone the xk6-disruptor code
git clone https://github.com/grafana/xk6-disruptor.git
cd xk6-disruptor

# Build the custom binary
xk6 build --output xk6-disruptor --with github.com/grafana/xk6-disruptor=.
```

{{< /code >}}

xk6 will create the `xk6-disruptor` binary in the current working directory.
