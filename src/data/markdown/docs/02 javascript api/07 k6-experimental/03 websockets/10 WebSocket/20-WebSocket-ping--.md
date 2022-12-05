---
title: 'WebSocket.ping()'
excerpt: 'Send a ping. Ping messages can be used to verify that the remote endpoint is responsive.'
---

Send a ping. Ping messages can be used to verify that the remote endpoint is responsive.

### Example

_A k6 script that will initiate WebSocket connection sends a ping and closes it using `onopen` handler. We also should see `connection is alive` since `pong` event should be automatically emitted._

<CodeGroup labels={["example-websocket-ping.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connection established!');
    ws.ping();
    ws.close();
  };

  ws.onpong = () => {
    // As required by the spec, when the ping is received, the recipient must send back a pong.
    console.log('connection is alive');
  };
}
```

</CodeGroup>
