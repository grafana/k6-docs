---
weight: 150
title: Set up distributed k6
---

# Set up distributed k6

It's possible to run large load tests even when using a single node, or single machine. But, depending on your use case, you might also want to run a distributed Grafana k6 test in your own infrastructure.

A couple of reasons why you might want to do this:

- You run your application in Kubernetes and would like k6 to be executed in the same fashion as all your other infrastructure components.
- You want to run your tests within your private network for security and/or privacy reasons.

[k6 Operator](https://github.com/grafana/k6-operator) is a Kubernetes operator that you can use to run distributed k6 tests in your cluster.

This section includes the following topics:

{{< section depth=2 >}}
