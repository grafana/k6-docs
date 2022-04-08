---
title: 'toBeBetween(from, to)'
description: 'Use toBeBetween(from, to) to check if numeric value is within range.'
excerpt: 'Use toBeBetween(from, to) to check if numeric value is within range.'
---

<Blockquote mod="warning">

## expect.js library is no longer maintained
expect.js library has been deprecated in favor of Chaijs. 

Please migrate to [k6Chaijs library](/javascript-api/jslib/k6chaijs). The documentation below is retained for historical reasons.

</Blockquote>


`toBeBetween(from, to)` is a comparison function that evaluates to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

`toBeBetween(from, to)` is equivalent to `value >= from && value <= to`

When `toBeBetween(from, to)` evaluates to false, the chain is broken, and the test case is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 


| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| from           | Number | Beginning of the range (inclusive) |
| to             | Number | End of the range (inclusive) |


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
  describe('Basic API test', (t) => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');

    t.expect(response.status).as('response status').toBeBetween(200, 299);
  });
}
```

</CodeGroup>

When you run this test with `k6 run mytest.js` the result should look similar to this:

```
█ Basic API test
  ✓ response status is between 200 - 299
```

 