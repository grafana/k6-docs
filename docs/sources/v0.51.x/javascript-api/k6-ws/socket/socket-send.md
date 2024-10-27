---
title: 'Socket.send(data)'
description: 'Send a data string through the connection.'
---

# Socket.send(data)

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Send a data string through the connection.
You can use `JSON.stringify` to convert a JSON or JavaScript values to a JSON string.

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| data      | string | The data to send. |

### Example

{{< code >}}

```javascript
import ws from 'k6/ws';

export default function () {
  const url = 'ws://echo.websocket.org';
  const response = ws.connect(url, null, function (socket) {
    socket.on('open', function () {
      socket.send('my-message');
      socket.send(JSON.stringify({ data: 'hola' }));
    });
  });
}
```

{{< /code >}}

- See also [Socket.sendBinary(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-sendbinary)
