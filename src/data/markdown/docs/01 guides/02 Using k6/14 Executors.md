---
title: Executors
excerpt: ''
hideFromSidebar: false
---

k6 v0.27.0 introduces the concept of _executors_: configurable modes of executing a
JavaScript function that can model diverse traffic scenarios in load tests.

Multiple executors can be used in the same script, they can be scheduled to run
parallel or in sequence, and each executor can run a different JS function with
different environment variables and tags, so this brings a lot of flexibility with
organizing and modeling testing scenarios.

Existing global execution options such as `vus`, `duration` and `stages` were
formalized into standalone executors, while new executors were added to support more
advanced modes of execution. A major benefit of this restructuring is that support
for new testing scenarios can be added relatively easily to k6, making it very
extensible.

> ### ⚠  Backwards compatibility
>
> Note that pre-v0.27.0 scripts and options should continue to work
> the same as before (with a few minor breaking changes, as mentioned
> in the [release notes](https://github.com/loadimpact/k6/releases/tag/v0.27.0))
> but please [create a bug issue](https://github.com/loadimpact/k6/issues/new?labels=bug&template=bug_report.md)
> if that's not the case.


## Common configuration

Below you can see the list of all executors and their options, but since all
executors share a base configuration, the following options can be used for all*:

| Option         | Type   | Description                                                                      | Default     |
|----------------|--------|----------------------------------------------------------------------------------|-------------|
| `startTime`    | string | Time offset since test start this scenario should begin execution.               | `"0s"`      |
| `gracefulStop` | string | Time to wait for iterations to finish executing before stopping them forcefully. See the [gracefulStop](#graceful-stop-and-ramp-down) section. | `"30s"`     |
| `exec`         | string | Name of exported JS function to execute.                                         | `"default"` |
| `env`          | object | Environment variables specific to this scenario.                                 | `{}`        |
| `tags`         | object | [Tags](/using-k6/tags-and-groups) specific to this scenario.                     | `{}`        |

\* Except `gracefulStop` which is disabled for the externally-controlled executor.


## Executor types

### Shared iterations

A fixed number of iterations are "shared" between a number of VUs, and the test ends
once all iterations are executed. This executor is equivalent to the global `vus` and
`iterations` options.

Note that iterations aren't fairly distributed with this executor, and a VU that
executes faster will complete more iterations than others.

| Option        | Type    | Description                                                                    | Default |
|---------------|---------|--------------------------------------------------------------------------------|---------|
| `vus`         | integer | Number of VUs to run concurrently.                                             | `1`     |
| `iterations`  | integer | Total number of script iterations to execute across all VUs.                   | `1`     |
| `maxDuration` | string  | Maximum test duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

#### Examples

- Execute 200 total iterations shared by 10 VUs with a maximum duration of 10 seconds:

<div class="code-group" data-props='{"labels": [ "shared-iters.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {  // arbitrary scenario name
      executor: 'shared-iterations',
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>


### Per VU iterations

Each VU executes an exact number of iterations.

| Option        | Type    | Description                                                                    | Default |
|---------------|---------|--------------------------------------------------------------------------------|---------|
| `vus`         | integer | Number of VUs to run concurrently.                                             | `1`     |
| `iterations`  | integer | Number of script iterations to execute with each VU.                           | `1`     |
| `maxDuration` | string  | Maximum test duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

#### Examples

- Execute 20 iterations by 10 VUs *each*, for a total of 200 iterations, with a
  maximum duration of 10 seconds:

<div class="code-group" data-props='{"labels": [ "per-vu-iters.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 20,
      maxDuration: '10s',
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>


### Constant VUs

A fixed number of VUs execute as many iterations as possible for a specified amount
of time. This executor is equivalent to the global `vus` and `duration` options.

| Option     | Type    | Description                                     | Default |
|------------|---------|-------------------------------------------------|---------|
| `vus`      | integer | Number of VUs to run concurrently.              | `1`     |
| `duration` | string  | Total test duration (excluding `gracefulStop`). | -       |

#### Examples

- Run a constant 10 VUs for 10 seconds:

<div class="code-group" data-props='{"labels": [ "constant-vus.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      vus: 10,
      duration: '10s',
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>


### Ramping VUs

A variable number of VUs execute as many iterations as possible for a specified
amount of time. This executor is equivalent to the global `stages` option.

| Option             | Type    | Description                                                                   | Default |
|--------------------|---------|-------------------------------------------------------------------------------|---------|
| `startVUs`         | integer | Number of VUs to run at test start.                                           | `1`     |
| `stages`           | array   | Array of objects that specify the target number of VUs to ramp up or down to. | `[]`    |
| `gracefulRampDown` | string  | Time to wait for iterations to finish before starting new VUs.                | `"30s"` |

#### Examples

- Run a two-stage test, ramping up from 0 to 100 VUs for 5 seconds, and down to 0 VUs
  for 5 seconds:

<div class="code-group" data-props='{"labels": [ "ramping-vus.js" ], "lineNumbers": "[true]"}'>

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
      gracefulRampDown: '0s',
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>

Note the setting of `gracefulRampDown` to 0 seconds, which could cause some
iterations to be interrupted during the ramp down stage.


### Constant arrival rate

A fixed number of iterations are executed in a specified period of time.
Since iteration execution time can vary because of test logic or the
system-under-test responding more slowly, this executor will try to compensate
by running a variable number of VUs--including initializing more in the middle
of the test--in order to meet the configured iteration rate. This approach is
useful for a more accurate representation of RPS, for example.

See the [arrival rate](#arrival-rate) section for details.

| Option            | Type    | Description                                                                             | Default |
|-------------------|---------|-----------------------------------------------------------------------------------------|---------|
| `rate`            | integer | Number of iterations to execute each `timeUnit` period.                                 | -       |
| `timeUnit`        | string  | Period of time to apply the `rate` value.                                               | `"1s"`  |
| `duration`        | string  | Maximum test duration before it's forcibly stopped (excluding `gracefulStop`).          | -       |
| `preAllocatedVUs` | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| `maxVUs`          | integer | Maximum number of VUs to allow during the test run.                                     | -       |

#### Examples

- Execute a constant 200 RPS for 1 minute, allowing k6 to dynamically schedule up to 100 VUs:

<div class="code-group" data-props='{"labels": [ "constant-arr-rate.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {  // arbitrary scenario name
      executor: 'constant-arrival-rate',
      rate: 200,  // 200 RPS, since timeUnit is the default 1s
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>

Note that in order to reliably achieve a fixed request rate, it's recommended to keep
the function being executed very simple, with preferably only a single request call,
and no additional processing or `sleep()` calls.


### Ramping arrival rate

A variable number of iterations are executed in a specified period of time. This is
similar to the ramping VUs executor, but for iterations instead, and k6 will attempt
to dynamically change the number of VUs to achieve the configured iteration rate.

See the [arrival rate](#arrival-rate) section for details.

| Option            | Type    | Description                                                                             | Default |
|-------------------|---------|-----------------------------------------------------------------------------------------|---------|
| `startRate`       | integer | Number of iterations to execute each `timeUnit` period at test start.                   | `0`     |
| `timeUnit`        | string  | Period of time to apply the `startRate` the `stages` `target` value.                    | `"1s"`  |
| `stages`          | array   | Array of objects that specify the target number of iterations to ramp up or down to.    | `[]`    |
| `preAllocatedVUs` | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| `maxVUs`          | integer | Maximum number of VUs to allow during the test run.                                     | -       |

#### Examples

- Execute a variable RPS test, starting at 50, ramping up to 200 and then back to 0,
  over a 1 minute period:

<div class="code-group" data-props='{"labels": [ "ramping-arr-rate.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 50,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 200, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>


### Externally controlled

Control and scale execution at runtime via [k6's REST API](/misc/k6-rest-api) or
the [CLI](https://k6.io/blog/how-to-control-a-live-k6-test).

This executor formalizes what was previously possible globally, and using it is
required in order to use the `pause`, `resume`, and `scale` CLI commands. Also note
that arguments to `scale` to change the amount of active or maximum VUs only affect
the externally controlled executor.

| Option     | Type    | Description                                         | Default |
|------------|---------|-----------------------------------------------------|---------|
| `vus`      | integer | Number of VUs to run concurrently.                  | -       |
| `maxVUs`   | integer | Maximum number of VUs to allow during the test run. | -       |
| `duration` | string  | Total test duration.                                | -       |

#### Examples

- Execute a test run controllable at runtime, starting with 0 VUs up to a maximum of
  50, and a total duration of 10 minutes:

<div class="code-group" data-props='{"labels": [ "externally-controlled.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'externally-controlled',
      vus: 0,
      maxVUs: 50,
      duration: '10m',
    }
  }
};

export default function() {
  http.get('https://test.k6.io/contacts.php');
}
```

</div>


## Arrival rate

TODO (expand on https://github.com/loadimpact/k6/issues/550)


## Graceful stop and ramp down

In versions before v0.27.0, k6 would interrupt any iterations being executed if the
test is done or when ramping down VUs when using the `stages` option. This behavior
could cause skewed metrics and wasn't user configurable.

In v0.27.0 a new option is introduced for all executors (except externally-controlled):
`gracefulStop`. With a default value of `30s`, it specifies the time k6 should wait
for iterations to complete before forcefully interrupting them.

A similar option exists for the ramping VUs executor: `gracefulRampDown`. This
specifies the time k6 should wait for any iterations in progress to finish before
VUs are returned to the global pool during the ramp down period defined in `stages`.

### Example

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
  }
};

export default function () {
  let delay = Math.floor(Math.random() * 5) + 1;
  http.get(`https://httpbin.test.k6.io/delay/${delay}`);
}
```

</div>

Running this script would result in something like:

```
running (13.0s), 000/100 VUs, 177 complete and 27 interrupted iterations
contacts ✓ [======================================] 001/100 VUs  10s
```

Notice that even though the total test duration is 10s, the actual run time was 13s
because of `gracefulStop`, and some iterations were interrupted since they exceeded
the configured 3s of both `gracefulStop` and `gracefulRampDown`.


## Advanced examples

- Run as many iterations as possible with 50 VUs for 30s, and then run 100 iterations
  per VU of another scenario.

Note the use of `startTime`, and different `exec` functions for each scenario.

<div class="code-group" data-props='{"labels": [ "multiple-scenarios.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      exec: 'contacts',
      vus: 50,
      duration: '30s',
    },
    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 50,
      iterations: 100,
      startTime: '30s',
      maxDuration: '1m',
    },
  }
};

export function contacts() {
  http.get('https://test.k6.io/contacts.php', { tags: { my_custom_tag: 'contacts' }});
}

export function news() {
  http.get('https://test.k6.io/news.php', { tags: { my_custom_tag: 'news' }});
}
```

</div>

- Use different environment variables and tags per scenario.

In the previous example we set tags on individual HTTP request metrics, but this
can also be done per scenario, which would apply them to other
[taggable](https://k6.io/docs/using-k6/tags-and-groups#tags) objects as well.

<div class="code-group" data-props='{"labels": [ "multiple-scenarios-env-tags.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';
import { fail } from 'k6';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-vus',
      exec: 'contacts',
      vus: 50,
      duration: '30s',
      tags: { my_custom_tag: 'contacts' },
      env: { MYVAR: 'contacts' },
    },
    news: {
      executor: 'per-vu-iterations',
      exec: 'news',
      vus: 50,
      iterations: 100,
      startTime: '30s',
      maxDuration: '1m',
      tags: { my_custom_tag: 'news' },
      env: { MYVAR: 'news' },
    },
  }
};

export function contacts() {
  if (__ENV.MYVAR != 'contacts') fail();
  http.get('https://test.k6.io/contacts.php');
}

export function news() {
  if (__ENV.MYVAR != 'news') fail();
  http.get('https://test.k6.io/news.php');
}
```

</div>

Note that by default a `scenario` tag with the name of the scenario as value is
applied to all metrics in each scenario, which simplifies filtering metrics when
using [result outputs](/getting-started/results-output). This can be disabled
with the [`--system-tags` option](/using-k6/options#system-tags).
