---
title: 'Inspect checks'
excerpt: 'The Checks tab visualizes the performance of your checks in your k6 test'
weight: 201
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

To visually inspect and analyze checks, use the **Checks** tab

First, in the tab itself, note the number of checks that passed against the total number of checks.
This provides a quick, top-level overview of the check performance.

![Checks Tab](/media/docs/k6/checks-tab.png)

To find `Checks` that have failures, search for a check, or sort columns.
  - Note the <span style="color:RGB(209, 122, 14)">red</span> or <span style="color:RGB(26, 127, 75)">green</span> on the left side of each row.
  - In the preceding image, the Check `HTTP status is 200` succeeded only 84.57% of the time: 137 successful runs and 25 failures.

To inspect a check in detail:
1. Select the check row.
1. In the expanded check, note how many failures occur at different points in the test.
