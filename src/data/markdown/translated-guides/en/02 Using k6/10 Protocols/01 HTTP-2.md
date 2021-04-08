---
title: 'HTTP/2'
excerpt: 'When you make HTTP requests in k6 it will automatically upgrade the connection to HTTP/2.0 if the server supports it, just like your web browser would.'
---

## Overview

HTTP/2.0 is the latest version of the HTTP protocol and introduces some major improvements compared to its predecessor. Chiefly of which is the introduction of a binary wire protocol with multiplexed streams over a single TCP connection. This solves a long-standing performance issue with HTTP/1.1, [head-of-line blocking](https://en.wikipedia.org/wiki/Head-of-line_blocking).

Well, it at least _partially_ solves it, since you still have TCP congestion control mechanisms interfering with the intended independent nature of the multiplexed streams in cases of lost/dropped packets and retransmission/reassembly. The full solution is to run HTTP/2.0 over UDP, which is what Google implemented with [QUIC](https://en.wikipedia.org/wiki/QUIC).

## Additional features of HTTP/2.0

- Builtin compression of HTTP headers
- Server push
- PipelininG of requests
- Prioritization of requests

## Load testing HTTP/2 with k6

When you make HTTP requests in k6 it will automatically upgrade the connection to HTTP/2.0 if the server supports it, just like your web browser would. You can check what protocol was used for a particular request by looking at the `proto` property of the response object.

<CodeGroup labels={["Check if protocol used for request is HTTP/2.0"]} lineNumbers={[true]}>

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://test-api.k6.io/');
  check(res, {
    'protocol is HTTP/2': (r) => r.proto === 'HTTP/2.0',
  });
  sleep(1);
}
```

</CodeGroup>

For more information on what values the r.proto field can have, check out:

- [k6 HTTP](/javascript-api/k6-http/response)
- https://http2.github.io/http2-spec/#versioning
