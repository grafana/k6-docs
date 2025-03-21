---
title: 'WebSocket.addEventListener(event, handler)'
description: 'Set up handler functions for various events on the WebSocket connection.'
weight: 10
---

# WebSocket.addEventListener(event, handler)

Set up handler functions for various events on the WebSocket connection. You can define multiple handlers for the same event.

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| event     | string   | The event name to define a handler for.      |
| handler   | function | The function to call when the event happens. |

| Event name | Description                                                                                                                                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| open       | Emitted when the connection is established.                                                                                                                                                                                                                              |
| message    | Emitted when a message is received from the server.                                                                                                                                                                                                                      |
| ping       | Emitted when a ping is received from the server. The client will automatically send back a `pong`.                                                                                                                                                                       |
| pong       | Emitted when a pong is received from the server.                                                                                                                                                                                                                         |
| close      | Emitted when the connection is closed by the client [WebSocket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-close) or when the server sends the `close` event with code status 1000 (normal closure). |
| error      | Emitted when an error occurs.                                                                                                                                                                                                                                            |

### Example

_A k6 script that demonstrates how to add multiple event listeners for the WebSocket `message` connection event._

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');
  ws.binaryType = 'arraybuffer';

  ws.onopen = () => {
    console.log('connected');
    ws.send(Date.now().toString());
  };

  ws.onmessage = () => {
    console.log('onmessage event handler!');
  };

  // Multiple event handlers on the same event
  ws.addEventListener('message', () => {
    console.log('addEventListener event handler!');

    ws.close();
  });
}
```

{{< /code >}}

The preceding example uses a WebSocket echo server, which you can run with the following command:

{{< code >}}

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```

{{< /code >}}
