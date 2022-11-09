---
title: 'Welcome'
heading: 'xk6-browser Documentation'
excerpt: 'xk6-browser brings browser automation and end-to-end testing to k6 while supporting core k6 features. Interact with real browsers and collect frontend metrics as part of your k6 tests.'
---

## What is xk6-browser?

[xk6-browser](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests.

xk6-browser aims to provide rough compatibility with the Playwright API, so you don’t need to learn a completely new API.

## Why xk6-browser?

The [performance golden rule](https://www.stevesouders.com/blog/2012/02/10/the-performance-golden-rule/) states that 80%-90% of the website response time is spent on the frontend. But when the number of concurrent users is high, the percentage of time spent between the frontend and backend changes:

![Frontend time vs Backend time with increasing amount of website visitors](./images/Frontend-Backend-LoadTesting.png)

While backend performance testing is useful and efficient, it doesn’t represent the overall user experience.

With xk6-browser, you can interact with the browser to script tests much closer to the actual website experience. You'll get insight into what your user sees on a browser-level and catch issues skipped from the protocol level.

At the same time, you can adopt a hybrid approach to performance testing by leveraging the existing functionalities of k6 and perform backend load testing on a protocol-level, all in the same script. This gives you a full picture of how the user experience is under different load scenarios.

## Use case for xk6-browser

The main use case for xk6-browser is to test performance on the browser level. Browser-level testing  provides a way to measure user experience and  find issues that are difficult to catch on the protocol level. Browser-level testing can help you answer questions like:

- When my application is receiving thousands of simultaneous requests from the protocol-level, what happens to the frontend?
- How can I get metrics specific to browsers, like total page load time?
- Are all my elements interactive on the frontend?
- Are there any loading spinners that take a long time to disappear?

## A simple test using xk6-browser

<CodeGroup labels={["script.js"]} lineNumbers={[true]}>

<!-- eslint-skip -->

```javascript
import { check } from 'k6';
import { chromium } from 'k6/x/browser';

export default function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  page
    .goto('https://test.k6.io/my_messages.php', { waitUntil: 'networkidle' })
    .then(() => {
      // Enter login credentials and login
      page.locator('input[name="login"]').type('admin');
      page.locator('input[name="password"]').type('123');
      
      // Wait for asynchronous operations to complete
      return Promise.all([
        page.waitForNavigation(),
        page.locator('input[type="submit"]').click(),
      ]).then(() => {
        check(page, {
          'header': page.locator('h2').textContent() == 'Welcome, admin!',
        });
      });
    }).finally(() => {
      page.close();
      browser.close();
    });
}
```

</CodeGroup>

The preceding code launches a Chromium-based browser, visits the application and mimics a user logging in to the application. Once submitted, it checks if the text of the header matches what is expected.

<Blockquote mod="note" title="">

We're currently (Nov. 2022) migrating most xk6-browser APIs to be async and return a Promise. Because k6 doesn't yet support the async/await keywords, you'll have to use `then()` to resolve Promises. For more information, check out [Running xk6-browser](/javascript-api/xk6-browser/get-started/running-xk6-browser/).

</Blockquote>

After running the test, the following [browser metrics](/javascript-api/xk6-browser/get-started/browser-metrics/) will be reported.

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

This gives you a representation of browser performance as well as the usual HTTP specific metrics that k6 already tracks which allows you to have a full picture on how your application behaves from a frontend and backend perspective, all in a single script.
