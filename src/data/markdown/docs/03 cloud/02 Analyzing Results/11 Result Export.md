---
title: 'Result Export'
excerpt: 'Exporting k6 Cloud test results. CSV format and PDF reports'
---

Test result data can be exported after a test has finished and data processing complete in various formats:

- [PDF report](#generate-pdf-report): to share the performance results with managers and executives.
- [CSV format](#export-as-csv): to analyze the test result metrics deeper on your own.

If you want to know other methods to analyze your test results, check out the k6 Cloud integrations with [APM tools](/cloud/integrations/cloud-apm) and the [Grafana Data Source Plugin](/cloud/integrations/grafana-plugin).

## Generate PDF Report

> ⭐️ The PDF report is available on annual Pro and Enterprise plans.

The PDF report is an executive summary of the test result's most relevant metrics and performance data. To get an idea of the report looks, you can download an example [here](https://f.hubspotusercontent10.net/hubfs/1681264/Executive%20Summary%20-%20Scenarios.pdf).

![Performance Test Result - PDF Summary Report](./images/11-Result-Export/pdf_report.png)

### Opening the Editor

To generate a PDF summary, do the following:

1. Navigate to the test result you want to generate a summary of.
2. Open the [test results menu](/cloud/analyzing-results/test-results-menu) in the top right.
3. Select the `Generate PDF summary` option.

This will take you to an editor where you can customize and download the summary.

### Adding or Removing Metrics

By using the Add/Remove Metrics-dropdown at the top of the page, it is possible to toggle which sections to include in the generated report. The editor comes with a variety of predefined metrics that can be included.

![Adding or Removing Metrics - PDF Summary Report](./images/11-Result-Export/pdf_report_add_remove_metrics.png)

### Summarizing the Results

#### Editing

![Text Editing - PDF Summary Report](./images/11-Result-Export/pdf_report_edit_text.png)

Each section in the summary comes with a predefined text. You can edit this text by clicking on the edit icon or by clicking on the text itself.

When you are satisfied with your changes, simply click outside the text editor to save your changes. If you want to cancel and revert your changes, you can click the cancel icon next to the editor or use the ESC key on your keyboard.

#### Formatting

![Text Editing - PDF Summary Report](./images/11-Result-Export/pdf_report_text_formatting.png)

You can apply formatting to your text by selecting the text you want to format and choosing the appropriate formatting from the popup. It's also possible to use the following keyboard shortcuts to apply formatting:

| Shortcut            | Format                                                    |
| ------------------- | --------------------------------------------------------- |
| Ctrl / &#x2318; + B | **Bold**                                                  |
| Ctrl / &#x2318; + I | _Italic_                                                  |
| Ctrl / &#x2318; + U | <span style="text-decoration: underline">Underline</span> |

### Generating the PDF

Once you've finished editing the summary, you can click the `Generate PDF` button in the top right of the editor. This will open up a progress dialog and, after a few moments, the browser will prompt you to download the PDF summary report.

> **Note:** It is important that you do not refresh or navigate away from the page while the PDF is being generated. The time it takes to generate the PDF is dependent on the amount of data that needs to be included, so it may take a minute if your test includes many load zones, for instance.

## Export as CSV

To export the test result as CSV, visit the test result, click the options menu - the three dots in the top right - and select `Export Data`. The data will be exported as a `.zip` file containing number of `.csv` files.

Each metric is exporter into a separate file. The export also contains `metrics.csv` file which contains the list of exported metrics.

For a typical k6 HTTP test, these files will be present

| File name                                        |             Metric               |           Columns                |
| ------------------------------------------------ | -------------------------------- | -------------------------------- | 
| `metrics.csv`                                    | Index of exported metrics         | `metric`,`type`,`origin`         |
| `metric_checks.csv`                              | [checks](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`check`,`load_zone`,`tags`,`nz_count`,`count`|
| `metric_data_received.csv`                       | [data_received](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`         |
| `metric_data_sent.csv`                           | [data_sent](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`         |
| `metric_group_duration.csv`                      | [group_duration](/using-k6/tags-and-groups/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`median`,`p95`,`p99`,`max`,`stdev`|
| `metric_http_reqs.csv`                           | [http_reqs](/using-k6/metrics/#http-specific-built-in-metrics) | `time`,`metric`,`group`,`scenario`,`name`,`method`,`status`,`expected_response`,`load_zone`,`tags`,`count` |
| `metric_http_req_duration.csv`                   | [http_req_duration](/using-k6/metrics/#http-specific-built-in-metrics) |  `time`,`metric`,`group`,`scenario`,`name`,`method`,`status`,`expected_response`,`load_zone`,`tags`,`count`,`min`,`mean`,`median`,`p95`,`p99`,`max`,`stdev` |
| `metric_iteration_duration.csv`                  | [iteration_duration](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`median`,`p95`,`p99`,`max`,`stdev` |
| `metric_iterations.csv`                          | [iterations](/using-k6/metrics/)         | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count` |
| `metric_load_generator_ cpu_percent.csv`         | [load_generator_cpu_percent](/using-k6/metrics/)         | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`max`,`last` |
| `metric_load_generator_ file_handles.csv`        | [load_generator_file_handles](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`max`,`last` |
| `metric_load_generator_ memory_used_percent.csv` | [load_generator_memory_used_percent](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`max`,`last` |
| `metric_vus.csv`                                 | [vus](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`max`,`last` |
| `metric_vus_max.csv`                             | [vus_max](/using-k6/metrics/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`max`,`last` |
| `metric_myCustomCounter.csv`                     | User-defined `myCustomCounter` [Counter](/javascript-api/k6-metrics/counter/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count` |
| `metric_myCustomGauge.csv`                       | User-defined `myCustomGauge` [Gauge](/javascript-api/k6-metrics/gauge/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`max`,`last` |
| `metric_myCustomRate.csv`                        | User-defined `myCustomRate` [Rate](/javascript-api/k6-metrics/rate/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`nz_count`,`count` |
| `metric_myCustomTrend.csv`                       | User-defined `myCustomTrend` [Trend](/javascript-api/k6-metrics/trend/) | `time`,`metric`,`scenario`,`group`,`load_zone`,`tags`,`count`,`min`,`mean`,`median`,`p95`,`p99`,`max`,`stdev` |


Here's example data, units, and description of fields present in the CSV data.

| Column          | Example                          | Data/Unit      | Description                                                                                                                               |
| --------------- | -------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `time`          | 2019-03-25 11:12:48.927949+00:00 | datetime (UTC) | The ISO-8601 timestamp when this data point was captured (when the HTTP request was made).                                                |
| `metric`        | http_req_duration                | string         | The metric name that this data point represents.                                                                                          |
| `group`         | "my group"                       | string         | The group name [`group()`](/using-k6/tags-and-groups) from where this request was made.                                                 |
| `scenario`      | default                          | string         | The name of the scenario this metric was collected in.                                                                           |
| `url`           | http://test.k6.io/style.css      | string         | The URL requested.                                                                                                                        |
| `method`        | GET                              | string         | The HTTP method of the request that this data point represents.                                                                           |
| `status`        | 200                              | number         | The HTTP response status code of the request that this data point represents.                                                             |
| `count`         | 1.0                              | number         | Number of samples that this data point represents (if > 1 `response_time` is an aggregate value).                                         |
| `load_zone`     | amazon:us:ashburn                | string         | The load zone where the request(s) was made from.                                                                                         |
| `tags`          | {"staticAsset":"true"}           | string         | JSON formatted list of `{"name": "value"}` tags as specified for the request in the script.                                                      |
| `min`           | 1.008016                         | number (ms)    | The minimum response time for samples collected within the time bucket. |
| `mean`          | 3.008016                         | number (ms)    | The mean response time for samples collected within the time bucket. |
| `median`        | 5.468016                         | number (ms)    | The median response time for samples collected within the time bucket. |
| `p95`           | 10.10816                         | number (ms)    | The 95th percentile response time for samples collected within the time bucket. |
| `p99`           | 14.08016                         | number (ms)    | The 99th percentile response time for samples collected within the time bucket. |
| `max`           | 15.08016                         | number (ms)    | The maximum response time for samples collected within the time bucket. |
| `stdev`         | 0.075112                         | number (ms)    | The standard deviation time for samples collected within the time bucket. |
