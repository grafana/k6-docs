---
title: 'parseHTML( src )'
description: 'Parse an HTML string and populate a Selection object.'
excerpt: 'Parse an HTML string and populate a Selection object.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-html/parsehtml/
---

Parse an HTML string and populate a [Selection](/javascript-api/k6-html/selection) object.

| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| src       | string | HTML source. |

### Returns

| Type                                           | Description         |
| ---------------------------------------------- | ------------------- |
| [Selection](/javascript-api/k6-html/selection) | A Selection object. |

### Example

<CodeGroup labels={[]}>

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

</CodeGroup>
