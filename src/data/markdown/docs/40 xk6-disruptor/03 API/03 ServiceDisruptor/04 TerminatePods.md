---
title: 'terminatePods()'
excerpt: 'xk6-disruptor: ServiceDisruptor.terminatePods method'
---

`terminatePods` terminates a number of pods that belong to the service specified in the ServiceDisruptor.

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