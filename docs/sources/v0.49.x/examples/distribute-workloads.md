---
title: Distribute workloads across VUs
description: How to configure different amounts of traffic for different VU behaviors
slug: /distribute-workloads
weight: 24
---

# Distribute workloads across VUs

k6 can schedule different load patterns for different VU functions.
A test with multiple workloads might better simulate traffic in the real world, where user behavior is rarely uniform.
For example, most traffic to an e-commerce site might come from users who only search for items and read reviews. A small percentage of users might actively shop, performing actions that involve writes to the database and calls to different APIs.

The following sections provide examples of how to structure k6 scripts to split logic across VUs.
To inspect the results for a certain behavior, you can [create a custom metric](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/create-custom-metrics) or use [Tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups) to filter by scenario, code block, or individual request.

{{% admonition type="note" %}}

These techniques can create very complex configurations.
However, more complexity creates more ambiguity in result interpretation

{{% /admonition %}}

## Split logic across scenarios

{{% admonition type="note" %}}

In this context, _workload_ refers to the traffic pattern simulated by a scenario.

{{% /admonition %}}

One way to distribute traffic is to use scenarios to schedule different workloads for different functions.

1. Define multiple scenarios in your [options](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/k6-options).
1. Use the scenario `exec` property to execute different VU functions with a workload.

For example, imagine a social media site that typically receives 100 concurrent users.
Of those, 80 might visit their contacts page, and 20 might view the news.
To configure such a distribution, make two scenarios with different throughput or VUs:

```javascript
import http from 'k6/http';

export const options = {
  //scenario to view contacts
  scenarios: {
    contacts: {
      executor: 'shared-iterations',
      exec: 'contacts',
      vus: 80,
      iterations: 100,
    },
    //scenario to view news
    news: {
      executor: 'shared-iterations',
      exec: 'news',
      vus: 20,
      iterations: 100,
    },
  },
};

//use the exec property to run different scenarios for different functions

export function contacts() {
  http.get('https://test.k6.io/contacts.php');
}

export function news() {
  http.get('https://test.k6.io/news.php');
}
```

To view granular results for a specific scenario, you can filter by the built-in scenario [tag](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).

## Distribute logic by VU ID

In some cases, writing a scenario for each behavior might be inconvenient or impractical.
As an alternative, you can distribute logic across a range of VUs with the [execution context variables](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/execution-context-variables) from the [`k6/execution`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-execution) module.
With the `exec` object, you can scope logic to a specific instance, scenario, or across all VUs.

For example, this statement assigns behavior to the first 25 VUs in a test.

```bash
if (exec.vu.idInTest <= 25) {
   //do something;
  }
```

For more flexibility, you can use modulo expressions to distribute VUs according to percentages.
For example, the following script distributes logic according to different user profiles:

- 40 percent of users check the news.
- 60 percent play a coinflip game.
  - Half bet `heads`, and half bet `tails`.

{{< code >}}

```javascript
import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  scenarios: {
    quickRamp: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      stages: [
        { target: 10, duration: '10s' },
        { target: 10, duration: '15s' },
        { target: 0, duration: '5s' },
      ],
    },
  },
};

export default function () {
  if (exec.vu.idInTest % 10 < 4) {
    // 0-3 range, read the news
    http.get('http://test.k6.io/news');
  } else if (exec.vu.idInTest % 10 < 7) {
    // 4-6 range, bet heads
    http.get('http://test.k6.io/flip_coin.php?bet=heads');
  } else {
    // 7-9 range, bet tails
    http.get('http://test.k6.io/flip_coin.php?bet=tails');
  }
}
```

To view results for a specific request or group, you can define [tags](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/tags-and-groups).

{{< /code >}}

## Randomize behavior

To add a degree of random behavior, consider one of the randomizing functions from the [k6 utils](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/utils).

For example, this script randomly assigns one behavior to happen one-third of the time, and another to happen all other times.

{{< code >}}

```javascript
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export default function () {
  if (randomIntBetween(1, 3) % 3 > 1) {
    console.log('1 in 3 times');
  } else {
    console.log('2 in 3 times');
  }
}
```

{{< /code >}}

For a more sophisticated example of randomizing, read this [forum post](https://community.grafana.com/t/how-to-distribute-vus-across-different-scenarios-with-k6/97698/17).
