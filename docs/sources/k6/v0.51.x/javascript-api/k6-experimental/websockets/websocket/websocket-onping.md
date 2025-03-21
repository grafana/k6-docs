---
title: 'WebSocket.onping'
description: 'A handler function for WebSocket connection ping event.'
weight: 30
---

# WebSocket.onping

A handler for a WebSocket connection `ping` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventListener()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

### Example

_A k6 script that initiates a WebSocket connection and sets up a handler for the `ping` event._

{{< code >}}

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('wss://test-api.k6.io/ws/crocochat/publicRoom/');

  ws.onping = () => {
    console.log('A ping happened!');
    ws.close();
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed!');
  };

  ws.onopen = () => {
    ws.send(JSON.stringify({ event: 'SET_NAME', new_name: `Croc ${__VU}` }));
  };
  ws.onerror = (err) => {
    console.log(err);
  };
}
```

{{< /code >}}
