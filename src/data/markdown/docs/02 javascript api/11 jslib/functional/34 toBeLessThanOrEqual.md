---
title: 'toBeLessThanOrEqual( expectedValue )'
description: 'Use toBeLessThanOrEqual to compare values.'
---

`toBeLessThanOrEqual(expectedValue)` should be called in the chain after the `t.expect()`



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
