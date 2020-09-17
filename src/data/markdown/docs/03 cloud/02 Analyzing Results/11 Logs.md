---
title: 'Logs'
excerpt: 'Cloud logs and Troubleshooting'
---

## Background

The logs functionality is currently in Beta, and it will be available natively in k6 0.28.0 (planned release September 2020).

Logs are also viewable directly in the frontend app in the Logs tab. Additionaly, logs can be viewed in real-time using the `k6cloudlogs` command-line utility.

Logs are intended to aid you in troubleshooting your script. The logs are deleted 3 days after the test execution.

## Installation

`k6cloudlogs` binaries for Linux, Windows and macOS can be found here: https://github.com/loadimpact/k6cloudlogs/releases/


## Using k6cloudlogs CLI


```bash
Usage of ./k6cloudlogs:
  -id string
        test run id
  -level string
        lowest logging level to return events for (info assumes error, etc.) (default "info")
  -limit string
        maximum amount of messages to be in a response from the server (default "100")
  -start string
        from how long ago to start tailing (default "5m")
  -token string
        k6 Cloud authentication token
```

Setting the token can also be done from the environment variable `K6_CLOUD_TOKEN`.

## Basic example

To tail the execution logs from your cloud test in real-time you have to provide a test run ID and your API token like this:

```bash
K6_CLOUD_TOKEN=<YOUR_API_TOKEN> ./k6cloudlogs -id 127855
```

You can find your API token in https://app.k6.io/account/api-token.

The output should look similar to this:

![Example output](/images/11-Cloud-Logs/cloud-logs-example-output.png)


## Fetching logs from the past

By default, the `k6cloudlogs` utility fetches logs in real-time. This means that you need to have it running when your test is executing.
If you would like to retrieve logs from the past, you need to provide a `-start` parameter.

For example:

```bash
K6_CLOUD_TOKEN=YOUR_API_TOKEN ./k6cloudlogs -id 127855 -start 55m -limit 1000
```

This command will retrieve 1000 log lines from 55 minutes ago. Note, only 1000 lines will be printed. The limit for the `-limit` parameter is about 1500.
If you would like to view more logs, you will have to execute this command several times with a different `-start` parameter.

This limitation may be removed in the future.
