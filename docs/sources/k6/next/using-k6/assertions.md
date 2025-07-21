---
title: 'Assertions'
description: 'Advanced test assertions in k6 using the k6-testing library for both protocol and browser testing'
weight: 04
---

{{< docs/shared source="k6" lookup="preview-feature.md" version="<K6_VERSION>" >}}

# Assertions

k6 provides test assertions in the form of the `expect` function. Assertions validate that your application behaves as expected during testing. 

Define assertions by passing a value to `expect()` and chaining it with a matcher that defines your expected outcome. The library provides expressive matchers that work with both protocol testing (HTTP/API) and browser testing scenarios.

The assertions API is compatible with Playwright's assertion syntax, providing a fluent interface that improves test readability and reliability. 

## Getting started

Assertions are provided by the [k6-testing library](https://jslib.k6.io). Import the library to start using assertions:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import { browser } from "k6/browser";
import http from "k6/http";

export function protocolTest() {
  // Get the home page of k6's Quick Pizza app
  const response = http.get("https://quickpizza.grafana.com/");

  // Simple assertions
  expect(response.status).toBe(200);
  expect(response.error).toEqual("");
  expect(response.body).toBeDefined();
}

export async function browserTest() {
  const page = await browser.newPage();

  try {
    await page.goto("https://quickpizza.grafana.com/");
    await page.waitForLoadState("networkidle"); // waits until the `networkidle` event

    // Assert the "Pizza Please" button is visible
    await expect(page.locator("button[name=pizza-please]")).toBeVisible();
  } finally {
    await page.close();
  }
}

export const options = {
  scenarios: {
    // Protocol tests
    protocol: {
      executor: "shared-iterations",
      vus: 1,
      iterations: 1,
      exec: "protocolTest",
    },

    // Browser tests
    ui: {
      executor: "shared-iterations",
      options: {
        browser: {
          type: "chromium",
        },
      },
      exec: "browserTest",
    },
  },
};
```

## Types of assertions

The k6-testing library provides two types of assertions, each designed for different testing scenarios:

### Non-retrying assertions

[Non-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/non-retrying-assertions) evaluate conditions immediately at a single point in time without retrying. They're ideal for validating static data such as HTTP response content, data structures, or configuration values.

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import http from 'k6/http';

export default function () {
  const pizzaRequestPayload = { maxCaloriesPerSlice: 1000, mustBeVegetarian: true };
  const pizzaRequestHeader = { 
    "Content-Type": "application/json",
    "Authorization": "Token " + "abcdef0123456789"
  }

  const response = http.post(
    `https://quickpizza.grafana.com/api/pizza`,
    JSON.stringify(pizzaRequestPayload),
    { headers: pizzaRequestHeader }
  );
  const data = response.json();
  
  // These assertions evaluate immediately
  expect(response.status).toEqual(200);
  expect(response.headers["Content-Type"]).toBeDefined();
  expect(response.headers["Content-Type"]).toEqual("application/json");
  expect(data.pizza).toBeDefined();
  expect(data.pizza.name).toBeDefined();
  expect(data.pizza.name).not.toHaveLength(0);
}
```

### Auto-retrying assertions

[Auto-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions) automatically retry until conditions become true or a timeout is reached. They're designed for browser testing scenarios where elements may take time to load, update, or become interactable.

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/0.5.0/index.js';
import { browser } from 'k6/browser';

export default async function() {
  // Open a new browser page
  const page = await browser.newPage()

  try {
    // Navigate to the quickpizza website
    await page.goto('https://quickpizza.grafana.com/')

    // Click the 'Pizza please' button
    await page.locator('button[name="pizza-please"]').click()

    // Take a screenshot of the homepage, and save it to the local filesystem
    // so we can inspect it later if needed.
    await page.screenshot({ path: 'homepage.png' })

    // Check if the pizza recipe is displayed
    const textContent = await pizzaRecipeIsDisplayed(page)
    expect(textContent).toEqual('Our recommendation:')
  } finally {
    await page.close()
  }
}

// Browsers are asynchronous, so we need to wait for the content we want to check
// to be visible.
async function pizzaRecipeIsDisplayed(page) {
  const label = await page.locator('h2[id="pizza-name"]')
  await label.isVisible()
  const textContent = (await label.textContent()).trim()

  return textContent
}
```

## Assertions vs. checks

Unlike k6 [checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks), which continue execution when they fail and register metrics for threshold evaluation, assertions immediately fail and interrupt the test when expectations are not met. Assertions are designed for validating critical conditions that determine whether a test should continue—when these conditions aren't met, they invalidate the entire testing scenario.

Assertions do not register metrics because they halt execution rather than collect data points. This design provides fast feedback and detailed error messages to help you identify issues quickly, ensuring your tests only proceed when fundamental assumptions are satisfied.

## Available assertion methods

### Non-retrying assertions

Use these for immediate evaluation of static values:

