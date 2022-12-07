---
title: 'WebSocket.close([code])'
excerpt: 'Close the WebSocket connection.'
---

Close the WebSocket connection.

| Parameter       | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| code (optional) | number   | WebSocket status code. (default: 1000)       |


### Example

_A k6 script that initiates a WebSocket connection and closes it using the `onopen` handler._

<CodeGroup labels={["example-websocket-close.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const url = 'ws://localhost:10000';
  const ws = new WebSocket(url);

  ws.onopen = () => {
    ws.close();
    console.log('connection closed');
  };
}
```

</CodeGroup>
