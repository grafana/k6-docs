---
title: 'Socket.close()'
excerpt: 'Close the WebSocket connection.'
---

Close the WebSocket connection.

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
