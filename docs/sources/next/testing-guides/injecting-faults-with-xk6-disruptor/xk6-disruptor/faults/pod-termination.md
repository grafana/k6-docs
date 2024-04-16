---
aliases:
  - ../../../../javascript-api/xk6-disruptor/faults/pod-termination # docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/faults/pod-termination
title: 'Pod Termination'
description: 'xk6-disruptor: Pod Termination Fault attributes'
weight: 03
---

# Pod Termination

A Pod Termination Fault allows terminating either a fixed number or a percentage of the pods that matching a selector or back a service.

A Pod Termination fault is defined by the following attributes:

| Attribute | Type                  | Description                                                                                                                                                                   |
| --------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| count     | integer or percentage | the number of pods to be terminated. It can be specified as a integer number or as a percentage, for example `30%`, that defines the fraction of target pods to be terminated |

{{% admonition type="note" %}}

If the count is a percentage and there are no enough elements in the target pod list, the number is rounded up.
For example '25%' of a list of 2 target pods will terminate one pod.
If the list of target pods is not empty, at least one pod is always terminated.

{{% /admonition %}}

## Example

This example defines a PorTermination fault that will terminate `30%` of target pods

```javascript
const fault = {
  count: '30%',
};
```
