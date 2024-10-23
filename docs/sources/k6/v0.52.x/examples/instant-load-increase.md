---
title: 'Instant load increase'
description: 'Scripting example on how to instantly increase the number of VUs or iterations and hold them for a period of time'
draft: 'false'
weight: 22
---

# Instant load increase

One of the common usages of load testing tools it's the so-called stepped arrival rate.

In k6 we can achieve it with the following configuration.

Here's an example on how to instantly increase the number of iterations and hold them for a period of time.

{{< code >}}

```javascript
export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      preAllocatedVUs: 50,
      timeUnit: '1s',
      startRate: 50,
      stages: [
        { target: 200, duration: '30s' }, // linearly go from 50 iters/s to 200 iters/s for 30s
        { target: 500, duration: '0' }, // instantly jump to 500 iters/s
        { target: 500, duration: '10m' }, // continue with 500 iters/s for 10 minutes
      ],
    },
  },
};
```

{{< /code >}}

Here's an example on how to instantly increase the number of VUs and hold them for a period of time.

{{< code >}}

```javascript
export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      preAllocatedVUs: 10,
      startVUs: 3,
      stages: [
        { target: 20, duration: '30s' }, // linearly go from 3 VUs to 20 VUs for 30s
        { target: 100, duration: '0' }, // instantly jump to 100 VUs
        { target: 100, duration: '10m' }, // continue with 100 VUs for 10 minutes
      ],
    },
  },
};
```

{{< /code >}}
