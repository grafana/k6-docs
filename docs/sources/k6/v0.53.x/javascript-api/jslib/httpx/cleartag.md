---
title: 'clearTag( name )'
description: 'removes tag from the session'
description: 'removes tag from the session'
weight: 26
---

# clearTag( name )

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| name      | string | Tag name to be removed |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({ tags: { tagName: 'tagValue' } });

session.clearTag('tagName'); // removes tag set in the constructor

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

{{< /code >}}
