---
title: 'Introduction'
excerpt: 'Guide to test types'
---

There are many types of tests that can be performed with k6. Each type serves a different purpose.

![Types of performance tests](./images/test-types.png)

Each test type is designed to give you different insights about your system.

[Smoke Test's](/test-types/smoke-testing) role is to verify that your System can handle
minimal load, without any problems.

[Load Test](/test-types/load-testing) is primarily concerned with assessing the performance
of your system in terms of concurrent users or requests per second.

[Stress Test](/test-types/stress-testing) and [Spike testing](/test-types/stress-testing#spike-testing-in-k6)
are concerned with assessing the limits of your system and stability under extreme conditions.

[Soak Test](/test-types/soak-testing) tells you about reliability and performance of your
system over the extended period of time.

The important thing to understand is that each test can be performed with the same test script.
You can write one script and perform all the above tests with it. The only thing that changes is
the test configuration, the logic stays the same.

Different test types will teach you different things about your system and give you the insight
needed to understand or optimize performance.

Start with a [Smoke test](/test-types/smoke-testing) and see how easy it is to get your first load test running!

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
