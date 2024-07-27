---
title: 'addHeaders( object )'
description: 'adds multiple headers to the session'
excerpt: 'adds multiple headers to the session'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/addheaders/
redirect: https://grafana.com/docs/k6/latest/javascript-api/jslib/httpx/addheaders/
---


| Parameter   | Type         | Description                |
|-------------|--------------|----------------------------|
| headers     | object       | Object                     |


### Example

<CodeGroup labels={[]}>

```javascript
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';

const session = new Httpx();

session.addHeaders({
  'Authorization': 'token1',
  'User-Agent': 'My custom user agent',
  'Content-Type': 'application/x-www-form-urlencoded',
});

export default function () {
  session.get('https://test-api.k6.io/public/crocodiles/1/');
}
```

</CodeGroup>