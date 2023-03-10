---
title: 'Correlate results in Grafana'
description: 'Sometimes, you cannot determine what is happening during testing with the predefined visualizations. Correlate testing results with the system-under-test data helps to better understand what happens and find root causes'
weight: 203
---

# Correlate results in Grafana

Sometimes, you cannot determine what’s happening during testing with the predefined visualizations. In this case, correlating testing results with the system-under-test data helps to better understand what happens and find root causes.

This topic shows how to use Grafana to correlate k6 results with other dashboards and observability data.

## Explore

[Grafana Explore](/docs/grafana/latest/explore/) allows to query metrics and shows its results as graph and a table. You can query distinct data types from multiple sources and visualize them together for comparison and correlation.

To work directly with the k6 queries of a panel on Explore:

1. Navigate to a test result view.
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