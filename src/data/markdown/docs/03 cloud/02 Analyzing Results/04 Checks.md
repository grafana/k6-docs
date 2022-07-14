---
title: 'Inspect checks'
excerpt: 'The Checks tab visualizes the performance of your checks in your k6 test'
slug: '/cloud/analyzing-results/checks'
---

*Checks* validate response values.
For example, you can use checks to validate that your POST request is returning `201` status codes.

## Validate response content

Inspecting checks is a valuable practice at both the beginning and the end of the test.
- If your checks fail at the beginning, there's a good chance the test is sending improper requests.
  For example, `4xx` responses to POST requests may indicate that the authentication is malformed.
- If your checks fail at the end of the test, your system is likely degrading under the test load.

If the number of check failures increases as the test runs, you can use the **Checks** tab to view the check metrics in a time series.


## Explore checks in cloud results

To visually insepct and analyze checks, use the **Threshold** tab

First, in the tab itself, note the number of checks that passed against the total number of checks.
This provides a quick, top-level overview of the check performance.

![Checks Tab](./images/04-Checks-Tab/checks-tab.png)

From there, you can explore the individual checks.
In the **Checks** tab, you can investigate in the following ways:

To Find `Checks` that have failures, use the search bar or sort columns.
  - Note the &#10003; or &#10005; on the left side of each row.
  - In the preceding image, the Check `HTTP status is 200` succeeded only 84.57% of the time: 137 successful runs and 25 failures.

To **view a time-series graph*** for a check, select the row.

With the graph, you can see how many failures occur at different points in the test.
If the time series has useful data, add it to the **Analysis** tab.

## Compare check metrics with other time series

To compare the check data with other data about the test:
1. Select a check.
1. Select **Add to Analysis**.
1. Then use the **Analysis** tab to find correlations between checks data and other values from the test.
  

## Read more

[Checks in your test scripts](/using-k6/checks).

