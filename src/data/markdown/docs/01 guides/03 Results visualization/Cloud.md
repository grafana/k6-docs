---
title: 'Cloud'
excerpt: ''
---
Besides [running cloud tests](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli), you can also stream your test results in real-time to the [k6 Cloud](/cloud).

The k6 Cloud will pre-process your data, and you can visualize and analyze the results on the web app.

## Instructions

**1 (Optional) - Log in to the k6 Cloud**

Assuming you have installed k6, the first step is to log in to k6 Cloud. You can use your [API token](https://app.k6.io/account/api-token) or username and password:

<div class="code-group" data-props='{"labels": ["Log in to k6 Cloud", "Log in with username and password"]}'>

```shell
$ k6 login cloud --token <YOUR_K6_CLOUD_API_TOKEN>
```

```shell
$ k6 login cloud
```

</div>

**2 - Run the tests and upload the results**

Now, k6 will authenticate you against the k6 Cloud, and you can use the `--out` option to send the k6 results to the k6 Cloud as:

<div class="code-group" data-props='{"labels": ["Upload results to the k6 Cloud"]}'>

```shell
$ k6 run --out cloud script.js
```

</div>

Alternatively, you could skip the  `k6 login` command when using your [API token](https://app.k6.io/account/api-token) with the `k6 run` command as:

<div class="code-group" data-props='{"labels": ["Upload results to the k6 Cloud using K6_CLOUD_TOKEN"]}'>

```shell
$ K6_CLOUD_TOKEN=<YOUR_K6_CLOUD_API_TOKEN> k6 run --out cloud script.js
```

</div>


After running the command, the console shows an URL. Copy this URL and paste it in your browser's address bar to visualize the test results.

<div class="code-group" data-props='{"labels": []}'>

```shell
execution: local
    output: cloud (https://app.k6.io/runs/721751)
    script: script.js
```

</div>

![k6 Cloud Test Results](/images/k6-cloud-results.png)

## See also

-  [Analyzing results on the k6 Cloud](/cloud/analyzing-results/overview)
-  [Running cloud tests](/cloud/creating-and-running-a-test/cloud-tests-from-the-cli)
-  [Cloud test run status - Uploading results](/cloud/cloud-faq/test-status-codes#uploading-results)
