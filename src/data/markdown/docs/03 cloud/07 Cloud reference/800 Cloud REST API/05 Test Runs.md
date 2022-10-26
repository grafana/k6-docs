---
title: 'Test Runs'
excerpt: ''
---

A _test run_ is an individual execution of a test.
Every test run has an ID, held in an array of `test_run_ids` in the `k6-test` object.

## Start load test run

Starts a test run in k6 Cloud for the specified Load Test ID. 

> Note that this endpoint uses the `/v2/tests/` base URL rather than `/v2/runs`. It also needs to be provided with a Load Test `{id}`. This is because this endpoint makes use of the data from the provided Load Test to create and return a new Load Test Run.

The test run is managed by k6 Cloud from beginning to end.
You can monitor the test progress in the k6 Cloud application.
From there, you can also export and analyze the result.

**POST** `https://api.k6.io/loadtests/v2/tests/{id}/start-testrun`

| Path Parameter | Type    | Description                                   |
| -------------- | ------- | --------------------------------------------- |
| id             | integer | A unique integer value identifying this test. |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-run": {
    "config": {},
    "created": "2020-08-13T18:28:45Z",
    "duration": 0,
    "ended": "2020-08-13T18:28:45Z",
    "error_code": 0,
    "error_detail": "string",
    "id": 0,
    "k6_archive": "string",
    "load_time": 0,
    "note": "string",
    "organization_id": 0,
    "processing_status": 0,
    "project_id": 0,
    "public_id": 0,
    "result_status": 0,
    "run_process": "string",
    "run_status": 0,
    "script": "string",
    "started": "2020-08-13T18:28:45Z",
    "stopped_by_id": 0,
    "test_id": 0,
    "user_id": 0,
    "version": "string",
    "vus": 0
  }
}
```

</CodeGroup>

## Read load test run

Returns details of a test run with the specified ID.
The response contains several fields about test-run status.

The `run_status` field describes how far the test run is in the execution pipeline.
Possible values are the following:

| Value | Description                                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------------------------- |
| -2    | CREATED - test run is created in our system.                                                                                  |
| -1    | VALIDATED - test run passed script and subscription validation.                                                               |
| 0     | QUEUED - test run is waiting for an empty slot in execution queue.                                                            |
| 1     | INITIALIZING - load generator instances are being allocated for the test run.                                                 |
| 2     | RUNNING - test run is currently executing.                                                                                    |
| 3     | FINISHED - test run has finished executing.                                                                                   |
| 4     | TIMED_OUT - test run has timed out (usually because data took too long to arrive/process).                                    |
| 5     | ABORTED_BY_USER - test run was aborted by user.                                                                               |
| 6     | ABORTED_BY_SYSTEM - test run was aborted by our system (usually because of some error).                                       |
| 7     | ABORTED_BY_SCRIPT_ERROR - test run was aborted due to an error in the script.                                                 |
| 8     | ABORTED_BY_THRESHOLD - test run was aborted because a threshold defined in k6 script was reached.                             |
| 9     | ABORTED_BY_LIMIT - test run was aborted because of a limit in script definition or execution (e.g. subscription limitations). |

`processing_status` - Describes if system is (still) processing metric data for the test run. Possible values are:

| Value | Description                                                                              |
| ----- | ---------------------------------------------------------------------------------------- |
| 0     | NOT_STARTED - data processing has not started yet.                                       |
| 1     | PROCESSING - data processing is in progress.                                             |
| 2     | FINISHED - data processing is finished and all metrics are available.                    |
| 3     | ERROR - there was an error in data processing and some or all metrics are not available. |

`result_status` - Describes if the test has passed or failed. Possible values are:

| Value | Description                                             |
| ----- | ------------------------------------------------------- |
| 0     | PASSED - all criteria defined in k6 script have passed. |
| 1     | FAILED - on or more criteria in k6 script has failed.   |

**GET** `https://api.k6.io/loadtests/v2/runs/{id}`

| Path Parameter | Type    | Description         |
| -------------- | ------- | ------------------- |
| id             | integer | ID of the test run. |

| Query Parameter | Type   | Description                           | Example                                                      |
| --------------- | ------ | ------------------------------------- | ------------------------------------------------------------ |
| \$select        | string | Specify a subset of fields to return. | `/loadtests/v2/runs/1?$select=id,test_id,run_status,created` |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-run": {
    "config": {},
    "created": "2020-08-18T13:33:41",
    "duration": 120,
    "ended": "2020-08-18T13:36:02",
    "error_code": null,
    "error_detail": null,
    "export": null,
    "id": 0,
    "is_baseline": false,
    "k6_archive": "string",
    "load_time": 75.0,
    "note": "",
    "organization_id": 0,
    "processing_status": 2,
    "project_id": 0,
    "public_id": null,
    "request_builder_config": null,
    "result_status": 1,
    "run_process": "k6 to Cloud",
    "run_status": 3,
    "script": "",
    "started": "2020-08-18T13:34:04",
    "stopped_by_id": 0,
    "test_id": 0,
    "user_id": 0,
    "version": 2,
    "vus": 200,
    "vus_per_instance": 0
  }
}
```

</CodeGroup>

## List load test runs

Returns test runs for a particular test.

**GET** `https://api.k6.io/loadtests/v2/runs?test_id={test_id}`

| Query Parameter | Type    | Description                           | Example                                                              |
| --------------- | ------- | ------------------------------------- | -------------------------------------------------------------------- |
| test_id         | integer | ID of the test.                       | `/loadtests/v2/runs?$test_id=1`                                      |
| \$select        | string  | Specify a subset of fields to return. | `/loadtests/v2/runs?$test_id=1&select=id,test_id,run_status,created` |
| ids[]           | integer | Specify a subset test runs to return. | `/loadtests/v2/runs?$test_id=1&ids[]=1&ids[]=3`                      |
| public_id       | string  | Get a test run by public_id.          | `/loadtests/v2/runs?public_id={public_id}`                           |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-runs": [
    {
      "config": {},
      "created": "2020-08-18T13:33:41",
      "duration": 120,
      "ended": "2020-08-18T13:36:02",
      "error_code": null,
      "error_detail": null,
      "id": 0,
      "is_baseline": false,
      "k6_archive": "string",
      "load_time": 75.0,
      "note": "",
      "organization_id": 0,
      "processing_status": 2,
      "project_id": 0,
      "public_id": null,
      "request_builder_config": null,
      "result_status": 1,
      "run_process": "k6 to Cloud",
      "run_status": 3,
      "script": "",
      "started": "2020-08-18T13:34:04",
      "stopped_by_id": 0,
      "test_id": 0,
      "user_id": 0,
      "version": 2,
      "vus": 200,
      "vus_per_instance": 0
    }
  ],
  "meta": {
    "count": 1
  }
}
```

</CodeGroup>


## Stop load test run

Manually stops a test run. If you follow along in the app, the test-run will be marked as `Aborted (by User)`. Note that can take a few moments before the test actually stops as the processor shuts down.

**POST** `/loadtests/v2/runs/<test_run_id>/stop`
