---
title: "When to use sleep() and page.waitForTimeout()"
description: "Learn when to use sleep() and when to use page.waitForTimeout() in k6 browser tests to ensure accurate and realistic user simulation."
weight: 700
---

# When to use sleep() and page.waitForTimeout()

In Grafana k6, both [`sleep()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/sleep/) and [`page.waitForTimeout()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/waitfortimeout/) can be used to add pauses in your test scripts, but they work very differently. Understanding these differences is essential for accurate and reliable browser testing.  

- `sleep()` is _synchronous_, blocking the thread and halting all background activity.
- `page.waitForTimeout()` is _asynchronous_, allowing background events to continue while pausing the script.

For most browser-based scenarios, you should use `page.waitForTimeout()` to simulate user delays without interrupting normal browser behavior or affecting performance measurements.

## When to use `sleep()`

`sleep()` is a built-in k6 function designed to suspend Virtual User (VU) execution for a specified duration. It's a synchronous function that blocks the JavaScript event loop, which means that all asynchronous work is also suspended until sleep completes.

It's best used to simulate:

- Navigating to a page  
- Sleeping for one second to simulate a user looking for a specific element on the page  
- Clicking on the element

## When to use `page.waitForTimeout()`

`page.waitForTimeout()` is a function provided by the k6 browser module that pauses script execution for a specified amount of time _without blocking_ the JavaScript event loop.  

Unlike `sleep()`, it's _asynchronous_, meaning other browser activities, such as rendering, network requests, and event handling, can continue while the delay is in effect. This makes it ideal for browser based testing, where multiple asynchronous operations happen in the background.

You can use `page.waitForTimeout()` to simulate real user pauses, like reading a page, waiting for a visual change, or mimicking natural interaction timing, all without interrupting the browser's internal processes.
