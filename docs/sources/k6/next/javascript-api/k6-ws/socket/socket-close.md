---
title: 'Socket.close([code])'
description: 'Close the WebSocket connection.'
---

# Socket.close([code])

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Close the WebSocket connection.

| Parameter       | Type   | Description                            |
| --------------- | ------ | -------------------------------------- |
| code (optional) | number | WebSocket status code. (default: 1001) |

### Example

{{< code >}}

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

{{< /code >}}
