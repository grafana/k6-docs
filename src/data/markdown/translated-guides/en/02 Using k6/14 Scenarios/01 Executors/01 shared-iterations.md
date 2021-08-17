---
title: 'Shared iterations'
excerpt: 'A fixed number of iterations are "shared" between a number of VUs, and the test ends once all iterations are executed.'
---

## Description

A fixed number of iterations are "shared" between a number of VUs, and the test ends once all iterations are executed. This executor is equivalent to the global [vus](/using-k6/options#vus) and [iterations](/using-k6/options#iterations) shortcut options.

Note that iterations aren't fairly distributed with this executor, and a VU that executes faster will complete more iterations than others. If you want guarantees that every VU will complete a specific, fixed number of iterations, [use the per-VU iterations executor](/using-k6/scenarios/executors/per-vu-iterations).

## Options

In addition to the [common configuration options](/using-k6/scenarios#common-options) this executor
also adds the following options:

| Option        | Type    | Description                                                                        | Default |
| ------------- | ------- | ---------------------------------------------------------------------------------- | ------- |
| vus         | integer | Number of VUs to run concurrently.                                                 | `1`     |
| iterations  | integer | Total number of script iterations to execute across all VUs.                       | `1`     |
| maxDuration | string  | Maximum scenario duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

## When to use

This executor is suitable when you want a specific amount of VUs to complete a fixed
number of total iterations, and the amount of iterations per VU is not important.

## Example

In this example, we'll execute 200 total iterations shared by 10 VUs with a maximum duration of 10 seconds

<CodeGroup labels={[ "shared-iters.js" ]} lineNumbers={[true]}>

```javascript
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

</CodeGroup>
