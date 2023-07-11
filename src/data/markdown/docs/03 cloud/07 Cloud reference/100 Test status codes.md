---
title: 'Test status codes'
excerpt: 'A list of test statuses returned by k6 Cloud, with context and descriptions.'
canonicalUrl: https://grafana.com/docs/grafana-cloud/k6/reference/cloud-test-status-codes/
---

The following is a list of test statuses of k6 Cloud test runs, along with their code representation as returned by the Cloud API.
Note that these codes differ from the exit codes returned by the k6 process on the command line.

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
: A test that has been created but not validated yet.

Validated
: A test that has finished initial validation, but hasn't been queued to run yet.

Queued
: A test that has entered the queue. Once a test worker picks it up, it begins initializing.

Initializing
: A test that has been assigned to Load Generators, but hasn't started to make HTTP requests yet.

Running
: A test that is actively making HTTP or websocket requests

Finished
: A test that has finished running with no failed thresholds.

</DescriptionList>

## Failed and aborted tests

These statuses happen when the test doesn't successfully finish for whatever reason.

<DescriptionList>

Timed Out
: A test that hasn't received or sent any information for a long time

Aborted (by user)
: A test that was aborted by the user. Tests aborted by user **count against your total usage**.

Aborted (by system)
: A test that was aborted by the system.
: These tests typically abort due to a fatal error. If the test fails before launch, the Load Zone may have an underlying issue that is unrelated to k6. If the test aborts during execution, Load Generators might have been overutilized. In this case, look at the CPU and Memory utilization and add or increase sleep times. You also might set the option `discardResponseBodies` to `true` to lower memory pressure.

Aborted (script error)
: A test that was aborted due to an error in your script.
: For example, if you were to capture data from the response body of a request that you reuse in a future request. If the first request were to fail, your future request would contain a null value. Sudden script errors can suggest a performance issue. Fix the performance issue or add error handling to account for these cases.

Aborted (by threshold)
: A test that exceeded your defined threshold value and that threshold was given the option to automatically abort the test.

Aborted (by limit)
: A test that has exceeded limits, for one or more of the following reasons:

</DescriptionList>

  - Too many groups (>40)
  - Too many metrics (>10,000)
  - A duration longer than 60 minutes (for tests longer than 60 minutes, contact us)
  - Max VUs exceeds 20,000 VUs (for tests higher than 20k, contact us)

If your test has too many groups, reduce their number.
If it has too many metrics, use URL grouping to combine similar URLs.

You should also remove external requests from your test script.
Each captured URL accounts for multiple individual metrics that k6 measures.
External requests can quickly produce a large number of metrics, and granularity of this type won't help you understand the performance of the System Under Test.

