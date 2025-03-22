---
title: 'WebSocket.close([code])'
description: 'Close the WebSocket connection.'
weight: 15
---

# WebSocket.close([code])

Close the WebSocket connection.

| Parameter       | Type   | Description                                                                                                                                         |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| code (optional) | number | WebSocket status code. (default: 1000) . See [the list of supported](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code) close codes. |

### Example

_A k6 script that initiates a WebSocket connection and closes it using the `onopen` handler._

{{< code >}}

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

{{< /code >}}

The preceding example uses a WebSocket echo server, which you can run with the following command:

{{< code >}}

```bash
$ docker run --detach --rm --name ws-echo-server -p 10000:8080 jmalloc/echo-server
```

{{< /code >}}
