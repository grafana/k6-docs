---
title: 'Use Chai with k6'
description: 'Use Chai with k6 by using the k6chaijs library. Leverage BDD assertions to write tests that scale and are easier to maintain.'
weight: 100
---

# Use Chai with k6

As a codebase grows, engineering teams might adopt frameworks or libraries that can help them write more readable and maintainable code. Similarly, as teams write new k6 test scripts, or expand existing tests, you might start looking for ways to keep them readable and organized, so that they're easier to update in the future.

[Chai](https://www.chaijs.com/) is a BDD/TDD assertion library that's commonly used with testing frameworks. You can use Chai with k6 by using the k6chaijs library. With k6chaijs, you get:

- BDD, or Behavior-Driven Development, style of assertions for more expressive language
- Chainable assertions
- More powerful assertions functions such as: `deep`, `nested`, `ordered`, etc.
- Automatic assertion messages
- [Exception handling](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/jslib/k6chaijs/error-handling) for better test stability

You can use k6chaijs as an alternative to the [check](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/check) and [group](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6/group) functions.

## Installation

The k6chaijs library is hosted on [jslib](https://jslib.k6.io/) and can be imported directly in your k6 script.

<!-- md-k6:skip -->

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
```

Alternatively, you can use a copy of this file stored locally. The source code is available on [GitHub](https://github.com/grafana/k6-jslib-k6chaijs).

## Benefits of k6chaijs

Here are some of the ways you can use k6chaijs to write better tests.

### Expressive language

Using the `expect` and `describe` methods can make code easier to read and maintain. For example, writing a code snippet to check if a string length is equal to five can look like the following:

<!-- md-k6:skip -->

```javascript
if ('Hello'.length !== 5) {
  throw new Error(`Expected 'Hello' to have a length of 5 but got ${'Hello'.length}`);
}
```

With Chai, that can be rewritten as follows:

<!-- md-k6:skip -->

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

describe('should match expected length', () => {
  expect('Hello').to.have.lengthOf(5);
});
```

### Automatic messages

Chai can also help make your code more concise by providing automatic error messages. For example, the following code triggers an error when executed:

<!-- md-k6:skip -->

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

describe('should match expected length', () => {
  expect('Goodbye').to.have.lengthOf(6);
});
```

And when you run that code, you automatically get an error message without writing any additional code that says:

<!-- md-k6:skip -->

```javascript
// 🔥 AssertionError: expected 'Goodbye' to have a length of 6 but got 7
```

### Structure tests

Through encapsulation, your tests can define sections for your application. This makes it easier to:

- Locate tests.
- Spot missing edge cases.
- Keep everything tidy.
- Provide a logical format for adding additional tests.

For example, you can encapsulate your tests for two different services in your test script as the following:

<!-- md-k6:skip -->

```javascript
import { describe } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';

describe('service A', () => {
  describe('should do x from service A', () => {
    /*...*/
  });
  describe('should do y from service A', () => {
    /*...*/
  });
});

describe('service B', () => {
  describe('should do x from service B', () => {
    /*...*/
  });
  describe('should do y from service B', () => {
    /*...*/
  });
});
```

### Assert API responses

Assertion libraries are typically used to write mocked unit/integration tests, but you can also use it to test any API response. For example:

<!-- md-k6:skip -->

```javascript
import expect from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

const expected = { foo: 'Hello', bar: 'World' };
const response = http.get('https://your.example.domain');

expect(response.body).to.deep.equal(expected);
```

### Error handling with `describe`

The `check` function doesn't protect your tests against unsafe code. If a check fails, k6 throws an exception and restarts the script execution from the beginning. For example:

<!-- md-k6:skip -->

```javascript
import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const response = http.get('https://your.example.domain'); // 🙈 could return Error 503

  check(response, {
    'got more than 5 items': (res) => {
      // 🙉 `.json()` might be undefined
      return res.json().length > 5;
    },
  }); // 🙊 k6 will throw an exception and restarts execution from the beginning.

  // 💀 RIP
  check(response, {
    /*...*/
  });
}
```

With k6chaijs, error handling is provided automatically. Script errors are caught by the describe block and execution can proceed to the next set of tests. For example:

<!-- md-k6:skip -->

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

export default function () {
  // 😇 You are safe now
  describe('got more than 5 items', () => {
    const response = http.get('https://your.example.domain'); // 🙈 could return Error 503

    // 🙉 `.json()` might be undefined
    expect(response.json()).to.have.lengthOf(5);
  });

  describe('hooray I still get a turn!', () => {
    /*...*/
  });
}
```

## Example

The following script incorporates thresholds with three test cases that use Chai:

- One `describe` function creates sections and groups tests together.
- Another `describe` provides clear instructions on what we hope to achieve from each test.
- Chai's BDD-style `expect` function is used to write the tests in an expressive, readable way.

```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.5.0.1/index.js';
import http from 'k6/http';

export default function () {
  describe('crocodiles API', () => {
    describe('should fetch a list of public crocodiles', () => {
      const response = http.get('https://test-api.k6.io/public/crocodiles');

      expect(response.status, 'response status').to.equal(200);
      expect(response).to.have.validJsonBody();
      expect(response.json().length, 'number of crocs').to.be.above(4);
    });

    describe('should respond with status 200, when a valid user id is provided', () => {
      const expected = {
        id: 6,
        name: 'Sang Buaya',
        sex: 'F',
        date_of_birth: '2006-01-28',
        age: 16,
      };

      const response = http.get('https://test-api.k6.io/public/crocodiles/6');

      expect(response.status, 'status').to.equal(200);
      expect(JSON.parse(response.body), 'response body').to.deep.equal(expected);
    });

    describe('should respond with status 404, when an invalid user id is provided', () => {
      const response = http.get('https://test-api.k6.io/public/crocodiles/9999999');

      expect(response.status, 'status').to.equal(404);
      expect(JSON.parse(response.body).detail, 'error message').to.equal('Not found.');
    });
  });
}
```

k6 users will use the `group` function to perform this type of operation, however, for users of Javascript testing frameworks, `describe` is the familiar term. Under the hood, k6chaijs still calls `group`, but it's wrapped with a additional extra logic. The same is true for the `expect` function. That can help users who are already familiar with testing frameworks, and still provide the same output summaries you expect from the built-in k6 functions.
