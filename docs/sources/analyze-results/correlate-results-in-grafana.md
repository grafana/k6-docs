---
title: 'Correlate results in Grafana'
description: 'Sometimes, you cannot determine what is happening during testing with the test result dashboard. Correlating testing data with server-side data helps to better understand what happens and find root causes.'
weight: 203
---

# Correlate results in Grafana

Grafana Cloud k6 provides preconfigured dashboards and visualizations to analyze the testing results: k6 metrics. By default, these visualizations do not integrate with other dashboards observing your systems or monitoring their metrics.

Sometimes, you cannot determine what’s happening during testing with the predefined visualizations. In this case, correlating testing results with the data of the system under test helps to better understand what happens and find root causes.

This topic shows how to use Grafana features to correlate k6 results with other dashboards and observability data.

## Explore

[Grafana Explore](/docs/grafana/latest/explore/) allows to query metrics and shows its results as graph and a table. You can query distinct data types from multiple sources and visualize them together for comparison and correlation.

To access k6 metrics with Explore:

1. Navigate to a test result dashboard.
2. Find a panel to query their metrics.
3. Click the **Kebab menu** (three dots).

	![Select Explore metrics](/media/docs/k6/screenshot-grafana-cloud-kebab-menu.png)

4. Click **Explore**.

	Explore displays the metric or group of metrics.

	![Explore](/media/docs/k6/screenshot-grafana-cloud-explore.png)

## Add a k6 panel to a dashboard

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


The majority of the k6 panels are `Time series` visualizations. To change the panel visualization:

1. Click on the panel title

	{{< figure src="/media/docs/k6/screenshot-grafana-cloud-edit-panel.png" class="docs-image--no-shadow" max-width= "900px" caption="Screenshot of the panel menu" >}}

2. Click **Edit**
   
3. Click the right sidebar to change the visualization
   
	You can see a list of visualizations to select.

	{{< figure src="/media/docs/k6/screenshot-grafana-cloud-edit-panel-view.png" class="docs-image--no-shadow" max-width= "900px" caption="Screenshot of the edit panel" >}}

### Add a k6 variable

[Variables](/docs/grafana/latest/dashboards/variables/) allow you to have dynamic dashboards. You can use variables in panels to change the panel's data when the variable value changes.

Grafana Cloud k6 provides the following variables:
- `Project`
- `Test`
- `Test run`

For example, you can set the `Test run` variable in a k6 panel that visualizes latency. If you change the `Test run` value, it displays the latency of the new `Test run`.

To add a k6 variable to a panel:

1. Navigate to the dashboard you want to make a variable for and click the **Dashboard settings** (gear) icon at the top of the page. 
2. On the Variables tab, click **Add variable**.
3. Enter a Name for the variable.
4. In the Type list, select Query.
5. On the Datasource list, select `Grafana Cloud k6`. 
6. On Query, select the k6 variable you want.
   
	The `Test` variable depends on a `Project`.

	The `Test run` variable depends on a `Test` from a specific `Project`.
7. Click **Apply** to add the variable to the dashboard.
		{{< figure src="/media/docs/k6/screenshot-grafana-cloud-dashboard-with-variable.png" class="docs-image--no-shadow" max-width= "900px" caption="Screenshot of the dashboard with the new variable" >}}