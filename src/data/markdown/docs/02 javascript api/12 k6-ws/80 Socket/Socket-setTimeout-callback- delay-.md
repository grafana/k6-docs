---
title: 'Socket.setTimeout(callback, delay)'
excerpt: 'Call a function at a later time, if the WebSocket connection is still open then.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-ws/socket/socket-settimeout/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-ws/socket/socket-settimeout/
---

<WsBlockquote />

Call a function at a later time, if the WebSocket connection is still open then.

| Parameter | Type     | Description                                    |
| --------- | -------- | ---------------------------------------------- |
| callback  | function | The function to call when `delay` has expired. |
| delay     | number   | The delay time, in milliseconds.               |

### Example

<CodeGroup labels={[]}>

```javascript
import ws from 'k6/ws';
import { sleep } from 'k6';

export default function () {
  console.log('T0: Script started');
  const url = 'ws://echo.websocket.org';
  const response = ws.connect(url, null, function (socket) {
    console.log('T0: Entered WebSockets run loop');
    socket.setTimeout(function () {
      console.log('T0+1: This is printed');
    }, 1000);
    socket.setTimeout(function () {
      console.log('T0+2: Closing socket');
      socket.close();
    }, 2000);
    socket.setTimeout(function () {
      console.log('T0+3: This is not printed, because socket is closed');
    }, 3000);
  });
  console.log('T0+2: Exited WebSockets run loop');
  sleep(2);
  console.log('T0+4: Script finished');
}
```

</CodeGroup>
