---
title: 'Logs Tab'
excerpt: 'The Logs tab allows you to view console logs'
---

## Logging

> ⚠️ **New in v0.28.0**
>
> This feature is new as of version `0.28.0` and is currently in Beta.

Developers often log messages when debugging their load tests to ensure the test works correctly or view variable values.

The k6 API supports the following console logging methods:

- `console.log()`
- `console.info()`
- `console.debug()`
- `console.warn()`
- `console.error()`


Logs can aid you in troubleshooting your test execution. But they should NOT replace the functionality of other k6 APIs.

For example, it is often an **antipattern** to use `logs` to:
-  Track the status of a condition. Instead, use [Checks](/javascript-api/k6/check-val-sets-tags) to assert these conditions.
-  Track a variable value during the test execution. Instead, use the [Trend](/javascript-api/k6-metrics/trend) metric.

> **Tip**
> 
> To develop and debug your load tests, we recommend, in most cases, running your tests locally - using the **`k6 run`** command.
>
> When your script is ready, execute the test on the k6 Cloud with the `k6 cloud` command.

## Logs Tab

The Logs Tab allows you to view and filter log messages in the Cloud Results page.

![Cloud Logs Tab](/images/11-Cloud-Logs/cloud-logs-output-messages.png)

The Logs panel shows the log message at the right side, and additionaly,  some extra debug information. This information refers to the machine executing the script:

- Log date
- Load zone: the geographic zone where the load generator server is running
- Instance ID: ID of the load generator server taking part in the test

See [how the k6 Cloud injects environment variables](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli#environment-variables) for further information about the load zone and instance ID.

### Filter by log level

Each Javascript log statement has assigned a severity level:
- **Info**:  `console.log` and `console.info`.
- **Debug**: `console.debug`.
- **Warning**: `console.warning`.
- **Error**: `console.error`.

If you use different logging levels in your tests, you can filter out messages by the severity level with the Log Level Filter menu.

![Cloud Logs Tab with Filter](/images/11-Cloud-Logs/cloud-logs-output-messages-with-filter.png)

## Logging limitations

Logs are intended to help you finding anomalies or issues during the execution of your test. But you should NOT rely on logging to interpret or analyze the performance of your systems. 

For this reason, Cloud logs has - on purpose - some limitations:
- The k6 Cloud deletes logs 3 days after the test execution.
- The k6 Cloud does not store more than 10 messages per second. But it will show the number of discarded messages.

![Cloud Logs Tab Drop Message](/images/11-Cloud-Logs/cloud-logs-output-drop-messages.png)

## Cloud logs on the CLI

k6 aims to have a seamless experience when running local or cloud tests. 

When running cloud tests using the CLI (`k6 cloud`), k6 will print cloud logs on the standard output as it does with your local tests.

```shell
$k6 cloud script.js

INFO[0141] 0                instance_id=0 lz="amazon:us:ashburn" source=console test_run_id=816598
INFO[0141] 1                instance_id=0 lz="amazon:us:ashburn" source=console test_run_id=816598
INFO[0142] 2                instance_id=0 lz="amazon:us:ashburn" source=console test_run_id=816598
INFO[0142] 3                instance_id=0 lz="amazon:us:ashburn" source=console test_run_id=816598
INFO[0143] 4                instance_id=0 lz="amazon:us:ashburn" source=console test_run_id=816598
```





Next, [Test Comparison](/cloud/analyzing-results/test-comparison)