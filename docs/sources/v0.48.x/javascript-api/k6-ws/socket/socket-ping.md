---
title: 'Socket.ping()'
description: 'Send a ping. Ping messages can be used to verify that the remote endpoint is responsive.'
---

# Socket.ping()

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Send a ping. Ping messages can be used to verify that the remote endpoint is responsive.

### Example

{{< code >}}

```javascript
import ws from 'k6/ws';

export default function () {
  const url = 'ws://echo.websocket.org';
  const response = ws.connect(url, null, function (socket) {
    socket.on('open', function () {
      socket.on('pong', function () {
        // As required by the spec, when the ping is received, the recipient must send back a pong.
        console.log('connection is alive');
      });

      socket.ping();
    });
  });
}
```

{{< /code >}}
