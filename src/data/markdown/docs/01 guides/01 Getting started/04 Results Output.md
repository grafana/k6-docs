---
title: 'Results output'
excerpt: ''
---

By default, the `k6 run` command prints runtime information and general results to `stdout`.

## Standard output

![k6 results - console/stdout output](/images/k6-results-stdout.png)

When k6 displays the results to `stdout`, it will show the k6 logo and the following test information:

- Test details: general test information and load options.
- Progress bar: test status and how much time has passed.
- Test summary: the test results (after test completion).

### Test details

<div class="code-group" data-props='{"labels": []}'>

```shell
execution: local
    output: -
    script: script.js

duration: 1m0s, iterations: -
    vus: 100,  max: 100
```

</div>

- `execution: local` the k6 execution mode (local or cloud).
- `output: -` the output of the test results. The default is `stdout`.
- `script: script.js` shows the name of the script that is being executed.
- `duration: 1m0s` the test run [duration](/using-k6/options#duration).
- `iterations: -` the total number of VU [iterations](https://k6.io/docs/using-k6/options#iterations).
- `vus: 100` the initial number of VUs that test will start running.
- `max: 100` the maximun number of VUs that the test will scale.

### Test summary

The test summary provides a general overview of your test result. The summary prints to `stdout` the status of:

- [Built-in metrics](/using-k6/metrics#built-in-metrics) and [custom metrics](/using-k6/metrics#custom-metrics).
- [Checks](/using-k6/checks) and [thresholds](/using-k6/thresholds).
- [Groups](/using-k6/tags-and-groups#groups) and [tags](/using-k6/tags-and-groups#tags).

<div class="code-group" data-props='{"labels": []}'>

```shell
data_received..............: 148 MB 2.5 MB/s
data_sent..................: 1.0 MB 17 kB/s
http_req_blocked...........: avg=1.92ms   min=1µs      med=5µs      max=288.73ms p(90)=11µs     p(95)=17µs
http_req_connecting........: avg=1.01ms   min=0s       med=0s       max=166.44ms p(90)=0s       p(95)=0s
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
http_req_receiving.........: avg=5.53ms   min=49µs     med=2.11ms   max=1.01s    p(90)=9.25ms   p(95)=11.8ms
http_req_sending...........: avg=30.01µs  min=7µs      med=24µs     max=1.89ms   p(90)=48µs     p(95)=63µs
http_req_tls_handshaking...: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...........: avg=137.57ms min=111.44ms med=132.59ms max=589.4ms  p(90)=159.95ms p(95)=169.41ms
http_reqs..................: 13491  224.848869/s
iteration_duration.........: avg=445.48ms min=413.05ms med=436.36ms max=1.48s    p(90)=464.94ms p(95)=479.66ms
iterations.................: 13410  223.498876/s
vus........................: 100    min=100 max=100
vus_max....................: 100    min=100 max=100
```

</div>

> To learn more about the metrics k6 collects and reports, read the [Metrics guide](/using-k6/metrics).

**Output of trend metrics**

[Trend metrics](/using-k6/metrics#metric-types) collect trend statistics (min/max/avg/percentiles) for a series of values. On stdout they are printed like this:

<div class="code-group" data-props='{"labels": []}'>

```shell
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
```

</div>

You could use the [summary-trend-stats](/using-k6/options#summary-trend-stats) option to change the stats reported for Trend metrics.

<div class="code-group" data-props='{"labels": []}'>

```shell
$ k6 run --summary-trend-stats="avg,p(99)" script.js
```

</div>

## Output plugins

k6 can send more granular result data to different outputs to integrate and visualize k6 metrics on other platforms.

The list of output plugins are:

| Plugin                                                | Usage                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Apache Kafka](/results-visualization/apache-kafka)   | `k6 run --out kafka`                                                            |
| [Cloud](/results-visualization/cloud)                 | `k6 run --out cloud`                                                            |
| [CSV](/results-visualization/csv)                     | `k6 run --out csv`                                                              |
| [Datadog](/results-visualization/datadog)             | `k6 run --out datadog`                                                          |
| [InfluxDB](/results-visualization/influxdb-+-grafana) | `k6 run --out influxdb`                                                         |
| [JSON](/results-visualization/json)                   | `k6 run --out json`                                                             |
| [StatsD](/results-visualization/statsd)               | `k6 run --out statsd`                                                           |
| [New Relic](/results-visualization/new-relic)         | `k6 run --out statsd`, see [page](/results-visualization/new-relic) for details |

## Multiple outputs

You can simultaneously send metrics to several outputs by using the CLI `--out` flag multiple times, for example:

<div class="code-group" data-props='{"labels": []}'>

```shell
$ k6 run \
    --out json=test.json \
    --out influxdb=http://localhost:8086/k6
```

</div>

## Summary export

Additionally, the `k6 run` command can export the end-of-test summary report to a JSON file that includes data for all test metrics, checks and thresholds.

This is useful to get the aggregated test results in a machine-readable format, for integration with dashboards, external alerts, etc.

<div class="code-group" data-props='{"labels": [] }'>

```shell
$ k6 run --summary-export=export.json script.js
```

</div>

> Read more about the summary on the [JSON plugin documentation](/results-visualization/json#summary-export)
