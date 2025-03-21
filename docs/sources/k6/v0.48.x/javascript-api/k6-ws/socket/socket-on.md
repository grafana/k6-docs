---
title: 'Socket.on(event, callback)'
description: 'Set up callback functions for various events on the WebSocket connection.'
---

# Socket.on(event, callback)

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Set up callback functions for various events on the WebSocket connection. Multiple handlers can be defined for the same event.

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| event     | string   | The event name to define a callback for.     |
| callback  | function | The function to call when the event happens. |

| Event name | Description                                                                                                                                                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| open       | Emitted when the connection is established                                                                                                                                                                                                 |
| message    | Emitted when a message is received from the server.                                                                                                                                                                                        |
| ping       | Emitted when a ping is received from the server. The client will automatically send back a `pong`.                                                                                                                                         |
| pong       | Emitted when a pong is received from the server.                                                                                                                                                                                           |
| close      | Emitted when the connection is closed by the client [Socket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-close) or when the server sends the `close` event with code status 1000 (normal closure). |
| error      | Emitted when an error occurs. Non-normal closure errors will be forwarded.                                                                                                                                                                 |

### Example

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const response = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');
      socket.send(Date.now());

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

    socket.on('pong', function () {
      // Multiple event handlers on the same event
      console.log('OTHER PONG!');
    });

    socket.on('message', function (message) {
      console.log(`Received message: ${message}`);
    });

    socket.on('close', function () {
      console.log('disconnected');
    });

    socket.on('error', function (e) {
      if (e.error() != 'websocket: close sent') {
        console.log('An unexpected error occured: ', e.error());
      }
    });

    socket.setTimeout(function () {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(response, { 'status is 101': (r) => r && r.status === 101 });
}
```

{{< /code >}}
