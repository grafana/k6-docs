---
title: 'Introduction'
description: 'Understand the basic concepts of k6 Studio, how it works, and how to get started.'
weight: 100
---

# Introduction

k6 Studio is a free desktop application designed to help you create k6 tests scripts using a visual interface.

![k6 Studio homepage](/media/docs/k6-studio/screenshot-k6-studio-homepage.png)

[Grafana k6](https://grafana.com/docs/k6/latest/) is an open source performance testing tool that allows you to run JavaScript scripts to test your applications. One of the biggest challenges users face when they're getting started with k6 is generating test scripts from scratch, especially when working with applications that you might not have easy access to the source code or documentation.

For users that have less experience with JavaScript or k6, k6 Studio can help you record a script from a browser session and allow you to quickly get started running test scripts to test your application. For developers who are already familiar with k6, k6 Studio can optimize the time it takes to create a new script, and give you tools to validate and debug your scripts outside of the CLI.

The k6 Studio desktop application consists of three components:

- **Test Recorder**: The Test Recorder can help you generate test scripts. When you start a recording, the application uses a proxy recorder and launches an instance of Chrome, and records the traffic from your actions on the browser.
- **Test Generator**: The Test Generator takes the output of a test recording and gives you options to customize the test with a visual interface and generate a test script from it. You can use it to define a list of hosts to allow or remove from your script, include variables in your script, and configure rules to extract values, parameterize requests, and more.
- **Test Validator**: The Test Validator can help you validate that a test script is working as expected. You can use it to run one iteration of your test, and visualize the request and response of any requests on your test script. The Test Validator works with any k6 test script, not only scripts generated via the Test Generator.

After you create a test script using the Test Generator, you can use that same script to run a load test using the k6 CLI or in Grafana Cloud k6, and start getting more information about well your systems or applications are performing.
