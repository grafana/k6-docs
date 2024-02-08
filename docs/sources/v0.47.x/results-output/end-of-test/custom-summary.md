---
title: Custom summary
description: With handlesummary(), you can customize every part of your report. Change the content, redirect output, and more.
weight: 150
---

# Custom summary

With `handleSummary()`, you can completely customize your end-of-test summary.
In this document, read about:

- How `handleSummary()` works
- How to customize the content and output location of your summary
- The data structure of the summary object

{{% admonition type="note" %}}

However, we plan to support the feature for k6 Cloud tests, too.
[Track progress in this issue](https://github.com/grafana/k6-cloud-feature-requests/issues/24).

{{% /admonition %}}

## About `handleSummary()`

After your test runs, k6 aggregates your metrics into a JavaScript object.
The `handleSummary()` function takes this object as an argument (called `data` in all examples here).

You can use `handleSummary()` to create a custom summary or return the default summary object.
To get an idea of what the data looks like,
run this script and open the output file, `summary.json`.

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  return {
    'summary.json': JSON.stringify(data), //the default data object
  };
}
```

{{< /code >}}

Fundamentally, `handleSummary()` is just a function that can access a data object.
As such, you can transform the summary data into any text format: JSON, HTML, console, XML, and so on.
You can pipe your custom summary to [standard output or standard error](https://en.wikipedia.org/wiki/Standard_streams), write it to a file, or send it to a remote server.

k6 calls `handleSummary()` at the end of the [test lifecycle](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle).

## Use handleSummary()

The following sections go over the `handleSummary()` syntax and provide some examples.

To look up the structure of the summary object, refer to the reference section.

### Syntax

k6 expects `handleSummary()` to return a `{key1: value1, key2: value2, ...}` map that represents the summary metrics.

The keys must be strings.
They determine where k6 displays or saves the content:

- `stdout` for standard output
- `stderr` for standard error,
- any relative or absolute path to a file on the system (this operation overwrites existing files)

The value of a key can have a type of either `string` or [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer).

You can return multiple summary outputs in a script.
As an example, this `return` statement sends a report to standard output and writes the `data` object to a JSON file.

{{< code >}}

```
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
    'other/path/to/summary.json': JSON.stringify(data), // and a JSON with all the details...
  };
```

{{< /code >}}

### Example: Extract data properties

This minimal `handleSummary()` extracts the `median` value for the `iteration_duration` metric and prints it to standard output:

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  const med_latency = data.metrics.iteration_duration.values.med;
  const latency_message = `The median latency was ${med_latency}\n`;

  return {
    stdout: latency_message,
  };
}
```

{{< /code >}}

### Example: Modify default output

