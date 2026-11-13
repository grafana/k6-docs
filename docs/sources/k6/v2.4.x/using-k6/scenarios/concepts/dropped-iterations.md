---
title: Dropped iterations
description: Explanations about how your scenario configuration or SUT performance can lead to dropped iterations
weight: 30
---

# Dropped iterations

Sometimes, a scenario can't run the expected number of iterations.
k6 tracks the number of unsent iterations in a counter metric, `dropped_iterations`.
The number of dropped iterations can be valuable data when you debug executors or analyze results.

Dropped iterations usually happen for one of two reasons:

- The executor configuration is insufficient.
- The SUT can't handle the configured VU arrival rate.

### Configuration-related iteration drops

Dropped iterations happen for different reasons in different types of executors.

With `shared-iterations` and `per-vu-iterations`, iterations drop if the scenario reaches its `maxDuration` before all iterations finish.
To mitigate this, you likely need to increase the value of the duration.

With `constant-arrival-rate` and `ramping-arrival-rate`, iterations drop if there are no free VUs.
**If it happens at the beginning of the test, you likely just need to allocate more VUs.**
If this happens later in the test, the dropped iterations might happen because SUT performance is degrading and iterations are taking longer to finish.

### SUT-related iteration drops

At a certain point of high latency or longer iteration durations, k6 will no longer have free VUs to start iterations with at the configured rate.
As a result, the executor will drop iterations.

The reasons for these dropped iterations vary:

- The SUT response has become so long that k6 starts dropping scheduled iterations from the queue.
- The SUT iteration duration has become so long that k6 needs to schedule more VUs to reach the target arrival rate, exceeding the number of scheduled iterations.

As the causes vary, dropped iterations might mean different things.
A few dropped iterations might indicate a quick network error.
Many dropped iterations might indicate that your SUT has completely stopped responding.

When you design your test, consider what an acceptable rate of dropped iterations is (the _error budget_).
To assert that the SUT responds within this error budget, you can use the `dropped_iterations` metric in a [Threshold](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds).
