---
title: 'Correlate results in Grafana'
excerpt: ''
weight: 203
---

# Correlate results in Grafana

Sometimes, our result analysis view is not enough to determine what's going on with your tests. Grafana Cloud k6 integrates deeply with Grafana, so you can leverage all its powers when needed. A vital piece of this integration is the data source we provide, which can be used to query de data directly from Explore or your dashboards. 

## Explore

When you want to dive deeper into a chart we display in the app, compare it with data from other data sources, or play with our query editor, Explore is here to help. 

Every chart in the app has a button in the top right corner to open Explore and showcase the same chart you saw. Once there, you can add new queries from the Grafana Cloud k6 or any other data source. In Explore, our data source shows the results as a graph and a Table, allowing you to see trends in the data and more details simultaneously.

![Explore](/media/docs/k6/screenshot-grafana-cloud-dashboard.png)

To learn more about how to use Explore, check out the [Grafana documentation](https://grafana.com/docs/grafana/latest/explore/).

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