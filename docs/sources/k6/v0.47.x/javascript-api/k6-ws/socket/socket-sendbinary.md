---
title: 'Socket.sendBinary(data)'
description: 'Send binary data through the connection.'
---

# Socket.sendBinary(data)

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Send binary data through the connection.

| Parameter | Type        | Description       |
| --------- | ----------- | ----------------- |
| data      | ArrayBuffer | The data to send. |

### Example

{{< code >}}

```javascript
import ws from 'k6/ws';

const binFile = open('./file.pdf', 'b');

export default function () {
  ws.connect('http://wshost/', function (socket) {
    socket.on('open', function () {
      socket.sendBinary(binFile);
    });

    socket.on('binaryMessage', function (msg) {
      // msg is an ArrayBuffer, so we can wrap it in a typed array directly.
      new Uint8Array(msg);
    });
  });
}
```

{{< /code >}}

- See also [Socket.send(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-send)