If `handleSummary()` is exported, k6 _does not_ print the default summary.
However, if you want to keep the default output, you could import `textSummary` from the [K6 JS utilities library](https://jslib.k6.io/).
For example, you could write a custom HTML report to a file, and use the `textSummary()` function to print the default report to the console.

You can also use `textSummary()` to make minor modifications to the default end-of-test summary.
To do so:

1. Modify the `data` object however you want.
1. In your `return` statement, pass the modified object as an argument to the `textSummary()` function.

The `textSummary()` function comes with a few options:

| Option        | Description                            |
| ------------- | -------------------------------------- |
| `indent`      | How to start the summary indentation   |
| `enableColor` | Whether to print the summary in color. |

For example, this `handleSummary()` modifies the default summary in the following ways:

- It deletes the `http_req_duration{expected_response:true}` sub-metric.
- It deletes all metrics whose key starts with `iteration`.
- It begins each line with the `→` character.

{{< code >}}

```javascript
import http from 'k6/http';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

export default function () {
  http.get('https://test.k6.io');
}

export function handleSummary(data) {
  delete data.metrics['http_req_duration{expected_response:true}'];

  for (const key in data.metrics) {
    if (key.startsWith('iteration')) delete data.metrics[key];
  }

  return {
    stdout: textSummary(data, { indent: '→', enableColors: true }),
  };
}
```

{{< /code >}}

In the collapsible, you can use the tabs to compare default and modified reports.

{{< collapse title="Compare the default and modified reports" >}}

To see the output of the preceding script,
select **Modified**.
For compactness, these outputs were limited with the `summaryTrendStats` option.

{{< code >}}

```
     data_received..................: 63 kB 42 kB/s
     data_sent......................: 830 B 557 B/s
     http_req_blocked...............: med=10.39µs  count=5 p(99)=451.07ms p(99.99)=469.67ms
     http_req_connecting............: med=0s       count=5 p(99)=223.97ms p(99.99)=233.21ms
     http_req_duration..............: med=202.26ms count=5 p(99)=225.81ms p(99.99)=226.71ms
       { expected_response:true }...: med=202.26ms count=5 p(99)=225.81ms p(99.99)=226.71ms
     http_req_failed................: 0.00% ✓ 0        ✗ 5
     http_req_receiving.............: med=278.27µs count=5 p(99)=377.64µs p(99.99)=381.29µs
     http_req_sending...............: med=47.57µs  count=5 p(99)=108.42µs p(99.99)=108.72µs
     http_req_tls_handshaking.......: med=0s       count=5 p(99)=204.42ms p(99.99)=212.86ms
     http_req_waiting...............: med=201.77ms count=5 p(99)=225.6ms  p(99.99)=226.5ms
     http_reqs......................: 5     3.352646/s
     iteration_duration.............: med=204.41ms count=5 p(99)=654.78ms p(99.99)=672.43ms
     iterations.....................: 5     3.352646/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1
```

```
→    data_received..............: 63 kB 39 kB/s
→    data_sent..................: 830 B 507 B/s
→    http_req_blocked...........: med=10.98µs  count=5 p(99)=485.16ms p(99.99)=505.18ms
→    http_req_connecting........: med=0s       count=5 p(99)=245.05ms p(99.99)=255.15ms
→    http_req_duration..........: med=208.68ms count=5 p(99)=302.87ms p(99.99)=306.61ms
→    http_req_failed............: 0.00% ✓ 0        ✗ 5
→    http_req_receiving.........: med=206.12µs count=5 p(99)=341.05µs p(99.99)=344.13µs
→    http_req_sending...........: med=47.8µs   count=5 p(99)=166.94µs p(99.99)=170.92µs
→    http_req_tls_handshaking...: med=0s       count=5 p(99)=207.2ms  p(99.99)=215.74ms
→    http_req_waiting...........: med=208.47ms count=5 p(99)=302.49ms p(99.99)=306.23ms
→    http_reqs..................: 5     3.054928/s
→    vus........................: 1     min=1      max=1
→    vus_max....................: 1     min=1      max=1
```

{{< /code >}}

{{< /collapse >}}

### Example: Make custom file format

This script imports a helper function to turn the summary into a JUnit XML.
The output is a short XML file that reports whether the test thresholds failed.

{{< code >}}

```javascript
import http from 'k6/http';

// Use example functions to generate data
import { jUnit } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/examples/thresholds_readme_example.js';

export default k6example;
export const options = {
  vus: 5,
  iterations: 10,
  thresholds: {
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  return {
    'junit.xml': jUnit(data), // Transform summary and save it as a JUnit XML...
  };
}
```

{{< /code >}}

Output for a test that crosses a threshold looks something like this:

```xml
<?xml version="1.0"?>
<testsuites tests="1" failures="1">
<testsuite name="k6 thresholds" tests="1" failures="1"><testcase name="http_req_duration - p(95)&lt;200"><failure message="failed" /></testcase>
</testsuite >
</testsuites >
```

### Example: Send data to remote server

You can also send the generated reports to a remote server (over any protocol that k6 supports).

{{< code >}}

```javascript
import http from 'k6/http';

// use example function to generate data
import k6example from 'https://raw.githubusercontent.com/grafana/k6/master/examples/thresholds_readme_example.js';
export const options = { vus: 5, iterations: 10 };

export function handleSummary(data) {
  console.log('Preparing the end-of-test summary...');

  // Send the results to some remote server or trigger a hook
  const resp = http.post('https://httpbin.test.k6.io/anything', JSON.stringify(data));
  if (resp.status != 200) {
    console.error('Could not send summary, got status ' + resp.status);
  }
}
```

{{< /code >}}

{{% admonition type="note" %}}

The last examples use imported helper functions.
These functions might change, so keep an eye on [jslib.k6.io](https://jslib.k6.io/) for the latest.

Of course, we always welcome [PRs to the jslib](https://github.com/grafana/jslib.k6.io), too!

{{% /admonition %}}

## Summary data reference

Summary data includes information about your test run time and all built-in and custom metrics (including checks).

All metrics are in a top-level `metrics` object.
In this object, each metric has an object whose key is the name of the metric.
For example, if your `handleSummary()` argument is called `data`,
the function can access the object about the `http_req_duration` metric at `data.metrics.http_req_duration`.

### Metric schema

The following table describes the schema for the metrics object.
The specific values depend on the [metric type](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics):

<TableWithNestedRows>

| Property             | Description                                                                    |
| -------------------- | ------------------------------------------------------------------------------ |
| type                 | String that gives the metric type                                              |
| contains             | String that describes the data                                                 |
| values               | Object with the summary metric values (properties differ for each metric type) |
| thresholds           | Object with info about the thresholds for the metric (if applicable)           |
| thresholds.{name}    | Name of threshold (object)                                                     |
| thresholds.{name}.ok | Whether threshold was crossed (boolean)                                        |

</TableWithNestedRows>

{{% admonition type="note" %}}

If you change the default trend metrics with the [`summaryTrendStats`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#summary-trend-stats) option,
the keys for the values of the trend will change accordingly.

{{% /admonition %}}

### Example summary JSON

To see what the summary `data` looks like in your specific test run:

1. Add this to your handleSummary() function:

   ```
   return { 'raw-data.json': JSON.stringify(data)};`
   ```

1. Inspect the resulting `raw-data.json` file.

   The following is an abridged example of how it might look:

{{< code >}}

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
      }
      // More checks...
    ],
    "name": ""
  },
  "options": {
    // Some of the global options of the k6 test run,
    // Currently only summaryTimeUnit and summaryTrendStats
  },

  "state": {
    "testRunDurationMs": 30898.965069
    // And information about TTY checkers
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
        "p(99.99)": 846.1969478817999
        // ...
      },
      "thresholds": {
        "p(95)<500": {
          "ok": false
        }
      }
    },
    "http_req_duration{staticAsset:yes}": {
      // sub-metric from threshold
      "contains": "time",
      "values": {
        // actual keys depend on summaryTrendStats
        "min": 135.092841,
        "avg": 283.67766343333335,
        "max": 846.198634,
        "p(99.99)": 846.1973802197999
        // ...
      },
      "thresholds": {
        "p(99)<250": {
          "ok": false
        }
      },
      "type": "trend"
    }
    // ...
  }
}
```

{{< /code >}}

## Custom output examples

These examples are community contributions.
We thank everyone who has shared!

- [Using the JUnit output with Azure Test Plan](https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a)
- [Using the JUnit output with TestRail](https://dev.to/kwidera/introducing-testrail-in-you-k6-tests-eck)
- [handleSummary and custom Slack integration](https://medium.com/geekculture/k6-custom-slack-integration-metrics-are-the-magic-of-tests-527aaf613595)
- [Reporting to Xray](https://docs.getxray.app/display/XRAYCLOUD/Performance+and+load+testing+with+k6)
- [HTML reporter](https://github.com/benc-uk/k6-reporter)
