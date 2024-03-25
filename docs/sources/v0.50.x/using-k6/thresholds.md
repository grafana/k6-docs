---
title: 'Thresholds'
description: 'Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test.'
weight: 04
---

# Thresholds

Thresholds are the pass/fail criteria that you define for your test metrics.
If the performance of the system under test (SUT) does not meet the conditions of your threshold,
**the test finishes with a failed status.**

Often, testers use thresholds to codify their SLOs.
For example, you can create thresholds for any combination of the following expectations:

- Less than 1% of requests return an error.
- 95% of requests have a response time below 200ms.
- 99% of requests have a response time below 400ms.
- A specific endpoint always responds within 300ms.
- Any conditions for a [custom metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics).

Thresholds are also essential for [load-testing automation](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/automated-performance-testing):

1. Give your test a threshold.
1. Automate your execution
1. Set up alerts for test failures.

After that, you need to worry about the test only after your SUT fails to meet its performance expectations.

## Thresholds example for HTTP errors and response duration

This sample script specifies two thresholds.
One threshold evaluates the rate of HTTP errors (`http_req_failed` metric).
The other evaluates whether 95 percent of responses happen within a certain duration (the `http_req_duration` metric).

{{< code >}}

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

{{< /code >}}

In other words, when you define your threshold, specify an expression for a `pass` criteria.
If that expression evaluates to `false` at the end of the test, k6 considers the whole test a `fail`.

After executing that script, k6 outputs something similar to this:

{{< code >}}

```bash
   ✓ http_req_duration..............: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
       { expected_response:true }...: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
   ✓ http_req_failed................: 0.00%  ✓ 0 ✗ 1
```

{{< /code >}}

In this case, the test met the criteria for both thresholds.
k6 considers this test a `pass` and exits with an exit code `0`.

If any of the thresholds had failed, the little green checkmark <span style="color:green; font-weight:bold">✓</span> next to the threshold name
(`http_req_failed`, `http_req_duration`) would be a red cross <span style="color:red; font-weight:bold">✗</span>
and k6 would exit with a non-zero exit code.

## Threshold Syntax

To use a threshold, follow these steps:

1. In the `thresholds` property of the `options` object, set a key using the name of the metric you want the threshold for:

   ```javascript
   export const options = {
     thresholds: {
       /* ... */
     },
   };
   ```

