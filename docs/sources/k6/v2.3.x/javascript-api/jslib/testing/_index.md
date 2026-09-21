---
title: 'k6-testing'
description: 'The k6 testing library provides test assertion capabilities for both protocol and browser testing.'
weight: 00
---

# k6-testing

The k6 testing library provides assertion capabilities for both protocol and browser testing, and draws inspiration from _Playwright_'s test API design.  
The entire library is centered around the [`expect()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/expect) function, which can be configured for convenience.

{{< admonition type="note" >}}
The k6 testing library source code is available on [GitHub](https://github.com/grafana/k6-jslib-testing).
{{< /admonition >}}

## Features

- **[Playwright-inspired assertions](https://playwright.dev/docs/test-assertions)**: API designed with patterns inspired by Playwright's testing approach
- **[Protocol and browser testing](#demo)**: Works with both HTTP/API testing and browser automation
- **[Auto-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/expect#retrying-assertions)**: Automatically retry assertions until they pass or timeout
- **[Soft assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/expect#soft-assertions)**: Continue test execution even after assertion failures
- **[Configurable timeouts](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/configure)**: Customizable timeout and polling intervals

## Usage

To use the testing library in your k6 script, import it in your tests directly from the jslib repository:

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
```

## Demo

### Protocol Testing

<!-- md-k6:skip -->

```javascript
import { check } from 'k6';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/{{< param "JSLIB_UTILS_VERSION" >}}/index.js';
import http from 'k6/http';

export default function () {
  const payload = JSON.stringify({
    username: `${randomString(5)}_default@example.com`,
    password: 'secret',
  });
  const response = http.post(`https://quickpizza.grafana.com/api/users`, payload); // create user

  console.info(response.json());

  //Traditional k6 check
  check(response, {
    'status is 201': (r) => r.status === 201,
  });

  //Using expect assertions
  expect(response.status).toBe(201);
  expect(response.json()).toHaveProperty('id');
}
```

### Browser Testing

<!-- md-k6:skip -->

```javascript
import { browser } from 'k6/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

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

  await page.goto('https://quickpizza.grafana.com');

  // Retrying Assertions
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveText('Looking to break out of your pizza routine?');
}
```

## Configuration

Create configured [`expect.configure()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/configure) instances for custom behavior:

<!-- md-k6:skip -->

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

// Create configured expect instance
const myExpect = expect.configure({
  timeout: 10000, // Default timeout for retrying assertions
  interval: 200, // Polling interval for retrying assertions
  colorize: true, // Enable colored output
  display: 'pretty', // Output format
  softMode: 'fail', // Soft assertion behavior
});
```

## Assertion types

The testing library provides two types of assertions:

### [Non-Retrying Assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/non-retrying-assertions/)

Synchronous assertions that evaluate immediately. These are ideal for testing static values, API responses, and scenarios where the expected condition should be true at the moment of evaluation.

### [Retrying Assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions/)

Asynchronous assertions that automatically retry until conditions become true or timeout. These are suitable for browser testing, dynamic content, and scenarios where conditions may change over time.

## API Reference

| Function                                                                                                                 | Description                                     |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/expect)                                 | Main assertion function                         |
| [expect.configure()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/configure)                    | Create configured expect instances              |
| [Non-Retrying Assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/non-retrying-assertions) | Synchronous assertions for immediate evaluation |
| [Retrying Assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions)         | Asynchronous assertions for dynamic content     |
