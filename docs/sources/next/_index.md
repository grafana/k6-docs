---
aliases:
  - /docs/k6/
description: 'The k6 documentation covers everything you need to know about k6 OSS, load testing, and performance testing.'
menuTitle: Grafana k6
title: Grafana k6 documentation
weight: -10
---

# Grafana k6 documentation

This documentation will help you go from a total beginner to a seasoned k6 expert!

## Get started

<div class="nav-cards">
    <a href={{< relref "./set-up/install-k6" >}} class="nav-cards__item nav-cards__item--guide">
        <h4>🚀 Installation</h4>
        <p>Get up and running in no-time, using either a package manager, standalone installer or the official Docker image.</p>
    </a>
    <a href={{< relref "./get-started/running-k6" >}} class="nav-cards__item nav-cards__item--guide">
        <h4>🏎️💨 Running k6</h4>
        <p>Write and execute your first load test locally using JavaScript and the k6 API, adding multiple virtual users, checks and ramping stages.</p>
    </a>
    <a href={{< relref "./get-started/results-output" >}} class="nav-cards__item nav-cards__item--guide">
        <h4>⏱ Results output</h4>
        <p>Learn how to leverage the results output to gain actionable insight about your application's performance.</p>
    </a>
</div>

## What is k6?

Grafana k6 is an open-source load testing tool that makes performance testing easy and productive for engineering teams.
k6 is free, developer-centric, and extensible.

Using k6, you can test the reliability and performance of your systems and catch performance regressions and problems earlier.
k6 will help you to build resilient and performant applications that scale.

k6 is developed by [Grafana Labs](https://grafana.com/) and the community.

Watch the video below to learn more about k6 and why it could be the missing puzzle in your Grafana stack.

{{< youtube id="1mtYVDA2_iQ" >}}

## Key features

k6 is packed with features, which you can learn all about in the documentation.
Key features include:

- [CLI tool](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options/how-to) with developer-friendly APIs.
- Scripting in JavaScript ES2015/ES6 - with support for [local and remote modules](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules)
- [Checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks) and [Thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds) - for goal-oriented, automation-friendly load testing

## Use cases

k6 users are typically Developers, QA Engineers, SDETs, and SREs.
They use k6 for testing the performance and reliability of APIs, microservices, and websites.
Common k6 use cases are:

- **Load testing**

  k6 is optimized for minimal resource consumption and designed for running high load tests
  ([spike](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing), [stress](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing), [soak tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing)).

- **Browser testing**

  Through [k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser), you can run browser-based performance testing and catch issues related to browsers only which can be skipped entirely from the protocol level.

- **Chaos and resilience testing**

  You can use k6 to simulate traffic as part of your chaos experiments, trigger them from your k6 tests or inject different types of faults in Kubernetes with [xk6-disruptor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor).

- **Performance and synthetic monitoring**

  With k6, you can automate and schedule to trigger tests very frequently with a small load to continuously validate the performance and availability of your production environment. You can also use [Grafana Cloud Synthetic Monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/) for a managed solution built specifically for synthetic monitoring that supports k6 test scripts.

## Load Testing Manifesto

Our load testing manifesto is the result of having spent years hip deep in the trenches, doing performance- and load testing.
We’ve created it to be used as guidance, helping you in getting your performance testing on the right track!

- [Simple testing is better than no testing](https://k6.io/our-beliefs/#simple-testing-is-better-than-no-testing)
- [Load testing should be goal oriented](https://k6.io/our-beliefs/#load-testing-should-be-goal-oriented)
- [Load testing by developers](https://k6.io/our-beliefs/#load-testing-by-developers)
- [Developer experience is super important](https://k6.io/our-beliefs/#developer-experience-is-super-important)
- [Load test in a pre-production environment](https://k6.io/our-beliefs/#load-test-in-a-pre-production-environment)

## What k6 does not

k6 is a high-performing load testing tool, scriptable in JavaScript. The architectural design to have these capabilities brings some trade-offs:

- **Does not run natively in a browser**

  By default, k6 does not render web pages the same way a browser does.
  Browsers can consume significant system resources.
  Skipping the browser allows running more load within a single machine.

  However, with [k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser), you can interact with real browsers and collect frontend metrics as part of your k6 tests.

- **Does not run in NodeJS**

  JavaScript is not generally well suited for high performance.
  To achieve maximum performance, the tool itself is written in Go, embedding a JavaScript runtime allowing for easy test scripting.

  If you want to import npm modules or libraries using NodeJS APIs, you can [bundle npm modules with webpack](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/modules#bundling-node-modules) and import them in your tests.
