---
title: "Test Status codes"
excerpt: "List of the different test statuses that can be returned by k6 cloud service, with reasons and fixes for dealing with such a status."
---

## Purpose

Explanation of the different test statuses in k6 along with the code returned.  The code returned here is different than what is returned by k6.

Status | Description
-------|------------------------
-2     | Created
-1     | Validated
0      | Queued
1      | Initializing
2      | Running
3      | Finished
4      | Timed out
5      | Aborted by user
6      | Aborted by system
7      | Aborted by script error
8      | Aborted by threshold
9      | Aborted by limit



Every successful test, will go through the following statuses.  The time from Created -> Running, is typically very short and hardly noticeable as you use the platform.

## Created
A test that is newly created, but has not yet been validated.

## Validated
A test which has finished initial validation, but has not been queued to run yet.

## Queued
A test which has entered our queue.  Once it is picked up by a test worker, it will begin initializing.

## Initializing
A test which has been assigned to Load Generators, but has not yet started to make HTTP requests.

## Running
A test which is actively making HTTP(s) or websocket requests

## Finished
A test which has finished running.  If thresholds were used, no thresholds have failed.

***

When a does not finish as expected, you the test will have one of the following statues.


## Timed Out
A test which has not received or sent any information for a long time

## Aborted (by user)
A test which was aborted by the user.  Tests aborted by user count against your total usage.

## Aborted (by system)
A test that was aborted by the system.  These tests typically abort due to a fatal error occuring.  If the test fails before launch, there may be an underlying issue with the Load Zone, unrelated to k6.  If the test aborts during execution, it may be due to overutilization of the Load Generators.  In this case, we suggest you look at the CPU and Memory utilization and add or increase sleep times. You may also want to set the option `discardRepsonseBodies` to `true`, to lower memory pressure.

## Aborted (script error)
A test that was aborted due to an error in your script. For example, if you were to capture data from the response body of a request that you reuse in a future request.  If the first request were to fail, your future request would contain a null value. Sudden script errors can suggest a performance issue.  Fix the performance issue or add error handling to account for these cases.

## Aborted (by threshold)
A test that exceeded your defined threshold value and that threshold was given the option to automatically abort the test.

## Aborted (by limit)
A test that has exceeded one or more of the following limits:
- There are "too many" (>40) groups in a test
- There are "too many" (>10,000) metrics reported
- The duration is longer than 60 mins (for tests longer than 60 min, please contact us)
- The max VUs is higher than 20,000 VUs (for tests higher than 20k, please contact us)

If your test has too many groups, please reduce their number.  If your test has too many metrics, please use URL grouping to combine similar URLs.  You should also remove external requests from your test script.  Each URL captured will account for 7 individual metrics that we keep track of.  External requests can quickly produce a large number of metrics that aren't helpful to the understanding performance of the System Under Test.
