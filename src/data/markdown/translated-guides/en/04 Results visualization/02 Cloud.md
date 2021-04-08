---
title: 'Cloud'
excerpt: 'When streaming the results to the k6 Cloud, the machine - where you execute the k6 CLI command - runs the test and uploads the results to the k6 Cloud. Then, you will be able to visualize and analyze the results on the web app in real-time.'
---

Besides [running cloud tests](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli), you can also run a test locally and stream the results to the [k6 Cloud](/cloud).

When streaming the results to the k6 Cloud, the machine - where you execute the k6 CLI command - runs the test and uploads the results to the k6 Cloud. Then, you will be able to visualize and analyze the results on the web app in real-time.

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

> When you send the results to the k6 Cloud, data will be continuously streamed to the cloud. While this happens the state of the test run will be marked as `Running`. A test run that ran its course will be marked `Finished`. The run state has nothing to do with the test passing any thresholds, only that the test itself is operating correctly.
> 
> If you deliberately abort your test (e.g. by pressing _Ctrl-C_), it will still be considered `Finished`. You can still look and analyze the test data you streamed so far. The test will just have run shorter than originally planned.
> 
> Another possibility would be if you lose network connection with the k6 Cloud while your test is running. In that case the k6 Cloud will patiently wait for you to reconnect. In the meanwhile your test's run state will continue to appear as `Running` on the web app.
> 
> If no reconnection happens, the k6 Cloud will time out after two minutes of no data, setting the run state to `Timed out`. You can still analyze a timed out test but you'll of course only have access to as much data as was streamed before the network issue.

## See also

- [Analyzing results on the k6 Cloud](/cloud/analyzing-results/overview)
- [Running cloud tests](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli)
