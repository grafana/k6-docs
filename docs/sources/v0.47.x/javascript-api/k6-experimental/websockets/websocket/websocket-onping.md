---
title: 'WebSocket.onping'
excerpt: 'A handler function for WebSocket connection ping event.'
weight: 30
---

# WebSocket.onping

A handler for a WebSocket connection `ping` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection and sets up a handler for the `ping` event._

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onping = () => {
    console.log('A ping happened!');
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
