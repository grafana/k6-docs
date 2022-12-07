---
title: 'WebSocket.onmessage(callback)'
excerpt: 'Set up a callback function for message event WebSocket.'
---

Set up a callback function for WebSocket connection `message` event.
This way, you can set up the only handler for the `message` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventHandler()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| callback  | function | The function to call when the event happens. |

### Example

_A k6 script that initiates a WebSocket connection and sets up a handler for the `message` event._

<CodeGroup labels={["example-websocket-onmessage.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onmessage = (data) => {
    console.log('a message received');
    console.log(data);
    ws.close();
  };
}
```

</CodeGroup>
