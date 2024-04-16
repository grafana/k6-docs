---
title: 'xk6-disruptor first steps'
description: 'xk6-disruptor is a k6 extension providing fault injection capabilities to k6.'
weight: 01
---

# xk6-disruptor first steps

[xk6-disruptor](https://github.com/grafana/xk6-disruptor) is an extension that adds fault injection capabilities to k6.

It provides a Javascript [API](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/) to inject [faults](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults) such as errors and delays into HTTP and gRPC requests served by selected Kubernetes [Pods](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor) or [Services](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/servicedisruptor).

```javascript
export default function () {
  // Create a new disruptor that targets a service
  const disruptor = new ServiceDisruptor('app-service', 'app-namespace');

  // Disrupt the targets by injecting delays and faults into HTTP request for 30 seconds
  const fault = {
    averageDelay: '500ms',
    errorRate: 0.1,
    errorCode: 500,
  };
  disruptor.injectHTTPFaults(fault, '30s');
}
```

## Next steps

Explore the fault injection [API](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/)

See [step-by-step examples](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/examples).

Visit the [interactive demo environment](https://killercoda.com/grafana-xk6-disruptor/scenario/killercoda).

Learn the basics of using the disruptor in your test project:

- [Requirements](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/requirements)

- [Installation](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/installation)
