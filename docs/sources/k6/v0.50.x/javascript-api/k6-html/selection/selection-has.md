---
title: 'Selection.has(selector)'
descriptiontion: 'Reduce the set of matched elements to those that have a descendant that matches the selector.'
---

# Selection.has(selector)

Reduce the set of matched elements to those that have a descendant that matches the selector.
Mimics [jquery.has](https://api.jquery.com/has/).

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| selector  | string | A string containing a selector expression to match elements against. |

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
  <li>list item 2
    <ul>
      <li>list item 2-a</li>
      <li>list item 2-b</li>
    </ul>
  </li>
  <li>list item 3</li>
  <li>list item 4</li>
</ul>
  `;
  const doc = parseHTML(content);

  const sel = doc.find('li').has('ul');

  console.log(sel.html());

  sleep(1);
}
```

{{< /code >}}
