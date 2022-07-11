---
title: 'Compare metrics'
excerpt: 'With the Analysis tab, you can compare and correlate data from your k6 test.'
slug: '/cloud/analyzing-results/analysis-tab'
---

In the previous pages, this documentation gave instructions about how to add a certain value from your test results to the **Analysis** tab.

With the **Analysis** tab, you can organize all the interesting data points from your test in a single view.
- The default view shows the VUs, Response time, request rate, and failed requests.
- On top of the default view, you can add data from other tabs.

![Add Metric Modal](./images/06-Analysis-Tab/add-metric-modal.png)

## Guidelines for adding metrics to analysis

Here are some general tips to consider when adding metrics and using this tab:

- Ensure that VUs and Request rates follow the same trend.
- Add and compare interesting requests from the HTTP and Websocket tabs to compare with other metrics.
- Add the load generator CPU and Memory consumption metrics to ensure they are not saturated (metrics are only available for tests run in the cloud).
- Add thresholds that have failed.
- Add checks that have failures.
- Add metrics for endpoints that you have specific SLAs/SLOs on.

This list is just a starting point. In your test analysis, you can identify deeper issues.


## How to use the analysis tab

In the example, we've added some metrics from the previous sections.
The number shows how many metrics have been added.

Other things you can do on this tab:

- Inspect data points by hovering over them on the chart.
- Add a chart to the main chart by selecting the **+** in the top-right corner of the chart.
- Change how the page aggregates these metrics.
- Filter by tags.
- Add additional metrics to the small chart area by selecting **ADD NEW METRIC** in the small chart area.

![Analysis Tab](./images/06-Analysis-Tab/analysis-tab.png)

