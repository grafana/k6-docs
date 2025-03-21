---
aliases:
  - ./k6-experimental/timers # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/timers
title: 'k6/timers'
description: 'k6 timers API'
weight: 11
---

# k6/timers

{{< docs/shared source="k6" lookup="javascript-api/k6-timers.md" version="<K6_VERSION>" >}}

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
