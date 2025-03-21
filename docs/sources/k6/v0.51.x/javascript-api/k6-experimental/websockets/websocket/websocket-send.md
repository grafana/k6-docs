---
title: 'WebSocket.send(data)'
description: 'Send a data string through the connection.'
weight: 10
---

# WebSocket.send(data)

Send a data string through the connection.
You can use `JSON.stringify` to convert a JSON or JavaScript values to a JSON string.

| Parameter | Type                 | Description       |
| --------- | -------------------- | ----------------- |
| data      | string / ArrayBuffer | The data to send. |

### Example

_A k6 script that demonstrates how to add an event listener for the `open` WebSocket connection event sends a message and closes the connection._

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onopen = () => {
    ws.send('lorem ipsum');
    ws.close();
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
