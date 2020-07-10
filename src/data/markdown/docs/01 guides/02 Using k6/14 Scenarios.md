---
title: Scenarios
excerpt: ''
hideFromSidebar: false
---

k6 v0.27.0 introduces the concept of scenarios: configurable modes of scheduling VUs
and iterations which can be used to model diverse traffic patterns in load tests.

This is an optional feature and existing scripts and options will continue to work as before
(with a few minor breaking changes, as mentioned
in the [release notes](https://github.com/loadimpact/k6/releases/tag/v0.27.0)),
but please [create a bug issue](https://github.com/loadimpact/k6/issues/new?labels=bug&template=bug_report.md)
if that's not the case.

There are several benefits of using scenarios in your tests:
- Multiple scenarios can be declared in the same script, and each one can
  execute a different JavaScript function, which makes organizing tests easier
  and more flexible.
- Every scenario can use a distinct VU and iteration scheduling pattern,
  powered by a purpose-built [executor](#executors). This enables modeling
  of advanced execution patterns which can better simulate real-world traffic.
- They can be configured to run in sequence or parallel.
- Different environment variables and tags can be set per scenario.

If you're excited to try it out, make sure you're using
[k6 v0.27.0 or above](https://github.com/loadimpact/k6/releases) and keep reading!
Note that scenarios are supported both in k6 CLI (local) and
[k6 Cloud](/cloud) execution.


## Configuration

Scenarios are primarily configured via the `options` object in your test script. For example:

<div class="code-group" data-props='{"labels": [], "lineNumbers": "[false]"}'>

```js
export let options = {
  scenarios: {
    my_cool_scenario: {  // arbitrary and unique scenario name, will appear in the result summary, tags, etc.
      executor: 'shared-iterations',  // name of the executor to use
      // common scenario configuration
      startTime: '10s',
      gracefulStop: '5s',
      env: { EXAMPLEVAR: 'testing' },
      tags: { example_tag: 'testing' },
      // executor-specific configuration
      vus: 10,
      iterations: 200,
      maxDuration: '10s',
    },
    another_scenario: { ... }
  }
}
```

</div>


### Common configuration

| Option         | Type   | Description                                                                      | Default     |
|----------------|--------|----------------------------------------------------------------------------------|-------------|
| `executor`     | string | Unique executor name. See the list of possible values below.                     | -           |
| `startTime`    | string | Time offset since test start this scenario should begin execution.               | `"0s"`      |
| `gracefulStop` | string | Time to wait for iterations to finish executing before stopping them forcefully. See the [gracefulStop](#graceful-stop-and-ramp-down) section. | `"30s"`     |
| `exec`         | string | Name of exported JS function to execute.                                         | `"default"` |
| `env`          | object | Environment variables specific to this scenario.                                 | `{}`        |
| `tags`         | object | [Tags](/using-k6/tags-and-groups) specific to this scenario.                     | `{}`        |

Possible values for `executor` are the executor name separated by hyphens:
- `shared-iterations`
- `per-vu-iterations`
- `constant-vus`
- `ramping-vus`
- `constant-arrival-rate`
- `ramping-arrival-rate`
- `externally-controlled`


## Executors

Executors are the workers of the k6 execution engine. Each one schedules VUs and
iterations differently, and you'll choose one depending on the type of traffic you
want to model to test your services.

### Shared iterations

A fixed number of iterations are "shared" between a number of VUs, and the test ends
once all iterations are executed. This executor is equivalent to the global `vus` and
`iterations` options.

Note that iterations aren't fairly distributed with this executor, and a VU that
executes faster will complete more iterations than others.

#### Options

| Option        | Type    | Description                                                                    | Default |
|---------------|---------|--------------------------------------------------------------------------------|---------|
| `vus`         | integer | Number of VUs to run concurrently.                                             | `1`     |
| `iterations`  | integer | Total number of script iterations to execute across all VUs.                   | `1`     |
| `maxDuration` | string  | Maximum test duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

#### When to use

This executor is suitable when you want a specific amount of VUs to complete a fixed
number of total iterations, and the amount of iterations per VU is not important.

#### Examples

- Execute 200 total iterations shared by 10 VUs with a maximum duration of 10 seconds:

<div class="code-group" data-props='{"labels": [ "shared-iters.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
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

Each VU executes an exact number of iterations. The total number of completed
iterations will be `vus * iterations`.

#### Options

| Option        | Type    | Description                                                                    | Default |
|---------------|---------|--------------------------------------------------------------------------------|---------|
| `vus`         | integer | Number of VUs to run concurrently.                                             | `1`     |
| `iterations`  | integer | Number of script iterations to execute with each VU.                           | `1`     |
| `maxDuration` | string  | Maximum test duration before it's forcibly stopped (excluding `gracefulStop`). | `"10m"` |

#### When to use

Use this executor if you need a specific amount of VUs to complete the same amount of
iterations.

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

#### Options

| Option     | Type    | Description                                     | Default |
|------------|---------|-------------------------------------------------|---------|
| `vus`      | integer | Number of VUs to run concurrently.              | `1`     |
| `duration` | string  | Total test duration (excluding `gracefulStop`). | -       |

#### When to use

Use this executor if you need a specific amount of VUs to run for a certain amount of time.

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

#### Options

| Option             | Type    | Description                                                                   | Default |
|--------------------|---------|-------------------------------------------------------------------------------|---------|
| `startVUs`         | integer | Number of VUs to run at test start.                                           | `1`     |
| `stages`           | array   | Array of objects that specify the target number of VUs to ramp up or down to. | `[]`    |
| `gracefulRampDown` | string  | Time to wait for iterations to finish before starting new VUs.                | `"30s"` |

#### When to use

This executor is a good fit if you need VUs to ramp up or down during specific periods
of time.

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

#### Options

| Option            | Type    | Description                                                                             | Default |
|-------------------|---------|-----------------------------------------------------------------------------------------|---------|
| `rate`            | integer | Number of iterations to execute each `timeUnit` period.                                 | -       |
| `timeUnit`        | string  | Period of time to apply the `rate` value.                                               | `"1s"`  |
| `duration`        | string  | Maximum test duration before it's forcibly stopped (excluding `gracefulStop`).          | -       |
| `preAllocatedVUs` | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| `maxVUs`          | integer | Maximum number of VUs to allow during the test run.                                     | -       |

#### When to use

When you want to maintain a constant number of requests without being affected by the
system-under-test's performance.

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

#### Options

| Option            | Type    | Description                                                                             | Default |
|-------------------|---------|-----------------------------------------------------------------------------------------|---------|
| `startRate`       | integer | Number of iterations to execute each `timeUnit` period at test start.                   | `0`     |
| `timeUnit`        | string  | Period of time to apply the `startRate` the `stages` `target` value.                    | `"1s"`  |
| `stages`          | array   | Array of objects that specify the target number of iterations to ramp up or down to.    | `[]`    |
| `preAllocatedVUs` | integer | Number of VUs to pre-allocate before test start in order to preserve runtime resources. | -       |
| `maxVUs`          | integer | Maximum number of VUs to allow during the test run.                                     | -       |

#### When to use

If you need your tests to not be affected by the system-under-test's performance, and
would like to ramp the number of iterations up or down during specific periods of time.

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

#### Options

| Option     | Type    | Description                                         | Default |
|------------|---------|-----------------------------------------------------|---------|
| `vus`      | integer | Number of VUs to run concurrently.                  | -       |
| `maxVUs`   | integer | Maximum number of VUs to allow during the test run. | -       |
| `duration` | string  | Total test duration.                                | -       |

#### When to use

If you want to control the number of VUs while the test is running.

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

Up until v0.27.0 k6 only supported a closed model for the simulation of new VU arrivals,
or expressed in another way, the start of new VU iterations.
In a closed model a new VU iteration only starts when a VU's previous iteration has
completed executing. The start rate, or arrival rate, of new VU iterations in a closed
model is thus tightly coupled with the iteration duration (time from start to finish
of the VU's `exec` function, by default the `export default function`):

<div class="code-group" data-props='{"labels": [ "closed-model.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  scenarios: {
    closed_model: {
      executor: 'constant-vus',
      vus: 1,
      duration: '1m',
    }
  }
};

export default function() {
  // The following request will take roughly 6s to complete,
  // resulting in an iteration duration of 6s.
  // New VU iterations will thus start at a rate of 1 per 6s,
  // and we can expect to get 10 iterations completed in total for the
  // full 1m test duration.
  http.get('http://httpbin.test.k6.io/delay/6');
}
```

</div>

Running this script would result in something like:

```
running (1m01.5s), 0/1 VUs, 10 complete and 0 interrupted iterations
closed_model ✓ [======================================] 1 VUs  1m0s
```

This tight coupling between the VU iteration duration and start of new VU iterations
in effect means that the target system can influence the throughput of the test, via
its response time. Slower response times means longer iterations and a lower arrival
rate of new iterations, and vice versa for faster response times.

In other words, when the target system is being stressed and starts to respond more
slowly a closed model load test will play "nice" and wait, resulting in increased
iteration durations and a tapering off of the arrival rate of new VU iterations.

This is not ideal when the goal is to simulate a certain arrival rate of new VUs,
or more generally throughput (eg. requests per second).

To fix this problem we use an open model, decoupling the start of new VU iterations
from the iteration duration and the influence of the target system's response time.

![Arrival rate closed/open models](images/arrival-rate-open-closed-model.png)

In k6 we've implemented this open model with our "arrival rate" executors. There are
two arrival rate executors to chose from for your scenario(s),
[constant-arrival-rate](#constant-arrival-rate) and [ramping-arrival-rate](#ramping-arrival-rate):

<div class="code-group" data-props='{"labels": [ "open-model.js" ], "lineNumbers": "[true]"}'>

```js
import http from 'k6/http';

export let options = {
  scenarios: {
    open_model: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 1,
      maxVUs: 100,
    }
  }
};

export default function() {
  // With the open model arrival rate executor config above,
  // new VU iteration will start at a rate of 1 every second,
  // and we can thus expect to get 60 iterations completed
  // for the full 1m test duration.
  http.get('http://httpbin.test.k6.io/delay/10');
}
```

</div>

Running this script would result in something like:

```
running (1m09.3s), 000/011 VUs, 60 complete and 0 interrupted iterations
open_model ✓ [======================================] 011/011 VUs  1m0s  1 iters/s
```

Compared to the first example of the closed model, in this open model example we can see
that the VU iteration arrival rate is now decoupled from the iteration duration.
The response times of the target system are no longer influencing the load being
put on the target system.

## Graceful stop and ramp down

In versions before v0.27.0, k6 would interrupt any iterations being executed if the
test is done or when ramping down VUs when using the `stages` option. This behavior
could cause skewed metrics and wasn't user configurable.

In v0.27.0 a new option is introduced for all executors (except externally-controlled):
`gracefulStop`. With a default value of `30s`, it specifies the time k6 should wait
for iterations to complete before forcefully interrupting them.

A similar option exists for the ramping VUs executor: `gracefulRampDown`. This
specifies the time k6 should wait for any iterations in progress to finish before
VUs are returned to the global pool during a ramp down period defined in `stages`.

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
