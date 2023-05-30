---
title: Test for performance
excerpt: Write thresholds to evaluate performance criteria, then increase load to see how the system performs.
---

In the previous section, you made a working script to test the endpoint functionality.
The next step is to test how this system responds under load.
This requires using the powerful `options` object, which configures the parts of the test that don't deal with user behavior.

In this tutorial, learn how to:
- Use thresholds to assert for performance criteria
- Configure load increases through scenarios

These examples build on the script from the previous section.

## Context: meet service-level objectives

To assess the login endpoint's performance, your team may have defined [service level objectives](https://sre.google/sre-book/service-level-objectives/) (SLOs):
- 99.9% of requests are successful
- 99% of requests have a latency of 1000ms or less.

The service must meet these SLOs up to peak traffic of 1 request/second.

After you confirm run the peak traffic test, run another test to determine where the system degrades (this is also often done to discover baselines before the organization has an SLOs).

## Assert for performance with thresholds


To codify the SLOs, add _thresholds_ to test that your system performs to its goal criteria.
Thresholds are exported in options.


```javascript
export const options = {
  //define thresholds
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<200'], // 99% of requests should be below 200ms
  },
};
```

To learn how use thresholds, read the [Thresholds](/using-k6/thresholds) guide.

## Test performance criteria under increasing load

Now your script has logic to simulate user behavior, and assertions for functionality (checks) and performance (thresholds).

It's time to increase load to see how it performs..

### Run a smoke test

Start small. Run a [smoke test](/test-types/smoke-testing "a small test to confirm the script works properly") to see your script can handle minimal load.


```bash
k6 run --iterations 7 tutorial.js
```

If the service can't receive 10 iterations, the system has some serious performance issues to debug.
Good thing you ran the test early!

### Run a test against average load

Now increase load.

Generally, traffic doesn't arrive all at once.
Rather, it gradually increases to a peak load.
To simulate this, testers increase load in _stages_.

Since this is a learning environment, the stages are still quite short.
Add the following _scenario_ to your options `object` and run the test again.
Where the smoke test used load in terms of iterations, this configuration expresses load in terms virtual users and time.

```json
  scenarios: {
    //arbitrary name of scenario
    average_load: {
      executor: "ramping-vus",
      stages: [
        // ramp up to average load of 20
        { duration: "20s", target: 20 },
        // maintain load
        { duration: "20s", target: 20 },
        // ramp down to zero
        { duration: "20s", target: 0 },
      ],
    },
  }
```

Run the test with no command-line flags: `k6 run tutorial.js`.

The load is pretty small, so the server should perform within thresholds.
However, this test server may be under load by many k6 learners, so it's hard to say.


<Blockquote mod="note" title="To visualize results...">

At this point, it'd be nice to have a graphical interface to visualize metrics as they occur.
k6 has many output formats, which can serve as inputs for many visualization tools, both open source and commercial.
For ideas, read [Ways to visualize k6 results](https://k6.io/blog/ways-to-visualize-results).

</Blockquote>


### Ramp up until threshold fails

Finally, run a [stress test](/test-types/stress-testing), where you probe the limits of the system.
In this case, run the test until the availability (error rate) threshold is crossed.

To do this:

1. Configure the threshold so that it aborts when it fails

  ```json
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }], // availability threshold for error rate
  }
  ```

1. Use the `ramping-arrival-rate` scenario to ramp the test up until it fails.
  This configuration expresses load not in VUs but in iterations per minute.


  ```json
    scenarios: {
      //arbitrary name of scenario:
      stress_test: {
        executor: "ramping-arrival-rate",
        // Start iterations per `timeUnit`
        startRate: 20,
        // Start `startRate` iterations per minute
        timeUnit: "1m",
        // Pre-allocate necessary VUs.
        preAllocatedVUs: 200,
        // ramp up to target of 60reqs/minute (1/s)
        stages: [
          { target: 20, duration: "10s" },
          { target: 40, duration: "10s" },
          { target: 40, duration: "10s" },
          { target: 60, duration: "10s" },
          { target: 60, duration: "30s" },
          { target: 0, duration: "1m" },
        ],
      },
    },
  ```
  
Here is the full script.
Copy and run it.

Did the threshold fail? If not, add another stage with a higher target and try again. 
  
<CodeGroup labels={["tutorial.js"]} lineNumbers={[true]} showCopyButton={[true]} heightTogglers={[true]}>

```javascript
// Import necessary modules
import { check } from "k6";
import http from "k6/http";

//define configuration
export const options = {
  scenarios: {
    //arbitrary name of scenario:
    stress_test: {
      executor: "ramping-arrival-rate",
      // Start iterations per `timeUnit`
      startRate: 20,
      // Start `startRate` iterations per minute
      timeUnit: "1m",
      // Pre-allocate necessary VUs.
      preAllocatedVUs: 200,
      // ramp up to target of 60reqs/minute (1/s)
      stages: [
        { target: 20, duration: "10s" },
        { target: 40, duration: "10s" },
        { target: 40, duration: "10s" },
        { target: 60, duration: "10s" },
        { target: 60, duration: "30s" },
        { target: 0, duration: "1m" },
      ],
    },
  },
  //define thresholds
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }], // availability threshold for error rate
    http_req_duration: ["p(99)<1000"], // Latency threshold for percentile
  },
};

export default function () {
  // define URL and request body
  const url = "https://test-api.k6.io/auth/basic/login/";
  const payload = JSON.stringify({
    username: "test_case",
    password: "1234",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);

  // check that response is 200
  check(res, {
    "login response was 200": (res) => res.status == 200,
  });
}

```

</CodeGroup>


## Next steps

In this tutorial, you used thresholds to assert for performance, then used three different [Scenarios](/using-k6/scenarios) to schedule more load and from different perspectives.
To learn more about different load patterns for different goals, read [Test Types](/test-types).

The next step is learning how to process and create more meaningful results.


