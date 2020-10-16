---
title: 'Result Export'
excerpt: 'Structure for the CSV export for cloud results'
---

Test result data can be exported after a test has finished and data processing complete. To do so, use the [test results menu](/cloud/analyzing-results/test-results-menu) in the top right of a test result and select `Export Data`. The data will be exported as a `.tar.gz` file with a `.csv` contained inside.

## Structure of the CSV data

The CSV data has the following columns of data:

<CodeGroup labels={[]}>

```shell
"time","metric","group_id","response_time","url","method","status","count","load_zone","tags"
```

</CodeGroup>

Here's example data, units (where necessary) and description of each field present in the CSV data.

| Column          | Example                          | Data/Unit      | Description                                                                                                                               |
| --------------- | -------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `time`          | 2019-03-25 11:12:48.927949+00:00 | datetime (UTC) | The ISO-8601 timestamp when this data point was captured (when the HTTP request was made).                                                |
| `metric`        | http_req_duration                | string         | The metric name that this data point represents.                                                                                          |
| `group_id`      | e1158ec16fa10dcfd16f4bd7309e2c55 | string         | The ID of the k6 [`group()`](/using-k6/tags-and-groups) from where this request was made.                                                 |
| `response_time` | 2.008016                         | number (ms)    | The HTTP response time of the request that this data point represents (if `count` > 1 then this will be an aggregate value, the average). |
| `url`           | http://test.k6.io/style.css      | string         | The URL requested.                                                                                                                        |
| `method`        | GET                              | string         | The HTTP method of the request that this data point represents.                                                                           |
| `status`        | 200                              | number         | The HTTP response status code of the request that this data point represents.                                                             |
| `count`         | 1.0                              | number         | Number of samples that this data point represents (if > 1 `response_time` is an aggregate value).                                         |
| `load_zone`     | amazon:us:ashburn                | string         | The load zone where the request(s) was made from.                                                                                         |
| `tags`          | staticAsset=true                 | string         | Pipe (`                                                                                                                                   | `) separated list of `name=value` tags as specified for the request in the script. |

### Future

The exported CSV file currently only contains data from the primary HTTP response time metric (`http_req_duration`). In the future we'll expand the export feature with more HTTP data, WebSocket data, Checks data, Thresholds data as well as Custom metrics data.
