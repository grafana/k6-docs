---
title: 'WebSocket.close([code])'
excerpt: 'Close the WebSocket connection.'
---

Close the WebSocket connection.

| Parameter       | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| code (optional) | number   | WebSocket status code. (default: 1000)       |


### Example

_A k6 script that initiates a WebSocket connection and closes it using the `onopen` handler._

<CodeGroup labels={["example-websocket-close.js"]} lineNumbers={[]} showCopyButton={[true]}>

```javascript
import { WebSocket } from 'k6/experimental/websockets';

export default function () {
  const ws = new WebSocket('ws://localhost:10000');

  ws.onopen = () => {
    ws.close();
    console.log('connection closed');
  };
}
```

</CodeGroup>

The example above uses a simple WebSocket echo server, that you can run with the following command:

<CodeGroup>

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```
</CodeGroup>