---
title: 'Checks'
description: 'Checks are like asserts but differ in that they do not halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue.'
weight: 03
---

# Checks

Checks validate boolean conditions in your test.
Testers often use checks to validate that the system is responding with the expected content.
For example, a check could validate that a POST request has a `response.status == 201`, or that the body is of a certain size.

Checks are similar to what many testing frameworks call an _assert_, but **failed checks do not cause the test to abort or finish with a failed status**.
Instead, k6 keeps track of the rate of failed checks as the test continues to run

Each check creates a [rate metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics).
To make a check abort or fail a test, you can combine it with a [Threshold](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds).

## Check for HTTP response code

Checks are great for codifying assertions relating to HTTP requests and responses.
For example, this snippet makes sure the HTTP response code is a 200:

{{< code >}}

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
```

{{< /code >}}

## Check for text in response body

Sometimes, even an HTTP 200 response contains an error message.
In these situations, consider adding a check to verify the response body, like this:

{{< code >}}

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'verify homepage text': (r) =>
      r.body.includes('Collection of simple web-pages suitable for load testing'),
  });
}
```

{{< /code >}}

## Check for response body size

To verify the size of the response body, you can use a check like this:

{{< code >}}

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
```

{{< /code >}}

## See percentage of checks that passed

When a script includes checks, the summary report shows how many of the tests' checks passed:

{{< code >}}

```bash
$ k6 run script.js

  ...
    ✓ is status 200

  ...
  checks.........................: 100.00% ✓ 1        ✗ 0
  data_received..................: 11 kB   12 kB/s
```

{{< /code >}}

In this example, note that the check "is status 200" succeeded 100% of the times it was called.

## Add multiple checks

You can also add multiple checks within a single [check()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) statement:

{{< code >}}

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
```

{{< /code >}}

When this test executes, the output will look something like this:

{{< code >}}

```bash
$ k6 run checks.js

  ...
    ✓ is status 200
    ✓ body size is 11,105 bytes

  ...
  checks.........................: 100.00% ✓ 2        ✗ 0
  data_received..................: 11 kB   20 kB/s
```

{{< /code >}}

{{% admonition type="note" %}}

When a check fails, the script will continue executing successfully and will not return a 'failed' exit status.
If you need the whole test to fail based on the results of a check, you have to [combine checks with thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds#fail-a-load-test-using-checks).
This is particularly useful in specific contexts, such as integrating k6 into your CI pipelines or receiving alerts when scheduling your performance tests.

{{% /admonition %}}

## Read more

- [Check Javascript API](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check)
- [Failing a load test using checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds#fail-a-load-test-using-checks)
- [k6chaijs](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs): use BDD assertions in k6
