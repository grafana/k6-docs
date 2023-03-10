---
title: 'Inspect test results'
excerpt: ''
weight: 201
---

# Inspect test results

Depending on the specifics of your target system, Grafana Cloud k6 will allow you to search through your HTTP, WebSocket, or gRPC requests in order to find values that are significant to your analysis.

## Granular request data

Each HTTP, WebSocket, or gRPC request and response contains valuable data for a tester.
Depending on your case, you may want to inspect the requests by different metrics.
For example, you might want to organize the test resources:
 - most requested
 - longest p95 times
 - most failed

If you want to see HTTP trends, you can use the **HTTP** tab to visualize results. If your test run contains requests towards a **WebSocket**, or a **gRPC** service, the appropriate tabs will be available automatically.

Then, you can explore the individual requests.

To inspect a request in detail:
1. Select its row.
1. In the expanded row, inspect the:
    - Additional metrics for the request
    - Options to change the aggregation
    - To see HTTP metrics from a specific load zone, use the drop down.

  > Please note that Grafana Cloud k6 will display separate tabs for HTTP, WebSocket, or gRPC request automatically, so if your test is not making any WebSocket requests, for example, the tab will not be shown in your result analysis.

## Explore HTTP requests in cloud results

In Grafana Cloud k6, you can use the **HTTP** tab to inspect individual requests in your test.

First, in the tab itself, note the number of HTTP requests that passed against the total number of requests.
This number provides a quick, top-level overview of test performance.

![HTTP Tab](/media/docs/k6/http-tab.png)

The **HTTP** tab shows a row for each HTTP request, with columns for resource, test scenario, method used, and status code returned.

To filter the requests, use the search bar to filter by `name`, `status`, `method`, `scenario`, etc.



## WebSocket tab

Similar to the HTTP tab, your WebSocket tab will be visible if your test targets a WebSocket service. The WebSocket tab will be visible automatically.

You will be able to filter the metrics by the `performance overview` which will display the messages per second, as well as session duration metrics, or `messages sent/received` and `ping duration`. 

![WebSocket Tab](/media/docs/k6/websocket-tab.png)


## gRPC tab
  
Your gRPC tab will be visible if you are testing against a gRPC service.

If you click to expand an individual request, you will be able to filter by the `performance overview` graph which will display the number of VUs, request rate, and response time metrics. In addition to that, you will be able to choose to filter by `gRPC request rate`, or `gRPC response time` metric.



![GRPC Tab](/media/docs/k6/grpc-tab.png)


# Thresholds

With thresholds, you can set pass/fail criteria for your test metrics.
Often testers use thresholds to codify their service-level objectives.

> **ⓘ If a threshold fails, k6 marks the test as `Failed` in the UI.**

## Pass/Fail criteria in a test

By analyzing your threshold data, you can discover whether your test passed or failed the metric objectives that you set.

If a threshold fails, you can use the **Thresholds** tab to analyze its trends across the test duration and iterations.

## Explore thresholds in Grafana Cloud k6

To visually inspect and analyze thresholds, use the **Threshold** tab.

First, in the tab itself, note the number of the thresholds that passed against the total number of thresholds.
This number can let you know whether the tab is worth exploring.

![Thresholds Tab](/media/docs/k6/thresholds-failed.png)

Then, you can explore the data from individual thresholds.
You can use this tab to do the following investigations.

To find failing thresholds, use the search bar. You can filter by name or by pass/fail status.

1. Search for one or multiple names, like `http` or `vus`.
1. From your filters, find which thresholds. For example, `vus: value>100` and `http_reqs:count>10000`.

   Note the <span style="color:RGB(209, 122, 14)">red</span> or <span style="color:RGB(26, 127, 75)">green</span> markings on the left side of each row.


To **see visualizations for the metric**, select the threshold.
1. Use the graph to inspect when performance degraded.

  In our example below, the expanded threshold has a value below the threshold of 500 ms.

![Thresholds passed](/media/docs/k6/thresholds-tab.png)

# Checks

*Checks* validate response values.
For example, you can use checks to validate that your POST request is returning `201` status codes.

## Validate response content

Inspecting checks is a valuable practice at both the beginning and the end of the test.
- If your checks fail at the beginning, there's a good chance the test is sending improper requests.
  For example, `4xx` responses to POST requests may indicate that the authentication is malformed.
- If your checks fail at the end of the test, your system is likely degrading under the test load.

If the number of check failures increases as the test runs, you can use the **Checks** tab to view the check metrics in a time series.

## Explore checks in cloud results

To visually inspect and analyze checks, use the **Checks** tab

First, in the tab itself, note the number of checks that passed against the total number of checks.
This provides a quick, top-level overview of the check performance.

![Checks Tab](/media/docs/k6/checks-tab.png)

To find `Checks` that have failures, search for a check, or sort columns.
  - Note the <span style="color:RGB(209, 122, 14)">red</span> or <span style="color:RGB(26, 127, 75)">green</span> on the left side of each row.
  - In the preceding image, the Check `HTTP status is 200` succeeded only 84.57% of the time: 137 successful runs and 25 failures.

To inspect a check in detail:
1. Select the check row.
1. In the expanded check, note how many failures occur at different points in the test.


# Results filtering

# Execution logs

Logging messages can help you debug load tests.

## Supported log methods

The k6 API supports the following console-logging methods:

- `console.log()`
- `console.info()`
- `console.debug()`
- `console.warn()`
- `console.error()`

> **Note**: `console.debug()` will log output only when you run k6 with the `-v/--verbose` flag.


> **Tip: Debug locally first**
>
> When your script is ready, execute the test on the Grafana Cloud k6 with the `k6 cloud` command.

## Explore logs in Grafana Cloud k6 results.

With the **Logs** Tab, you can view, filter, and query log messages in the Cloud Results page.

### Filter by log level and load zone

To filter messages by severity:
1. Use the **Log level** dropdown.
1. Order each JavaScript log statement by the severity level however you want:

  - **Info**: `console.log` and `console.info`.
  - **Debug**: `console.debug`.
  - **Warning**: `console.warning`.
  - **Error**: `console.error`.


The load-zone filter displays only when your test runs in more than one load zone.