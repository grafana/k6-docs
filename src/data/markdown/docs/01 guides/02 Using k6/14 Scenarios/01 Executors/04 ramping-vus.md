---
title: 'Ramping VUs'
excerpt: ''
---

## Description

A variable number of VUs execute as many iterations as possible for a specified
amount of time. This executor is equivalent to the global `stages` option.

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option               | Type    | Description                                                                                    | Default |
| -------------------- | ------- | ---------------------------------------------------------------------------------------------- | ------- |
| `stages*`           | array   | Array of objects that specify the target number of VUs to ramp up or down to.                   | `[]`    |
| `startVUs`           | integer | Number of VUs to run at test start.                                                            | `1`     |
| `gracefulRampDown`   | string  | Time to wait for an already started iteration to finish before stopping it during a ramp down. | `"30s"` |

## When to use

This executor is a good fit if you need VUs to ramp up or down during specific periods
of time.

## Example

In this example, we'll run a two-stage test, ramping up from 0 to 100 VUs for 5 seconds, and down
to 0 VUs over 5 seconds.

<div class="code-group" data-props='{"labels": [ "ramping-vus.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 100 },
        { duration: '5s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>

Note the setting of `gracefulRampDown` to 0 seconds, which could cause some iterations to be
interrupted during the ramp down stage.
