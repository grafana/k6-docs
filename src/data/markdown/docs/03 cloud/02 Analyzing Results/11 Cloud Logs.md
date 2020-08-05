---
title: 'Cloud Logs'
excerpt: 'Execution logs and Troubleshooting'
---

## Background

The execution logs functionality is currently in Beta (not guaranteed to be stable). Execution logs will be available natively in k6 0.28.0 (planned release September 2020).

The logs will also be viewable directly in the frontend app in the "Execution logs" tab (planned release: August 15). Meanwhile, logs can be viewed in real-time using the "k6cloudlogs" command-line utility.

The execution logs are intended to aid you in troubleshooting your script. The logs are deleted 3 days after the test execution.

## Installation

k6cloudlogs binaries for Linux, Windows and MacOS can be found here: https://github.com/loadimpact/k6cloudlogs/releases/


## Using k6cloudlogs CLI utility


```text
Usage of ./k6cloudlogs:
  -id string
    	test run id
  -level string
    	the info (default "info")
  -limit string
    	how many messages should be fetched (default "100")
  -start string
    	from how long ago to start tailing (default "5m")
  -token string
    	the k6 cloud API token
```

## Basic example

To tail the execution logs from your cloud test in real-time you have to provide a testrunid and your API token like this:

```bash
./kcloudlogs -id 127855 -token YOUR_API_TOKEN
```

You can find your API token in https://app.k6.io/account/api-token. 

The output should look similar to this:

![Example output](/images/11%PCloug%Logs/cloud-logs-example-output.png)


## Fetching logs from the past

By default, the k6cloudlogs utility fetches logs in real-time. This means that you need to have it running when your test is executing.
If you would like to retrieve logs from the past, you need to provide a `-start` parameter. 

For example:

```bash
./kcloudlogs -id 127855 -token YOUR_API_TOKEN -start 55m -limit 1000
```

This command will retrieve 1000 log lines from 55 minutes ago. Note, only 1000 lines will be printed. The limit for the `-limit` parameter is about 1500. 
If you would like to view more logs, you will have to execute this command several times with different `-start` parameter. 

This limitation may be removed in the future.

