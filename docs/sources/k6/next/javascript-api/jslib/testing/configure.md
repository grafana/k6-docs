---
title: 'expect.configure()'
head_title: 'expect.configure(options)'
description: 'Configure global assertion behavior for the k6 testing library'
weight: 20
---

# expect.configure()

The `expect.configure()` method creates a new configured `expect` instance with custom behavior for the k6 testing library, including timeouts, display options, and soft assertion behavior. 

This new instance can be used in place of the default expect function, and will apply the specified configuration to all assertions made with it. 

The imported `expect` instance remains unchanged and continues to use the default configuration, allowing different assertion configurations to co-exist within a test.

## Syntax

```javascript
const configuredExpect = expect.configure(options)
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| options | object | Configuration options object |

### Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| timeout | number | `5000` | Default timeout in milliseconds for retrying assertions |
| interval | number | `100` | Polling interval in milliseconds for retrying assertions |
| colorize | boolean | `true` | Enable colorized output in assertion messages |
| display | string | `"pretty"` | Output format for assertion messages (`"pretty"` or `"inline"`) |
| softMode | string | `"fail"` | Soft assertion behavior (`"fail"` or `"throw"`) |

## Returns

| Type | Description |
| --- | --- |
| Expect | A new expect instance with the specified configuration |

### Timeout configuration

The `timeout` option controls how long retrying assertions will wait for a condition to become true:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

// Create a configured expect instance with longer timeout for slow-loading elements
const slowExpect = expect.configure({
  timeout: 10000,  // 10 seconds
  interval: 500,   // Check every 500ms
});
```

### Display Options

The `display` and `colorize` options control how assertion failures are reported:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Create expect instance with inline output and no colors
const inlineExpect = expect.configure({
  display: 'inline',
  colorize: false,
});
```

### Soft Assertion Mode

The `softMode` option controls whether failed assertions stop test execution:

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// The default behavior of soft assertions is mark the test as failed, the `softMode` option
// allows to configure soft assertions to throw an exception and fail the current iteration instead. 
const softExpect = expect.configure({
  softMode: 'throw',
});
```

## Environment Variables

Configuration options can also be set using environment variables:

| Environment Variable | Option | Description |
| --- | --- | --- |
| `K6_TESTING_TIMEOUT` | `timeout` | Default timeout in milliseconds |
| `K6_TESTING_INTERVAL` | `interval` | Polling interval in milliseconds |
| `K6_TESTING_COLORIZE` | `colorize` | Enable colored output (`true`/`false`) |
| `K6_TESTING_DISPLAY` | `display` | Output format (`pretty`/`inline`) |
| `K6_TESTING_SOFT_MODE` | `softMode` | Soft assertion mode (`fail`/`throw`) |

```bash
# Set environment variables
export K6_TESTING_TIMEOUT=10000
export K6_TESTING_SOFT_MODE=throw
k6 run test.js
```

## Examples

### Basic Configuration

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Create a configured expect instance
const myExpect = expect.configure({
  timeout: 8000,
  interval: 200,
  colorize: true,
  display: 'pretty'
});

export default function () {
  // Use the configured instance
  myExpect(response.status).toBe(200);
  
  // Original expect instance still works with defaults
  expect(response.status).toBe(200);
}
```

### Browser Testing Configuration

```javascript
import { browser } from 'k6/experimental/browser';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Create expect instance configured for browser testing with longer timeouts
const browserExpect = expect.configure({
  timeout: 15000,  // Longer timeout for browser operations
  interval: 500,   // Less frequent polling
});

export default async function () {
  const page = browser.newPage();
  await page.goto('https://test.k6.io');
  
  // Will wait up to 15 seconds for element to be visible
  await browserExpect(page.locator('h1')).toBeVisible();
}
```

### CI/CD Configuration

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Create expect instance configured for CI environment
const ciExpect = expect.configure({
  colorize: false,    // Disable colors in CI logs
  display: 'inline', // inline output for CI
  timeout: 30000,     // Longer timeout for CI environment
});
```

### Development vs Production

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Different configuration based on environment
const isDevelopment = __ENV.NODE_ENV === 'development';

const envExpect = expect.configure({
  timeout: isDevelopment ? 5000 : 15000,
  colorize: isDevelopment,
  display: isDevelopment ? 'pretty' : 'inline',
  softMode: isDevelopment ? 'continue' : 'fail',
});
```

### Multiple Configured Instances

```javascript
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

export default function () {
  // Create specific expect instances for different scenarios
  const fastExpect = expect.configure({
    timeout: 1000,
    interval: 50,
  });
  
  const slowExpect = expect.configure({
    timeout: 30000,
    softMode: 'continue',
  });
  
  // Use appropriate instance for each test
  fastExpect(quickOperation()).toBe(true);
  slowExpect(slowOperation()).toBe(true);
  
  // Original expect instance still available
  expect(normalOperation()).toBe(true);
}
```

### Soft Assertion Examples

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_AWS_VERSION" >}}/index.js';

// Create expect instance with soft assertions enabled
const softExpect = expect.configure({
  softMode: 'continue',
});

export default function () {
  const response = http.get('https://test-api.k6.io/public/crocodiles/1/');
  
  // These assertions will not stop test execution on failure
  softExpect(response.status).toBe(200);
  softExpect(response.json()).toHaveProperty('name');
  softExpect(response.json()).toHaveProperty('age');
  
  // Test continues even if assertions fail
  console.log('Test completed');
}
```
