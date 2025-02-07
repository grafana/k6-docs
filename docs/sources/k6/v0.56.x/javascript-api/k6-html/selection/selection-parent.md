---
title: 'Selection.parent([selector])'
description: 'Get the parent of each element in the current set of matched elements, optionally filtered by a selector.'
---

# Selection.parent([selector])

Get the parent of each element in the current set of matched elements, optionally filtered by a selector.
Mimics [jquery.parent](https://api.jquery.com/parent/).

| Parameter           | Type   | Description                                                          |
| ------------------- | ------ | -------------------------------------------------------------------- |
| selector (optional) | string | A string containing a selector expression to match elements against. |

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
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
  `;
  const doc = parseHTML(content);

  const sel = doc.find('li.third-item').parent();

  console.log(sel.html());

  sleep(1);
}
```

{{< /code >}}
