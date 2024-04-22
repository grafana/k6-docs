---
title: 'Grafana Cloud k6'
description: 'When streaming the results to the cloud, the machine - where you execute the k6 CLI command - runs the test and uploads the results to the cloud. Then, you will be able to visualize and analyze the results on the web app in real-time.'
weight: 00
---

# Grafana Cloud k6

Besides [running cloud tests](https://grafana.com/docs/k6/<K6_VERSION>/get-started/running-k6#execution-modes), you can also run a test locally and stream the results to [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/#run-locally-and-stream-to-the-cloud).

When streaming the results to the cloud, the machine - where you execute the k6 CLI command - runs the test and uploads the results to the cloud-based solution. Then, you will be able to visualize and analyze the results on the web app in real-time.

## Streaming results vs. running on cloud servers

Don't confuse `k6 run --out cloud script.js` (what this page is about) with `k6 cloud script.js`.

Fundamentally the difference is the machine that the test runs on:

- `k6 run --out cloud` runs k6 locally and streams the results to the cloud.
- `k6 cloud`, on the other hand, uploads your script to the cloud solution and runs the test on the cloud infrastructure. In this case you'll only see status updates in your CLI.

In all cases you'll be able to see your test results at [k6 Cloud](https://app.k6.io) or [Grafana Cloud](https://grafana.com/products/cloud/).

{{% admonition type="caution" %}}

Data storage and processing are primary cloud costs,
so `k6 run --out cloud` will consume VUH or test runs from your subscription.

{{% /admonition %}}

## Instructions

1. (Optional) - Log in to the cloud

   Assuming you have installed k6, the first step is to log in to the cloud service.

   With the `k6 login cloud` command, you can set up your API token on the k6 machine to authenticate against the cloud service.

   Copy your token from [k6 Cloud](https://app.k6.io/account/api-token) or [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/author-run/tokens-and-cli-authentication/) and pass it as:

   {{< code >}}

   ```bash
   $ k6 login cloud --token <YOUR_API_TOKEN>
   ```

   {{< /code >}}

1. Run the tests and upload the results

   Now, k6 will authenticate you against the cloud service, and you can use the `--out` option to send the k6 results to the cloud as:

   {{< code >}}

   ```bash
   $ k6 run --out cloud script.js
   ```

   {{< /code >}}

   Alternatively, you could skip the `k6 login cloud` command when passing your API token to the `k6 run` command as:

   {{< code >}}

   ```bash
   $ K6_CLOUD_TOKEN=<YOUR_API_TOKEN> k6 run --out cloud script.js
   ```

   {{< /code >}}

   After running the command, the console shows an URL. Copy this URL and paste it in your browser's address bar to visualize the test results.

   {{< code >}}

   ```bash
   execution: local
       output: cloud (https://acmecorp.grafana.net/a/k6-app/runs/123456)
       script: script.js
   ```

   {{< /code >}}

![Grafana Cloud k6 Test Results](/media/docs/k6-oss/screenshot-stream-k6-results-to-grafana-cloud-k6.png)

When you send the results to the k6 Cloud with `k6 run --out`, data will be
continuously streamed to the cloud. While this happens the state of the test run
will be marked as `Running`. A test run that ran its course will be marked
`Finished`. The run state has nothing to do with the test passing any
thresholds, only that the test itself is operating correctly.

If you deliberately abort your test (e.g. by pressing _Ctrl-C_), your test will
end up as `Aborted by User`. You can still look and analyze the test data you
streamed so far. The test will just have run shorter than originally planned.

Another possibility would be if you lose network connection with the cloud service
while your test is running. In that case the cloud service will patiently wait for
you to reconnect. In the meanwhile your test's run state will continue to
appear as `Running` on the web app.

If no reconnection happens, the cloud service will time out after two minutes of no
data, setting the run state to `Timed out`. You can still analyze a timed out
test but you'll of course only have access to as much data as was streamed
before the network issue.

## Advanced settings

A few [environment variables](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/environment-variables) can control how k6 streams results with `-o cloud`.

When streaming, k6 will collect all data and send it to the cloud in batches.

| Name                            | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `K6_CLOUD_METRIC_PUSH_INTERVAL` | How often to send data to the cloud (default `'1s'`). |

k6 can also _aggregate_ the data it sends to the cloud each batch. This
reduces the amount of data sent to the cloud. Aggregation is disabled by
default.

When using aggregation, k6 will collect incoming test data into time-buckets.
For each data-type collected in such a bucket, it will figure out the dispersion
(by default the [interquartile range][iqr]) around the median value.
Outlier data&mdash;far outside the lower and upper quartiles&mdash; is not aggregated, preventing the loss of potentially important testing information.

| Name                                          | Description                                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `K6_CLOUD_AGGREGATION_PERIOD`                 | >0s to activate aggregation (default disabled, `'3s'` is a good example to try)                            |
| `K6_CLOUD_AGGREGATION_CALC_INTERVAL`          | How often new data will be aggregated (default `'3s'`).                                                    |
| `K6_CLOUD_AGGREGATION_WAIT_PERIOD`            | How long to wait for period samples to accumulate before aggregating them (default `'5s'`).                |
| `K6_CLOUD_AGGREGATION_MIN_SAMPLES`            | If fewer samples than this arrived in interval, skip aggregation (default `100`).                          |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_RADIUS`     | Outlier sampling from median to use for Q1 and Q3 quartiles (fraction) (default `0.25` (i.e. [IQR][iqr])). |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_COEF_LOWER` | How many quartiles below the lower quartile are treated as non-aggregatable outliers (default `1.5`)       |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_COEF_UPPER` | How many quartiles above the upper quartile are treated as non-aggregatable outliers (default `1.3`)       |

> When running a test entirely in the cloud with `k6 cloud`, `k6` will always
> aggregate. For that case the aggregation settings are however set by the
> cloud infrastructure and are not controllable from the CLI.

[iqr]: https://en.wikipedia.org/wiki/Interquartile_range
