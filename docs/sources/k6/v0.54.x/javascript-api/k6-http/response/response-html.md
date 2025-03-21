---
title: 'Response.html()'
description: 'Parses response as HTML and populate a Selection.'
---

# Response.html()

Parses response as HTML and populate a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) object.

### Returns

| Type                                                                                   | Description        |
| -------------------------------------------------------------------------------------- | ------------------ |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | A Selection object |

### Example

{{< code >}}

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

{{< /code >}}
