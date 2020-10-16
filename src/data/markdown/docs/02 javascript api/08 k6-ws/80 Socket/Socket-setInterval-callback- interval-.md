---
title: 'Socket.setInterval(callback, interval)'
---

Call a function repeatedly, while the WebSocket connection is open.

| Parameter | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| callback  | function | The function to call every `interval` milliseconds.         |
| interval  | number   | The number of milliseconds between two calls to `callback`. |

### Example

<CodeGroup labels={[]}>

```js
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  var url = 'ws://echo.websocket.org';
  var params = { tags: { my_tag: 'hello' } };

  var res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');

      socket.setInterval(function timeout() {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('pong', function () {
      console.log('PONG!');
    });
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

</CodeGroup>
