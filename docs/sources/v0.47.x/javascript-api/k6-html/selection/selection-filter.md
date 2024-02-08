---
title: 'Selection.filter(selector)'
description: 'Reduce the set of matched elements to those that match the selector or pass the function test.'
---

# Selection.filter(selector)

Reduce the set of matched elements to those that match the selector or pass the function's test.
Mimics [jquery.filter](https://api.jquery.com/filter/)

| Parameter | Type                                                                                   | Description                                                          |
| --------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| selector  | function                                                                               | A function used as a test for each element in the set.               |
| selector  | string                                                                                 | A string containing a selector expression to match elements against. |
| selector  | [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | A selection to match elements against.                               |

### Returns

| Type                                                                                   | Description           |
| -------------------------------------------------------------------------------------- | --------------------- |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | The filter selection. |

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
  let sel;
  const els = doc.find('dl').children();

  sel = els.filter('#term-2');
  console.log(sel.text());

  sel = els.filter(function (idx, el) {
    return el.text() === 'definition 3-a';
  });
  console.log(sel.text());

  sel = els.filter(doc.find('dl dt#term-1'));
  console.log(sel.text());

  sleep(1);
}
```

{{< /code >}}
