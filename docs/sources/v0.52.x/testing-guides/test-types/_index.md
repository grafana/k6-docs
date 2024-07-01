---
title: 'Load test types'
description: 'A series of conceptual articles explaining the different types of load tests. Learn about planning, running, and interpreting different tests for different performance goals.'
weight: -10
cascade:
  noindex: true
---

# Load test types

Many things can go wrong when a system is under load.
The system must run numerous operations simultaneously and respond to different requests from a variable number of users.
To prepare for these performance risks, teams use load testing.

But a good load-testing strategy requires more than just executing a single script.
Different patterns of traffic create different risk profiles for the application.
For comprehensive preparation, teams must test the system against different _test types_.

![Overview of load test shapes](/media/docs/k6-oss/chart-load-test-types-overview.png)

## Different tests for different goals

Start with smoke tests, then progress to higher loads and longer durations.

The main types are as follows. Each type has its own article outlining its essential concepts.

- [**Smoke tests**](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/smoke-testing) validate that your script works and that the system performs adequately under minimal load.

- [**Average-load test**](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/load-testing) assess how your system performs under expected normal conditions.

- [**Stress tests**](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing) assess how a system performs at its limits when load exceeds the expected average.

- [**Soak tests**](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing) assess the reliability and performance of your system over extended periods.

- [**Spike tests**](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing) validate the behavior and survival of your system in cases of sudden, short, and massive increases in activity.

- [**Breakpoint tests**](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/breakpoint-testing) gradually increase load to identify the capacity limits of the system.

{{% admonition type="note" %}}

In k6 scripts, configure the load configuration using [`options`](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6#using-options) or [`scenarios`](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios). This separates workload configuration from iteration logic.

{{% /admonition %}}

## Test-type cheat sheet

The following table provides some broad comparisons.

| Type                                                                                                | VUs/Throughput        | Duration                   | When?                                                                                                              |
| --------------------------------------------------------------------------------------------------- | --------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Smoke](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/smoke-testing)           | Low                   | Short (seconds or minutes) | When the relevant system or application code changes. It checks functional logic, baseline metrics, and deviations |
| [Load](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/load-testing)             | Average production    | Mid (5-60 minutes)         | Often to check system maintains performance with average use                                                       |
| [Stress](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing)         | High (above average)  | Mid (5-60 minutes)         | When system may receive above-average loads to check how it manages                                                |
| [Soak](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing)             | Average               | Long (hours)               | After changes to check system under prolonged continuous use                                                       |
| [Spike](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing)           | Very high             | Short (a few minutes)      | When the system prepares for seasonal events or receives frequent traffic peaks                                    |
| [Breakpoint](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/breakpoint-testing) | Increases until break | As long as necessary       | A few times to find the upper limits of the system                                                                 |

## General recommendations

When you write and run different test types in k6, consider the following.

### Start with a smoke test

Start with a [smoke test](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/smoke-testing).
Before beginning larger tests, validate that your scripts work as expected and that your system performs well with a few users.

After you know that the script works and the system responds correctly to minimal load,
you can move on to average-load tests.
From there, you can progress to more complex load patterns.

### The specifics depend on your use case

Systems have different architectures and different user bases. As a result, the correct load testing strategy is highly dependent on the risk profile for your organization. Avoid thinking in absolutes.

For example, k6 can model load by either number of VUs or by number of iterations per second ([open vs. closed](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/open-vs-closed)).
When you design your test, consider which pattern makes sense for the type.

What's more, **no single test type eliminates all risk.**
To assess different failure modes of your system, incorporate multiple test types.
The risk profile of your system determines what test types to emphasize:

- Some systems are more at risk of longer use, in which case soaks should be prioritized.
- Others are more at risk of intensive use, in which case stress tests should take precedence.

In any case, **no single test can uncover all issues**.

What's more, the categories themselves are relative to use cases. A stress test for one application is an average-load test for another. Indeed, no consensus even exists about the names of these test types (each of the following topics provides alternative names).

### Aim for simple designs and reproducible results

While the specifics are greatly context-dependent, what's constant is that you want to make results that you can compare and interpret.

Stick to simple load patterns. For all test types, directions is enough: ramp-up, plateau, ramp-down.

Avoid "rollercoaster" series where load increases and decreases multiple times. These will waste resources and make it hard to isolate issues.
