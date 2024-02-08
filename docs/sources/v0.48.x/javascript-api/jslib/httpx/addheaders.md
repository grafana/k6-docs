---
title: 'addHeaders( object )'
description: 'adds multiple headers to the session'
description: 'adds multiple headers to the session'
weight: 22
---

# addHeaders( object )

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| headers   | object | Object      |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx();

session.addHeaders({
  'Authorization': 'token1',
  'User-Agent': 'My custom user agent',
  'Content-Type': 'application/x-www-form-urlencoded',
});

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

{{< /code >}}
