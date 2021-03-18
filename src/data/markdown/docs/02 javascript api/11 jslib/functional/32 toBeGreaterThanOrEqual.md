---
title: 'toBeGreaterThanOrEqual( expectedValue )'
description: 'Use to verify that received >= expected'
---

`toBeGreaterThanOrEqual(expectedValue)` is a comparison function that evaluates to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

`toBeGreaterThanOrEqual` is equivalent to `received >= expected`

When `toBeGreaterThanOrEqual(expectedValue)` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 


| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| expectedValue  | any    | The expected value |


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

  describe('Basic API test', (t) => {
    t.expect(5).toBeGreaterThanOrEqual(4); // true
    t.expect(5).toBeGreaterThanOrEqual(5); // true
    t.expect(5).toBeGreaterThanOrEqual(6); // false
  })
}
```

</CodeGroup>
