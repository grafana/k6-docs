---
title: 'Hybrid approach to performance'
heading: 'Hybrid performance with k6 browser'
head_title: 'Hybrid performance with k6 browser'
excerpt: 'An example on how to implement a hybrid approach to performance with k6 browser'
weight: 01
---

# Hybrid performance with k6 browser

An alternative approach to [browser-based load testing](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/load-testing-websites/#browser-based-load-testing) that is much less resource-intensive is combining a low amount of virtual users for a browser test with a high amount of virtual users for a protocol-level test. 

Hybrid performance can be achieved in multiple ways, often using different tools. To simplify the developer experience, k6 browser can be easily combined with core k6 features, so you can easily write hybrid tests in a single script. 

## Browser and HTTP test

The code below shows an example of combining a browser and HTTP test in a single script. While the backend is exposed to the typical load, the frontend is also checked for any unexpected issues. Thresholds are defined to check both HTTP and browser metrics against pre-defined SLOs.

{{< code >}}

```javascript
import http from "k6/http";
import { check } from "k6";
import { browser } from "k6/experimental/browser";

const BASE_URL = __ENV.BASE_URL;

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
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    browser_web_vital_fcp: ["p(95) < 1000"],
    browser_web_vital_lcp: ["p(95) < 2000"],
  },
};

export function getPizza() {
  let restrictions = {
    maxCaloriesPerSlice: 500,
    mustBeVegetarian: false,
    excludedIngredients: ['pepperoni'],
    excludedTools: ['knife'],
    maxNumberOfToppings: 6,
    minNumberOfToppings: 2
  }

  let res = http.post(`${BASE_URL}/api/pizza`, JSON.stringify(restrictions), {
    headers: {
      'Content-Type': 'application/json',
      'X-User-ID': customers[Math.floor(Math.random() * customers.length)],
    },
  });

  check(res, { 
    'status is 200': (res) => res.status === 200 
  });
}

export async function checkFrontend() {
  const page = browser.newPage();

  try {
    await page.goto(BASE_URL)
    check(page, {
      'header': page.locator('h1').textContent() == 'Looking to break out of your pizza routine?',
    });

    await page.locator('//button[. = "Pizza, Please!"]').click();
    page.waitForTimeout(500);
    page.screenshot({ path: `screenshots/${__ITER}.png` });

    check(page, {
      'recommendation': page.locator('div#recommendations').textContent() != '',
    });
  } finally {
    page.close();
  }
}

```

{{< /code >}}

## Browser and failure injection test

A browser test can also be run with a failure injection test via the [xk6-disruptor](https://github.com/grafana/xk6-disruptor) extension. This approach lets you find issues in your front end if any services it depends on are suddenly injected with failures, such as delays or server errors.

The code below shows an example of introducing faults to a Kubernetes service. While this happens, the `browser` scenario is also executed, which checks the frontend application for unexpected errors that might not have been handled properly.

To find out more information about injecting faults to your service, check out our [get started guide with xk6-disruptor](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/xk6-disruptor/get-started/).

{{< code >}}

```javascript
import http from "k6/http";
import { check } from "k6";
import { browser } from "k6/experimental/browser";

const BASE_URL = __ENV.BASE_URL;

export const options = {
  scenarios: {
    disrupt: {
      executor: "shared-iterations",
      iterations: 1,
      vus: 1,
      exec: "disrupt",
    },
    browser: {
      executor: "constant-vus",
      vus: 1,
      duration: "10s",
      startTime: "10s",
      exec: "browser",
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },
  thresholds: {
    browser_web_vital_fcp: ["p(95) < 1000"],
    browser_web_vital_lcp: ["p(95) < 2000"],
  },
};

// Add faults to the service by introducing a delay of 1s and 503 errors to 10% of the requests.
const fault = {
  averageDelay: "1000ms",
  errorRate: 0.1,
  errorCode: 503,
}

export function disrupt() {
  const disruptor = new ServiceDisruptor("pizza-info", "pizza-ns");
  const targets = disruptor.targets();
  if (targets.length == 0) {
    throw new Error("expected list to have one target");
  }

  disruptor.injectHTTPFaults(fault, "20s");
}

export async function checkFrontend() {
  const page = browser.newPage();

  try {
    await page.goto(BASE_URL)
    check(page, {
      'header': page.locator('h1').textContent() == 'Looking to break out of your pizza routine?',
    });

    await page.locator('//button[. = "Pizza, Please!"]').click();
    page.waitForTimeout(500);
    page.screenshot({ path: `screenshots/${__ITER}.png` });

    check(page, {
      'recommendation': page.locator('div#recommendations').textContent() != '',
    });
  } finally {
    page.close();
  }
}

```

{{< /code >}}

## Recommended practices

- **Do start small**. Start with a low amount of browser-based virtual users. A good starting point is to have 10% virtual users or less to monitor the user experience for your end-users, while around 90% of traffic should be emulated from the protocol level.
- **Combine browser test with different load testing types**. To fully understand the impact of different traffic patterns on your end-user experience, experiment with running your browser test with different [load testing types](https://grafana.com/docs/k6/<K6_VERSION>/testing-guides/test-types/).
- **Cover high-risk user journeys as a start**. Consider identifying the high-risk user journeys first so you can start to monitor the web performance metrics for these user journeys while your backend applications are being exposed to high traffic or service faults.