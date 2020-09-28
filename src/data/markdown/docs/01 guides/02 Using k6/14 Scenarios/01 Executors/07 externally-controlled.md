---
title: 'Externally controlled'
excerpt: ''
---

## Description

Control and scale execution at runtime via [k6's REST API](/misc/k6-rest-api) or
the [CLI](https://k6.io/blog/how-to-control-a-live-k6-test).

Previously, the `pause`, `resume`, and `scale` CLI commands were used to globally control
k6 execution. This executor does the same job by providing a better API that can be used to
control k6 execution at runtime.

Note that, passing arguments to the `scale` CLI command for changing the amount of active or
maximum VUs will only affect the externally controlled executor.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option     | Type    | Description                                         | Default |
| ---------- | ------- | --------------------------------------------------- | ------- |
| `vus`      | integer | Number of VUs to run concurrently.                  | -       |
| `maxVUs`   | integer | Maximum number of VUs to allow during the test run. | -       |
| `duration` | string  | Total test duration.                                | -       |

## When to use

If you want to control the number of VUs while the test is running.

Important: this is the only executor that is not supported in `k6 cloud`, it can only be used
locally with `k6 run`.

## Examples

In this example, we'll execute a test controllable at runtime, starting with 0 VUs up to
a maximum of 50, and a total duration of 10 minutes.

<div class="code-group" data-props='{"labels": [ "externally-controlled.js" ], "lineNumbers": "true"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'externally-controlled',
      vus: 0,
      maxVUs: 50,
      duration: '10m',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>
