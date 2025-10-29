---
title: 'Migrating from Playwright'
description: 'A migration guide to ease the process of transitioning from Playwright to k6'
weight: 325
---

# Migrating from Playwright

## Introduction

- Playwright has many use cases:
  - End-to-end web testing across browsers, platforms, and languages
  - Mobile web testing
  - API testing
  - Component testing
  - general purpose browser automation

- k6 browser use cases are to complement protocol load tests to measure how backend under load impacts frontend performance, and for synthetic monitoring using Grafana SM product. Over the last year k6 has evolved to bring more functional paradigms such as the asserts library. We are evaluating work to align with other JS test frameworks.

- When to migrate and why:
  - want to perform load testing and FE testing at the same time -- non-functional testing.
  - same script can be easily transferred over to Grafana SM -- functional testing.

## Key Differences & Limitations

### Main differences

TODO: Code snippets, if there are any

- Test isolation patterns -- in k6 there is [scenarios](https://grafana.com/docs/k6/latest/using-k6/scenarios/) whereas in Playwright there is a dedicated test framework. The difference stems from k6 being a load testing tool. We are [evaluating](https://github.com/grafana/k6-jslib-testing/issues/30) a test framework, but it's still early days.

- web vitals will be reported on; we are evaluating further work to bring about more measurements such as JS heap size, long task and more.
- k6 reports on many metrics which we think are useful out of the box, such as request/response times, request/response data size etc.

- Important terminology in k6. Because it was originally designed as a load testing tool:
  - VU: virtual user;
  - Iteration: number of times a single VU will run the iteration;
  - thresholds and check: in load testing we're generally more interested in a more holistic view of the test run, which will have many VUs, many iterations and running for many minutes/hours. We want to ensure that the backend system behaves correctly within thresholds that we define, e.g. 99th percentile for all requests to get a response under 1 second. There is an assertions library though if you're more interested in the functional side of testing and want to assert on specific things in your test work flow.

### Browser context restrictions;

  Unlike in Playwright, k6 can only work with a single `browserContext` at a time. So in k6 you won't be able to do:

  ```js
    const bc1 = await browser.newContext();
    // This next call will result in an error "existing browser context must be closed before creating a new one"
    const bc2 = await browser.newContext();
  ```

  You'll have to close the existing `browserContext` first, before creating a new one.

## Migration steps

TODO: Add multiple tests in the example

Let's work with this Playwright test script:

```js
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

At the moment, k6 doesn't implement a `test` framework. So we work with the export default function.

Copy paste from your Playwright `test` into a new file, let's call it `pw-migrated.js`:

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

You should now have:

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

k6 doesn't implement `fixtures`, so we need to work with the `browser` to retrieve a `page` within it's own context:

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

Run the test with `k6 run pw-migrated.js`. Which will result in:

```shell
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

You can find the docs for assertions here: https://github.com/grafana/k6-jslib-testing.

To understand the CLI output results, go here: https://grafana.com/docs/k6/latest/results-output/end-of-test/.

- Test lifecycle: https://grafana.com/docs/k6/latest/using-k6/test-lifecycle/
- Recommended practices: https://grafana.com/docs/k6/latest/using-k6-browser/recommended-practices/

- we don't yet provide a list of APIs between k6 browser and playwright, including future work. Check the docs to see what is available. We have feeling that we have covered a lot of the most used APIs for browser frontend testing.

## Configuration Migration

- Playwright config → k6 options mapping
  - k6 browser doesn't work with a work directory, so you need to supply the exact script to run relative to the current directory.
  - Scenarios are independent of each other -- they are parallel by default. Add `startTime` to make them [sequential](https://grafana.com/docs/k6/latest/using-k6/scenarios/#scenarios).
  - test.only -- no equivalent
  - retries: No auto retry mechanism
  - workers -- depends on the number of scenarios, which is like a single playwright worker, but also very different.
  - reporter -- to change the output of the result take a look [here](https://grafana.com/docs/k6/latest/results-output/end-of-test/) for end of test summary, [here](https://grafana.com/docs/k6/latest/results-output/real-time/) for real time, [web dashboard](https://grafana.com/docs/k6/latest/results-output/web-dashboard/) and [grafana dashboard](https://grafana.com/docs/k6/latest/results-output/grafana-dashboards/).
  - baseURL -- no such equivalent
  - trace -- work with grafana k6 to see a timeline view of the test run
  - projects -- no such equivalent
  - webServer -- no such equivalent
  - outputDir -- depends on the output you use
  - globalSetup -- no such equivalent
  - globalTeardown -- no such equivalent
  - timeout -- use K6_BROWSER_TIMEOUT env var
  - expect.timeout -- no way to set this as a config, needs to be done in the main test block
  - expect.toHaveScreenshot -- no such equivalent
  - expect.toMatchSnapshot -- no such equivalent
  - sharding -- work with grafana k6 for easy multi region, multi load generator setup, with results automatically merged into a single report.
  - typescript is supported
- Browser launch options
  - https://grafana.com/docs/k6/latest/using-k6-browser/options/
  - K6_BROWSER_WS_URL to work with an existing CDP ws url presented by chromium.

## Sequential vs Parallel Tests

TODO: This might be dropped as it's not really something I think most users will face problems with.

- Scenarios run in parallel. They're designed that way as in most cases when working with load tests we want to run things in parallel -- i.e. load test the backend with protocol based tests, and in parallel run a browser test to assert that the frontend is behaving as you'd expect.
- Curerntly there is no way for a scenario to start after another, one way to do this is to work with the `startTime` (as detailed [here](https://grafana.com/docs/k6/latest/using-k6/scenarios/)). See an example below:

```js
import { browser } from 'k6/browser'

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
      startTime: '5s',  // duration + gracefulStop of the above
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
}

export async function userLogin() {
  const page = await browser.newPage();

  await page.goto('https://quickpizza.grafana.com/login', {
    waitFor: 'networkidle',
  });

  await page.waitForTimeout(1000);

  // replace with these when quickpizza labels are fixed
  // await page.getByLabel('username').fill('default');
  // await page.getByLabel('password').fill('12345678');
  await page.locator('#username').fill('default');
  await page.locator('#password').fill('12345678');
  await page.getByText('Sign in').click();

  await page.getByText('Your Pizza Ratings:').waitFor();

  await page.close();
}

export async function adminLogin() {
  const page = await browser.newPage();

  await page.goto('https://quickpizza.grafana.com/admin', {
    waitFor: 'networkidle',
  });

  await page.waitForTimeout(1000);

  // replace with these when quickpizza labels are fixed
  // await page.getByLabel('username').fill('admin');
  // await page.getByLabel('password').fill('admin');
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('admin');
  await page.getByText('Sign in').click();

  await page.getByText('Latest pizza recommendations').waitFor();

  await page.close();
}
```

- You could also used the experimental `xk6-redis` extension as a way to store locks and help synchronise scenarios.

## Hybrid tests

- https://grafana.com/docs/k6/latest/using-k6-browser/recommended-practices/hybrid-approach-to-performance/

## Cloud runs

- Running in the cloud through CLI: https://grafana.com/docs/k6/latest/using-k6/run-k6-test-script/#run-a-test-using-grafana-cloud-k6
- Running in the cloud through the web GUI: ?

## Debugging & Development Experience

- IDE setup and TypeScript support: https://grafana.com/docs/k6/latest/set-up/configure-your-code-editor/#configure-your-code-editor
- type defs for k6 browser: https://grafana.com/docs/k6/latest/set-up/configure-your-code-editor/#install-k6-type-definitions
- k6 Studio: https://grafana.com/docs/k6-studio/
- k6 Studio: record a browser events: https://grafana.com/docs/k6-studio/record-browser-events/

## Limitations

- Fixtures isn't supported in k6 browser as well as no test framework. Abstractions will need to be hand coded.
- File uploads/downloads
  - It's not supported in k6 browser. We are evaluating the possibility and have issues for this:
    - https://github.com/grafana/k6/issues/4233
    - https://github.com/grafana/k6/issues/4485
    - https://github.com/grafana/k6/issues/4197
    - https://github.com/grafana/k6/issues/4170
    - https://github.com/grafana/k6/issues/4129 
- Screenshots and recordings
  - We have screenshot support in local runs as well in Grafana cloud. We are evaluating a session recording feature for SM, load testing and Faro.
- not being able to share data between VUs and iterations:
  - Work with a single executed immutable [sharedarray](https://grafana.com/docs/k6/latest/javascript-api/k6-data/sharedarray/)
  - Work with the [xk6-redis extension](https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/) which is currently experimental but will be non-experimental very soon.
  - All browserContexts are incognito. An evaluation and more feedback is needed to understand its use case [issue](https://github.com/grafana/k6/issues/4378).
- Files can only be read during the init phase and not during the test runtime with the [experimental fs module](https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/fs/).
