---
title: 'Checks'
excerpt: 'Checks are like asserts but differ in that they do not halt the execution, instead, they just store the result of the check, pass or fail, and let the script execution continue.'
---

## What is a check?

Checks are like asserts but differ in that they don't halt the execution, instead, they just
store the result of the check, pass or fail, and let the script execution continue. Take a look at
[thresholds](/using-k6/thresholds) for a way to halt the execution. Checks are great for
codifying assertions relating to HTTP requests/responses, making sure the response code is 2xx
for example:

<CodeGroup labels={["check.js"]} lineNumbers={[true]}>

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

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: script.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m01.0s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.0s/10m0s  1/1 iters, 1 per VU

     ✓ is status 200

     checks.........................: 100.00% ✓ 1        ✗ 0
     data_received..................: 11 kB   12 kB/s
     data_sent......................: 76 B    77 B/s
     http_req_blocked...............: avg=443.3ms  min=443.3ms  med=443.3ms  max=443.3ms  p(90)=443.3ms  p(95)=443.3ms
     http_req_connecting............: avg=265.65ms min=265.65ms med=265.65ms max=265.65ms p(90)=265.65ms p(95)=265.65ms
     http_req_duration..............: avg=533.73ms min=533.73ms med=533.73ms max=533.73ms p(90)=533.73ms p(95)=533.73ms
       { expected_response:true }...: avg=533.73ms min=533.73ms med=533.73ms max=533.73ms p(90)=533.73ms p(95)=533.73ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 1
     http_req_receiving.............: avg=265.2ms  min=265.2ms  med=265.2ms  max=265.2ms  p(90)=265.2ms  p(95)=265.2ms
     http_req_sending...............: avg=131.54µs min=131.54µs med=131.54µs max=131.54µs p(90)=131.54µs p(95)=131.54µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=268.39ms min=268.39ms med=268.39ms max=268.39ms p(90)=268.39ms p(95)=268.39ms
     http_reqs......................: 1       1.015611/s
     iteration_duration.............: avg=983.63ms min=983.63ms med=983.63ms max=983.63ms p(90)=983.63ms p(95)=983.63ms
     iterations.....................: 1       1.015611/s
```

</CodeGroup>

In the output above you can see that our check "is status 200" was successful 100% of the times it was called.

You may also add multiple checks within a single check() statement, like this:

<CodeGroup labels={["checks.js"]} lineNumbers={[true]}>

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


          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: checks.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m00.6s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.6s/10m0s  1/1 iters, 1 per VU

     ✓ is status 200
     ✓ body size is 11,105 bytes

     checks.........................: 100.00% ✓ 2        ✗ 0
     data_received..................: 11 kB   20 kB/s
     data_sent......................: 76 B    136 B/s
     http_req_blocked...............: avg=283.41ms min=283.41ms med=283.41ms max=283.41ms p(90)=283.41ms p(95)=283.41ms
     http_req_connecting............: avg=268.91ms min=268.91ms med=268.91ms max=268.91ms p(90)=268.91ms p(95)=268.91ms
     http_req_duration..............: avg=275.21ms min=275.21ms med=275.21ms max=275.21ms p(90)=275.21ms p(95)=275.21ms
       { expected_response:true }...: avg=275.21ms min=275.21ms med=275.21ms max=275.21ms p(90)=275.21ms p(95)=275.21ms
     http_req_failed................: 0.00%   ✓ 0        ✗ 1
     http_req_receiving.............: avg=5.2ms    min=5.2ms    med=5.2ms    max=5.2ms    p(90)=5.2ms    p(95)=5.2ms
     http_req_sending...............: avg=120.73µs min=120.73µs med=120.73µs max=120.73µs p(90)=120.73µs p(95)=120.73µs
     http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=269.88ms min=269.88ms med=269.88ms max=269.88ms p(90)=269.88ms p(95)=269.88ms
     http_reqs......................: 1       1.783837/s
     iteration_duration.............: avg=559.01ms min=559.01ms med=559.01ms max=559.01ms p(90)=559.01ms p(95)=559.01ms
     iterations.....................: 1       1.783837/s
```

</CodeGroup>

## Using checks in a CI setting

One important thing to understand regarding checks is that a failed check _will not fail the whole
load test_.

Checks help to keep your code organized and easy to read, but when you're running a load test in
a CI test suite you may want to check for error conditions that fail the whole load test. In this
case you may want to combine checks with [thresholds](/using-k6/thresholds) to
get what you want:

<CodeGroup labels={["check_thresholds.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');
export let options = {
  thresholds: {
    errors: ['rate<0.1'], // <10% errors
  },
};

export default function () {
  const res = http.get('http://httpbin.org');
  const result = check(res, {
    'status is 200': (r) => r.status == 200,
  });

  errorRate.add(!result);
}
```

</CodeGroup>

The above script declares a custom [Rate](/javascript-api/k6-metrics/rate)
metric (called "errors") to hold information about the errors we have seen during the test, then
it uses a threshold on that custom metric to fail the test when it encounters too many errors.
If we replace the "http://httpbin.org" URL with one that will generate an error, k6 will exit with
a nonzero exit value, indicating a FAIL result to e.g. a CI system that may have executed it:

<CodeGroup labels={["check-threshold-output"]} lineNumbers={[false]}>

```bash
k6 run check_threshold.js

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: check_threshold.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m00.1s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m00.1s/10m0s  1/1 iters, 1 per VU

     ✗ status is 200
      ↳  0% — ✓ 0 / ✗ 1

     checks.....................: 0.00%   ✓ 0         ✗ 1
     data_received..............: 0 B     0 B/s
     data_sent..................: 0 B     0 B/s
   ✗ errors.....................: 100.00% ✓ 1         ✗ 0
     http_req_blocked...........: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_connecting........: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_duration..........: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_failed............: 100.00% ✓ 1         ✗ 0
     http_req_receiving.........: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_sending...........: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_tls_handshaking...: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...........: avg=0s      min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_reqs..................: 1       11.253551/s
     iteration_duration.........: avg=87.48ms min=87.48ms med=87.48ms max=87.48ms p(90)=87.48ms p(95)=87.48ms
     iterations.................: 1       11.253551/s

ERRO[0002] some thresholds have failed
```

</CodeGroup>

As you can see above, the exit code generated by k6 after this run was `99`. Any nonzero exit code
is commonly interpreted by Un\*x shells, CI servers, and monitoring systems as a "failure".

Note also that we use the return value of the `check()` to decide whether to increment our error rate.
When any one of the check conditions inside a check() call fails, check() returns false, which will cause
the error rate to be incremented. Only if _all_ check conditions pass will check() return true.

See [check()](/javascript-api/k6/check-val-sets-tags) in the script API reference for
more details on how check() works.

## Checks in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) `Checks` are available in their [own tab](/cloud/analyzing-results/checks-tab) for analysis.

Here we can quickly see what checks are failing, and upon clicking on any check, see the count of passes/failures
at given points in the test. You can also add the check to the analysis tab, for further comparison with other metrics.

![k6 Cloud Checks Tab](./images/Checks/cloud-insights-checks-tab.png)
