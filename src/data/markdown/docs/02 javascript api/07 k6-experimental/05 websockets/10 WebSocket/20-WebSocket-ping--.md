---
title: 'WebSocket.ping()'
excerpt: 'Send a ping. Ping messages can be used to verify that the remote endpoint is responsive.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/websocket-ping/
---

Send a ping. You can use ping messages to verify that the remote endpoint is responsive.

### Example

_A k6 script that initiates a WebSocket connection, sends a ping, and closes it using the `onopen` handler. The console should log `connection is alive`, since the recipient should automatically emit the `pong` event._

<CodeGroup labels={["example-websocket-ping.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

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

The preceding example uses a WebSocket echo server, which you can run with the following command:

<CodeGroup>

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```
</CodeGroup>