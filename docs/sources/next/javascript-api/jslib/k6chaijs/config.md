---
title: 'config'
description: 'Global configuration options for k6Chaijs'
weight: 31
---

# config

Chai exposes a few options to change the library configuration.

| Config option             | Default | Description                                                                                                                                                                   |
| ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| truncateMsgThreshold      | 300     | Check message length is truncated to this value.                                                                                                                              |
| truncateVariableThreshold | 100     | Variables interpolated into check message are truncated to this length. It prevents mistakes when the check name is very large, especially when `aggregateChecks` is `false`. |
| aggregateChecks           | true    | The actual values are not interpolated into the check message. Disable for tests with 1 iteration.                                                                            |
| logFailures               | false   | When the check fails, debug messages are printed.                                                                                                                             |

{{< code >}}

```javascript
import http from 'k6/http';
import chai, { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';

// individual variables should be up to 20 chars after rendering.
chai.config.truncateVariableThreshold = 20;

// whole check() message must be below 300 chars.
chai.config.truncateMsgThreshold = 300;

// the variable values (resp.status) are inserted into the check message - useful for debugging or tests with 1 iteration
chai.config.aggregateChecks = false;

// when the check fails, WARN messages with variables are printed. Useful for debugging.
chai.config.logFailures = true;

export default function testSuite() {
  describe('Testing bad assertion.', () => {
    const response = http.get('https://test-api.k6.io/');

    expect(response.body).to.have.lengthOf.at.least(500);
  });
}
```

{{< /code >}}

The resulting

```bash
█ Testing bad assertion.
  ✓ expected '<!DOCTYPE html>\n<html lang="en">\n<hea...' to have property 'length'
  ✓ expected '<!DOCTYPE html>\n<html lang="en">\n<hea...' to have a length at least 500 got 15714
```
