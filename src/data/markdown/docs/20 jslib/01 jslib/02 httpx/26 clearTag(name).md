---
title: 'clearTag( name )'
description: 'removes tag from the session'
excerpt: 'removes tag from the session'
---


| Parameter | Type            | Description                                                      |
| --------- | --------------- | ---------------------------------------------------------------- |
| name  | string  | Tag name to be removed |


### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.1/index.js';

const session = new Httpx({ tags: { tagName: 'tagValue' } });

session.clearTag('tagName'); // removes tag set in the constructor

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

</CodeGroup>