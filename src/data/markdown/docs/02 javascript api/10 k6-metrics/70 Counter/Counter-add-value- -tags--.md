---
title: "Counter.add(value, [tags])"
excerpt: 'Add a value to the Counter metric.'
canonicalUrl: https://grafana.com/docs/k6
---

Add a value to the `Counter` metric.

| Parameter | Type     | Description                                                                                                                                                                                                                                                                |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number   | The value to add to the counter.                                                                                                                                                                                                                                           |
| tags      | object   | Set of [tags](/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric).                                                                                                         |


[Counter examples](/javascript-api/k6-metrics/counter#examples)
