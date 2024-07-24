---
title: 'Externally controlled'
excerpt: 'Control and scale execution at runtime via k6 REST API or the CLI.'
canonicalUrl: https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/externally-controlled/
redirect: https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/externally-controlled/
---

Control and scale execution at runtime via [k6's REST API](/misc/k6-rest-api) or
the [CLI](https://k6.io/blog/how-to-control-a-live-k6-test).

Previously, the `pause`, `resume`, and `scale` CLI commands were used to globally control
k6 execution. This executor does the same job by providing a better API that can be used to
control k6 execution at runtime.

Note that, passing arguments to the `scale` CLI command for changing the amount of active or
maximum VUs will only affect the externally controlled executor.

## Options

**The `externally-controlled` executor has no graceful stop**.

Besides that, this executor has all the [common configuration options](/using-k6/scenarios#options),
and these particular ones:

| Option      | Type    | Description                                         | Default |
| ----------- | ------- | --------------------------------------------------- | ------- |
| duration<sup>(required)</sup> | string  | Total test duration.                                | -       |
| vus       | integer | Number of VUs to run concurrently.                  | -       |
| maxVUs    | integer | Maximum number of VUs to allow during the test run. | -       |

## When to use

If you want to control the number of VUs while the test is running.

Important: this is the only executor that is not supported in `k6 cloud`, it can only be used
locally with `k6 run`.

## Example

In this example, we'll execute a test controllable at runtime, starting with 10 VUs up to
a maximum of 50, and a total duration of 10 minutes.

<CodeGroup labels={[ "externally-controlled.js" ]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'externally-controlled',
      vus: 10,
      maxVUs: 50,
      duration: '10m',
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
```

Once the test has started, it can be externally controlled with the `pause`, `resume`, and `scale` CLI commands.

</CodeGroup>
