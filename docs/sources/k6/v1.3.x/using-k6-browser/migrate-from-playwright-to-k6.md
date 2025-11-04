---
title: 'Migrate a Playwright script to k6'
description: 'A migration guide to ease the process of transitioning from Playwright to k6'
weight: 325
---

# Migrate a Playwright script to k6

Playwright is an end-to-end testing framework for modern web apps. You can use it for web testing across browsers, mobile web testing, API testing, and general-purpose browser automation.

You can convert your Playwright scripts to k6 browser scripts and use them in the following ways:

- Run performance tests and frontend testing simultaneously in k6 OSS or Grafana Cloud k6 to see how your application behaves in real-world scenarios.
- Use Synthetic Monitoring to ensure your application is monitored and working correctly on a consistent schedule.

In this guide, you'll learn the key differences between Playwright and k6, and how to migrate your scripts.

## Before you begin

To run a k6 test, you'll need:

- A machine with [k6 installed](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/).

## Example migration

The following example shows a Playwright script and the common steps to migrate it to a k6 script:

```js
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

Create a new file named `pw-migrated.js` and copy the following initial k6 script setup:

```js
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
    // Paste your test code here
}
```

k6 browser is an official module to run browser tests with k6. Any Playwright script that you migrate must include the `import { browser } from 'k6/browser';` line at the top.

k6 browser doesn't implement a `test` framework. Instead, the logic of test is handled inside the `export default async function ()`.

Next, copy the contents from the `test()` function from the Playwright script into the k6 `default async function ()`.

```js
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
}
```

k6 doesn't implement fixtures like Playwright does. Instead, use the `browser` class to retrieve a `page` within its own context. After that, you can use the usual `page` methods such as `goto` or `click`:

```js
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export default async function () {
  const page = await browser.newPage(); // Create a new page in its own incognito context
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
}
```

Save your script, and then run it in your terminal:

```sh
k6 run pw-migrated.js
```

You should see an output similar to the following:

```sh
> k6 run pw-migrated.js

         /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 

     execution: local
        script: pw-migrated.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * ui: 1 iterations shared among 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ TOTAL RESULTS 

    EXECUTION
    iteration_duration..........: avg=1.81s    min=1.81s  med=1.81s   max=1.81s p(90)=1.81s    p(95)=1.81s  
    iterations..................: 1      0.463436/s
    vus.........................: 1      min=1       max=1
    vus_max.....................: 1      min=1       max=1

    NETWORK
    data_received...............: 0 B    0 B/s
    data_sent...................: 0 B    0 B/s

    BROWSER
    browser_data_received.......: 1.8 MB 829 kB/s
    browser_data_sent...........: 7.7 kB 3.6 kB/s
    browser_http_req_duration...: avg=120.89ms min=1.95ms med=98.73ms max=1.14s p(90)=139.67ms p(95)=263.7ms
    browser_http_req_failed.....: 0.00%  0 out of 23

    WEB_VITALS
    browser_web_vital_fcp.......: avg=1.24s    min=1.24s  med=1.24s   max=1.24s p(90)=1.24s    p(95)=1.24s  
    browser_web_vital_ttfb......: avg=1.14s    min=1.14s  med=1.14s   max=1.14s p(90)=1.14s    p(95)=1.14s  




running (00m02.2s), 0/1 VUs, 1 complete and 0 interrupted iterations
ui   ✓ [======================================] 1 VUs  00m02.2s/10m0s  1/1 shared iters
```

## Migrate multiple tests

The following example shows a Playwright test file that contains two tests. To migrate multiple tests, use the [k6 scenarios](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/scenarios/) feature to create equivalent test logic:

```js
import { test, expect } from '@playwright/test';

test('admin', async ({ page }) => {
  await page.goto('https://quickpizza.grafana.com/admin', {
    waitUntil: 'networkidle',
  });

  await page.getByLabel('username').fill('admin');
  await page.getByLabel('password').fill('admin');
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.getByRole('button', { name: 'Logout' }).waitFor()

  const label = page.locator('h2')
  const textContent = await label.textContent()
  expect(textContent).toEqual('Latest pizza recommendations');
});

