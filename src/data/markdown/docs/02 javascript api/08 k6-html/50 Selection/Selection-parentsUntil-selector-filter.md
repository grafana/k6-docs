---
title: 'Selection.parentsUntil([selector], [filter])'
excerpt: 'Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-html/selection/selection-parentsuntil/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-html/selection/selection-parentsuntil/
---

Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector.
Mimics [jquery.parentsUntil](https://api.jquery.com/parentsUntil/)

| Parameter           | Type                                                               | Description                                                |
| ------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| selector (optional) | string \| [Selection](/javascript-api/k6-html/selection) \| `null` | A selector expression or object to match elements against. |
| filter (optional)   | string \| `null`                                                   | A selector expression to filter matched elements.          |

### Returns

| Type                                           | Description  |
| ---------------------------------------------- | ------------ |
| [Selection](/javascript-api/k6-html/selection) | A Selection. |

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

  const sel = doc.find('#term-2').parentsUntil('dt');
  console.log(sel.size());

  const selFilter = doc.find('#term-3').parentsUntil('dt', 'dd');
  console.log(selFilter.size());

  sleep(1);
}
```

</CodeGroup>
