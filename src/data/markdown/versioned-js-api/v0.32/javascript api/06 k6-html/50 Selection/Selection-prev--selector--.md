---
title: 'Selection.prev([selector])'
excerpt: 'Get the immediately preceding sibling of each element in the set of matched elements.'
---

Get the immediately preceding sibling of each element in the set of matched elements.
Mimics [jquery.prev](https://api.jquery.com/prev/).

| Parameter           | Type   | Description                                                          |
| ------------------- | ------ | -------------------------------------------------------------------- |
| selector (optional) | string | A string containing a selector expression to match elements against. |

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
<ul>
  <li>list item 1</li>
  <li>list item 2</li>
  <li class="third-item">list item 3</li>
  <li>list item 4</li>
  <li>list item 5</li>
</ul>
  `;
  const doc = parseHTML(content);
  const sel = doc.find('li.third-item').prev();

  console.log(sel.html());

  sleep(1);
}
```

</CodeGroup>
