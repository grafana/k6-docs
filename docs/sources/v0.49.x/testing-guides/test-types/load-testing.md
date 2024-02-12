---
title: 'Average-load testing'
head_title: 'What is Load Testing? How to create a Load Test in k6'
description: 'An average-load test assesses the performance of your system in terms of concurrent users or requests per second.'
weight: 02
---

# Average-load testing

An average-load test assesses how the system performs under typical load. Typical load might be a regular day in production or an average moment.

Average-load tests simulate the number of concurrent users and requests per second that reflect average behaviors in the production environment. This type of test typically increases the throughput or VUs gradually and keeps that average load for some time. Depending on the system's characteristics, the test may stop suddenly or have a short ramp-down period.

![Overview of an average-load test](/media/docs/k6-oss/chart-average-load-test-overview.png)

Since “load test” might refer to all types of tests that simulate traffic, this guide uses the name _average-load test_ to avoid confusion.
In some testing conversation, this test also might be called a day-in-life test or volume test.

## When to run an average-load test

Average-Load testing helps understand whether a system meets performance goals on a typical day (commonplace load). _Typical day_ here means when an average number of users access the application at the same time, doing normal, average work.

You should run an average-load test to:

- Assess the performance of your system under a typical load.
- Identify early degradation signs during the ramp-up or full load periods.
- Assure that the system still meets the performance standards after system changes (code and infrastructure).

## Considerations

When you prepare an average-load test, consider the following:

- **Know the specific number of users and the typical throughput per process in the system.**

  To find this, look through APMs or analytic tools that provide information from the production environment. If you can't access such tools, the business must provide these estimations.

- **Gradually increase load to the target average.**

  That is, use a _ramp-up period_. This period usually lasts between 5% and 15% of the total test duration. A ramp-up period has many essential uses:

  - It gives your system time to warm up or auto-scale to handle the traffic.
  - It lets you compare response times between the low-load and average-load stages.
  - If you run tests using our cloud service, a ramp up lets the automated performance alerts understand the expected behavior of your system.

- **Maintain average for a period longer than the ramp up.**

  Aim for an average duration at least five times longer than the ramp-up to assess the performance trend over a significant period of time.

- **Consider a ramp-down period.**

  The ramp down is when virtual user activity gradually decreases. The ramp down usually lasts as long as the ramp up or a bit less.

## Average-load testing in k6

{{% admonition type="note" %}}

If this is your first time running load tests, we recommend starting small or configuring the ramp-up to be slow. Your application and infrastructure might not be as rock solid as you think. We've had thousands of users run load tests that quickly crash their applications (or staging environments).

{{% /admonition %}}

The goal of an average-load test is to simulate the average amount of activity on a typical day in production. The pattern follows this sequence:

1. Increase the script's activity until it reaches the desired number of users and throughput.
1. Maintain that load for a while
1. Depending on the test case, stop the test or let it ramp down gradually.

Configure load in the `options` object:

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: '5m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '30m', target: 100 }, // stay at 100 users for 30 minutes
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

This script logic has only one request (to open a web page). Your test behavior likely has more steps. If you would like to see more complex tests that use groups, checks, thresholds, and helper functions, refer to [Examples](https://grafana.com/docs/k6/<K6_VERSION>/examples).

The VU or throughput chart of an average-load test looks similar to this:

![The shape of the average-load test as configured in the preceding script](/media/docs/k6-oss/chart-average-load-test-k6-script-example.png 'Note that the number of users or throughput starts at 0, gradually ramps up to the desired value, and stays there for the indicated period. Then load ramps down for  a short period.')

## Results analysis

An initial outcome for the average-load test appears during the ramp-up period to find whether the response time degrades as the load increases. Some systems might even fail during the ramp-up period.

The test validates if the system's performance and resource consumption stay stable during the period of full load, as some systems may display erratic behavior in this period.

Once you know your system performs well and survives a typical load, you may need to push it further to determine how it behaves at above-average conditions. Some of these above-average conditions are known as [Stress tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing).
