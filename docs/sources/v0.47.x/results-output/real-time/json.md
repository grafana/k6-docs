---
title: 'JSON'
description: 'You can also make k6 output detailed statistics in JSON format by using the --out option.'
weight: 00
---

# JSON

You can output granular data points in JSON format.
To do so, use `k6 run` with the `--out` flag.
Pass the path for your JSON file as the flag argument:

{{< code >}}

```bash
$ k6 run --out json=test_results.json script.js
```

```docker
$ docker run -it --rm \
    -v <scriptdir>:/scripts \
    -v <outputdir>:/jsonoutput \
    grafana/k6 run --out json=/jsonoutput/my_test_result.json /scripts/script.js

# Note that the docker user must have permission to write to <outputdir>!
```

{{< /code >}}

Or if you want to get the result gzipped, like this:

{{< code >}}

```bash
$ k6 run --out json=test_results.gz script.js
```

```docker
$ docker run -it --rm \
    -v <scriptdir>:/scripts \
    -v <outputdir>:/jsonoutput \
    grafana/k6 run --out json=/jsonoutput/my_test_result.gz /scripts/script.js

# Note that the docker user must have permission to write to <outputdir>!
```

{{< /code >}}

To inspect the output in real time, you can use a command like `tail -f` on the file you save:

```bash
$ tail -f test_results.json
```

## JSON format

The JSON output has lines as follows:

{{< code >}}

```json
{"type":"Metric","data":{"type":"gauge","contains":"default","tainted":null,"thresholds":[],"submetrics":null},"metric":"vus"}
{"type":"Point","data":{"time":"2017-05-09T14:34:45.625742514+02:00","value":5,"tags":null},"metric":"vus"}
{"type":"Metric","data":{"type":"trend","contains":"time","tainted":null,"thresholds":["avg<1000"],"submetrics":null},"metric":"http_req_duration"}
{"type":"Point","data":{"time":"2017-05-09T14:34:45.239531499+02:00","value":459.865729,"tags":{"group":"::my group::json","method":"GET","status":"200","url":"https://httpbin.test.k6.io/get"}},"metric":"http_req_duration"}
```

{{< /code >}}

Each line either has information about a metric, or logs a data point (sample) for a metric.
Lines consist of three items:

- `type` - can have the values [Metric](#metric) or [Point](#point) where `Metric` means the line is declaring a metric, and `Point` is an actual data point (sample) for a metric.
- `data` - is a dictionary that contains lots of stuff, varying depending on the `"type"` above.
- `metric` - the name of the metric.

### Metric

This line has metadata about a metric. Here, `"data"` contains the following:

- `"type"` - the metric type ("gauge", "rate", "counter" or "trend")
- `"contains"` - information on the type of data collected (can e.g. be "time" for timing metrics)
- `"tainted"` - has this metric caused a threshold to fail?
- `"threshold"` - are there any thresholds attached to this metric?
- `"submetrics"` - any derived metrics created as a result of adding a threshold using tags.

### Point

This line has actual data samples. Here, `"data"` contains these fields:

- `"time"` - timestamp when the sample was collected
- `"value"` - the actual data sample; time values are in milliseconds
- `"tags"` - dictionary with tagname-tagvalue pairs that can be used when filtering results data

## Processing JSON output

You can use [jq][jq_url] to process the k6 JSON output.

You can quickly create [filters][jq_filters_url] to return a particular metric of the JSON file:

{{< code >}}

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200")' myscript-output.json
```

{{< /code >}}

And calculate an aggregated value of any metric:

{{< code >}}

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s 'add/length'
```

{{< /code >}}

{{< code >}}

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s min
```

{{< /code >}}

{{< code >}}

```bash
$ jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' myscript-output.json | jq -s max
```

{{< /code >}}

For more advanced cases, check out the [jq Manual][jq_manual_url]

[jq_url]: https://stedolan.github.io/jq/ 'jq_url'
[jq_filters_url]: https://stedolan.github.io/jq/manual/#Basicfilters 'jq_filters_url'
[jq_manual_url]: https://stedolan.github.io/jq/manual/ 'jq_manual_url'

## Summary export

If you want to see only the aggregated data, you can export the end-of-test summary to a JSON file.
For more details, refer to the `handleSummary()` topic in the [end-of-test summary docs](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test).

## Read more

- [Metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics)
