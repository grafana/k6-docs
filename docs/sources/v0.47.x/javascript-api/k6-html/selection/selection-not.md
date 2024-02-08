---
title: 'Selection.not(selector)'
description: 'Remove elements from the set of matched elements.'
---

# Selection.not(selector)

Remove elements from the set of matched elements.
Mimics [jquery.not](https://api.jquery.com/not/)

| Parameter | Type     | Description                                                          |
| --------- | -------- | -------------------------------------------------------------------- |
| selector  | string   | A string containing a selector expression to match elements against. |
| selector  | function | A function used as a test for each element in the set.               |

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
  let sel = doc.find('dl').children();

  console.log(sel.not('dt').size());

  sel = sel.not(function (idx, item) {
    return item.text().startsWith('definition');
  });

  console.log(sel.size());

  sleep(1);
}
```

{{< /code >}}
