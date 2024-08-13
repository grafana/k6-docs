---
title: 'Smoke testing'
head_title: 'What is Smoke Testing? How to create a Smoke Test in k6'
description: 'A Smoke test is a minimal load test to run when you create or modify a script.'
weight: 01
---

# Smoke testing

Smoke tests have a minimal load.
Run them to verify that the system works well under minimal load and to gather baseline performance values.

This test type consists of running tests with a few VUs — more than 5 VUs could be considered a mini-load test.

Similarly, the test should execute for a short period, either a low number of [iterations](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#iterations) or a [duration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/reference#duration) from seconds to a few minutes maximum.

![Overview of a smoke test](/media/docs/k6-oss/chart-smoke-test-overview.png)

In some testing conversation, smoke tests are also called shakeout tests.

## When to run a Smoke test

Teams should run smoke tests whenever a test script is created or updated. Smoke testing should also be done whenever the relevant application code is updated.

It's a good practice to run a smoke test as a first step, with the following goals:

- Verify that your test script doesn't have errors.
- Verify that your system doesn't throw any errors (performance or system related) when under minimal load.
- Gather baseline performance metrics of your system’s response under minimal load.
- With simple logic, to serve as a [synthetic test](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/) to monitor the performance and availability of production environments.

## Considerations

When you prepare a smoke test, consider the following:

- **Each time you create or update a script, run a smoke test**

  Because smoke tests verify test scripts, try to run one every time you create or update a script. Avoid running other test types with untested scripts.

- **Keep throughput small and duration short**

  Configure your test script to be executed by a small number of VUs (from 2 to 20) with few iterations or brief durations (30 seconds to 3 minutes).

## Smoke testing in k6

{{< code >}}

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 3, // Key for Smoke test. Keep it at 2, 3, max 5 VUs
  duration: '1m', // This can be shorter or just a few iterations
};

export default () => {
  const urlRes = http.get('https://test-api.k6.io');
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};
```

{{< /code >}}

The following script is an example smoke test. You can copy it, change the endpoints, and start testing. For more comprehensive test logic, refer to [Examples](https://grafana.com/docs/k6/<K6_VERSION>/examples).
The VU chart of a smoke test should look similar to this.

![The shape of the smoke test as configured in the preceding script](/media/docs/k6-oss/chart-smoke-test-k6-script-example.png)

## Results analysis

The smoke test initially validates that your script runs without errors. If any script-related errors appear, correct the script before trying any more extensive tests.

On the other hand, if you notice poor performance with these low VU numbers, report it, fix your environment, and try again with a smoke test before any further tests.

Once your smoke test shows zero errors and the performance results seem acceptable, you can proceed to other test types.
