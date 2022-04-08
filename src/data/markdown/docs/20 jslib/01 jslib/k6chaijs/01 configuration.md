---
title: 'configuration'
head_title: 'k6Chai configuration'
description: 'Global configuration options for k6Chaijs'
excerpt: 'Global configuration options for k6Chaijs'
---

Chai exposes a number of configuration options that can change how the library behaves.


| Config option             | Default     | Description |
| ------------------------- | ----------- | ----------- |
| truncateMsgThreshold      | 300   | Check message length is truncated to this value. |
| truncateVariableThreshold | 100   | Variables interpolated into check message are truncated to this length. |
| aggregateChecks           | true  | The actual values are not interpolated into the check message. Disable for tests with 1 iteration. |
| logFailures               | false | When the check fails, debug messages are printed. |


`truncateMsgThreshold` configuration variable sets the lower threshold for how large the full check message can be. `truncateVariableThreshold` sets the lower threshold for how large an individual variable can be. It is intended as a safeguard from mistakes when a very large string is included in the check name, especially when the `aggregateChecks` is set to `false`;. 

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';
import { describe, expect, chai } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';

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

</CodeGroup>

The resulting

```bash
█ Testing bad assertion.
  ✓ expected '<!DOCTYPE html>\n<html lang="en">\n<hea...' to have property 'length'
  ✓ expected '<!DOCTYPE html>\n<html lang="en">\n<hea...' to have a length at least 500 got 15714
```

