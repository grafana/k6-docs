---
title: 'group( name, fn )'
description: 'Runs code inside a group. Used to organize results in a test.'
---

# group( name, fn )

{{< admonition type="note" >}}

For details about using the `check()` function with async values, refer to the jslib utils [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils/check/).

{{< /admonition >}}

Run code inside a group. Groups are used to organize results in a test.

| Parameter | Type     | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| name      | string   | Name of the group.                                     |
| fn        | function | Group body - code to be executed in the group context. |

### Returns

| Type | Description               |
| ---- | ------------------------- |
| any  | The return value of _fn_. |

## Asynchronous groups

Starting with k6 v2.3.0, enable the experimental `async-metric-context` [feature flag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/feature-flags/) to use `group()` with asynchronous code:

```sh
k6 run --features async-metric-context script.js
```

With this flag, `group()` accepts an async callback or a callback that returns a Promise. Metrics emitted after `await` or inside Promise handlers retain the group's tags and metadata. Await the group to wait for its work before continuing:

<!-- md-k6:arg.--features=async-metric-context -->
```javascript
import { check, group } from 'k6';
import http from 'k6/http';

export default async function () {
  await group('load product pages', async () => {
    const response = await http.asyncRequest('GET', 'https://test.k6.io/');
    check(response, { 'status is 200': (r) => r.status === 200 });
  });
}
```

The request and check carry the `::load product pages` group tag. The `group_duration` metric measures elapsed time until the returned Promise fulfills or rejects, including time spent waiting. Return or await all work you want included in that duration. Starting a timer or registering an event listener alone doesn't make the group wait for it.

The callback starts immediately. For asynchronous results, `group()` returns a Promise that preserves the callback's fulfillment value or rejection reason. Synchronous callbacks continue to return their result directly.

### Tags and metadata

With the flag enabled, `group_duration` uses the tags and metadata present when the group starts, for both synchronous and asynchronous callbacks. Changes made inside the callback apply to metrics emitted there, but don't change the tags on `group_duration` or leak into the calling code.

The flag also preserves the tags and metadata present when you register a Promise handler, call `setTimeout()` or `setInterval()`, or register a `k6/websockets` or gRPC stream listener. Each callback runs with that context, even if other code changes the VU's tags before it runs. A repeating timer starts each callback with its original context.

### Without the feature flag

Async callbacks remain unsupported and cause an error. Starting Promise chains inside a synchronous group is also unsupported: work after the callback returns can lose its group tag, and `group_duration` doesn't include that work. Use synchronous callbacks unless you enable `async-metric-context`.

### Example

```javascript
import { group } from 'k6';

export default function () {
  group('visit product listing page', function () {
    // ...
  });
  group('add several products to the shopping cart', function () {
    // ...
  });
  group('visit login page', function () {
    // ...
  });
  group('authenticate', function () {
    // ...
  });
  group('checkout process', function () {
    // ...
  });
}
```

The above code will present the results separately depending on the group execution.

Learn more on [Groups and Tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).