| Method | Description |
| --- | --- |
| [toBe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe) | Exact equality using Object.is() |
| [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) | Deep equality comparison |
| [toBeTruthy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobetruthy) | Value is truthy |
| [toBeFalsy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobefalsy) | Value is falsy |
| [toBeDefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobedefined) | Value is not undefined |
| [toBeUndefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeundefined) | Value is undefined |
| [toBeNull()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobenull) | Value is null |
| [toBeGreaterThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan) | Numeric greater than |
| [toBeGreaterThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthanorequal) | Numeric greater than or equal |
| [toBeLessThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthan) | Numeric less than |
| [toBeLessThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthanorequal) | Numeric less than or equal |
| [toBeCloseTo()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobecloseto) | Floating point comparison |
| [toContain()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontain) | Array/string contains value |
| [toContainEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontainequal) | Array contains object with matching content |
| [toHaveLength()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohavelength) | Array/string has specific length |
| [toHaveProperty()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohaveproperty) | Object has specific property |
| [toBeInstanceOf()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeinstanceof) | Value is instance of class |

[See all non-retrying assertions →](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/non-retrying-assertions)

### Auto-retrying assertions  

Essential for browser testing with dynamic content:

| Method | Description |
| --- | --- |
| [toBeVisible()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobevisible) | Element is visible on the page |
| [toBeHidden()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobehidden) | Element is hidden or not visible |
| [toBeEnabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeenabled) | Element is enabled and interactive |
| [toBeDisabled()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobedisabled) | Element is disabled |
| [toBeChecked()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobechecked) | Checkbox or radio button is checked |
| [toBeEditable()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tobeeditable) | Element is editable |
| [toHaveText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohavetext) | Element has specific text content |
| [toContainText()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tocontaintext) | Element contains specific text |
| [toHaveValue()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohavevalue) | Input element has specific value |
| [toHaveAttribute()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions/tohaveattribute) | Element has specific attribute value |

[See all retrying assertions →](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions)

## Assertion features

### Negation

All assertions can be negated using `.not`:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import http from 'k6/http';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  
  // Negated assertions
  expect(response.status).not.toBe(404);
  expect(response.body).not.toHaveLength(0);
  expect(response.headers).not.toHaveProperty('error');
  
  // Browser negation (with await)
  await expect(page.locator('.error-message')).not.toBeVisible();
}
```

### Soft assertions

Soft assertions continue test execution even when they fail, marking the test as failed but allowing subsequent assertions to run:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import http from 'k6/http';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  
  // These will all run even if some fail
  expect.soft(response.status).toBe(200);
  expect.soft(response.headers['Content-Type']).toContain('text/html');
  expect.soft(response.body).toHaveLength(response.body.length);
  
  // Test continues and performs additional checks
  console.log('Test completed, checking results...');
}
```

### Custom error messages

Provide descriptive error messages for better debugging:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import http from 'k6/http';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/api/pizza', {
    headers: { 'Content-Type': 'application/json' }
  });
  const pizza = response.json();
  
  expect(response.status, 'API should return successful response').toBe(200);
  expect(pizza.name, 'Pizza should have a valid name').toBeDefined();
  expect(pizza.name, 'Pizza name should not be empty').not.toHaveLength(0);
}
```

## Configuration and customization

### Global configuration

Configure assertion behavior globally for all tests:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import http from 'k6/http';

// Configure global settings
const configuredExpect = expect.configure({
  timeout: 10000,     // 10 seconds for retrying assertions
  interval: 500,      // Retry check every 500ms (on retriable assertions)
  colorize: true,     // Enable colored output
  softMode: 'fail'    // How soft assertions behave
});

export default function () {
  const response = http.get("https://quickpizza.grafana.com");

  // All assertions use these settings
  configuredExpect(response.status).toBe(200);
}
```

### Per-scenario configuration

Create different configurations for different test scenarios:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';
import http from 'k6/http';
import { browser } from 'k6/browser';

// Fast assertions for API testing
const fastExpect = expect.configure({
  timeout: 2000,
  interval: 100
});

// Slow assertions for complex browser interactions
const slowExpect = expect.configure({
  timeout: 30000,
  interval: 1000,
  softMode: 'continue'
});

export default async function () {
  // Use appropriate expectation based on test type
  const response = http.get('https://quickpizza.grafana.com/');
  fastExpect(response.status).toBe(200);
  
  if (__ENV.BROWSER_TEST) {
    const page = await browser.newPage();
    await page.goto('https://quickpizza.grafana.com/');
    await slowExpect(page.locator('h1')).toBeVisible();
  }
}
```

## Best practices

For tests that primarily use assertions to validate system state, such as tests verifying a successful deployment in CI pipelines, run k6 tests with assertions in quiet mode:

```bash
k6 run --quiet --no-summary script.ts
```

This approach eliminates unnecessary output and focuses on the assertion results, making it ideal for automated testing environments.

## See also

- [expect() API reference](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/expect) - Complete assertion documentation
- [Auto-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/retrying-assertions)
- [Non-retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/testing/non-retrying-assertions)
- [Browser testing](https://grafana.com/docs/k6/<K6_VERSION>/using-k6-browser) - Browser automation with k6
- [Checks](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/checks) - Alternative validation approach
