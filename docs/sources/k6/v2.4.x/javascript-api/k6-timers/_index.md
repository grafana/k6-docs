---
aliases:
  - ./k6-experimental/timers # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/timers
title: 'k6/timers'
description: 'k6 timers API'
weight: 11
---

# k6/timers

{{< docs/shared source="k6" lookup="javascript-api/k6-timers.md" version="<K6_VERSION>" >}}

{{< admonition type="note" >}}

When you enable the experimental [`async-metric-context` feature flag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/feature-flags), `setTimeout()` and `setInterval()` capture the tags and metadata active when you register their callbacks. Each callback runs with a copy of that context. Repeating intervals reuse the original registration context for every invocation, so changes made by one invocation don't leak into the next one or into the calling code.

Promise reactions and `await` continuations created inside a timer callback keep any context changes made by that callback.

{{< /admonition >}}

## Example

```javascript
export default function () {
  const intervalId = setInterval(() => {
    console.log('This runs every 200ms');
  }, 200);

  const timeoutId = setTimeout(() => {
    console.log('This runs after 2s');

    // clear the timeout and interval to exit k6
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  }, 2000);
}
```
