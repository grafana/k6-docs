---
title: 'Installation'
excerpt: 'A step-by-step guide on how to install xk6-disruptor.'
---

## Build from source

Before you build the `xk6-disruptor` binary:
1. Ensure you have [Go 1.18](https://golang.org/doc/install) and [Git](https://git-scm.com/) installed.
2. Install the [xk6 build tool](https://github.com/grafana/xk6#command-usage):
  ```bash
  $ go install go.k6.io/xk6/cmd/xk6@latest
  ```


After you've installed the prerequisites, follow these steps to build your xk6-disruptor extension:

1. Clone the source code from the [k6s-disruptor](https://github.com/grafana/xk6-disruptor) repository:
  ```bash
  $ git clone https://github.com/grafana/xk6-disruptor.git
  $ cd xk6-disruptor
  ```

1. Build the custom binary with the following command:
  ```bash
  $ xk6 build --with github.com/grafana/xk6-disruptor=. --with github.com/grafana/xk6-kubernetes --output build/k6
  ```

  Notice that this command includes both the xk6-disruptor and the [xk6-kubernetes extension](https://github.com/grafana/xk6-kubernetes).
  This is because many example scripts use the `xk6-kubernetes` extension to create the Kubernetes resources they need, such as Pods and Services.
  If you don't use this extension in your tests, you can build the custom `k6` binary with only the `xks-disruptor` extension using the following command instead:

  ```bash
  $ xk6 build --with github.com/grafana/xk6-disruptor=. --output build/k6
  ```

1. Run the script with the newly created version of k6  in the `build` directory:

  ```bash
  $ ./build/k6 run path/to/test/script
  ```
