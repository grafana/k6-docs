---
title: 'test( name, function )'
description: 'Groups test cases.'
---

`toEqual(expectedValue)` should be called in the chain after the `t.expect()`



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
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).toEqual(200);
  })
}
```

</CodeGroup>
