---
title: 'Selection.get(index)'
description: 'Retrieve the Element matched by the selector.'
---

# Selection.get(index)

Retrieve the Element matched by the selector.
Mimics [jquery.get](https://api.jquery.com/get/)

| Parameter | Type   | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| index     | Number | A zero-based integer indicating which element to retrieve. |

### Returns

| Type    | Description                          |
| ------- | ------------------------------------ |
| Element | The Element matched by the selector. |

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

  const sel = doc.find('dl').children();

  console.log(sel.get(0).innerHTML());
  console.log(sel.get(1).innerHTML());

  sleep(1);
}
```

{{< /code >}}
