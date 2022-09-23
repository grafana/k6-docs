---
title: 'Results output'
excerpt: 'For basic tests, the top-level summary that k6 provides might be enough. For detailed analysis, you can stream all data your test outputs to an external source.'
---

As k6 starts generating load, it also starts generating _metrics_.
These metrics provide quantitative data to help you interpret test results.

k6 generates many metrics about the load that your test generates and about how the system under test (SUT) responds to this load.
Broadly, you can analyze metrics in two ways:
- As summary statistics, in an _end-of-test-summary_ report.
- As _time-series data_, in granular, point-by-point detail

![A diagram of the two broad ways to handle results: aggregated and granular](./images/k6-results-diagram.png)

These are the essential elements of k6 test results: metrics, summary output, and granular time series. 

<DescriptionList>

Metrics
: Measurements that k6 generates throughout the test.
: For example, you can use the `http_req_duration` metric to measure end-to-end latency.

End-of-test-summary report
: The default report that k6 prints to `stdout` at the end of the test, with aggregated statistics for each metric.
: For example, the report shows the 95th percentile of all `http_req_duration` values.

Time-series data
: The granular metrics generated throughout the test (often for each request).
: You can stream these metrics to an external service, write them to a file, or both.
: For example, you could look at the `http_req_duration` for any request in the entire test in a JSON file or on a Grafana dashboard.

</DescriptionList>

You can customize almost every aspect of k6 result output:
- You can create your custom metrics
- You can configure new summary statistics, and print them to not only `stdout` but also as HTML, JSON, or any text format.
- You can stream the results to one or multiple of the services of your choice.

## Built-in and custom metrics

**Documentation:** [Using metrics](/using-k6/metrics)

k6 comes with a built-in set of metrics about the load generated and about the system response.
Key metrics include:
- `iterations`, the total number of iterations
- `http_req_failed`, the total number of failed requests
- `http_req_duration`, the end-to-end time of all requests (that is, the total latency)
   - `expected_response:true`, the end-to-end time of successful requests (failed requests often have faster responses)

You can also use [_checks_](/using-k6/checks) to make metrics from any boolean expression.
For example, you can check that a response body has a certain text string.

### Applications of metrics

