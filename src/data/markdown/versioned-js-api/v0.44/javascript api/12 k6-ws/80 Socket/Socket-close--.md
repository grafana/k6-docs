---
title: 'Socket.close([code])'
excerpt: 'Close the WebSocket connection.'
---

<WsBlockquote />

Close the WebSocket connection.

| Parameter       | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| code (optional) | number   | WebSocket status code. (default: 1001)       |


### Example

<CodeGroup labels={[]}>

```javascript
import ws from 'k6/ws';

export default function () {
  const url = 'ws://echo.websocket.org';
  const response = ws.connect(url, null, function (socket) {
    socket.on('open', function () {
      socket.close();
    });
  });
}
```

</CodeGroup>
