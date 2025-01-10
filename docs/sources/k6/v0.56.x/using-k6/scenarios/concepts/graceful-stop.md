---
title: 'Graceful stop'
description: 'This option is available for all executors except externally-controlled and allows the user to specify a duration to wait before forcefully interrupting them.'
weight: 10
---

# Graceful stop

The `gracefulStop` is a period at the end of the test in which k6 lets iterations in progress finish.

If a test has a set duration or ramp down, its possible that k6 could interrupt iterations in progress.
These interruptions can lead to skewed metrics and unexpected test results.
To deal with this, k6 scenarios have a `gracefulStop`.
For the `ramping-vus` executor, a related option, `gracefulRampDown`, exists to let VUs finish as their number ramps down.

## Graceful stop

The `gracefulStop` option is available for all executors except `externally-controlled`.
It specifies a duration that k6 will wait before forcefully interrupting an iteration.
The default value is `30s`.

### Graceful stop example

{{< code >}}

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

{{< /code >}}

Running this script would result in something like:

```bash
running (13.0s), 000/100 VUs, 349 complete and 23 interrupted iterations
contacts ✓ [======================================] 100 VUs  10s
```

Notice that even though the total test duration is 10s, the actual execution time was 13s
because of `gracefulStop`, giving the VUs a 3s additional time to complete iterations in progress. 23
of the iterations currently in progress did not complete within this window and was therefore interrupted.

## The `gracefulRampDown`

In addition to `gracefulStop`, the [ramping-vus](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/executors/ramping-vus) executor also has a `gracefulRampDown`.

When the target value for a stage is lower than the target for the previous stage, k6 might need to stop some VUs that were started during the previous stages.
The `gracefulRampDown` option controls how long these VUs have to finish currently before k6 interrupts them.

To get an idea of how `gracefulRampDown` works, you can run the following script with
`k6 run --verbose`.
In this script, the iteration `sleep` time exceeds the `gracefulRampdown` time.
So, as k6 ramps down to reach the target of the second stage, it must forcibly interrupt VUs.
The `--verbose` flag will log to your console when VUs start, enter the grace period, and are forcibly interrupted.

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardresponsebodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startvus: 0,
      stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '1s',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
  // adding sleep beyond so that iterations are longer than rampdown
  sleep(5);
}
```
