---
title: Create custom metrics
description: How to build custom k6 metrics for each metric type.
---

Besides the [built-in metrics](/results-output/metrics-reference), you can create custom metrics.
For example, you can create some derived metrics from the built-in metrics, or you might use the [Response.timings](/javascript-api/k6-http/response) object to create a metric for a specific set of endpoints.

Each metric type has a [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) to create a custom metric.
The constructor creates a metric object of the declared type. Each type has methods to take metric measurements.

If you need help constructing a custom metric, read the following sections of this document.
They provide a walkthrough of the procedure, along with examples for each metric type.
If you're comfortable with these Javascript conventions already, you might prefer to read the [reference documentation for each metric constructor](/javascript-api/k6-metrics).
Each topic has examples to make a custom metric and create thresholds from it.

k6 reports custom metrics at the end of a load test, just like HTTP timings.

## Create a custom metric

The generic procedure to create a custom metric is as follows:

1. In [init context](/using-k6/test-lifecycle), construct a new custom-metric object.

  For example, the following creates a custom trend. The object in the script is called `myTrend`, and its metric appears in the results output as `waiting_time`.
  
   ```
   const myTrend = new Trend('waiting_time');
   ```

1. In the VU iteration code, use the `add` method to take a measurement.

For example, this VU code makes a request, then adds the timing value of the request to the `myTrend` object.
 

<CodeGroup lineNumbers={[true]}>

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

</CodeGroup>

Custom metrics appear in both the end-of-test summary and in the granular points of the [Results output](/results-output).
Here's how the output of the preceding script might look. Since the metric is a trend, k6 calculates various trends based on the number of values and their summation.

  <CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  INFO[0001] waiting_time                                  source=console

  ...
  iteration_duration.............: avg=1.15s    min=1.15s    med=1.15s    max=1.15s    p(90)=1.15s    p(95)=1.15s
  iterations.....................: 1     0.864973/s
  waiting_time...................: avg=265.245396 min=265.245396 med=265.245396 max=265.245396 p(90)=265.245396 p(95)=265.245396
```

</CodeGroup>

You can optionally [tag](/using-k6/tags-and-groups) any value for a custom metric.
This can be useful when analyzing test results.

<Blockquote mod="note" title="">

Custom metrics are collected from VU threads only at the end of a VU iteration.
For long-running scripts, custom metrics might appear only after the test runs a while.

</Blockquote>

## Examples for each type
### Create a counter

This counter metric is a _cumulative metric_

<CodeGroup lineNumbers={[true]}>

```javascript
import { Counter } from 'k6/metrics';

const myCounter = new Counter('my_counter');

export default function () {
  myCounter.add(1);
  myCounter.add(2);
}
```

</CodeGroup>

The preceding code generates something like the following output:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=16.48µs min=16.48µs med=16.48µs max=16.48µs p(90)=16.48µs p(95)=16.48µs
  iterations...........: 1   1327.67919/s
  my_counter...........: 3   3983.037571/s
```

</CodeGroup>

If you run the script for one iteration&mdash;without specifying `--iterations` or `--duration`&mdash;the value of `my_counter` will be three.

Note that there is currently no way to access the value of any custom metric from within JavaScript.
Note also that counters that have a value of zero (`0`) at the end of a test are a special case.
They will _NOT_ print to the stdout summary.

### Create a gauge

This metric keeps the minimum, maximum, and latest values.

<CodeGroup lineNumbers={[true]}>

```javascrip            t
import { Gauge } from 'k6/metrics';

const myGauge = new Gauge('my_gauge');

export default function () {
  myGauge.add(3);
  myGauge.add(1);
  myGauge.add(2);
}
```

</CodeGroup>

The preceding code results in output like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=21.74µs min=21.74µs med=21.74µs max=21.74µs p(90)=21.74µs p(95)=21.74µs
  iterations...........: 1   1293.475322/s
  my_gauge.............: 2   min=1         max=3
```

</CodeGroup>

The value of `my_gauge` will be 2 at the end of the test.
As with the Counter metric, a Gauge with a value of zero (`0`) will *NOT* be printed to the `stdout` summary at the end of the test.

### Create a trend 

This custom trend collects trend statistics (min/max/avg/percentiles) for a series of values.

<CodeGroup lineNumbers={[true]}>

```javascript
import { Trend } from 'k6/metrics';

const myTrend = new Trend('my_trend');

export default function () {
  myTrend.add(1);
  myTrend.add(2);
}
```

</CodeGroup>

The preceding code outputs something like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=20.78µs min=20.78µs med=20.78µs max=20.78µs p(90)=20.78µs p(95)=20.78µs
  iterations...........: 1   1217.544821/s
  my_trend.............: avg=1.5     min=1       med=1.5     max=2       p(90)=1.9     p(95)=1.95
```

</CodeGroup>

A _trend metric_ holds a set of sample values, which it can output statistics about (min, max, average, median, or percentiles).
By default, k6 prints `average`, `min`, `max`, `median`, `90th percentile`, and `95th percentile`.

### Create a rate 

This custom rate keeps track of the percentage of values in a series that are non-zero.

<CodeGroup lineNumbers={[true]}>

```javascript
import { Rate } from 'k6/metrics';

const myRate = new Rate('my_rate');

export default function () {
  myRate.add(true);
  myRate.add(false);
  myRate.add(1);
  myRate.add(0);
}
```
    
</CodeGroup>

The preceding code outputs something like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
  iteration_duration...: avg=22.12µs min=22.12µs med=22.12µs max=22.12µs p(90)=22.12µs p(95)=22.12µs
  iterations...........: 1      1384.362792/s
  my_rate..............: 50.00% ✓ 2           ✗ 2
```

</CodeGroup>

The value of `my_rate` at the end of the test will be 50%, indicating that half of the values added to the metric were non-zero.

