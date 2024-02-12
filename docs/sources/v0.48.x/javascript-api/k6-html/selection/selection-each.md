---
title: 'Selection.each(fn)'
description: 'Iterate over a Selection, executing a function for each matched element.'
---

# Selection.each(fn)

Iterate over a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection), executing a function for each matched element.
Mimics [jquery.each](https://api.jquery.com/each/)

| Parameter | Type     | Description                                               |
| --------- | -------- | --------------------------------------------------------- |
| fn        | function | A function to iterate all the Elements of the Collection. |

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

  doc.find('dl').each(function (idx, el) {
    console.log(el.innerHTML());
  });

  sleep(1);
}
```

{{< /code >}}
