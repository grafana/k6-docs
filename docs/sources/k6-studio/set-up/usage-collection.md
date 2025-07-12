---
title: 'Usage collection'
description: 'Learn what data k6 Studio collects and stores'
weight: 300
---

# Usage collection

By default, k6 Studio sends anonymous usage reports, as well as crash reports and error data, so that we can track how users are using the product and its features. We use that information to prioritize the roadmap with the features that will benefit a majority of users, and reduce the impact of any changes we make. The data doesn't contain any information about you or what you are testing.

The contents included in the usage report are:

- The running program's operating system (`mac`, `win`, or `linux`).
- The running program's architecture (`arm64` or `x86_64`).
- The k6 Studio version (for example, `1.4.0`).
- The timestamp of when the data was collected (for example, `2024-10-22T16:02:56.261Z`).

We use [Sentry](https://sentry.io/) to collect crash reports and error data. That includes:

- The running program's operating system name, version, kernel version, and build (for example, macOS or Windows).
- The running program's device information, including: architecture, boot time, CPU description, memory size, free memory, processor count and frequency, screen resolution.
- The running program's details, including: architecture, application name, memory usage, start time, and version.
- The timestamp of when the data was collected (for example, `2024-10-22T16:02:56.261Z`).
- The browser name and version (`Chrome`).
- The device's locale and timezone (for example, `en-US` and `Europe/London`).

Grafana k6 is bundled with k6 Studio, and it collects and sends an anonymous usage report. For more details about the Grafana k6 data that's collected, refer to [Usage collection](https://grafana.com/docs/k6/latest/set-up/usage-collection/).

- [Grafana Labs Privacy Policy](https://grafana.com/legal/privacy-policy/)
- [Sentry Privacy Policy](https://sentry.io/privacy/)
