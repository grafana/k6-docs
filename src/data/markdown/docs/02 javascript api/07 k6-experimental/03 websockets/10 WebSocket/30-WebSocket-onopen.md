---
title: 'WebSocket.onopen(callback)'
excerpt: 'Set up a callback function for WebSocket connection open event.'
---

Set up a callback function for WebSocket connection `open` event. That way you can set up the only handler for the `open` event. If you want to have simultaneously multiple event handlers, please use [`WebSocket.addEventHandler()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| callback  | function | The function to call when the event happens. |

### Example

_A k6 script that will initiate WebSocket connection and setups a handler for the `open` event._

<CodeGroup labels={["example-websocket-onopen.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connection established!');
    ws.close();
  };
}
```

</CodeGroup>
