---
title: 'End-of-test summary'
excerpt: 'By default, k6 prints a summary report containing the aggregated results at the end of the test. The handleSummary callback allows the report to be completely customized, including the generation and saving of JSON, HTML, XML (e.g. JUnit), etc. reports to files.'
---

By default, when a test finishes, k6 prints an _end-of-test_ summary to `stdout`.
This report provides aggregated values for the major data of the test:
- Summary statistics about each built-in and custom [metric](/using-k6/metrics#built-in-metrics) (e.g. mean, median, p95, etc).
- A list of the test's [groups](/using-k6/tags-and-groups#groups) and [scenarios](/using-k6/scenarios)
- The pass/fail results of the test's [thresholds](/using-k6/thresholds) and [checks](/using-k6/checks).

The report will look something like this:

<CodeGroup labels={["Summary with scenario, groups, checks, and thresholds"]} lineNumbers={[true]}>

```
Ramp_Up ✓ [======================================] 00/20 VUs  30s
     █ Home page - https://example.com/

       ✓ status equals 200
       
     █ Create resource - https://example.com/create

       ✗ status equals 201
        ↳  0% — ✓ 0 / ✗ 45

     checks.........................: 50.00% ✓ 45       ✗ 45  
     data_received..................: 1.3 MB 31 kB/s
     data_sent......................: 81 kB  2.0 kB/s
     group_duration.................: avg=6.45s    min=4.01s    med=6.78s    max=10.15s   p(90)=9.29s    p(95)=9.32s   
     http_req_blocked...............: avg=57.62ms  min=7µs      med=12.25µs  max=1.35s    p(90)=209.41ms p(95)=763.61ms
     http_req_connecting............: avg=20.51ms  min=0s       med=0s       max=1.1s     p(90)=100.76ms p(95)=173.41ms
   ✗ http_req_duration..............: avg=144.56ms min=104.11ms med=110.47ms max=1.14s    p(90)=203.54ms p(95)=215.95ms
       { expected_response:true }...: avg=144.56ms min=104.11ms med=110.47ms max=1.14s    p(90)=203.54ms p(95)=215.95ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 180 
     http_req_receiving.............: avg=663.96µs min=128.46µs med=759.82µs max=1.66ms   p(90)=1.3ms    p(95)=1.46ms  
     http_req_sending...............: avg=88.01µs  min=43.07µs  med=78.03µs  max=318.81µs p(90)=133.15µs p(95)=158.3µs 
     http_req_tls_handshaking.......: avg=29.25ms  min=0s       med=0s       max=458.71ms p(90)=108.31ms p(95)=222.46ms
     http_req_waiting...............: avg=143.8ms  min=103.5ms  med=109.5ms  max=1.14s    p(90)=203.19ms p(95)=215.56ms
     http_reqs......................: 180    4.36938/s
     iteration_duration.............: avg=12.91s   min=12.53s   med=12.77s   max=14.35s   p(90)=13.36s   p(95)=13.37s  
     iterations.....................: 45     1.092345/s
     vus............................: 1      min=1      max=19
     vus_max........................: 20     min=20     max=20

ERRO[0044] some thresholds have failed  
```
</CodeGroup>

## Summary options

A few options affect how this report behaves:
- The [`--summary-trend-stats` option](/using-k6/options#summary-trend-stats) defines which [Trend metric](/javascript-api/k6-metrics/trend) statistics to calculate and show.
- The [`--summary-time-unit` option](/using-k6/options#summary-time-unit) forces k6 to use a fixed-time unit for all time values in the summary.
- The [`--no-summary` option](/using-k6/options#no-summary) completely disables the report generation, including `--summary-export` and `handleSummary()`.


## Customize with handleSummary()

Use the `handleSummary()` function to completely customize the end-of-test summary report.

k6 calls`handleSummary()` at the end of the test run, even after [`teardown()`](/using-k6/test-life-cycle#setup-and-teardown-stages).
`handleSummary()` is called with a JS object that contains the same information used to generate the end-of-test summary and `--summary-export`.
If `handleSummary()` is exported, k6 does _not_ print the default summary.


Besides customizing the CLI summary, you can also transform the summary data into various machine or human-readable formats.
This lets you create JS-helper functions that generate JSON, CSV, XML (JUnit/xUnit/etc.), HTML, etc. files from the summary data.

### `handleSummary()` data

k6 expects `handleSummary()` to return a `{key1: value1, key2: value2, ...}` map that represents the summary-report content.

The values can be a `string` or `ArrayBuffer`.
The keys must be strings. They determine where k6 will display or save the content:
- `stdout` for [standard output](https://en.wikipedia.org/wiki/Standard_streams)
- `stderr` for standard error,
- any relative or absolute path to a file on the system (this operation overwrites existing files)

To get an idea how `data` would look in your specific test run, just add `return { 'raw-data.json': JSON.stringify(data)};` in your `handleSummary()` function and inspect the resulting `raw-data.json` file. Here's a very abridged example of how it might look:

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

This feature is available only for local `k6 run` tests for now, though we plan to support [`k6 cloud`](/cloud) tests eventually.

The format might change, too. So Keep an eye on [jslib.k6.io](https://jslib.k6.io/) for updates.
Of course, we always welcome PRs at https://github.com/grafana/jslib.k6.io

### Send reports to remote server

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

<Collapsible title="Summary export to a JSON file (Discouraged)">

### Summary export to a JSON file

k6 also has the [`--summary-export=path/to/file.json` option](/using-k6/options#summary-export), which exports some summary report data to a JSON file.

The format of the `--summary-export` is similar to the `data` parameter of the `handleSummary()` function. 
Unfortunately, the `--summary-export` format is limited and has a few confusing peculiarities.
For example, groups and checks are unordered,
and threshold values are unintuitive: `true` indicates the threshold failed, and `false` that it succeeded.

We couldn't change the `--summary-export` data format, because it would have broken backward compatibility in a feature that people depended on their CI pipelines.
But, the recommended approach to export to a JSON file is the [`handleSummary()` callback](#handlesummary-callback).
The `--summary-export` option will likely be deprecated in the future.

</Collapsible>

## Custom output examples

These examples are contributed by the community.
We thank everyone for sharing!

- [Using the JUnit output with Azure Test Plan](https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a)
- [Using the JUnit output with TestRail](https://dev.to/kwidera/introducing-testrail-in-you-k6-tests-eck)
- [handleSummary and custom Slack integration](https://medium.com/geekculture/k6-custom-slack-integration-metrics-are-the-magic-of-tests-527aaf613595)
- [Reporting to Xray](https://docs.getxray.app/display/XRAYCLOUD/Performance+and+load+testing+with+k6)
- [HTML reporter](https://github.com/benc-uk/k6-reporter)

