---
title: Test for functional behavior
excerpt: Use k6 to write requests and assert that they respond correctly
---

In this tutorial, learn how to write a test that does the following:
- Sends a POST request to the new endpoint 
- Creates a check for the response status

## Script the Request

The first thing to do is to add logic for the endpoint.
To do that, you need to make an [HTTP request](/using-k6/http-request):
1. Import the HTTP module.
2. Create a payload to authenticate the user.
3. Use the `http.post` method to send your request with the payload to an endpoint.

To test, copy this file and save it as `tutorial.js`

<CodeGroup labels={["tutorial.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
// import necessary module
import http from "k6/http";

export default function () {

  // define URL and payload
  const url = "https://test-api.k6.io/auth/basic/login/";
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
  const res = http.post(url, payload, params);
}
``` 

</CodeGroup>

Run the script with `k6 run tutorial.js`.

After the test finishes, k6 logs a summary to the console.
Confirm that the request works, and check that the summary numbers look plausible.


To make sure you're getting the right response, you can log `res` to the console.

```
  //add at the end of the default function
  console.log(JSON.stringify(res, null, "  "));
```

## Add response checks

Once you're sure the request is well-formed, add a [check](/using-k6/checks) that validates whether the system responds with the expected status code.

1. Update your script so it has the following check function.

  <CodeGroup labels={["checks response is 200"]} lineNumbers={["true"]} showCopyButton={[true]}>

  ```javascript
  // Import necessary modules
  import { check } from "k6";
  import http from "k6/http";
  
  export default function () {
    // define URL and request body
    const url = "https://test-api.k6.io/auth/basic/login/";
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
    const res = http.post(url, payload, params);
  
    // check that response is 200
    check(res, {
      "response code was 200": (res) => res.status == 200,
    });
  }
  ```
  
  </CodeGroup>

1. Inspect the result output for your check.
   It should looks something like this.

   ```
   ✓ response code was 200
   ```
 

<Blockquote mod="note" title="">

Under larger loads, this check will fail in some iterations.
**Failed checks do not stop tests.**

Rather, k6 tracks the success rate and presents it in your end of test summary.

</Blockquote>

## Next steps

In this tutorial, you've used k6 to make a POST request and check that it responds with a `200` status.

However, these tests make only one request, which doesn't say much about how the system will respond under load.
For that, you need to increase load.
