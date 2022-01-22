---
title: 'Test comparison'
excerpt: 'Use the k6 Cloud Results test comparison feature to compare data across different test runs.'
---

<Blockquote mod="warning">

#### Test comparison is for comparing runs of the same test script

When using test comparison, you may only compare tests from the same series of test runs. You are not able to compare two different test scripts.

</Blockquote>

The test comparison feature built-in to k6 Cloud Results allows you to compare the results of two different test runs of the same test script. You can compare high-level metrics, individual checks and URL endpoints. You may wish to compare against a previous test run to look for a measurable difference in some change you made. Or you may be comparing against a known baseline.

## Setting a baseline test

Comparing results against a known **baseline** is a core part of the general methodology for [automated performance testing](/testing-guides/automated-performance-testing). Baseline tests are important as they allow you to compare against a control to look for differences. Baseline tests should produce enough load to contain meaningful data and ideal results. In other words, a heavy [stress test](/test-types/stress-testing) isn't a good baseline. Think much smaller.

In order to set your baseline, open up the results for the test run you wish to be your baseline. Select the three dots in the top right corner -> set as Baseline test run. Baseline tests are exempt from data retention policies.

![k6 Cloud Results: Set a baseline](./images/07-Test-Comparison/set-baseline-test.png)

## Selecting test runs to compare

To compare two test runs, open up one of the test runs. Then select the test run you want to compare it to using the select drop down on the right side of the test result page, just above the Performance Overview section.

![k6 Cloud Results: Select test run for comparison](./images/07-Test-Comparison/select-test-comparison.png)

## Test comparison mode

After you select a test you will be brought into comparison mode. When activating this mode you will notice that the layout of the Performance Overview section changed quite a bit. Controls for changing base and target test run has appeared, the overview chart now renders time series for the two compared test runs. Solid lines represent the base run and dashed lines represent the compare target. You will also notice that a chart legend appeared, this legend is interactive and allows one to toggle visibility for each individual time series, this can be helpful to reduce noise when analyzing the result.

![k6 Cloud Results: Performance overview comparison](./images/07-Test-Comparison/comparison-mode.png)

## Scenario comparison

If there were multiple scenarios configured in the test script, a performance overview for each individual scenario will be presented. If there are multiple different protocols used in the test script the overview data will be categorized by protocol to make comparison easier.

![k6 Cloud Results: Performance overview comparison](./images/07-Test-Comparison/scenario-comparison.png)

## Thresholds tab test comparison

In the Thresholds tab, additional data is added to the table for the base and target test run. These columns will show the current vs compared test run's Threshold `value` for each Threshold and the `pass/fail` status. Clicking on any threshold will display a separate threshold chart for each test run.

![k6 Cloud Results: Thresholds comparison](./images/07-Test-Comparison/thresholds-comparison.png)

## Checks tab test comparison

In the Checks tab, additional data is added to the table for the base and target test run. These columns will show the difference in `Success Rate`, `Success Count` and `Fail Count` between the current and compared test runs. Clicking on any check will display separate checks charts for each test run.

![k6 Cloud Results: Checks comparison](./images/07-Test-Comparison/checks-comparison.png)

## HTTP tab test comparison

In the HTTP tab, additional data is added to the table for the base and target test run. Here you can compare `request count`, `avg, p95 response time` and other data for individual HTTP requests.

Clicking on a row will also show two separate charts, one for each test run. You can also change aggregation of the data to add additional metrics, such as timing breakdown for each HTTP request.

![k6 Cloud Results: HTTP comparison](./images/07-Test-Comparison/http-comparison.png)

