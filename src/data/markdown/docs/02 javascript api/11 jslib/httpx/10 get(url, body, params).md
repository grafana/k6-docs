---
title: 'get(url, [body], [params])'
description: 'httpx.get makes GET requests'
---

`session.get(url, body, params)` makes a get request. Only the first URL parameter is required


| Parameter      | Type   | Description                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------ |
| url  | string    | HTTP URL. If baseURL is set, provide only path. Required |
| body  | null / string / object / [SharedArray](/javascript-api/k6-data/sharedarray) | Should be null for GET requests |
| params  | null or object {} | Additional parameters for this specific request. |


### Returns

| Type                                         | Description           |
| -------------------------------------------- | --------------------- |
| [Response](/javascript-api/k6-http/response) | HTTP Response object. |


### Example

<CodeGroup labels={[]}>

```javascript
import { test } from 'https://jslib.k6.io/functional/0.0.2/index.js';
import http from 'k6/http';

export default function testSuite() {

  let success1 = test('Basic test', (t) => {
    t.expect(1).toEqual(1)
  })

  console.log(success1); // true

  let success2 = test('Another test', (t) => {
    throw("Something entirely unexpected happened");
  });

  console.log(success2); // false

  let success3 = test('Yet another test', (t) => {
    t.expect(true).toEqual(false);
  });

  console.log(success3); // false

}
```

</CodeGroup>

Execution of this script should print the following output.


![output](./images/test-output.png)

