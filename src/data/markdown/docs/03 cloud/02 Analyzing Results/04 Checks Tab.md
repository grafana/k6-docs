---
title: 'Checks Tab'
excerpt: 'The Checks tab allow you to visualize performance of your checks in your k6 test'
---

## Cloud Results: Checks

The Checks Tab allow you to visually inspect and analyze `Checks` in your test. The number in the tab represents passing Checks / total Checks so you can quickly see if something needs your attention.

As you further examine this tab, you are able to:

- Easily see `checks` that have failures. Take notice of the &#10003; or &#10005; on the left side of each row.
  - In the example below, the `Check` "is welcome header present" is succeeding only 32.7% of the time
- Expand a `Check` to view it's graph. We can see how many failures occur at different points in the test.
- Add the chart to the `Analysis Tab` for further correlation with other data

![Checks Tab](/images/04-Checks-Tab/checks-tab.png)

Next, [HTTP Tab](/cloud/analyzing-results/http-tab)

## See Also

For more information on using `Checks` in your test, please refer to our documentation on [Checks](/using-k6/checks)
