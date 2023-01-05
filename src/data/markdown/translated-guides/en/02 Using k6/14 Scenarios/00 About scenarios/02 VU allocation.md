---
title: VU allocation
excerpt: How k6 allocates VUs in the open-model, arrival-rate executors
---

This document explains how k6 allocates VUs in the arrival rate executors.

In arrival-rate executors, the `rate` property determines how many iterations k6 starts, and `timeUnit` determines how frequently it starts this number.
For example, a `rate` of `8` and a `timeUnit` of `'1m'` starts 8 iterations every 1 minute.
However, to meet the desired rate, you also must pre-allocate the number of VUs in the `preAllocatedVUs` property:

By pre-allocating VUs, k6 can initialize the VUs necessary for the test before the test runs,
which ensures that the CPU cost of allocation doesn't interfere with test execution.

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

When planning a test, consider doing a trial initialization on a local machine to make sure that you're allocating VUs efficiently. 

</Blockquote>

## How k6 uses allocated VUs

Before an arrival-rate scenario starts, k6 first initializes the number of `preAllocatedVUs`.
It then passes the VUs to the scenario executor and the test starts running.

k6 can create as many iterations as the number of available `preAllocatedVUs`:
- If the test has more than enough VUs, then the extra VUs are "idle," ready to be used when needed.
- If there aren't enough VUs for the scheduled iterations, then k6 emits a `dropped_iterations` metric.

  Read more about [Dropped iterations](/using-k6/scenarios/about-scenarios/dropped-iterations).

## Iteration duration affects necessary allocation

Imagine that you have a goal of 50 iterations per second.
The executor `rate` is `50`, and the `timeUnit` is `1s`.

How many `preAllocatedVUs` do you need?
This all depends on your iteration duration.
If the iterations all have a duration of `1s`, then 50 pre-allocated VUs should be enough VUs&mdash;in an ideal world.

In the real world, iteration durations fluctuate with load and with random statistical variance.
You could **approximate** the number of VUs you need by multiplying the expected median iteration (perhaps determined by an early test) duration by the desired rate.

```
preAllocatedVus = median iteration duration * rate
```

In real load tests, the median iteration duration might be quite hard to predict.
And even if you knew the median value, the variance could be so high that some periods may happen where the number of pre-allocated VUs was insufficient anyway.
So, if the test has high load, you should probably add some amount of extra iterations.
This may take some early experimentation.

## You probably don't need `maxVUs`

The arrival rate executors also have a `maxVUs` property.
If you set it, k6 will:
1. First pre-allocate the `preAllocatedVUs`.
1. Run the test, trying to reach the target iteration rate.
1. If the target exceeds the available VUs, k6 allocates more another VU.
1. If the target still exceeds available VUs, continue allocating VUs until reaching the number set by `maxVUs`.

Thought it seems convenient, in most cases, **you should avoid using `maxVUs`**:
- Allocating VUs has CPU and memory cost, and allocating VUs as the test runs **can overload the load generator and skew results.*
In almost all cases, the best thing to do is to pre-allocate the number of VUs you need before hand.

Some of the times it might make sense to use `maxVUs` include:
- To determine necessary allocation in first-time tests
- To add a little "cushion" to an expected baseline `maxVUs`
- For huge, highly distributed tests, where you need to carefully scale load generators by VUs.

