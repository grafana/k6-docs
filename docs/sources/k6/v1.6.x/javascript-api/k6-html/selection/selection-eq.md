---
title: 'Selection.eq(index)'
description: 'Reduce the set of matched elements to the one at the specified index.'
---

# Selection.eq(index)

Reduce the set of matched elements to the one at the specified index.
Mimics [jquery.eq](https://api.jquery.com/eq/).

| Parameter | Type   | Description                                                |
| --------- | ------ | ---------------------------------------------------------- |
| index     | Number | An integer indicating the 0-based position of the element. |

### Returns

| Type                                                                                   | Description  |
| -------------------------------------------------------------------------------------- | ------------ |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | A Selection. |

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

  console.log(sel.eq(0).html());
  console.log(sel.eq(1).html());
  console.log(sel.eq(2).html());

  sleep(1);
}
```

{{< /code >}}
