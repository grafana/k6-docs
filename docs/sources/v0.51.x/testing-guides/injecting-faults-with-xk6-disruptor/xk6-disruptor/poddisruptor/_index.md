---
aliases:
  - ../../../javascript-api/xk6-disruptor/poddisruptor # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/poddisruptor
title: 'PodDisruptor'
description: 'xk6-disruptor: PodDisruptor class'
weight: 200
---

# PodDisruptor

The `PodDisruptor` class can inject different types of faults into the pods that match a selection criteria.

To construct a `PodDisruptor`, use the [PodDisruptor() constructor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor/constructor).

## Methods

| Method                                                                                                                                                                     | Description                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PodDisruptor.injectGrpcFaults()](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor/injectgrpcfaults) | Inject [gRPC faults](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/grpc) in the target Pods                          |
| [PodDisruptor.injectHTTPFaults()](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor/injecthttpfaults) | Inject [HTTP faults](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/http) in the target Pods                          |
| PodDisruptor.targets()                                                                                                                                                     | Returns the list of target Pods of the PodDisruptor                                                                                                                                     |
| [PodDisruptor.terminatePods()](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/poddisruptor/terminate-pods)      | executes a [Pod Termination fault](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/pod-termination) in the target Pods |

## Example

This example:

- Creates a selector that matches all pods in the `default` namespace with the `run=nginx` label
- Injects a delay of 100ms and makes 10 percent of requests return an http response code `500`.

```javascript
import { PodDisruptor } from 'k6/x/disruptor';

const selector = {
  namespace: 'default',
  select: {
    labels: {
      run: 'nginx',
    },
  },
};

const fault = {
  averageDelay: '100ms',
  errorRate: 0.1,
  errorCode: 500,
};

export default function () {
  const disruptor = new PodDisruptor(selector);
  disruptor.injectHTTPFaults(fault, '30s');
}
```

{{% admonition type="note" %}}

You can test this script by first creating a pod running nginx with the command below, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed in your environment:

```bash
$ kubectl run nginx --image=nginx
```

You can also use the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension for creating these resources from your test script.

{{% /admonition %}}
