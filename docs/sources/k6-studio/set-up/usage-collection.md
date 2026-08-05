---
title: 'Usage collection'
description: 'Learn what data k6 Studio collects and stores'
weight: 300
---

# Usage collection

By default, k6 Studio sends anonymous usage reports, as well as crash reports and error data, so that we can track how users are using the product and its features. We use that information to prioritize the roadmap with the features that will benefit a majority of users, and reduce the impact of any changes we make. The data doesn't contain any information about you or what you are testing.

A usage report includes the following information:

- The event name. Refer to the table below for a list of event names and details.
- The event payload - additional information about the event. Every event includes the boolean property `isLoggedIn`.
- The running program's operating system (`win`, `mac`, or `linux`).
- The running program's architecture (`arm64` or `x86_64`).
- The k6 Studio version (for example, `1.7.0`).
- The timestamp of when the data was collected (for example, `2024-10-22T16:02:56.261Z`).

| Event name                            | Description                                                                    | Event payload                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `app_installed`                        | k6 Studio is installed and opened for the first time                            |                                                                                       |
| `user_logged_in`                       | The user logs in to Grafana Cloud                                               |                                                                                       |
| `recording_created`                    | A new recording is created                                                      |                                                                                       |
| `recording_imported`                   | A recording is imported                                                         |                                                                                       |
| `generator_created`                    | A new generator is created                                                      |                                                                                       |
| `generator_updated`                    | An existing generator is updated                                                | The total number of test rules per rule type and the total number of disabled rules |
| `browser_test_created`                 | A new browser test is created                                                   |                                                                                       |
| `browser_test_updated`                 | An existing browser test is updated                                             |                                                                                       |
| `script_copied`                        | A script is copied into the clipboard                                          | Whether the script was copied from the Generator or the Debugger                    |
| `script_exported`                      | A script is exported                                                             | Whether the script is external (not created via k6 Studio)                          |
| `script_validated`                     | A script is validated                                                           | Whether the script is external (not created via k6 Studio)                          |
| `script_opened_external`              | A script created outside k6 Studio is opened in the Debugger                    |                                                                                       |
| `script_run_in_cloud`                  | A script is run in the cloud                                                     |                                                                                       |
| `assistant_sign_in_succeeded`         | The user signs in to Grafana Assistant                                          |                                                                                       |
| `autocorrelation_dialog_opened`       | The Autocorrelation dialog is opened                                            |                                                                                       |
| `autocorrelation_started`             | An Autocorrelation analysis is started                                          |                                                                                       |
| `autocorrelation_succeeded`           | An Autocorrelation analysis completes successfully                             |                                                                                       |
| `autocorrelation_partially_succeeded` | An Autocorrelation analysis partially succeeds                                 |                                                                                       |
| `autocorrelation_failed`              | An Autocorrelation analysis fails                                              |                                                                                       |
| `autocorrelation_aborted`             | An Autocorrelation analysis is aborted                                         | The status of the analysis when it was aborted                                      |
| `autocorrelation_errored`             | An Autocorrelation analysis errors                                             |                                                                                       |
| `test_setup_wizard_opened`            | The test setup wizard is opened                                                 |                                                                                       |
| `test_setup_wizard_completed`         | The test setup wizard is completed                                             |                                                                                       |
| `test_setup_wizard_dismissed`         | The user dismisses the test setup wizard to configure the test manually instead |                                                                                       |
| `test_setup_wizard_step_started`      | A step in the test setup wizard is started                                     | The step name                                                                        |
| `test_setup_wizard_step_finished`     | A step in the test setup wizard is finished                                    | The step name, outcome, and duration                                                |
| `test_setup_wizard_sign_up_clicked`   | The user clicks the sign-up link in the test setup wizard                      |                                                                                       |

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
