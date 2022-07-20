---
title: 'Checks'
excerpt: 'Checks are like asserts but differ in that they do not halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue.'
---

Checks are true/false conditions that evaluate the content of some value in the Javascript runtime.

In practice, checks often evaluate whether the system under test responds with a certain value.
A check may evaluate:
- That the system responds with a 200 status
- That a response body contains certain text
- That the response body is of a specified size.

Unlike many JS `assert` functions,
checks _do not_ throw errors or halt execution.
Instead, k6 stores the result of the check&mdash;either `pass` or `fail`&mdash;and the script continues.
If you want to halt a run when a check fails, you can make a metric for the check and use it in a [threshold](/using-k6/thresholds).

## Check for HTTP response code

Checks are great for codifying assertions relating to HTTP requests and responses.
For example, this snippet makes sure the HTTP response code is a 200:

<CodeGroup lineNumbers={[true]}>

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

</CodeGroup>

## Check for text in response body

Sometimes, even an HTTP 200 response contains an error message.
In these situations, consider adding a check to verify the response body, like this:

<CodeGroup lineNumbers={[true]}>

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

</CodeGroup>

## Check for response body size

To verify the size of the response body, you can use a check like this:

<CodeGroup lineNumbers={[true]}>

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

</CodeGroup>

## See percentage of checks that passed

When a script includes checks, the summary report shows how many of the tests' checks passed:

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

In this example, note that the check "is status 200" succeeded 100% of the times it was called.

## Add multiple checks

You can also add multiple checks within a single [check()](/javascript-api/k6/check) statement:

<CodeGroup lineNumbers={[true]}>

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

</CodeGroup>

When this test executes, the output will look something like this:

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
> If you need the whole test to fail based on the results of a check, you have to [combine checks with thresholds](/using-k6/thresholds/#failing-a-load-test-using-checks).
> This is particularly useful in specific contexts, such as integrating k6 into your CI pipelines or receiving alerts when scheduling your performance tests.

## Checks in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) `Checks` are available in their [own tab](/cloud/analyzing-results/checks) for analysis.

Here we can quickly see what checks are failing.
When you select a check, you can see the count of passes/failures at given points in the test.
You can also add the check to the **analysis** tab, for further comparison with other metrics.

![k6 Cloud Checks Tab](./images/Checks/cloud-insights-checks-tab.png)

## Read more

- [Check Javascript API](/javascript-api/k6/check/)
- [Failing a load test using checks](/using-k6/thresholds/#failing-a-load-test-using-checks)