2. Define at least one threshold expression. You can do this in two ways:

   - The short format puts all threshold expressions as strings in an array.
   - The long format puts each threshold in an object, with extra properties to [abort on failure](#abort-a-test-when-a-threshold-is-crossed).

   ```javascript
   export const options = {
     thresholds: {
       //short format
       METRIC_NAME1: ['THRESHOLD_EXPRESSION', `...`],
       //long format
       METRIC_NAME2: [
         {
           threshold: 'THRESHOLD_EXPRESSION',
           abortOnFail: true, // boolean
           delayAbortEval: '10s', // string
         },
       ], // full format
     },
   };
   ```

   Note that `METRIC_NAME1` and `THRESHOLD_EXPRESSION` are placeholders.
   The real text must be the name of the metric and the threshold expression.

This declaration configures thresholds for the metrics `metric_name1` and `metric_name2`.
To determine whether the threshold passes or fails, the script evaluates the `'threshold_expression'.`

### Threshold expression syntax

A threshold expression evaluates to `true` or `false`.
The threshold expression must be in the following format:

```
<aggregation_method> <operator> <value>
```

Some examples of threshold expressions are as follows:

- `avg < 200` // average duration must be less than 200ms
- `count >= 500` // count must be larger than or equal to 500
- `p(90) < 300` // 90% of samples must be below 300

### Aggregation methods by type

k6 aggregates metrics according to [their type](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics).
These aggregation methods form part of the threshold expressions.

| Metric type | Aggregation methods                                                                                                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Counter     | `count` and `rate`                                                                                                                                                                                                 |
| Gauge       | `value`                                                                                                                                                                                                            |
| Rate        | `rate`                                                                                                                                                                                                             |
| Trend       | `avg`, `min`, `max`, `med` and `p(N)` where `N` specifies the threshold percentile value, expressed as a number between 0.0 and 100. E.g. `p(99.99)` means the 99.99th percentile. The values are in milliseconds. |

This (slightly contrived) sample script uses all different types of metrics,
setting different types of thresholds for each:

{{< code >}}

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
    // Count: Incorrect content cannot be returned more than 99 times.
    'Errors': ['count<100'],
    // Gauge: returned content must be smaller than 4000 bytes
    'ContentSize': ['value<4000'],
    // Rate: content must be OK more than 95 times
    'Content OK': ['rate>0.95'],
    // Trend: Percentiles, averages, medians, and minimums
    // must be within specified milliseconds.
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
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

{{< /code >}}

{{% admonition type="caution" %}}

Do not specify multiple thresholds for the same metric by repeating the same object key.

{{% /admonition %}}

Since thresholds are defined as the properties of a JavaScript object, you can't specify multiple ones with the same property name.

{{< code >}}

```javascript
export const options = {
  thresholds: {
    // don't use the same metric more than once here
    metric_name: ['count<100'],
    metric_name: ['rate<50'],
  },
};
```

{{< /code >}}

The rest will be **silently** ignored.
If you want to set multiple thresholds for a metric, specify them with an [array for the same key](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds#multiple-thresholds-on-a-single-metric).

## Threshold examples to copy and paste

The quickest way to start with thresholds is to use the [built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference).
Here are a few copy-paste examples that you can start using right away.

For more specific threshold examples, refer to the [Counter](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/counter#counter-usage-in-thresholds), [Gauge](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/gauge#gauge-usage-in-thresholds), [Trend](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/trend#trend-usage-in-thresholds) and [Rate](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-metrics/rate#rate-usage-in-thresholds) pages.

### A percentile of requests finishes in a specified duration

{{< code >}}

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

{{< /code >}}

### Error rate is lower than 1 percent

{{< code >}}

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    // During the whole test execution, the error rate must be lower than 1%.
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

{{< /code >}}

### Multiple thresholds on a single metric

You can also apply multiple thresholds for one metric.
This threshold has different duration requirements for different request percentiles.

{{< code >}}

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

{{< /code >}}

### Threshold on group duration

You can set thresholds per [Group](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups#groups).
This code has groups for individual requests and batch requests.
For each group, there are different thresholds.

{{< code >}}

```javascript
import http from 'k6/http';
import { group, sleep } from 'k6';

export const options = {
  thresholds: {
    'group_duration{group:::individualRequests}': ['avg < 400'],
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

{{< /code >}}

## Set thresholds for specific tags

It's often useful to specify thresholds on a single URL or specific tag.
In k6, tagged requests create sub-metrics that you can use in thresholds:

```javascript
export const options = {
  thresholds: {
    'metric_name{tag_name:tag_value}': ['threshold_expression'],
  },
};
```

And here's a full example.

{{< code >}}

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

{{< /code >}}

## Abort a test when a threshold is crossed

If you want to abort a test as soon as a threshold is crossed,
set the `abortOnFail` property to `true`.
When you set `abortOnFail`, the test run stops _as soon as the threshold fails_.

Sometimes, though, a test might fail a threshold early and abort before the test generates significant data.
To prevent these cases, you can delay `abortOnFail` with `delayAbortEval`.
In this script, `abortOnFail` is delayed ten seconds.
After ten seconds, the test aborts if it fails the `p(99) < 10` threshold.

{{< code >}}

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

{{< /code >}}

The fields are as follows:

| Name           | Type    | Description                                                                                                                                                                                          |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| threshold      | string  | This is the threshold expression string specifying the threshold condition to evaluate.                                                                                                              |
| abortOnFail    | boolean | Whether to abort the test if the threshold is evaluated to false before the test has completed.                                                                                                      |
| delayAbortEval | string  | If you want to delay the evaluation of the threshold to let some metric samples to be collected, you can specify the amount of time to delay using relative time strings like `10s`, `1m` and so on. |

Here is an example:

{{< code >}}

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

{{< /code >}}

{{% admonition type="caution" %}}

When k6 runs in the cloud, thresholds are evaluated every 60 seconds.
Therefore, the `abortOnFail` feature may be delayed by up to 60 seconds.

{{% /admonition %}}

## Fail a load test using checks

[Checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks) are nice for codifying assertions, but unlike `thresholds`, `checks` do not affect the exit status of k6.

If you use only `checks` to verify that things work as expected, you can't fail the whole test run based on the `check` results.

It's often useful to combine `checks` and `thresholds`, to get the best of both:

{{< code >}}

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
  const res = http.get('https://httpbin.test.k6.io');

  check(res, {
    'status is 500': (r) => r.status == 500,
  });

  sleep(1);
}
```

{{< /code >}}

In this example, the `threshold` is configured on the [checks metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference), establishing that the rate of successful checks is higher than 90%.

Additionally, you can use `tags` on checks if you want to define a threshold based on a particular check or group of checks. For example:

{{< code >}}

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

  res = http.get('https://httpbin.test.k6.io');
  check(res, {
    'status is 500': (r) => r.status == 500,
  });

  res = http.get('https://httpbin.test.k6.io');
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

{{< /code >}}
