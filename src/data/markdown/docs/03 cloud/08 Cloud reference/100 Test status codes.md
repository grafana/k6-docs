---
title: 'Test status codes'
excerpt: 'A list of test statuses returned by k6 Cloud, with context and descriptions.'
---

The following is a list of test statuses in k6, along with the code returned.
The code returned here is different than what is returned by k6.

<Glossary>

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

</Glossary>

## Successful tests

Every successful test passes through the following statuses.
The time from `Created` to `Running`, though, is typically very short and hardly noticeable.

<DescriptionList>

Created
: A test that is newly created, but has not yet been validated.

Validated
: A test that has finished initial validation, but has not been queued to run yet.

Queued
: A test that has entered our queue. Once it is picked up by a test worker, it will begin initializing.

Initializing
: A test that has been assigned to Load Generators, but has not yet started to make HTTP requests.

Running
: A test that is actively making HTTP(s) or websocket requests

Finished
: A test that has finished running. If thresholds were used, no thresholds have failed.


</DescriptionList>

## Failed and aborted tests

These statuses happen when the test does not successfully finish, for whatever reason.

<DescriptionList>

Timed Out
: A test that has not received or sent any information for a long time

Aborted (by user)
: A test that was aborted by the user. Tests aborted by user count against your total usage.

Aborted (by system)
: A test that was aborted by the system.
: These tests typically abort due to a fatal error occurring. If the test fails before launch, there may be an underlying issue with the Load Zone, unrelated to k6. If the test aborts during execution, it may be due to overutilization of the Load Generators. In this case, we suggest you look at the CPU and Memory utilization and add or increase sleep times. You may also want to set the option `discardResponseBodies` to `true`, to lower memory pressure.

Aborted (script error)
: A test that was aborted due to an error in your script.
: For example, if you were to capture data from the response body of a request that you reuse in a future request. If the first request were to fail, your future request would contain a null value. Sudden script errors can suggest a performance issue. Fix the performance issue or add error handling to account for these cases.

Aborted (by threshold)
: A test that exceeded your defined threshold value and that threshold was given the option to automatically abort the test.

Aborted (by limit)
: A test that has exceeded one or more of the following limits:

</DescriptionList>

  - The test contains too many groups (>40)
  - The test reports too many metrics (>10,000)
  - The duration is longer than 60 minutes (for tests longer than 60 minutes, please contact us)
  - The max VUs is higher than 20,000 VUs (for tests higher than 20k, please contact us)

If your test has too many groups, reduce their number.
If your test has too many metrics, use URL grouping to combine similar URLs.
You should also remove external requests from your test script.
Each captured URL will account for multiple individual metrics that k6 measures.
External requests can quickly produce a large number of metrics, and granularity in this case won't help you understand performance of the System Under Test.

