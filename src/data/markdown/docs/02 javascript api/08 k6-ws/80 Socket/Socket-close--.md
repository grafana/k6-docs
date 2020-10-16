---
title: 'Socket.close()'
---

Close the WebSocket connection.

### Example

<CodeGroup labels={[]}>

```js
import ws from 'k6/ws';

export default function () {
  var url = 'ws://echo.websocket.org';
  var response = ws.connect(url, null, function (socket) {
    socket.on('open', function () {
      socket.close();
    });
  });
}
```

</CodeGroup>
