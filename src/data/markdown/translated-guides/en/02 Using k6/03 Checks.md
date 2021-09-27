---
title: 'Checks'
excerpt: 'Checks are like asserts but differ in that they do not halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue.'
---

## What is a check?

[Checks](/javascript-api/k6/check-val-sets-tags/) are like assertions, but differ in that they don't halt the execution. Instead, they store the result of the check, pass or fail, and let the script execution continue. Take a look at [thresholds](/using-k6/thresholds) for a way to halt the execution of a test based on checks. 

### Check for HTTP response code returned

Checks are great for codifying assertions relating to HTTP requests/responses, such as making sure the response code is an HTTP 2xx:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  let res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}
```

</CodeGroup>

### Check for text in response body returned

Sometimes, even an HTTP 200 response can contain an error message. In these situations, consider adding a check to verify the response body, like this:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  let res = http.get('http://test.k6.io/');
  check(res, {
    'verify homepage text': (r) => r.body.includes("Collection of simple web-pages suitable for load testing"),
  });
}
```

</CodeGroup>

### Check for response body size

If you want to verify that the response to a request that k6 sends is of a certain size, you can use a check for that like this:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  let res = http.get('http://test.k6.io/');
  check(res, {
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
```

</CodeGroup>

### Check output

When you run a script including checks, you can see the outcome of the check calls in the following output:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  ...
    ✓ is status 200

  ...
  checks.........................: 100.00% ✓ 1        ✗ 0
  data_received..................: 11 kB   12 kB/s
```

</CodeGroup>

In the output above you can see that our check "is status 200" was successful 100% of the times it was called.

### Adding multiple checks

You may also add multiple checks within a single [check()](/javascript-api/k6/check-val-sets-tags) statement, like this:

<CodeGroup lineNumbers={[true]}>

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  let res = http.get('http://test.k6.io/');
  check(res, {
    'is status 200': (r) => r.status === 200,
    'body size is 11,105 bytes': (r) => r.body.length == 11105,
  });
}
```

</CodeGroup>

When this test is executed, the output will look like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run checks.js

  ...
    ✓ is status 200
    ✓ body size is 11,105 bytes

  ...
  checks.........................: 100.00% ✓ 2        ✗ 0
  data_received..................: 11 kB   20 kB/s
```

</CodeGroup>

> #### About Failing Checks
>
> When a check fails, the script will continue executing successfully and will not return a 'failed' exit status.
> If you need the whole test to fail based on the results of a check, you have to [combine checks with thresholds](https://k6.io/docs/using-k6/thresholds/#failing-a-load-test-using-checks).
> This is particularly useful in specific contexts, such as integrating k6 into your CI pipelines or receiving alerts when scheduling your performance tests.

## Checks in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) `Checks` are available in their [own tab](/cloud/analyzing-results/checks-tab) for analysis.

Here we can quickly see what checks are failing, and upon clicking on any check, see the count of passes/failures
at given points in the test. You can also add the check to the analysis tab, for further comparison with other metrics.

![k6 Cloud Checks Tab](./images/Checks/cloud-insights-checks-tab.png)

## See also

- [Check Javascript API](/javascript-api/k6/check-val-sets-tags/)
- [Failing a load test using checks](/using-k6/thresholds/#failing-a-load-test-using-checks)
