---
title: 'k6/execution'
description: "Get information about the current test's execution state."
weight: 06
---

# k6/execution

`k6/execution` provides the capability to get information about the current test execution state inside the test script. You can read in your script the execution state during the test execution and change your script logic based on the current state.

The `k6/execution` module provides the test execution information with the following properties:

- [instance](#instance)
- [scenario](#scenario)
- [test](#test)
- [vu](#vu)

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
import exec from 'k6/execution';

export const options = {
  scenarios: {
    myscenario: {
      // this will be the returned name
      executor: 'shared-iterations',
      maxDuration: '30m',
    },
  },
};

export default function () {
  console.log(exec.scenario.name); // myscenario
}
```

</div>

> ℹ️ **Identifiers**
>
> All unique identifiers are sequentially generated starting from a base of zero (iterations) or one (VU IDs). In distributed/cloud test runs, the test-wide iteration numbers and VU identifiers are still going to be unique across instances, though there might be gaps in the sequences when, for example, some instances execute faster iterations than others or allocate more VUs mid-test.

### instance

The instance object provides information associated with the load generator instance. You can think of it as the current running k6 process, which will likely be a single process if you are running k6 on your local machine. When running a cloud/distributed test with multiple load generator instances, the values of the following properties can differ across instances.

| Property               | Type    | Description                                                               |
| ---------------------- | ------- | ------------------------------------------------------------------------- |
| iterationsInterrupted  | integer | The number of prematurely interrupted iterations in the current instance. |
| iterationsCompleted    | integer | The number of completed iterations in the current instance.               |
| vusActive              | integer | The number of active VUs.                                                 |
| vusInitialized         | integer | The number of currently initialized VUs.                                  |
| currentTestRunDuration | float   | The time passed from the start of the current test run in milliseconds.   |

### scenario

Meta information and execution details about the current running [scenario](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios).

| Property            | Type    | Description                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                | string  | The assigned name of the running scenario.                                                                                                                                                                                                                                                                                                                                           |
| executor            | string  | The name of the running [Executor](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios#executors) type.                                                                                                                                                                                                                                                                      |
| startTime           | integer | The Unix timestamp in milliseconds when the scenario started.                                                                                                                                                                                                                                                                                                                        |
| progress            | float   | Percentage in a 0 to 1 interval of the scenario progress.                                                                                                                                                                                                                                                                                                                            |
| iterationInInstance | integer | The unique and zero-based sequential number of the current iteration in the scenario, across the current instance.                                                                                                                                                                                                                                                                   |
| iterationInTest     | integer | The unique and zero-based sequential number of the current iteration in the scenario. It is unique in all k6 execution modes - in local, cloud and distributed/segmented test runs. However, while every instance will get non-overlapping index values in cloud/distributed tests, they might iterate over them at different speeds, so the values won't be sequential across them. |

### test

Control the test execution.

| Property        | Type     | Description                                                                                                                                                                                                                                                                                                                                              |
| --------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| abort([String]) | function | It aborts the test run with the exit code `108`, and an optional string parameter can provide an error message. Aborting the test will not prevent the `teardown()` execution.                                                                                                                                                                           |
| options         | Object   | It returns an object with all the test options as properties. The options' values are consolidated following the [order of precedence](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to#order-of-precedence) and derived if shortcuts have been used. It returns `null` for properties where the relative option hasn't been defined. |

### vu

Meta information and execution details about the current vu.

| Property            | Type    | Description                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iterationInInstance | integer | The identifier of the iteration in the current instance for this VU. This is only unique for current VU and this instance (if multiple instances). This keeps being aggregated if a given VU is reused between multiple scenarios.                                                                                                          |
| iterationInScenario | integer | The identifier of the iteration in the current scenario for this VU. This is only unique for current VU and scenario it is currently executing.                                                                                                                                                                                             |
| idInInstance        | integer | The identifier of the VU across the instance. Not unique across multiple instances.                                                                                                                                                                                                                                                         |
| idInTest            | integer | The globally unique (across the whole test run) identifier of the VU.                                                                                                                                                                                                                                                                       |
| metrics.tags        | object  | The map that gives control over [VU's Tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#tags). The Tags will be included in every metric emitted by the VU and the Tags' state is maintained across different iterations of the same Scenario while the VU exists. Check how to use it in the [example](#tags) below. |
| metrics.metadata    | object  | The map that gives control over VU's Metadata. The Metadata will be included in every metric emitted by the VU and the Metadata's state is maintained across different iterations of the same Scenario while the VU exists. Check how to use it in the [example](#metadata) below.                                                          |

{{< collapse title="Setting vu.metrics.tags" >}}

Setting a Tag with the same key as a [system tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#system-tags) is allowed, but it requires attention to avoid unexpected results. Overwriting system tags will not throw an error, but in most cases will not actually change the value of the emitted metrics as expected. For example, trying to set the `url` tag value will not result in a changed tag value when `http.get()` is called, since the tag value is determined by the HTTP request itself. However, it will add the tag `url` to the metric samples emitted by a `check()` or `metric.add()`, which is probably not the desired behavior. On the other hand, setting the `name` tag will work as expected, since that was already supported for `http.*` methods, for the purposes of the [URL Grouping](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests#url-grouping) feature.

Not all the types are accepted as a tag value: k6 supports strings, numbers and boolean types. Under the hood, the `tags` object handles a Tag as a `String` key-value pair, so all the types will be implicitly converted into a string. If one of the denied types is used (e.g. Object or Array) and the [`throw` option](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#throw) is set, an exception will be thrown. Otherwise, only a warning is printed and the tag value will be discarded.

{{< /collapse >}}

## Examples and use cases

### Getting unique data once

This is a common use case for data parameterization, you can read the [examples](https://grafana.com/docs/k6/<K6_VERSION>/examples/data-parameterization#retrieving-unique-data) using `scenario.iterationInTest` and `vu.idInTest`.

### Timing operations

The `startTime` property from the `scenario` object can be used to time operations.

{{< code >}}

```javascript
import exec from 'k6/execution';

export default function () {
  // do some long operations
  // ...
  console.log(`step1: scenario ran for ${new Date() - new Date(exec.scenario.startTime)}ms`);

  // some more long operations
  //...
  console.log(`step2: scenario ran for ${new Date() - new Date(exec.scenario.startTime)}ms`);
}
```

{{< /code >}}

### Script naming

The `name` property can be used for executing the logic based on which script is currently running.

> **Tip**:
> If you need to run [multiple scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/advanced-examples#using-multiple-scenarios) in your script you can use `exec` option achieve a similar goal

{{< code >}}

```javascript
import exec from 'k6/execution';

export const options = {
  scenarios: {
    'the-first': {
      // ...
    },
    'the-second': {
      // ...
    },
  },
};

export default function () {
  if (exec.scenario.name === 'the-first') {
    // do some logic during this scenario
  } else {
    // do some other logic in the others
  }
}
```

{{< /code >}}

### Test Abort

Aborting is possible during initialization:

{{< code >}}

```javascript
import exec from 'k6/execution';
exec.test.abort();
```

{{< /code >}}

As well as inside the `default` function:

{{< code >}}

```javascript
import exec from 'k6/execution';

export default function () {
  // Note that you can abort with a specific message too
  exec.test.abort('this is the reason');
}

export function teardown() {
  console.log('teardown will still be called after test.abort()');
}
```

{{< /code >}}

### Get test options

Get the consolidated and derived options' values

{{< code >}}

```javascript
import exec from 'k6/execution';

export const options = {
  stages: [
    { duration: '5s', target: 100 },
    { duration: '5s', target: 50 },
  ],
};

export default function () {
  console.log(exec.test.options.paused); // null
  console.log(exec.test.options.scenarios.default.stages[0].target); // 100
}
```

{{< /code >}}

### Tags

The `vu.metrics.tags` property can be used for getting or setting [VU's tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#tags).

{{< code >}}

```javascript
import http from 'k6/http';
import exec from 'k6/execution';

export default function () {
  exec.vu.metrics.tags['mytag'] = 'value1';
  exec.vu.metrics.tags['mytag2'] = 2;

  // the metrics these HTTP requests emit will get tagged with `mytag` and `mytag2`:
  http.batch(['https://test.k6.io', 'https://test-api.k6.io']);
}
```

{{< /code >}}

`vu.tags` (without `metrics`) can also be used, but is deprecated for the more context-specific variant.

### Metadata

The `vu.metrics.metadata` property can be used for getting or setting VU's metadata. It is similar to `tags`, but can be used for high cardinality data. It also can not be used in thresholds and will likely be handled differently by each output.

{{< code >}}

```javascript
import http from 'k6/http';
import exec from 'k6/execution';

export default function () {
  exec.vu.metrics.metadata['trace_id'] = 'somecoolide';

  // the metrics these HTTP requests emit will get the metadata `trace_id`:
  http.batch(['https://test.k6.io', 'https://test-api.k6.io']);

  delete exec.vu.metrics.metadata['trace_id']; // this will unset it
  // which will make the metrics these requests to not have the metadata `trace_id` set on them.
  http.batch(['https://test.k6.io', 'https://test-api.k6.io']);
}
```

{{< /code >}}
