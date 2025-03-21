---
title: 'WebSocket.onclose'
description: 'A handler function for WebSocket connection close event.'
weight: 30
---

# WebSocket.onclose

A handler for a WebSocket connection `close` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection, sends a ping, and closes it using `onopen` handler.
The console should also log `WebSocket connection closed` from the `onclose` handler._

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onopen = () => {
    console.log('WebSocket connection established!');
    ws.close();
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed!');
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
