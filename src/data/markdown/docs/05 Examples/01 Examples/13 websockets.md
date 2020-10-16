---
title: 'Websockets'
excerpt: 'Scripting example on how to test websocket APIs.'
---

## Testing a WebSocket API

<CodeGroup labels={["websocket-example.js"]} lineNumbers={[true]}>

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

    socket.on('ping', function () {
      console.log('PING!');
    });

    socket.on('pong', function () {
      console.log('PONG!');
    });

    socket.on('close', function () {
      console.log('disconnected');
    });

    socket.setTimeout(function () {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

</CodeGroup>
