---
title: 'Introduction'
excerpt: 'Guide to test types'
---

k6 can run many types of tests, each of which serves a different testing goal.

You can use the same test logic for multiple test types.
The only thing that changes is the test workload configuration.

![Types of performance tests](./images/test-types.png)

Each test type teaches you something different about your system.

- [**Smoke tests**](/test-types/smoke-testing) verify that your system can handle minimal load, without any problems.
- [**Load tests**](/test-types/load-testing) assess system performance in terms of concurrent users or requests per second.
- [**Stress**](/test-types/stress-testing) and [**Spike**](/test-types/stress-testing#spike-testing-in-k6) tests assess the limits and stability of your system under extreme conditions.
- [**Soak tests**](/test-types/soak-testing) assess the reliability and performance of your system over an extended period of time.

Start with a [Smoke test](/test-types/smoke-testing) and see how easy it is to run your first load test!
After you know that the script works and the system responds to minimal load correctly, you can move on to other test types.

<!--
 Note that performance, stability, and reliability, while related, are 3 different goals.

If you are reading this, you are here to achieve one or all 3 goals.

Here's the short recipe to test your system for performance, stability, and reliability.

1. Start small. Run a smoke test.
2. If your smoke test succeeded, increase the load and run a small load test.
3. If your load test worked as expected, automate it. Automate early. Consistency is key.
4. Monitor your performance over time. If you automated by scheduling your tests to run nightly,
   observe the performance changes over time.
5. Add thresholds to your load test to fail when the performance decreases below your expectations.
   Setup notifications on failure.
6. Run significant Load Tests nightly in your Staging Environment to make sure your performance
   didn't degrade due to recent code changes.
7. Run a Stress Test to verify the limits of your system, and it's stability under extreme
   conditions.
8. Run Soak Test to verify the reliability of your system over an extended period of time.
-->
