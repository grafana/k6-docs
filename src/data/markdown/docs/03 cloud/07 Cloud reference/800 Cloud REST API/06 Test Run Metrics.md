---
title: 'Test Run Metrics'
excerpt: ''
---

For a detailed explanation and reference of all metrics, refer to the [Metrics docs](/using-k6/metrics).

## List metrics

Returns all metrics within a specified test run.
You can get test-run ids from the `test_run_ids` field in responses from the Read Test endpoint, or from the `id` field in the response from the Start Test Run endpoint.

Note that k6 Cloud might store multiple (sub)metrics for each metric generated in the k6 script. For example, when sending an HTTP request within the script, k6 cloud stores `http_req_duration`, `http_req_blocked`, `http_req_connecting` and other metrics for that particular endpoint.
Differing HTTP methods and statuses are all grouped as separate metrics.
(The same URL produces multiple metrics if k6 detects statuses such as 200, 400 etc).

Some of the fields contained in the response are:

- `check_id` - ID of the `check` defined in `k6` script. Checks have their underlying metrics stored in k6 cloud.
- `group_id` - ID of the `group` this metric belongs to.
- `contains` - "Unit" for the metrics. Some examples are: `time`, `percent`, `bytes` et.

**GET** `https://api.k6.io/loadtests/v2/metrics?test_run_id={test_run_id}`

| Query Parameter | Type    | Description                                          |
| --------------- | ------- | ---------------------------------------------------- |
| test_run_id     | integer | Returns metrics associated with a given test_run_id. |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-metrics": [
    {
      "check_id": "6b1033e4a2021d21a3e856a53b3e7130",
      "contains": "default",
      "group_id": "24f16e4b60535af8fd5ce494947b8a59",
      "id": "d9b21849a4ee9c3b67c30cfe6993ae6a",
      "name": "http_req_duration",
      "project_id": 123,
      "tags": {
        "method": "GET",
        "status": "200",
        "url": "https://test.k6.io"
      },
      "test_run_id": 103054,
      "type": "trend",
      "url_id": "string"
    }
  ]
}
```

</CodeGroup>

## Read metric

Returns details of a metric with the specified ID.

**GET** `https://api.k6.io/loadtests/v2/metrics/{id}`

| Path Parameter | Type   | Description                 |
| -------------- | ------ | --------------------------- |
| id             | string | Return metric given the id. |

<!-- vale off -->

| Query Parameters | Type    | Description                                                                                      | Example                                                                                       |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| test_run_id      | integer | Returns metric associated with a given test_run_id.                                              | `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}`                                 |
| include[]        | string  | Specifies additional information to include in the response. Allowed options: url, group, check. | `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}&include[]=check&include[]=group` |

<!-- vale on -->

<CodeGroup labels={["Response"]}>

```json
{
  "k6-check": {
    "id": "ec92813ef1d5149e1e789147349e2823",
    "name": "LI_DISTRIBUTION"
  },
  "k6-metric": {
    "check_id": "6b1033e4a2021d21a3e856a53b3e7130",
    "contains": "default",
    "group_id": "24f16e4b60535af8fd5ce494947b8a59",
    "id": "d9b21849a4ee9c3b67c30cfe6993ae6a",
    "name": "http_req_duration",
    "project_id": 123,
    "tags": {},
    "test_run_id": 103054,
    "type": "trend",
    "url_id": "string"
  },
  "k6-group": {
    "id": "223813452fd767e624ba9ee6c78bde91",
    "name": "page_1 - http://test.k6.io/"
  },
  "k6-url": {
    "id": "81414ab976a1985f59b321d6b745d2c2",
    "method": "GET",
    "status": 200,
    "url": "http://test.k6.io/"
  }
}
```

</CodeGroup>

## Read series data

Returns time-series data points for specified metrics ids within a specified test run id. Test run ids are
available in the `test_run_ids` field of a response from `Read Test` or in the `id` field of a response
from `Start Test Run` endpoint.

Metric ids are available in the `id` field of the response from the
List metrics endpoint.

**GET** `https://api.k6.io/loadtests/v2/series?test_run_id={test_run_id}&ids[]={metric_id_1}`

