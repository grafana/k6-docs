---
title: 'setBaseUrl( url )'
description: 'sets the base URL for the session'
excerpt: 'sets the base URL for the session'
canonicalUrl: https://grafana.com/docs/k6
---


| Parameter   | Type         | Description                                                |
|-------------|--------------|------------------------------------------------------------|
| baseURL     | string       | Base URL to be used for all requests issued in the session |


### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx();

session.setBaseUrl('https://test-api.k6.io');

export default function () {
  session.get('/public/crocodiles/1/'); // baseUrl doesn't need to be repeated on every request
}
```

</CodeGroup>