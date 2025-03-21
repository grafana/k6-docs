---
title: 'terminatePods()'
description: 'xk6-disruptor: PodDisruptor.terminatePods method'
weight: 400
---

# terminatePods()

`terminatePods` terminates a number of the pods matching the selector configured in the PodDisruptor.

| Parameter | Type   | Description                                                                                                                              |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| fault     | object | description of the [Pod Termination fault](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/faults/pod-termination) |

## Example

<!-- eslint-skip -->

```javascript
const fault = {
  count: 2,
};
disruptor.terminatePods(fault);
```
