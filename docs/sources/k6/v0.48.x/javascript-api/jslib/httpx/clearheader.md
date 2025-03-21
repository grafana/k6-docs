---
title: 'clearHeader( name )'
description: 'removes header from the session'
description: 'removes header from the session'
weight: 23
---

# clearHeader( name )

| Parameter | Type   | Description               |
| --------- | ------ | ------------------------- |
| name      | string | Header name to be removed |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({ headers: { Authorization: 'token1' } });

session.clearHeader('Authorization'); // removes header set in the constructor

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

{{< /code >}}
