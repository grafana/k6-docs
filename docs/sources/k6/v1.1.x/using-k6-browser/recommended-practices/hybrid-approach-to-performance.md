---
title: 'Hybrid approach to performance'
heading: 'Hybrid performance with k6 browser'
head_title: 'Hybrid performance with k6 browser'
description: 'An example on how to implement a hybrid approach to performance with k6 browser'
weight: 01
---

# Hybrid performance with k6 browser

An alternative approach to [browser-based load testing](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/load-testing-websites/#browser-based-load-testing) that's much less resource-intensive is combining a small number of virtual users for a browser test with a large number of virtual users for a protocol-level test.

You can achieve [hybrid performance](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/load-testing-websites#hybrid-load-testing) in multiple ways, often by using different tools. To simplify the developer experience, you can combine k6 browser with core k6 features to write hybrid tests in a single script.

Some of the advantages of running a hybrid performance test are:

- Testing real user flows on the frontend while generating a higher load in the backend.
- Measuring backend and frontend performance in the same test execution
- Increased collaboration between backend and frontend teams since the same tool can be used.

{{< admonition type="note" >}}

Keep in mind that there is an additional performance overhead when it comes to spinning up a browser VU and that the resource usage will depend on the system under test.

{{< /admonition >}}

## Browser and HTTP test

To run a browser-level and protocol-level test concurrently in k6, you can use [scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios).

The code below shows an example of combining a browser and HTTP test in a single script. While the script exposes the backend to the typical load, it also checks the frontend for any unexpected issues. It also defines thresholds to check both HTTP and browser metrics against pre-defined SLOs.

{{< code >}}

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import http from 'k6/http';

const BASE_URL = __ENV.BASE_URL || 'https://quickpizza.grafana.com';

export const options = {
  scenarios: {
    load: {
      exec: 'getPizza',
      executor: 'ramping-vus',
      stages: [
        { duration: '5s', target: 5 },
        { duration: '10s', target: 5 },
        { duration: '5s', target: 0 },
      ],
      startTime: '10s',
    },
    browser: {
      exec: 'checkFrontend',
      executor: 'constant-vus',
      vus: 1,
      duration: '30s',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    browser_web_vital_fcp: ['p(95) < 1000'],
    browser_web_vital_lcp: ['p(95) < 2000'],
  },
};

export function getPizza() {
  const restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: false,
    excludedIngredients: ['pepperoni'],
    excludedTools: ['knife'],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2,
  };

  const res = http.post(`${BASE_URL}/api/pizza`, JSON.stringify(restrictions), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token abcdef0123456789',
    },
  });

  check(res, {
    'status is 200': (res) => res.status === 200,
  });
}

export async function checkFrontend() {
  const page = await browser.newPage();

  try {
    await page.goto(BASE_URL);

    await check(page.locator('h1'), {
      header: async (lo) =>
        (await lo.textContent()) == 'Looking to break out of your pizza routine?',
    });

    await Promise.all([
      page.locator('//button[. = "Pizza, Please!"]').click(),
      page.waitForTimeout(500),
    ]);
    await page.screenshot({ path: `screenshots/${__ITER}.png` });

    await check(page.locator('div#recommendations'), {
      recommendation: async (lo) => (await lo.textContent()) != '',
    });
  } finally {
    await page.close();
  }
}
```

{{< /code >}}

If you save that script to a local file named `test.js`, you can run it with:

```bash
k6 run test.js
```

The script also includes a common best practice by defining a `BASE_URL` variable, and using the [environment variable](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/environment-variables/) value `__ENV.BASE_URL` if it exists. That's useful if you want to use the same script for multiple environments, such as staging and production, and you could pass that value to your script with the command:

```bash
k6 run -e BASE_URL=https://quickpizza.grafana.com test.js
```

## Browser and failure injection test

You can also run a browser test together with a failure injection test by using the [xk6-disruptor](https://github.com/grafana/xk6-disruptor) extension. This approach lets you find issues in your frontend if any services it depends on are suddenly injected with failures, such as delays or server errors.

The following code shows an example of how you could use the xk6-disruptor extension to introduce faults to a Kubernetes service. At the same time, the `browser` scenario runs to ensure the frontend application is free of any unexpected errors that may not have been handled properly.

To find out more information about injecting faults to your service, check out the [Get started with xk6-disruptor guide](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/injecting-faults-with-xk6-disruptor/first-steps/).

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { check } from 'https://jslib.k6.io/k6-utils/1.5.0/index.js';
import { ServiceDisruptor } from 'k6/x/disruptor';

const BASE_URL = __ENV.BASE_URL;

export const options = {
  scenarios: {
    disrupt: {
      executor: 'shared-iterations',
      iterations: 1,
      vus: 1,
      exec: 'disrupt',
    },
    browser: {
      executor: 'constant-vus',
      vus: 1,
      duration: '10s',
      startTime: '10s',
      exec: 'browser',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    browser_web_vital_fcp: ['p(95) < 1000'],
    browser_web_vital_lcp: ['p(95) < 2000'],
  },
};

// Add faults to the service by introducing a delay of 1s and 503 errors to 10% of the requests.
const fault = {
  averageDelay: '1000ms',
  errorRate: 0.1,
  errorCode: 503,
};

export function disrupt() {
  const disruptor = new ServiceDisruptor('pizza-info', 'pizza-ns');
  const targets = disruptor.targets();
  if (targets.length == 0) {
    throw new Error('expected list to have one target');
  }

  disruptor.injectHTTPFaults(fault, '20s');
}

export async function checkFrontend() {
  const page = await browser.newPage();

  try {
    await page.goto(BASE_URL);
    await check(page.locator('h1'), {
      header: async (lo) =>
        (await lo.textContent()) == 'Looking to break out of your pizza routine?',
    });

    await Promise.all([
      page.locator('//button[. = "Pizza, Please!"]').click(),
      page.waitForTimeout(500),
    ]);
    await page.screenshot({ path: `screenshots/${__ITER}.png` });

    await check(page.locator('div#recommendations'), {
      recommendation: async (lo) => (await lo.textContent()) != '',
    });
  } finally {
    await page.close();
  }
}
```

## Recommended practices

- **Start small**. Start with a small number of browser-based virtual users. A good starting point is to have 10% virtual users or less to monitor the user experience for your end-users, while the script emulates around 90% of traffic from the protocol level.
- **Combine browser test with different load testing types**. To fully understand the impact of different traffic patterns on your end-user experience, experiment with running your browser test with different [load testing types](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/).
- **Focus on high-risk user journeys as a start**. Identify the high-risk user journeys first so you can start monitoring the web performance metrics for them while your backend applications are being exposed to high traffic or service faults.
