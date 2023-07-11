---
title: 'addTag( key, value )'
description: 'adds a tag to the session'
excerpt: 'adds a tag to the session'
---


| Parameter  | Type        | Description       |
|------------|-------------|-------------------|
| name       | string      | Tag name          |
| value      | string      | Tag value         |


### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx({ baseURL: 'https://test-api.k6.io' });

session.addTag('tagName', 'tagValue');
session.addTag('AnotherTagName', 'tagValue2');

export default function () {
  session.get('/public/crocodiles/1/');
}
```

</CodeGroup>