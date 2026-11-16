---
title: 'Rate.add(value, [tags])'
slug: 'rate-add'
description: 'Set the value of the Rate metric.'
---

# Rate.add(value, [tags])

Set the value of the `Rate` metric.

| Parameter | Type   | Description                                                                                                                                                                                           |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value     | number | The value to add to the rate metric.                                                                                                                                                                  |
| tags      | object | Set of [tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) that will be tagged to the added data point (note that tags are added per data point and not for the entire metric). |

[Rate examples](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/rate#examples)
