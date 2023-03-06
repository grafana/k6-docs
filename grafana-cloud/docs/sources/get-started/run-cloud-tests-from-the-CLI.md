---
title: Run cloud tests from the CLI 
description: For day-to-day use, it's most convenient to run your cloud tests from you own CLI.
weight: 102
---

# Run Cloud tests from the CLI

While the [Test Builder]({{< relref "build-your-first-test" >}}) is a nice way to learn the API and prototype tests, testers usually prefer to write scripts in their local code editor.
k6 is also a command-line tool, and you can use it to write test files on your machine and execute them on Cloud servers.

In this topic, learn how to use the CLI to:

- Run a test on your local machine 
- Run that same test on cloud servers
- Run the test locally and stream it to the cloud

## Before you start

To use the CLI test, you need the following:

- A machine with [k6 installed](https://k6.io/docs/get-started/installation)
- An API token (refer to next section)
- A test file

For your test file, you can copy the script prototyped in [Build your first test]({{< relref "build-your-first-test" >}}).
In the directory where you want to run your test, save this as `cloud_demo.js`.

> To keep demo run times short, the total test duration has been modified to be only 45 seconds.

```javascript
import { sleep } from "k6";
import http from "k6/http";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 34 },
        "amazon:gb:london": { loadZone: "amazon:gb:london", percent: 34 },
        "amazon:au:sydney": { loadZone: "amazon:au:sydney", percent: 33 },
      },
    },
  },
  thresholds: {},
  scenarios: {
    Scenario_1: {
      executor: "ramping-vus",
      gracefulStop: "30s",
      stages: [
        { target: 20, duration: "15s" },
        { target: 20, duration: "15s" },
        { target: 0, duration: "15s" },
      ],
      gracefulRampDown: "30s",
      exec: "scenario_1",
    },
  },
};

export function scenario_1() {
  let response;

  // Get homepage
  response = http.get("https://test.k6.io/");

  // Automatically added sleep
  sleep(1);
}
```

### Get a token

To run tests from the CLI, you'll need a token.
To get one, go **k6 > Settings**.

<!--- WRITERS_NOTE  complete this step when API token exists-->

## Run local tests

To run tests from the CLI, open your terminal follow these steps:

1. Change to the directory to where you saved.
1. Run the script using one of the following three options.
   - **Local execution**. Run locally and view results locally.
   - **Cloud execution**. Run on the cloud and view results on the cloud.
   - **Stream results**. Run locally and send the results results to cloud. 

### Local execution

Running tests locally is great way to incrementally test your script as you write it.
Don't worry about the cloud-specific options: k6 ignores these in local execution.

To run locally, use the `k6 run` command:

```bash
k6 run cloud_demo.js
```

### Cloud execution

After you have a suitable script, you can run the test on Cloud servers without leaving your local device.
To run cloud tests from your CLI, use the `k6 cloud` command:
  
```bash
k6 cloud cloud_demo.js
```
  
### Run locally and stream to the Cloud
  
You can also generate load from a local machine and stream the results for storage and visualization on Grafana Cloud.
A frequent use case for this feature is to run load tests on networks that aren't accessible from the public internet.

To stream results to Grafana Cloud k6, use the `k6 run --out cloud`:

```bash
k6 cloud cloud_demo.js
```

