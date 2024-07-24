---
title: 'WebSocket.close([code])'
excerpt: 'Close the WebSocket connection.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/websockets/websocket/websocket-close/
---

Close the WebSocket connection.

| Parameter       | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| code (optional) | number   | WebSocket status code. (default: 1000) . See [the list of supported](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code) close codes.      |


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

The preceding example uses a WebSocket echo server, which you can run with the following command:

<CodeGroup>

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```
</CodeGroup>