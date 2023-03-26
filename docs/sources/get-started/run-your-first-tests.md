---
title: Run your first tests
description: Use the GUI to build a quick prototype test. Run the test from the UI, or copy the script and run it from your UI.
weight: 100
aliases:
  - /docs/k6/run-your-first-tests/
  - /docs/k6/get-started/run-your-first-tests
---

# Run your first tests

Follow along to learn how to create load tests with the _Test Builder_.

## Before you start

To do these procedures, you'll need the following:

- A Grafana Cloud instance with the k6 app
- Permission to run load tests on an endpoint.

## Create a test with the test builder

The _Test Builder_ is a graphical interface to simulate user behavior and model traffic patterns.
It provides a quick way to prototype tests and learn the basic functionality of the k6 API.

> **Note:** The following test uses 10 VUh. To learn how VUh is calculated, refer to [VU hours]({{< relref "vu-hours" >}}).

You have permission to run load tests on a demo site, `https://test.k6.io`.
To learn how to make a test, follow these steps:

1. From your Grafana instance, go to the k6 app.
1. Select **New Test**. Choose the **Test Builder**.
1. In the first field, name the test as `Test demo`.
1. Select **Request**.
1. Make your test logic:
    - In the **Name** field, enter `Get homepage`.
    - In the **Request** fields, select `GET` and enter the URL you want to test (or `https://test.k6.io`).

Now you have test logic, and you could already run a test.
But k6 doesn't only make requests.
It also models _load_, or traffic patterns.
These load patterns are modeled in test _scenarios_.

Configure your scenario to model 10 users trying to access the homepage 100 times:

1. In **Scenarios**, select **Options**.
1. For **Executor**, select `Shared iterations`.
1. Enter the following load pattern:

    |                |      |
    |----------------|------|
    | **VUS**        | `10` |
    | **Iterations** | `100` |

1. **Run test**.

You just started your first load test!
The app presents the results in near real time,
When it finishes, you can look at granular data for all results output.

## Model ramping traffic from multiple geographies

> **Note:** The following test uses **20 VUh**. To learn how VUh is calculated, refer to [VU hours]({{< relref "vu-hours" >}}).

The k6 app provides many options to simulate realistic load.
This procedure modifies the same test so that the volume of traffic _ramps_ (that is, changes the number of active virtual users) and comes from multiple _load zones_ (geographic areas).

To configure the test for ramping logic, follow these steps:

1. Go to the k6 App and select your test.
1. **Configure**.
1. Under **Scenarios**, select **Options**.
1. To configure a ramping load, find **Executor**, and select `Ramping VUs`
1. Leave the default values for **Target VUs** and **Duration**

    | Target VUs | Duration |
    |------------|----------|
    | 20         | 1m       |
    | 20         | 3m30s    |
    | 0          | 1m       |

This load configuration starts with 0 virtual users, ramps up to 20 over a minute, remains at this level for 3 minutes and 30 seconds, then ramps back down to 0.

Now, distribute the geography of the load with these steps:

1. Go to **Options > Load zones**.
1. Keep `Ashburn, US` as the first option.
1. Press **Add new load zone** and select `London, GB`. Repeat the process with `Sydney, AU`.
1. To run a test with ramping load from three different continents, **Save and Run**.

As the test runs, a panel shows values for request rate (traffic), response time (latency), and error rate (availabilty).

Can you find any relationships between these values?
If not, you can try increasing the target VUs until something interesting happens.

## Next steps

This preceding section provides a rapid overview of building tests graphically.
For detailed instructions, refer to [Use the Test Builder]({{< relref "../author-run/test-builder" >}}).

You can also run the same test from your command-line interface (CLI).

### Run test script on the CLI

k6 tests are designed to be portable.
Each test you make in the Test Builder has an underlying test script.

You can run the same script on your local machine.
To do so, follow these steps:

1. From the test results, select **Script**.
1. Select **Run script from the CLI** and follow the instructions.

As you build your script, you can also view the code with the **Script** toggle.
The test built in the previous section has the following script:

```javascript
import { sleep } from "k6";
import http from "k6/http";

export const options = {
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 34 },
        "amazon:gb:london": { loadZone: "amazon:gb:london", percent: 33 },
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
        { target: 20, duration: "1m" },
        { target: 20, duration: "3m30s" },
        { target: 0, duration: "1m" },
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

For a detailed tutorial, read [Run tests from the CLI]({{< relref "run-cloud-tests-from-the-cli" >}}).
