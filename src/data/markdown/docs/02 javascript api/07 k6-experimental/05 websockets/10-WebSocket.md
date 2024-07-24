---
title: 'WebSocket'
description: 'Create a WebSocket connection, and provides a WebSocket instance to interact with the service.'
excerpt: 'Create a WebSocket connection, and provides a WebSocket instance to interact with the service.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/
---

Creates a WebSocket instance for connection to a remote host.

The following events can close the connection:

- remote host close event.
- [WebSocket.close()](/javascript-api/k6-experimental/websockets/websocket/websocket-close).
- k6 VU interruption based on test configuration or CLI commands.

| Parameter | Type     | Description                                                                                                                                                                                                                                                              |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| url       | string   | The URL to which to connect (e.g. "ws://localhost:10000").                                                                                                                                                                                                                            |
| protocols | array   | Not yet implemented, reserved for the future use.                                                                                                                                                                                                                            |
| params    | object   | [Params](/javascript-api/k6-experimental/websockets/params/) object containing additional request parameters.                                                                                                                                                                                |

### Returns

| Type                                         | Description           |
| -------------------------------------------- | --------------------- |
| WebSocket | An instance of WebSocket object. |

### Example

_A k6 script that initiates a WebSocket connection._

<CodeGroup labels={["example-websocket.js"]} lineNumbers={[]} showCopyButton={[true]}>

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