---
title: 'Threshold Tab'
excerpt: 'The Threshold Tab allows you to visually inspect the performance of your Thresholds during a k6 test. '
---

## Cloud Results: Thresholds

In the **Threshold** tab, you can visually inspect and analyze `Thresholds` in your test. The number in the tab represents passing Thresholds / Total Thresholds so you can quickly see if something needs your attention.

You can use this tab to do the following:

- Find failing thresholds. In this example, we've filtered the list of thresholds to show only thresholds with names that include either "http" or "vus". Out of the thresholds that satisfies the filter criteria we can see that two are failing, `vus: value>100` and `http_reqs:count>10000`. Note the &#10003; or &#10005; on the left side of each row.
- Expand a threshold to view its graph. In our example below, the expanded thresholds calculated value is below the threshold of 100 ms.
- Add the chart to the `Analysis Tab` for further correlation with other data

![Thresholds Tab](./images/03-Threshold-Tab/thresholds-tab.png)

## See Also

For more information on defining `Thresholds` in your test, please refer to our documentation on [Thresholds](/using-k6/thresholds).
