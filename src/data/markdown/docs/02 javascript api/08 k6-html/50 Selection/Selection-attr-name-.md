---
title: 'Selection.attr(name)'
excerpt: 'Get the value of an attribute for the first element in the Selection.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-html/selection/selection-attr/
---

Get the value of an attribute for the first element in the Selection.
Mimics [jquery.attr](https://api.jquery.com/attr/)

| Parameter | Type   | Description                      |
| --------- | ------ | -------------------------------- |
| name      | string | The name of the attribute to get |

### Returns

| Type   | Description                |
| ------ | -------------------------- |
| string | The value of the attribute |

### Example

<CodeGroup labels={[]}>

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body);
  const langAttr = doc.find('html').attr('lang');
}
```

</CodeGroup>
