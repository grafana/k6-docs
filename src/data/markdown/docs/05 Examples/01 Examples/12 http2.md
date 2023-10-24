---
title: 'HTTP2'
excerpt: 'Information on how to load test HTTP/2.'
canonicalUrl: https://grafana.com/docs/k6
---

If the target system indicates that a connection can be upgraded from HTTP/1.1 to HTTP/2, k6 will do so automatically.

## Making HTTP/2 requests

<CodeGroup labels={["http2-example.js"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://test-api.k6.io/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
  });
}
```

</CodeGroup>
