---
title: Run tests
excerpt: Use the k6 CLI to run tests on k6 Cloud servers, or stream results for visualization and storage.
---

On this page, read about how to:
- Use the `k6 cloud` command to run tests on k6 Cloud infrastructure
- Use `k6 run --out` to run the test locally and stream results to k6 Cloud (perfect for testing local environments)

## Before you start

To run tests on k6 Cloud, you to need to:
- [ ] Have a k6 Cloud account. If you don't have one, [sign up](https://app.k6.io/account/register) and get 50 cloud tests with the Free Trial.
- [ ] [Install k6](/get-started/installation) on your local machine:

## Run test on the CLI

With the `k6 cloud` command, you can run tests on Cloud servers, with scripts on your local machine.

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

   k6 will print some information and the URL of your test results.

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

    Learn more about test results at [Analyzing Results](/cloud/analyzing-results/overview).


## Run locally and stream to the cloud

At times, you might want to run a test locally, but see the results on k6 Cloud.
For example, you may want to test a local environment that is not connected to the wider internet.

To do, this you can use `k6 run --out cloud`.
For detailed instructions, refer to the [real-time results output](/results-output/real-time/cloud/) docs.

<Blockquote mod="attention"
title="k6 charges your subscription for cloud streaming"
>

Data storage and processing are primary cloud costs,
so `k6 run --out cloud` will consume VUh or test runs from your subscription.

</Blockquote>

## Change test project

By default, k6 creates, runs, and stores tests and test runs in the default project to your default organization.

To create and run tests under a different project, set the `Project ID` in your script options.

1. Select the project on the sidebar menu.
1. Find the `Project ID` in the header of the Project Dashboard page.

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


## Run tests on multiple cloud accounts

If you have multiple cloud subscriptions, use your API token to change between subscriptions.
One way to do this is with environment variables:

```bash
K6_CLOUD_TOKEN k6 cloud script.js
```

Another way is to toggle between config files with the `--config` flag.

```bash
k6 cloud --config nondefault/location/config.json script.js
```

For syntax examples and the default config locations, refer to the [`--config` option reference](/using-k6/k6-options/reference#config).

</Collapsible>

