---
title: 'addHeader( key, value )'
description: 'adds a header to the session'
excerpt: 'adds a header to the session'
---


| Parameter | Type            | Description                                                      |
| --------- | --------------- | ---------------------------------------------------------------- |
| name  | string  | Header name |
| value  | string  | Header value |


### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.1/index.js';

let session = new Httpx({baseURL: 'https://test-api.k6.io'});

session.addHeader('Authorization', 'token1');

export default function () {
  session.get('/public/crocodiles/1/'); 
}
```

</CodeGroup>