---
title: 'Selection.data([key])'
excerpt: 'Return the value at the named data store for the first element in the set of matched elements.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-html/selection/selection-data/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-html/selection/selection-data/
---

Return the value at the named data store for the first element in the set of matched elements.
Mimics [jquery.data](https://api.jquery.com/data/)

| Parameter      | Type   | Description                               |
| -------------- | ------ | ----------------------------------------- |
| key (optional) | string | A string naming the piece of data to set. |

### Returns

| Type   | Description                        |
| ------ | ---------------------------------- |
| string | The value at the named data store. |

### Example

<CodeGroup labels={[]}>

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
 <h1 data-test-id="data-value">Hola</h1>
  `;

  const doc = parseHTML(content);
  const sel = doc.find('h1');

  console.log(sel.data().testID);
  console.log(sel.data('test-id'));
  console.log(sel.data('testId'));

  sleep(1);
}
```

</CodeGroup>
