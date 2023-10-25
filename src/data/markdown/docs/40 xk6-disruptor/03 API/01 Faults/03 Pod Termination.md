---
title: 'Pod Termination'
excerpt: 'xk6-disruptor: Pod Termination Fault attributes'
---

A Pod Termination Fault specifies that a number of the disruptor's target pods to be terminated .

A Pod Termination fault is defined by the following attributes:

| Attribute     | Type   | Description |
| ------------- | ------ | --------|
| count         | integer or percentage | the number of pods to be terminated. It can be specified as a integer number or as a percentage (e.g. `30%`) that defines the fraction of target pods to be terminated|


<Blockquote mod="note">
If the count is a percentage and there are no enough elements in the target pod list, the number is rounded up.
For example '25%' of a list of 2 target pods will terminate one pod.
If the list of target pods is not empty, at least one pod is always terminated.
</Blockquote>

## Example

This example defines a PorTermination fault that will terminate `30%` of target pods
```javascript
const fault = {
    count: '30%'
};
```