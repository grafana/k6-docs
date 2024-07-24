---
title: 'WebSocket.onclose'
excerpt: 'A handler function for WebSocket connection close event.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/websocket-onclose/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/websocket-onclose/
---

A handler for a WebSocket connection `close` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection, sends a ping, and closes it using `onopen` handler.
The console should also log `WebSocket connection closed` from the `onclose` handler._

<CodeGroup labels={["example-websocket-onclose.js"]} lineNumbers={[]} showCopyButton={[true]}>

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

</CodeGroup>

The preceding example uses a WebSocket echo server, which you can run with the following command:

<CodeGroup>

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```
</CodeGroup>