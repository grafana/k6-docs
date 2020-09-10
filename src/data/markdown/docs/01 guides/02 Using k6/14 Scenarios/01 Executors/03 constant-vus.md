---
title: 'Constant VUs'
excerpt: ''
---

## Description

A fixed number of VUs execute as many iterations as possible for a specified amount
of time. This executor is equivalent to the global `vus` and `duration` options.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option     | Type    | Description                                         | Default |
| ---------- | ------- | --------------------------------------------------- | ------- |
| `vus`      | integer | Number of VUs to run concurrently.                  | `1`     |
| `duration` | string  | Total scenario duration (excluding `gracefulStop`). | -       |

## When to use

Use this executor if you need a specific amount of VUs to run for a certain amount of time.

## Example

In this example, we'll run 10 VUs constantly for a duration 45 minutes.

<div class="code-group" data-props='{"labels": [ "constant-vus.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    my_awesome_api_test: {
      executor: 'constant-vus',
      vus: 10,
      duration: '45m',
    },
  },
};

export default function () {
  http.get('https://test-api.k6.io/');
  sleep(Math.random() * 3);
}
```

</div>
