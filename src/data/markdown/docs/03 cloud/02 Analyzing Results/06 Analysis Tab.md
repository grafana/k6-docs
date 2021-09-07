---
title: 'Analysis Tab'
excerpt: 'The Analysis tab allows you to compare and correlate data from your k6 test.'
---

## Cloud Results: Analysis Tab

The Analysis Tab allows you to gather all interesting data points from your test to compare and correlate. Any metrics that you select to `ADD CHART TO ANALYSIS` will show up here. In our example below, we've added some metrics from the previous three articles in this section. The number in the tab will show how many metrics have been added, for quick reference.

By default the comparison chart will contain VUs, Response time, Request rate and Failed requests metrics. The `ADD NEW METRIC` button, located in the top right corner, will open a modal which will let you add more metrics:

![Add Metric Modal](./images/06-Analysis-Tab/add-metric-modal.png)

Other things you can do on this tab:

- When viewing the chart, hovering over any single point will show you data from that point in the test
- View metrics you added from previous tabs, those will show up below the main chart
  - You may also change aggregation of these metrics in this tab or filter on tags
- Add small charts to the larger chart by clicking on the "+" in the top right corner of the small charts
- Add additional metrics to the small chart area by clicking `ADD NEW METRIC` in the small chart area

![Analysis Tab](./images/06-Analysis-Tab/analysis-tab.png)
