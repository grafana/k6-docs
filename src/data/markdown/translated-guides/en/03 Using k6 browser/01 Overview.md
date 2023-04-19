---
title: 'Overview'
heading: 'Browser Module Documentation'
head_title: 'Browser Module Documentation'
excerpt: 'The browser module brings browser automation and end-to-end testing to k6 while supporting core k6 features. Interact with real browsers and collect frontend metrics as part of your k6 tests.'
---

<ExperimentalBlockquote />

The [Browser module](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests.

This module aims to provide rough compatibility with the Playwright API, so you don’t need to learn a completely new API.

## Use case for browser testing

The main use case for the browser module is to test performance on the browser level. Browser-level testing  provides a way to measure user experience and  find issues that are difficult to catch on the protocol level. Browser-level testing can help you answer questions like:

- When my application is receiving thousands of simultaneous requests from the protocol-level, what happens to the frontend?
- How can I get metrics specific to browsers, like total page load time?
- Are all my elements interactive on the frontend?
- Are there any loading spinners that take a long time to disappear?

## A simple browser test

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

```javascript
import { chromium } from 'k6/experimental/browser';
import { check } from 'k6'

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' });

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    await Promise.all([
      page.waitForNavigation(),
      page.locator('input[type="submit"]').click(),
    ]);

    check(page, {
      'header': page.locator('h2').textContent() == 'Welcome, admin!',
    });
  } finally {
    page.close();
    browser.close();
  }
}
```

</CodeGroup>

The preceding code launches a Chromium-based browser, visits the application and mimics a user logging in to the application. Once submitted, it checks if the text of the header matches what is expected.

<Blockquote mod="note" title="">

We're currently (February 2023) migrating most browser module APIs to be async and return a Promise. To make this simpler, our goal is to use the async/await keywords. For more information, check out [Running browser tests](/using-k6-browser/running-browser-tests/).

</Blockquote>

After running the test, the following [browser metrics](/using-k6-browser/browser-metrics/) will be reported.

<CodeGroup labels={[]}>

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


running (00m01.9s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [===============================] 1 VUs  00m01.9s/10m0s  1/1 iters, 1 per VU

     ✓ header

     browser_dom_content_loaded.......: avg=7.31ms  min=122µs   med=5.59ms  max=16.22ms  p(90)=14.1ms   p(95)=15.16ms
     browser_first_contentful_paint...: avg=16.8ms  min=14.78ms med=16.8ms  max=18.81ms  p(90)=18.41ms  p(95)=18.61ms
     browser_first_paint..............: avg=16.75ms min=14.73ms med=16.75ms max=18.78ms  p(90)=18.37ms  p(95)=18.58ms
     browser_loaded...................: avg=7.23ms  min=1.13ms  med=4.56ms  max=16.01ms  p(90)=13.72ms  p(95)=14.87ms
     checks...........................: 100.00% ✓ 1        ✗ 0
     data_received....................: 5.8 kB  3.0 kB/s
     data_sent........................: 2.6 kB  1.3 kB/s
     http_req_connecting..............: avg=40.4ms  min=0s      med=0s      max=202ms    p(90)=121.2ms  p(95)=161.59ms
     http_req_duration................: avg=117.6ms min=649µs   med=96.27ms max=298.96ms p(90)=218.15ms p(95)=258.55ms
     http_req_receiving...............: avg=75.4ms  min=0s      med=94ms    max=95ms     p(90)=95ms     p(95)=95ms
     http_req_sending.................: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s
     http_req_tls_handshaking.........: avg=21.6ms  min=0s      med=0s      max=108ms    p(90)=64.8ms   p(95)=86.39ms
     http_reqs........................: 5       2.568486/s
     iteration_duration...............: avg=1.94s   min=1.94s   med=1.94s   max=1.94s    p(90)=1.94s    p(95)=1.94s
     iterations.......................: 1       0.513697/s
     vus..............................: 1       min=1      max=1
     vus_max..........................: 1       min=1      max=1
```

</CodeGroup>

This gives you a representation of browser performance as well as the usual HTTP specific metrics that k6 already tracks which lets you have a full picture on how your application behaves from a frontend and backend perspective, all in a single script.
