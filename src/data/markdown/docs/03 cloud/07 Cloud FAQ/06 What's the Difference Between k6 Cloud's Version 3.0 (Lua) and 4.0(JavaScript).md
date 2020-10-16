---
title: "What's the Difference Between LoadImpact's Version 3.0 (Lua) and k6 Cloud 4.0(JavaScript)"
excerpt: 'A brief overview of the differences between LoadImpact 3.0 (Lua) and k6 Cloud 4.0 (JS/k6) products'
---

## Purpose

An overview of some key differences between k6 Cloud (JS) and LoadImpact (Lua)

## Overview

From a general performance testing perspective the 3.0 and 4.0 products are more or less the same:

1. You create one or more user scenarios that step through a particular process of your target system that you want to test.
2. You then combine your user scenario(s) with a traffic simulation profile that specifies how many Virtual Users (VUs) should be concurrently executing the user scenario(s) at different points in time of the test.
3. You execute your test, metrics data is collected and you are presented with results.

## Differences between 3.0 and 4.0 products

When looking more closely though there are some differences in how you accomplish step 1, 2 and 3 above.

A big difference is in the workflow that you can accomplish with each respective product.

The 3.0 product is completely cloud based, user scenarios and test configuration are created/edited and stored in the LoadImpact cloud service, and running tests is also done exclusively from the cloud. This also means the target system that is being tested needs to be accessible from the public Internet.

With the 4.0 product we've opened up the platform in two important ways. First, the core load testing software, [k6](https://github.com/loadimpact/k6), is now an open source tool, and secondly it can be used both [on-premise](/getting-started/running-k6) as well as from the k6 Cloud service via our [cloud execution](/using-k6/cloud-execution) functionality. The user scenarios and test configuration has been merged into one, it's now all just JavaScript code, so very version control friendly.

This brings us to an important difference, in the 4.0 product you're responsible for storing and version controlling your tests (the JavaScript combining user scenario and test configuration), and the k6 Cloud service can provide you with result storage, visualization and trending, as well as geographically distributed cloud execution of tests.

## User scenario

In the 3.0 product user scenarios described using Lua code. You can end up with the Lua code in various ways, by using one of the recorder options, the Postman converter or hand coding it, but at the end of the day the output of all these various ways is a piece of Lua code.

In the 4.0 product user scenarios are described using JavaScript, the ES6 version of JS to be precise. This means it's not only a more familiar language to most developers/testers but it also introduces a nice addition compared to the 3.0 product: support for modules, allowing code to be modularized and reused across tests and teams.

See the Lua to JS migration guide down below for more information on how to migrate your Lua user scenarios to JS.

## Test configuration

In the 3.0 product you compose one or more user scenarios into a separate entity known as a "Test" (aka "Test configuration"), and then add additional configuration like traffic simulation profile and thresholds. This is done through the LoadImpact WebApp UI.

In the 4.0 product the equivalent configuration options are specified in the script itself:

<CodeGroup labels={["k6 Cloud V4 options:"]}>

```JavaScript
export let options = {
    // Stages represents the traffic ramping profile that will be used in the test,
    // controlling the VU concurrency throughout the duration of the test
    'stages': [
        // Linear ramp-up from 0 to 50 VUs for 60s
        { 'target': 50, 'duration': '60s' },

        // Stay constant at 50 VUs for 60s
        { 'target': 50, 'duration': '60s' },

        // Linear ramp-down from 50 to 0 VUs for 60s
        { 'target': 0, 'duration': '60s' }
    ],

    // Use thresholds to set your metric targets, thresholds are used to pass/fail tests
    // and for controlling automatic test termination
    thresholds: {
        // Add a threshold mark test as failed is 95th percentile of overall response time goes above 500ms
        'http_req_duration': 'p(95)<500',

        // Add another threshold to fail and abort the test if the threshold hits 1s
        'http_req_duration': {'trigger': 'p(95)<1000', 'abortOnFail': true}
    }
};
```

</CodeGroup>

---

## Lua to JS migration guide

Lua and JavaScript (JS) share most of the fundamental logical constructs and control flow mechanisms that are commonly found in general purpose programming languages. Same goes for the load testing oriented APIs that we've added in each respective product. This section will look at how to convert Lua APIs into the JS equivalent.

## High-level differences

On highest level there are some differences to be aware of before we continue on into more details.

## Loading of builtin modules and APIs

In Lua all the available functionality is loaded by default, APIs can be called right away without explicit loading/importing, while In JS you need to explicitly import the builtin modules and APIs that you want to use:

<CodeGroup labels={["Lua", "JavaScript"]} lineNumbers={[false]}>

```text
http.get("https://test.k6.io/")
client.sleep(3)
```

```JavaScript
import {sleep} from "k6";
import http from "k6/http";
export default function() {
  http.get("https://test.k6.io/");
  sleep(3);
}
```

</CodeGroup>

## Scope of VU code

In Lua VUs execute the script from top to bottom over and over, while in JS VUs execute the global scope (aka "init code") once to initialize, and then executes the "main function" (`export default function`) over and over:

<CodeGroup labels={["Lua", "JavaScript"]} lineNumbers={[false]}>

```text
// The VU code is the same as global scope, and gets run over and over by a VU
client.sleep(3)
```

