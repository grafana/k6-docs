---
cascade:
  public_docs: true
  search_section: Grafana Cloud k6
  search_type: doc
title: Grafana Cloud k6
menuTitle: Grafana Cloud k6
description: Run k6 in Cloud servers, visualize and scripts in your Grafana instance.
description: 'Script performance tests locally, run tests from the CLI on servers all over the world, and visualize test results in Grafana Cloud.'
weight: 001
---

# Grafana Cloud k6

Grafana Cloud k6 is a performance-testing tool in your Grafana cloud instance.
The test engine is powered by [k6 OSS](https://k6.io/docs).

Script performance tests from the UI or in your local editor. Run tests from different geographical locations. Store and visualize the results in Grafana Cloud.

{{< figure src="https://grafana.com/media/docs/k6/diagram-grafana-k6-glass-pane.svg" max-width="500px" caption="Visualize k6 performance tests from both sides in Grafana Cloud." >}}

This documentation describes everything you need to know to author, run, analyze, and manage load tests in Grafana Cloud k6.
For a high-level picture of why you might want to use Grafana Cloud k6, continue reading this page.
For a quick tutorial, go to [Get started]({{< relref "get-started" >}}) to run your first test.

## A unified platform to prevent, monitor, and diagnose

Dashboards and performance tests share a common purpose: increased system reliability.
However, these two tools focus on different aspects of reliability.
Performance tests try to create conditions to uncover issues, and dashboards monitor systems so that, when issues do occur, they are visible.

Grafana Cloud k6 joins two complementary tools in the same platform.
The k6 app in Grafana Cloud also has complementary features to enhance the [k6 OSS application](https://k6.io/docs).
A holistic approach to reliability brings a number of benefits:

- **Compare client and system metrics in a single pane of glass.**

  With k6, you can write load tests to catch performance issues before they enter production.
  With Grafana, you can visualize test results and compare them to other system metrics.
  Together, the tools help you see both sides of what happens when your system is under load.

- **Bring teams and data together.**

  Since the k6 app comes with Grafana Cloud, your testing team can share platforms with everyone who uses your Grafana stack.
  Greater accessibility opens new opportunities for collaboration, communication, and discovery.

  For example, testing teams might correlate results with panels initially used by only DevOps teams.
  On the other end, since tests can be run directly from Grafana Cloud,
  an experienced tester could write a test that developers could use to test for regressions after each significant commit.

- **Diagnose known failure conditions**

  You can also use the k6 app with Grafana to diagnose why systems fail under certain conditions.
  Create a script that reproduces the behavior that you expect to cause failure, then run it with increasing load as you monitor.

## Powered by k6 OSS

Tests in Grafana cloud k6 run on k6 OSS.

k6 is a performance testing tool written in Go.
It's designed to be full-featured, generate load efficiently, and, above all, provide excellent developer experience.
Some essential features of k6 are as follows:

- The scripting library models how users or machines interact with a system over different protocols.
- The execution engine generates load to simulate network traffic for all types of events.
- The extension ecosystem extends k6 for new protocols and data outputs.

In almost all cases, **you can run the same tests locally or in Grafana Cloud**.
Rather than lock you in, Grafana Cloud k6 enhances and complements your local performance tests.

### Managed infrastructure

When you run tests on Grafana Cloud k6 servers, Grafana handles the following infrastructure work for you:

- Auto-scaling huge tests
- Distributing tests across different geographic zones
- Storing and aggregating massive amounts of test metrics
- Maintaining and developing a frontend

For a glimpse of the development and work that managing this infrastructure requires, read [Peeking under the hood of k6 Cloud](https://k6.io/blog/the-glorious-backend/).

### A testing frontend for your organization

Besides visualization and infrastructure, the Grafana Cloud k6 enhances the command-line application with graphical interfaces to build, analyze, and manage tests.

- [The Test Builder]({{< relref "author-run/test-builder" >}}), a graphical interface to author tests
- [Scripting extras]({{< relref "author-run/cloud-scripting-extras" >}}) for enhanced capabilities to run tests and filter results
- [Performance insights]({{< relref "analyze-results/get-performance-insights" >}}) to alert you about issues in your script or system under test.
- Portable [test-results panels]({{< relref "analyze-results/correlate-results-in-grafana" >}}) to put in other dashboards
- Detailed analysis of different test metrics

