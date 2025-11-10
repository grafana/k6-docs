---
title: 'Metrics'
description: 'This section covers the important aspect of metrics management in k6. How and what kind of metrics k6 collects automatically (_built-in_ metrics), and what custom metrics you can make k6 collect.'
weight: 300
---

# Metrics

_Metrics_ measure how a system performs under test conditions.
By default, k6 automatically collects built-in metrics.
Besides built-ins, you can also make custom metrics.

Metrics fall into four broad types:

- **Counters** sum values.
- **Gauges** track the smallest, largest, and latest values.
- **Rates** track how frequently a non-zero value occurs.
- **Trends** calculates statistics for multiple values (like mean, mode or percentile).

To make a test fail a certain criteria, you can write a [Threshold](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) based on the metric criteria (the specifics of the expression depend on the metric type).
To filter metrics, you can use [Tags and groups](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).
You can also export metrics in various summary and granular formats, as documented in [Results output](https://grafana.com/docs/k6/<K6_VERSION>/results-output).

| On this page...                                                                                          | Read about...                                                                                                   |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference)                  | Each built-in metric for each supported [protocol](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols) |
| [Create custom metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics) | How to build your own metric for each metric type                                                               |

## What metrics to look at?

Each metric provides a different perspective on performance.
So the best metric for your analysis depends on your goals.

However, if you're unsure about the metrics to focus on, you can start with the metrics that measure the requests, errors, and duration (the criteria of the [RED method](https://grafana.com/blog/2018/08/02/the-red-method-how-to-instrument-your-services/)).

- `http_reqs`, to measure requests
- `http_req_failed`, to measure error rate
- `http_req_duration`, to measure duration

{{< admonition type="note" >}}

In other terminology, these metrics measure traffic (in requests), availability (in error rate), and latency (in request duration).
SREs might recognize these metrics as three of the [four Golden Signals](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals).

{{< /admonition >}}

## Example output

An aggregated summary of all _built-in_ and custom metrics outputs to `stdout` when you run a test:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://quickpizza.grafana.com');
}
```

{{< /code >}}

The preceding script outputs something like this:

{{< code >}}

```bash
$ k6 run script.js

         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/


  execution: local
     script: http_get.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ TOTAL RESULTS

    HTTP
    http_req_duration.......................................................: avg=117.55ms min=117.55ms med=117.55ms max=117.55ms p(90)=117.55ms p(95)=117.55ms
      { expected_response:true }............................................: avg=117.55ms min=117.55ms med=117.55ms max=117.55ms p(90)=117.55ms p(95)=117.55ms
    http_req_failed.........................................................: 0.00%  0 out of 1
    http_reqs...............................................................: 1      2.768749/s

    EXECUTION
    iteration_duration......................................................: avg=361.09ms min=361.09ms med=361.09ms max=361.09ms p(90)=361.09ms p(95)=361.09ms
    iterations..............................................................: 1      2.768749/s

    NETWORK
    data_received...........................................................: 6.8 kB 19 kB/s
    data_sent...............................................................: 541 B  1.5 kB/s

running (00m03.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m03.8s/10m0s  1/1 iters, 1 per VU
```

{{< /code >}}

In that output, all the metrics that start with `http`, `iteration`, and `vu` are _built-in_ metrics, which get written to stdout at the end of a test.
For details of all metrics, refer to the [Metrics reference](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference).

## Metric name restrictions

Metric names must comply with OpenTelemetry and [Prometheus limitations](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). The character limit is the same limit k6 had before restricting the character set down.

That means metrics names must:

- Include up to 128 symbols (ASCII letters, numbers, or underscores).
- Start with a letter or an underscore.
