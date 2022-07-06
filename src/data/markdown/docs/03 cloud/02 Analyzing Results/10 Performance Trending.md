---
title: 'Track trends'
excerpt: 'With the performance trending graph, you can quickly see how performance changes over between test runs'
slug: '/cloud/analyzing-results/performance-trending'
---

The performance trending graph automatically displays as you continue to run your tests.
It's intended to provide a high-level overview of your test performance over time.
The bars on the graph also signal the status of a specific test.

To view the performance trending graph, use the dashboard, or select the name of any given test.
In both cases, we plot the `p95` response time metric for all HTTP requests from the test run.

## Dashboard Performance Trending

Directly from the dashboard, you can see all your tests and the status of the test runs.
This view gives you a high-level view of how performance trends over time.

In this example, we can see a `Demo with Cloud Execution` is currently running, and that its previous runs had quite a few failures. Our script, `api.js`, is passing and trending down, which is a good sign.

![Dashboard Performance Trending](./images/09-Performance-Trending/dashboard-perf-trending.png)

## Test Performance Trending

For a performance-trending graph of a specific test run, select the test.
This graph shows more data points over time.

You can see more information by hovering over any bar in the graph.
This test has stable response times between test runs but is failing by [Thresholds](/using-k6/thresholds).

![Performance Trending](./images/09-Performance-Trending/performance-trending.png)

