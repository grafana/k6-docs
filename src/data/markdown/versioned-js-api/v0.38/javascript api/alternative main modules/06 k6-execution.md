---
title: "k6/execution"
shouldCreatePage: false
---

The `k6/execution` module provides the test execution information with the following properties:
- [instance](/javascript-api/k6-execution/#instance)
- [scenario](/javascript-api/k6-execution/#scenario)
- [test](/javascript-api/k6-execution/#vu)
- [vu](/javascript-api/k6-execution/#vu)

[instance](/javascript-api/k6-execution/#instance)

| Property                  | Type    | Description                                                              |
|------------------------|---------|--------------------------------------------------------------------------|
| iterationsInterrupted  | integer | The number of prematurely interrupted iterations in the current instance. |
| iterationsCompleted    | integer | The number of completed iterations in the current instance. |
| vusActive              | integer | The number of active VUs. |
| vusInitialized         | integer | The number of currently initialized VUs. |
| currentTestRunDuration | float   | The time passed from the start of the current test run in milliseconds. |

[scenario](/javascript-api/k6-execution/#scenario)

| Property               | Type    | Description                                                              |
|---------------------|---------|--------------------------------------------------------------------------|
| name                | string  | The assigned name of the running scenario. |
| executor            | string  | The name of the running [Executor](/using-k6/scenarios/#executors) type. |
| startTime           | integer | The Unix timestamp in milliseconds when the scenario started. |
| progress            | float   | Percentage in a 0 to 1 interval of the scenario progress. |
| iterationInInstance | integer | The unique and zero-based sequential number of the current iteration in the scenario, across the current instance. |
| iterationInTest     | integer | The unique and zero-based sequential number of the current iteration in the scenario. It is unique in all k6 execution modes - in local, cloud and distributed/segmented test runs. However, while every instance will get non-overlapping index values in cloud/distributed tests, they might iterate over them at different speeds, so the values won't be sequential across them. |

[test](/javascript-api/k6-execution/#test)

| Property | Type | Description |
|----------|------|-------------|
| abort([String]) | function | It aborts the test run with the exit code `108`, and an optional string parameter can provide an error message. Aborting the test will not prevent the `teardown()` execution. |
| options | Object | It returns an object with all the test options as properties. The options' values are consolidated following the [order of precedence](/using-k6/k6-options/how-to#order-of-precedence) and derived if shortcuts have been used. It returns `null` for properties where the relative option hasn't been defined. |

[vu](/javascript-api/k6-execution/#vu)

| Property               | Type    | Description                                                              |
|---------------------|---------|--------------------------------------------------------------------------|
| iterationInInstance | integer | The identifier of the iteration in the current instance. |
| iterationInScenario | integer | The identifier of the iteration in the current scenario. |
| idInInstance        | integer | The identifier of the VU across the instance. |
| idInTest            | integer | The globally unique (across the whole test run) identifier of the VU. |
