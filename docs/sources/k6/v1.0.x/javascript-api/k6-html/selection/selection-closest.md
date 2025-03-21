---
title: 'Selection.closest(selector)'
description: 'For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.'
---

# Selection.closest(selector)

For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
Mimics [jquery.closest](https://api.jquery.com/closest/)

| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| selector  | string | A string containing a selector expression to match elements against |

### Returns

| Type                                                                                   | Description |
| -------------------------------------------------------------------------------------- | ----------- |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | Selection.  |

### Example

{{< code >}}

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
  <ul id="one" class="level-1">
  <li class="item-i">I</li>
  <li id="ii" class="item-ii">II
    <ul class="level-2">
      <li class="item-a">A</li>
      <li class="item-b">B
        <ul class="level-3">
          <li class="item-1">1</li>
          <li class="item-2">2</li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-c">C</li>
    </ul>
  </li>
  <li class="item-iii">III</li>
</ul>
  `;
  const doc = parseHTML(content);

  const sel = doc.find('li.item-a').closest('ul');
  console.log(sel.attr('class'));
  sleep(1);
}
```

{{< /code >}}
