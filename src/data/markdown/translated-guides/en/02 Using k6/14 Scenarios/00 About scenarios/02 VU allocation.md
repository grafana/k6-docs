---
title: VU allocation
excerpt: How k6 allocates VUs in the open-model, arrival-rate executors
---

In arrival-rate executors, as long as k6 has VUs available, it starts iterations according to your target rate.
The ability to set iteration rate comes with a bit more configuration complexity: you must pre-allocate a sufficient number of VUs.
In other words, before the tests runs, you must both:
- Configure load (as iteration per unit of time)
- Ensure that you've scheduled enough VUs.

Read on to learn about how k6 allocates VUs in the arrival-rate executors.

## Pre-allocation in arrival-rate executors

As [open-model](/using-k6/scenarios/about-scenarios/open-vs-closed/#open-model) scenarios, arrival-rate executors start iterations according to a configured rate.
For example, you can configure arrival-rate executors to start 10 iterations each second, or minute, or hour.
This behavior is opposed to the closed-model scenarios, in which VUs wait for one iteration to finish before starting another

Each iteration need needs a VU to run it.
Because k6 VUs are single threaded, like other JS runtimes, a VU can only run the event loop of a single iteration at a time.
To ensure you have enough, you must pre-allocate a sufficient number.

In your arrival-rate configuration, three properties determine the iteration rate:
- `rate` determines how many iterations k6 starts.
- `timeUnit` determines how frequently it starts the number of iterations.
- `preAllocatedVUs` sets the number of VUs to use to reach the target iterations per second.
In practice, determining the right number of iterations might take some trial and error,
as the necessary VUs entirely depends on how quickly the SUT can process iterations.

```javascript
export const options = {
  scenarios: {
    constant_load: {
      executor: "constant-arrival-rate",
      preAllocatedVUs: 4,
      rate: 8,
      timeUnit: "1m",
    },
  },
};
```


<Blockquote mod="attention" title="">

In cloud tests, **both `preAllocatedVUs` and `maxVUs` count against your subscription.**

When planning a test, consider doing a trial initialization on a local machine to ensure you're allocating VUs efficiently.

</Blockquote>

## How k6 uses allocated VUs

Before an arrival-rate scenario starts, k6 first initializes the number of `preAllocatedVUs`.
When the test runs,
the number of available `preAllocatedVUs` determines how many iterations k6 can start.
k6 tries to reach the target iterations per second,
and one of two things can happen:

| If the executor       | Then..                                                                                                                                 |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Has enough VUs        | the extra VUs are "idle," ready to be used when needed.                                                                                |
| Has insufficient VUs. | k6 emits a [`dropped_iterations` metric](/using-k6/scenarios/about-scenarios/dropped-iterations) for each iteration that it can't run. |

## Iteration duration affects the necessary allocation

The necessary allocation depends on the iteration duration:
Longer durations need more VUs.

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

The arrival-rate executors also have a `maxVUs` property.
If you set it, k6 runs in this sequence:
1. Pre-allocate the `preAllocatedVUs`.
1. Run the test, trying to reach the target iteration rate.
1. If the target exceeds the available VUs, allocate another VU.
1. If the target still exceeds available VUs, continue allocating VUs until reaching the number set by `maxVUs`.

Though it seems convenient, you should avoid using `maxVUs` in most cases.
Allocating VUs has CPU and memory costs, and allocating VUs as the test runs **can overload the load generator and skew results**.
If you're running in k6 Cloud, the `maxVUs` will count against your subscription.
In almost all cases, the best thing to do is to pre-allocate the number of VUs you need beforehand.

Some of the times it might make sense to use `maxVUs` include:
- To determine necessary allocation in first-time tests
- To add a little "cushion" to the pre-allocated VUs that you expect the test needs
- In huge, highly distributed tests, in which you need to carefully scale load generators as you increment VUs.
