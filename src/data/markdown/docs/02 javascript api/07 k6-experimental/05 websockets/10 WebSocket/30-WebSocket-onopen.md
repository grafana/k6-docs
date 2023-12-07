---
title: 'WebSocket.onopen'
excerpt: 'A handler function for WebSocket connection open event.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/websocket-onopen/
---

A handler for a WebSocket connection `open` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection and sets up a handler for the `open` event._

<CodeGroup labels={["example-websocket-onopen.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onopen = () => {
    console.log('WebSocket connection established!');
    ws.close();
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