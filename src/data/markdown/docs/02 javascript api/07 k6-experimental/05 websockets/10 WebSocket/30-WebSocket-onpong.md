---
title: 'WebSocket.onpong'
excerpt: 'A handler function for WebSocket connection pong event.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/websocket-onpong/
---

A handler for a WebSocket connection `pong` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection and setups a handler for the `pong` event._

<CodeGroup labels={["example-websocket-onpong.js"]} lineNumbers={[]} showCopyButton={[true]}>

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
  }
}
```

</CodeGroup>

The preceding example uses a WebSocket echo server, which you can run with the following command:

<CodeGroup>

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```
</CodeGroup>