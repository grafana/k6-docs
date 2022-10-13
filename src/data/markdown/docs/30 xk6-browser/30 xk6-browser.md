---
title: 'xk6-browser'
excerpt: 'xk6-browser brings browser automation and end-to-end testing to k6 while supporting core k6 features. Interact with real browsers and collect frontend metrics as part of your k6 tests.'
---

## What is xk6-browser?

[xk6-browser](https://github.com/grafana/xk6-browser) brings browser automation and end-to-end web testing to k6 while supporting core k6 features. It adds browser-level scripting APIs to interact with real browsers and collect frontend performance metrics as part of your k6 tests.

## Why xk6-browser?

The golden rule of web performance states that 80-90% of performance errors are found in the frontend, we want to offer a unified tool to existing k6 users for both front-end and back-end 

While back-end performance testing is useful and efficient, it doesn’t represent the overall user experience. xk6-browser offers a solution to measure the front-end performance and provide a way to script tests that are much closer to the user experience. Finally, you get insight into what your user sees on a browser-level and catch issues that are skipped from the protocol level. 

## Use case for xk6-browser

The main use case for xk6-browser is to test performance on the browser level. Browser-level testing  provides a way to measure user experience and  find issues that are difficult to catch on the protocol level. Browser-level testing can help you answer questions like: 

- When my application is receiving thousands of simultaneous requests from the protocol-level, what happens to the front-end?
- How can I get metrics specific to browsers, like total page load time?
- Are all my elements interactive on the front-end?
- Are there any loading spinners that take a long time to disappear?
