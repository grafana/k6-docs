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
  'Authorization': 'token abcdef0123456789',
  'User-Agent': 'My custom user agent',
});

export default function () {
  session.get('https://quickpizza.grafana.com/api/ratings');
}
```

{{< /code >}}
