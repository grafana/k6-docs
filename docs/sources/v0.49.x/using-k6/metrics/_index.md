---
title: 'Metrics'
description: 'This section covers the important aspect of metrics management in k6. How and what kind of metrics k6 collects automatically (_built-in_ metrics), and what custom metrics you can make k6 collect.'
weight: 02
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

{{% admonition type="note" %}}

In other terminology, these metrics measure traffic (in requests), availability (in error rate), and latency (in request duration).
SREs might recognize these metrics as three of the [four Golden Signals](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals).

{{% /admonition %}}

## Example output

An aggregated summary of all _built-in_ and custom metrics outputs to `stdout` when you run a test:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test-api.k6.io/');
}
```

{{< /code >}}

The preceding script outputs something like this:

{{< code >}}

```bash
$ k6 run script.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: http_get.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m03.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m03.8s/10m0s  1/1 iters, 1 per VU

     data_received..................: 22 kB 5.7 kB/s
     data_sent......................: 742 B 198 B/s
     http_req_blocked...............: avg=1.05s    min=1.05s    med=1.05s    max=1.05s    p(90)=1.05s    p(95)=1.05s
     http_req_connecting............: avg=334.26ms min=334.26ms med=334.26ms max=334.26ms p(90)=334.26ms p(95)=334.26ms
     http_req_duration..............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
       { expected_response:true }...: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_req_failed................: 0.00% ✓ 0        ✗ 1
     http_req_receiving.............: avg=112.41µs min=112.41µs med=112.41µs max=112.41µs p(90)=112.41µs p(95)=112.41µs
     http_req_sending...............: avg=294.48µs min=294.48µs med=294.48µs max=294.48µs p(90)=294.48µs p(95)=294.48µs
     http_req_tls_handshaking.......: avg=700.6ms  min=700.6ms  med=700.6ms  max=700.6ms  p(90)=700.6ms  p(95)=700.6ms
     http_req_waiting...............: avg=2.7s     min=2.7s     med=2.7s     max=2.7s     p(90)=2.7s     p(95)=2.7s
     http_reqs......................: 1     0.266167/s
     iteration_duration.............: avg=3.75s    min=3.75s    med=3.75s    max=3.75s    p(90)=3.75s    p(95)=3.75s
     iterations.....................: 1     0.266167/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1
```

{{< /code >}}

In that output, all the metrics that start with `http`, `iteration`, and `vu` are _built-in_ metrics, which get written to stdout at the end of a test.
For details of all metrics, refer to the [Metrics reference](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference).

## Metric name restrictions

Metric names must comply with OpenTelemetry and [Prometheus limitations](https://prometheus.io/docs/concepts/data_model/#metric-names-and-labels). The character limit is the same limit k6 had before restricting the character set down.

That means metrics names must:

- Include up to 128 symbols (ASCII letters, numbers, or underscores).
- Start with a letter or an underscore.
