---
title: 'WebSocket.onpong'
description: 'A handler function for WebSocket connection pong event.'
weight: 30
---

# WebSocket.onpong

A handler for a WebSocket connection `pong` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection and setups a handler for the `pong` event._

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onpong = () => {
    console.log('A pong happened!');
    ws.close();
  };

  ws.onopen = () => {
    ws.ping();
  };
}
```

{{< /code >}}

The preceding example uses a WebSocket echo server, which you can run with the following command:

{{< code >}}

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```

{{< /code >}}
