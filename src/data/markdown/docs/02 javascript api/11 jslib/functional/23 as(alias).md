---
title: 'as( string )'
description: 'as(alias) sets a textual representation of the value passed to expect or and.'
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
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Basic API test', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(5);
  })
}
```

</CodeGroup>
