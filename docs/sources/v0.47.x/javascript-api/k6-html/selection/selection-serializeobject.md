---
title: 'Selection.serializeObject()'
description: 'Encode a set of form elements as an object.'
---

# Selection.serializeObject()

Encode a set of form elements as an object (`{ "inputName": "value", "checkboxName": "value" }`).

### Returns

| Type   | Description                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------- |
| object | Object representation of the matched form or form elements, key is field name and value is field value. |

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
  const serialized = sel.serializeObject();

  console.log(JSON.stringify(serialized)); // {"username": ""}

  sleep(1);
}
```

{{< /code >}}
