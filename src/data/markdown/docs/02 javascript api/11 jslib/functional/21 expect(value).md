---
title: 'expect( value )'
description: 'expect(value) sets the value to be used in comparison by the next function in the chain.'
---

`expect(value)` sets the value to be used in comparison by the next function in the chain.


| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| value          | any    | The value to be compared |


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
