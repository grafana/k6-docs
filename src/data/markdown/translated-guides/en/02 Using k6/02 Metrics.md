---
title: 'Metrics'
excerpt: 'This section covers the important aspect of metrics management in k6. How and what kind of metrics k6 collects automatically (_built-in_ metrics), and what custom metrics you can make k6 collect.'
---

_Metrics_ measure how a system performs under test conditions.
By default, k6 automatically collects built-in metrics.
Besides built-ins, you can also make custom metrics.

Metrics fall into four broad types:
- _Counters_ sum values.
- _Gauges_ track the smallest, largest, and latest values.
- _Rates_ track how frequently a non-zero value occurs.
- _Trends_  calculate statistics for multiple values (like mean or mode).

If you want to make a test fail a certain criteria, you can write [Threshold](/using-k6/thresholds) based on the metric criteria (the specifics of the expression depend on the test type.


| On this page...                                                        | Read about...                                                                  |
|------------------------------------------------------------------------|--------------------------------------------------------------------------------|
| [Create custom metrics](/using-k6/metrics/create-custom-metrics)       | How to build your own metric for each metric type                              |
| [Calculate metric timings](/using-k6/metrics/calculate-http-timings) | How to get timings from an individual request                                  |
| [Metrics reference](/using-k6/metrics/reference)                                   | Each built-in metric for each supported [protocol](/using-k6/protocols) |


## Metric graphs in Grafana cloud k6

If you use [Grafana cloud k6](https://grafana.com/docs/grafana-cloud/k6), you can access all test
metrics within the [Analysis Tab](/cloud/analyzing-results/analysis-tab).

You can use this tab to analyze, compare, and look for meaningful correlations in your test result data.

![k6 Cloud Analysis Tab](https://grafana.com/media/docs/k6/screenshot-grafana-cloud-http-request.png)


