---
title: 'Selection.single(selector)'
description: 'Returns at most one element matching the selector.'
---

# Selection.single(selector)

Returns at most one element matching the selector, as a [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) object. It's backed by goquery's `Single` matcher, which is faster than [find()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection/selection-find) when you only need the first match.

| Parameter | Type   | Description                                                          |
| --------- | ------ | -------------------------------------------------------------------- |
| selector  | string | A string containing a selector expression to match elements against. |

### Returns

| Type                                                                                   | Description       |
| -------------------------------------------------------------------------------------- | ----------------- |
| [Selection](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-html/selection) | Selection object. |

### Example

```javascript
import { parseHTML } from 'k6/html';
import http from 'k6/http';

export default function () {
  const res = http.get('https://k6.io');
  const doc = parseHTML(res.body);

  const title = doc.single('h1').text();
}
```
