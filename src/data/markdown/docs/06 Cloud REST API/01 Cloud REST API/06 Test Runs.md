---
title: 'Test Runs'
excerpt: ''
draft: 'true'
---

## Start test run

Starts a test-run in the k6 cloud. It uses the specified test ID, previously retrieved from the create-test endpoint. The test-run will be managed by the k6 Cloud from beginning to end. Testing progress can be seen in the k6 Cloud application. From there you can also export and analyze the result.

**POST** `/loadtests/v2/tests/{id}/start-testrun`

| Path Parameter | Type | Description |
| ----------| ---- | ----------- |
| id | integer | A unique integer value identifying this test. |

<div class="code-group" data-props='{"labels": ["Response"]}'>

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

</div>
