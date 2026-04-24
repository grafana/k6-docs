---
title: 'addHeader( key, value )'
description: 'adds a header to the session'
description: 'adds a header to the session'
weight: 21
---

# addHeader( key, value )

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| name      | string | Header name  |
| value     | string | Header value |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({ baseURL: 'https://quickpizza.grafana.com' });

session.addHeader('Authorization', 'token abcdef0123456789');

export default function () {
  session.get('/api/ratings');
}
```

{{< /code >}}