| Query Parameters | Type    | Description           | Example                                                                                  |
| ---------------- | ------- | --------------------- | ---------------------------------------------------------------------------------------- |
| test_run_id      | integer | Specify test run id.  |                                                                                          |
| ids[]            | string  | Specify metric id(s). | `/loadtests/v2/series?test_run_id={test_run_id}&ids[]={metric_id_1}&ids[]={metric_id_2}` |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-serie": [
    {
      "agg": {},
      "id": "4fa31be7e216ae5335bb5d4ac56931a3",
      "method": "mean",
      "metric_id": "d9b21849a4ee9c3b67c30cfe6993ae6a",
      "test_run_id": 103054,
      "values": [
        {
          "timestamp": "2020-08-13T18:28:45Z",
          "value": 0
        }
      ]
    }
  ]
}
```

</CodeGroup>

## List thresholds

Returns all thresholds (and related metrics) for a test run.

**GET** `https://api.k6.io/loadtests/v2/thresholds?test_run_id={test_run_id}&ids[]={threshold_id_1}`

| Query Parameter | Type    | Description                                             | Example                                                                                            |
| --------------- | ------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| test_run_id     | integer | Returns thresholds associated with a given test_run_id. |                                                                                                    |
| ids[]           | integer | Specify threshold id(s).                                | `/loadtests/v2/thresholds?test_run_id={test_run_id}&ids[]={threshold_id_1}&ids[]={threshold_id_2}` |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-metrics": [
    {
      "check_id": null,
      "contains": "default",
      "group_id": "3cb67e24358b7c3f1256ff423381c05b",
      "id": "threshold_166100",
      "name": "iterations",
      "project_id": 3458575,
      "tags": {},
      "test_run_id": 0,
      "type": "counter",
      "url_id": null
    }
  ],
  "k6-thresholds": [
    {
      "calc_state": {
        "max_created_at": "2020-08-18 13:36:41.348933+00:00",
        "max_time": "2020-08-18 13:36:04+00:00",
        "min_time": "2020-08-18 13:34:05+00:00",
        "tainted_value": null
      },
      "calculated_value": 22024.0,
      "id": 166100,
      "metric_id": "threshold_166100",
      "name": "threshold_1",
      "stat": "count",
      "tainted": false,
      "tainted_at": null,
      "testrun_id": 0,
      "value": 200.0
    }
  ]
}
```

</CodeGroup>

## Read threshold

Returns details of a threshold with the specified ID.

**GET** `https://api.k6.io/loadtests/v2/thresholds/{id}?test_run_id={test_run_id}`

| Query Parameter | Type    | Description          |
| --------------- | ------- | -------------------- |
| test_run_id     | integer | ID of the test run.  |
| id              | integer | ID of the threshold. |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-threshold": {
    "calc_state": {
      "max_created_at": "2020-08-18 13:36:41.348933+00:00",
      "max_time": "2020-08-18 13:36:04+00:00",
      "min_time": "2020-08-18 13:34:05+00:00",
      "tainted_value": null
    },
    "calculated_value": 22024.0,
    "id": 166100,
    "metric_id": "threshold_166100",
    "name": "threshold_1",
    "stat": "count",
    "tainted": false,
    "tainted_at": null,
    "test_run_id": 0,
    "value": 200.0
  }
}
```

</CodeGroup>

## Read test run overview

Returns an overview of the test run which includes numbers of URLs, thresholds, checks, etc.

**GET** `https://api.k6.io/loadtests/v2/run-overviews?test_run_id={test_run_id}`

| Query Parameter | Type    | Description                                       |
| --------------- | ------- | ------------------------------------------------- |
| test_run_id     | integer | A unique integer value identifying this test run. |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-run-overviews": [
    {
      "checks_hits_successes": 44048,
      "checks_hits_total": 44048,
      "checks_successes": 2,
      "checks_total": 2,
      "http_req_duration_avg": 21.3739818525472,
      "http_reqs_avg": 716.2276422764228,
      "test_run_id": 0,
      "thresholds_successes": 2,
      "thresholds_total": 3,
      "urls_hits_successes": 88096,
      "urls_hits_total": 88096,
      "urls_successes": 4,
      "urls_total": 4
    }
  ]
}
```

</CodeGroup>

## Export test run metrics

Exports metric data for test run in CSV format.
The file URL is in the `export.export_file` field of [List test runs response](/cloud/cloud-reference/cloud-rest-api/test-runs/#list-load-test-runs).

**POST** `https://api.k6.io/loadtests/v2/runs/{test_run_id}/export`

| Path Parameter | Type    | Description                                       |
| -------------- | ------- | ------------------------------------------------- |
| test_run_id    | integer | A unique integer value identifying this test run. |

<CodeGroup labels={["Response"]}>

```json
{
  "exports": [
    {
      "export_status": 1,
      "load_test_run_id": 0
    }
  ]
}
```

</CodeGroup>
