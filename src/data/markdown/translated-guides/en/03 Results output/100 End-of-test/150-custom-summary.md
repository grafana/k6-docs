---
title: Custom summary
excerpt: With the handle summary, you can customize every part of your report, 
---

Use the `handleSummary()` function to completely customize the end-of-test summary report.

k6 calls`handleSummary()` at the end of the test run, even after [`teardown()`](/using-k6/test-life-cycle).
If `handleSummary()` is exported, k6 does _not_ print the default summary.

Besides customizing the CLI summary, you can also transform the summary data into machine- or human-readable formats.
This lets you create JS-helper functions that generate JSON, CSV, XML (JUnit/xUnit/etc.), HTML, etc. files from the summary data.

<Blockquote mod="note"
title="handleSummary() is available on only local tests."
>

However we plan to support the feature for k6 Cloud tests, too.
[Track progress in this issue](https://github.com/grafana/k6-cloud-feature-requests/issues/24).

</Blockquote>

## Data format returned by `handleSummary()`

k6 expects `handleSummary()` to return a `{key1: value1, key2: value2, ...}` map that represents the summary-report content.
While the values can have a type of either `string` or `ArrayBuffer`, the keys must be strings.

The keys determine where k6 displays or saves the content:
- `stdout` for [standard output](https://en.wikipedia.org/wiki/Standard_streams)
- `stderr` for standard error,
- any relative or absolute path to a file on the system (this operation overwrites existing files)

<CodeGroup labels={["example keys for handleSummary output"]}>

```
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
  };
```

</CodeGroup>

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

## Send reports to a remote server

You can also send the generated reports to a remote server by making an HTTP request (or using any of the other protocols k6 already supports)! Here's a simple example:

<CodeGroup labels={["handleSummary() demo"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/samples/thresholds_readme_example.js';
export default k6example; // use some predefined example to generate some data
export const options = { vus: 5, iterations: 10 };

// These are still very much WIP and untested, but you can use them as is or write your own!
import { jUnit, textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

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

The preceding snippet uses some JS helper functions to transform the summary in various formats.
These helper functions might change, so keep an eye on [jslib.k6.io](https://jslib.k6.io/) for the latest.

Of course, we always welcome [PRs to the jslib](https://github.com/grafana/jslib.k6.io), too!

## Custom output examples

These examples are community contributions.
We thank everyone who has shared!

- [Using the JUnit output with Azure Test Plan](https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a)
- [Using the JUnit output with TestRail](https://dev.to/kwidera/introducing-testrail-in-you-k6-tests-eck)
- [handleSummary and custom Slack integration](https://medium.com/geekculture/k6-custom-slack-integration-metrics-are-the-magic-of-tests-527aaf613595)
- [Reporting to Xray](https://docs.getxray.app/display/XRAYCLOUD/Performance+and+load+testing+with+k6)
- [HTML reporter](https://github.com/benc-uk/k6-reporter)

