---
aliases:
  - ../../../../javascript-api/xk6-disruptor/servicedisruptor/terminate-pods # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/servicedisruptor/terminate-pods
title: 'terminatePods()'
description: 'xk6-disruptor: ServiceDisruptor.terminatePods method'
weight: 400
---

# terminatePods()

`terminatePods` terminates a number of pods that belong to the service specified in the ServiceDisruptor.

| Parameter | Type   | Description                                                                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fault     | object | description of the [Pod Termination fault](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor/faults/pod-termination) |

## Example

<!-- eslint-skip -->

```javascript
const fault = {
  count: 2,
};
disruptor.terminatePods(fault);
```
