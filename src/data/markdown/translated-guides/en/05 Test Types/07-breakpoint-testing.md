---
title: 'Breakpoint testing'
excerpt: 'Breakpoint tests aim to find system limits. They increase load until the system fails.'
---

Breakpoint testing aims to find system limits. Reasons you might want to know the limits include: 

* To tune or care for the system weak spots to relocate those higher limits at higher levels.
* To help plan remediation steps in those cases and even prepare for when our system may get near those limits.

In other words, knowing where and how a system starts to fail helps prepare for such limits.


A breakpoint ramps to unrealistically high numbers.
This test commonly has to be stopped manually or automatically as thresholds start to fail. When these problems appear, the system has reached its limits.

![Overview of a breakpoint test](images/chart-breakpoint-test-overview.png)

The breakpoint test is another test type with no clear naming consensus.
In some testing conversation, it's also known as capacity testing, point load test, and limit testing.

## When to run a breakpoint test

Teams execute a breakpoint test whenever they must know their system's diverse limits. Some conditions that may warrant a breakpoint test include:

* The need to know if the system's load expects to grow continuously
* If current resource consumption is considered high
* After significant changes to the code-base or infrastructure.

How often to run this test type depends on the risk of reaching the system limits and the amount of changes and code additions.

Once the breakpoint runs and the system limits have been identified, if the team desires, repeat the test after the tuning exercise to validate how it impacted limits. Repeat the test-tune cycle until the team is satisfied.

## Considerations

* **Avoid breakpoint tests in an elastic cloud environments.**

    The elastic environment may grow as the test moves further, finding only the limit of your cloud account bill. If this test runs on a cloud environment, **turning off elasticity on all the affected components is strongly recommended**.
* **Increase the load gradually.**

  A sudden increase may make it difficult to pinpoint why and when the system starts to fail.
  
* **System failure could mean different things to different teams**

    You might want to identify each of the following failure points:
    * Degraded performance. The response times increased, and user experience decreased.
    * Troublesome performance. The response times get to a point where the user experience severely degrades.
    * Timeouts. Processes are failing due to extremely high response times.
    * Errors. The system starts responding with HTTP error codes.
    * System failure. The system collapsed.
    
* **You can repeat this test several times**

    Repeating after each tuning might let the you push the system further.

* **Run breakpoints only when the system is known to perform under all other test types.**

  If the system is not tuned and performant in the previous testing types, the breakpoint test might go far.

## Breakpoint testing in k6

The breakpoint test is straightforward. Load slowly ramps up to a considerably high load.
It has no plateau load duration, ramp-down, or other steps, and it generally fails before reaching the indicated point.

k6 offers two ways to increase the activity: increasing VUs or increase throughput ([open and closed models](/using-k6/scenarios/concepts/open-vs-closed/)).
Different from other load test types, which should be stopped when the system degrades to a certain point, breakpoint load increases even as the system starts to degrade.
That makes it recommendable to use [ramping-arrival-rate](/using-k6/scenarios/executors/ramping-arrival-rate/) for  a breakpoint test.

The test keeps increasing load or VUs until it reaches the defined breaking point or system limits, at which point the test stops or is aborted.

![The shape of the breakpoint test as configured in the preceding script](images/chart-breakpoint-test-k6-script-example.png)

The test must be stopped before it completes the scheduled execution.
You can stop the test manually or with a threshold:
- To stop k6 manually in the CLI, press `Ctrl+C` in Linux or Windows, and `Command .` in Mac.
- To stop the test using a threshold, you must define `abortOnFail` as true.
For details, refer to the [Thresholds ](https://k6.io/docs/using-k6/thresholds/).

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

If the action taken is to tune the system, the team must repeat the breakpoint test to find where and if the system's limits moved further.
There is no fixed number of times to repeat this exercise.The number of repetitions of the breakpoint test, how much the system can be tuned and how far can its limits be tuned after each exercise is up to the team’s needs.
There are some real-life conditions where an increase, similar to the breakpoint test, can happen suddenly. That is known as a Spike test.

