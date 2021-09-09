---
title: 'Selection.contents()'
excerpt: 'Get the children of each element in the set of matched elements, including text and comment nodes.'
---

Get the children of each element in the set of matched elements, including text and comment nodes.
Mimics [jquery.contents](https://api.jquery.com/contents/).

### Returns

| Type                                           | Description |
| ---------------------------------------------- | ----------- |
| [Selection](/javascript-api/k6-html/selection) | Selection.  |

### Example

<CodeGroup labels={[]}>

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

  console.log(sel.contents().text());

  sleep(1);
}
```

</CodeGroup>
