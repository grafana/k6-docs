---
title: 'Overview'
heading: 'Browser Module Documentation'
head_title: 'Browser Module Documentation'
excerpt: 'The browser module brings browser automation and end-to-end testing to k6 while supporting core k6 features. Interact with real browsers and collect frontend metrics as part of your k6 tests.'
---

<ExperimentalBlockquote />

The [Browser module](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests.

This module aims to provide rough compatibility with the Playwright API, so you don’t need to learn a completely new API.

<Blockquote mod="note" title="">

To work with the browser module, make sure you are using [k6 version 0.43.0](https://github.com/grafana/k6/releases/tag/v0.43.0) or above.

</Blockquote>

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
import { check } from 'k6';

export default async function () {
  const browser = chromium.launch({ headless: false });
  const page = browser.newPage();

  try {
    await page.goto('https://test.k6.io/my_messages.php');

    page.locator('input[name="login"]').type('admin');
    page.locator('input[name="password"]').type('123');

    const submitButton = page.locator('input[type="submit"]');

    await Promise.all([page.waitForNavigation(), submitButton.click()]);

    check(page, {
      header: page.locator('h2').textContent() == 'Welcome, admin!',
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

     checks.................................................: 100.00% ✓ 1        ✗ 0
     data_received..........................................: 5.8 kB  659 B/s
     data_sent..............................................: 2.6 kB  291 B/s
     http_req_connecting....................................: avg=48ms     min=0s       med=0s       max=240ms    p(90)=144ms    p(95)=191.99ms
     http_req_duration......................................: avg=155.01ms min=3.09ms   med=121.84ms max=405.52ms p(90)=294.59ms p(95)=350.05ms
     http_req_receiving.....................................: avg=92.6ms   min=0s       med=108ms    max=138ms    p(90)=127.2ms  p(95)=132.6ms
     http_req_sending.......................................: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_tls_handshaking...............................: avg=22.4ms   min=0s       med=0s       max=112ms    p(90)=67.2ms   p(95)=89.59ms
     http_reqs..............................................: 5       0.566242/s
     iteration_duration.....................................: avg=8.82s    min=8.82s    med=8.82s    max=8.82s    p(90)=8.82s    p(95)=8.82s
     iterations.............................................: 1       0.113248/s
     vus....................................................: 1       min=1      max=1
     vus_max................................................: 1       min=1      max=1
     webvital_cumulative_layout_shift.......................: avg=0        min=0        med=0        max=0        p(90)=0        p(95)=0
     webvital_cumulative_layout_shift_good..................: 1       0.113248/s
     webvital_first_contentful_paint........................: avg=415.35ms min=302ms    med=415.35ms max=528.7ms  p(90)=506.03ms p(95)=517.36ms
     webvital_first_contentful_paint_good...................: 2       0.226497/s
     webvital_first_input_delay.............................: avg=5.59ms   min=5.59ms   med=5.59ms   max=5.59ms   p(90)=5.59ms   p(95)=5.59ms
     webvital_first_input_delay_good........................: 1       0.113248/s
     webvital_interaction_to_next_paint.....................: avg=248ms    min=248ms    med=248ms    max=248ms    p(90)=248ms    p(95)=248ms
     webvital_interaction_to_next_paint_needs_improvement...: 1       0.113248/s
     webvital_largest_content_paint.........................: avg=528.7ms  min=528.7ms  med=528.7ms  max=528.7ms  p(90)=528.7ms  p(95)=528.7ms
     webvital_largest_content_paint_good....................: 1       0.113248/s
     webvital_time_to_first_byte............................: avg=320.59ms min=247.09ms med=320.59ms max=394.1ms  p(90)=379.4ms  p(95)=386.75ms
     webvital_time_to_first_byte_good.......................: 2       0.226497/s
```

</CodeGroup>

This gives you a representation of browser performance as well as the usual HTTP specific metrics that k6 already tracks which lets you have a full picture on how your application behaves from a frontend and backend perspective, all in a single script.
