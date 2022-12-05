---
title: 'WebSocket.onclose(callback)'
excerpt: 'Set up a callback function for WebSocket connection close event.'
---

Set up a callback function for WebSocket connection `close` event. That way you can set up the only handler for the `close` event. If you want to have simultaneously multiple event handlers, please use [`WebSocket.addEventHandler()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| callback  | function | The function to call when the event happens. |

### Example

_A k6 script that will initiate WebSocket connection sends a ping and closes it using `onopen` handler. We also should see `WebSocket connection closed` that will come from `onclose` handler._

<CodeGroup labels={["example-websocket-onclose.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onopen = () => {
    console.log('WebSocket connection established!');
    ws.close();
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed!');
  };
}
```

</CodeGroup>
