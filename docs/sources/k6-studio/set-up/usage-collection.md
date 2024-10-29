---
title: 'Usage collection'
description: 'Learn what data k6 Studio collects and stores'
weight: 300
---

# Usage collection

By default, k6 Studio sends an anonymous usage report so that we can track how users are using the product and its features. We use that information to prioritize the roadmap with the features that will benefit a majority of users, and reduce the impact of any changes we make.

The usage report doesn't contain any information about you or what you are testing. The contents included in the report are:

- The running program’s operating system (`mac` or `win`).
- The running program’s architecture (`arm64` or `x86_64`).
- The k6 Studio version (for example, `0.4.0`).
- The timestamp of when the data was collected (for example, `2024-10-22T16:02:56.261Z`).

Grafana k6 is also bundled with k6 Studio, and it also collects and sends an anonymous usage report. For more details about the Grafana k6 data that's collected, refer to [Usage collection](https://grafana.com/docs/k6/latest/set-up/usage-collection/).