```JavaScript
// Imports and other global scope code
export default function() {
  // The VU code, that gets run over and over by a VU
}
```

</CodeGroup>

## Converting Lua APIs to JS APIs

## Client sleep/think time

Below you have examples on how to have a VU sleep or think for a specific amount of time (in the example below for 3 seconds), pausing the VU execution:

<CodeGroup labels={["Lua", "JavaScript"]} lineNumbers={[false]}>

```text
client.sleep(3.0)
```

```Java
import {sleep} from "k6";
export default function() {
  sleep(3);
}
```

</CodeGroup>

## Making requests

To make HTTP requests there are a number of different Lua APIs available. In the end they're all wrappers around the `http.request_batch()` API. Below you can see a comparison for Lua and JS:

<CodeGroup labels={["Lua", "JavaScript"]} lineNumbers={[false]}>

```text
-- Send a single GET request
http.get("https://httpbin.org/")
-- Send a single POST request
http.post("https://httpbin.org", "key=val&key2=val")
-- Send several requests in parallel
http.request_batch({
  { "GET", "https://httpbin.org/" },
  { "POST", "https://httpbin.org/", "key=val&key2=val" }
})
```

```JavaScript
import http from "k6/http";
export default function() {
  // Send a single GET request
  http.get("https://httpbin.org/");
  // Send a single POST request
  http.post("https://httpbin.org", "key=val&key2=val");
  // Send several requests in parallel
  http.batch([
    "https://httpbin.org/",
    { method: "POST", url: "https://httpbin.org/", body: "key=val&key2=val" }
  ]);
}
```

</CodeGroup>

See the [HTTP API](/using-k6/http-requests) docs for k6 for more information and examples.

## Group requests and logic into transactions/pages

In the 3.0 product there's a concept of pages. Lua code in between calls to `http.page_start()` and `http.page_end()` will be measured to provide a page load times in the results. The equivalent in JS would be to use [`Groups`](/using-k6/tags-and-groups#groups):

<CodeGroup labels={["Lua", "JavaScript"]} lineNumbers={[false]}>

```text
http.page_start("My page")
http.get("https://httpbin.org/")
http.request_batch({
  { "GET", "https://httpbin.org/" },
  { "GET", "https://httpbin.org/get" },
})
http.page_end("My page")
```

```JavaScript
import http from "k6/http";
export default function() {
  group("My page", function() {
    http.get("https://httpbin.org/");
    http.batch([
      "https://httpbin.org/",
      "https://httpbin.org/get",
    ]);
  });
}
```

</CodeGroup>

## Data store

In the 3.0 product there's a concept of a datastore. A CSV file that you can upload to the service and then attach to your user scenario for accessing and using the data in your user scenario logic.

In the 4.0 product there's no specific concept of a datastore, but in k6 you have two different ways to separate test parameterization data from script logic.

Both of the examples below can be run with:

<CodeGroup labels={[]}>

```shell
k6 run --vus 3 --iterations 3 script.js
```

</CodeGroup>

## Use the open() scripting API to open a CSV/JSON/TXT file:

more info here: [open](/javascript-api/init-context/open-filepath-mode)

<CodeGroup labels={["users.json"]} lineNumbers={[false]}>

```json
[
  {
    "username": "user1",
    "password": "password1"
  },
  {
    "username": "user2",
    "password": "password2"
  },
  {
    "username": "user3",
    "password": "password3"
  }
]
```

</CodeGroup>

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```JavaScript
import { sleep } from "k6";
const users = JSON.parse(open("./users.json"));
export default function() {
  let user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

## Put the data in a JS file and import it as a module:

<CodeGroup labels={["userData.js"]} lineNumbers={[true]}>

```JavaScript
export let users = [
  {
    "username": "user1",
    "password": "password1"
  },
  {
    "username": "user2",
    "password": "password2"
  },
  {
    "username": "user3",
    "password": "password3"
  }
];
```

</CodeGroup>

## Main Script:

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```JavaScript
import { sleep } from "k6";
import { users } from "./userData.js"
export default function() {
  let user = users[__VU - 1];
  console.log(`${user.username}, ${user.password}`);
  sleep(3);
}
```

</CodeGroup>

## Custom metrics

Beyond the standard metrics collected by the 3.0 product you can also collect custom metrics using the `results.custom_metric()` API in the example below. The equivalent in JS would be to use the [`Trend`](/javascript-api/k6-metrics/trend) custom metric:

<CodeGroup labels={["Lua", "JavaScript"]} lineNumbers={[false]}>

```text
-- Track the time-to-first-byte (TTFB)
local res = http.get("https://httpbin.org/")
result.custom_metric("time_to_first_byte", res.time_to_first_byte)
```

```JavaScript
import {group} from "k6";
import http from "k6/http";
import {Trend} from "k6/metrics";
let ttfbMetric = new Trend("time_to_first_byte");
export default function() {
  group("My page", function() {
    let res = http.get("https://httpbin.org/");
    ttfbMetric.add(res.timings.waiting);
  });
}
```

</CodeGroup>

For more information, see our docs on [custom metrics](/using-k6/metrics#custom-metrics) (Additional metrics for `Counter`, `Gauge` and `Rate` are available beyond the `Trend` one used above).
