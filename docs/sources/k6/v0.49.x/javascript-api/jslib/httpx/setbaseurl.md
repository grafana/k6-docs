---
title: 'setBaseUrl( url )'
description: 'sets the base URL for the session'
description: 'sets the base URL for the session'
weight: 20
---

# setBaseUrl( url )

| Parameter | Type   | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| baseURL   | string | Base URL to be used for all requests issued in the session |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx();

session.setBaseUrl('https://test-api.k6.io');

export default function () {
  session.get('/public/crocodiles/1/'); // baseUrl doesn't need to be repeated on every request
}
```

{{< /code >}}
