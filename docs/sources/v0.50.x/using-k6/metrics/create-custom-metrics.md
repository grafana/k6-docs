---
title: Create custom metrics
description: How to build custom k6 metrics for each metric type.
weight: 200
---

# Create custom metrics

Besides the [built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference), you can create custom metrics.
For example, you can compute a metric for your business logic, or use the [Response.timings](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) object to create a metric for a specific set of endpoints.

Each metric type has a [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) to create a custom metric.
The constructor creates a metric object of the declared type. Each type has an `add` method to take metric measurements.

If you need help constructing a custom metric, read the following sections of this document.
They document the procedure and provide examples.
If you're comfortable with these already, you might prefer to read the [reference documentation for each metric constructor](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics).
Each topic has examples to make a custom metric and create [thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) from it.

## Create a custom metric

{{% admonition type="note" %}}

Custom metrics must be created in [init context](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).
This limits memory and ensures that k6 can validate that all thresholds are evaluating defined metrics.

{{% /admonition %}}

The generic procedure to create a custom metric is as follows:

1. Import the [`k6/metrics`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics) module. Optionally, specify the type of metrics you want to create with a named import:

   ```javascript
   import { Trend } from 'k6/metrics';
   ```

1. In init context, construct a new custom-metric object.

   For example, the following creates a custom trend. The object in the script is called `myTrend`, and its metric appears in the results output as `waiting_time`.

   ```javascript
   const myTrend = new Trend('waiting_time');
   ```

1. In the VU iteration code, use the `add` method to take a measurement.

## Example: create a trend metric for waiting time

This VU code makes a request then adds the timing value of the request to the `myTrend` object.

{{< code >}}

```javascript
import http from 'k6/http';
import { Trend } from 'k6/metrics';

const myTrend = new Trend('waiting_time');

export default function () {
  const r = http.get('https://httpbin.test.k6.io');
  myTrend.add(r.timings.waiting);
  console.log(myTrend.name); // waiting_time
}
```

{{< /code >}}

## View custom metric results

Custom metrics appear in [Results output](https://grafana.com/docs/k6/<K6_VERSION>/results-output) in both the end-of-test summary and in the granular data points.
Each metric type has specific aggregation methods.
You can also optionally [tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) any value for a custom metric.
You can use these tags to filter test results.

Here's how the output of the preceding script might look in the end-of-test summary.
Since the metric is a trend, k6 calculates various trends based on the number of values and their summation.

{{< code >}}

```bash
$ k6 run script.js

  ...
  INFO[0001] waiting_time                                  source=console

  ...
  iteration_duration.............: avg=1.15s    min=1.15s    med=1.15s    max=1.15s    p(90)=1.15s    p(95)=1.15s
  iterations.....................: 1     0.864973/s
  waiting_time...................: avg=265.245396 min=265.245396 med=265.245396 max=265.245396 p(90)=265.245396 p(95)=265.245396
```

{{< /code >}}

{{% admonition type="note" %}}

Custom metrics are collected from VU threads only at the end of a VU iteration.
For long-running scripts, custom metrics might appear only after the test runs a while.

{{% /admonition %}}

## Read more

The [`k6/metrics`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics) has examples for defining each type of custom metric, and for defining a threshold on the metric.

- [Counter](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/counter)
- [Gauge](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/gauge)
- [Rate](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/rate)
- [Trend](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/trend)
