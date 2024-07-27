---
title: 'Parse HTML'
excerpt: 'Scripting examples parsing HTML content.'
canonicalUrl: https://grafana.com/docs/k6/latest/examples/parse-html/
redirect: https://grafana.com/docs/k6/latest/examples/parse-html/
---

Examples parsing HTML content. Use the `k6/html` module for HTML parsing.

| Name                                                    | Type     | Description                                           |
| ------------------------------------------------------- | -------- | ----------------------------------------------------- |
| [Selection](/javascript-api/k6-html/selection)          | Class    | A jQuery-like API for accessing HTML DOM elements.    |
| [Element](/javascript-api/k6-html/element)              | Class    | An HTML DOM element as returned by the Selection API. |
| [parseHTML(src)](/javascript-api/k6-html/parsehtml) | function | Parse an HTML string and populate a Selection object. |

<CodeGroup labels={["Select.find"]} lineNumbers={[true]}>

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body); // equivalent to res.html()
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
}
```

</CodeGroup>

<CodeGroup labels={["Element "]} lineNumbers={[true]}>

```javascript
import { parseHTML } from 'k6/html';
import { sleep } from 'k6';

export default function () {
  const content = `
<dl>
  <dt id="term-1">Value term 1</dt>
  <dt id="term-2">Value term 2</dt>
</dl>
  `;
  const sel = parseHTML(content).find('dl').children();

  const el1 = sel.get(0);
  const el2 = sel.get(1);

  console.log(el1.nodeName());
  console.log(el1.id());
  console.log(el1.textContent());

  console.log(el2.nodeName());
  console.log(el2.id());
  console.log(el2.textContent());

  sleep(1);
}
```

</CodeGroup>
