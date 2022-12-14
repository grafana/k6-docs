---
title: 'WebSocket.onpong(callback)'
excerpt: 'Set up a callback function for WebSocket connection pong event.'
---

Set a callback function as a handler for a WebSocket connection `pong` event.
For multiple, simultaneous event handlers, use [`WebSocket.addEventHandler()`](/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener).

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| callback  | function | The function to call when the event happens. |

### Example

_A k6 script that initiates a WebSocket connection and setups a handler for the `pong` event._

<CodeGroup labels={["example-websocket-onpong.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onpong = () => {
    console.log('A pong happened!');
  };
}
```

</CodeGroup>

The preceding example uses a WebSocket echo server, which you can run with the following command:

<CodeGroup>

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```
</CodeGroup>