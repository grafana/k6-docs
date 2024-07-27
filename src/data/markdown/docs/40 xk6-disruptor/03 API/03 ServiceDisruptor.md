---
title: 'ServiceDisruptor'
excerpt: 'xk6-disruptor: ServiceDisruptor class'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/xk6-disruptor/servicedisruptor/
redirect: https://grafana.com/docs/k6/latest/javascript-api/xk6-disruptor/servicedisruptor/
---

The `ServiceDisruptor` class can inject different types of faults into the pods that back a Kubernetes service. 

To construct a `ServiceDisruptor`, use the [ServiceDisruptor() constructor](/javascript-api/xk6-disruptor/api/servicedisruptor/constructor).
 

## Methods

| Method | Description |
| ------ | ----------- |
| [ServiceDisruptor.injectGrpcFaults()](/javascript-api/xk6-disruptor/api/servicedisruptor/injectgrpcfaults) | Inject [gRPC faults](/javascript-api/xk6-disruptor/api/faults/grpc) in the target Pods|
| [ServiceDisruptor.injectHTTPFaults()](/javascript-api/xk6-disruptor/api/servicedisruptor/injecthttpfaults) | Inject [HTTTP faults](/javascript-api/xk6-disruptor/api/faults/http) in the target Pods|
| ServiceDisruptor.targets() | Returns the list of target Pods of the ServiceDisruptor |
| [ServiceDisruptor.terminatePods()](/javascript-api/xk6-disruptor/api/servicedisruptor/terminatepods) | executes a [Pod Termination fault](/javascript-api/xk6-disruptor/api/faults/pod-termination) in the target Pods|
 

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

<Blockquote mod="note">

You can test this script by creating first a pod running nginx and exposing it as a service with the commands below, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed in your environment:

```bash
> kubectl run nginx --image=nginx
> kubectl expose pod nginx --port 80
```

You can also use the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension for creating these resources from your test script.

</Blockquote>

