---
title: 'Examples'
excerpt: 'Examples of how to use the xk6-disruptor extension to introduce faults in k6 tests.'
---

In these sections we present some examples of how to use the `xk6-disruptor` extension to introduce faults in `k6` tests.
Some examples use the [k6-kubernetes](http://github.com/grafana/xk6-kubernetes) extension.
So, to follow, ensure the custom `k6` binary you are using is built with both `xk6-disruptor` and `xk6-kubernetes` extensions. See the [Installation guide](../01-get-started/03-installation.md) for details.

Also check that your test environment satisfies the requirements described in the [get started guide](../01-get-started/02-requirements.md).
In particular, check that:
- You have the properly configured the credentials to access the Kubernetes cluster used for the test 
- This cluster is configured to expose your application using an external IP.


[Injecting HTTP faults to a Pod](/javascript-api/xk6-disruptor/examples/inject-http-faults-into-pod)