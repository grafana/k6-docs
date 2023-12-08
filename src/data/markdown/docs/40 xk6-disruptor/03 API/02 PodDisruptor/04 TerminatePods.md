---
title: 'terminatePods()'
excerpt: 'xk6-disruptor: PodDisruptor.terminatePods method'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/xk6-disruptor/poddisruptor/terminate-pods/
---

`terminatePods` terminates a number of the pods matching the selector configured in the PodDisruptor.

| Parameter | Type   | Description |
| --------- | ------ |------- |
| fault     | object | description of the [Pod Termination fault](/javascript-api/xk6-disruptor/api/faults/pod-termination) |


## Example

<!-- eslint-skip -->

```javascript
    const fault = {
        count: 2,
    }
    disruptor.terminatePods(fault)
```