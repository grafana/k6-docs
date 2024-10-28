---
weight: 950
title: k6 Studio
hero:
  title: Grafana k6 Studio
  level: 1
  image: /media/docs/k6/GrafanaLogo_k6Studio_orange.svg
  width: 100
  height: 100
  description: Grafana k6 Studio is an open-source desktop application for Mac and Windows designed to help you generate k6 test scripts.
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
    - title: Troubleshooting
      href: ./troubleshooting/
      description: Troubleshoot common issues with k6 Studio.
      height: 24
---

{{< docs/hero-simple key="hero" >}}

---

## Overview

{{< admonition type="note" >}}

k6 Studio is in the [experimental stage](https://grafana.com/docs/release-life-cycle/). For bug reports or feedback, open an issue in the [k6 Studio GitHub repository](https://github.com/grafana/k6-studio/issues).

{{< /admonition >}}

k6 Studio is a desktop application that can help you:

- Record a user flow from browser interactions and generate a HAR file.
- Generate and customize a k6 test script from a HAR file, including the ability to use rules to quickly iterate on the script creation process.
- Test and debug k6 scripts using a visual interface. Inspect the request and response details for any request in your script.

Visit the [k6 Studio GitHub repository](https://github.com/grafana/k6-studio/) for more information and to download the application.

## Explore

{{< card-grid key="cards" type="simple" >}}
