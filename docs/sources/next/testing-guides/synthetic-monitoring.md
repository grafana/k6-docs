---
title: 'Synthetic monitoring'
description: 'Use k6 as synthetic monitoring tool, scheduling k6 smoke tests for continuous production monitoring.'
weight: 03
noindex: true
---

# Synthetic monitoring

You can use k6 as synthetic monitoring tool by scheduling k6 smoke tests for continuous production monitoring.

For a simple demo stack, see this [tutorial on using `cron` and `mail`](https://k6.io/blog/performance-monitoring-with-cron-and-k6/).

For a more comprehensive solution, you can use [Grafana Cloud Synthetic Monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/) to proactively monitor your application and services in production. You can run k6 smoke tests at frequent intervals, receive alerts on potential issues, and manage incidents directly from [Grafana Cloud](https://grafana.com/products/cloud/).
