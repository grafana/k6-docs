---
title: 'Grafana App'
excerpt: 'Use k6 Cloud in Grafana'
---

<Blockquote mod="attention" title="">

This plugin is no longer maintained, and will be replaced by a new one soon. Stay tuned.

</Blockquote>


The **k6 Cloud app** for [Grafana](https://grafana.com/) simulates the k6 Cloud UI in your dashboard. While the Grafana App does not yet support all the features of k6 Cloud we are actively working on reaching feature parity.

Currently supported features:
* manage and visualize your k6 Cloud tests in Grafana.
* add k6 visualizations to your existing Grafana dashboards.
* correlate k6 metrics with other metrics to find root causes quickly.
* create new and update existing tests using the script editor
* use dashboard variables to quickly switch between test runs

## Installing the Grafana App

<Blockquote mod="attention" title="">

This plugin can no longer be installed but will continue to work for Grafana instances where it has already been installed. 

</Blockquote>

## Navigate cloud tests across various projects

The k6 Cloud app for Grafana, like the k6 Cloud web app, provides a dashboard including all your tests for a particular project.
This view will be familiar for k6 Cloud users.
Here, you can select any project and navigate to any test or test runs.

![k6 project overview](./images/06-Grafana-Plugin/k6_cloud_grafana_project_overview.png)

## Enhanced visualizations of k6 results

The k6 results view mirrors its counterpart on the k6 Cloud.
In this first version, you'll find an overview of important performance testing metrics and the results of the most relevant k6 reports, such as [HTTP requests](https://k6.io/docs/using-k6/http-requests/), [thresholds](https://k6.io/docs/using-k6/thresholds/), and [checks](https://k6.io/docs/using-k6/checks/).

![k6 test results](./images/06-Grafana-Plugin/k6_cloud_grafana_test_result.png)

The k6 Cloud app for Grafana is still in beta.
The k6 Cloud currently supports more features than the Grafana app.

If you want to visualize your test results on the k6 Cloud, select **Open in k6 Cloud** to jump quickly to the same page on the k6 Cloud and explore from there.

![k6 cloud test result visualization](./images/06-Grafana-Plugin/k6_cloud_testresult_visualization.png)

## Correlate testing results with other metrics

You can copy relevant metrics from your test result to a Grafana dashboard.
In this dashboard, you can visualize k6 metrics with other metrics of your application or systems and bring QA data to any of your existing dashboards.
To copy a metric:

1. Next to a chart on the test results view, select  **Copy to clipboard**.
1. Head to a dashboard, and paste same time-series panel in.

![k6 grafana dashboard](./images/06-Grafana-Plugin/k6_cloud_grafana_dashboard.png)

## Add dashboard variables to switch between test runs

Dashboard variables are useful when you need to switch between test runs often, without editing panel's query. You can select test run using the dropdown at the top of the dashboard, all your panels which use the variables will update automatically.

To setup open dashboard settings -> variables

1. Add organization variable
![k6 grafana add org](./images/06-Grafana-Plugin/k6_cloud_grafana_add_org.png)

2. Add project variable
![k6 grafana add project](./images/06-Grafana-Plugin/k6_cloud_grafana_add_project.png)

3. Add test variable
![k6 grafana add test](./images/06-Grafana-Plugin/k6_cloud_grafana_add_test.png)

4. Add testrun variable
![k6 grafana add testrun](./images/06-Grafana-Plugin/k6_cloud_grafana_add_testrun.png)

5. Update panel to use variables
![k6 grafana use variables in panel](./images/06-Grafana-Plugin/k6_cloud_grafana_use_vars_in_panel.png)
