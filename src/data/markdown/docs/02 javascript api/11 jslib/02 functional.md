---
title: "functional"
excerpt: "Functional testing with k6"
---

The `functional` module is an external JavaScript library that provides APIs to simplify functional testing with k6.

The library can be imported directly from [jslib.k6.io](https://jslib.k6.io/)


### Example

<CodeGroup labels={[]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  test('Fetch a list of public crocodiles', (t) => {
    let response = http.get("https://test-api.k6.io/public/crocodiles")

    t.expect(response.status).as("response status").toEqual(200)
      .and(response).toHaveValidJson()
      .and(response.json().length).as("number of crocs").toBeGreaterThan(4); 
  })

}
```

</CodeGroup>

The above script should result in the following being printed after execution:

![functional.js sample output](./functional/images/functional.js-sample-output.png)

// TODO: add link to more advanced examples

