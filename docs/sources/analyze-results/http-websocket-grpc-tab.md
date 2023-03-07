---
title: 'Inspect HTTP, WebSocket or gRPC requests'
excerpt: ''
weight: 201
---

Depending on the specifics of your target system, Grafana Cloud k6 will allow you to search through your HTTP, WebSocket, or gRPC requests in order to find values that are significant to your analysis.




## Granular request data

Each HTTP, WebSocket, or gRPC request and response contains valuable data for a tester.
Depending on your case, you may want to inspect the requests by different metrics.
For example, you might want to organize the test resources:
 - most requested
 - longest p95 times
 - most failed

If you want to see HTTP trends, you can use the **HTTP** tab to visualize results. If your test run contains requests towards a WebSocket, or a gRPC service, the appropriate tabs will be available automatically.

Then, you can explore the individual requests.

To inspect a request in detail:
1. Select its row.
1. In the expanded row, inspect the:
    - Additional metrics for the request
    - Options to change the aggregation
    - To see HTTP metrics from a specific load zone, use the drop down.

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