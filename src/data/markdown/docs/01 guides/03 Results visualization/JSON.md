---
title: 'JSON'
excerpt: ''
---

You can also make k6 output detailed statistics in JSON format by using the `--out/-o` option for `k6 run`, like this:

<div class="code-group" data-props='{"labels": ["CLI"]}'>

```shell
$ k6 run --out json=my_test_result.json script.js
```

</div>

## JSON format

The JSON file will contain lines like these:

<div class="code-group" data-props='{"labels": ["Output"]}'>

```json
{"type":"Metric","data":{"type":"gauge","contains":"default","tainted":null,"thresholds":[],"submetrics":null},"metric":"vus"}
{"type":"Point","data":{"time":"2017-05-09T14:34:45.625742514+02:00","value":5,"tags":null},"metric":"vus"}
{"type":"Metric","data":{"type":"trend","contains":"time","tainted":null,"thresholds":["avg\u003c1000"],"submetrics":null},"metric":"http_req_duration"}
{"type":"Point","data":{"time":"2017-05-09T14:34:45.239531499+02:00","value":459.865729,"tags":{"group":"::my group::json","method":"GET","status":"200","url":"https://httpbin.org/get"}},"metric":"http_req_duration"}
```

</div>

Each line will either contain information about a metric, or log a data point (sample) for a metric. Lines consist of three items:

- `type` - can have the values [Metric](#metric) or [Point](#point) where `Metric` means the line is declaring a metric, and `Point` is an actual data point (sample) for a metric.
- `data` - is a dictionary that contains lots of stuff, varying depending on the `"type"` above.
- `metric` - the name of the metric.

### Metric

This line contains information about the nature of a metric. Here, `"data"` will contain the following:

- `"type"` - the metric type ("gauge", "rate", "counter" or "trend")
- `"contains"` - information on the type of data collected (can e.g. be "time" for timing metrics)
- `"tainted"` - has this metric caused a threshold to fail?
- `"threshold"` - are there any thresholds attached to this metric?
- `"submetrics"` - any derived metrics created as a result of adding a threshold using tags.

### Point

This line contains actual data samples. Here, `"data"` will contain these fields:

- `"time"` - timestamp when the sample was collected
- `"value"` - the actual data sample; time values are in milliseconds
- `"tags"` - dictionary with tagname-tagvalue pairs that can be used when filtering results data

## Processing JSON output

We recommend using [jq][jq_url] to process the k6 JSON output. [jq][jq_url] is a lightweight and flexible command-line JSON processor.

You can quickly create [filters][jq_filters_url] to return a particular metric of the JSON file:

<div class="code-group" data-props='{"labels": ["Filters"]}'>

```shell
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200")' myscript-output.json
```

</div>

And calculate an aggregated value of any metric:

<div class="code-group" data-props='{"labels": ["Average"]}'>

```shell
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s 'add/length'
```

</div>

<div class="code-group" data-props='{"labels": ["Min"]}'>

```shell
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s min
```

</div>

<div class="code-group" data-props='{"labels": ["Max"]}'>

```shell
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s max
```

</div>

For more advanced cases, check out the [jq Manual][jq_manual_url]

[jq_url]: https://stedolan.github.io/jq/ 'jq_url'
[jq_filters_url]: https://stedolan.github.io/jq/manual/#Basicfilters 'jq_filters_url'
[jq_manual_url]: https://stedolan.github.io/jq/manual/ 'jq_manual_url'

## Summary export

> _New in v0.26.0_

The `--summary-export` option of the `k6 run` command can export the end-of-test summary report to a JSON file that includes data for all test metrics, checks and thresholds.

This is useful to get the aggregated test results in a machine-readable format, for integration with dashboards, external alerts, etc.

<div class="code-group" data-props='{"labels": [ "stdout", "Other output"] }'>

```shell
$ k6 run --summary-export=export.json script.js
```

```shell
# you can use the `summary-export` option with other output (Kafka, Datadog, Cloud, InfluxDB, JSON...)
$ k6 run --summary-export=export.json --out datadog script.js
```

</div>

The format of the summary is like:

<div class="code-group" data-props='{"labels": [ "export.json" ] }'>

```json
{
  "metrics": {
    "checks": {
      "fails": 0,
      "passes": 434,
      "value": 0
    },
    "data_received": {
      "count": 4267088,
      "rate": 213353.42114517145
    },
    "data_sent": {
      "count": 33726,
      "rate": 1686.2922633754104
    },
    "http_req_blocked": {
      "avg": 2.2303510806451645,
      "max": 466.009823,
      "med": 0.006873000000000001,
      "min": 0.001265,
      "p(90)": 0.0093969,
      "p(95)": 0.01104339999999999
    },
    "http_req_connecting": {
      "avg": 1.4719108986175116,
      "max": 176.017402,
      "med": 0,
      "min": 0,
      "p(90)": 0,
      "p(95)": 0
    },
    "http_req_duration": {
      "avg": 146.13434929493093,
      "max": 663.812323,
      "med": 115.237707,
      "min": 104.336176,
      "p(90)": 204.6849077,
      "p(95)": 205.27533795
    },
    "http_req_receiving": {
      "avg": 0.32699811981566856,
      "max": 5.86652,
      "med": 0.135682,
      "min": 0.026588,
      "p(90)": 1.4118543,
      "p(95)": 1.6629313999999984
    },
    "http_req_sending": {
      "avg": 0.031275672811059876,
      "max": 0.149365,
      "med": 0.028853,
      "min": 0.006069,
      "p(90)": 0.041769099999999997,
      "p(95)": 0.05106769999999998
    },
    "http_req_tls_handshaking": {
      "avg": 0,
      "max": 0,
      "med": 0,
      "min": 0,
      "p(90)": 0,
      "p(95)": 0
    },
    "http_req_waiting": {
      "avg": 145.77607550230408,
      "max": 663.551133,
      "med": 114.90324000000001,
      "min": 103.389659,
      "p(90)": 204.4926965,
      "p(95)": 205.02902265
    },
    "http_reqs": {
      "count": 434,
      "rate": 21.699900441941768
    },
    "iteration_duration": {
      "avg": 148.59040099078345,
      "max": 671.970894,
      "med": 115.69334950000001,
      "min": 104.558313,
      "p(90)": 205.0391277,
      "p(95)": 209.87447475000002
    },
    "iterations": {
      "count": 434,
      "rate": 21.699900441941768
    },
    "vus": {
      "max": 5,
      "min": 1,
      "value": 1
    },
    "vus_max": {
      "max": 5,
      "min": 5,
      "value": 5
    }
  },
  "root_group": {
    "name": "",
    "path": "",
    "id": "d41d8cd98f00b204e9800998ecf8427e",
    "groups": {},
    "checks": {
      "status is 200": {
        "name": "status is 200",
        "path": "::status is 200",
        "id": "6210a8cd14cd70477eba5c5e4cb3fb5f",
        "passes": 435,
        "fails": 0
      }
    }
  }
}
```

</div>

## See also

- [Metrics](/using-k6/metrics)
