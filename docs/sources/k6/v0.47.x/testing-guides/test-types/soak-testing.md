---
title: 'Soak testing'
head_title: 'What is Soak Testing? How to create a Soak Test in k6'
description: 'A Soak Test tests the reliability and performance of your system over extended periods of use.'
weight: 05
---

# Soak testing

Soak testing is another variation of the Average-Load test. It focuses on extended periods, analyzing the following:

- The system's degradation of performance and resource consumption over extended periods.
- The system's availability and stability during extended periods.

The soak test differs from an average-load test in test duration. In a soak test, the peak load duration (usually an average amount) extends several hours and even days.
Though the duration is considerably longer, the ramp-up and ramp-down periods of a soak test are the same as an average-load test.

![Overview of a soak test](/media/docs/k6-oss/chart-soak-test-overview.png)

In some testing conversation, a soak test might be called an endurance, constant high load, or stamina test.

## When to perform a Soak test

Most systems must stay turned on and keep working for days, weeks, and months without intervention. This test verifies the system stability and reliability over extended periods of use.

This test type checks for common performance defects that show only after extended use. Those problems include response time degradation, memory or other resource leaks, data saturation, and storage depletion.

## Considerations

When you prepare to run a soak test, consider the following:

- **Configure the duration to be considerably longer than any other test.**

  Some typical values are 3, 4, 8, 12, 24, and 48 to 72 hours.

- **If possible, re-use the average-load test script**

  Changing only the peak durations for the aforementioned values.

- **Don't run soak tests before running smoke and average-load tests.**

  Each test uncovers different problems.
  Running this first may cause confusion and resource waste.

- **Monitor the backend resources and code efficiency.**
  Since we are checking for system degradation, monitoring the backend resources and code efficiency is highly recommended.
  Of all test types, backend monitoring is especially important for soak tests.

## Soak testing in k6

The soak test is almost the same as the average-load test. The only difference is the increased duration of the load plateau.

1. Increase the load until it reaches an average number of users or throughput.
1. Maintain that load for **a considerably longer time.**
1. Finally, depending on the test case, stop or ramp down gradually.

Configure the load duration in the `options` object:

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for Soak test in this section
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '8h', target: 100 }, // stay at 100 users for 8 hours!!!
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

Notice that, as in an average-load test, peak load plateaus at 100. VUs.
The difference is in duration.
In this soak, peak load maintains for 8 hours rather than some minutes.

![The shape of the soak test as configured in the preceding script](/media/docs/k6-oss/chart-soak-test-k6-script-example.png)

## Results analysis

If we execute this test after the previous types, we should have a system performing well under previous scenarios. In this test, monitor for changes in any performance metric as time passes. Try to correlate any impact with backend measurement changes that indicate degradation over time. Such changes can be gradual degradations, as mentioned, and sudden changes (improvements, too) in response time and backend hardware resources. Backend resources to check are RAM consumed, CPU, Network, and growth of cloud resources, among others.

The expected outcome is that the performance and resource utilization of the backend stays stable or within expected variations.

After you run all the previous test types, you know your system performs well at many different loads: small, average, high, and extended.
