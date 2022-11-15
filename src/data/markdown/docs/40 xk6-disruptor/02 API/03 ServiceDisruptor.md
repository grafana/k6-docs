---
title: 'ServiceDisruptor'
excerpt: 'xk6-disruptor: ServiceDisruptor class'
---

The `ServiceDisruptor` class allows the injection of different types of faults in the pods that back a Kubernetes service. 

To construct a `ServiceDisruptor`, use the [ServiceDisruptor() constructor](/javascript-api/xk6-disruptor/api/servicedisruptor/constructor).
 

## Methods

| Method | Description |
| ------ | ----------- |
| [ServiceDisruptor.injectHTTPFaults()](/javascript-api/xk6-disruptor/api/servicedisruptor/injecthttpfaults) | 
 

## Example

The following example shows how to create a disruptor for the `nginx` service and inject a delay of 100ms and a 10% of requests returning a http response code 500. 

```javascript
import { ServiceDisruptor } from 'k6/x/disruptor';

const fault = {
  averageDelay: 100,
  errorRate: 0.1,
  errorCode: 500,
};

export default function () {
  const disruptor = new ServiceDisruptor('nginx', 'default');
  const targets = disruptor.targets();
  if (targets.length != 1) {
    throw new Error('expected list to have one target');
  }

  disruptor.injectHTTPFaults(fault, 30);
}
```

<Blockquote mod="note">
> You can test this script by creating first a pod running nginx and exposing it as a service with the commands below, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed in your environment:
```bash
> kubectl run nginx --image=nginx
> kubectl expose pod nginx --port 80
```

You can also use the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension for creating these resources from your test script.

</Blockquote>

