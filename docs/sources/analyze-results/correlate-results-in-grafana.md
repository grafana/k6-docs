---
title: 'Correlate results in Grafana'
description: 'Sometimes, you cannot determine what is happening during testing with the test result dashboard. Correlating testing data with server-side data helps to better understand what happens and find root causes.'
weight: 203
---

# Correlate results in Grafana

Grafana Cloud k6 provides preconfigured dashboards and visualizations to analyze the testing results: k6 metrics. By default, these visualizations do not integrate with other dashboards observing your systems or monitoring their metrics.

Sometimes, you cannot determine what's happening during testing with the predefined visualizations. In this case, correlating testing data with server-side data helps to better understand what happens and find root causes.

This topic shows how to use Grafana features to correlate k6 results with other dashboards and observability data.

## Explore

[Grafana Explore](/docs/grafana/latest/explore/) allows to query metrics and shows its results as graph and a table. You can query distinct data types from multiple sources and visualize them together for comparison and correlation.

To access k6 metrics with Explore:

1. Navigate to a test result dashboard.
2. Find a panel to query their metrics.
3. Click the **Kebab menu** (three dots) of the panel.

	![Select Explore metrics](/media/docs/k6/screenshot-grafana-cloud-kebab-menu.png)

4. Click **Explore**.

	The metric or group of metrics are now displayed on Explore.

	![Explore](/media/docs/k6/screenshot-grafana-cloud-explore.png)

## Dashboards

Even if our Result Analysis page is purposely designed for Performance Testing, sometimes, more is needed, and you need to leverage Grafana's dashboarding capabilities. One typical example is requiring a central visualization that mixes black box (k6) and white box data available on Grafana Cloud (e.g., Metrics, Logs, Traces) from the system under test. 

It is also helpful when Explore falls short because you need another panel type or have too much data from different queries.

Panels that use the Grafana Cloud k6 data source can be added manually. But, to ease the process, we have added, on the top right of every chart you see in the app, a "Copy to Clipboard" button that lets you copy the panel and paste it into a new or existing dashboard.

![Dashboard](/media/docs/k6/screenshot-grafana-cloud-dashboard.png)

To learn more about how to create dashboards, check out the [Grafana documentation](https://grafana.com/docs/grafana/latest/dashboards/).

### Variables

When you need to parametrize a dashboard, Variables are key. They act as placeholders for values and can be used in metric queries and panel titles. So when you change the value using the dropdown at the top of the dashboard, your panel's metric queries will change to reflect the new value.

Our data source integrates seamlessly with variables. Using our data source, you can create variables populated by it (e.g., with the project, test, and test run values) and use them later on any panel.

To learn more about how to create variables, check out the [Grafana documentation](https://grafana.com/docs/grafana/latest/variables/).

### Panels

Even if the most common panel type in the app is the Time Series panel, once you create a panel in a dashboard you can change its type. The Grafana Cloud k6 data source supports all the panel types available in Grafana, so you can use them to visualize your data.

To learn more about how to panel types, check out the [Grafana documentation](https://grafana.com/docs/grafana/latest/panels-visualizations/).