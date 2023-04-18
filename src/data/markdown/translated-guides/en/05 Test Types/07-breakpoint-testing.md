---
title: 'Breakpoint testing'
excerpt: 'Breakpoint tests aim to find system limits. They increase load until the system fails.'
---

Breakpoint testing is primarily concerned with finding system limits. Reasons you might want to know the limits include: 

* To tune or care for the system weak spots to relocate those higher limits at higher levels.
* To help plan remediation steps in those cases and even prepare for when our system may get near those limits.

In other words, knowing where and how a system starts to fail helps prepare for such limits.

The Breakpoint test is another test type with no clear naming consensus.
In some testing conversation, it is also known as Capacity testing, Point Load test, Limit testing, etc.

The design of breakpoint ramps up indefinitely, or, at the very least, to gradually reace to unrealistically high numbers.

This test commonly has to be stopped manually or automatically as thresholds start to fail. When these problems appear, the system has reached its limits.

![Overview of a breakpoint test](images/chart-breakpoint-test-overview.png)

## When to run a Breakpoint test

Teams execute a Breakpoint test whenever they must know their system's diverse limits. Some conditions that may warrant a breakpoint test include:

* The need to know if the system's load expects to grow continuously
* If current resource consumption is considered high
* After significant changes to the code-base or infrastructure.

How often to run this test type depends on the risk of reaching the system limits and the amount of changes and code additions.

Once the breakpoint runs and the system limits have been identified, if the team desires, repeat the test after the tuning exercise to validate how it impacted limits. Repeat the test-tune cycle until the team is satisfied.

## Considerations

* Avoid running a Breakpoint test in an elastic cloud environment. It might keep growing as the test moves further, finding only the limit of your cloud account bill. If this test runs on a cloud environment,** turning off elasticity on all the affected components is strongly recommended**.
* Another recommendation is to gradually increase the load, as a sudden increase may make it difficult to pinpoint why and when the system starts to fail.
* System failure could mean different things to different teams, and some even may want to identify each of the following failure points:
    * Degraded performance. The response times increased, and user experience decreased.
    * Troublesome performance. The response times get to a point where the user experience severely degrades.
    * Timeouts. Processes are failing due to extremely high response times.
    * Errors. The system starts responding with HTTP error codes.
    * System failure. The system collapsed.
* Teams can repeat this test several times after each tuning exercise, which may let them  push the system further.
* Execute this test type only when the  system is known to perform under all previous test types and scenarios.
    * If the system is not tuned and performant in the previous testing types, the Breakpoint test may not be able to go far.

## Breakpoint testing in k6

The Breakpoint test is straightforward. It slowly ramps upscrip activity to a considerably high load. It lacks a plateau load duration, ramp-down, or other steps, as it generally fails before reaching the indicated point.

k6 offers two ways to increase the activity: by increasing VUs or increasing throughput ([open and closed models](/using-k6/scenarios/concepts/open-vs-closed/)). Different from other load test types, which should be stopped when the system degrades to a certain point, breakpoint testing aims to increase the load even if the system starts to degrade. That makes it recommendable to use [ramping-arrival-rate](/using-k6/scenarios/executors/ramping-arrival-rate/) for  a Breakpoint test.

The test keeps increasing load or VUs until it reaches the defined breaking point or the system limits, stopping/aborting the test.

![The shape of the breakpoint test as configured in the preceding script](images/chart-breakpoint-test-k6-script-example.png)

Breakpoint is one of the most aggressive test types and is commonly what many people think of when someone mentions a performance test.

As mentioned in previous sections, this test type must be stopped before it completes the scheduled execution. This can be done manually or by defining a Threshold.

To stop k6 manually in the CLI you must press Ctrl+C in windows and Command+. (dot/period) in Mac.

To stop the test using a threshold you must define abortOnFail as true, for more information on how to define Thresholds please refer to the [Thresholds ](https://k6.io/docs/using-k6/thresholds/)section of k6’s documentation.


## Results analysis

A breakpoint test must cause system failure.
The test helps identify the failure points of our system and how the system behaves once it reaches its limits.

Once the system limits are identified, the team has two choices: accept them or tune the system.

If the decision is to accept the limits, the test results help teams prepare and take actions when the system is nearing such limits. 

These actions could be:

* Prevent reaching such limits
* Grow system resources
* Implement corrective actions for the system behavior at its limit
* Tune the system to stretch its limits

If the action taken is to tune the system, the team must repeat the Breakpoint test to find where and if the system's limits moved further.
There is no fixed number of times to repeat this exercise.The number of repetitions of the Breakpoint test, how much the system can be tuned and how far can its limits be tuned after each exercise is up to the team’s needs.
There are some real-life conditions where an increase, similar to the Breakpoint test, can happen suddenly. That is known as a Spike test.

