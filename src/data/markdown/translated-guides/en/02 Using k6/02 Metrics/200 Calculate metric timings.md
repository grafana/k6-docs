---
title: Calculate HTTP timings
excerpt: How to calculate timings for an individual k6 metric
---

To access the timing information from an individual HTTP request, the [Response.timings](/javascript-api/k6-http/response) object provides the time spent on the various phases in `ms`:

- blocked: equals to `http_req_blocked`.
- connecting: equals to `http_req_connecting`.
- tls_handshaking: equals to `http_req_tls_handshaking`.
- sending: equals to  `http_req_sending`.
- waiting: equals to `http_req_waiting`.
- receiving: equals to `http_req_receiving`.
- duration: equals to `http_req_duration`.

<CodeGroup lineNumbers={[true]}>

```javascript
import http from 'k6/http';

export default function () {
  const res = http.get('http://httpbin.test.k6.io');
  console.log('Response time was ' + String(res.timings.duration) + ' ms');
}
```

</CodeGroup>

The expected (partial) output looks like this:

<CodeGroup lineNumbers={[false]}>

```bash
$ k6 run script.js

  INFO[0001] Response time was 337.962473 ms               source=console
```

</CodeGroup>

