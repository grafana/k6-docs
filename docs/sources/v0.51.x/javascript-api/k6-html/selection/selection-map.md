---
title: 'Selection.map(fn)'
description: 'Pass each selection in the current matched set through a function, producing a new Array containing the return values.'
---

# Selection.map(fn)

Pass each selection in the current matched set through a function, producing a new Array containing the return values.
Mimics [jquery.each](https://api.jquery.com/each/)

| Parameter | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| fn        | function | A function to iterate all the Selections of the Collection. |

### Returns

| Type  | Description                             |
| ----- | --------------------------------------- |
| Array | The array containing the return values. |

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

  const newEls = doc
    .find('dl')
    .children()
    .map(function (idx, el) {
      return 'hola ' + el.text();
    });

  console.log(newEls);

  sleep(1);
}
```

{{< /code >}}
