---
title: 'Response.html()'
excerpt: 'Parses response as HTML and populate a Selection.'
---

Parses response as HTML and populate a [Selection](/v0.31/javascript-api/k6-html/selection) object.

### Returns

| Type                                                 | Description        |
| ---------------------------------------------------- | ------------------ |
| [Selection](/v0.31/javascript-api/k6-html/selection) | A Selection object |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default function () {
  let res = http.get('https://stackoverflow.com');

  let doc = res.html();
  doc
    .find('link')
    .toArray()
    .forEach(function (item) {
      console.log(item.attr('href'));
    });
}
```

</CodeGroup>
