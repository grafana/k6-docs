---
title: "Socket.send(data)"
---

Send a data string through the connection. Binary data is not currently supported.
You can use `JSON.stringify` to convert a JSON or JavaScript values to a JSON string.


| Parameter | Type     | Description                                                                                                                                                                                                                                                                |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data      | string   | The data to send.                                                                                                                                                                                                                                                          |

### Example

<div class="code-group" data-props='{"labels": []}'>

```js
import ws from 'k6/ws';

export default function() {
  var url = 'ws://echo.websocket.org';
  var response = ws.connect(url, null, function(socket) {
    socket.on('open', function() {
      socket.send('my-message');
      socket.send(JSON.stringify({ data: 'hola' }));
    });
  });
}
```

</div>
