---
title: 'addTag( key, value )'
description: 'adds a tag to the session'
description: 'adds a tag to the session'
weight: 24
---

# addTag( key, value )

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| name      | string | Tag name    |
| value     | string | Tag value   |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({ baseURL: 'https://test-api.k6.io' });

session.addTag('tagName', 'tagValue');
session.addTag('AnotherTagName', 'tagValue2');

export default function () {
  session.get('/public/crocodiles/1/');
}
```

{{< /code >}}
