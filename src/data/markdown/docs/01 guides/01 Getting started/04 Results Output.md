---
title: 'Results output'
excerpt: ''
---

`k6 run` has two different ways of showing the results of a load test. By default, we show an [aggregated summary report](/getting-started/results-output#end-of-test-summary-report) at the end of the test. This report is [customizable](/results-visualization/end-of-test-summary#handlesummary-callback), but by default features a general overview of all [groups](/using-k6/tags-and-groups#groups), [checks](/using-k6/checks) and [thresholds](/using-k6/thresholds) in the load test, as well as aggregated values for all [built-in](/using-k6/metrics#built-in-metrics) and [custom](/using-k6/metrics#custom-metrics) metrics used in the test run.

If the aggregated metric measurements are not enough and something more fine-grained is needed, k6 also supports streaming the raw metric values to one or more external outputs (e.g. [InfluxDB](/results-visualization/influxdb-+-grafana), [Kafka](/results-visualization/apache-kafka), [StatsD](/results-visualization/statsd), etc.) while the test is running. The raw results can also be sent to our managed [k6 cloud](/results-visualization/cloud) service (e.g. when you want to test an environment behind a firewall) and they can be exported as a [CSV](/results-visualization/csv) or [JSON](/results-visualization/json) file for later processing. All [supported built-in outputs are listed below](/getting-started/results-output#external-outputs).

## Standard output

![k6 results - console/stdout output](./images/k6-results-stdout.png)

When k6 displays the results to [`stdout`](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)), it will show the k6 logo and the following test information:

- Test details: general test information and load options.
- Progress bar: test status and how much time has passed.
- [Test summary](/results-visualization/end-of-test-summary): the test results (after test completion). Since k6 v0.30.0, it is possible to completely customize the output and redirect it to a file. It is also possible to save arbitrary files with machine-readable versions of the summary, like JSON, XML (e.g. JUnit, XUnit, etc.), or even nicely-formatted HTML reports meant for humans! For more details, see the [`handleSummary()` docs](/results-visualization/end-of-test-summary#handlesummary-callback).

### Test details

<CodeGroup labels={[]}>

```bash
  execution: local
     script: path/to/script.js
     output: -

  scenarios: (100.00%) 1 scenario, 50 max VUs, 5m30s max duration (incl. graceful stop):
           * default: Up to 50 looping VUs for 5m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)
```

</CodeGroup>

- `execution: local` shows the k6 execution mode (local or cloud).
- `output: -` is the [output](/getting-started/results-output#external-outputs) of the granular test results. By default, no output is used, only the aggregated [end-of-test summary](/results-visualization/end-of-test-summary) is shown.
- `script: path/to/script.js` shows the name of the script file that is being executed.
- `scenarios: ...` is a summary of the [scenarios](/using-k6/scenarios) that will be executed this test run and some overview information:
  - `(100.00%)` is the used [execution segment](/using-k6/options#execution-segment)
  - `50 max VUs` tells us up to how many [VUs (virtual users)](/misc/glossary#virtual-users) will be used across all scenarios.
  - `5m30s max duration` is the maximum time the script will take to run, including any [graceful stop](/using-k6/scenarios/graceful-stop) times.
- `* default: ...` describes the only scenario for this test run. In this case it's a scenario with a [ramping VUs executor](/using-k6/scenarios/executors/ramping-vus), specified via the [`stages` shortcut option](/using-k6/options#stages) instead of using the [`scenarios` long-form option](/using-k6/options#scenarios).

### End-of-test summary report

The [test summary](/results-visualization/end-of-test-summary) provides a general overview of your test results. By default, the summary prints to `stdout` the status of all:

- Aggregated values for the [built-in metrics](/using-k6/metrics#built-in-metrics) and [custom metrics](/using-k6/metrics#custom-metrics).
- [Checks](/using-k6/checks) and [thresholds](/using-k6/thresholds).
- [Groups](/using-k6/tags-and-groups#groups) and [tags](/using-k6/tags-and-groups#tags).

As of k6 v0.30.0, it's possible to completely customize the summary shown to `stdout`, redirect it to a file or `stderr`, or build and export your own completely custom report (e.g. HTML, JSON, JUnit/XUnit XML, etc.) via the new [`handleSummary()` callback](/results-visualization/end-of-test-summary#handlesummary-callback).


<CodeGroup labels={[]}>

```bash
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

</CodeGroup>

> To learn more about the metrics k6 collects and reports, read the [Metrics guide](/using-k6/metrics).

**Output of trend metrics**

[Trend metrics](/using-k6/metrics#metric-types) collect trend statistics (min/max/avg/percentiles) for a series of values. On stdout they are printed like this:

<CodeGroup labels={[]}>

```bash
http_req_duration..........: avg=143.14ms min=112.87ms med=136.03ms max=1.18s    p(90)=164.2ms  p(95)=177.75ms
```

</CodeGroup>

You could use the [`summaryTrendStats` option](/using-k6/options#summary-trend-stats) to change the stats reported for `Trend` metrics. You can also make k6 display time values with a fixed time unit (seconds, milliseconds or microseconds) via the [`summaryTimeUnit` option](/using-k6/options#summary-time-unit). And, as mentioned above, you can completely customize the whole report via the [`handleSummary()` callback](/results-visualization/end-of-test-summary#handlesummary-callback).

<CodeGroup labels={[]}>

```bash
$ k6 run --summary-trend-stats="min,avg,med,p(99),p(99.9),max,count" --summary-time-unit=ms  script.js
```

</CodeGroup>

### Summary export

Additionally, the `k6 run` command can export the end-of-test summary report to a JSON file that includes all of the data above. This is useful to get the aggregated test results in a machine-readable format, for integration with dashboards, external alerts, etc.

This was first possible in k6 v0.26.0 with the [`--summary-export` flag](/using-k6/options#summary-export), though its use is now discouraged (see why [here](/results-visualization/end-of-test-summary#summary-export-to-a-json-file)).

Instead, starting with k6 v0.30.0, the use of the [`handleSummary()` callback](/results-visualization/end-of-test-summary#handlesummary-callback) is recommended, since it allows completely customizing the end-of-test summary and exporting the summary report data in any desired format (e.g. JSON, CSV, XML (JUnit/xUnit/etc.), HTML, TXT, etc.).

## External outputs

If the aggregated [end-of-test summary](/results-visualization/end-of-test-summary) is insufficient, k6 can send more granular result data to different external outputs, to integrate and visualize k6 metrics on other platforms.

The available built-in outputs currently are:

| Plugin                                                        | Usage                   |
| ------------------------------------------------------------- | ----------------------- |
| [Amazon CloudWatch](/results-visualization/amazon-cloudwatch) | `k6 run --out statsd`   |
| [Apache Kafka](/results-visualization/apache-kafka)           | `k6 run --out kafka`    |
| [Cloud](/results-visualization/cloud)                         | `k6 run --out cloud`    |
| [CSV](/results-visualization/csv)                             | `k6 run --out csv`      |
| [Datadog](/results-visualization/datadog)                     | `k6 run --out datadog`  |
| [InfluxDB](/results-visualization/influxdb-+-grafana)         | `k6 run --out influxdb` |
| [JSON](/results-visualization/json)                           | `k6 run --out json`     |
| [New Relic](/results-visualization/new-relic)                 | `k6 run --out statsd`   |
| [StatsD](/results-visualization/statsd)                       | `k6 run --out statsd`   |

## Multiple outputs

You can simultaneously send metrics to several outputs by using the CLI `--out` flag multiple times, for example:

<CodeGroup labels={[]}>

```bash
$ k6 run \
    --out json=test.json \
    --out influxdb=http://localhost:8086/k6
```

</CodeGroup>
