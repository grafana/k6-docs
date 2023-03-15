---
title: Query types
description: A reference of query types for the k6 data source.
---

# Query types

The k6 data source has the following query types, each with its own unique panel.

**Metrics**

: k6 Metrics to measure SUT performance, measured as rates, counters, gauges, or trends.

: The panel is a line chart for the value of the metric over the test run.

**URLs**

: Metrics for a specific URL that was requested in the test script

: {{< figure src="https://grafana.com/media/docs/k6/results/screenshot-grafana-k6-http-panel.png"
alt="A screenshot of the k6 http panel"
caption="The panel is a line chart for the value of the metric for a URL over the test run"
>}}

**Checks**

: The success rate of the checks in the test

: {{< figure src="https://grafana.com/media/docs/k6/results/screenshot-grafana-k6-checks-panel.png"
alt="A screenshot of the k6 http panel"
caption="The panel is a time-series bar chart. Each bar has two parts, one to indicate passed checks and another to indicate failures. The total length of the bar indicates the total number of checks that happened around a certain timestamp."
>}}

**Thresholds**

: Comparison of defined threshold value against the metric values emitted during the test run

: {{<
figure src="https://grafana.com/media/docs/k6/results/screenshot-grafana-k6-thresholds-panel.png"
alt="A screenshot of the k6 threshold panel"
caption="The panel is a time series with lines. One line indicates the threshold value, and another indicates the values for the metric over the test run. If the threshold is never crossed, the value for the metric always stays above or below the threshold line."
>}}

