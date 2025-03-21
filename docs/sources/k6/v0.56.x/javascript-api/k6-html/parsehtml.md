---
title: 'parseHTML( src )'
description: 'Parse an HTML string and populate a Selection object.'
description: 'Parse an HTML string and populate a Selection object.'
weight: 10
---

# parseHTML( src )

Parse an HTML string and populate a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) object.

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| src       | string | HTML source. |

### Returns

| Type                                                                                   | Description         |
| -------------------------------------------------------------------------------------- | ------------------- |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | A Selection object. |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body); // equivalent to res.html()
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
}
```

{{< /code >}}
