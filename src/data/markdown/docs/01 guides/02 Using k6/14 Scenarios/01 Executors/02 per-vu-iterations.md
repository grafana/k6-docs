---
title: 'Per VU iterations'
excerpt: ''
---

## Description

Each VU executes an exact number of iterations. The total number of completed
iterations will be `vus * iterations`.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option        | Type    | Description                                                                        | Default |
| ------------- | ------- | ---------------------------------------------------------------------------------- | ------- |
| `vus`         | integer | Number of VUs to run concurrently.                                                 | `1`     |
| `iterations`  | integer | Number of `exec` function iterations to be executed by each VU.                    | `1`     |
| `maxDuration` | string  | Maximum scenario duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

## When to use

Use this executor if you need a specific amount of VUs to complete the same amount of
iterations. This can be useful when you have fixed sets of test data that you want to
partition between VUs.

## Example

In this example, we'll let 10 VUs execute 20 iterations _each_, for a total of 200 iterations, with
a maximum duration of 1 hour and 30 minutes.

<div class="code-group" data-props='{"labels": [ "per-vu-iters.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '1h30m',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>
