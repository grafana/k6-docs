---
title: 'toEqual( expectedValue )'
description: 'Use toEqual to compare values.'
---

`toEqual(expectedValue)` is a comparison function that evalues to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 
When `toEqual(expectedValue)` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are ommitted. 



| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| expectedValue  | any    | The expected value |


### Returns

| Type   | Description                     |
| ------ | ------------------------------- |
| Funk   | Funk object or raises exception |

### Example

<CodeGroup labels={[]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Basic API test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).toEqual(200)
     .and(response.proto).toEqual("HTTP/2.0");
  })
}
```

</CodeGroup>
