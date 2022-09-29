---
title: 'Cloud tests from the CLI'
excerpt: 'How to run cloud tests from the k6 CLI.'
---

Running k6 tests from the web application helps you get a feel for the tool or build a proof of concept.
For regular use, however, you'll probably prefer to run cloud tests from the command line.

Testers have many reasons they might prefer to run tests from the CLI:
- To store tests in version control
- To modularize scripts for collaboration and easier maintenance.
- To work in the local environment.
- To integrate testing in CI/CD pipelines.

## Instructions

1. First, you need to have a k6 Cloud account. If you don't have one, [sign up](https://app.k6.io/account/register) and get 50 cloud tests with the Free Trial.
1. [Install k6](/getting-started/installation).
1. Authenticate to k6 Cloud from the CLI. To log in, either use your username and password or your [API token](https://app.k6.io/account/api-token).

   <CodeGroup labels={["Log in with username and password", "Log in with the API Token"]}>

   ```bash
   $ k6 login cloud
   ```

   ```bash
   $ k6 login cloud --token <YOUR_K6_CLOUD_API_TOKEN>
   ```

   </CodeGroup>

   `k6 login` stores your API Token in a local config file to authenticate to k6 Cloud when running cloud commands.
   Unless running tests on multiple cloud accounts, you need to run `k6 login` only once.

1. Run your test in the cloud. (`k6 cloud` automatically uploads your script and any dependencies to our cloud).

   <CodeGroup labels={["CLI", "CLI with the API Token", "Docker"]}>

   ```bash
   $ k6 cloud script.js
   ```

   ```bash
   # Setting the K6_CLOUD_TOKEN environment variable let skipping the step that runs the k6 login command
   $ K6_CLOUD_TOKEN=<YOUR_K6_CLOUD_API_TOKEN> k6 cloud script.js
   ```

   ```bash
   # Note the difference in specifying the `K6_CLOUD_TOKEN` environment variable
   # using the `docker run -e` option.

   $ docker run --rm -i -e K6_CLOUD_TOKEN=<YOUR_K6_CLOUD_API_TOKEN> grafana/k6 cloud - <script.js

   # When passing the script via stdin there is no way for the containerized k6 process

   # to get the script filename, which is required for cloud execution. To solve this issue:

   # a) specify the `options.ext.loadimpact.name` property in the script:

   # export let options = {

   # ext: {

   # loadimpact: {

   # name: 'My awesome test',

   # },

   # },

   # };

   # b) mount the local filesystem as a Docker volume:

   $ docker run --rm -i -e ... -v "$PWD/script.js:/script.js" grafana/k6 cloud /script.js
   ```

   </CodeGroup>

   You'll see k6 print some information and the URL of your test results.

    <CodeGroup labels={[""]}>

    ```bash
            /\      |‾‾|  /‾‾/  /‾/
       /\  /  \     |  |_/  /  / /
      /  \/    \    |      |  /  ‾‾\
     /          \   |  |‾\  \ | (_) |
    / __________ \  |__|  \__\ \___/ .io

    execution: cloud
    script: test.js
    output: https://app.k6.io/runs/TEST_RUN_ID
    ```

    </CodeGroup>

1. Navigate to the URL to check your test results. When the test is running, the test-result page is shown.

    ![k6 Cloud Test Results](./images/Running-a-test-from-the-CLI/api-testing.png 'k6 Cloud Test Results')

    Learn more about test results on [Analyzing Results](/cloud/analyzing-results/overview).

<Collapsible title="Run tests on multiple cloud accounts">

### Run tests on multiple cloud accounts

If you have multiple cloud subscriptions, use your API token to change between subscriptions.
One way to do this is with environment variables:

```bash
K6_CLOUD_TOKEN k6 cloud script.js 
```

Another way is to toggle between config files with the `--config` flag.

```bash
k6 cloud --config nondefault/location/config.json script.js
```

For syntax examples and default config locations, refer to the [`--config` option reference](/using-k6/k6-options/reference#config).

</Collapsible>


## Cloud execution options

All [k6 Options](/using-k6/k6-options), such as `--vus` and `--duration`, are the same between the `k6 run` and `k6 cloud` commands.
k6 aims to run the same script in different execution modes without making any script modifications.

However, you can set some cloud-specific options for your script.

**All cloud options are optional.**

```javascript
export const options = {
  ext: {
    loadimpact: {
      name: 'Hello k6 cloud!',
      projectID: 123456,
      staticIPs: true,
      distribution: {
        distributionLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        distributionLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
      note: 'Anything that may be worth noting about your test.',
    },
  },
};
```

| Name                  | Default                                                                                          | Description                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name (string)         | The name of the main script file, so something like "script.js".                       | The name of the test in the k6 Cloud UI. Test runs with the same name will be grouped together.                                                                                                                                     |
| projectID (number)    | It is empty by default.                                                                | The ID of the project to which the test is assigned in the k6 Cloud UI. That's in the default project of the user's default organization.                                                                                           |
| distribution (object) | The equivalent of `someDefaultLabel: { loadZone: "amazon:us:ashburn", percent: 100 }`. | How the traffic should be distributed across existing [Load Zones](#load-zones). The keys are string labels that will be injected as [environment variables](#injected-environment-variables-on-the-cloud-execution).               |
| staticIPs (boolean)   | `false` by default                                                                     | When set to `true` the cloud system will use dedicated IPs assigned to your organization to execute the test.                                                                                                                       |
| note (string)         | Empty by default.                                                                      | Notes regarding the test, changes made, or anything that may be worth noting about your test. |
| deleteSensitiveData (boolean) | False by default  | If set to `true`, k6 deletes sensitive data as soon as the test starts running or, if still queued, when the test aborts. Sensitive data includes scripts, HAR files, archives, and APM credentials. |

> **Note**:
> The `deleteSensitiveData` option is unavailable in default subscriptions.
> If you want to activate it, contact our CS team at support@k6.io.

### Running tests under a different project than your default one

As a rule, tests and test runs are created and run under your default project in your default organization.

To create and run tests under a different project, like one you've been invited to, you must pass the `Project ID` to k6.

Select the project on the sidebar menu.
Then find the `Project ID` in the header of the Project Dashboard page.

![k6 Cloud Project ID](./images/Running-a-test-from-the-CLI/dashboard-project-id.png 'Project ID')

You can pass the Project ID to k6 in two ways:

- Specify it in the script options:

   <CodeGroup labels={["script.js"]} lineNumbers={[true]}>

   ```javascript
   export const options = {
     ext: {
       loadimpact: {
         projectID: 123456,
       },
     },
   };
   ```

   </CodeGroup>

- Set the `K6_CLOUD_PROJECT_ID` environment variable when running your test.


## Run locally and stream to the cloud

At times, you might want to run a test locally, but see the results on k6 Cloud.
For example, you may want to test a local environment that is not connected to the wider internet.

To do, this you can use `k6 run -out cloud`.
For detailed instructions, refer to [Results visualization](/results-output/real-time-metrics/cloud/).

<Blockquote mod="attention"
title="k6 charges your subscription for cloud streaming"
>

Data storage and processing are primary cloud costs,
so `k6 run --out cloud` will consume VUh or test runs from your subscription.

</Blockquote>

## Load zones

<div id="list-of-supported-load-zones">Here the list of supported AWS cloud regions: </div>

<Glossary>

- Africa (Cape Town) `amazon:sa:cape town`
- Asia Pacific (Hong Kong) `amazon:cn:hong kong`
- Asia Pacific (Mumbai) `amazon:in:mumbai`
- Asia Pacific (Osaka) `amazon:jp:osaka`
- Asia Pacific (Seoul) `amazon:kr:seoul`
- Asia Pacific (Singapore) `amazon:sg:singapore`
- Asia Pacific (Sydney) `amazon:au:sydney`
- Asia Pacific (Tokyo) `amazon:jp:tokyo`
- Canada (Montreal) `amazon:ca:montreal`
- Europe (Frankfurt) `amazon:de:frankfurt`
- Europe (Ireland)  `amazon:ie:dublin`
- Europe (London) `amazon:gb:london`
- Europe (Milan) `amazon:it:milan`
- Europe (Paris)  `amazon:fr:paris`
- Europe (Stockholm) `amazon:se:stockholm`
- Middle East (Bahrain) `amazon:bh:bahrain`
- South America (São Paulo) `amazon:br:sao paulo`
- US West (N. California) `amazon:us:palo alto`
- US West (Oregon) `amazon:us:portland`
- US East (N. Virginia) `amazon:us:ashburn`
- US East (Ohio) - **DEFAULT** `amazon:us:columbus`

</Glossary>

## Cloud execution tags

[Tags](/using-k6/tags-and-groups) provide great flexibility to slice and dice the test-result data.

When a test runs in k6 Cloud, k6 adds two tags to all metrics:

| Tag name      | Type   | Description                                                                                          |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `load_zone`   | string | The load zone from where the metric was collected. Values are in the form: `amazon:us :ashburn`. |
| `instance_id` | number | A unique number that represents the ID of a load-generator server taking part in the test.              |

The cloud tags are automatically added when collecting test metrics and work as regular tags.

For example, you can filter the results for a particular load zone in the k6 Cloud Results view.

![filter tags](./images/Running-a-test-from-the-CLI/analysis-tab-cloud-tags.png 'Cloud execution tags')

Or define a [Threshold](/using-k6/thresholds#thresholds-on-sub-metrics-tagged-metrics) based on the results of a load zone.

<CodeGroup labels={["Threshold based on a cloud execution tag"]}>

```javascript
import http from 'k6/http';

export const options = {
  vus: 50,
  duration: '30s',
  thresholds: {
    'http_req_duration{load_zone:amazon:us:ashburn}': ['p(95)<500'],
    'http_req_duration{load_zone:amazon:ie:dublin}': ['p(95)<800'],
  },
  ext: {
    loadimpact: {
      distribution: {
        ashburnDistribution: { loadZone: 'amazon:us:ashburn', percent: 50 },
        dublinDistribution: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
export default function () {
  http.get('https://test.k6.io/');
}
```

</CodeGroup>


## Cloud environment variables

When you run tests in k6 Cloud, you can use three additional environment variables to find out in which load zone, server instance, and distribution label the script is currently running.

| Name              | Value  | Description                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `K6_CLOUDRUN_LOAD_ZONE`    | string | The load zone from where the metric was collected. Values will be of the form: amazon:us :ashburn (see list above).                                      |
| `K6_CLOUDRUN_INSTANCE_ID`  | number | A sequential number representing the unique ID of a load generator server taking part in the test, starts at 0.                                          |
| `K6_CLOUDRUN_DISTRIBUTION` | string | The value of the "distribution label" that you used in `ext.loadimpact.distribution` corresponding to the load zone the script is currently executed in. |

You can read the values of these variables in your k6 script as usual.

<CodeGroup labels={["Reading injected environment variables"]}>

```javascript
export const options = {
  vus: 50,
  duration: '30s',
  ext: {
    loadimpact: {
      distribution: {
        ashburnDistribution: { loadZone: 'amazon:us:ashburn', percent: 50 },
        dublinDistribution: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
export default function () {
  if (__ENV.K6_CLOUDRUN_DISTRIBUTION === 'ashburnDistribution') {
    // do something
  } else if (__ENV.K6_CLOUDRUN_DISTRIBUTION == 'dublinDistribution') {
    // do something
  }
}
```

</CodeGroup>

<Blockquote mod="Attention" title="The LI_ prefix is deprecated">

Previously, cloud environment variables were prefixed with `LI_` (for example, `LI_LOAD_ZONE`).
These names are deprecated and may be removed in future versions of k6 Cloud.

</Blockquote>


## Differences between local and cloud execution

While the cloud and local execution modes are almost completely compatible, they differ in a few particularities.

### Iterations

Local execution supports iterations based on test length (`-i` or
`--iterations` on CLI, and `iterations` in script options), which is
not yet supported by the cloud-execution mode.

### Using setup/teardown life-cycle functions

Depending on the test size, the test might run from one or more cloud servers.

Setup and teardown, on the other hand, execute only once, and each will execute from only one server.
However, there's no guarantee that the cloud server that runs `setup()` will be the same one that runs `teardown()`.

Besides this quirk, your [setup and teardown life cycle functions](/using-k6/test-life-cycle) run as normal when running cloud tests.

### Disable cloud logs

When a cloud tests runs from the CLI,  cloud log output prints to the terminal.
To disable this, either pass `--show-logs=false` as an option to `k6`, or set an environment variable `K6_SHOW_CLOUD_LOGS=false`.

### System environment variables

Environment variables set in the local terminal before executing k6 won't be forwarded to the k6 cloud service.
Thus they won't be available to your script when executing in the cloud.
With cloud execution, you must use the CLI flags (`-e`/`--env`) to set environment variables like `-e KEY=VALUE` or `--env KEY=VALUE`.

For details, refer to the [environment variables](/using-k6/environment-variables) document.