test('user', async ({ page }) => {
  await page.goto('https://quickpizza.grafana.com/login', {
    waitUntil: 'networkidle',
  });

  await page.getByLabel('username').fill('default');
  await page.getByLabel('password').fill('12345678');
  await page.getByText('Sign in').click();

  await page.getByRole('button', { name: 'Logout' }).waitFor()

  const label = page.locator('h2')
  const textContent = await label.textContent()
  expect(textContent).toEqual('Your Pizza Ratings:');
});
```

To convert this Playwright script to k6, create a new file named `pw-multiple-migrated.js`.

First, create two `scenarios` and point them to two exported functions using the `exec` field in each scenario:

```js
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    user: {
      exec: 'userLogin',
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    admin: {
      exec: 'adminLogin',
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export async function adminLogin() {
    // Paste admin test code here
}

export async function userLogin() {
    // Paste user test code here
}
```

Next, copy the test code into the respective exported functions. Since k6 doesn't have fixtures, use the imported `browser` class to create a `newPage`:

```js
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from 'k6/browser';

export const options = {
  scenarios: {
    user: {
      exec: 'userLogin',
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
    admin: {
      exec: 'adminLogin',
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
};

export async function adminLogin() {
  const page = await browser.newPage();

  await page.goto('https://quickpizza.grafana.com/admin', {
    waitUntil: 'networkidle',
  });

  await page.getByLabel('username').fill('admin');
  await page.getByLabel('password').fill('admin');
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.getByRole('button', { name: 'Logout' }).waitFor()

  const label = page.locator('h2')
  const textContent = await label.textContent()
  expect(textContent).toEqual('Latest pizza recommendations');
}

export async function userLogin() {
  const page = await browser.newPage();

  await page.goto('https://quickpizza.grafana.com/login', {
    waitUntil: 'networkidle',
  });

  await page.getByLabel('username').fill('default');
  await page.getByLabel('password').fill('12345678');
  await page.getByText('Sign in').click();

  await page.getByRole('button', { name: 'Logout' }).waitFor()

  const label = page.locator('h2')
  const textContent = await label.textContent()
  expect(textContent).toEqual('Your Pizza Ratings:');
}
```

Run the test script:

```sh
k6 run pw-multiple-migrated.js
```

The command runs the two scenarios concurrently and produces output similar to the following:

```sh
         /\      Grafana   /‾‾/  
    /\  /  \     |\  __   /  /   
   /  \/    \    | |/ /  /   ‾‾\ 
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/ 

     execution: local
        script: pw-multiple-migrated.js
        output: -

     scenarios: (100.00%) 2 scenarios, 2 max VUs, 10m30s max duration (incl. graceful stop):
              * admin: 1 iterations shared among 1 VUs (maxDuration: 10m0s, exec: adminLogin, gracefulStop: 30s)
              * user: 1 iterations shared among 1 VUs (maxDuration: 10m0s, exec: userLogin, gracefulStop: 30s)



  █ TOTAL RESULTS 

    EXECUTION
    iteration_duration..........: avg=5.01s    min=4.7s     med=5.01s    max=5.33s    p(90)=5.26s    p(95)=5.3s    
    iterations..................: 2      0.333461/s
    vus.........................: 2      min=2       max=2
    vus_max.....................: 2      min=2       max=2

    NETWORK
    data_received...............: 0 B    0 B/s
    data_sent...................: 0 B    0 B/s

    BROWSER
    browser_data_received.......: 601 kB 100 kB/s
    browser_data_sent...........: 14 kB  2.3 kB/s
    browser_http_req_duration...: avg=489.58ms min=114.61ms med=514.78ms max=3.25s    p(90)=524.5ms  p(95)=534.85ms
    browser_http_req_failed.....: 0.00%  0 out of 46

    WEB_VITALS
    browser_web_vital_cls.......: avg=0.009527 min=0        med=0.009527 max=0.019055 p(90)=0.017149 p(95)=0.018102
    browser_web_vital_fcp.......: avg=3.09s    min=2.76s    med=3.09s    max=3.43s    p(90)=3.36s    p(95)=3.39s   
    browser_web_vital_fid.......: avg=200µs    min=199.99µs med=200µs    max=200µs    p(90)=200µs    p(95)=200µs   
    browser_web_vital_inp.......: avg=16ms     min=16ms     med=16ms     max=16ms     p(90)=16ms     p(95)=16ms    
    browser_web_vital_lcp.......: avg=3.09s    min=2.76s    med=3.09s    max=3.43s    p(90)=3.36s    p(95)=3.39s   
    browser_web_vital_ttfb......: avg=2.84s    min=2.43s    med=2.84s    max=3.25s    p(90)=3.17s    p(95)=3.21s   




running (00m06.0s), 0/2 VUs, 2 complete and 0 interrupted iterations
admin ✓ [======================================] 1 VUs  00m05.3s/10m0s  1/1 shared iters
user  ✓ [======================================] 1 VUs  00m06.0s/10m0s  1/1 shared iters
```

## Key differences

### Test isolation patterns

In k6, [scenarios](https://grafana.com/docs/k6/latest/using-k6/scenarios/) let you configure and model diverse workloads and organize your tests. Playwright has a dedicated testing framework. This difference stems from k6 being a performance testing tool.

{{< admonition type="note" >}}

There are plans to create a testing framework in k6. For more details or to contribute, refer to this [GitHub issue](https://github.com/grafana/k6-jslib-testing/issues/30).

{{< /admonition >}}

### Metrics

k6 collects and reports on several built-in metrics, such as request and response times, data size, and more. It also includes support for Web Vital metrics, such as FCP, INP, and TTFB.

Refer to [Built-in metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference/) for more details.

### k6 concepts

To effectively use k6 for browser testing, it's important to understand a few core concepts from its load testing foundation:

- **Virtual User**: A Virtual User (VU) is an independent thread of execution that runs concurrently with other VUs. Scripts are often designed so that one VU represents the activity of one real user.
- **Iteration**: The number of times a single VU runs the test script.
- **Thresholds and checks**: [Thresholds](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/thresholds/) are pass/fail criteria that you configure for your test metrics. For example, you can configure a threshold to fail if more than 1% of requests return an error. [Checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks/) validate a boolean condition in your test. For example, you can check whether the response status code equals 200. The main difference is that unmet thresholds cause a test to finish with a failed status, while checks don't. k6 also provides a k6-testing library that behaves similarly to assertions in Playwright. For more details, refer to the [k6-testing](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/) documentation.

### Browser context restrictions

Unlike Playwright, k6 can only work with a single `browserContext` at a time. The following script fails when you run it with k6:

<!-- md-k6:skip -->

```js
const bc1 = await browser.newContext();
// This next call results in an error: "existing browser context must be closed before creating a new one"
const bc2 = await browser.newContext();
```

To fix this, close the existing `browserContext` before creating a new one.

## Hybrid tests

Hybrid tests are performance tests that run browser-level and protocol-level requests simultaneously. They're a great alternative to resource-intensive browser-based load testing, while still measuring application performance under load by making requests to both the frontend and backend.

Refer to [Hybrid performance with k6 browser](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/recommended-practices/hybrid-approach-to-performance/) for more details.

## Run k6 tests in Grafana Cloud

In addition to running k6 scripts locally by installing k6 on your machine, you can use Grafana Cloud for a seamless experience. Using Grafana Cloud means you don't have to worry about whether your machine has the right resources to run a performance test. You also get pre-made Grafana dashboards to analyze test results and can collaborate with other team members to debug performance issues.

Refer to [Run a test using Grafana Cloud k6](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/run-k6-test-script/#run-a-test-using-grafana-cloud-k6) for more details.

## References

- k6 browser APIs: https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/
- k6-testing library for Playwright-inspired assertions: https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/
- Understand k6 CLI output results: https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test/
- Test lifecycle: https://grafana.com/docs/k6/<K6_VERSION>/using-k6/test-lifecycle/
- k6 browser recommended practices: https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/recommended-practices/
