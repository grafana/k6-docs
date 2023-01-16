---
title: 'Graceful stop'
excerpt: 'This option is available for all executors except externally-controlled and allows the user to specify a duration to wait before forcefully interrupting them.'
---

The `gracefulStop` is a period at the end of the test in which k6 lets iterations in progress finish.

If a test has a set duration or ramp down, its possible that k6 could interrupt iterations in progress.
These interruptions can lead to skewed metrics and unexpected test results.
To deal with this, k6 scenarios have a `gracefulStop` and `gracefulRampDown` options.


## Description

This option is available for all executors except `externally-controlled` and allows the
user to specify a duration to wait before forcefully interrupting them. The default value
of this property is `30s`.

## Example

<CodeGroup labels={[ "graceful-stop.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
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
  const delay = Math.floor(Math.random() * 5) + 1;
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
