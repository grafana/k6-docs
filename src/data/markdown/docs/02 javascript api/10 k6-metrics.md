---
title: 'k6/metrics'
excerpt: 'k6 Custom Metrics API'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-metrics/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-metrics/
---

The metrics module provides functionality to [create custom metrics](/using-k6/metrics/create-custom-metrics) of various types.
All metrics (both the [built-in metrics](/using-k6/metrics/reference) and the custom ones) have a type.

You can optionally [tag](/using-k6/tags-and-groups) all values added to a custom metric, which can be useful when analysing the test results.

| Metric type                                   | Description                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Counter](/javascript-api/k6-metrics/counter) | A metric that cumulatively sums added values.                                                            |
| [Gauge](/javascript-api/k6-metrics/gauge)     | A metric that stores the min, max and last values added to it.                                           |
| [Rate](/javascript-api/k6-metrics/rate)       | A metric that tracks the percentage of added values that are non-zero.                                   |
| [Trend](/javascript-api/k6-metrics/trend)     | A metric that calculates statistics on the added values (min, max, average, and percentiles). |
