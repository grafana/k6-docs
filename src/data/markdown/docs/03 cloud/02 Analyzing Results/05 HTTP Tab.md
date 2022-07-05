---
title: 'HTTP Tab'
excerpt: 'The HTTP tab allows you to inspect individual requests in your k6 test'
---

If your test is on an HTTP service, you'll often want to search through the requests that the test made to find significant values.

In k6 Cloud, you can use the **HTTP** tab to inspect individual requests in your test.

First, in the tab itself, note the number of HTTP request that passed against the total number of requests.
This provides a quick hint about over test performance.

![HTTP Tab](./images/05-HTTP-Tab/http-tab.png)

Then, you can explore the individual requests.

## Explore HTTP requests in cloud results

The **HTTP** shows a row for each HTTP request, with columns for resource, test scenario, method used, and status code returned.

If an endpoint has multiple request methods or status codes, k6 separates them.
On this tab, we can easily see `HTTP` requests that have failures. Take notice of the &#10003; on the left of each row. If we had failures they would be marked with a &#10005;

To filter the requests to a subset, use the search bar to filter by `name`, `status`, etc.
These filters can be particularly useful when analyzing the result.

For a more detailed analysis of a request, select its row. This expands the request, so you can see:

- Additional metrics for the request
- Options to change the aggregation
- To see HTTP metrics from a specific load zone, use the drop down.

To compare the request, and its metrics, with other data about the test:
1. Select the row.
2. Select **Add to analysis**.
3. Then use the **Analysis** tab to find correlations between threshold data and other values from the test.

![HTTP Tab breakdown chart](./images/05-HTTP-Tab/http-tab-graph.png)

### Organize HTTP requests by scenario and group

The HTTP tab can be display two different views: 
- The list view shows a flat list of entries aggregating similar entries (with same value for labels name, status, method, expected_response).
- The tree view visually groups entries by the scenario and group the request was executed.

To change the tab to tree view, use the toggle.

![HTTP Tab tree view](./images/05-HTTP-Tab/http-tab-tree.png)

To sort trees by a metric, select the caret at the top of the column.

To explore a specific node for a scenario or group, uncollapse the resource.

To customize what metrics and resources are displayed, use the vertical-ellipses (or "kebab") icon at the beginning of the heading row.
With this icon, you hide columns or show new columns.

![HTTP Tab columns](./images/05-HTTP-Tab/http-tab-columns.png)
