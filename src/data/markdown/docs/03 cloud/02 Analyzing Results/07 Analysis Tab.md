---
title: 'Compare metrics'
excerpt: 'With the Analysis tab, you can compare and correlate data from your k6 test.'
slug: '/cloud/analyzing-results/analysis-tab'
---

In the previous pages, this documentation gave instructions about how to add a certain value from your test results to the **Analysis** tab. Here you can organize all the interesting data points from your test in a single view.

The first time you open a test run for a test, a default layout will be generated for you. It will contain:

- An overview chart with the most common metrics that you'll want to keep track of. 
- One chart for each custom metric.

The exact metrics added to the overview chart will vary depending on what protocols your test used. For instance, if your test made HTTP requests the chart will include the Response Time, Request Rate and Failure Rate metrics.

This default layout can be customized to suit your needs.

## Adding new charts

To add a new chart to the analysis, press the "Add new chart" button. This will open the [configuration dialog](#configure-chart-data). Once you're satisfied with your chart, press "Save" and the new chart will be added to your analysis.

## Configuring charts

Charts can be configured from the menu of each panel. Here you'll find a number of options.

![Chart Menu](./images/06-Analysis-Tab/chart-menu.png)

### Changing chart width

Charts come in three sizes: 1, 2 or 3 columns. Using a wider chart will draw more attention to it and will allow you to see more details at a glance. You can use this to highlight the metrics that are most important to you.

To change the size, pick a width from the menu:

![Set width of chart](./images/06-Analysis-Tab/resize-chart.png)

<Blockquote mod="note">

The layout is responsive, so the actual number of columns may vary. Depending on the screen size, charts that are configured to be 1 or 2 columns wide may be just as wide as those that are 3 columns wide.

</Blockquote>

### Configuring chart data 

Only you know what to look for when analyzing the results of your test. Each chart can be customized to include multiple time series, each at different levels of details.

![Configuration Dialog](./images/06-Analysis-Tab/configuration-dialog.png) 

At the top of the dialog, you'll see a preview of your chart so you can see what the final result will look like.

Charts have a title and an optional description. They also contain one or more time series. 

![Time Series](./images/06-Analysis-Tab/time-series.png)

Each time series can be assigned a color and a name, to help distinguish it from others.

You can select which metric to display data for by using the metrics dropdown. Depending on the type of metric, you'll get a different set of aggregations that can be used.

![Select Metric](./images/06-Analysis-Tab/select-metric.png) 

### Advanced settings

Clicking the arrow to the left will expand the time series row, showing some more advanced options.

#### Plot type

Not all data is best visualized by a line chart. You can change the plot type by using the Plot Type dropdown. The available types are:

* Line - displays the data as a line.
* Area - similar to a line plot, but with a filled background.
* Column - displays the data as vertical bars.

### Tag filter

Sometimes you're interested in some specific detail of your test. This can be achieved by using a tag filter.

![Tag filter](./images/06-Analysis-Tab/tag-filter.png)

Creating a filter can be done either by clicking a tag in the dropdown and selecting the desired value, or by typing.

When typing you will be presented with a list of results matching both tag names and values. If you want to narrow the
results down to a specific tag, you can use our query syntax:

```
<tag name> is <tag value>
```

These are the possible operators:

| Operator | Description                                                                 | Example                |
|----------|-----------------------------------------------------------------------------|------------------------|
| `is`     | Aggregate data where the tag matches the given value.                       | `url is https://k6.io` |
| `is not` | Aggregate all data except where the tag matches the given value.            | `protocol is not http` |

<Blockquote mod="note">

It is possible to write tag filters that will never produce a result.

For instance, the `protocol` tag will always match the protocol of the `url` tag. But it is possible to write a filter
that checks for different values of these tags, e.g. `protocol is http` and `url is https://test.k6.io`. Since the
protocols of the two values don't match, no data will be returned.

Our recommendation is to keep your filters as simple as possible and only filter on the values you need to.

</Blockquote>

## Guidelines for adding metrics to analysis

Here are some general tips to consider when adding metrics and using this tab:

- Ensure that VUs and Request rates follow the same trend.
- Add and compare interesting requests from the HTTP Websocket and gRPC tabs to compare with other metrics.
- Add the load generator CPU and Memory consumption metrics to ensure they are not saturated (metrics are only available for tests run in the cloud).
- Add thresholds that have failed.
- Add checks that have failures.
- Add metrics for endpoints that you have specific SLAs/SLOs on.

This list is just a starting point. In your test analysis, you can identify deeper issues.

## Re-using layout for other runs

Any changes you make to the layout will be saved for that test run, so if you leave the page and come back you will always see the same layout. If you
want to re-use the layout for all test runs, you will have to set it as default for the test.

To do this, open the menu using the menu button right under the tab bar and click "Set as default".

![Set as default](./images/06-Analysis-Tab/set-as-default.png)

If you have made local changes to a test run and would like to revert to the default layout, click "Reset to default" in the same menu.

## Analyzing your results

Once you've set up your charts, you can start analyzing your data.

By hovering over the chart you can see and compare data points between the different time series.

![Compare data points](./images/06-Analysis-Tab/compare-data-points.png)

Hovering over a time series in the legend will give you a detailed view of the query used to fetch the data.
 
![Hover to see query](./images/06-Analysis-Tab/hover-to-see-query.png)

<Blockquote mod="note">

Since test scripts may change between runs and the metrics reported by k6 might vary (e.g. if one run dropped iterations, but another did not) there may
not be any data to display. In this case the time series will be greyed out in the legend and its tooltip will say "No data available".

</Blockquote>


