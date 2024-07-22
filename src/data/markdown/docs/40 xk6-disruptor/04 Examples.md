---
title: 'Examples'
excerpt: 'Examples of how to use the xk6-disruptor extension to introduce faults in k6 tests.'
canonicalUrl: https://grafana.com/docs/k6/latest/testing-guides/injecting-faults-with-xk6-disruptor/examples/
---

In this section, we present some examples of using the `xk6-disruptor` extension to introduce faults in `k6` tests.

- [Injecting gRPC faults into a Service](/javascript-api/xk6-disruptor/examples/inject-grpc-faults-into-service)
- [Injecting HTTP faults into a Pod](/javascript-api/xk6-disruptor/examples/inject-http-faults-into-pod)
- [Interactive demo](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda) (Killercoda)

To follow the instructions of the examples, check first the system under test meets the [requirements](/javascript-api/xk6-disruptor/get-started/requirements/) to receive faults, in particular:
- You have configured the credentials to access the Kubernetes cluster. 
- This cluster exposes the service using an external IP.

