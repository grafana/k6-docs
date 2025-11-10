---
title: 'Selection.attr(name)'
description: 'Get the value of an attribute for the first element in the Selection.'
---

# Selection.attr(name)

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

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body);
  const langAttr = doc.find('html').attr('lang');
}
```

{{< /code >}}
