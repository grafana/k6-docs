---
title: 'RetryConfig'
head_title: 'RetryConfig'
description: 'Configuration options for retrying assertions'
weight: 666 
---

# RetryConfig

The `RetryConfig` object defines configuration options that control the retry behavior of asynchronous assertions. These options can be passed to individual retrying assertions or used to create a configured expect instance with custom defaults.

## Properties

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| timeout | number | `5000` | Maximum time to wait in milliseconds |
| interval | number | `100` | Time between retries in milliseconds |

## Description

### timeout

The `timeout` property specifies the maximum amount of time (in milliseconds) that a retrying assertion will wait for a condition to become true before failing. If the condition is not met within this timeframe, the assertion will throw an error.

**Default:** `5000` (5 seconds)

### interval

The `interval` property specifies the time (in milliseconds) between retry attempts. The assertion will check the condition, wait for the specified interval, then check again.

**Default:** `100` (100 milliseconds)

## Usage

### Per-Assertion Configuration

You can pass a `RetryConfig` object as the last parameter to any retrying assertion:

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');
  
  // Wait up to 10 seconds, checking every 500ms
  await expect(page.locator('h1')).toBeVisible({
    timeout: 10000,
    interval: 500
  });
  
  // Quick check with short timeout
  await expect(page.locator('button[name="pizza-please"]')).toBeVisible({
    timeout: 1000,
    interval: 50
  });
}
```

### Creating a Configured Expect Instance

You can create a new expect instance with custom default configuration using `expect.configure()`:

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

// Create a new expect instance with custom retry configuration
const myExpect = expect.configure({
  timeout: 10000,  // 10 seconds default timeout
  interval: 200,   // Check every 200ms
});

export default async function () {
  const page = await browser.newPage();
  await page.goto('https://quickpizza.grafana.com/');
  
  // These assertions will use the configured defaults
  await myExpect(page.locator('h1')).toBeVisible();
  await myExpect(page.locator('h1')).toHaveText('Looking to break out of your pizza routine?');
  
  // This assertion overrides the configured defaults
  await myExpect(page.locator('h1')).toBeVisible({
    timeout: 30000  // 30 seconds for this specific assertion
  });
  
  // The original expect instance is unchanged
  await expect(page.locator('button[name="pizza-please"]')).toBeVisible(); // Uses default 5000ms timeout
}
```

## Best Practices

### Choosing Appropriate Timeouts

- **Fast elements (1-2 seconds):** Use shorter timeouts for elements that should appear quickly
- **Standard elements (5 seconds):** Use the default timeout for most scenarios
- **Slow-loading content (10-30 seconds):** Use longer timeouts for elements that take time to load

```javascript
// Fast UI feedback - short timeout
await expect(page.locator('#validation-message')).toBeVisible({
  timeout: 2000
});

// API-dependent content - longer timeout
await expect(page.locator('#user-profile')).toContainText('John Doe', {
  timeout: 15000
});

// Large data sets or complex operations - very long timeout
await expect(page.locator('#report-complete')).toBeVisible({
  timeout: 60000,
  interval: 1000  // Check less frequently for long operations
});
```

### Choosing Appropriate Intervals

- **Fine-grained checking (50-100ms):** For rapid state changes
- **Standard checking (100-200ms):** For most UI interactions
- **Coarse checking (500-1000ms):** For slow operations or to reduce CPU usage

```javascript
// Rapid state changes - frequent checking
await expect(page.locator('#animation')).toBeVisible({
  timeout: 5000,
  interval: 50
});

// Standard UI interactions - default checking
await expect(page.locator('#form-submitted')).toContainText('Success');

// Slow backend operations - infrequent checking
await expect(page.locator('#batch-job-status')).toContainText('Complete', {
  timeout: 300000,  // 5 minutes
  interval: 5000    // Check every 5 seconds
});
```

## See Also

- [expect.configure()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/configure) - Create configured expect instances
- [Retrying Assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions) - Overview of retrying assertions
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function 