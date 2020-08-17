---
title: 'Test Run Data'
excerpt: ''
draft: 'true'
---

## List metrics

Returns all metrics within a specified test run. Test run id's can be found from field test_run_ids in response of Read Test endpoint.

**GET** `/loadtests/v2/metrics?test_run_id={test_run_id}`

| Query Parameter | Type | Description |
| ----------| ---- | ----------- |
| test_run_id | integer | Returns metrics who are associated with a given test_run_id. |

<div class="code-group" data-props='{"labels": ["Response"]}'>

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
      "tags": {},
      "test_run_id": 103054,
      "type": "trend",
      "url_id": "string"
    }
  ]
}
```

</div>


## Read metric

Returns details of a metric with the specified ID.

**GET** `/loadtests/v2/metrics/{id}`


| Path Parameter | Type | Description |
| ----------| ---- | ----------- |
| id | string | Return metric given the id. |


| Query Parameters | Type | Description | Example |
| ----------| ---- | ----------- | ---------- | 
| test_run_id | integer | Returns metric who are associated with a given test_run_id. | `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}` |
| include[] | string | Returns tests with given ids. | `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}&include[]=group` `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}&include[]=check` `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}&include[]=url` `/loadtests/v2/metrics/{metric_id}?test_run_id={test_run_id}&include[]=check&include[]=group&include[]=url` |


<div class="code-group" data-props='{"labels": ["Response"]}'>

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
    "name": "page_1 - http://test.loadimpact.com/"
  },
  "k6-url": {
    "id": "81414ab976a1985f59b321d6b745d2c2",
    "method": "GET",
    "status": 200,
    "url": "http://test.loadimpact.com/"
  }
}
```

</div>


## Read test data

Returns timeseries data for specified metrics ids within a specified test run id.
Test run id's can be found from field test_run_ids in response of Read Test endpoint. Metric id's of interested test runs could be found from field id in response of List metrics endpoint.

**GET** `/loadtests/v2/series?test_run_id={test_run_id}&ids[]={metric_id_1}`

| Query Parameters | Type | Description | Example |
| ----------| ---- | ----------- | ---------- | 
| test_run_id | integer | Specify test run id. | |
| ids[] | string | Specify metric id. | `/loadtests/v2/series?test_run_id={test_run_id}&ids[]={metric_id_1}&ids[]={metric_id_1}` |


<div class="code-group" data-props='{"labels": ["Response"]}'>

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

</div>