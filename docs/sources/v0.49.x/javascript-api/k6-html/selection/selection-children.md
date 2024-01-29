---
title: 'Selection.children([selector])'
excerpt: 'Get the children of each element in the set of matched elements, optionally filtered by a selector.'
---

# Selection.children([selector])

Get the children of each element in the set of matched elements, optionally filtered by a selector.
Mimics [jquery.children](https://api.jquery.com/children/)

| Parameter           | Type   | Description                                                          |
| ------------------- | ------ | -------------------------------------------------------------------- |
| selector (optional) | string | A string containing a selector expression to match elements against. |

### Returns

| Type                                                                                   | Description             |
| -------------------------------------------------------------------------------------- | ----------------------- |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | The children Selection. |

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
  const sel = doc.find('dl');

  console.log(sel.children().size());
  console.log(sel.children('dt').size());

  sleep(1);
}
```

{{< /code >}}
