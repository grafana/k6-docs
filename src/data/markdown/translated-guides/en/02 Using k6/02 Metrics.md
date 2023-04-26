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

## Built-in metrics

The _built-in_ metrics output to `stdout` when you run the simplest possible k6 test:

<CodeGroup lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test-api.k6.io/');
}
```

</CodeGroup>

Running the preceding script outputs something like this:

<CodeGroup labels={["output"]} lineNumbers={[false]}>

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

</CodeGroup>

In that output, all the metrics that start with `http`, `iteration`, and `vu` are _built-in_ metrics, which get written to stdout at the end of a test.

k6 always collects the following built-in metrics:

| Metric Name        | Type    | Description                                                                                                                                                                                                                                                   |
|--------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| vus                | Gauge   | Current number of active virtual users                                                                                                                                                                                                                        |
| vus_max            | Gauge   | Max possible number of virtual users (VU resources are pre-allocated, ensuring performance will not be affected when scaling up the load level)                                                                                                              |
| iterations         | Counter | The aggregate number of times the VUs executed the JS script (the `default` function).                                                                                                                                                                        |
| iteration_duration | Trend   | The time it took to complete one full iteration, including time spent in `setup` and `teardown`. To calculate the duration of the iteration's function for the specific scenario, [try this workaround](/using-k6/workaround-to-calculate-iteration_duration) |
| dropped_iterations | Counter | The number of iterations that weren't started due to lack of VUs (for the arrival-rate executors) or lack of time (expired maxDuration in the iteration-based executors). [About dropped iterations](/using-k6/scenarios/concepts/dropped-iterations/)                                                                             |
| data_received      | Counter | The amount of received data. [This example covers how to track data for an individual URL](/examples/track-transmitted-data-per-url).                                                                                                                         |
| data_sent          | Counter | The amount of data sent. [Track data for an individual URL](/examples/track-transmitted-data-per-url) to track data for an individual URL.                                                                                                                                   |
| checks             | Rate    | The rate of successful checks.                                                                                                                                                                                                                                |

## HTTP-specific built-in metrics

These metrics are generated only when the test makes HTTP requests.

<Blockquote mod="note" title="">

For all `http_req_*` metrics, **the timestamp is emitted the end of the request.**
In other words, the timestamp happens when k6 receives the end of the response body, or the request times out.

</Blockquote>


| Metric Name              | Type    | Description                                                                                                                                                                                                                                  |
|--------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| http_reqs                | Counter | How many total HTTP requests k6 generated.                                                                                                                                                                                                   |
| http_req_blocked         | Trend   | Time spent blocked (waiting for a free TCP connection slot) before initiating the request. `float`                                                                                                                                           |
| http_req_connecting      | Trend   | Time spent establishing TCP connection to the remote host. `float`                                                                                                                                                                           |
| http_req_tls_handshaking | Trend   | Time spent handshaking TLS session with remote host                                                                                                                                                                                          |
| http_req_sending         | Trend   | Time spent sending data to the remote host. `float`                                                                                                                                                                                          |
| http_req_waiting         | Trend   | Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). `float`                                                                                                                                           |
| http_req_receiving       | Trend   | Time spent receiving response data from the remote host. `float`                                                                                                                                                                             |
| http_req_duration        | Trend   | Total time for the request. It's equal to `http_req_sending + http_req_waiting + http_req_receiving` (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). `float` |
| http_req_failed          | Rate    | The rate of failed requests according to [setResponseCallback](/javascript-api/k6-http/setresponsecallback).                                                                                                                        |
|                          |         |                                                                                                                                                                                                                                              |

### Accessing HTTP timings from a script

To access the timing information from an individual HTTP request, the [Response.timings](/javascript-api/k6-http/response) object provides the time spent on the various phases in `ms`:

- blocked: equals to `http_req_blocked`.
- connecting: equals to `http_req_connecting`.
- tls_handshaking: equals to `http_req_tls_handshaking`.
- sending: equals to  `http_req_sending`.
- waiting: equals to `http_req_waiting`.
- receiving: equals to `http_req_receiving`.
- duration: equals to `http_req_duration`.

<CodeGroup lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('http://httpbin.test.k6.io');
  console.log('Response time was ' + String(res.timings.duration) + ' ms');
}
```

</CodeGroup>

The expected (partial) output looks like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  INFO[0001] Response time was 337.962473 ms               source=console
```

</CodeGroup>

## Custom metrics

You can also create custom metrics.
They are reported at the end of a load test, just like HTTP timings:

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

The preceding code creates a Trend metric called `waiting_time`.
In the code, it's referred to with the variable name `myTrend`.

Custom metrics are reported at the end of a test.
Here's how the output might look:

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


## Metric types

All metrics (both built-in and custom) have a _type_. The four different metric types in k6 are:

| Metric type                                   | Description                                                                                              |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Counter](/javascript-api/k6-metrics/counter) | A metric that cumulatively sums added values.                                                            |
| [Gauge](/javascript-api/k6-metrics/gauge)     | A metric that stores the min, max and last values added to it.                                           |
| [Rate](/javascript-api/k6-metrics/rate)       | A metric that tracks the percentage of added values that are non-zero.                                   |
| [Trend](/javascript-api/k6-metrics/trend)     | A metric that allows for calculating statistics on the added values (min, max, average and percentiles). |


### Counter _(cumulative metric)_

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

### Gauge _(keep the latest value only)_

<CodeGroup lineNumbers={[true]}>

```javascript
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

### Trend _(collect trend statistics (min/max/avg/percentiles) for a series of values)_

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

### Rate _(keeps track of the percentage of values in a series that are non-zero)_

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

The value of `my_rate` at the end of the test will be 50%, indicating that half of the values
added to the metric were non-zero.

## Metric graphs in k6 Cloud Results

If you use [k6 Cloud Results](/cloud/analyzing-results/overview), you can access all test
metrics within the [Analysis Tab](/cloud/analyzing-results/analysis-tab).
You can use this tab to analyze, compare, and look for meaningful correlations in your test result data.

![k6 Cloud Analysis Tab](images/Metrics/cloud-insights-analysis-tab.png)


