---
title: 'Socket.setInterval(callback, interval)'
descriptiontion: 'Call a function repeatedly, while the WebSocket connection is open.'
---

# Socket.setInterval(callback, interval)

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Call a function repeatedly, while the WebSocket connection is open.

| Parameter | Type     | Description                                                 |
| --------- | -------- | ----------------------------------------------------------- |
| callback  | function | The function to call every `interval` milliseconds.         |
| interval  | number   | The number of milliseconds between two calls to `callback`. |

### Example

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
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

{{< /code >}}
