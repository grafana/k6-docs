---
title: 'Usage collection'
description: 'Learn what data k6 Studio collects and stores'
weight: 300
---

# Usage collection

By default, k6 Studio sends anonymous usage reports, as well as crash reports and error data, so that we can track how users are using the product and its features. We use that information to prioritize the roadmap with the features that will benefit a majority of users, and reduce the impact of any changes we make. The data doesn't contain any information about you or what you are testing.


A usage report includes the following information:

- The event name.
- The event payload - additional information about the event (every event includes the boolean property`isLoggedIn`).
- The running program's operating system (`win`, `mac`, or `linux`).
- The running program's architecture (`arm64` or `x86_64`).
- The k6 Studio version (for example, `1.5.0`).
- The timestamp of when the data was collected (for example, `2024-10-22T16:02:56.261Z`).

The following table lists the event names, their payload or properties, and the version in which each event was introduced:

| Event name           | Description                                           | Additional event properties       | Version introduced |
| -------------------- | ----------------------------------------------------- |---------------------------------- | ------------------ |
| `app_installed`      | k6 Studio is installed and opened for the first time  |                                   | 1.6.0              |
| `user_logged_in`     | The user logs in to Grafana Cloud                     |                                   | 1.6.0              |
| `recording_created`  | A new recording is created                            |                                   | 1.6.0              |
| `recording_imported` | A recording is imported                               |                                   | 1.6.0              |
| `generator_created`  | A new generator is created                            |                                   | 1.6.0              |
| `generator_updated`  | An existing generator is updated                      | `rules` - object containing the total number of test rules per rule type and the total number of disabled rules                     | 1.6.0              |
| `script_copied`      | A script is copied into the clipboard                 |                                   | 1.7.0              |
| `script_exported`    | A script is exported                                  |                                   | 1.6.0              |
| `script_validated`   |  A script is validated                                |                                   | 1.6.0              |
| `script_run_in_cloud`|  A script is run in the cloud                         |                                   | 1.6.0              |

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
