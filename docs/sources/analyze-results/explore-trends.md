---
title: Explore test trends
description: 'The following information will help you to start with Grafana Cloud k6'
weight: 202
---

## Explore test trends

To compare runs for a test across time, use the performance-trending chart. The chart displays test-run metrics, using colors to signal the status of a specific run.

To view the performance-trending chart for multiple tests that belong to the same project, open the **Project** page:

![Project View!](https://grafana.com/media/docs/k6/custom-trend-metrics-project-view.png "Project View")

Additionally, to view the performance-trending chart for an individual test, open the test's page:

![Test View!](https://grafana.com/media/docs/k6/custom-trend-metrics-test-view-2.png "Test View")

This last chart shows more data points over time. For more information about an individual run, hover over any bar in the chart.

By default, the data displayed in the performance-trending chart is the `p95` of the HTTP response time (`http_req_time`).

The chart displays a summary *trending metric*, an aggregated value for all metric data points in the test run. k6 produces a single value for each test run using the trending metric, and then plots each value the chart. You can customize the trending metric on a per-test basis.

### Customize the trending metric
To customize the trending metric used for a test:

1. Navigate to the Project page.
2. Select the three dots in the top-right corner of the test's performance-trending chart.
3. Select **Customize trend**.

 ![Customize trends menu!](https://grafana.com/media/docs/k6/custom-trend-metrics-menu.png "Customize trends menu")

This brings up a window from which you can:

- Select the metric to use in the performance-trending chart. Note that both standard (created by all k6 test runs) and custom (user-defined) metrics are listed.
- Select aggregation function to apply to the metric. In this case, "Avg" (Average) is selected.
- Select or add one or more sets of tags & tag values. In this case, we are selecting values only from instances in the amazon:se:stockholm load zone.

![Customize trends modal!](https://grafana.com/media/docs/k6/custom-trend-metrics-modal.png "Customize trends modal")

After you select the desired parameters, **Save** to apply the changes. Note that the **Save** button will be enabled only after changes are made to the configuration.

To reset the configuration, use the default trending metric with **Reset to default trending metric** button in the bottom left corner.

k6 calculates the required values, then plots them in the performance-trending chart.

