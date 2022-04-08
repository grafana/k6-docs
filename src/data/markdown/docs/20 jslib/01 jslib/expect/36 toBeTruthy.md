---
title: 'toBeTruthy()'
description: 'Use toBeTruthy() to check that the value is truthy.'
excerpt: 'Use toBeTruthy() to check that the value is truthy.'
---

<Blockquote mod="warning">

## expect.js library is no longer maintained
expect.js library has been deprecated in favor of Chaijs. 

Please migrate to [k6Chaijs library](/javascript-api/jslib/k6chaijs). The documentation below is retained for historical reasons.

</Blockquote>


`toBeTruthy()` is a comparison function that evaluates to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

When `toBeTruthy()` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object |

### Example

<CodeGroup labels={[]}>

```javascript
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic test', (t) => {
    t.expect(1).toBeTruthy(); // true
    t.expect('hello').toBeTruthy(); // true
    t.expect(3.14).toBeTruthy(); // true
    t.expect([]).toBeTruthy(); // true
    t.expect({}).toBeTruthy(); // true
    t.expect(true).toBeTruthy(); // true
    t.expect('1').toBeTruthy(); // true

    t.expect(0).toBeTruthy(); // false
    t.expect(undefined).toBeTruthy(); // false
    t.expect(NaN).toBeTruthy(); // false
    t.expect(false).toBeTruthy(); // false
    t.expect('').toBeTruthy(); // false
  });
}
```

</CodeGroup>
