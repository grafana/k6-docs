---
title: 'Graceful stop'
excerpt: ''
---

> ### 🎉 New in v0.27.0
>
> This feature is new as of version 0.27.0. It is intended as a way of avoiding
> iterations to be interrupted once the duration has been exceeded or while ramping
> down

## Description

This option is available for all executors except `externally-controlled` and allows the
user to specify a duration to wait before forcefully interrupting them. The default value
of this property is `30s`.

## Example

<div class="code-group" data-props='{"labels": [ "graceful-stop.js" ], "lineNumbers": "[true]"}'>

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
      gracefulRampDown: '3s',
      gracefulStop: '3s',
    },
  },
};

export default function () {
  let delay = Math.floor(Math.random() * 5) + 1;
  http.get(`https://httpbin.test.k6.io/delay/${delay}`);
}
```

</div>

Running this script would result in something like:

```bash
running (13.0s), 000/100 VUs, 177 complete and 27 interrupted iterations
contacts ✓ [======================================] 001/100 VUs  10s
```

Notice that even though the total test duration is 10s, the actual execution time was 13s
because of `gracefulStop`, and some iterations were interrupted since they exceeded
the configured 3s of both `gracefulStop` and `gracefulRampDown`.

## Additional Information

A similar option exists for the [ramping-vus](/using-k6/scenarios/executors/ramping-vus) executor: `gracefulRampDown`. This
specifies the time k6 should wait for any iterations in progress to finish before
VUs are returned to the global pool during a ramp down period defined in `stages`.
