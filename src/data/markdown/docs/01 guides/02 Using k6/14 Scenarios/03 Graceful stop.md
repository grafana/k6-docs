---
title: 'Graceful stop'
excerpt: ''
---

Prior to v0.27.0, k6 would interrupt any iterations in progress when the test duration was reached
or when scaling down VUs with the stages option. In some cases this would lead to skewed metrics
and unexpected test results. Starting with v0.27.0, this behavior can be controlled through the
`gracefulStop` and `gracefulRampDown` options.

## Description

This option is available for all executors except `externally-controlled` and allows the
user to specify a duration to wait before forcefully interrupting them. The default value
of this property is `30s`.

## Example

<CodeGroup labels={[ "graceful-stop.js" ]} lineNumbers={[true]}>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 100,
      duration: '10s',
      gracefulStop: '3s',
    },
  },
};

export default function () {
  let delay = Math.floor(Math.random() * 5) + 1;
  http.get(`https://httpbin.test.k6.io/delay/${delay}`);
}
```

</CodeGroup>

Running this script would result in something like:

```bash
running (13.0s), 000/100 VUs, 349 complete and 23 interrupted iterations
contacts ✓ [======================================] 100 VUs  10s
```

Notice that even though the total test duration is 10s, the actual execution time was 13s
because of `gracefulStop`, giving the VUs a 3s additional time to complete iterations in progress. 23
of the iterations currently in progress did not complete within this window and was therefore interrupted.

## Additional Information

A similar option exists for the [ramping-vus](/using-k6/scenarios/executors/ramping-vus) executor: `gracefulRampDown`. This
specifies the time k6 should wait for any iterations in progress to finish before
VUs are returned to the global pool during a ramp down period defined in `stages`.
