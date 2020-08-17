---
title: 'Tests'
excerpt: ''
draft: 'true'
---


## List tests

Returns all tests within a specified project (if project is not specified then default project will be used). You may sort or query the results with the specfied options.

**GET** `/loadtests/v2/tests`

| Query Parameters | Type | Description | Example |
| ----------| ---- | ----------- | ---------- |
| project_id | integer | Returns tests who are associated with a given project_id | `/loadtests/v2/tests?project_id={project_id}` |
| ids[] | integer | Returns tests with given ids. | `/loadtests/v2/tests?ids[]={id_1}&ids[]={id_2}` |
| order_by | string | Allows you to select the parameter to use to order the returned tests. Available parameter values: id, name, last_run_time. | `/loadtests/v2/tests?project_id={project_id}&order_by=last_run_time` |
| q | string | Returns tests who contain the specified string in their name field. | `/loadtests/v2/tests?project_id={project_id}&q=some_string` |
| page | integer | A page number within the paginated result set. | `/loadtests/v2/tests?project_id={project_id}&page=2&page_size=5` |
| page_size | integer | Number of results to return per page. | `/loadtests/v2/tests?project_id={project_id}&page=2&page_size=5` |


<div class="code-group" data-props='{"labels": ["Response"]}'>

```json
{
    "k6-runs": [ ],
    "k6-tests": [{
        "id": 0,
        "project_id": 0,
        "user_id": 0,
        "name": "string",
        "created": "2020-08-13T18:28:45Z",
        "updated": "2020-08-13T18:28:45Z",
        "last_test_run_id": "string",
        "test_run_ids": [0],
        "script": "string"
    }],
    "load_zones": [ ],
    "meta": {
        "count": 1
    }
}
```

</div>

## Read test

Returns details of a test with the specified ID.

**GET** `/loadtests/v2/tests/{id}`

| Path Parameter | Type | Description |
| ----------| ---- | ----------- |
| id | integer | A unique integer value identifying this test. |



<div class="code-group" data-props='{"labels": ["Response"]}'>

```json
{
    "k6-test": {
        "id": 0,
        "project_id": 0,
        "user_id": 0,
        "name": "string",
        "created": "2020-08-13T18:28:45Z",
        "updated": "2020-08-13T18:28:45Z",
        "last_test_run_id": "string",
        "test_run_ids": [],
        "script": "string"
    }
}
```

</div>

## Update test

Partially updates a test in Load Impact. Note: only given fields will be updated.

**PATCH** `/loadtests/v2/tests/{id}`

| Path Parameter | Type | Description |
| ----------| ---- | ----------- |
| id | integer | A unique integer value identifying this test. |

| Request Body Parameter | Type | Description |
| ----------| ---- | ----------- |
| name | string |  |
| script | string | |


<div class="code-group" data-props='{"labels": ["Response"]}'>

```json
{
    "k6-test": {
        "id": 0,
        "project_id": 0,
        "user_id": 0,
        "name": "string",
        "created": "2020-08-13T18:28:45Z",
        "updated": "2020-08-13T18:28:45Z",
        "last_test_run_id": "string",
        "test_run_ids": [0],
        "script": "string"
    }
}
```

</div>

## Delete test

Deletes a test with the specified test ID.

**DELETE** `/loadtests/v2/tests/{id}`

| Path Parameter | Type | Description |
| ----------| ---- | ----------- |
| id | integer | A unique integer value identifying this test. |

**RESPONSE** `204`