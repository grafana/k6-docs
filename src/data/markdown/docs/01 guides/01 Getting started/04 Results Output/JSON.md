---
title: 'JSON'
excerpt: ''
---

You can also make k6 output detailed statistics in JSON format by using the `--out/-o` option for `k6 run`, like this:

<div class="code-group" data-props='{"labels": ["CLI"]}'>

```shell
k6 run --out json=my_test_result.json script.js
```

</div>

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

## Metric

This line contains information about the nature of a metric. Here, `"data"` will contain the following:

- `"type"` - the metric type ("gauge", "rate", "counter" or "trend")
- `"contains"` - information on the type of data collected (can e.g. be "time" for timing metrics)
- `"tainted"` - has this metric caused a threshold to fail?
- `"threshold"` - are there any thresholds attached to this metric?
- `"submetrics"` - any derived metrics created as a result of adding a threshold using tags.

## Point

This line contains actual data samples. Here, `"data"` will contain these fields:

- `"time"` - timestamp when the sample was collected
- `"value"` - the actual data sample; time values are in milliseconds
- `"tags"` - dictionary with tagname-tagvalue pairs that can be used when filtering results data

## Processing JSON output

We recommend using [jq][jq_url] to process the k6 JSON output. [jq][jq_url] is a lightweight and flexible command-line JSON processor.

You can quickly create [filters][jq_filters_url] to return a particular metric of the JSON file:

<div class="code-group" data-props='{"labels": ["Filters"]}'>

```shell
jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200")' myscript-output.json
```

</div>

And calculate an aggregated value of any metric:

<div class="code-group" data-props='{"labels": ["Average"]}'>

```shell
jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s 'add/length'
```

</div>

<div class="code-group" data-props='{"labels": ["Min"]}'>

```shell
jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s min
```

</div>

<div class="code-group" data-props='{"labels": ["Max"]}'>

```shell
jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s max
```

</div>

For more advanced cases, check out the [jq Manual][jq_manual_url]

[jq_url]: https://stedolan.github.io/jq/ 'jq_url'
[jq_filters_url]: https://stedolan.github.io/jq/manual/#Basicfilters 'jq_filters_url'
[jq_manual_url]: https://stedolan.github.io/jq/manual/ 'jq_manual_url'
