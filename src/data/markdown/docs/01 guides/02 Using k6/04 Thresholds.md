---
title: 'Thresholds'
excerpt: ''
---

## What are thresholds?

Thresholds are a pass/fail criteria used to specify the performance expectations of the system under test. 

Example expectations (Thresholds):
 - System doesn't produce more than 1% errors
 - Response time for 95% of requests should be below 200ms.
 - Response time for 99% of requests should be below 400ms. 
 - Specific endpoint must always respond within 300ms. 
 
Thresholds analyze the performance metrics and determine the final test result (pass/fail). 
Thresholds are a essential for [load-testing automation](/testing-guides/automated-performance-testing). 

Here is a sample script that specifies two thresholds, one using a custom [Rate metric](/javascript-api/k6-metrics/rate), and one using a standard `http_req_duration` metric.

<div class="code-group" data-props='{"labels": ["threshold.js"], "lineNumbers": [true]}'>

```JavaScript
import http from 'k6/http';
import { Rate } from 'k6/metrics';

const myFailRate = new Rate('failed requests');

export let options = {
  thresholds: {
    'failed requests': ['rate<0.1'], // threshold on a custom metric
    'http_req_duration': ['p(95)<500']  // threshold on a standard metric
  }
};

export default function() {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  myFailRate.add(res.status !== 200);
}
```

</div>

The `failed requests` threshold specifies that we want our load test to be considered a failure 
(resulting in k6 exiting with a non-zero exit code) if 10% or more of requests resulted in the server
returning anything else than a 200-response. The `http_req_duration` threshold specifies that 
95% of requests must complete within 500ms. 

In other words, you specify the `pass` criteria when defining your threshold, and if that 
expression evaluates to `false` at the end of the test, the whole test will be considered a `fail`.

When executing that script, k6 will output something similar to this:
![executing k6 with a threshold](images/executing-with-a-threshold.png)
 
- In the above case, criteria for both thresholds were met. The whole load test is considered
  to be a `pass`, which means that k6 will exit with exit code zero.

- If any of the thresholds had failed, the little green checkmark 
<span style="color:green; font-weight:bold">✓</span> next to the threshold name
  (`failed requests`, `http_req_duration`) would have been a red cross <span style="color:red; font-weight:bold">✗</span> instead, and k6 would have generated a non-zero exit code.
  
  
## Copy-paste Threshold examples

The quickest way to start with thresholds is to use the [standard, built-in k6 metrics](/using-k6/metrics#http-specific-built-in-metrics). 

Here are a few copy-paste examples that you can start using right away.

<div class="code-group" data-props='{"labels": ["threshold-request-duration.js"], "lineNumbers": [true]}'>

```JavaScript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  thresholds: {
    // 90% of requests must finish within 400ms.
    'http_req_duration': ['p(90) < 400'], 
  }
};

export default function() {
  let res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</div>

### Multiple thresholds on a single metric
<div class="code-group" data-props='{"labels": ["threshold-request-duration.js"], "lineNumbers": [true]}'>

```JavaScript
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    'http_req_duration': ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],  
  }
};

export default function() {
  let res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
  sleep(1);
}
```

</div>

### Threshold on group duration

<div class="code-group" data-props='{"labels": ["threshold-group-duration.js"], "lineNumbers": [true]}'>

```javascript
import http from "k6/http";
import { group, sleep } from "k6";
import { Trend } from 'k6/metrics';

let groupDuration = Trend("groupDuration");

export let options = {
  thresholds: {
    'groupDuration{groupName:individualRequests}': ['avg < 200'],
    'groupDuration{groupName:batchRequests}': ['avg < 200'],
  },
  vus: 1,
  duration: '10s'
};

function groupWithDurationMetric(name, group_function) {
  let start = new Date();
  group(name, group_function);
  let end = new Date();
  groupDuration.add(end - start, {groupName: name})
}

export default function () {

  groupWithDurationMetric("individualRequests", function () {
    http.get('https://test-api.k6.io/public/crocodiles/1/');
    http.get('https://test-api.k6.io/public/crocodiles/2/');
    http.get('https://test-api.k6.io/public/crocodiles/3/');
  });

  groupWithDurationMetric("batchRequests", function () {
    http.batch([
      ['GET', `https://test-api.k6.io/public/crocodiles/1/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/2/`],
      ['GET', `https://test-api.k6.io/public/crocodiles/3/`],
    ]);
  });

  sleep(1);
}
```

</div>


You can find more specific threshold examples on the [Counter](/javascript-api/k6-metrics/counter#counter-usage-in-thresholds), [Gauge](/javascript-api/k6-metrics/gauge#gauge-usage-in-thresholds), [Trend](/javascript-api/k6-metrics/trend#trend-usage-in-thresholds) and [Rate](/javascript-api/k6-metrics/rate#rate-usage-in-thresholds) pages.


## Threshold Syntax

Thresholds can be specified in a short or full format. 

<div class="code-group" data-props='{"labels": ["threshold-options.js"], "lineNumbers": [true]}'>

```js
export let options = {
  thresholds: {
    metric_name1: [ 'threshold_expression', ... ], // short format
    metric_name1: [ { threshold: 'threshold_expression', abortOnFail: boolean, delayAbortEval: string }, ], // full format
  }
};
```

</div>

The above declaration inside a k6 script means that there will be a threshold configured for
the metric `metric_name1`. To determine if the threshold has failed or passed, the string `'threshold_expression'`
will be evaluated. The `'threshold_expression'` must follow the following format.

`aggregation_method operator value` 

Examples:
 - `avg < 200` // average duration can't be larger than 200ms
 - `count >= 500` // count must be larger or equal to 500 
 - `p(90) < 300` // 90% of samples must be below 300

A threshold expression evaluates to `true` or `false`. 
There are four metric types in k6, and each metric type provides its own set of aggregation methods which can be used in threshold expressions. 


| Metric type    | Aggregation methods |
| -------------- | ------- | 
| Counter | `count` and `rate` | 
| Gauge | `value` | 
| Rate | `rate` | 
| Trend | `avg`, `min`, `max`, `med` and `p(N)` where `N` is a number between 0.0 and 100.0 meaning the percentile value to look at, eg. `p(99.99)` means the 99.99th percentile. The unit for these values is milliseconds. | 

Here is a (slightly contrived) sample script that uses all different types of metrics, and sets
different types of thresholds for them:

<div class="code-group" data-props='{"labels": ["thresholds-all.js"], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export let TrendRTT = new Trend('RTT');
export let RateContentOK = new Rate('Content OK');
export let GaugeContentSize = new Gauge('ContentSize');
export let CounterErrors = new Counter('Errors');
export let options = {
  thresholds: {
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
    'Content OK': ['rate>0.95'],
    'ContentSize': ['value<4000'],
    'Errors': ['count<100'],
  }
};

export default function() {
  let res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  let contentOK = res.json('name') === "Bert";

  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);
  
  sleep(1);
}
```

