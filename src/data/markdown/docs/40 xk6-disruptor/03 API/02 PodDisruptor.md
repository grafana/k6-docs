---
title: 'PodDisruptor'
excerpt: 'xk6-disruptor: PodDisruptor class'
canonicalUrl: https://grafana.com/docs/k6
---

The `PodDisruptor` class can inject different types of faults into the pods that match a selection criteria.

To construct a `PodDisruptor`, use the [PodDisruptor() constructor](/javascript-api/xk6-disruptor/api/poddisruptor/constructor).

## Methods

| Method | Description |
| ------ | ----------- |
| [PodDisruptor.injectGrpcFaults()](/javascript-api/xk6-disruptor/api/poddisruptor/injectgrpcfaults) |  Inject [gRPC faults](/javascript-api/xk6-disruptor/api/faults/grpc) in the target Pods|
| [PodDisruptor.injectHTTPFaults()](/javascript-api/xk6-disruptor/api/poddisruptor/injecthttpfaults) |  Inject [HTTP faults](/javascript-api/xk6-disruptor/api/faults/http) in the target Pods|
| PodDisruptor.targets() | Returns the list of target Pods of the PodDisruptor |
 

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

<Blockquote mod="note">

You can test this script by first creating a pod running nginx with the command below, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed in your environment:
```bash
$ kubectl run nginx --image=nginx
```

 You can also use the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension for creating these resources from your test script.

</Blockquote>