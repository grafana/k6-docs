---
title: Analyze test results
description: 'The following topics describe the common options to analyze test results in Grafana Cloud k6'
weight: 300
aliases:
  - /docs/k6/analyze-results/
---

## Analyze test results

The following topics describe the common options to analyze test results in Grafana Cloud k6.

## About the test overview

When you enter a project, the app presents an overview of all the project's tests.
Each test is comprised of individual _test runs_ represented by bars in a chart.
The bar length indicates how long the test run lasted, and the color represents the test status.

![A tiled view of all test runs in a project](/media/docs/k6/grafana-k6-tiled-test-overview.png)

### Each test has a unique name

k6 groups _test runs_ according to the test name.
The name of the test is determined by one of the following:

- Its name in the [Test Builder]({{< relref "../author-run/test-builder" >}})
- The script file name
- The value of the `options.ext.loadimpact.name` property in the script file (this overrides the file name).

### Bar colors and test run status

The color of the bar for a test run indicates its status:

- Green indicates the test finished with no failed thresholds
- Red indicates that the test failed one or more thresholds
- Yellow indicates that the test was interrupted.

For details of all test statuses, refer to [Test Codes]({{< relref "../reference/cloud-test-status-codes" >}}).


