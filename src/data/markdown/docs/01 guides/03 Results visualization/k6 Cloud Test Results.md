---
title: "k6 Cloud Test Results"
excerpt: ""
---

## Insights introduction

We offer a SaaS solution for k6 results storage, analysis and trending. It is
called _[k6 Cloud Test Results](https://k6.io/cloud/)_. Test Results allows you to run
your load tests locally using k6 while streaming your results to [k6.io](https://k6.io)
where you can look at the test in real-time and also perform detailed results analysis.

As part of its SaaS solution, k6 Cloud also offers
[distributed execution from the cloud](/using-k6/cloud-execution), to run larger and/or
geographically distributed tests.

![k6 Cloud Test Results](/images/k6-cloud-results.png)

This means you can run your own load generator and test internal systems, but benefit from a more
powerful and convenient SaaS solution when you want to store, share and analyze test results.

You can also utilize the k6.io cloud to *execute* tests (but such tests will require that
the target system is reachable from the public Internet).

## Getting started with k6 and k6 Cloud Insights

- First you need to [create a k6.io account](https://app.k6.io/account/register)

- Once logged in, click the "CLI" link in the left menu (at the bottom).

![onboarding screen](/images/cli-get-started.png)

- Follow the instructions on screen to get k6 installed and setup for steaming test results.

![CLI Screen](/images/cli-instructions.png)

If you have already installed k6 you only need to make sure you have it configured with access to
your k6 Cloud API token. You do that by either running `k6 login cloud` and entering your k6 Cloud
account details or you set the `K6_CLOUD_TOKEN` to [your API token value](https://app.k6.io/account/api-token)
(you can also use the API token to login from the command-line using
`k6 login cloud -t <YOUR_API_TOKEN>`).

Don't forget to add `-o cloud` to specify that you want the test results streamed to Insights!


<div class="code-group" data-props='{ "labels": ["Linux & MacOS", "Docker"] }'>

```shell
$ K6_CLOUD_TOKEN=c3b391149764640ed7d51476cd34a947f0d0762552a5bae79ee10b07ee84c1f7 k6 run -o cloud script.js
```

```shell
$ docker run -i \
    -e "K6CLOUD_TOKEN=c3b391149764640ed7d51476cd34a947f0d0762552a5bae79ee10b07ee84c1f7" \
    loadimpact/k6 \
    run -o cloud - <script.js
```

</div>

Now your test should be running, and results should be streamed live to k6.io. k6 will output
something like this when it starts:

![k6 Cloud Test Results CLI Output](images/k6-cloud-output.png)

As you can see in the screen shot above, k6 will tell you that you can use the URL
`https://app.k6.io/runs/123` to go directly to the test result/analysis page where
results will be updated continuously throughout the test.

## Streaming results to a project other than the default one

By default tests and test runs will be created and run under your default project, in your default
organization. To create and run tests under a different project, whether under your default
organization or one you've been invited to, you have two options:

1. You can specify the project ID in the script options:

    <div class="code-group" data-props='{ "labels": [] }'>

    ```js
    export let options = {
      ext: {
        loadimpact: {
          projectID: 123456
        }
      }
    }
    ```

    </div>

2. You can set the `K6_CLOUD_PROJECT_ID` environment variable when running the test.

   You find the ID of a k6 Cloud project by selecting it in the UI and looking
   in the URL bar of your browser, the `12345` in `https://app.k6.io/projects/12345`
   is the project ID.

## Insight service run states

When you run a k6 test run against k6 Cloud Insights, data will be continuously streamed
to the cloud. While this happens the test's *run state* will be marked as `Running`. A test run
that ran its course will be marked `Finished`. The run state has nothing to do with the test
passing any of its checks, only that the test itself is operating correctly.

If you deliberately abort your test (e.g. by pressing *Ctrl-C*), it will still be considered
`Finished` by Insights. You can still look and analyze the test data you streamed so far. The test
will just have run shorter than originally planned.

Another possibility would be if you lose network connection with k6 Cloud Insights while your
test is running. In that case Insights will patiently wait for you to reconnect. In the meanwhile
your test's run state will continue to appear as `Running` on the Insights web overview. If no
reconnection happens,

Insights will time out after two minutes of no data, setting the run state to `Timed out`. You can
still analyze a timed out test but you'll of course only have access to as much data as was
streamed before the network issue.

## Aggregation

Since version 0.21.0, k6 supports partial aggregation of metrics streamed to k6 Cloud Test Results
for reduced bandwidth usage and processing times. To enable this, set the environment
variable `K6_CLOUD_AGGREGATION_PERIOD` to the aggregation period you want, for example `1s`. If
there are more than a certain number of HTTP metrics for a period (100 by default, but it can be
modified by setting `K6_CLOUD_AGGREGATION_MIN_SAMPLES`), they are partially aggregated. It is
important to note that outlier metrics are automatically detected and sent separately, they are
never aggregated.

## Cloud/Distributed execution

k6 also offers a commercial cloud service, k6 Cloud, for distributed execution of k6 tests. See
the [Cloud execution](/cloud) page for more information.

## More information

- [k6 Cloud Test Results at k6.io](https://k6.io/cloud)
- Detailed information about k6 Cloud Test Results [analysis/results view](/cloud)
