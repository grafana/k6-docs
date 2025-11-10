---
title: 'Selection.find(selector)'
description: 'Find the selection descendants, filtered by a selector.'
---

# Selection.find(selector)

Find the selection descendants, filtered by a selector. It returns a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) object.
Mimics [jquery.find](https://api.jquery.com/find/)

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| selector  | string | A string containing a selector expression to match elements against. |

### Returns

| Type                                                                                   | Description       |
| -------------------------------------------------------------------------------------- | ----------------- |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | Selection object. |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body);

  const titleDoc = doc.find('head title');
  const title = titleDoc.text();
}
```

{{< /code >}}
