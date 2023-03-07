---
title: 'Cloud test status'
excerpt: 'A list of test statuses returned by the cloud test, with context and descriptions.'
weight: 505
---

# Test status codes

The following is a list of test statuses returned by the cloud test, along with the code returned.
The code returned here is different than what is returned by k6.

- [Created](#created): -2
- [Validated](#validated): -1
- [Queued](#queued): 0
- [Initializing](#initializing): 1
- [Running](#running): 2
- [Finished](#finished): 3
- [Timed out](#timed-out): 4
- [Aborted by user](#aborted-by-user): 5
- [Aborted by system](#aborted-by-system): 6
- [Aborted by script error](#aborted-by-script-error): 7
- [Aborted by threshold](#aborted-by-threshold): 8
- [Aborted by limit](#aborted-by-limit): 9


## Successful tests

Every successful test passes through the following statuses.
The time from `Created` to `Running`, though, is typically very short and hardly noticeable.

<span id="created">Created</span>
: A test that has been created but not validated yet.

<span id="validated">Validated</span>
: A test that has finished initial validation, but hasn't been queued to run yet.

<span id="queued">Queued</span>
: A test that has entered the queue. Once a test worker picks it up, it begins initializing.

<span id="initializing">Initializing</span>
: A test that has been assigned to Load Generators, but hasn't started to make HTTP requests yet.

<span id="running">Running</span>
: A test that is actively making HTTP or websocket requests

<span id="finished">Finished</span>
: A test that has finished running with no failed thresholds.


## Failed and aborted tests

These statuses happen when the test doesn't successfully finish for whatever reason.


<span id="timed-out">Timed Out</span>
: A test that hasn't received or sent any information for a long time

<span id="aborted-by-user">Aborted (by user)</span>
: A test that was aborted by the user. Tests aborted by user **count against your total usage**.

<span id="aborted-by-system">Aborted (by system)</span>
: A test that was aborted by the system.
: These tests typically abort due to a fatal error. If the test fails before launch, the Load Zone may have an underlying issue that is unrelated to k6. If the test aborts during execution, Load Generators might have been overutilized. In this case, look at the CPU and Memory utilization and add or increase sleep times. You also might set the option `discardResponseBodies` to `true` to lower memory pressure.

<span id="aborted-by-script-error">Aborted (script error)</span>
: A test that was aborted due to an error in your script.
: For example, if you were to capture data from the response body of a request that you reuse in a future request. If the first request were to fail, your future request would contain a null value. Sudden script errors can suggest a performance issue. Fix the performance issue or add error handling to account for these cases.

<span id="aborted-by-threshold">Aborted (by threshold)</span>
: A test that exceeded your defined threshold value and that threshold was given the option to automatically abort the test.

<span id="aborted-by-limit">Aborted (by limit)</span>
: A test that has exceeded limits, for one or more of the following reasons:

    - Too many groups (>40)
    - Too many metrics (>10,000)
    - A duration longer than 60 minutes (for tests longer than 60 minutes, contact us)
    - Max VUs exceeds 20,000 VUs (for tests higher than 20k, contact us)

If your test has too many groups, reduce their number.
If it has too many metrics, use URL grouping to combine similar URLs.

You should also remove external requests from your test script.
Each captured URL accounts for multiple individual metrics that k6 measures.
External requests can quickly produce a large number of metrics, and granularity of this type won't help you understand the performance of the System Under Test.


