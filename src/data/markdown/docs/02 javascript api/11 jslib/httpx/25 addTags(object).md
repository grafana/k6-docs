---
title: 'addTags( object )'
description: 'adds multiple tags to the session'
---


| Parameter | Type            | Description                                                      |
| --------- | --------------- | ---------------------------------------------------------------- |
| headers  | object  | Object |

### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.1/index.js';

let session = new Httpx();

session.addTags({
  'Tag1': 'value1',
  'Tag2': 'value2',
  'Tag3': 'value3',
});

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/'); 
}
```

</CodeGroup>