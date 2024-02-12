---
title: 'Selection.is(selector)'
descriptiontion: 'Check the current matched set of elements against a selector or element and return true if at least one of these elements matches the given arguments.'
---

# Selection.is(selector)

Check the current matched set of elements against a selector or element and return true if at least one of these elements matches the given arguments.
Mimics [jquery.is](https://api.jquery.com/is/)

| Parameter | Type                                                                                   | Description                                                          |
| --------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| selector  | function                                                                               | A function used as a test for each element in the set                |
| selector  | string                                                                                 | A string containing a selector expression to match elements against. |
| selector  | [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | A selection.                                                         |

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

  let result;

  const els = doc.find('dl').children();

  result = els.is('dd');
  console.log(result);

  result = els.is(function (idx, el) {
    return el.text() === 'hola';
  });
  console.log(result);

  result = els.is(els.first());
  console.log(result);

  sleep(1);
}
```

{{< /code >}}
