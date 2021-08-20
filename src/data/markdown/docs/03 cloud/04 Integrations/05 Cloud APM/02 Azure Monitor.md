---
title: 'Azure Monitor'
excerpt: 'How to export metrics from k6 Cloud to Azure Monitor'
---

## Configuration Parameters

The configuration parameters for sending metrics to Azure Monitor are as follows:

| Name                    | Description                                                                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`              | Any APM provider name available in the [supported APM provider](/cloud/integrations/cloud-apm#supported-apm-providers)'s table.                                                            |
| `tenantId`              | The `tenantId` provided by service principal. The directory (tenant) ID can be extracted from Azure's app registrations.                                                                   |
| `clientId`              | The `clientId` provided by service principal. The application (client) ID can be extracted from Azure's app registrations.                                                                 |
| `clientSecret`          | The `clientSecret` provided by service principal. The client secret can be extracted from the certificates & secrets section of Azure's app registrations.                                 |
| `azureRegion`           | The `azureRegion` you've created your Azure configurations. The [supported regions](#supported-regions) listed below can be used in Cloud APM. Default is `eastus`.                        |
| `subscriptionId`        | The `subscriptionId` can be viewed in the subscriptions section of Azure portal.                                                                                                           |
| `resourceGroupName`     | The `resourceGroupName` can be viewed in the resource groups section of Azure portal. It should match the `subscriptionId`.                                                                |
| `insightsAppName`       | The `insightsAppName` can be viewed in the application insights section of Azure portal. It should match the `resourceGroupName`.                                                          |
| `metrics`               | List of built-in and custom metrics to be exported.                                                                                                                                        |
| `includeDefaultMetrics` | If set, the export will include the default metrics. Default is `true`.                                                                                                                    |
| `resampleRate`          | The rate by which the metrics are resampled and sent to the APM provider in seconds. Default is 60 and constant, because Azure Monitor re-aggregates all metrics to 60 seconds by default. |
| `includeTestRunId`      | If set, the `test_run_id` will be exported per each metric as an extra tag. Default is `false`.                                                                                            |

<Blockquote mod="warning">

As of Jan. 2021, all keys on the configuration parameters object are in camel case. So, please update your test run script(s).

</Blockquote>

## Example Configuration Object

All the above configuration parameters are passed like this in your test run.

```javascript
export let options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: "azuremonitor",
          tenantId: "<Directory (tenant) ID>",
          clientId: "<Application (client) ID>",
          clientSecret: "<Client secret>",
          azureRegion: "<Region>",
          subscriptionId: "<Subscription ID>",
          resourceGroupName: "<Resource Group Name>",
          insightsAppName: "<Application Insights Name>",
          metrics: ["http_req_sending", "my_rate", "my_gauge", ...],
          includeDefaultMetrics: true,
          includeTestRunId: false
        },
      ]
    },
  },
};
```

## Supported Regions

These are the supported regions for Azure Monitor integration:

| Geographic Region    | Supported Azure Region(s)                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **US and Canada**    | `westcentralus`<br/>`westus2`<br/>`northcentralus`<br/>`southcentralus`<br/>`centralus`<br/>`canadacentral`<br/>`eastus` (default)<br/>`eastus2` |
| **Europe**           | `northeurope`<br/>`westeurope`<br/>`uksouth`<br/>`francecentral`                                                                                 |
| **Africa**           | `southafricanorth`                                                                                                                               |
| **Asia & Australia** | `centralindia`<br/>`australiaeast`<br/>`japaneast`<br/>`southeastasia`<br/>`eastasia`<br/>`koreacentral`                                         |

## Azure Monitor Setup

For sending custom metrics from your test run to Azure Monitor, follow these instructions:

1. Make sure you have an active subscription on Azure. Take note of your subscription ID for the configuration object.

    ![Azure subscriptions](images/azure-subscriptions.png)
2. Create a resource group under your active subscription.

    ![Azure resource groups](images/azure-resource-groups.png)
3. Create a service principal by adding a new app to Azure app registrations.

    ![Azure app registrations](images/azure-app-registrations.png)
4. Create a client secret in your service principal.

    ![Client secrets](images/client-secrets.png)
5. Go to your resource group and assign "Monitoring Metrics Publisher" role to the user and the service principal.

    ![Resource group's access controls](images/rg-access-controls.png)
6. Create a log analytics workspace. The region is chosen here, so make note of it.

    ![Log analytics workspace](images/azure-log-analytics-workspace.png)
7. Create an app under application insights with your log analytics workspace. The region should match the log analytics workspace.

    ![Application insights](images/azure-application-insights.png)
8. Start your test run with the parameters you've extracted from the steps 1-6.
9. Your metrics will be exported to Azure Monitor with a 3~4 minutes delay. You can view them on metrics section of the Azure Monitor. Just choose application insights name as scope, k6 as metrics namespace and your metrics (and their associated aggregation methods) will be shown in metric dropdown. If you didn't see the results, try to narrow down the time range to last 30 minutes or less.

    ![Azure Monitor metrics](images/azure-monitor.png)
