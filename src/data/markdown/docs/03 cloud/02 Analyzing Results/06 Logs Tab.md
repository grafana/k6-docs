---
title: 'Inspect logs'
slug: '/cloud/analyzing-results/logs'
excerpt: 'With the Logs tab, you can view and filter console logs.'
---

Logging messages can help you debug load tests.

## Supported log methods

The k6 API supports the following console-logging methods:

- `console.log()`
- `console.info()`
- `console.debug()`
- `console.warn()`
- `console.error()`

> **Note**: `console.debug()` will log output only when you run k6 with the `-v/--verbose` flag.

Logs can help you troubleshoot your test execution.

> **Tip: Debug locally first**
>
> When your script is ready, execute the test on the k6 Cloud with the `k6 cloud` command.

## Explore logs in k6 cloud results.

With the **Logs** Tab, you can view, filter, and query log messages in the Cloud Results page.

![Cloud Logs Tab](./images/11-Cloud-Logs/cloud-logs-output-messages.png)

Beyond reading log messages, you can also use the log panel to find contextual information, such as:

- The log date in the local time zone
- The load zone. The geographic zone where the load generator is.
- The instance ID. The numerical ID of the load generator taking part in the test.

Refer to [how the k6 Cloud injects environment variables](/cloud/creating-and-running-a-test/cloud-scripting-extras/cloud-environment-variables) for further information about the load zone and instance ID.

### Filter by log level and load zone

To filter messages by severity:
1. Use the **Log level** dropdown.
1. Order each JavaScript log statement by the severity level however you want:

  - **Info**: `console.log` and `console.info`.
  - **Debug**: `console.debug`.
  - **Warning**: `console.warning`.
  - **Error**: `console.error`.


The load-zone filter displays only when your test runs in more than one load zone.

![Cloud Logs Tab with Filter](./images/11-Cloud-Logs/cloud-logs-output-messages-with-filter.png)

### Querying logs

After a test run finishes, you can start querying the logs.
The query outputs messages that contain the string you've specified in the input.

![Cloud Logs Tab with Query](./images/11-Cloud-Logs/cloud-logs-output-messages-with-query.png)

## Logging limitations

While logs help you debug, they *should not* replace k6 API functions.
It is **often an anti-pattern** to use `logs` in the following ways:

- Track the status of a condition. Instead, use [Checks](/javascript-api/k6/check) to assert these conditions.
- Track a variable value during the test execution. Instead, use the [Trend](/javascript-api/k6-metrics/trend) metric.

However, you also *should not* rely on logging to interpret or analyze the performance of your system.

For this reason, the cloud logs have some limitations:

- The logs are deleted three days after the test execution.
- The number of log lines is limited to 10 messages per second per server. If this limit is exceeded, k6 shows a warning with the number of discarded log lines.

![Cloud Logs Tab Drop Message](./images/11-Cloud-Logs/cloud-logs-output-drop-messages.png)

## Cloud logs on the CLI

k6 aims to have a consistent experience when running local and cloud tests.

When running cloud tests with the CLI (`k6 cloud`), k6 prints cloud logs on standard output, like it would with your local tests.

![Cloud Logs Tab in CLI](./images/11-Cloud-Logs/cloud-logs-cli-output.png)

To silence logs from printing on the terminal, add the `--show-logs=false` flag.

