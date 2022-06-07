---
title: 'Checks Tab'
excerpt: 'The Checks tab visualizes performance of your checks in your k6 test'
---

## Cloud Results: Checks

With the **Checks** tab, you can visually inspect and analyze Checks in your test.
The number in the tab represents passing Checks / total Checks, so you can quickly see if there's something that demands your attention.

You can use this tab to do the following:

- Find `Checks` that have failures. Take notice of the &#10003; or &#10005; on the left side of each row
  - In the example below, the `Check` "HTTP status is 200" is succeeding only 84.57% of the time with 137 successful runs and 25 failures.
- Expand a `Check` to view its graph. We can see how many failures occur at different points in the test
- Add the chart to the `Analysis Tab` for further correlation with other data.

![Checks Tab](./images/04-Checks-Tab/checks-tab.png)

## See Also

For more information on using `Checks` in your test, please refer to our documentation on [Checks](/using-k6/checks).
