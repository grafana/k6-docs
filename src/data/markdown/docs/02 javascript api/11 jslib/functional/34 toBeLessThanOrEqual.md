---
title: 'toBeLessThanOrEqual( expectedValue )'
description: 'Use to verify that received <= expected'
---

`toBeLessThanOrEqual(expectedValue)` is a comparison function that evalues to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

`toBeLessThanOrEqual` is equivalent to `received <= expected`

When `toBeLessThanOrEqual(expectedValue)` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 



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
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Basic API test', (t) => {
    t.expect(5).toBeLessThanOrEqual(6); // true
    t.expect(5).toBeLessThanOrEqual(5); // true
    t.expect(5).toBeLessThanOrEqual(5); // false
  })
}
```

</CodeGroup>
