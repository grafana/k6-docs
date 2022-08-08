---
title: 'Azure Monitor'
excerpt: 'How to export metrics from k6 Cloud to Azure Monitor'
---

You can export test result metrics from the k6 Cloud to [Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/),
and use Azure Monitor to store and analyze all your data from your Azure and other environments.

> ⭐️  &nbsp;[Cloud APM](/cloud/integrations/cloud-apm/) integrations are available on Pro and Enterprise plans, as well as the annual Team plan and Trial.

## Export k6 metrics to Azure monitor

You must enable the Azure Monitor integration for each test whose metrics you want to export.
k6 will export the metrics as the test runs.

Currently, there are two options to set up the Cloud APM settings in the test:

- [Using the test builder](#configuration-using-the-test-builder)
- [Scripting the k6 test](#configuration-in-the-k6-script)

In both cases, you'll need to paste in some values from Azure.
Instructions about where to find these values in the Azure UI are in a subsequent section.

### Configure Azure export with the Test Builder

First, configure the Azure Monitor settings for an organization.

1. From the Main navigation, go to **Manage > Cloud APM** and select **Azure Monitor**.

  ![Cloud APM - Azure Monitor Form UI](images/azure-monitor-cloud-app-form.png)

1. In this form, copy over the parameters from Azure.

  For more information on the other input fields, refer to the [configuration parameters](#configuration-parameters).

1. Save the Azure Monitor configuration for the current organization.

  Note that configuring the Azure Monitor settings for an organization does not enable the integration.
  You must manually enable each test using the [test builder](/test-authoring/test-builder).

1. Create a new test with the test builder, or select an existing test previously created using the test builder.

1. Select the **Cloud APM option** on the test builder sidebar to enable the integration for the test.

  ![Cloud APM - Azure Monitor Test Builder UI](images/azure-monitor-cloud-app-testbuilder.png)


### Configure Azure export in the k6 script

If you script your k6 tests, you can also configure the Cloud APM settings using the `apm` option in the k6 script.

The parameters to export the k6 metrics to Azure Monitor are as follows:

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          provider: 'azuremonitor',

          tenantId: '<Directory (tenant) ID>',
          clientId: '<Application (client) ID>',
          clientSecret: '<Client secret>',
          subscriptionId: '<Subscription ID>',
          resourceGroupName: '<Resource Group Name>',
          insightsAppName: '<Application Insights Name>',
          // optional
          azureRegion: '<Region>',

          // optional
          metrics: ['http_req_sending', 'my_rate', 'my_gauge'], // ...
          includeDefaultMetrics: true,
          includeTestRunId: false,
        },
      ],
    },
  },
};
```

### Configuration Parameters

| Name                                   | Description                                                                                                                                                                                                       |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| provider<sup>(required)</sup>          | For this integration, the value must be `azuremonitor`.                                                                                                                                                           |
| remoteWriteURL<sup>(required)</sup>    | URL of the Prometheus remote write endpoint.  <br/> The `prometheus_server` query param must be included. The license key can optionally be included using the `X-License-Key` query param.                       |
| tenantId<sup>(required)</sup>          | The `tenantId` provided by service principal. The directory (tenant) ID can be extracted from Azure's app registrations.                                                                                          |
| clientId<sup>(required)</sup>          | The `clientId` provided by service principal. The application (client) ID can be extracted from Azure's app registrations.                                                                                        |
| clientSecret<sup>(required)</sup>      | The `clientSecret` provided by service principal. The client secret can be extracted from the certificates & secrets section of Azure's app registrations.                                                        |
| subscriptionId<sup>(required)</sup>    | The `subscriptionId` can be viewed in the subscriptions section of Azure portal.                                                                                                                                  |
| resourceGroupName<sup>(required)</sup> | The `resourceGroupName` can be viewed in the resource groups section of Azure portal. It should match the `subscriptionId`.                                                                                       |
| insightsAppName<sup>(required)</sup>   | The `insightsAppName` can be viewed in the application insights section of Azure portal. It should match the `resourceGroupName`.                                                                                 |
| azureRegion                            | The `azureRegion` you've created your Azure configurations. See the list of [supported regions](#supported-regions). Default is `eastus`.                                                                         |
| includeDefaultMetrics                  | Whether it exports the [default APM metrics](/cloud/integrations/cloud-apm/#default-apm-metrics): `data_sent`, `data_received`, `http_req_duration`, `http_reqs`, `iterations`, and `vus`. Default is `true`.     |
| metrics                                | List of metrics to export. <br/> For more details on how to specify metrics see below.                                                                                                                            |
| includeTestRunId                       | Whether all the exported metrics include a `test_run_id` tag whose value is the k6 Cloud test run id. Default is `false`. <br/> Be aware that enabling this setting might increase the cost of your APM provider. |
| resampleRate                           | Sampling period for metrics in seconds. Default is 60, as Azure Monitor aggregates metrics in 1 period.                                                                                                           |


#### Metric configuration

Each entry in `metrics` parameter can be an object with following keys:

| Name                              | Description                                                                                                                                                                                                                                                                                       |
|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| sourceMetric<sup>(required)</sup> | Name of k6 builtin or custom metric to export, optionally with tag filters. <br/> Tag filtering follows [Prometheus selector syntax](https://prometheus.io/docs/prometheus/latest/querying/basics/#time-series-selectors),<br/> for example: `http_reqs{name="http://example.com",status!="500"}` |
| targetMetric                      | Name of resulting metric in Azure Monitor. If not specified, will use the name `k6.{sourceMetric}`.                                                                                                                                                                                               |
| keepTags                          | List of tags to preserve when exporting time series.                                                                                                                                                                                                                                              |

<Blockquote mod="warning"
title="keepTags can have a high cost">

Most cloud platforms charge clients based on the number of time series stored.

When exporting a metric, every combination of kept-tag values becomes a distinct time series in Prometheus.
While this granularity can help test analysis, it will incur high costs with thousands of time series

For example, if you add `keepTags: ["name"]` on `http_*` metrics, and your load test calls many dynamic URLs, the number of produced time series can build up very quickly.
Refer to [URL Grouping](/using-k6/http-requests#url-grouping) for how to reduce the value count for a `name` tag.

k6 recommends exporting only tags that are necessary and don't have many distinct values.

</Blockquote>



#### Metric configuration detailed example

```javascript
export const options = {
  ext: {
    loadimpact: {
      apm: [
        {
          // ...
          includeDefaultMetrics: false,
          includeTestRunId: true,

          metrics: [
            // keep vus metrics for whole test run
            'vus',
            // total byte count for data sent/received by k6
            'data_sent',
            'data_received',

            // export checks metric, keeping 'check' (name of the check) tag
            {
              sourceMetric: 'checks',
              keepTags: ['check'],
            },

            // export HTTP durations from 'default' scenario,
            // keeping only successful response codes (2xx, 3xx), using regex selector syntax
            {
              sourceMetric: 'http_req_duration{scenario="default",status=~"[23][0-9]{2}"}',
              targetMetric: 'k6_http_request_duration', // name of metric as it appears in Azure Monitor
              keepTags: ['name', 'method', 'status'],
            },

            // count HTTP responses with status 500
            {
              sourceMetric: 'http_reqs{status="500"}',
              targetMetric: 'k6_http_server_errors_count',
              keepTags: ['scenario', 'group', 'name', 'method'],
            },
          ],
        },
      ],
    },
  },
};
```

## Read more

### Supported Regions

The supported Azure Monitor regions are:

| Geographic Region | Supported Azure Region(s)                                                                                                                                          |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Africa**        | `southafricanorth`, `southafricawest`                                                                                                                              |
| **America**       | `brazilsouth`, `canadacentral`, `canadaeast`, `centralus`, `eastus` (default), `eastus2`, `northcentralus`, `southcentralus`, `westcentralus`, `westus`, `westus2` |
| **Asia**          | `centralindia`, `eastasia`, `japaneast`, `japanwest`, `koreacentral`, `koreasouth`, `southeastasia`, `southlindia`, `uaecentral`, `uaenorth`, `westindia`          |
| **Australia**     | `australiacentral`, `australiacentral2`, `australiaeast`, `australiasoutheast`                                                                                     |
| **Europe**        | `francecentral`, `francesouth`, `northeurope`, `uksouth`, `ukwest`, `westeurope`                                                                                   |

## Necessary Azure values

To set up the Azure Monitor integration on the k6 Cloud, you need the following settings:

| Name              | Description                                                                                                                                                |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| tenantId          | The `tenantId` provided by service principal. The directory (tenant) ID can be extracted from Azure's app registrations.                                   |
| clientId          | The `clientId` provided by service principal. The application (client) ID can be extracted from Azure's app registrations.                                 |
| clientSecret      | The `clientSecret` provided by service principal. The client secret can be extracted from the certificates & secrets section of Azure's app registrations. |
| subscriptionId    | The `subscriptionId` can be viewed in the subscriptions section of Azure portal.                                                                           |
| resourceGroupName | The `resourceGroupName` can be viewed in the resource groups section of Azure portal. It should match the `subscriptionId`.                                |
| insightsAppName   | The `insightsAppName` can be viewed in the application insights section of Azure portal. It should match the `resourceGroupName`.                          |
| azureRegion       | The `azureRegion` you've created your Azure configurations. See the list of [supported regions](#supported-regions). Default is `eastus`.                  |


You can follow these instructions to get the required Azure Monitor settings.
You'll need to paste each value into the Test Builder fields or your test script.

1. Make sure you have an active subscription on Azure. Copy the `subscriptionId` value.

    ![Azure subscriptions](images/azure-subscriptions.png)

2. Create a resource group under your active subscription. Copy the `resourceGroupName`.

    ![Azure resource groups](images/azure-resource-groups.png)

3. Create a service principal by adding a new app to Azure app registrations. Copy the `tenantId`.

    ![Azure app registrations](images/azure-app-registrations.png)

4. Create a client secret in your service principal. Copy the `clientId` and `clientSecret` settings.

    ![Client secrets](images/client-secrets.png)

5. Go to your resource group and assign the `Monitoring Metrics Publisher` role to the user and service principal.

    ![Resource group's access controls](images/rg-access-controls.png)

6. Create a log analytics workspace.

  The region is now created. Copy the region name for the `azureRegion` setting.

    ![Log analytics workspace](images/azure-log-analytics-workspace.png)

8. Create an app under application insights with your log analytics workspace. The region should match the log analytics workspace. Copy the app name for the `insightsAppName` setting.

    ![Application insights](images/azure-application-insights.png)


## Run the cloud test

After you configure the Azure Monitor settings in the test, you can run a cloud test as usual.
k6 Cloud will continuously export the test-result metrics to Azure Monitor during the test execution with a 3~4 minutes delay.

You can now view the k6 metrics on Azure Monitor.
Just choose `application insights` as **scope**, `k6` as **metrics namespace**, and your metrics (and their associated aggregation methods) will be shown in the metric dropdown.
If you don't see the results, try to narrow down the time range to last 30 minutes or less.

  ![Azure Monitor metrics](images/azure-monitor.png)

## Read more

- [Cloud APM](/cloud/integrations/cloud-apm/)
