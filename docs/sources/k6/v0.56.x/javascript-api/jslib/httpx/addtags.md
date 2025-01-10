---
title: 'addTags( object )'
description: 'adds multiple tags to the session'
description: 'adds multiple tags to the session'
weight: 25
---

# addTags( object )

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| headers   | object | Object      |

### Example

{{< code >}}

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx();

session.addTags({
  Tag1: 'value1',
  Tag2: 'value2',
  Tag3: 'value3',
});

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

{{< /code >}}
