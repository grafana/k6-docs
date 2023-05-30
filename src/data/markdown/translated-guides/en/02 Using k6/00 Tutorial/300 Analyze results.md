---
title: Analyze results
excerpt: Use k6 to write custom metrics and filter results.
---


The end-of-test summary provides only an overview of performance.
In real analysis, it helps to be able to analyze the test along data points.

Two methods to make results more meaningful are to use tags to filter results,
and to create custom metrics to study performance of a certain. 

## Before you start, add requests

Results filtering isn't very meaningul in a test that makes one request.
To prepare for this section, add the following requests:
- A GET request to the `/public/crocodiles/` endpoint.
- Multiple GET requests to request all items at `/public/crocodiles/{id}/`

The available endpoints are documented at https://test-api.k6.io .
Can you figure out how to add these requests?

If not, this script works:

<Collapsible title="new tutorial.js" isOpen="" tag="">

<CodeGroup labels={["tutorial.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
// Import necessary modules
import { check } from "k6";
import http from "k6/http";

//define configuration
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

export default function () {
  // define URL and request body
  const url = "https://test-api.k6.io";
  const payload = JSON.stringify({
    username: "test_case",
    password: "1234",
  });
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send a post request and save response as a variable
  const res = http.post(`${url}/auth/basic/login/`, payload, params);

  // check that response is 200
  check(res, {
    "login response was 200": (res) => res.status == 200,
  });

  const crocResponse = http.get(`${url}/public/crocodiles/`);
  const crocs = JSON.parse(crocResponse.body);
  crocs.forEach((croc) => {
    http.get(`${url}/public/crocodiles/${croc["id"]}/`);
  });
}

```

</CodeGroup>




</Collapsible>




## Write data points to a file

k6 provides many output structures.
One of the most commonly used is JSON.

To output results as JSON, use the out flag.

~~~bash
k6 run --out json=results.json tutorial.js
~~~

Then, you can filter the output with the tool of your choice.

k6 results have a number of built-in tags.
For example, run this `jq` command to filter results to only results where the status is 200:

```
jq '. | select(.data.tags.status >= "200")' results.json
```

## Add tags for different requests





, one to log in and one to log out.
Note how the tags are arguments to the `post` method..

<CodeGroup labels={["tagged requests"]} lineNumbers={["true"]} showCopyButton={[true]}>

```

```

</CodeGroup>

Rerun the test with `k6 run --out json=results.json tutorial.js` (you can reduce stage times to avoid waiting).

After it finishes, filter the results

## Organize in groups

## Make custom metric


