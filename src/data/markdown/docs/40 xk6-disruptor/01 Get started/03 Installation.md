---
title: 'Installation'
excerpt: 'A step-by-step guide on how to install xk6-disruptor.'
canonicalUrl: https://grafana.com/docs/k6/latest/testing-guides/injecting-faults-with-xk6-disruptor/installation/
redirect: https://grafana.com/docs/k6/latest/testing-guides/injecting-faults-with-xk6-disruptor/installation/
---

xk6-disruptor is a [k6 extension](/extensions). You have to run a k6 version built with the disruptor extension to use the [disruptor APIs](/javascript-api/xk6-disruptor/api/) in your k6 tests.

The following sections explain the different options to get this custom binary.

## Download a release binary

The quickest way to get started is to [download a release binary from GitHub](https://github.com/grafana/xk6-disruptor/releases).

## Build from source

You can also use [xk6](https://github.com/grafana/xk6) to build a k6 binary.

To find out more about how to use xk6 or what it is, check out this guide - [Build a k6 binary using Go](/extensions/guides/build-a-k6-binary-using-go/).


To build the k6 binary with the xk6-disruptor extension:
1. Ensure you have [Go 1.19](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed.
2. Run the following commands in a terminal:

<CodeGroup labels={["Linux/MacOS"]}>

```bash
# Install xk6
go install go.k6.io/xk6/cmd/xk6@latest

# Clone the xk6-disruptor code
git clone https://github.com/grafana/xk6-disruptor.git
cd xk6-disruptor

# Build the custom binary 
xk6 build --output xk6-disruptor --with github.com/grafana/xk6-disruptor=.
```

</CodeGroup>


xk6 will create the `xk6-disruptor` binary in the current working directory.
