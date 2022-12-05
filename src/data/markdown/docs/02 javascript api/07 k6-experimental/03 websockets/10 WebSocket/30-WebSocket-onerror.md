---
title: 'WebSocket.onerror(callback)'
excerpt: 'Set up a callback function for WebSocket connection error event.'
---

Set up a callback function for WebSocket connection `error` event. That way you can set up the only handler for the `error` event. If you want to have simultaneously multiple event handlers, please use [`WebSocket.addEventHandler()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| callback  | function | The function to call when the event happens. |

### Example

_A k6 script that will initiate WebSocket connection and setups a handler for the `error` event._

<CodeGroup labels={["example-websocket-onerror.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onerror = (e) => {
    console.log(e);
    ws.close();
  };
}
```

</CodeGroup>
