---
title: 'Checks'
excerpt: 'Checks are like asserts but differ in that they do not halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue.'
---

## What is a check?

[Checks](/javascript-api/k6/check-val-sets-tags/) are like asserts but differ in that they don't halt the execution, instead, they just
store the result of the check, pass or fail, and let the script execution continue. Take a look at
[thresholds](/using-k6/thresholds) for a way to halt the execution. Checks are great for
codifying assertions relating to HTTP requests/responses, making sure the response code is 2xx
for example:

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

In the above example, one check was specified but you can add as many as you need in a call to
[`check()`](/javascript-api/k6/check-val-sets-tags). When the above script is run you can see
how k6 displays the results of the check calls in the following output:

<CodeGroup labels={["check-output"]} lineNumbers={[false]}>

```bash
k6 run script.js

...
running (00m01.0s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.0s/10m0s  1/1 iters, 1 per VU

     ✓ is status 200

     checks.........................: 100.00% ✓ 1        ✗ 0
     data_received..................: 11 kB   12 kB/s
...
```

</CodeGroup>

In the output above you can see that our check "is status 200" was successful 100% of the times it was called.

You may also add multiple checks within a single check() statement, like this:

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

<CodeGroup labels={["checks-output"]} lineNumbers={[false]}>

```bash
k6 run checks.js

...
running (00m00.6s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.6s/10m0s  1/1 iters, 1 per VU

     ✓ is status 200
     ✓ body size is 11,105 bytes

     checks.........................: 100.00% ✓ 2        ✗ 0
     data_received..................: 11 kB   20 kB/s
...
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
