---
title: "Threshold Tab"
excerpt: "The Threshold Tab allows you to visually inspect the performance of your Thresholds during a k6 test. "
---

## Cloud Results: Thresholds

The Threshold Tab allow you to visually inspect and analyze `Thresholds` in your test. The number in the tab represents passing Thresholds / Total Thresholds so you can quickly see if something needs your attention.

Further within this tab, you are able to:

- Easily see failing checks. In the example below, our `check_failure_rate` custom metric is failing. Take notice of the &#10003; or &#10005; on the left side of each row.
- Expand a threshold to view it's graph. In our example below, the expanded threshold is below the threshold of 100 ms
- Add the chart to the `Analysis Tab` for further correlation with other data

![Thresholds Tab](images/03 Threshold Tab/thresholds-tab.png)

Next, [Checks Tab](/cloud/analyzing-results/checks-tab)


## See Also

For more information on defining `Thresholds` in your test, please refer to our documentation on [Thresholds](/using-k6/thresholds)
