---
weight: 950
title: k6 Studio
hero:
  title: Grafana k6 Studio
  level: 1
  image: /media/docs/k6/GrafanaLogo_k6Studio_orange.svg
  width: 100
  height: 100
  description: Grafana k6 Studio is an open-source desktop application for macOS, Windows, and Linux designed to help you generate k6 test scripts.
cards:
  title_class: pt-0 lh-1
  items:
    - title: Introduction
      href: ./introduction/
      description: An overview of k6 Studio and its components.
      height: 24
    - title: Installation
      href: ./set-up/install/
      description: Learn how to install k6 Studio.
      height: 24
    - title: Record your first script
      href: ./record-your-first-script/
      description: Get started with k6 Studio by recording a test, creating rules, and validating the generated script.
      height: 24
    - title: Components
      href: ./components/
      description: Understand how the Recorder, Generator, and Validator components work.
      height: 24
    - title: Troubleshoot
      href: ./troubleshoot/
      description: Troubleshoot common issues with k6 Studio.
      height: 24
cascade:
  labels:
    products:
      - oss
  breadcrumb_start: 4
  search_section: Grafana k6 Studio
  search_type: doc
  public_docs: true
  github_repo: https://github.com/grafana/k6-docs/
  github_branch: main
  github_dir: /docs/sources/k6-studio
  replace_dir: docs/k6-studio/
---

{{< docs/hero-simple key="hero" >}}

---

## Overview

{{< admonition type="note" >}}

k6 Studio is currently in [public preview](https://grafana.com/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the application being made generally available. For bug reports or feedback, open an issue in the [k6 Studio GitHub repository](https://github.com/grafana/k6-studio/issues).

{{< /admonition >}}

k6 Studio is a desktop application that can help you:

- Record a user flow from browser interactions and generate a HAR file.
- Generate and customize a k6 test script from a HAR file, including the ability to use rules to quickly iterate on the script creation process.
- Test and debug k6 scripts using a visual interface. Inspect the request and response details for any request in your script.

The scripts you create in k6 Studio can be used to run performance tests in [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/testing/k6/), or as k6 scripted checks in [Synthetic Monitoring](https://grafana.com/docs/grafana-cloud/testing/synthetic-monitoring/).

## Explore

{{< card-grid key="cards" type="simple" >}}
