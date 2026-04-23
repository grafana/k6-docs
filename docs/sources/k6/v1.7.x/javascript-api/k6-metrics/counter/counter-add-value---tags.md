---
title: 'Counter.add(value, [tags])'
slug: 'counter-add'
description: 'Add a value to the Counter metric.'
---

# Counter.add(value, [tags])

Add a value to the `Counter` metric.

| Parameter | Type   | Description                                                                                                                                                                                           |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number | The value to add to the counter.                                                                                                                                                                      |
| tags      | object | Set of [tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric). |

[Counter examples](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/counter#examples)
