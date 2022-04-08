---
title: 'toEqual( expectedValue )'
description: 'Use to verify that received === expected'
excerpt: 'Use to verify that received === expected'
---

<Blockquote mod="warning">

## expect.js library is no longer maintained
expect.js library has been deprecated in favor of Chaijs. 

Please migrate to [k6Chaijs library](/javascript-api/jslib/k6chaijs). The documentation below is retained for historical reasons.

</Blockquote>


`toEqual(expectedValue)` is a comparison function that evaluates to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

`toEqual` is equivalent to `received === expected`

When `toEqual(expectedValue)` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are omitted. 


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
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', (t) => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');

    t.expect(response.status).toEqual(200);
    t.expect(response.proto).toEqual('HTTP/2.0');
  });
}
```

</CodeGroup>
