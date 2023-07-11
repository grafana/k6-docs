---
title: 'Selection.text()'
excerpt: 'Get the text content of the Selection.'
---

Get the text content of the Selection.
Mimics [jquery.text](https://api.jquery.com/text/).

### Returns

| Type   | Description             |
| ------ | ----------------------- |
| string | Selection text content. |

### Example

<CodeGroup labels={[]}>

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body);
  const pageTitle = doc.find('head title').text();
}
```

</CodeGroup>
