---
title: Using k6 browser
description: 'The browser module brings browser automation and end-to-end testing to k6 while supporting core k6 features. Interact with real browsers and collect frontend metrics as part of your k6 tests.'
weight: 300
---

# Using k6 browser

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

The [Browser module](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests.

This module aims to provide rough compatibility with the Playwright API, so you don’t need to learn a completely new API.

{{% admonition type="note" %}}

To work with the browser module, make sure you are using the latest [k6 version](https://github.com/grafana/k6/releases), and install a Chromium-based browser on your machine (such as [Google Chrome](https://www.google.com/chrome/)).

{{% /admonition %}}

Watch the video below to learn more about k6 browser.

{{< youtube id="N7VJ9X5yAKo" >}}

## Use case for browser testing

The main use case for the browser module is to test performance on the browser level. Browser-level testing provides a way to measure user experience and find issues that are difficult to catch on the protocol level. Browser-level testing can help you answer questions like:

- When my application is receiving thousands of simultaneous requests from the protocol-level, what happens to the frontend?
- How can I get metrics specific to browsers, like total page load time?
- Are all my elements interactive on the frontend?
- Are there any loading spinners that take a long time to disappear?

## A simple browser test

{{< code >}}

```javascript
import { browser } from 'k6/experimental/browser';
import { check } from 'k6';

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
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      header: (p) => p.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
  }
}
```

{{< /code >}}

The preceding code launches a Chromium-based browser, visits the application and mimics a user logging in to the application. Once submitted, it checks if the text of the header matches what is expected.

After running the test, the following [browser metrics](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser/metrics) will be reported.

{{< code >}}

```bash
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
ui   ✓ [======================================] 1 VUs  00m01.3s/10m0s  1/1 shared iters

     ✓ header

     browser_data_received.......: 2.6 kB  2.0 kB/s
     browser_data_sent...........: 1.9 kB  1.5 kB/s
     browser_http_req_duration...: avg=215.4ms  min=124.9ms med=126.65ms max=394.64ms p(90)=341.04ms p(95)=367.84ms
     browser_http_req_failed.....: 0.00%   ✓ 0        ✗ 3
     browser_web_vital_cls.......: avg=0        min=0       med=0        max=0        p(90)=0        p(95)=0
     browser_web_vital_fcp.......: avg=344.15ms min=269.2ms med=344.15ms max=419.1ms  p(90)=404.11ms p(95)=411.6ms
     browser_web_vital_fid.......: avg=200µs    min=200µs   med=200µs    max=200µs    p(90)=200µs    p(95)=200µs
     browser_web_vital_inp.......: avg=8ms      min=8ms     med=8ms      max=8ms      p(90)=8ms      p(95)=8ms
     browser_web_vital_lcp.......: avg=419.1ms  min=419.1ms med=419.1ms  max=419.1ms  p(90)=419.1ms  p(95)=419.1ms
     browser_web_vital_ttfb......: avg=322.4ms  min=251ms   med=322.4ms  max=393.8ms  p(90)=379.52ms p(95)=386.66ms
   ✓ checks......................: 100.00% ✓ 1        ✗ 0
     data_received...............: 0 B     0 B/s
     data_sent...................: 0 B     0 B/s
     iteration_duration..........: avg=1.28s    min=1.28s   med=1.28s    max=1.28s    p(90)=1.28s    p(95)=1.28s
     iterations..................: 1       0.777541/s
     vus.........................: 1       min=1      max=1
     vus_max.....................: 1       min=1      max=1
```

{{< /code >}}

This gives you a representation of browser performance, via the web vitals, as well as the HTTP requests that came from the browser.
