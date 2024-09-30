---
title: 'Get started with k6'
description: A series of docs to learn how to use the major features of k6
weight: 01
weight: -10
---

# Get started with k6

This tutorial provides some procedures for common real-life uses of k6.
They assume no prior knowledge of k6 or of JavaScript.

These tasks are all reproducible, so open up your favorite editor and follow along.
Imagine that you are a developer or tester who is responsible for performance in your development team.

## Context: test a new endpoint

Your development team has just developed a new login endpoint.
Before releasing, you must test the endpoint for the following questions:

- Does it work?
- Does it perform within the service-level objectives under average load?
- At what load does performance degrade beyond objectives?

After you test the endpoint, your team wants you to compare different components of the user-facing application.

Finally, after you test the API and web application, break your scripts down into reusable parts.

## Before you start

We encourage you to open your terminal and actively experiment with these examples.
The tutorial requires the following:

- [ ][k6 installed](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6)
- [ ] A clean directory to experiment in.
- [ ] Something to do during the minute or two when k6 runs the longest example tests
- [ ] Optional: [`jq`](https://stedolan.github.io/jq/) to filter some results

## Tutorials

| In this tutorial                                                                                                                   | Learn how to                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [Test for functional behavior](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6/test-for-functional-behavior) | Use k6 to script requests and evaluate that performance is correct |
| [Test for performance](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6/test-for-performance)                 | Use k6 to increase load and find faults                            |
| [Analyze results](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6/analyze-results)                           | Filter results and make custom metrics                             |
| [Reuse and re-run](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6/reuse-and-re-run-tests)                   | Modularize and re-run tests                                        |
