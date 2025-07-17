---
title: 'Non-Retrying Assertions'
head_title: 'Non-Retrying Assertions'
description: 'Synchronous assertions that evaluate immediately'
weight: 40
---

# Non-Retrying Assertions

Non-retrying assertions are synchronous assertions that allow to test any conditions, but do not auto-retry. They are ideal for testing static values, API responses, and any scenario where the expected condition should be true at the moment of evaluation. 

## Overview

Non-retrying assertions differ from [retrying assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions) in that they:

- **Evaluate immediately** - They check the condition once and return the result
- **Are synchronous** - They don't need to be awaited and return results immediately
- **Have no timeout behavior** - They either pass or fail instantly
- **Are ideal for static content** - Perfect for testing values that don't change over time

```javascript
import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-testing/{{< param "JSLIB_TESTING_VERSION" >}}/index.js';

export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  
  // Immediate assertions
  expect(response.status).toBe(200);
  expect(response.body).toBeDefined();
  expect(response.body).toBeTruthy();
  expect(typeof response.body).toBe('string');
  expect(response.body).toContain('Pizza');
}
```

## When to Use Non-Retrying Assertions

Non-retrying assertions are best suited for:

- **API response testing** - Checking status codes, response data, headers
- **Static values** - Testing constants, configuration values, or computed results
- **Data validation** - Verifying object properties, array contents, or data types
- **Known state verification** - Checking values that should be immediately available


## Available Non-Retrying Assertions

### Equality Assertions

| Method | Description |
| --- | --- |
| [toBe()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobe) | Exact equality using Object.is() |
| [toEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/toequal) | Deep equality comparison |

### Truthiness Assertions

| Method | Description |
| --- | --- |
| [toBeTruthy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobetruthy) | Value is truthy |
| [toBeFalsy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobefalsy) | Value is falsy |
| [toBeDefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobedefined) | Value is not undefined |
| [toBeUndefined()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeundefined) | Value is undefined |
| [toBeNull()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobenull) | Value is null |

### Comparison Assertions

| Method | Description |
| --- | --- |
| [toBeGreaterThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthan) | Numeric greater than |
| [toBeGreaterThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobegreaterthanorequal) | Numeric greater than or equal |
| [toBeLessThan()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthan) | Numeric less than |
| [toBeLessThanOrEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobelessthanorequal) | Numeric less than or equal |
| [toBeCloseTo()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobecloseto) | Floating point comparison |

### Collection Assertions

| Method | Description |
| --- | --- |
| [toContain()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontain) | Array/string contains value |
| [toContainEqual()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tocontainequal) | Array contains object with matching content |
| [toHaveLength()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohavelength) | Array/string has specific length |



### Property Assertions

| Method | Description |
| --- | --- |
| [toHaveProperty()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tohaveproperty) | Object has specific property |

### Type Assertions

| Method | Description |
| --- | --- |
| [toBeInstanceOf()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/non-retrying-assertions/tobeinstanceof) | Value is instance of class |

## Common Patterns

### API Response Validation

```javascript
export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  
  // Response status and headers
  expect(response.status).toBe(200);
  expect(response.headers['content-type']).toContain('text/html');
  
  // Response data structure
  expect(response.body).toBeDefined();
  expect(response.body).toBeTruthy();
  expect(response.body).toContain('pizza');
  expect(response.body).toContain('Pizza');
  
  // Data types
  expect(typeof response.body).toBe('string');
  expect(response.body.length).toBeGreaterThan(0);
}
```

### Data Validation

```javascript
export default function () {
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    hobbies: ['reading', 'gaming'],
    address: {
      city: 'New York',
      country: 'USA'
    }
  };
  
  // Object structure validation
  expect(userData).toHaveProperty('name');
  expect(userData).toHaveProperty('address.city');
  expect(userData.hobbies).toHaveLength(2);
  
  // Value validation
  expect(userData.name).toBeDefined();
  expect(userData.email).toContain('@');
  expect(userData.age).toBeGreaterThan(0);
  expect(userData.hobbies).toContain('reading');
}
```

### Configuration Testing

```javascript
export default function () {
  const config = {
    apiUrl: __ENV.API_URL || 'https://api.example.com',
    timeout: parseInt(__ENV.TIMEOUT || '5000'),
    retries: parseInt(__ENV.RETRIES || '3'),
    features: (__ENV.FEATURES || 'feature1,feature2').split(',')
  };
  
  // Configuration validation
  expect(config.apiUrl).toContain('http');
  expect(config.timeout).toBeGreaterThan(0);
  expect(config.retries).toBeGreaterThanOrEqual(0);
  expect(config.features).toContain('feature1');
  expect(config.features).toHaveLength(2);
}
```

## Error Handling Patterns

### Graceful Error Handling

```javascript
export default function () {
  const response = http.get('https://quickpizza.grafana.com/');
  
  // Check response status first
  if (response.status === 200) {
    expect(response.body).toBeDefined();
    expect(response.body).toBeTruthy();
    expect(response.body).toContain('Pizza');
  } else {
    // Handle error response
    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body).toContain('error');
  }
}
```

## See Also

- [Retrying Assertions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/retrying-assertions) - Asynchronous assertions for dynamic content
- [expect.configure()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/configure) - Configure global assertion behavior
- [expect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6-testing/expect) - Main assertion function

{{< section >}}