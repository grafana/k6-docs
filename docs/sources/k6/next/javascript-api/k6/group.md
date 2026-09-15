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

## Asynchronous callbacks

By default, `group()` rejects an `async` function callback. The error explains that you can enable async callbacks with the `async-metric-context` experimental feature flag by passing `--features async-metric-context` or setting `K6_FEATURES=async-metric-context`.

The `async-metric-context` feature is experimental and opt-in. It may change or be removed without notice. When you enable it, `group()` accepts async callbacks and callbacks that return a Promise-like value. Metric samples emitted by the callback keep the tags and metadata active when the async work starts, including the group's `group` tag.

For an async callback, `group_duration` measures from when `group()` invokes the callback until the returned Promise settles, whether it fulfills or rejects. The `group_duration` sample uses the tags and metadata captured when the group starts, including the new `group` tag. Changes to tags or metadata inside the callback don't retag the `group_duration` sample.

Enable the feature for a single run:

```sh
k6 run --features async-metric-context script.js
```

Alternatively, set the `K6_FEATURES=async-metric-context` environment variable. For more information about enabling experimental features, refer to [Feature flags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/feature-flags).

### Async callback example

The following example emits a custom metric before and after an asynchronous boundary:

<!-- md-k6:skip -->

```javascript
import { group } from 'k6';
import { Counter } from 'k6/metrics';

const events = new Counter('events');

export default async function () {
  await group('checkout', async function () {
    events.add(1, { phase: 'started' });

    await new Promise((resolve) => setTimeout(resolve, 10));

    events.add(1, { phase: 'finished' });
  });
}
```

Both `events` samples have the `group` tag `::checkout`. The `group_duration` sample includes the time spent waiting for the timer.

## Synchronous callback example

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
