---
title: 'Socket'
description: 'Socket is a WebSocket client to interact with a WebSocket connection.'
weight: 80
weight: 80
---

# Socket

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

`Socket` is a WebSocket client to interact with a WebSocket connection. You can use it to listen various events happening on the WebSocket connection and send messages to the server. Additionally, you can use socket.setTimeout() and socket.setInterval() to execute code in the background, or repeatedly, while the WebSocket connection is open.

| Method                                                                                                                            | Description                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Socket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-close)                               | Close the WebSocket connection.                                                                                                                                                |
| [Socket.on(event, callback)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-on)                      | Set up an event listener on the connection for any of the following events:<br />- open<br />- binaryMessage<br />- message<br />- ping<br />- pong<br />- close<br />- error. |
| [Socket.ping()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-ping)                                 | Send a ping.                                                                                                                                                                   |
| [Socket.send(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-send)                             | Send string data.                                                                                                                                                              |
| [Socket.sendBinary(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-sendbinary)                 | Send binary data.                                                                                                                                                              |
| [Socket.setInterval(callback, interval)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-setinterval) | Call a function repeatedly at certain intervals, while the connection is open.                                                                                                 |
| [Socket.setTimeout(callback, period)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-settimeout)     | Call a function with a delay, if the connection is open.                                                                                                                       |

### WebSocket built-in metrics

`k6` automatically collects metrics when interacting with a WebSocket service through the `k6/ws` API.
Review the list in the [metrics reference](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference#websockets).

Check out the [Results output article](https://grafana.com/docs/k6/<K6_VERSION>/get-started/results-output) for more information about how to process the metric information.

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
//VU execution won't be completely finished until the connection is closed.
```

{{< /code >}}
