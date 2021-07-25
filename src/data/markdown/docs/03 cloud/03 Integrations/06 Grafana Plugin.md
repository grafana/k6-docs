---
title: 'Grafana Plugin'
excerpt: 'View your k6 Cloud Test Results in Grafana'
---

The [k6 Cloud Grafana Data Source Plugin](https://grafana.com/grafana/plugins/grafana-k6cloud-datasource/) allows you to view your **test results stored in k6 Cloud** in [Grafana](https://grafana.com/grafana/). 

![k6 Cloud Grafana Data Source Plugin](./images/06-Grafana-Plugin/k6_cloud_grafana_plugin_dashboard.png)

## Installing on Grafana Cloud

If you do not have a [Grafana Cloud](https://grafana.com/cloud) account, you can sign up for free [here](https://grafana.com/cloud/grafana).

Click on the `Install plugin` button on the [k6 Cloud Data Source page on Grafana.com](https://grafana.com/plugins/grafana-k6cloud-datasource/?tab=installation). 

![Install k6 Cloud Grafana Plugin](./images/06-Grafana-Plugin/k6_cloud_grafana_plugin_install.png)

## Installing on a local Grafana instance 

The plugin is installed using the Grafana CLI and instructions can be found on the [installation page](https://grafana.com/plugins/grafana-k6cloud-datasource/?tab=installation). 

```bash
grafana-cli plugins install grafana-k6cloud-datasource
```

Restart your Grafana server after installing the plugin.

## Configure the data source 

To access your k6 Cloud test results, you need to configure your [k6 Cloud Token](/cloud/integrations/token) on the Grafana data source. 

Access the `Data sources` page and select the k6 Cloud data source - available with the search box.

Copy your [k6 Cloud Token](/cloud/integrations/token) and paste it into the API Token field. Click the `Save & Test` button to check that your Token is valid and that the data source can connect to the K6 Cloud.

![Configure k6 Cloud Grafana Data Source Plugin](./images/06-Grafana-Plugin/k6_cloud_grafana_plugin_data_source_view.png)

## Import the k6 Cloud dashboards 

The k6 Cloud data source includes two dashboards that can be imported from the Dashboards tab.

![k6 Cloud Grafana Data Source Dashboards](./images/06-Grafana-Plugin/k6_cloud_grafana_import_dashboard.png)

## Visualize the k6 Cloud test results 

After importing the k6 dashboard, select a k6 dashboard to find a test across all your k6 projects and visualize the test results in Grafana.

![k6 Cloud Test Listing Dashboard](./images/06-Grafana-Plugin/k6_cloud_grafana_list_dashboard.png)

![k6 Cloud Test Result Dashboard](./images/06-Grafana-Plugin/k6_cloud_grafana_plugin_dashboard.png)

