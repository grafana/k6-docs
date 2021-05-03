---
title: 'as( string )'
description: 'as(alias) sets a textual representation of the value passed to expect or and.'
excerpt: 'as(alias) sets a textual representation of the value passed to expect or and.'
---


| Parameter      | Type   | Description |
| -------------- | ------ | ---- |
| name           | string | Sets the textual representation of the value passed to `expect()` or `and()` |


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

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })
}
```

</CodeGroup>
