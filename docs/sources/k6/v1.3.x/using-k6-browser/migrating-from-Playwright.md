---
title: 'Migrate a Playwright script to k6'
description: 'A migration guide to ease the process of transitioning from Playwright to k6'
weight: 325
---

# Migrate a Playwright script to k6

Playwright is an end-to-end test framework for modern web apps. It can be used for web testing across browsers, mobile web testing, API testing, and general-purpose browser automation.

You can convert your Playwright scripts to k6 browser scripts, and then use them in:

- k6 OSS or Grafana Cloud k6, to run performance tests and frontend testing at the same time, and see how your application behaves in a real-world scenario.
- Synthetic Monitoring, and make sure your application is being monitored and working correctly on a consistent schedule.

In this guide, you'll learn the key differences between Playwright and k6, and how to migrate your scripts.

## Before you begin

To run a k6 test, you'll need:

- A machine with [k6 installed](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/).

## Example migration

Here's an example Playwright script, and common steps you can take to migrate it to a k6 script:

```js
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

Create a new file named `pw-migrated.js`. Copy this initial k6 script setup:

```js
import { expect } from "https://jslib.k6.io/k6-testing/0.6.0/index.js";
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
    // paste here
}
```

k6 browser is a library that's part of k6. Any Playwright script that you migrate needs to include the `import { browser } from 'k6/browser';` line at the top.

k6 browser doesn't implement a `test` framework. Instead, the logic of test is handled inside the `export default async function ()`.

Next, copy the contents from the `test()` function from the Playwright script into the k6 `default async function ()`.

```js
import { expect } from "https://jslib.k6.io/k6-testing/0.6.0/index.js";
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

k6 doesn't implement `fixtures` like Playwright does. Instead, you'll need to use the `browser` class to retrieve a `page` within its own context. After that, you can use the usual `page` methods such as `goto` or `click`:

```js
import { expect } from "https://jslib.k6.io/k6-testing/0.6.0/index.js";
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
  const page = await browser.newPage(); // <- creating a new page in its own incognito context
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

Here we have a Playwright test file containing two tests. We’re going to show you how to work with scenarios to create the equivalent test file in k6:

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

In the k6 test file (which we will name pw-migrated.js), we first need to create two `scenarios` and point them to two exported functions using the `exec` field in the `scenario`:

```js
import { expect } from "https://jslib.k6.io/k6-testing/0.6.0/index.js";
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
    // paste here
}

export async function userLogin() {
    // paste here
}
```

And now we can copy and paste the main block of test code into their respective exported function. Remember, since k6 doesn’t have fixtures, we need to use the imported `browser` class to create a `newPage`:

```js
import { expect } from "https://jslib.k6.io/k6-testing/0.6.0/index.js";
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

Now run the test script with:

```sh
k6 run pw-multiple-migrated.js
```

This will run the two `scenarios` concurrently. You should end up with the following result:

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

In k6, there is [scenarios](https://grafana.com/docs/k6/latest/using-k6/scenarios/) whereas in Playwright there is a dedicated test framework. The difference stems from k6 being a load testing tool. We are [evaluating](https://github.com/grafana/k6-jslib-testing/issues/30) a test framework, but it's still early days.

### Metrics

- web vitals will be reported on; we are evaluating further work to bring about more measurements such as JS heap size, long task and more.
- k6 reports on many metrics which we think are useful out of the box, such as request/response times, request/response data size etc.

### k6 Concepts

- Important terminology in k6. Because it was originally designed as a load testing tool:
  - VU: virtual user;
  - Iteration: number of times a single VU will run the iteration;
  - thresholds and check: in load testing we're generally more interested in a more holistic view of the test run, which will have many VUs, many iterations and running for many minutes/hours. We want to ensure that the backend system behaves correctly within thresholds that we define, e.g. 99th percentile for all requests to get a response under 1 second. There is an assertions library though if you're more interested in the functional side of testing and want to assert on specific things in your test work flow.

### Browser context restrictions

Unlike in Playwright, k6 can only work with a single `browserContext` at a time. So in k6 you won't be able to do:

<!-- md-k6:skip -->

```js
const bc1 = await browser.newContext();
// This next call will result in an error "existing browser context must be closed before creating a new one"
const bc2 = await browser.newContext();
```

You'll have to close the existing `browserContext` first, before creating a new one.

## Hybrid tests

- https://grafana.com/docs/k6/latest/using-k6-browser/recommended-practices/hybrid-approach-to-performance/

## Cloud runs

- Running in the cloud through CLI: https://grafana.com/docs/k6/latest/using-k6/run-k6-test-script/#run-a-test-using-grafana-cloud-k6
- Running in the cloud through the web GUI: ?

## References

- You can find the docs for assertions here: https://github.com/grafana/k6-jslib-testing.
- To understand the CLI output results, go here: https://grafana.com/docs/k6/latest/results-output/end-of-test/.
- Test lifecycle: https://grafana.com/docs/k6/latest/using-k6/test-lifecycle/
- Recommended practices: https://grafana.com/docs/k6/latest/using-k6-browser/recommended-practices/
- We don't yet provide a list of APIs between k6 browser and playwright, including future work. Check the docs to see what is available. We have feeling that we have covered a lot of the most used APIs for browser frontend testing.
