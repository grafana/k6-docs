---
title: 'Run a k6 test script'
description: 'Learn the different ways you can run a k6 test script'
weight: 100
---

# Run a k6 test script

There are several ways you can use the Grafana k6 command-line tool (CLI) to run a k6 performance test. In this page, you'll learn how to use each method and how they differ from each other.

## Before you begin

To run a CLI test, you'll need:

- A machine with [k6 installed](https://grafana.com/docs/k6/<K6_VERSION>/get-started/installation/).
- A [test file](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-authoring/create-test-script-using-the-cli/).

## Run a test on your local machine

Running tests locally is a great way to incrementally test your script as you write it. For example, you can make sure that your [checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks/) and [thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds/) are configured correctly before you run a test with more VUs in Grafana Cloud k6.

To run a test locally, use the `k6 run` command:

```bash
k6 run script.js
```

## Run a test using Grafana Cloud k6

Grafana Cloud k6 is a performance testing application that's part of Grafana Cloud, and it's powered by k6 OSS. It allows you to leverage all of the Grafana k6 OSS capabilities while managing the infrastructure needed for scaling servers, running load tests from multiple locations, storing test results, and providing dashboards to detect performance errors and regressions.

Grafana Cloud k6 makes it easier to visualize and compare test results by providing you with built-in dashboards, while also making it easier to share and collaborate on test data with other teams in your organization.

To run a cloud test from the CLI, you'll need an [API token](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/tokens-and-cli-authentication/) for authenticating the k6 CLI with the Grafana Cloud k6 application.

After you retrieve an API token, you can authenticate with the CLI by running the following command:

```bash
k6 cloud login --token <API_TOKEN>
```

With the CLI authentication configured, you can run cloud tests by using the `k6 cloud` command:

```bash
k6 cloud run cloud_demo.js
```

You can also run a test from a local machine and stream the results for storage and visualization on Grafana Cloud. A common use case for this feature is to run load tests in a CI/CD environment, or on networks that aren't accessible from the public internet.

To run a test locally and stream the results to Grafana Cloud k6, use the `k6 cloud run --local-execution`:

```bash
k6 cloud run --local-execution cloud_demo.js
```

To learn more about Grafana Cloud k6, refer to:

- [Grafana Cloud k6 documentation](https://grafana.com/docs/grafana-cloud/testing/k6/).
- [Use the CLI](https://grafana.com/docs/grafana-cloud/testing/k6/author-run/use-the-cli/) - Learn about the different methods available to run a k6 test in Grafana Cloud.

## Run a test in your infrastructure with the k6 Operator

k6 Operator is a Kubernetes operator that you can use to run distributed k6 tests in your Kubernetes cluster.

A couple of reasons why you might want to do this:

- You run your application in Kubernetes and would like k6 to be executed in the same fashion as all your other infrastructure components.
- You want to run your tests within your private network for security or privacy reasons.

To set up and run a test using the k6 Operator, refer to [Set up distributed k6](https://grafana.com/docs/k6/<K6_VERSION>/set-up/set-up-distributed-k6/).
