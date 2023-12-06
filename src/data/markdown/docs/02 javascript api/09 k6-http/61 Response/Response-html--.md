---
title: 'Response.html()'
excerpt: 'Parses response as HTML and populate a Selection.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-http/response/response-html/
---

Parses response as HTML and populate a [Selection](/javascript-api/k6-html/selection) object.

### Returns

| Type                                           | Description        |
| ---------------------------------------------- | ------------------ |
| [Selection](/javascript-api/k6-html/selection) | A Selection object |

### Example

<CodeGroup labels={[]}>

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('https://stackoverflow.com');

  const doc = res.html();
  doc
    .find('link')
    .toArray()
    .forEach(function (item) {
      console.log(item.attr('href'));
    });
}
```

</CodeGroup>
