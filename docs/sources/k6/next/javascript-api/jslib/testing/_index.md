---
title: 'testing'
head_title: 'testing'
description: 'k6 testing library for advanced assertions'
weight: 00
---

# testing

The k6 testing library provides assertion capabilities for both protocol and browser testing, and draws inspiration from Playwright's test API design. The entire library is centered around the [`expect()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) function, which can be configured for convenience.

{{< admonition type="note" >}}
The k6 testing library source code can be found on [GitHub](https://github.com/grafana/k6-jslib-testing).
{{< /admonition >}}

## Features

- **Playwright-inspired assertions**: API designed with patterns inspired by Playwright's testing approach
- **[Protocol and browser testing](#demo)**: Works with both HTTP/API testing and browser automation
- **[Auto-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect#retrying-assertions)**: Automatically retry assertions until they pass or timeout
- **[Soft assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect#soft-assertions)**: Continue test execution even after assertion failures
- **[Configurable timeouts](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/configure)**: Customizable timeout and polling intervals

## Usage

To use the testing library in your k6 script, import it in your tests, directly from the jslib repository:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';
```

## Demo

### Protocol Testing

```javascript
import { check } from 'k6';
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

export default function () {
  const response = http.get('https://test-api.k6.io/public/crocodiles/1/');
  
  // Traditional k6 check
  check(response, {
    'status is 200': (r) => r.status === 200,
  });
  
  // Using expect assertions
  expect(response.status).toBe(200);
  expect(response.json()).toHaveProperty('name');
}
```

### Browser Testing

```javascript
import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

export default async function () {
  const page = browser.newPage();
  
  await page.goto('https://test.k6.io');
  
  // Auto-retrying assertions
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Welcome to the k6 test site');
}
```

## Configuration

Create configured expect instances for custom behavior:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Create configured expect instance
const myExpect = expect.configure({
  timeout: 10000,     // Default timeout for retrying assertions
  interval: 200,      // Polling interval for retrying assertions
  colorize: true,     // Enable colored output
  display: 'pretty',  // Output format
  softMode: 'fail'    // Soft assertion behavior
});
```

## Assertion Types

The testing library provides two types of assertions:

### [Non-Retrying Assertions]({{< relref "./non-retrying-assertions" >}})
Synchronous assertions that evaluate immediately - perfect for testing static values, API responses, and any scenario where the expected condition should be true at the moment of evaluation.

### [Retrying Assertions]({{< relref "./retrying-assertions" >}})
Asynchronous assertions that automatically retry until conditions become true or timeout - ideal for browser testing, dynamic content, and any scenario where conditions may change over time.

## API Reference

| Function | Description |
| --- | --- |
| [expect()]({{< relref "./expect" >}}) | Main assertion function |
| [expect.configure()]({{< relref "./configure" >}}) | Create configured expect instances |
| [Non-Retrying Assertions]({{< relref "./non-retrying-assertions" >}}) | Synchronous assertions for immediate evaluation |
| [Retrying Assertions]({{< relref "./retrying-assertions" >}}) | Asynchronous assertions for dynamic content |