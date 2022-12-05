---
title: 'WebSocket.send(data)'
excerpt: 'Send a data string through the connection.'
---

Send a data string through the connection.
You can use `JSON.stringify` to convert a JSON or JavaScript values to a JSON string.

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| data      | string | The data to send. |

### Example

_A k6 script that demonstrates how to add an event listener for the `open` WebSocket connection event sends a message and closes the connection._

<CodeGroup labels={["example-websocket-send.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onopen = () => {
    ws.send('lorem ipsum');
    ws.close();
  };
}
```

</CodeGroup>
