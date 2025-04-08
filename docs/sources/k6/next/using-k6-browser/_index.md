---
aliases:
  - ./using-k6-browser # docs/k6/<K6_VERSION>/using-k6-browser
title: Using k6 browser
description: 'The browser module brings browser automation and end-to-end testing to k6 while supporting core k6 features. Interact with real browsers and collect frontend metrics as part of your k6 tests.'
weight: 300
---

# Using k6 browser

The [Browser module](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level APIs to interact with browsers and collect frontend performance metrics as part of your k6 tests.

This module aims to provide rough compatibility with the Playwright API, so you don’t need to learn a completely new API.

{{< admonition type="note" >}}

To work with the browser module, make sure you are using the latest [k6 version](https://github.com/grafana/k6/releases), and install a Chromium-based browser on your machine (such as [Google Chrome](https://www.google.com/chrome/)).

{{< /admonition >}}

Watch the video below to learn more about k6 browser.

{{< youtube id="N7VJ9X5yAKo" >}}

## Use case for browser testing

The main use case for the browser module is to test performance on the browser level. Browser-level testing provides a way to measure user experience and find issues that are difficult to catch on the protocol level. Browser-level testing can help you answer questions like:

- When my application is receiving thousands of simultaneous requests from the protocol-level, what happens to the frontend?
- How can I get metrics specific to browsers, like total page load time?
- Are all my elements interactive on the frontend?
- Are there any loading spinners that take a long time to disappear?

## Create a browser test

To create a browser test, you first need to:

- [Install k6](https://grafana.com/docs/k6/<K6_VERSION>/set-up/install-k6/) in your machine.
- Install a Chromium-based browser, such as Google Chrome, in your machine.

After, run the `k6 new` command with the `--template` option set to `browser`:

```bash
k6 new --template browser browser-script.js
```

The command creates a test script you can run right away with the `k6 run` command:

```bash
k6 run browser-script.js
```

After running the test, you can see the [end of test results](https://grafana.com/docs/k6/<K6_VERSION>/results-output/end-of-test/). It contains metrics that show the performance of the website on the script.

```bash
         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: script.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * ui: 1 iterations shared among 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)



  █ TOTAL RESULTS

    checks_total.......................: 2       0.300669/s
    checks_succeeded...................: 100.00% 2 out of 2
    checks_failed......................: 0.00%   0 out of 2

    ✓ header
    ✓ recommendation

    HTTP
    http_req_duration.......................................................: avg=122ms    min=122ms    med=122ms   max=122ms p(90)=122ms    p(95)=122ms
      { expected_response:true }............................................: avg=122ms    min=122ms    med=122ms   max=122ms p(90)=122ms    p(95)=122ms
    http_req_failed.........................................................: 0.00%  0 out of 1
    http_reqs...............................................................: 1      0.150334/s

    EXECUTION
    iteration_duration......................................................: avg=4.39s    min=4.39s    med=4.39s   max=4.39s p(90)=4.39s    p(95)=4.39s
    iterations..............................................................: 1      0.150334/s
    vus.....................................................................: 1      min=0       max=1
    vus_max.................................................................: 1      min=1       max=1

    NETWORK
    data_received...........................................................: 6.9 kB 1.0 kB/s
    data_sent...............................................................: 543 B  82 B/s

    BROWSER
    browser_data_received...................................................: 357 kB 54 kB/s
    browser_data_sent.......................................................: 4.9 kB 738 B/s
    browser_http_req_duration...............................................: avg=355.28ms min=124.04ms med=314.4ms max=1.45s p(90)=542.75ms p(95)=753.09ms
    browser_http_req_failed.................................................: 0.00%  0 out of 18

    WEB_VITALS
    browser_web_vital_cls...................................................: avg=0        min=0        med=0       max=0     p(90)=0        p(95)=0
    browser_web_vital_fcp...................................................: avg=2.33s    min=2.33s    med=2.33s   max=2.33s p(90)=2.33s    p(95)=2.33s
    browser_web_vital_fid...................................................: avg=300µs    min=300µs    med=300µs   max=300µs p(90)=300µs    p(95)=300µs
    browser_web_vital_inp...................................................: avg=56ms     min=56ms     med=56ms    max=56ms  p(90)=56ms     p(95)=56ms
    browser_web_vital_lcp...................................................: avg=2.33s    min=2.33s    med=2.33s   max=2.33s p(90)=2.33s    p(95)=2.33s
    browser_web_vital_ttfb..................................................: avg=1.45s    min=1.45s    med=1.45s   max=1.45s p(90)=1.45s    p(95)=1.45s
```

You can also see at the end of the output the browser and Web Vital metrics that report performance specific to browser testing.

```bash
BROWSER
browser_data_received.........: 357 kB 54 kB/s
browser_data_sent.............: 4.9 kB 738 B/s
browser_http_req_duration.....: avg=355.28ms min=124.04ms med=314.4ms max=1.45s p(90)=542.75ms p(95)=753.09ms
browser_http_req_failed.......: 0.00%  0 out of 18

WEB_VITALS
browser_web_vital_cls.........: avg=0        min=0        med=0       max=0     p(90)=0        p(95)=0
browser_web_vital_fcp.........: avg=2.33s    min=2.33s    med=2.33s   max=2.33s p(90)=2.33s    p(95)=2.33s
browser_web_vital_fid.........: avg=300µs    min=300µs    med=300µs   max=300µs p(90)=300µs    p(95)=300µs
browser_web_vital_inp.........: avg=56ms     min=56ms     med=56ms    max=56ms  p(90)=56ms     p(95)=56ms
browser_web_vital_lcp.........: avg=2.33s    min=2.33s    med=2.33s   max=2.33s p(90)=2.33s    p(95)=2.33s
browser_web_vital_ttfb........: avg=1.45s    min=1.45s    med=1.45s   max=1.45s p(90)=1.45s    p(95)=1.45s
```
