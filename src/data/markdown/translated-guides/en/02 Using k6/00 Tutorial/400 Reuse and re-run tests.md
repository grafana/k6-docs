---
title: Reuse and re-run tests 
excerpt: Modularize your k6 test logic and workload configuration. 
---

In the previous tutorials, you designed k6 scripts to assert for performance and to make it easy to compare results.
You also tested a web application and an API.

In this section, learn how to:
- Modularize test scripts into reusable components
- Dynamically configure scripts with environment variables.

## Example script

For fun, let's combine the scripts from the previous tutorials.
Use logic of the `user-flow.js` test with the thresholds and scenario of the `api.js` (feel free to add more checks, requests, groups, and so on).
Take note of the features of this script:
- The `default` function has two groups, `User contacts page` and `Coinflip game`
- The `options` object has two properties, `thresholds` and `scenarios`

In the following sections, learn how to split these components into separate files, and combine them dynamically at run time.

<CodeGroup labels={["whole-tutorial.js"]} lineNumbers={[true]} showCopyButton={[true]}
heightTogglers={[true]}>

```javascript
//import necessary modules
import http from "k6/http";
import { group, sleep } from "k6";
import { Trend } from "k6/metrics";

//set baseURL
const baseUrl = "https://test.k6.io";

// Create custom trends
const contactsLatency = new Trend("contacts duration");
const coinflipLatency = new Trend("coinflip duration");

//define workload configuration
export const options = {
  scenarios: {
    //arbitrary name of scenario:
    stress_test: {
      executor: "ramping-arrival-rate",
      // Start iterations per `timeUnit`
      startRate: 20,
      // Start `startRate` iterations per minute
      timeUnit: "1m",
      // Pre-allocate necessary VUs.
      preAllocatedVUs: 200,
      stages: [
        { target: 20, duration: "10s" },
        { target: 40, duration: "10s" },
        { target: 40, duration: "10s" },
        { target: 60, duration: "10s" },
        { target: 60, duration: "30s" },
        { target: 0, duration: "1m" },
      ],
    },
  },
  //define thresholds
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }], // availability threshold for error rate
    http_req_duration: ["p(99)<1000"], // Latency threshold for percentile
  },
};

// Function to test user flow
export default function () {
  // Put visits to contact page in one group
  group("User contacts page", function () {
    // save response as variable
    const res = http.get(`${baseUrl}/contacts.php`);
    // add duration property to metric
    contactsLatency.add(res.timings.duration);
    sleep(1);
    // return to the home page, no custom metric
    http.get(`${baseUrl}/`);
    sleep(1);
  });

  // Coinflip players in another group

  group("Coinflip game", function () {
    // save response as variable
    let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);
    // mutate for new request
    res = http.get(`${baseUrl}/flip_coin.php?bet=tails`);
    // add duration property to metric
    coinflipLatency.add(res.timings.duration);
    sleep(1);
  });
}

```

</CodeGroup>


## Modularize logic

With [modules](/using-k6/modules), you can use logic and variables from other files.
Use modules to extract the functions to their own files.

To do so, follow these steps:

1. Copy the previous script (`whole-tutorial.js`) and save it as `main.js`.
1. Extract the `User contacts page` group function from `main.js` script file and paste it into a new file called `contacts.js`


  ```javascript
  export function contacts() {
      group("User contacts page", function () {
        // save response as variable
        let res = http.get(`${baseUrl}/contacts.php`);
        // add duration property to metric
        contactsLatency.add(res.timings.duration);
        sleep(1);
       // return to the home page, no custom metric
       http.get(`${baseUrl}/`);
       sleep(1);
      });
    }
  ```

  As is, this script won't work, since it has undeclared functions and variables.
1. Add the necessary imports and variables. This script uses the `group`, `sleep`, and `http` functions or libraries. It also has a custom metric. Since this metric is specific to the group, you can add it `contacts.js`.

  ```javascript
  //import necessary modules
  import http from "k6/http";
  import { Trend } from "k6/metrics";
  import { group, sleep } from "k6";
  
  const contactsLatency = new Trend("contact duration");
  ```

