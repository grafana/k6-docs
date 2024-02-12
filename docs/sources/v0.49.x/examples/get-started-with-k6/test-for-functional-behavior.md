---
title: Test for functional behavior
description: Use k6 to write requests and assert that they respond correctly
weight: 100
---

# Test for functional behavior

In this tutorial, learn how to write a test that does the following:

- Sends a POST request to the new endpoint
- Creates a check for the response status

## Script the Request

The first thing to do is to add logic for the endpoint.
To do that, you need to make an [HTTP request](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests):

1. Import the HTTP module.
2. Create a payload to authenticate the user.
3. Use the [`http.post`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/post) method to send your request with the payload to an endpoint.

To test, copy this file and save it as `api-test.js`.

{{< code >}}

```javascript
// import necessary module
import http from 'k6/http';

export default function () {
  // define URL and payload
  const url = 'https://test-api.k6.io/auth/basic/login/';
  const payload = JSON.stringify({
    username: 'test_case',
    password: '1234',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);
}
```

{{< /code >}}

Run the script using the `k6 run` command:

```bash
k6 run api-test.js
```

After the test finishes, k6 reports the [default result summary](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test#the-default-summary).

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: api-test.js
     output: -
  ...
```

As an optional step, you can log the response body to the console to make sure you're getting the right response.

{{< code >}}

```javascript
export default function () {
  ...

  const res = http.post(url, payload, params);

  // Log the request body
  console.log(res.body);
}
```

{{< /code >}}

## Add response checks

Once you're sure the request is well-formed, add a [check](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks) that validates whether the system responds with the expected status code.

1. Update your script so it has the following check function.

{{< code >}}

```javascript
// Import necessary modules
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  // define URL and request body
  const url = 'https://test-api.k6.io/auth/basic/login/';
  const payload = JSON.stringify({
    username: 'test_case',
    password: '1234',
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // send a post request and save response as a variable
  const res = http.post(url, payload, params);

  // check that response is 200
  check(res, {
    'response code was 200': (res) => res.status == 200,
  });
}
```

{{< /code >}}

1. Run the script again.

```bash
k6 run api-test.js
```

1. Inspect the result output for your check.
   It should look something like this.

   ```
   ✓ response code was 200
   ```

{{% admonition type="note" %}}

Under larger loads, this check will fail in some iterations.
**Failed checks do not stop tests.**

Rather, k6 tracks the success rate and presents it in your [end of test](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test) summary.

{{% /admonition %}}

## Next steps

In this tutorial, you've used k6 to make a POST request and check that it responds with a `200` status.

However, these tests make only one request, which doesn't say much about how the system will respond under load.
For that, you need to [test under load](https://grafana.com/docs/k6/<K6_VERSION>/examples/get-started-with-k6/test-for-performance).
