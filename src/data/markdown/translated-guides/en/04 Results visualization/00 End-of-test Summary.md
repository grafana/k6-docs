---
title: 'End-of-test summary'
excerpt: 'By default, k6 prints a summary report containing the aggregated results at the end of the test. The handleSummary callback allows the report to be completely customized, including the generation and saving of JSON, HTML, XML (e.g. JUnit), etc. reports to files.'
---

By default, at the end of every local test run, k6 prints a summary report to `stdout` that contains a general overview of your test results. It includes aggregated values for all [built-in](/using-k6/metrics#built-in-metrics) and [custom](/using-k6/metrics#custom-metrics) metrics and sub-metrics, [thresholds](/using-k6/thresholds), [groups](/using-k6/tags-and-groups#groups), and [checks](/using-k6/checks). It can look somewhat like this:

<CodeGroup labels={[]}>

```
     ✓ http2 is used
     ✓ status is 200
     ✓ content is present

     █ Static Assets

       ✓ status is 200
       ✓ reused connection

   ✓ check_failure_rate.........: 0.00%   ✓ 0     ✗ 6708
     checks.....................: 100.00% ✓ 16770 ✗ 0
     data_received..............: 94 MB   308 kB/s
     data_sent..................: 1.6 MB  5.2 kB/s
     group_duration.............: min=134.4ms  avg=177.67ms med=142.75ms p(95)=278.26ms p(99)=353.49ms p(99.99)=983.84ms max=1.01s
     http_req_blocked...........: min=947ns    avg=1.66ms   med=2.37µs   p(95)=4.65µs   p(99)=38.98µs  p(99.99)=620.34ms max=811.88ms
     http_req_connecting........: min=0s       avg=536.83µs med=0s       p(95)=0s       p(99)=0s       p(99.99)=208.81ms max=232.16ms
   ✓ http_req_duration..........: min=131.44ms avg=150.63ms med=138.13ms p(95)=269.81ms p(99)=283.83ms p(99.99)=982.76ms max=1.01s
     ✗ { staticAsset:yes }......: min=131.44ms avg=153.09ms med=138.2ms  p(95)=271.34ms p(99)=284.22ms p(99.99)=1.01s    max=1.01s
     http_req_receiving.........: min=33.36µs  avg=2.66ms   med=180.36µs p(95)=2.4ms    p(99)=128.79ms p(99.99)=205.16ms max=205.45ms
     http_req_sending...........: min=6.09µs   avg=44.92µs  med=35.77µs  p(95)=98.26µs  p(99)=148.49µs p(99.99)=1.09ms   max=5.53ms
     http_req_tls_handshaking...: min=0s       avg=1.12ms   med=0s       p(95)=0s       p(99)=0s       p(99.99)=447.46ms max=614.35ms
     http_req_waiting...........: min=131.3ms  avg=147.92ms med=137.57ms p(95)=267.49ms p(99)=282.23ms p(99.99)=982.55ms max=1.01s
     http_reqs..................: 13416   44.111343/s
     iteration_duration.........: min=2.28s    avg=3.83s    med=3.82s    p(95)=5.2s     p(99)=5.36s    p(99.99)=6.1s     max=6.18s
     iterations.................: 3354    11.027836/s
     vus........................: 1       min=1   max=50
     vus_max....................: 50      min=50  max=50
```

</CodeGroup>

## Summary options

A few options can affect how this report behaves:
- The [`--summary-trend-stats` option](/using-k6/options#summary-trend-stats) allows you to define which stats for [Trend metrics](/javascript-api/k6-metrics/trend) will be calculated and shown.
- The [`--summary-time-unit` option](/using-k6/options#summary-time-unit) forces k6 to use a fixed time unit for all time values in the summary.
- The [`--no-summary` option](/using-k6/options#no-summary) completely disables the report generation - including `--summary-export` and `handleSummary()`.


## handleSummary() callback

Users can completely customize the end-of-test summary report.

You can `export` a function called `handleSummary()` and k6 will call it at the end of the test run, even after [`teardown()`](/using-k6/test-life-cycle#setup-and-teardown-stages). `handleSummary()` will be called with a JS object containing the same information that is used to generate the end-of-test summary and `--summary-export`, and allows users to completely customize how the end-of-test summary looks like.

Besides customizing the end-of-test CLI summary (if `handleSummary()` is exported, k6 will not print the default), you can also transform the summary data to various machine or human-readable formats and save it to files. This allows the creation of JS helper functions that generate JSON, CSV, XML (JUnit/xUnit/etc.), HTML, etc. files from the summary data.

You can also send the generated reports to a remote server by making an HTTP request with them (or using any of the other protocols k6 already supports)! Here's a simple example:


<CodeGroup labels={["handleSummary() demo"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/samples/thresholds_readme_example.js';
export default k6example; // use some predefined example to generate some data
export const options = { vus: 5, iterations: 10 };

// These are still very much WIP and untested, but you can use them as is or write your own!
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  // Send the results to some remote server or trigger a hook
  const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
  if (resp.status != 200) {
    console.error('Could not send summary, got status ' + resp.status);
  }

  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    '../path/to/junit.xml': jUnit(data), // but also transform it and save it as a JUnit XML...
    'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
    // And any other JS transformation of the data you can think of,
    // you can write your own JS helpers to transform the summary data however you like!
  };
}
```

</CodeGroup>


k6 expects `handleSummary()` to return a `{key1: value1, key2: value2, ...}` map. The values can be a `string` or `ArrayBuffer`, and represent the generated summary report contents. The keys should be strings and determine where the contents will be displayed or saved:
- `stdout` for [standard output](https://en.wikipedia.org/wiki/Standard_streams)
- `stderr` for standard error,
- or any relative or absolute path to a file on the system (which will be overwritten)

The format of the `data` parameter is similar but not identical to the data format of `--summary-export`. The format of `--summary-export` remains unchanged, for backwards compatibility, but the data format for this new k6 feature was made more extensible and had some of the ambiguities and issues from the previous format fixed.

To get an idea how `data` would look like in your specific test run, just add `return { 'raw-data.json': JSON.stringify(data)};` in your `handleSummary()` function and inspect the resulting `raw-data.json` file. Here's a very abridged example of how it might look like:

<CodeGroup labels={["data passed to handleSummary()"]} lineNumbers={[true]}>

```json
{
    "root_group": {
        "path": "",
        "groups": [
            // Sub-groups of the root group...
        ],
        "checks": [
            {
                "passes": 10,
                "fails": 0,
                "name": "check name",
                "path": "::check name"
            },
            // More checks...
        ],
        "name": ""
    },
    "options": {
        // Some of the global options of the k6 test run,
        // Currently only summaryTimeUnit and summaryTrendStats
    },
    "metrics": {
        // A map with metric and sub-metric names as the keys and objects with
        // details for the metric. These objects contain the following keys:
        //  - type: describes the metric type, e.g. counter, rate, gauge, trend
        //  - contains: what is the type of data, e.g. time, default, data
        //  - values: the specific metric values, depends on the metric type
        //  - thresholds: any thresholds defined for the metric or sub-metric
        //
        "http_reqs": {
            "type": "counter",
            "contains": "default",
            "values": {
                "count": 40,
                "rate": 19.768856959496336
            }
        },
        "vus": {
            "type": "gauge",
            "contains": "default",
            "values": {
                "value": 1,
                "min": 1,
                "max": 5
            }
        },
        "http_req_duration": {
            "type": "trend",
            "contains": "time",
            "values": {
                // actual keys depend depend on summaryTrendStats
                "min": 135.092841,
                "avg": 268.31137452500013,
                "max": 846.198634,
                "p(99.99)": 846.1969478817999,
                // ...
            },
            "thresholds": {
                "p(95)<500": {
                    "ok": false
                }
            }
        },
        "http_req_duration{staticAsset:yes}": { // sub-metric from threshold
            "contains": "time",
            "values": {
                // actual keys depend on summaryTrendStats
                "min": 135.092841,
                "avg": 283.67766343333335,
                "max": 846.198634,
                "p(99.99)": 846.1973802197999,
                // ...
            },
            "thresholds": {
                "p(99)<250": {
                    "ok": false
                }
            },
            "type": "trend"
        },
        // ...
    }
}
```

</CodeGroup>

This feature is only available for local `k6 run` tests for now, though we plan to support [`k6 cloud`](/cloud) tests eventually. And, as mentioned in the snippet above, the JS helper functions that transform the summary in various formats are far from final, so keep an eye on [jslib.k6.io](https://jslib.k6.io/) for updates. Or, better yet, submit PRs with improvements and more transformations at https://github.com/grafana/jslib.k6.io

### Examples from the community

- [Using the JUnit output with Azure Test Plan](https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a)
- [Using the JUnit output with TestRail](https://dev.to/kwidera/introducing-testrail-in-you-k6-tests-eck)
- [handleSummary and custom Slack integration](https://medium.com/geekculture/k6-custom-slack-integration-metrics-are-the-magic-of-tests-527aaf613595)
- [Reporting to Xray](https://docs.getxray.app/display/XRAYCLOUD/Performance+and+load+testing+with+k6)
- [HTML reporter](https://github.com/benc-uk/k6-reporter)

<Collapsible title="Summary export to a JSON file (Discouraged)">

### Summary export to a JSON file

k6 also has the [`--summary-export=path/to/file.json` option](/using-k6/options#summary-export) to export some of the summary report data to a JSON file format.

Unfortunately, the exported format is somewhat limited and has a few confusing peculiarities. For example, groups and checks are unordered, and threshold values are unintuitive - `true` indicates the threshold has failed, and `false` that succeeded.

We couldn't change the `--summary-export` data format because it would have broken backward compatibility in a feature that people depended on their CI pipelines. Since k6 v0.30.0, the recommended approach to export to a JSON file is to use the [`handleSummary()` callback](#handlesummary-callback). The `--summary-export` option will likely be deprecated in the future.

</Collapsible>

