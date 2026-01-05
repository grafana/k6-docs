---
title: 'Selection.toArray()'
description: 'Retrieve all the elements contained in the Selection, as an array.'
---

# Selection.toArray()

Retrieve all the elements contained in the Selection, as an array.
Mimics [jquery.toArray](https://api.jquery.com/toArray/).

### Returns

| Type                                                                                            | Description                 |
| ----------------------------------------------------------------------------------------------- | --------------------------- |
| Array of [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | Array of Selection objects. |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
<dl>
  <dt id="term-1">term 1</dt>
  <dd>definition 1-a</dd>
  <dd>definition 1-b</dd>
  <dd>definition 1-c</dd>
  <dd>definition 1-d</dd>

  <dt id="term-2">term 2</dt>
  <dd>definition 2-a</dd>
  <dd>definition 2-b</dd>
  <dd>definition 2-c</dd>

  <dt id="term-3">term 3</dt>
  <dd>definition 3-a</dd>
  <dd>definition 3-b</dd>
</dl>
  `;
  const doc = parseHTML(content);

  doc
    .find('dl')
    .children()
    .toArray()
    .forEach(function (item) {
      console.log(item.text());
    });

  sleep(1);
}
```

{{< /code >}}
