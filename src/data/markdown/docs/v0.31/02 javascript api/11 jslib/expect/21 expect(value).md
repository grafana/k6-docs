---
title: 'expect( value )'
description: 'expect(value) sets the value to be used in comparison by the next function in the chain.'
excerpt: 'expect(value) sets the value to be used in comparison by the next function in the chain.'
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
import { describe } from 'https://jslib.k6.io/expect/0.0.4/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")
    t.expect(response.status).toEqual(200);
  })
}
```

</CodeGroup>
