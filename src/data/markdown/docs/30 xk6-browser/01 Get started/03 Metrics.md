---
title: 'Browser performance metrics'
excerpt: 'An overview of the different browser performance metrics that xk6-browser tracks.'
---

Apart from the usual HTTP specific metrics that k6 already tracks, xk6-browser tracks the following browser specific performance metrics on top:

- browser_dom_content_loaded - measures the time for when the page is loaded but scripts have just started to be executed.
- browser_first_paint - measures the time for when the first pixel is painted on the browser.
- browser_first_contentful_paint - measures the time for when the first bit of content is painted on the browser.
- browser_first_meaningful_paint - measures the time for when the primary content, which is meaningful, is painted on the browser.
- browser_loaded - measures the time for when the page is fully loaded.

> Note that the above metrics are still subject to change in the future.
