---
title: "k6/execution"
excerpt: "Get information about the current test's execution state."
---

k6 v0.34.0 introduced the capability for getting information about the current test execution state, from inside of the test's script.

It can be used by importing the `k6/execution` module.

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
import exec from 'k6/execution';

var options = {
  scenarios: {
    'myscenario': { // this will be the returned name
      executor: 'shared-iterations',
      maxDuration: '30m'
    }
  }
}

export default function() {
  console.log(exec.scenario.name) // myscenario 
}
```

</div>

The module has a default export that has the following keys: `scenario`, `instance` and `vu`, which in themselves expose information specific to the context in which they are being accessed.

> ### ℹ️ Identifiers
>
> All unique identifiers are sequentially generated starting from a base of zero (iterations) or one (VU IDs). In distributed/cloud test runs, the test-wide iteration numbers and VU identifiers are still going to be unique across instances, though there might be gaps in the sequences when, for example, some instances execute faster iterations than others or allocate more VUs mid-test.

## scenario
| Field               | Type    | Description                                                              |
|---------------------|---------|--------------------------------------------------------------------------|
| name                | string  | The assigned name of the running scenario.                                |
| executor            | string  | The name of the running [Executor](https://k6.io/docs/using-k6/scenarios/#executors) type.                                                |
| startTime           | integer | The Unix timestamp in milliseconds when the scenario started.                                                                           |
| progress            | float   | Percentage in a 0 to 1 interval of the scenario progress.                    |
| iterationInInstance | integer | The unique and zero-based sequential number of the current iteration in the scenario, across the current instance. |
| iterationInTest     | integer | The unique and zero-based sequential number of the current iteration in the scenario, across the entire test. It is unique in all k6 execution modes - in local, cloud and distributed/segmented test runs. However, while every instance will get non-overlapping index values in cloud/distributed tests, they might iterate over them at different speeds, so the values won't be sequential across them. |

## instance
| Field               | Type    | Description                                                              |
|---------------------|---------|--------------------------------------------------------------------------|
| iterationsInterrupted                | integer  | The number of prematurely interrupted iterations in the current instance. |
| iterationsCompleted     | integer | The number of completed iterations in the current instance.  |
| vusActive            | integer  | The number of active VUs.                                                |
| vusInitialized           | integer | The number of currently initialized VUs.                                                                           |
| currentTestRunDuration            | float   | The time passed from the start of the current test run in milliseconds.                    |

## vu 
| Field               | Type    | Description                                                              |
|---------------------|---------|--------------------------------------------------------------------------|
| iterationInInstance | integer | The identifier of the iteration in the current instance.                                                                 |
| iterationInScenario | integer | The identifier of the iteration in the current scenario.                  |
| idInInstance        | integer | The identifier of the VU across the instance.                            |
| idInTest            | integer | The globally unique (across the whole test run) identifier of the VU.                                  |

## Examples and use cases
### Get unique data once
A common use case is getting a unique and incremental index for accessing a dataset's item only once per test.

The `scenario.iterationInTest` field can be used for this case. Let's show an example:

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
import exec from "k6/execution";
import { SharedArray } from "k6/data";

var items = 10;
var data = new SharedArray("mydata", function() {
  var arr = new Array(items);
  for (var i = 0; i < items; i++) {
    arr[i] = {"foo": "item" + i, "bar": "12345678"}
  }
  return arr;
});

export const options = {
  scenarios: {
    "use-all-the-data": {
      executor: "shared-iterations",
      vus: 3,
      iterations: data.length, // here you can also multiply so it goes through it multiple times
      maxDuration: "1h" // this will need to be big enough so that all the iterations can happen if that is what is wanted
    }
  }
}

export default function() {
  var item = data[exec.scenario.iterationInTest];
  console.log('my item:', item)
}
```

</div>

### Timing operations
The `startTime` property from the `scenario` object can be used to time operations.

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
import exec from 'k6/execution';

export default function() {
  // do some long operations
  ...	
  console.log("step1 took:", new Date() - new Date(exec.scenario.startTime))
	
  // some more long operations
  ...
  console.log("step2 took:", new Date() - new Date(exec.scenario.startTime))
}
```

</div>

### Script naming
The `name` property can be used for executing the logic based on which script is currently running.

<div class="code-group" data-props='{"labels": [], "lineNumbers": [true]}'>

```javascript
import exec from 'k6/execution';

var options = {
  scenarios: {
    'the-first': {
	...
    },
    'the-second': {
	...
    }
  }
};

export default function() {
  if (exec.scenario.name == "the-first") {
    // do some logic during this scenario
  } else {
    // do some other logic in the others
  }
}
```

</div>
