---
title: 'Installation'
excerpt: 'A step-by-step guide on how to install xk6-disruptor.'
---

xk6-disruptor is a [k6 extension](/extensions). You have to run a k6 version built with the disruptor extension to use the [disrutor APIs](/javascript-api/xk6-disruptor/api/) in your k6 tests.

## Build from source

This option allows you to build a k6 binary using [xk6](https://github.com/grafana/xk6).

To find out more about how to use xk6 or what it is, check out this guide - [Build a k6 binary with extensions](/extensions/guides/build-a-k6-binary-with-extensions/).


To build the k6 binary with the xk6-disruptor extension:
1. Ensure you have [Go 1.18](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed.
2. Run the following commands in a terminal:

    ```bash
    # Install xk6
    go install go.k6.io/xk6/cmd/xk6@latest

    # Clone the xk6-disruptor code
    git clone https://github.com/grafana/xk6-disruptor.git
    cd xk6-disruptor

    # Build the custom binary 
    xk6 build --output xk6-disruptor --with github.com/grafana/xk6-disruptor=. --with github.com/grafana/xk6-kubernetes
    ```

    Notice that the `build` command includes both the xk6-disruptor and the [xk6-kubernetes extension](https://github.com/grafana/xk6-kubernetes).
    This is because many example scripts use the `xk6-kubernetes` extension to create the Kubernetes resources they need, such as Pods and Services.
    If you don't use this extension in your tests, you can build the custom `k6` binary with only the `xk6-disruptor` extension using the following command instead:

    ```bash
    $ xk6 build --output xk6-disruptor --with github.com/grafana/xk6-disruptor=.
    ```


xk6 will create the `xk6-disruptor` binary in the current working directory.