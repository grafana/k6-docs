---
title: 'toHaveValidJson( )'
description: 'Use expectedValue to check that the value is truthy.'
---

`toHaveValidJson()` validates that the http response has valid JSON body. It must be called in the chain after the `t.expect(response)` or `.and(response)`. 

When `toHaveValidJson()` returns false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are ommitted. 


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object |

### Example

<CodeGroup labels={[]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {
  test('Basic test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")
    
    t.expect(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })
}
```

</CodeGroup>
