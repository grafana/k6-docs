---
aliases:
  - ../../../javascript-api/xk6-disruptor/servicedisruptor # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/servicedisruptor
title: 'ServiceDisruptor'
description: 'xk6-disruptor: ServiceDisruptor class'
weight: 300
---

# ServiceDisruptor

The `ServiceDisruptor` class can inject different types of faults into the pods that back a Kubernetes service.

To construct a `ServiceDisruptor`, use the [ServiceDisruptor() constructor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/servicedisruptor/constructor).

## Methods

| Method                                                                                                                                                                             | Description                                                                                                                                                                             |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ServiceDisruptor.injectGrpcFaults()](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/servicedisruptor/injectgrpcfaults) | Inject [gRPC faults](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/grpc) in the target Pods                          |
| [ServiceDisruptor.injectHTTPFaults()](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/servicedisruptor/injecthttpfaults) | Inject [HTTTP faults](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/http) in the target Pods                         |
| ServiceDisruptor.targets()                                                                                                                                                         | Returns the list of target Pods of the ServiceDisruptor                                                                                                                                 |
| [ServiceDisruptor.terminatePods()](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/servicedisruptor/terminate-pods)      | executes a [Pod Termination fault](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/pod-termination) in the target Pods |

## Example

The following example:

- Creates a disruptor for the `nginx` service
- Injects a delay of 100ms and a 10 percent of requests that return an http response code `500`.

```javascript
import { ServiceDisruptor } from 'k6/x/disruptor';

const fault = {
  averageDelay: '100ms',
  errorRate: 0.1,
  errorCode: 500,
};

export default function () {
  const disruptor = new ServiceDisruptor('nginx', 'default');
  disruptor.injectHTTPFaults(fault, '30s');
}
```

{{% admonition type="note" %}}

You can test this script by creating first a pod running nginx and exposing it as a service with the commands below, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed in your environment:

```bash
> kubectl run nginx --image=nginx
> kubectl expose pod nginx --port 80
```

You can also use the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension for creating these resources from your test script.

{{% /admonition %}}
