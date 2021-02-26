---
title: 'toBeBetween(from, to)'
description: 'Use toBeLessThanOrEqual to compare values.'
---

`toBeBetween(from, to)` is a comparison function that evalues to true or false. It must be called in the chain after the `t.expect(value)` or `.and(value)`. 

When `toBeBetween(from, to)` evaluates to false, the chain is broken, and the test is marked as failed. When the chain is broken, further checks inside of the `test` are ommitted. 



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
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Basic API test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("response status").toBeBetween(200, 299)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })
}
```

When you run this test with `k6 run mytest.js` the result should look similar to this:

```
█ Basic API test
  ✓ response status is between 200 - 299
  ✓ https://test-api.k6.io/public/crocodiles has valid json response
  ✓ number of crocs is greater than 5
```

</CodeGroup>
 