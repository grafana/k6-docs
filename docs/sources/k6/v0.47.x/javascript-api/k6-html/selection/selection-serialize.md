---
title: 'Selection.serialize()'
description: 'Encode a set of form elements as a string in standard URL-encoded notation for submission.'
---

# Selection.serialize()

Encode a set of form elements as a string in standard URL-encoded notation for submission.
Mimics [jquery.serialize](https://api.jquery.com/serialize/)

### Returns

| Type   | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| string | The URL-encoded representation of the matched form or form elements. |

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
  const serialized = sel.serialize();

  console.log(serialized); // "username="

  sleep(1);
}
```

{{< /code >}}
