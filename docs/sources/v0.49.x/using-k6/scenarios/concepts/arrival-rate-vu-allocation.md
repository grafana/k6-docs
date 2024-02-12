---
title: Arrival-rate VU allocation
description: How k6 allocates VUs in the open-model, arrival-rate executors
weight: 20
---

# Arrival-rate VU allocation

In arrival-rate executors, as long as k6 has VUs available, it starts iterations according to your target rate.
The ability to set iteration rate comes with a bit more configuration complexity: you must pre-allocate a sufficient number of VUs.
In other words, before the tests runs, you must both:

- Configure load (as new iterations per unit of time)
- Ensure that you've allocated enough VUs.

Read on to learn about how k6 allocates VUs in the arrival-rate executors.

{{% admonition type="caution" %}}

In cloud tests, **`preAllocatedVUs` count against your subscription.**

When planning a test, consider doing a trial initialization on a local machine to ensure you're allocating VUs efficiently.

{{% /admonition %}}

## Pre-allocation in arrival-rate executors

As [open-model](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/open-vs-closed#open-model) scenarios, arrival-rate executors start iterations according to a configured rate.
For example, you can configure arrival-rate executors to start 10 iterations each second, or minute, or hour.
This behavior is opposed to the closed-model scenarios, in which VUs wait for one iteration to finish before starting another

Each iteration needs a VU to run it.
Because k6 VUs are single threaded, like other JavaScript runtimes, a VU can only run a single iteration (and its event loop) at a time.
To ensure you have enough, you must pre-allocate a sufficient number.

In your arrival-rate configuration, three properties determine the iteration rate:

- k6 starts `rate` number of iterations evenly across the `timeUnit` (default 1s).
- `preAllocatedVUs` sets the number of VUs to initialize to meet the target iteration rate.

For example, with a `constant-arrival-rate` executor and `rate: 10`, k6 tries to start a new iteration every 100 milliseconds. If the scenario has `rate: 10, timeUnit: '1m'`, k6 tries to start a new iteration every 6 seconds.
Whether it _can_ start the target iteration rate depends on whether the number of allocated VUs is sufficient.

```javascript
export const options = {
  scenarios: {
    constant_load: {
      executor: 'constant-arrival-rate',
      preAllocatedVUs: 10,
      rate: 10,
      timeUnit: '1m',
    },
  },
};
```

In practice, determining the right number of VUs to be able to reach the target iteration rate might take some trial and error,
as the necessary VUs entirely depends on what your iteration code looks like and how quickly the system under test can process requests.

## How k6 uses allocated VUs

Before an arrival-rate scenario starts, k6 first initializes the number of `preAllocatedVUs`.
When the test runs,
the number of available `preAllocatedVUs` determines how many iterations k6 can start.
k6 tries to reach the target iterations per second,
and one of two things can happen:

| If the executor       | Then..                                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Has enough VUs        | the extra VUs are "idle," ready to be used when needed.                                                                                                                 |
| Has insufficient VUs. | k6 emits a [`dropped_iterations` metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/concepts/dropped-iterations) for each iteration that it can't run. |

## Iteration duration affects the necessary allocation

The necessary allocation depends on the iteration duration:
longer durations need more VUs.

In a perfect world, you could estimate the number of pre-allocated VUs with this formula:

```
preAllocatedVUs = [median_iteration_duration * rate] + constant_for_variance
```

In the real world, if you know _exactly_ how long an iteration takes, you likely don't need to run a test.
What's more, as the test goes on, iteration duration likely increases.
If response times slow so much that k6 lacks the VUs to start iterations at the desired rate,
the allocation might be insufficient and k6 will drop iterations.

To determine your strategy, you can run tests locally and gradually add more pre-allocated VUs.
As dropped iterations can also indicate that the system performance is degrading, this early experimentation can provide useful data on its own.

## You probably don't need `maxVUs`

{{% admonition type="caution" %}}

In cloud tests, the number of `maxVUs` counts against your subscription,
**overriding the number set by `preAllocatedVUs`**.

{{% /admonition %}}

The arrival-rate executors also have a `maxVUs` property.
If you set it, k6 runs in this sequence:

1. Pre-allocate the `preAllocatedVUs`.
1. Run the test, trying to reach the target iteration rate.
1. If the target exceeds the available VUs, allocate another VU.
1. If the target still exceeds available VUs, continue allocating VUs until reaching the number set by `maxVUs`.

Though it seems convenient, you should avoid using `maxVUs` in most cases.
Allocating VUs has CPU and memory costs, and allocating VUs as the test runs **can overload the load generator and skew results**.
In Cloud tests, the number of `maxVUs` count against your subscription.
This is because k6 must allocate sufficient resources for `maxVUs` to be initialized, even if they never are.
In almost all cases, the best thing to do is to pre-allocate the number of VUs you need beforehand.

Some of the times it might make sense to use `maxVUs` include:

- To determine necessary allocation in first-time tests
- To add a little "cushion" to the pre-allocated VUs that you expect the test needs
- In huge, highly distributed tests, in which you need to carefully scale load generators as you increment VUs.

## You can't guarantee which VU runs an iteration

As with all executors, you can't predict the specific VU that an arrival-rate executor uses for a specific iteration.
As the test runs on, the executor might use some or all of the allocated VUs, even if it never needs the entire allocated number to reach the iteration rate.
