---
title: 'addTags( object )'
description: 'adds multiple tags to the session'
excerpt: 'adds multiple tags to the session'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/addtags/
---


| Parameter  | Type      | Description  |
|------------|-----------|--------------|
| headers    | object    | Object       |

### Example

<CodeGroup labels={[]}>

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

</CodeGroup>