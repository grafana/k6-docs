---
title: 'url\`url\`'
description: 'Creates a URL with a name tag.'
description: 'Creates a URL with a name tag.'
weight: 10
---

# url\`url\`

URLs that contain dynamic parts can introduce a large number of unique URLs in the metrics stream. You can use `http.url` to set a consistent name tag in your requests to remedy this issue. Read more on [URL Grouping](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/http-requests#url-grouping).

| Parameter | Type             | Description                              |
| --------- | ---------------- | ---------------------------------------- |
| url       | template literal | Request URL (e.g. `http://example.com`). |

### Returns

| Type     | Description      |
| -------- | ---------------- |
| HTTP URL | HTTP URL object. |

### Example

{{< code >}}

```javascript
import http from 'k6/http';

export default function () {
  for (let id = 1; id <= 100; id++) {
    // tags.name="https://test.k6.io?id=${}",
    http.get(http.url`https://test.k6.io?id=${id}`);
  }
}
```

{{< /code >}}