</div>

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


## Thresholds on tags

It's often useful to specify thresholds only on a single URL or a specific tag. 
In k6, tagged requests create sub-metrics that can be used in thresholds as shown below.

```javascript
export let options = {
  thresholds: {
    "metric_name{tag_name:tag_value}": ["threshold_expression"],  
  }
}
```

And here's a full example.

<div class="code-group" data-props='{"labels": ["thresholds-on-submetrics.js"], "lineNumbers": [true]}'>

```javascript
import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let options = {
  thresholds: {
    "http_req_duration{type:API}": ["p(95)<500"],  // threshold on API requests only
    "http_req_duration{type:staticContent}": ["p(95)<200"],  // threshold on static content only
  }
};

export default function() {
  let res1 = http.get('https://test-api.k6.io/public/crocodiles/1/', {tags: {'type': 'API'} } );
  let res2 = http.get('https://test-api.k6.io/public/crocodiles/2/', {tags: {'type': 'API'} } );

  let responses = http.batch([
    ['GET', 'https://test-api.k6.io/static/favicon.ico', null, { tags: { type: 'staticContent' } }],
    ['GET', 'https://test-api.k6.io/static/css/site.css', null, { tags: { type: 'staticContent' } }],
  ]);

  sleep(1);
}

```

</div>

## Aborting a test when a threshold is crossed

If you want to abort a test as soon as a threshold is crossed, before the test has completed,
there's an extended threshold specification format that looks like this:

<div class="code-group" data-props='{"labels": ["threshold-abort.js"], "lineNumbers": [true]}'>

```js
export let options = {
  thresholds: {
    metric_name: [ { threshold: string, abortOnFail: boolean, delayAbortEval: string }, ... ],
  }
};
```

</div>

As you can see in the example above the threshold specification has been extended to alternatively
support a JS object with parameters to control the abort behavior. The fields are as follows:

| Name           | Type    | Description                                                                                                                                                                                                               |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| threshold      | string  | This is the threshold expression string specifying the threshold condition to evaluate.                                                                                                                                          |
| abortOnFail    | boolean | Whether to abort the test if the threshold is evaluated to false before the test has completed.                                                                                                                           |
| delayAbortEval | string  | If you want to delay the evaluation of the threshold for some time, to allow for some metric samples to be collected, you can specify the amount of time to delay using relative time strings like `10s`, `1m` and so on. |

> ### ⚠️ Evaluation delay in the cloud
>
> When k6 runs in the cloud, thresholds are evaluated every 60 seconds, therefore the "abortOnFail" 
> feature may be delayed by up to 60 seconds.


## Failing a load test using checks

[Checks](/using-k6/checks) are nice for codifying assertions, but unlike `thresholds`, `checks` will not affect the exit status of k6.

If you only use `checks` to verify that things work as expected, you will not be able to fail the whole test run based on the results of those `checks`.

It can often be useful to combine `checks` and `thresholds`, to get the best of both:

<div class="code-group" data-props='{"labels": ["check_and_fail.js"], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    // the rate of successful checks should be higher than 90%
    'checks': ['rate>0.9']
  }
};

export default function() {

  const res = http.get('http://httpbin.org');

  check(res, {
    'status is 500': r => r.status == 500,
  });

  sleep(1);
}
```

</div>

In this example, the `threshold` is configured on the [checks metric](/using-k6/metrics#built-in-metrics) - establishing that the rate of successful checks should be higher than 90%.

Additionally, you can use `tags`  on checks if you want to define a threshold based on a particular check or group of checks. For example:

<div class="code-group" data-props='{"labels": [""], "lineNumbers": [true]}'>

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    'checks{myTag:hola}': ['rate>0.9']
  }
};

export default function() {

  let res;

  res = http.get('http://httpbin.org');
  check(res, {
    'status is 500': r => r.status == 500,
  });

  res = http.get('http://httpbin.org');
  check(res, {
    'status is 200': r => r.status == 200,
  }, {myTag: 'hola'});

  sleep(1);
}
```

</div>


## Thresholds in k6 Cloud Results

In [k6 Cloud Results](/cloud/analyzing-results/overview) `Thresholds` are available in
their [own tab](/cloud/analyzing-results/threshold-tab) for analysis.

You can also see how the underlying metric compares to a specific threshold throughout the test.
The threshold can be added to the analysis tab for further comparison against other metrics.

![k6 Cloud Thresholds Tab](images/cloud-insights-thresholds-tab.png)

Learn more about analyzing results in the [k6 Cloud Results docs](/cloud/analyzing-results/overview).
