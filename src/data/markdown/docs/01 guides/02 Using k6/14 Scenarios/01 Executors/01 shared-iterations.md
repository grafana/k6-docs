---
title: 'Shared iterations'
excerpt: ''
---

A fixed number of iterations are "shared" between a number of VUs, and the test ends
once all iterations are executed. This executor is equivalent to the global `vus` and
`iterations` options.

Note that iterations aren't fairly distributed with this executor, and a VU that
executes faster will complete more iterations than others.

#### Options

| Option        | Type    | Description                                                                        | Default |
| ------------- | ------- | ---------------------------------------------------------------------------------- | ------- |
| `vus`         | integer | Number of VUs to run concurrently.                                                 | `1`     |
| `iterations`  | integer | Total number of script iterations to execute across all VUs.                       | `1`     |
| `maxDuration` | string  | Maximum scenario duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

#### When to use

This executor is suitable when you want a specific amount of VUs to complete a fixed
number of total iterations, and the amount of iterations per VU is not important.

#### Examples

- Execute 200 total iterations shared by 10 VUs with a maximum duration of 10 seconds:

<div class="code-group" data-props='{"labels": [ "shared-iters.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>
