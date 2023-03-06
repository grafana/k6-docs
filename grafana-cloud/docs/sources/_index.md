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

With the k6 app, you can  script performance tests locally,
run tests from the CLI on servers all over the world,
and visualize test results in Grafana Cloud.

In these docs, learn how to:

- Write and run Cloud tests.
- Analyze results.
- Incorporate k6 with other dashboards.
- Manage performance-testing projects across your organization.

For introductory videos, check out the [k6 Cloud Playlist](https://www.youtube.com/playlist?list=PLJdv3RhAQXNGkRCp7Q0k77n5jif4qjz2o)


## k6 Cloud vs. OSS

Grafana k6 cloud is designed to manage and enhance the [k6 OSS](https://k6.io/docs) API and testing application.
It aims to keep your k6 tests as portable as possible, while saving your teams the effort of managing cloud infrastructure or maintaining a beautiful front end.

### Infrastructure benefits

When you run tests on Grafana Cloud k6 servers, Grafana handles the following infrastructure work for you:
- Autoscaling huge tests
- Distributing test across different geographic zones
- Storing and aggregating massive amounts of test metrics

For a glimpse of the infrastructure work that this requires, read [Peeking under the hood of k6 Cloud](https://k6.io/blog/the-glorious-backend/).

### Extra features

Grafana Cloud k6 is not only an engine for test execution and storage.
It's also a software as a service, which provides a frontend to visually explore tests and to manage test suites and teams.

Some of the key features include the following:
- Live visualizations of test execution
- A graphical test builder
- Performance insights to alert you about test issues
- Portable test-results panels to put in other dashboards
- Detailed analysis of different test metrics
- Cloud environment variables to share between teams
