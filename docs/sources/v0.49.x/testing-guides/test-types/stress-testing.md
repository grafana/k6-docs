---
title: 'Stress testing'
head_title: 'What is Stress Testing? How to create a Stress Test in k6'
description: 'Stress tests assess the limits of your system and stability under extreme conditions.'
weight: 03
---

# Stress testing

Stress testing assesses how the system performs when loads are heavier than usual.

The load pattern of a stress test resembles that of an average-load test. The main difference is higher load.
To account for higher load, the ramp-up period takes longer in proportion to the load increase.
Similarly, after the test reaches the desired load, it might last for slightly longer than it would in the average-load test.

![Overview of a stress test](/media/docs/k6-oss/chart-stress-test-overview.png)

In some testing conversation, stress tests might also be called rush-hour, surge, or scale tests.

## When to perform a Stress test

Stress tests verify the stability and reliability of the system under conditions of heavy use.
Systems may receive higher than usual workloads on unusual moments such as process deadlines, paydays, rush hours, ends of the workweek, and many other behaviors that might cause frequent higher-than-average traffic.

## Considerations

When you run a stress test, consider the following:

- **Load should be higher than what the system experiences on average.**

  Some testers might have default targets for stress tests&mdash;say an increase upon average load by 50 or 100 percent&mdash;there's no fixed percentage.

  The load simulated in a Stress test depends on the stressful situations that the system may be subject to. Sometimes this may be just a few percentage points above that average. Other times, it can be 50 to 100% higher, as mentioned. Some stressful situations can be twice, triple, or even orders of magnitude higher.

  Define load according to the risk load patterns that the system may receive.

* **Only run stress tests after running average-load tests.**

  Identify performance issues under average-load tests before trying anything more challenging.
  This sequence is essential.

- **Re-use the Average-Load test script.**

  Modify the parameters to have higher load or VUs.

- **Expect worse performance compared to average load.**

  This test determines how much the performance degrades with the extra load and whether the system survives it. A well-performant system should respond with consistent response times when handling a constant workload for an extended period.

## Stress testing in k6

The load in a stress test resembles load in an average-load test.
The difference is that it reaches a higher level of load.

1. Increase the script's activity further in a slower ramp-up until it reaches an above-average number of users or throughput.
1. Maintain that load for a while.
1. Depending on the test case, stop or ramp down gradually.

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Stress in this section
  stages: [
    { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '30m', target: 200 }, // stay at higher 200 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
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

For more complex behavior, refer to [Examples](https://grafana.com/docs/k6/<K6_VERSION>/examples).

The VU or throughput chart of a Stress test looks similar to this:

![The shape of the stress test as configured in the preceding script](/media/docs/k6-oss/chart-stress-test-k6-script-example.png)

Note that in the same way as the average-load test, the Stress test starts at 0 and increases beyond the point tested in the average-load type. The ramp-up and ramp-down periods are longer to allow a more realistic response.

{{% admonition type="note" %}}

Run stress tests only after smoke and average-load tests. Running this test type earlier may be wasteful and make it hard to pinpoint problems if they appear at low volumes or at loads under the average utilization.

{{% /admonition %}}

## Results analysis

Like the average-load test, an initial outcome for the Stress test shows up during the ramp-up period to identify response time degradation as the load increases further than the average utilization. Commonly, the performance degrades, and even the system's stability crashes as we push the system further than the average-load test.

During the full load period, verification is vital if the system's performance and resource consumption stays stable with a higher load.

Now that you know that your system can handle outstanding load events, the teams generally check if the system performs well over extended periods.
That is, they run a [Soak test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing).
