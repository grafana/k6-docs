---
title: 'Cloud tests from the CLI'
excerpt: 'How to run cloud tests from the k6 CLI.'
---

Running tests within the web app is helpful when getting a feel for the tool or
building a proof of concept. However, many users will find great flexibility
when using k6 to trigger cloud tests from the command line.

Reasons for triggering cloud tests from the k6 CLI include:

- Storing test scripts in local version control.
- Modularization of scripts for collaboration and easier maintenance.
- Preference to work in your local environment.
- Integrating testing in CI/CD pipelines.

## Instructions

1. First, you need to have a k6 Cloud account. If you don't have one, sign up [here](https://app.k6.io/account/register) and get 50 cloud tests with the Free Trial.

2. Install k6 using the instructions [here](/getting-started/installation).

3. Authenticate to k6 Cloud from the CLI. Log in using your username and password or your [API token](https://app.k6.io/account/api-token).

   <CodeGroup labels={["Log in with username and password", "Log in with the API Token"]}>

   ```bash
   $ k6 login cloud
   ```

   ```bash
   $ k6 login cloud --token <YOUR_K6_CLOUD_API_TOKEN>
   ```

   </CodeGroup>

   `k6 login` stores your API Token in a local config file to authenticate to k6 Cloud when running cloud commands.

4. Run your test in the cloud. (`k6 cloud` will upload your script and any dependencies to our cloud automatically) 

   <CodeGroup labels={["CLI", "Docker"]}>

   ```bash
   $ k6 cloud script.js
   ```

   ```bash
   # Note the difference in specifying the `K6_CLOUD_TOKEN` environment variable
   # using the `docker run -e` option.

   $ docker run -i -e K6_CLOUD_TOKEN=<API_TOKEN> grafana/k6 cloud - <script.js

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

   $ docker run -i -e ... -v "$PWD/script.js:/script.js" grafana/k6 cloud /script.js
   ```

   </CodeGroup>

5. You'll see k6 print some information and the URL of your test results.

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

6. Navigate to the URL to check your test results. When the test is running, the test result page is shown.

    ![k6 Cloud Test Results](./images/Running-a-test-from-the-CLI/api-testing.png 'k6 Cloud Test Results')

    Learn more about test results on [Analyzing Results](/cloud/analyzing-results/overview).

## Cloud execution options

All the [k6 Options](/using-k6/options), like `--vus` and `--duration` are the same between the `k6 run` and `k6 cloud` commands. k6 aims to run the same script in different execution modes without making any script modifications.

Optionally, you can define some cloud options in your k6 script.

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
| name (string)         | Optional. The name of the main script file, so something like "script.js".                       | The name of the test in the k6 Cloud UI. Test runs with the same name will be grouped together.                                                                                                                                     |
| projectID (number)    | Optional. It is empty by default.                                                                | The ID of the project to which the test is assigned in the k6 Cloud UI. That's in the default project of the user's default organization.                                                                                           |
| distribution (object) | Optional. The equivalent of `someDefaultLabel: { loadZone: "amazon:us:ashburn", percent: 100 }`. | How the traffic should be distributed across existing [Load Zones](#load-zones). The keys are string labels that will be injected as [environment variables](#injected-environment-variables-on-the-cloud-execution).               |
| staticIPs (boolean)   | Optional. `false` by default                                                                     | When set to `true` the cloud system will use dedicated IPs assigned to your organization to execute the test.                                                                                                                       |
| note (string)         | Optional. Empty by default.                                                                      | Notes regarding the test, changes made, or anything that may be worth noting about your test. |

### Running tests under a different project than your default one

As a rule, tests and test runs will be created and run under your default project, in your default organization.

To create and run tests under a different project, like one you've been invited to, you have to pass the `Project ID` to k6.

Select the project on the sidebar menu and you will find the `Project ID` in the header of the Project Dashboard page.

![k6 Cloud Project ID](./images/Running-a-test-from-the-CLI/dashboard-project-id.png 'Project ID')

You have two options to pass the Project ID to k6:

1. Specify it in the script options:

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

2. Set the `K6_CLOUD_PROJECT_ID` environment variable when running your test.

## Load zones

<div id="list-of-supported-load-zones">Here the list of supported AWS cloud regions: </div>

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
- US East (N. Virginia) - **DEFAULT** `amazon:us:ashburn`
- US East (Ohio) `amazon:us:columbus`


## Cloud execution tags

[Tags](/using-k6/tags-and-groups) is a powerful concept in k6 as it opens up for great flexibility in how you can slice and dice the result data.

When running a k6 test in the cloud we add two tags to all metrics:

| Tag name      | Type   | Description                                                                                          |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `load_zone`   | string | The load zone from where the metric was collected. Values will be of the form: `amazon:us :ashburn`. |
| `instance_id` | number | A unique number representing the ID of a load generator server taking part in the test.              |

The cloud tags are automatically added when collecting the test metrics, and they work as regular tags.

For example, you can filter the results for a particular load zone on the k6 Cloud Results view.

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

When running in the k6 Cloud there will be three additional environment variables that can be used to find out in which load zone, server instance, and distribution label the given script is currently running.

| Name              | Value  | Description                                                                                                                                              |
| ----------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LI_LOAD_ZONE`    | string | The load zone from where the metric was collected. Values will be of the form: amazon:us :ashburn (see list above).                                      |
| `LI_INSTANCE_ID`  | number | A sequential number representing the unique ID of a load generator server taking part in the test, starts at 0.                                          |
| `LI_DISTRIBUTION` | string | The value of the "distribution label" that you used in `ext.loadimpact.distribution` corresponding to the load zone the script is currently executed in. |

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
  if (__ENV.LI_DISTRIBUTION === 'ashburnDistribution') {
    // do something
  } else if (__ENV.LI_DISTRIBUTION == 'dublinDistribution') {
    // do something
  }
}
```

</CodeGroup>

## Differences between local and cloud execution

### Iterations

Local execution has support for iterations based test length (`-i` or
`--iterations` on CLI, and `iterations` in script options) which is
not yet supported by the cloud execution mode.

### Using setup/teardown life-cycle functions

Your [setup and teardown life cycle functions](/using-k6/test-life-cycle)
are executed as normal when running cloud tests. Depending on the size
of your test, it will execute from one or more cloud servers, but the
setup and teardown will only execute from one server, so execute once
for each test run. There's no guarantee though that the same cloud server
that executed the `setup()` will execute the `teardown()`.
       
### Disable cloud logs
       
When running cloud tests from the CLI, you will get cloud log output printed to the terminal. You can disable this either by passing `--show-logs=false` as an option to `k6` or by setting an environment variable `K6_SHOW_CLOUD_LOGS=false`. 

### System environment variables

Environment variables set in the local terminal before executing k6 won't be forwarded to the k6 cloud service, and thus won't be available to your script when executing in the cloud. With cloud execution, you must use the CLI flags (`-e`/`--env`) to set environment variables like `-e KEY=VALUE` or `--env KEY=VALUE`. Read more about this on [environment variables](/using-k6/environment-variables).