You can do further operations on metrics to build your analysis and test logic.
For example, you can derive [custom metrics](/using-k6/metrics/#custom-metrics) from any default metric type, be it a trend, rate, count, or gauge (that is, a maximum value).

Another useful application of metrics is in combination with [_thresholds_](/using-k6/thresholds).
With thresholds, you can use metrics to set performance goals and abort the test when performance degrades beyond the threshold point.
For example, this threshold aborts a test once the p99 duration value crosses 3000 milliseconds.

<CodeGroup labels={["latency-exceeds-3000.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_duration: ['p(99)<200'], // 99% of requests should be below 200ms
  },
};
```

</CodeGroup>

## End-of-test-summary report

**Documentation**: [End-of-test-summary report](results-visualization/end-of-test-summary/)

By default, k6 prints summarized results to `stdout`.

When you run a test, k6 outputs a plain-text logo, your test progress, and some test details.
After the test finishes, k6 prints the full details and summary statistics of the test metrics.

![k6 results - console/stdout output](./images/k6-results-stdout.png)

The end-of-test-summary shows aggregated statistical values for your result metrics, including:
- Median and average values
- Minimum and maximum values
- p90, p95, and p99 values

If this default report is unsuitable,
you can change the time units, display different aggregated statistics, or make an entirely new report in any format that you want.

### Change time units and summary stats

To configure the aggregated metrics in an end-of-test summary, use the [`--summary-trend-stats`](https://k6.io/docs/using-k6/k6-options/reference#summary-trend-stats) option.
For example, you might need more precise p-values.
This command limits the stats to only p99 and p99.9 values.

```sh
k6 run --summary-trend-stats="med,p(95),p(99.9)" ./script.js
```

To change the unit of time, use the [`--summary-time-unit`](/using-k6/k6-options/reference#summary-time-unit) option.
For example, this command displays the end-of-test values in milliseconds instead of seconds:

```sh
k6 run --summary-time-unit="ms" ./script.js
```

Putting these options together, this command creates a more compact summary, with more precise p-values and time units.
Use the tab to compare the configured output with the default output.

```sh
k6 run --iterations=100 --vus=10 \
--summary-trend-stats="med,p(95),p(99.9)" --summary-time-unit="ms" script.js
```

<CodeGroup labels={["Configured summary", "default summary"]} lineNumbers={[]} showCopyButton={[true]}>

```txt
default ✓ [======================================] 10 VUs  00m14.1s/10m0s  100/100 shared iters

     data_received..................: 1.2 MB 86 kB/s
     data_sent......................: 13 kB  939 B/s
     http_req_blocked...............: med=0.01ms    p(95)=571.30ms  p(99.9)=571.68ms
     http_req_connecting............: med=0.00ms    p(95)=269.12ms  p(99.9)=269.99ms
     http_req_duration..............: med=228.87ms  p(95)=482.99ms  p(99.9)=551.53ms
       { expected_response:true }...: med=228.87ms  p(95)=482.99ms  p(99.9)=551.53ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 100
     http_req_receiving.............: med=0.16ms    p(95)=215.87ms  p(99.9)=236.51ms
     http_req_sending...............: med=0.04ms    p(95)=0.07ms    p(99.9)=0.09ms
     http_req_tls_handshaking.......: med=0.00ms    p(95)=234.77ms  p(99.9)=235.20ms
     http_req_waiting...............: med=227.52ms  p(95)=296.55ms  p(99.9)=548.41ms
     http_reqs......................: 100    7.115226/s
     iteration_duration.............: med=1229.85ms p(95)=1856.70ms p(99.9)=1857.05ms
     iterations.....................: 100    7.115226/s
     vus............................: 1      min=1      max=10
     vus_max........................: 10     min=10     max=10
```

```sh
default ✓ [======================================] 10 VUs  00m13.3s/10m0s  100/100 shared iters

     data_received..................: 1.2 MB 90 kB/s
     data_sent......................: 13 kB  990 B/s
     http_req_blocked...............: avg=58.96ms  min=2.58µs   med=11.36µs  max=590.12ms p(90)=58.97ms  p(95)=589.38ms
     http_req_connecting............: avg=25.51ms  min=0s       med=0s       max=255.49ms p(90)=25.48ms  p(95)=255.1ms
     http_req_duration..............: avg=248.25ms min=181.43ms med=229.2ms  max=448.18ms p(90)=272.74ms p(95)=427.82ms
       { expected_response:true }...: avg=248.25ms min=181.43ms med=229.2ms  max=448.18ms p(90)=272.74ms p(95)=427.82ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 100
     http_req_receiving.............: avg=16.3ms   min=28.85µs  med=182.57µs max=230.11ms p(90)=373.79µs p(95)=197.37ms
     http_req_sending...............: avg=47.81µs  min=9µs      med=48.16µs  max=119.64µs p(90)=59.36µs  p(95)=71.44µs
     http_req_tls_handshaking.......: avg=24.9ms   min=0s       med=0s       max=249.63ms p(90)=24.82ms  p(95)=249.02ms
     http_req_waiting...............: avg=231.9ms  min=181.2ms  med=228.85ms max=429.25ms p(90)=268.52ms p(95)=271.77ms
     http_reqs......................: 100    7.497907/s
     iteration_duration.............: avg=1.3s     min=1.18s    med=1.23s    max=1.86s    p(90)=1.48s    p(95)=1.86s
     iterations.....................: 100    7.497907/s
     vus............................: 5      min=5      max=10
     vus_max........................: 10     min=10     max=10

```

</CodeGroup>

<Blockquote mod="note" title="">

The preceding example uses multiple iterations and VUs so that the trend metrics have different values.
With a single iteration and VU, the min, max, median, average, and p values would all be the same.

</Blockquote>

### Customize reports with `handleSummary()` function

If you want to make your own report, use the `handleSummary()` function.

The `handleSummary()` function takes a single argument.
When the test finishes, k6 runs `handleSummary()`, passing the summary-metrics object as the function argument.

You can send data to `stdout`, `stderr`, or any file.

To try `handleSummary()`, paste this function at the end of your script:

<CodeGroup labels={["trivial-summary.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
export function handleSummary(data) {
  const med_latency = data.metrics.iteration_duration.values.med;

  return {
    'stdout': med_latency.toString(),
    'summary.json': JSON.stringify(data), // and a JSON with all the details...
  };
}
```

</CodeGroup>

This is just an example, and its behavior is quite trivial:
- It prints only the median value of the test `iteration_duration` metric.
- It prints all summary statistics to a file at `summary.json`

Admittedly, printing a single value isn't very useful, so open up `summary.json` to see the summary data.
You can manipulate this summary data object into any report you want, then write it to a file.
For example, the community project [k6 reporter](https://github.com/benc-uk/k6-reporter) uses `handleSummary()` to make an HTML report from your k6 summary metrics.

## External outputs

The condensed [end-of-test summary](/results-visualization/end-of-test-summary) is good for a top-level view of the test.
For deeper analysis, you need to look at granular time-series data.

You can integrate and visualize k6 metrics on other platforms.
You can also write every metric to a file, and analyze them in the program of your choice.

To send granular results data to an external output, use the `--out` flag.

<CodeGroup labels={[]}>

```bash
$ k6 run --out statsd script.js
```

</CodeGroup>

The available built-in outputs are:

<Glossary>

- [Amazon CloudWatch](/results-visualization/amazon-cloudwatch)
- [Cloud](/results-visualization/cloud)
- [CSV](/results-visualization/csv)
- [Datadog](/results-visualization/datadog)
- [Grafana Cloud / Prometheus](/results-visualization/grafana-cloud)
- [InfluxDB](/results-visualization/influxdb-+-grafana)
- [JSON](/results-visualization/json)
- [Netdata](/results-visualization/netdata)
- [New Relic](/results-visualization/new-relic)
- [Prometheus](/results-visualization/prometheus)
- [TimescaleDB](/results-visualization/timescaledb)
- [StatsD](/results-visualization/statsd)

</Glossary>

### Multiple outputs

You can also send metrics simultaneously to several outputs.
To do so, set separate arguments for multiple CLI `--out` flags.

<CodeGroup labels={[]}>

```bash
$ k6 run \
--out json=test.json \
--out influxdb=http://localhost:8086/k6
```

</CodeGroup>
