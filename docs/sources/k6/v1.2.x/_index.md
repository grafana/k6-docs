---
aliases:
  - /docs/k6/
description: 'The k6 documentation covers everything you need to know about k6 OSS, load testing, and performance testing.'
nmenuTitle: Grafana k6
title: Grafana k6
weight: -10
hero:
  title: Grafana k6
  level: 1
  image: /media/docs/k6/GrafanaLogo_k6_orange_icon.svg
  width: 100
  height: 100
  description: Grafana k6 is an open-source, developer-friendly, and extensible load testing tool. k6 allows you to prevent performance issues and proactively improve reliability.
cards:
  title_class: pt-0 lh-1
  items:
    - title: Run your first k6 test
      href: ./get-started/
      description: Learn how to install the k6 CLI, run your first k6 test, and view metric results in the terminal.
      height: 24
    - title: Using k6
      href: ./using-k6/
      description: Learn about k6 options and concepts such as thresholds, metrics, lifecycle hooks, and more.
      height: 24
    - title: Testing guides
      href: ./testing-guides/
      description: Discover how to plan and define your performance testing strategy with these guides.
      height: 24
    - title: k6 JavaScript API
      href: ./javascript-api/
      description: Explore the k6 APIs through their documentation and examples.
      height: 24
    - title: Explore k6 extensions
      href: ./extensions/
      description: Have a particular testing need? Find k6 extensions that extend the native k6 functionality.
      height: 24
    - title: k6 script examples
      href: ./examples/
      description: Learn how to write test scripts with this list of common k6 examples.
      height: 24
    - title: Grafana Cloud k6
      href: https://grafana.com/docs/grafana-cloud/testing/k6/
      description: Leverage the k6 OSS capabilities in Grafana Cloud, with built-in dashboards, insights into your application performance, and the ability to bring together teams in one place to resolve issues faster.
      height: 24
    - title: k6 Studio
      href: https://grafana.com/docs/k6-studio/
      description: Use the k6 Studio desktop application to quickly generate test scripts using a visual interface.
      height: 24
---

{{< docs/hero-simple key="hero" >}}

---

## Overview

Using k6, you can test the reliability and performance of your application and infrastructure.

k6 helps engineering teams prevent errors and SLO breaches, enabling them to build resilient and high-performing applications that scale.

Engineering teams, including Developers, QA Engineers, SDETs, and SREs, commonly use k6 for:

- **Load and performance testing**

  k6 is optimized for minimal resource consumption and designed for running high-load performance tests such as
  [spike](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/spike-testing), [stress](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/stress-testing), or [soak tests](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/soak-testing).

- **Browser performance testing**

  Through the [k6 browser API](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser), you can run browser-based performance tests and collect browser metrics to identify performance issues related to browsers. Additionally, you can mix browser tests with other performance tests to get a comprehensive view of your website's performance.

- **Performance and synthetic monitoring**

  You can schedule tests to run with minimal load very frequently, continuously validating the performance and availability of your production environment. For this, you can also use [Grafana Cloud Synthetic Monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/create-checks/checks/k6/), which supports running k6 scripts.

- **Automation of performance tests**

  k6 integrates seamlessly with CI/CD and automation tools, enabling engineering teams to [automate performance testing](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/automated-performance-testing/) as part of their development and release cycle.

- **Chaos and resilience testing**

  You can use k6 to simulate traffic as part of your chaos experiments, trigger them from your k6 tests or inject different types of faults in Kubernetes with [xk6-disruptor](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/xk6-disruptor).

- **Infrastructure testing**

  With [k6 extensions](https://grafana.com/docs/k6/<K6_VERSION>/extensions/), you can add support to k6 for new protocols or use a particular client to directly test individual systems within your infrastructure.

Watch the video below to learn more about k6 and why it could be the missing puzzle in your Grafana stack.

{{< youtube id="1mtYVDA2_iQ" >}}

TESTING AGAIN

## Explore

{{< card-grid key="cards" type="simple" >}}
