---
title: 'toHaveValidJson( )'
description: 'Use .expect(response).toHaveValidJson() to check that HTTP response contains valid JSON.'
---

`toHaveValidJson()` validates that the http response has valid JSON body. It must be called in the chain after the `t.expect(response)` or `.and(response)`. 

When `toHaveValidJson()` returns false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object |

### Example

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")
    
    t.expect(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })
}
```

</CodeGroup>
