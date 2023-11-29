---
title: 'Socket.sendBinary(data)'
excerpt: 'Send binary data through the connection.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-ws/socket/socket-sendbinary/
---

<WsBlockquote />

Send binary data through the connection. 

| Parameter | Type   | Description       |
| --------- | ------ | ----------------- |
| data      | ArrayBuffer | The data to send. |

### Example

<CodeGroup labels={[]}>

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

</CodeGroup>

- See also [Socket.send(data)](/javascript-api/k6-ws/socket/socket-send)