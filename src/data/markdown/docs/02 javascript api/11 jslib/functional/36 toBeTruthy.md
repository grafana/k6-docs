---
title: 'toBeTruthy()'
description: 'Use toBeTruthy to check that the value is truthy.'
---

`toBeTruthy()` is a comparison function that evalues to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

When `toBeTruthy()` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are ommitted. 


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
    t.expect(1).toBeTruthy(); // true
    t.expect("hello").toBeTruthy(); // true
    t.expect(3.14).toBeTruthy(); // true
    t.expect([]).toBeTruthy(); // true
    t.expect({}).toBeTruthy(); // true
    t.expect(true).toBeTruthy(); // true
    t.expect("1").toBeTruthy(); // true

    t.expect(0).toBeTruthy(); // false
    t.expect(undefined).toBeTruthy(); // false
    t.expect(NaN).toBeTruthy(); // false
    t.expect(false).toBeTruthy(); // false
    t.expect("").toBeTruthy(); // false
  })
}
```

</CodeGroup>
