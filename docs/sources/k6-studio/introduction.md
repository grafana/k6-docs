---
title: 'Introduction'
description: 'Understand the basic concepts of k6 Studio, how it works, and how to get started.'
weight: 100
---

# Introduction

k6 Studio is a free, open source desktop application designed to help you create k6 test scripts using a visual interface.

{{< figure src="/media/docs/k6-studio/screenshot-k6-studio-homepage-3.png" alt="k6 Studio homepage" >}}

[Grafana k6](https://grafana.com/docs/k6/latest/) is an open source performance testing tool that you can use to run JavaScript scripts to test your applications. One of the biggest challenges users face when they're getting started with k6 is generating test scripts from scratch, especially when working with applications that you might not have easy access to the source code or documentation.

For users that have less experience with JavaScript or k6, k6 Studio can help you create a script from a browser session and allow you to quickly get started running test scripts to test your application. For developers who are already familiar with k6, k6 Studio can optimize the time it takes to create a new script, and give you tools to validate and debug your scripts outside of the CLI.

The k6 Studio desktop application consists of three components:

- **Recorder**: The Recorder can help you generate a HAR file. When you start a recording, the application uses a proxy recorder and launches an instance of Google Chrome, and records the traffic from your actions on the browser. The recording includes protocol-level requests, such as HTTP requests, and browser events, such as interacting with elements on a page.
- **Generator**: The Generator takes the output of a test recording and gives you options to customize the test with a visual interface and generate a test script from it. You can use it to define a list of hosts to allow or remove from your script, include variables or data files in your script, and configure rules to extract values, parameterize requests, and more.
- **Validator**: The Validator can help you validate that a test script is working as expected. You can use it to run one iteration of your test, and visualize the request and response of any requests on your test script. The Validator works with any k6 test script, not only scripts generated via the Generator.

After you create a test script using the Generator, you can use that same script to run a load test using the [k6 CLI](https://grafana.com/docs/k6/latest/), [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/), or [Synthetic Monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/), and start getting more information about how well your systems or applications are performing.
