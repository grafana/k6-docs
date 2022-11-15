---
title: 'PodDisruptor'
excerpt: 'xk6-disruptor: PodDisruptor class'
---

The `PodDisruptor` class allows the injection of different types of faults in the pods that match a selection criteria.

To construct a `PodDisruptor`, use the [PodDisruptor() constructor](/javascript-api/xk6-disruptor/api/poddisruptor/constructor).

## Methods

| Method | Description |
| ------ | ----------- |
| [PodDisruptor.injectHTTPFaults()](/javascript-api/xk6-disruptor/api/poddisruptor/injecthttpfaults) | 
| PodDisruptor.targets() | Returns the list of target Pods of the PodDisruptor |
 

## Example

This example shows how to create a selector that matches all pods in the `default` namespace with the `run=nginx` label and inject a delay of 100ms and a 10% of requests returning a http response code 500.


```javascript
import { PodDisruptor } from 'k6/x/disruptor';

const selector = {
        namespace: "default",
        select: {
                labels: {
                        run: "nginx"
                }
        }
}

const fault = {
        averageDelay: 100,
        errorRate: 0.1,
        errorCode: 500
}

export default function () {
        const disruptor = new PodDisruptor(selector)
        const targets = disruptor.targets()
        if (targets.length != 1) {
        	throw new Error("expected list to have one target")
        }

       disruptor.injectHTTPFaults(fault, 30)
}

```

<Blockquote mod="note">

You can test this script by first creating a pod running nginx with the command below, assuming you have [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl) installed in your environment:
```bash
> kubectl run nginx --image=nginx
```

 You can also use the [xk6-kubernetes](https://github.com/grafana/xk6-kubernetes) extension for creating these resources from your test script.

</Blockquote>