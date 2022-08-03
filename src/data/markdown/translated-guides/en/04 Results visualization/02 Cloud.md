---
title: 'Cloud'
excerpt: 'When streaming the results to the k6 Cloud, the machine - where you execute the k6 CLI command - runs the test and uploads the results to the k6 Cloud. Then, you will be able to visualize and analyze the results on the web app in real-time.'
---

Besides [running cloud tests](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli), you can also run a test locally and stream the results to the [k6 Cloud](/cloud).

When streaming the results to the k6 Cloud, the machine - where you execute the k6 CLI command - runs the test and uploads the results to the k6 Cloud. Then, you will be able to visualize and analyze the results on the web app in real-time.

<Blockquote mod="attention"
title="k6 charges your subscription for cloud streaming"
>

Data storage and processing are primary cloud costs,
so `k6 run --out cloud` will consume VUh or test runs from your subscription.

</Blockquote>


## Streaming results vs. running on cloud servers

Don't confuse `k6 run --out cloud script.js` (what this page is about) with `k6
cloud script.js`.

Fundamentally the difference is the machine that the test runs on:

- `k6 run --out cloud` runs k6 locally and streams the results to the cloud.
- `k6 cloud`, on the other hand, uploads your script to [k6 cloud](/cloud) and runs the test on the cloud infrastructure,
to run the
  In this case you'll only see status updates in your CLI.

In all cases you'll be able to see your test results at `https://app.k6.io`.

## Instructions

**1 (Optional) - Log in to the k6 Cloud**

Assuming you have installed k6, the first step is to log in to k6 Cloud. You can use your [API token](https://app.k6.io/account/api-token) or username and password:

<CodeGroup labels={["Log in to k6 Cloud", "Log in with username and password"]}>

```bash
$ k6 login cloud --token <YOUR_K6_CLOUD_API_TOKEN>
```

```bash
$ k6 login cloud
```

</CodeGroup>

**2 - Run the tests and upload the results**

Now, k6 will authenticate you against the k6 Cloud, and you can use the `--out` option to send the k6 results to the k6 Cloud as:

<CodeGroup labels={["Upload results to the k6 Cloud"]}>

```bash
$ k6 run --out cloud script.js
```

</CodeGroup>

Alternatively, you could skip the `k6 login` command when using your [API token](https://app.k6.io/account/api-token) with the `k6 run` command as:

<CodeGroup labels={["Upload results to the k6 Cloud using K6_CLOUD_TOKEN"]}>

```bash
$ K6_CLOUD_TOKEN=<YOUR_K6_CLOUD_API_TOKEN> k6 run --out cloud script.js
```

</CodeGroup>

After running the command, the console shows an URL. Copy this URL and paste it in your browser's address bar to visualize the test results.

<CodeGroup labels={[]}>

```bash
execution: local
    output: cloud (https://app.k6.io/runs/721751)
    script: script.js
```

</CodeGroup>

![k6 Cloud Test Results](./images/Cloud/k6-cloud-results.png)

When you send the results to the k6 Cloud with `k6-out`, data will be
continuously streamed to the cloud. While this happens the state of the test run
will be marked as `Running`. A test run that ran its course will be marked
`Finished`. The run state has nothing to do with the test passing any
thresholds, only that the test itself is operating correctly.

If you deliberately abort your test (e.g. by pressing _Ctrl-C_), your test will
end up as `Aborted by User`. You can still look and analyze the test data you
streamed so far. The test will just have run shorter than originally planned.

Another possibility would be if you lose network connection with the k6 Cloud
while your test is running. In that case the k6 Cloud will patiently wait for
you to reconnect. In the meanwhile your test's run state will continue to
appear as `Running` on the web app.

If no reconnection happens, the k6 Cloud will time out after two minutes of no
data, setting the run state to `Timed out`. You can still analyze a timed out
test but you'll of course only have access to as much data as was streamed
before the network issue.

## Advanced settings

A few [environment variables](/using-k6/environment-variables) can control how k6 streams results with `-o cloud`.

When streaming, k6 will collect all data and send it to the cloud in batches.

| Name | Description |
| ---- | ----------- |
| `K6_CLOUD_METRIC_PUSH_INTERVAL`               | How often to send data to the k6 cloud (default `'1s'`).                                        |

k6 can also _aggregate_ the data it sends to the k6 cloud each batch. This
reduces the amount of data sent to the cloud. Aggregation is disabled by
default.

When using aggregation, k6 will collect incoming test data into time-buckets.
For each data-type collected in such a bucket, it will figure out the dispersion
(by default the [interquartile range][iqr]) around the median value.
Outlier data&mdash;far outside the lower and upper quartiles&mdash; is not aggregated, preventing the loss of potentially important testing information.

| Name                                          | Description                                                                                              |
|---------------------------------------------- |----------------------------------------------------------------------------------------------------------|
| `K6_CLOUD_AGGREGATION_PERIOD`                 | >0s to activate aggregation (default disabled, `'3s'` is a good example to try) |
| `K6_CLOUD_AGGREGATION_CALC_INTERVAL`          | How often new data will be aggregated (default `'3s'`).                                                    |
| `K6_CLOUD_AGGREGATION_WAIT_PERIOD`            | How long to wait for period samples to accumulate before aggregating them (default `'5s'`).                |
| `K6_CLOUD_AGGREGATION_MIN_SAMPLES`            | If fewer samples than this arrived in interval, skip aggregation (default `100`).                          |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_RADIUS`     | Outlier sampling from median to use for Q1 and Q3 quartiles (fraction) (default `0.25` (i.e. [IQR][iqr])). |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_COEF_LOWER` | How many quartiles below the lower quartile are treated as non-aggregatable outliers (default `1.5`)                            |
| `K6_CLOUD_AGGREGATION_OUTLIER_IQR_COEF_UPPER` | How many quartiles above the upper quartile are treated as non-aggregatable outliers (default `1.3`)                            |

> When running a test entirely in the cloud with `k6 cloud`, `k6` will always
> aggregate. For that case the aggregation settings are however set by the
> cloud infrastructure and are not controllable from the CLI.

## Read more

- [Analyzing results on the k6 Cloud](/cloud/analyzing-results/overview)
- [Running cloud tests](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli)


[iqr]: https://en.wikipedia.org/wiki/Interquartile_range
