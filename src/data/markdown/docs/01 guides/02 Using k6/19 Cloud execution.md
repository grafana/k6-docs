---
title: 'Cloud execution'
excerpt: ''
---

One of the goals with k6 is to support three execution modes to run your k6 tests:

- **Local**: on your local machine or a CI server.
- **Cloud**: on cloud infrastructure managed by k6 (triggered
  from local command-line, CI or cloud UI).
- **Clustered**: on more than one machine managed by you.

k6 aims to support moving a script between the three execution modes
without having to make modifications to the script.

Currently, k6 supports the local execution mode. The second execution
mode, cloud execution, is available by starting a trial of the Load
Impact cloud service. See the "Getting Started" steps below.

## Getting started

1. First, you need to create a k6 Cloud account, [register here](https://app.k6.io/account/register).

2. Then you need to start a trial of our cloud service, [start trial here](https://app.k6.io/start-trial?utm_source=k6%20docs%20cloud%20exec&utm_medium=CTA&utm_campaign=Start%20Trial%20Insights).

3. After that you need to download [the latest release of k6](https://github.com/loadimpact/k6/releases).

4. k6 needs a k6 Cloud API token to be able to communicate with the cloud. Log in to k6 Cloud from the CLI to save your token in a local config file:

   <div class="code-group" data-props='{"labels": []}'>

   ```shell
   k6 login cloud
   ```

   </div>

   Alternatively, you could also get your token from the [API token
   page](https://app.k6.io/account/api-token) and set the
   environment variable `K6_CLOUD_TOKEN` or use `k6 login cloud --token YOUR_TOKEN`.

5. Instruct k6 to run your test in the cloud.

   <div class="code-group" data-props='{"labels": ["Mac / prebuilt binary", "Docker image"]}'>

   ```shell
   k6 cloud script.js
   ```

   ```shell
   docker run -i -e K6_CLOUD_TOKEN=<token> loadimpact/k6 cloud - <script.js
   ```

   </div>

   > ### Docker usage
   >
   > Note the difference in specifying the `K6_CLOUD_TOKEN` environment variable using
   > the `docker run -e` option.
   >
   > Also, when passing the script via stdin as shown in the example there is no way
   > for the containerized k6 process to get the script filename, which is required
   > for cloud execution. To fix this you can either mount the local filesystem as
   > a Docker volume
   >
   > <div class="code-group" data-props='{"labels": []}'>
   >
   > ```shell
   > docker run -i -e ... -v "$PWD/script.js:/script.js" loadimpact/k6 cloud /script.js
   > ```
   >
   > </div>
   >
   > or you will need to specify the `options.ext.loadimpact.name` property in the
   > script itself. For example:
   >
   > <div class="code-group" data-props='{"labels": []}'>
   >
   > ```javascript
   > export let options = {
   >   ext: {
   >     loadimpact: {
   >       name: 'My awesome test',
   >     },
   >   },
   > };
   > ```
   >
   > </div>

6. You'll see k6 print some information and the URL of your test results.

   ![Cloud execution output](/images/02 Using k6/cloud-exec-output.png "Cloud execution output")

7. Navigate to the URL to check your test results. During the initialization phase of a cloud test you'll see a screen like the following:

   ![Cloud execution init](/images/cloud-exec-test-init.png 'Cloud execution init')

   When the test is running, the result page for k6 tests
   ("Insights") will be shown. The [k6 Cloud Results
   docs](/cloud/analyzing-results/overview)
   provides more documentation about the different test result
   sections.

   ![Insights results](/images/cloud-insights-results.png 'Insights results')

## Cloud execution options

You can optionally define some cloud options in your k6 script.

<div class="code-group" data-props='{"labels": []}'>

```javascript
export let options = {
  ext: {
    loadimpact: {
      name: 'Hello k6 cloud!',
      distribution: {
        scenarioLabel1: { loadZone: 'amazon:us:ashburn', percent: 50 },
        scenarioLabel2: { loadZone: 'amazon:ie:dublin', percent: 50 },
      },
    },
  },
};
```

</div>

| Name                  | Default                                                                                          | Description                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name (string)         | Optional. The name of the main script file, so something like "script.js".                       | The name of the test in the k6 Cloud UI. Test runs with the same name will be grouped together.                                                                                                                                     |
| distribution (object) | Optional. The equivalent of `someDefaultLabel: { loadZone: "amazon:us:ashburn", percent: 100 }`. | How the traffic should be distributed. The keys are string labels that will be injected as [environment variables](/using-k6/environment-variables) on the appropriate nodes (matching the `loadZone`): `__ENV["someDefaultLabel"]` |

### List of supported load zones

| Location              | ID                    |
| --------------------- | --------------------- |
| Tokyo                 | `amazon:jp:tokyo`     |
| Seoul                 | `amazon:kr:seoul`     |
| Mumbai                | `amazon:in:mumbai`    |
| Singapore             | `amazon:sg:singapore` |
| Sydney                | `amazon:au:sydney`    |
| Montreal              | `amazon:ca:montreal`  |
| Frankfurt             | `amazon:de:frankfurt` |
| Ireland               | `amazon:ie:dublin`    |
| London                | `amazon:gb:london`    |
| Paris                 | `amazon:fr:paris`     |
| Stockholm             | `amazon:se:stockholm` |
| N. Virginia (Default) | `amazon:us:ashburn`   |
| Ohio                  | `amazon:us:columbus`  |
| N. California         | `amazon:us:palo alto` |
| Oregon                | `amazon:us:portland`  |
| Hong Kong             | `amazon:cn:hong kong` |

### Run options

<div class="code-group" data-props='{"labels": []}'>

```shell
k6 cloud -h
```

</div>

All the options, like `--vus` and `--duration` are the same between
the `k6 run` and `k6 cloud` commands. Check out the [Options
page](/using-k6/options) for more information about the different options.

## Cloud execution tags

[Tags](/using-k6/tags-and-groups) is a powerful concept in k6 as it opens up for great flexibility in how you can slice and dice the result data.

When running a k6 test in the cloud we add two tags to all metrics:

| Tag name      | Type   | Description                                                                                              |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `load_zone`   | string | The load zone from where the the metric was collected. Values will be of the form: `amazon:us :ashburn`. |
| `instance_id` | int    | A unique number representing the ID of a load generator server taking part in the test.                  |

![filter tags](/images/analysis-tab-tags.png 'Cloud execution tags')

## Using setup/teardown life-cycle functions

Your [setup and teardown life cycle functions](/using-k6/test-life-cycle)
are executed as normal when running cloud tests. Depending on the size
of your test, it will execute from one or more cloud servers, but the
setup and teardown will only execute from one server, so execute once
each test-wide. There's no guarantee though that the same cloud server
that executed the `setup()` will execute the `teardown()`.

## Using environment variables

To use [environment variables](/using-k6/environment-variables) when running
a cloud executed test you use one or more `-e KEY=VALUE` (or `--env KEY=VALUE`) CLI flags.

> ### Use the CLI flags to set environment variables
>
> With cloud execution you must use the CLI flags (`-e`/`--env`) to
> set environment variables. Environment variables set in the local
> terminal before executing k6 won't be forwarded to the k6
> cloud service, and thus won't be available to your script when
> executing in the cloud."

Given the script below, which reads the `MY_HOSTNAME` environment
variable, you'd execute it using the command line `k6 run -e MY_HOSTNAME=test.k6.io script.js`.

<div class="code-group" data-props='{"labels": ["script.js"], "lineNumbers": "[true]"}'>

```javascript
import { check, sleep } from 'k6';
import http from 'k6/http';

export default function() {
  var r = http.get(`http://${__ENV.MY_HOSTNAME}/`);
  check(r, {
    'status is 200': r => r.status === 200,
  });
  sleep(5);
}
```

</div>

When running in the k6 Cloud there will be three additional
environment variables that can be used to find out in which load zone,
server instance, and distribution label the given script is currently
running.

Name|	Value|	Description
-|-|-
`LI_LOAD_ZONE`	|string|	The load zone from where the the metric was collected. Values will be of the form: amazon:us :ashburn (see list above).
`LI_INSTANCE_ID`	|number|	A sequential number representing the unique ID of a load generator server taking part in the test, starts at 0.
`LI_DISTRIBUTION`	|string|	The value of the "distribution label" that you used in `ext.loadimpact.distribution` corresponding to the load zone the script is currently executed in.

## Running tests under a different project than your default one

By default tests and test runs will be created and run under your
default project, in your default organization. To create and run tests
under a different project, whether under your default organization or
one you've been invited to, you have two options:

1. You can specify the project ID in the script options:

   <div class="code-group" data-props='{"labels": ["script.js"], "lineNumbers": "[true]"}'>

   ```javascript
   export let options = {
     ext: {
       loadimpact: {
         projectID: 123456,
       },
     },
   };
   ```

   </div>

2. You can set the `K6_CLOUD_PROJECT_ID` environment variable when running the test.

   You find the ID of a k6 Cloud project by selecting the project in
   the UI and looking in the URL bar of your browser, the `12345` in
   `https://app.k6.io/projects/12345` is the project ID.

## Differences between local and cloud execution (in beta)

There's currently one difference between local and cloud execution:
local execution has support for iterations based test length (`-i` or
`--iterations` on CLI, and `iterations` in script options) which is
not yet supported by cloud execution.

## Limits

You're only limited to what your subscription, trial or premium, allows.
