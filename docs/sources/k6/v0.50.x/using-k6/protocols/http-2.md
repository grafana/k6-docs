---
title: 'HTTP/2'
descriptiontiontiontiontion: 'When you make HTTP requests in k6 it will automatically upgrade the connection to HTTP/2.0 if the server supports it, just like your web browser would.'
weight: 01
---

# HTTP/2

## Overview

HTTP/2.0 is the latest version of the HTTP protocol.
It improves significantly upon HTTP/1.
Most importantly, it introduces a binary wire protocol with multiplexed streams over a single TCP connection.
This solves a long-standing performance issue with HTTP/1.1: [head-of-line blocking](https://en.wikipedia.org/wiki/Head-of-line_blocking).

Well, it at least _partially_ solves it.
The TCP congestion control mechanisms can interfere with the intended independent nature of the multiplexed streams in cases of lost/dropped packets and retransmission/reassembly.
The full solution is to run HTTP/2.0 over UDP, as Google implemented with [QUIC](https://en.wikipedia.org/wiki/QUIC).

## Additional features of HTTP/2.0

- Builtin compression of HTTP headers
- Server push
- Pipelining of requests
- Prioritization of requests

## Load testing HTTP/2 with k6

When you make HTTP requests in k6, k6 automatically upgrades the connection to HTTP/2.0 if the server supports it, just like your web browser would.

To check what protocol was used for a particular request, refer to the `proto` property of the response object.

{{< code >}}

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

{{< /code >}}

To see the values that the `r.proto` field can have, refer to the documentation for [k6 HTTP](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response).