1. Finally, declare `baseUrl` as a global variable. To do so, use `globalThis.baseUrl` in both `main.js`  and `contacts.js`

  
  <CodeGroup labels={["contacts.js"]} lineNumbers={[true]} showCopyButton={[true]}>
  
  ```javascript 
  export function contacts() {
      group("User contacts page", function () {
      // use globalThis to access global variables
      const baseUrl = globalThis.baseUrl;
    });
  }
  ```
  
  </CodeGroup>

1. Repeat the process with the `coinflip` group in a file called `coinflip.js`.
  Use the tabs to see the final three files should  (`options` moved to the bottom of `main.js` for better readability).

  <CodeGroup labels={["main.js", "contacts.js", "coinflip.js"]} lineNumbers={[true, true, true]}
  heightTogglers={[true, false, false]}>
  
  
  ```javascript
  // import modularized functions
  import { coinflip } from "./coinflip.js";
  import { contacts } from "./contacts.js";
  
  // use globalThis to set global variables
  globalThis.baseUrl = "https://test.k6.io";
  
  
  // Modularized function to test user flow
  export default function () {
    // Put visits to contact page in one group
    contacts();
    // Coinflip players in another group
    coinflip();
  }
  
  //define workload configuration
  export const options = {
    scenarios: {
      //arbitrary name of scenario:
      stress_test: {
        executor: "ramping-arrival-rate",
        // Start iterations per `timeUnit`
        startRate: 20,
        // Start `startRate` iterations per minute
        timeUnit: "1m",
        // Pre-allocate necessary VUs.
        preAllocatedVUs: 200,
       stages: [
          { target: 20, duration: "10s" },
          { target: 40, duration: "10s" },
          { target: 40, duration: "10s" },
          { target: 60, duration: "10s" },
          { target: 60, duration: "30s" },
          { target: 0, duration: "1m" },
        ],
      },
    },
    //define thresholds
    thresholds: {
      http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }], // availability threshold for error rate
      http_req_duration: ["p(99)<1000"], // Latency threshold for percentile
    },
  };
  ```
  
  ```javascript
  //import necessary modules
  import http from "k6/http";
  import { Trend } from "k6/metrics";
  import { group, sleep } from "k6";
  
  const contactsLatency = new Trend("contact duration");
  
  export function contacts() {
    group("User contacts page", function () {
      // use globalThis to access global variables
      const baseUrl = globalThis.baseUrl;
      // save response as variable
      let res = http.get(`${baseUrl}/contacts.php`);
      // add duration property to metric
      contactsLatency.add(res.timings.duration);
      sleep(1);

      // return to the home page, no custom metric
      http.get(`${baseUrl}/`);
      sleep(1);
    });
  }
  ```
  
  ```javascript
  //import necessary modules
  import http from "k6/http";
  import { Trend } from "k6/metrics";
  import { group, sleep } from "k6";
  
  const coinflipLatency = new Trend("coinflip duration");
  
  export function coinflip() {
    group("Coinflip game", function () {
      // use globalThis to access global variables
      const baseUrl = globalThis.baseUrl;
      // save response as variable
      let res = http.get(`${baseUrl}/flip_coin.php?bet=heads`);
      // add duration property to metric
      coinflipLatency.add(res.timings.duration);
      sleep(1);
      // mutate for new request
      res = http.get(`${baseUrl}/flip_coin.php?bet=tails`);
      // add duration property to metric
      coinflipLatency.add(res.timings.duration);
      sleep(1);
    });
  }
  ```
  
  </CodeGroup>

Run the test with `k6 run main.js` (use `--iterations 10` to limit run time).
The results should be very similar to running the script in a combined file, since these are the same test.


## Modularize workload

Now that the iteration code is totally modularized, you might modularize your `options`, too.
To do so, you could either save the object as JavaScript, or save it as JSON and use the k6 [`open()`](/javascript-api/init-context/open/) function with `JSON.parse()`.

The following example does both:
- Thresholds are in an exported variable from `thresholds.js`
- The scenario workload config is in a JSON file, `stress.json`


