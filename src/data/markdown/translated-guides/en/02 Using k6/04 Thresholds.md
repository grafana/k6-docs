---
title: 'Thresholds'
excerpt: 'Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test.'
---

## What are thresholds?

Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test.

Example expectations (Thresholds):

- System doesn't produce more than 1% errors.
- Response time for 95% of requests should be below 200ms.
- Response time for 99% of requests should be below 400ms.
- Specific endpoint must always respond within 300ms.
- Any conditions on any [Custom metric](/using-k6/metrics#custom-metrics).

Thresholds analyze the performance metrics and determine the final test result (pass/fail).
Thresholds are a essential for [load-testing automation](/testing-guides/automated-performance-testing).

Here is a sample script that specifies two thresholds, one evaluating the rate of http errors (`http_req_failed` metric) and one using the 95 percentile of all the response durations (the `http_req_duration` metric).

<CodeGroup labels={["threshold.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

</CodeGroup>

In other words, you specify the `pass` criteria when defining your threshold, and if that
expression evaluates to `false` at the end of the test, the whole test will be considered a `fail`.

When executing that script, k6 will output something similar to this:

<CodeGroup labels={["threshold-output"]} lineNumbers={[false]}>

```bash
   ✓ http_req_duration..............: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
       { expected_response:true }...: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
   ✓ http_req_failed................: 0.00%  ✓ 0 ✗ 1
```
</CodeGroup>

- In the above case, the criteria for both thresholds were met. The whole load test is considered
  to be a `pass`, which means that k6 will exit with exit code zero.

- If any of the thresholds had failed, the little green checkmark <span style="color:green; font-weight:bold">✓</span> next to the threshold name
  (`http_req_failed`, `http_req_duration`) would have been a red cross <span style="color:red; font-weight:bold">✗</span> instead, and k6 would have generated a non-zero exit code.

## Copy-paste Threshold examples

The quickest way to start with thresholds is to use the [standard, built-in k6 metrics](/using-k6/metrics#http-specific-built-in-metrics).

Here are a few copy-paste examples that you can start using right away.

<CodeGroup labels={["threshold-request-duration.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // 90% of requests must finish within 400ms.
    http_req_duration: ['p(90) < 400'],
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</CodeGroup>

<CodeGroup labels={["threshold-error-rate.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // During the whole test execution, the error rate must be lower than 1%.
    // `http_req_failed` metric is available since v0.31.0
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</CodeGroup>

### Multiple thresholds on a single metric

<CodeGroup labels={["threshold-request-duration.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};

export default function () {
  const res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</CodeGroup>

### Threshold on group duration

<CodeGroup labels={["threshold-group-duration.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  thresholds: {
    'group_duration{group:::individualRequests}': ['avg < 200'],
    'group_duration{group:::batchRequests}': ['avg < 200'],
  },
  vus: 1,
  duration: '10s',
};

export default function () {
  group('individualRequests', function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    http.get('https://test-api.k6.io/public/crocodiles/2/');
    http.get('https://test-api.k6.io/public/crocodiles/3/');
  });

  group('batchRequests', function () {
    http.batch([
      ['GET', `https://test-api.k6.io/public/crocodiles/1/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/2/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/3/`],
    ]);
  });

  sleep(1);
}
```

</CodeGroup>

You can find more specific threshold examples on the [Counter](/javascript-api/k6-metrics/counter#counter-usage-in-thresholds), [Gauge](/javascript-api/k6-metrics/gauge#gauge-usage-in-thresholds), [Trend](/javascript-api/k6-metrics/trend#trend-usage-in-thresholds) and [Rate](/javascript-api/k6-metrics/rate#rate-usage-in-thresholds) pages.

## Threshold Syntax

A threshold requires at least one `threshold_expression` to be defined:

<CodeGroup labels={["threshold-options.js"]} lineNumbers={[true]}>

```javascript
export const options = {
  thresholds: {
    metric_name1: [ 'threshold_expression', ... ], // short format
    metric_name2: [
      {
        threshold: 'threshold_expression',
        abortOnFail: true, // boolean
        delayAbortEval: '10s', // string
      },
    ], // full format
  }
};
```

</CodeGroup>

The above declaration inside a k6 script means that there will be thresholds configured for
the metrics `metric_name1` and `metric_name2`. To determine if the threshold has failed or passed, the string `'threshold_expression'`
will be evaluated. The `'threshold_expression'` must follow the following format:

`aggregation_method operator value`

Examples:

- `avg < 200` // average duration can't be larger than 200ms
- `count >= 500` // count must be larger or equal to 500
- `p(90) < 300` // 90% of samples must be below 300

A threshold expression evaluates to `true` or `false`.

Each of the four metric types included in k6 provide its own set of aggregation methods usable in threshold expressions.

| Metric type | Aggregation methods                                                                                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Counter     | `count` and `rate`                                                                                                                                                                                                  |
| Gauge       | `value`                                                                                                                                                                                                             |
| Rate        | `rate`                                                                                                                                                                                                              |
| Trend       | `avg`, `min`, `max`, `med` and `p(N)` where `N` is a number between 0.0 and 100.0 meaning the percentile value to look at, e.g. `p(99.99)` means the 99.99th percentile. The unit for these values is milliseconds. |

Here is a (slightly contrived) sample script that uses all different types of metrics, and sets
different types of thresholds for them:

<CodeGroup labels={["thresholds-all.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');
export const options = {
  thresholds: {
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
    'Content OK': ['rate>0.95'],
    'ContentSize': ['value<4000'],
    'Errors': ['count<100'],
  },
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  const contentOK = res.json('name') === 'Bert';

  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);

  sleep(1);
}
```

</CodeGroup>

We have these thresholds:

- A trend metrics that is fed with response time samples, and which has the following threshold
  criteria:
  - 99th percentile response time must be below 300 ms
  - 70th percentile response time must be below 250 ms
  - Average response time must be below 200 ms
  - Median response time must be below 150 ms
  - Minimum response time must be below 100 ms
- A rate metric that keeps track of how often the content returned was OK. This metric has one
  success criteria: content must have been OK more than 95% of the time.
- A gauge metric that contains the latest size of the returned content. The success criteria for
  this metric is that the returned content must be smaller than 4000 bytes.
- A counter metric that keeps track of the total number of times content returned was **not** OK.
  The success criteria here implies that content can't have been bad more than 99 times.

**⚠️ Common mistake** Do not specify multiple thresholds for the same metric by repeating the same object key:

<CodeGroup labels={["threshold-duplicate-mistake.js"]} lineNumbers={[true]}>

```javascript
export let options = {
  thresholds: {
    // avoid using the same metric more than once here
    // metric_name: [ 'count<100' ],
    // metric_name: [ 'rate<50' ],
  }
};
```
</CodeGroup>

Since thresholds are defined as the properties of a JavaScript object, it's not possible to specify multiple ones with the same property name. Only the last one will remain and the rest will be **silently** ignored. You should specify them with an [array for the same key instead](/using-k6/thresholds/#multiple-thresholds-on-a-single-metric).

## Thresholds on tags

It's often useful to specify thresholds only on a single URL or a specific tag.
In k6, tagged requests create sub-metrics that can be used in thresholds as shown below.

```javascript
export const options = {
  thresholds: {
    'metric_name{tag_name:tag_value}': ['threshold_expression'],
  },
};
```

And here's a full example.

<CodeGroup labels={["thresholds-on-submetrics.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
  thresholds: {
    'http_req_duration{type:API}': ['p(95)<500'], // threshold on API requests only
    'http_req_duration{type:staticContent}': ['p(95)<200'], // threshold on static content only
  },
};

export default function () {
  const res1 = http.get('https://test-api.k6.io/public/crocodiles/1/', {
    tags: { type: 'API' },
  });
  const res2 = http.get('https://test-api.k6.io/public/crocodiles/2/', {
    tags: { type: 'API' },
  });

  const responses = http.batch([
    ['GET', 'https://test-api.k6.io/static/favicon.ico', null, { tags: { type: 'staticContent' } }],
    [
      'GET',
      'https://test-api.k6.io/static/css/site.css',
      null,
      { tags: { type: 'staticContent' } },
    ],
  ]);

  sleep(1);
}
```

</CodeGroup>

## Aborting a test when a threshold is crossed

If you want to abort a test as soon as a threshold is crossed, before the test has completed,
there's an extended threshold specification format that looks like this:

<CodeGroup labels={["threshold-abort.js"]} lineNumbers={[true]}>

```javascript
export const options = {
  thresholds: {
    metric_name: [
      {
        threshold: 'p(99) < 10', // string
        abortOnFail: true, // boolean
        delayAbortEval: '10s', // string
        /*...*/
      },
    ],
  },
};
```

</CodeGroup>

As you can see in the example above the threshold specification has been extended to alternatively
support a JS object with parameters to control the abort behavior. The fields are as follows:

| Name           | Type    | Description                                                                                                                                                                                                               |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| threshold      | string  | This is the threshold expression string specifying the threshold condition to evaluate.                                                                                                                                   |
| abortOnFail    | boolean | Whether to abort the test if the threshold is evaluated to false before the test has completed.                                                                                                                           |
| delayAbortEval | string  | If you want to delay the evaluation of the threshold for some time, to allow for some metric samples to be collected, you can specify the amount of time to delay using relative time strings like `10s`, `1m` and so on. |

Here is an example:

<CodeGroup labels={["abort-on-fail-threshold.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export const options = {
  vus: 30,
  duration: '2m',
  thresholds: {
    http_req_duration: [{ threshold: 'p(99) < 10', abortOnFail: true }],
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

</CodeGroup>

> **⚠️ Evaluation delay in the cloud**
>
> When k6 runs in the cloud, thresholds are evaluated every 60 seconds, therefore the "abortOnFail" feature may be delayed by up to 60 seconds.

## Failing a load test using checks

[Checks](/using-k6/checks) are nice for codifying assertions, but unlike `thresholds`, `checks` will not affect the exit status of k6.

If you only use `checks` to verify that things work as expected, you will not be able to fail the whole test run based on the results of those `checks`.

It can often be useful to combine `checks` and `thresholds`, to get the best of both:

<CodeGroup labels={["check_and_fail.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    // the rate of successful checks should be higher than 90%
    checks: ['rate>0.9'],
  },
};

export default function () {
  const res = http.get('http://httpbin.test.k6.io');

  check(res, {
    'status is 500': (r) => r.status == 500,
  });

  sleep(1);
}
```

</CodeGroup>

In this example, the `threshold` is configured on the [checks metric](/using-k6/metrics#built-in-metrics) - establishing that the rate of successful checks should be higher than 90%.

Additionally, you can use `tags` on checks if you want to define a threshold based on a particular check or group of checks. For example:

<CodeGroup labels={[""]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    'checks{myTag:hola}': ['rate>0.9'],
  },
};

export default function () {
  let res;

  res = http.get('http://httpbin.test.k6.io');
  check(res, {
    'status is 500': (r) => r.status == 500,
  });

  res = http.get('http://httpbin.test.k6.io');
  check(
    res,
    {
      'status is 200': (r) => r.status == 200,
    },
    { myTag: 'hola' }
  );

  sleep(1);
}
```

</CodeGroup>

## Thresholds in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) `Thresholds` are available in
their [own tab](/cloud/analyzing-results/threshold-tab) for analysis.

You can also see how the underlying metric compares to a specific threshold throughout the test.
The threshold can be added to the analysis tab for further comparison against other metrics.

![k6 Cloud Thresholds Tab](images/Thresholds/cloud-insights-thresholds-tab.png)

Learn more about analyzing results in the [k6 Cloud Results docs](/cloud/analyzing-results/overview).
