---
title: 'Test comparison'
excerpt: 'Use the k6 Cloud Results test comparison feature to compare data across different test runs.'
---

<Blockquote mod="warning">

#### Test comparison is to compare only runs from the same test script

When using test comparison, you may only compare tests from the same series of test runs. You are not able to compare two different test scripts.

</Blockquote>

The test comparison feature built-in to k6 Cloud Results compares the results of two different test runs of the same test script. You can compare high-level metrics, individual checks, and URL endpoints. You may wish to compare against a previous test run to look for a measurable difference in some change you made. Or you may compare against a known baseline.

## Setting a baseline test

Comparing results against a known *baseline* is a core part of the general methodology for [automated performance testing](/testing-guides/automated-performance-testing).
Baseline tests are important for comparing against a control and finding differences.
Baseline tests should produce enough load to contain meaningful data and ideal results. In other words, a heavy [stress test](/test-types/stress-testing) isn't a good baseline. Think much smaller.

To set your baseline, follow these steps:

1. Open the results for the test run you wish to be your baseline.
2. Select the three dots in the top right corner, then **set as Baseline**.

Baseline tests are exempt from data-retention policies.

![k6 Cloud Results: Set a baseline](./images/07-Test-Comparison/set-baseline-test.png)

## Selecting test runs to compare

To compare two test runs, follow these steps:

1. Open up one of the test runs.
2. In the top right, select the **Compare result** dropdown.
3. Select the test run you want to compare the test to.

![k6 Cloud Results: Select test run for comparison](./images/07-Test-Comparison/select-test-comparison.png)

## Test comparison mode

After you select a test, you'll be brought into comparison mode. When you activate this mode, you'll notice that the layout of the Performance Overview section changes quite a bit. 

Controls for changing base and target test runs appear, and the overview chart now renders time series for the two compared test runs. Solid lines represent the base run, and dashed lines represent the compared target.

You will also notice a chart legend. This legend is interactive. You can use it to toggle visibility for each time series, reducing noise in your test-result analysis.

![k6 Cloud Results: Performance overview comparison](./images/07-Test-Comparison/comparison-mode.png)

## Scenario comparison

If the test script configures multiple scenarios, k6 presents a performance overview for each scenario. If the test script uses multiple protocols, k6 categorizes the overview data by protocol.

![k6 Cloud Results: Performance overview comparison](./images/07-Test-Comparison/scenario-comparison.png)

## Thresholds tab test comparison

In the **Thresholds** tab, additional data is added to the table for the base and target test run. These columns show the current vs. compared test run's Threshold `value` for each Threshold and the `pass/fail` status. Select any threshold to display a separate threshold chart for each test run.

![k6 Cloud Results: Thresholds comparison](./images/07-Test-Comparison/thresholds-comparison.png)

## Checks tab test comparison

In the **Checks** tab, additional data is added to the table for the base and target test run. These columns show the difference in `Success Rate`, `Success Count`, and `Fail Count` between the current and compared test runs. Select any check to display separate check charts for each test run.

![k6 Cloud Results: Checks comparison](./images/07-Test-Comparison/checks-comparison.png)

## HTTP tab test comparison

In the **HTTP** tab, additional data is added to the table for the base and target test run. Here you can compare `request count`, `avg, p95 response time` and other data for individual HTTP requests.

Select a row to show two separate charts, one for each test run. You can also change aggregation of the data to add additional metrics, such as timing breakdown for each HTTP request.

![k6 Cloud Results: HTTP comparison](./images/07-Test-Comparison/http-comparison.png)