<CodeGroup labels={["main.js", "thresholds.js", "stress.json"]} lineNumbers={[true, true, true]}
heightTogglers={[true, false, false]}>

```javascript
// import modularized functions
import { coinflip } from "./coinflip.js";
import { contacts } from "./contacts.js";
// import options
import thresholds from "./thresholds.js";

//define workload configuration
// open JSON file and parse
const workload = JSON.parse(open("./stress.json"));
console.log(workload.stress_test);
export const options = {
  //use converted JSON config
  scenarios: workload,
  //use imported thresholds variable
  thresholds,
};

// use globalThis to set global variables
globalThis.baseUrl = "https://test.k6.io";

// Function to test user flow
export default function () {
  // Put visits to contact page in one group
  contacts();
  // Coinflip players in another group
  coinflip();
}
```

```javascript
export const thresholds = {
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }], // availability threshold for error rate
    http_req_duration: ["p(99)<1000"], // Latency threshold for percentile
  },
};
```

```json
{
  "stress_test": {
    "executor": "ramping-arrival-rate",
    "startRate": 20,
    "timeUnit": "1m",
    "preAllocatedVUs": 200,
    "stages": [
      { "target": 20, "duration": "10s" },
      { "target": 40, "duration": "10s" },
      { "target": 40, "duration": "10s" },
      { "target": 60, "duration": "10s" },
      { "target": 60, "duration": "30s" },
      { "target": 0, "duration": "1m" }
    ]
  }
}
```

</CodeGroup>

Notice the length of this final script and compare it with the script at the beginning of this page.
Though the final execution is the same, it's half the size and more readable.

Besides shortness, this modularity lets you compose scripts from many parts, or dynamically configure scripts at run time.



## Mix and match logic

With modularized configuration and logic, you can mix and match logic.
An easy way to configure this is through [environment variables](/using-k6/environment-variables).

Change `main.js` so that it:
- _By default_ runs a smoke test with 5 iterations
- With the right enviroment variables, runs a stress test.

To do this, follow these steps:

1. Add a new scenario file, `smoke.json`, with the following configuration

  <CodeGroup labels={["smoke.json"]} lineNumbers={[]} showCopyButton={[true]}>

  ```
  {
    "smoke": {
      "executor": "shared-iterations",
      "iterations": 5,
      "vus": 1,
      "exec": "scenario1"
    }
  }
  ```

  </CodeGroup>

1. Add conditional logic to bind `workload` to `__ENV.WORKLOAD`  if the environment variable exists, and to the content of `smoke.json` if it doesn't.
  
  ```javascript
  let workload;
  if (typeof __ENV.WORKLOAD !== "undefined") {
    workload = JSON.parse(open(__ENV.WORKLOAD));
  } else {
    //if no envvar, use smoke config
    workload = JSON.parse(open("./smoke.json"));
  }
  ```
  
1. Run the script with and without the `-e` flag.

   - What happens when you run `k6 run main.js`?
   - What about `k6 run main.js -e WORKLOAD="./stress.json"`?

If it's an object, you can modularize it. Since k6 scripts are JavaScript, where everything is an object, you can modularize everything. 
  
## Next steps

Now you've seen examples to write tests, assert for performance, filter results, and modularize scripts.
Notice how the tests progress in complexity: from single endpoints to holistic tests, from small loads to large loads, and from single-tests to reusable modules. These progressions are typical in testing, with the next step being to automate. It might be impractical to automate a tutorial, but if you are interested,
read the [Automated performance testing](/testing-guides/automated-performance-testing/) guide, or use the [k6 GitHub action](https://github.com/grafana/k6-action).

More likely, you want to learn more about k6. [The k6 learn repository](https://github.com/grafana/k6-learn) has more detailed to practice.
Or, you can read explore the docs and try to build out your testing strategy.
The following links only scratch the surface:
- Learn how to use more [protocols](/using-k6/protocols)
- Review the reference for the full-featured [JavaScript API](/javascript-api)
- Read about [Testing strategies](/testing-guides) and [Test types](/test-types)

Happy testing!


