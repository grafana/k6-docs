---
title: 'Tests'
excerpt: ''
---

To read, update, and start tests, use the `/loadtests/v2/tests/` path.

## List load tests

Returns all tests within a specified project.
If no project is specified, k6 returns the default project.

You MAY sort or query the results with query parameters.

**GET** `https://api.k6.io/loadtests/v2/tests`

| Query Parameters | Type    | Description                                                                                                          | Example                                                              |
|------------------|---------|----------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|
| project_id       | integer | Returns tests associated with a given project_id                                                                     | `/loadtests/v2/tests?project_id={project_id}`                        |
| ids[]            | integer | Returns tests with given ids.                                                                                        | `/loadtests/v2/tests?ids[]={id_1}&ids[]={id_2}`                      |
| order_by         | string  | Selects the parameter to use to order the returned tests. Available parameter values: `id`, `name`, `last_run_time`. | `/loadtests/v2/tests?project_id={project_id}&order_by=last_run_time` |
| q                | string  | Returns tests whose `name` property matches the queried string.                                                      | `/loadtests/v2/tests?project_id={project_id}&q=some_string`          |
| page             | integer | A page number within the paginated result set.                                                                       | `/loadtests/v2/tests?project_id={project_id}&page=2&page_size=5`     |
| page_size        | integer | Number of results to return per page.                                                                                | `/loadtests/v2/tests?project_id={project_id}&page=2&page_size=5`     |

<CodeGroup labels={["Response"]}>

```json
{
  "k6-runs": [],
  "k6-tests": [
    {
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
  ],
  "load_zones": [],
  "meta": {
    "count": 1
  }
}
```

</CodeGroup>

## Read test

Returns details of a test with the specified ID.

**GET** `https://api.k6.io/loadtests/v2/tests/{id}`

| Path Parameter | Type    | Description                                   |
| -------------- | ------- | --------------------------------------------- |
| id             | integer | A unique integer value identifying this test. |

<CodeGroup labels={["Response"]}>

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

</CodeGroup>

## Update test

Partially updates a test in k6 Cloud.

<Blockquote>

This patch updates only the specified fields.

</Blockquote>

**PATCH** `https://api.k6.io/loadtests/v2/tests/{id}`

| Path Parameter | Type    | Description                                   |
| -------------- | ------- | --------------------------------------------- |
| id             | integer | A unique integer value identifying this test. |

| Request Body Parameter | Type   | Description                                          |
| ---------------------- | ------ | ---------------------------------------------------- |
| name                   | string | Name of the test.                                    |
| script                 | string | k6 script to use when starting test runs. |

<CodeGroup labels={["Response"]}>

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

</CodeGroup>

## Delete test

Deletes a test with the specified test ID.

**DELETE** `https://api.k6.io/loadtests/v2/tests/{id}`

| Path Parameter | Type    | Description                                   |
| -------------- | ------- | --------------------------------------------- |
| id             | integer | A unique integer value identifying this test. |

**RESPONSE** `204`

