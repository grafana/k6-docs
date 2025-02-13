---
title: 'Selection.serializeArray()'
description: 'Encode a set of form elements as an array of names and values.'
---

# Selection.serializeArray()

Encode a set of form elements as an array of names and values (`[{ name: "name", value: "value" }, ...]`).
Mimics [jquery.serializeArray](https://api.jquery.com/serializeArray/)

### Returns

| Type  | Description                                                     |
| ----- | --------------------------------------------------------------- |
| array | Array of names and values of the matched form or form elements. |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
 <form><input name="username"></form>
  `;

  const doc = parseHTML(content);
  const sel = doc.find('form');
  const serialized = sel.serializeArray();

  console.log(JSON.stringify(serialized)); // [{"name": "username", "value": ""}]

  sleep(1);
}
```

{{< /code >}}
