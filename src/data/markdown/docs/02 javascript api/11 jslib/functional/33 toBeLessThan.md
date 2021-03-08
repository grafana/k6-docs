---
title: 'toBeLessThan( expectedValue )'
description: 'Use to verify that `received < expected`'
---

`toBeLessThan(expectedValue)` is a comparison function that evaluates to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

`toBeLessThan` is equivalent to `received < expected`

When `toBeLessThan(expectedValue)` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 



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
    t.expect(5).toBeLessThan(6); // true
    t.expect(5).toBeLessThan(5); // false
    t.expect(5).toBeLessThan(5); // false. Won't execute because previous statement was false

  })
}
```

</CodeGroup>
