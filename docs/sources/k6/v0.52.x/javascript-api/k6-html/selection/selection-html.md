---
title: 'Selection.html()'
description: 'Get the HTML contents of the first element in the set of matched elements.'
---

# Selection.html()

Get the HTML contents of the first element in the set of matched elements.
Mimics [jquery.html](https://api.jquery.com/html/)

### Returns

| Type   | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| string | The HTML content of the first element in the set of matched elements. |

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

  const sel = doc.find('dt');

  console.log(sel.html());

  sleep(1);
}
```

{{< /code >}}
