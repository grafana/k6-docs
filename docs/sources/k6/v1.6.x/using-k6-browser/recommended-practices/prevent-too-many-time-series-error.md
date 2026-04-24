---
title: 'Prevent too many time series error'
description: 'A guide on how to prevent the `too many time series` error when using k6 browser.'
weight: 400
---

# Prevent too many time series error

Modern websites are complex and make a large number of requests to function as intended by their developers. These requests no longer serve only content for display to the end user but also retrieve insights, analytics, advertisements, and cache-busting purposes. Such requests are usually generated dynamically and may contain frequently changing IDs, posing challenges when correlating and analyzing your k6 test results.

When load testing a website using the k6 browser module, these dynamic requests can result in a high number of similar-looking requests, making it difficult to correlate them and extract valuable insights. This can also lead to test errors, such as a `too-many-metrics` error, due to high cardinality from metrics tagged with similar but dynamically changing URLs.

This issue also affects synthetic tests. While you may not encounter the _too-many-metrics_ error, you may end up with a large amount of uncorrelated metric data that cannot be tracked effectively over time.

To address this, the browser module has a [page.on('metric')](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-browser/page/on) method, which allows you to define URL patterns using regex for matching. When a match is found, the URL and name tags for the metric are replaced with the new name.

## Example usage

{{< code >}}

<!-- eslint-skip-->

```javascript
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
  const page = await browser.newPage();

  // Here, we set up an event listener using page.on('metric').
  // You can call page.on('metric') multiple times, and each callback function
  // will be executed in the order that page.on was called.
  page.on('metric', (metric) => {
    // Currently, metric.tag is the only available method on the metric object.
    // It enables matching on the URL tag using a specified regex pattern.
    // You can call metric.tag multiple times within the callback function.
    metric.tag({
      // This is the new name assigned to any metric that matches the defined
      // URL pattern below.
      name: 'test',
      // Provide one or more match patterns here. Any metrics that match a pattern
      // will use the new name specified above.
      matches: [
        // Each match pattern can include a URL and an optional method.
        // When a method is specified, the metric must match both the URL pattern
        // and the method. If no method is provided, the pattern will match all
        // HTTP methods.
        { url: /^https:\/\/test\.k6\.io\/\?q=[0-9a-z]+$/, method: 'GET' },
      ],
    });
  });

  try {
    // The following lines are for demonstration purposes.
    // Visiting URLs with different query parameters (q) to illustrate matching.
    await page.goto('https://test.k6.io/?q=abc123');
    await page.goto('https://test.k6.io/?q=def456');
  } finally {
    // Ensure the page is closed after testing.
    await page.close();
  }
}
```

{{< /code >}}
