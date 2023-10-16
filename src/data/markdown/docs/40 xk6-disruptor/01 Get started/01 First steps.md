---
title: 'First steps'
heading: 'xk6-disruptor first steps'
head_title: 'xk6-disruptor First steps'
excerpt: 'xk6-disruptor is a k6 extension providing fault injection capabilities to k6.'
---

[xk6-disruptor](https://github.com/grafana/xk6-disruptor) is an extension that adds fault injection capabilities to k6.

It provides a Javascript [API]((/javascript-api/xk6-disruptor/api)) to inject [faults](/javascript-api/xk6-disruptor/api/faults/) such as errors and delays into HTTP and gRPC requests served by selected Kubernetes [Pods](/javascript-api/xk6-disruptor/api/poddisruptor) or [Services](/javascript-api/xk6-disruptor/api/servicedisruptor).


```javascript
export default function () {
    // Create a new disruptor that targets a service
    const disruptor = new ServiceDisruptor("app-service","app-namespace");

    // Disrupt the targets by injecting delays and faults into HTTP request for 30 seconds
    const fault = {
        averageDelay: '500ms',
        errorRate: 0.1,
        errorCode: 500
    }
    disruptor.injectHTTPFaults(fault, "30s")
}
```

## Next steps

Learn more about xk6-disruptor and fault injection in [About](/javascript-api/xk6-disruptor/about).

Explore the fault injection [API](/javascript-api/xk6-disruptor/api)

See [step-by-step examples](/javascript-api/xk6-disruptor/examples).

Visit the [interactive demo environment](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda).

Learn the basics of using the disruptor in your test project:

- [Requirements](/javascript-api/xk6-disruptor/get-started/requirements)

- [Installation](/javascript-api/xk6-disruptor/get-started/installation)

