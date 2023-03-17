---
title: 'Correlate results in Grafana'
description: 'Sometimes, you cannot determine what is happening during testing with the predefined visualizations. Correlate testing results with the system-under-test data helps to better understand what happens and find root causes'
description: Combine test results in different Grafana dashboards.
weight: 203
aliases:
  - /docs/k6/analyze-results/correlate-results-in-grafana/
---

# Correlate results in Grafana

A unique advantage of combining k6 with Grafana is that you can compare data from both sides of the test―server-side and client-side metrics―in one place. Add test results data to your Grafana dashboards for easy correlation between test results and other system metrics.

Placing your test results alongside other panels can be a powerful tool for test analysis.
For example, you could compare CPU utilization with built-in [k6 HTTP metrics](https://k6.io/docs/using-k6/metrics) such as:

- `http_reqs`, to measure traffic arrival in requests
- `http_req_duration`, to measure latency in request duration
- `http_req_failed`, to measure availability in terms of successful requests.

Thus, with only four measurements, you could graphically explore the relationships between something like the [four golden signals](https://sre.google/sre-book/monitoring-distributed-systems/#xref_monitoring_golden-signals).

## Explore

Use [Grafana Explore](/docs/grafana/latest/explore/) to query metrics and show test results as graph and a table. You can query distinct data types from multiple sources and visualize them together for comparison and correlation.

To work directly with the k6 queries of a panel on Explore:

1. Navigate to a test result view.
2. Find a panel to query their metrics.
3. Click the **Kebab menu** (three dots).

	![Select Explore metrics](/media/docs/k6/screenshot-grafana-cloud-kebab-menu.png)

4. Click **Explore**.

	Explore displays the metric or group of metrics.

	![Explore](/media/docs/k6/screenshot-grafana-cloud-explore.png)


## Add a panel for the k6 data source

To add k6 metrics as a panel, follow these steps:

1. Open the dashboard that you want to add the panel to.
1. Select the **Add panel** icon.
1. For **Data source**, choose `k6`.
1. Filter for your **Test**, **Test run**, **Project**, and **Query type**.
1. **Save**.

## Copy a k6 panel to a dashboard

Add a k6 panel to a [dashboard](/docs/grafana/latest/dashboards/) when you want to visualize k6 results with other existing visualizations, such as observability data of the system under test. 

1. Find the k6 panel.
2. Click the **Kebab menu** (three dots).
3. Click **Copy to Clipboard**.
4. Navigate to the dashboard that you want to add the panel.
5. Click the **Add Panel** icon.
   
	The Add panel dialog opens.

	{{< figure src="/media/docs/k6/screenshot-grafana-cloud-add-panel.png" class="docs-image--no-shadow" max-width= "900px" caption="Screenshot of the add panel dialog" >}}

6. Click **Paste panel from clipboard**.

Once added the k6 panel to a dashboard, you can edit the panel options. 

### Change the panel visualization


To change the panel visualization:

1. Click on the panel title

	{{< figure src="/media/docs/k6/screenshot-grafana-cloud-edit-panel.png" class="docs-image--no-shadow" max-width= "900px" caption="Screenshot of the panel menu" >}}

2. Click **Edit**
   
3. Click the right sidebar to change the visualization
   
	You can see a list of visualizations to select.

	{{< figure src="/media/docs/k6/screenshot-grafana-cloud-edit-panel-view.png" class="docs-image--no-shadow" max-width= "900px" caption="Screenshot of the edit panel" >}}

The majority of the k6 panels are `Time series` visualizations.
For details, refer to [query types]({{< relref "../reference/query-types" >}}.
