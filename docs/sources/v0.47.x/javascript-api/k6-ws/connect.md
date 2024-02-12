---
title: 'connect( url, params, callback )'
description: 'Create a WebSocket connection, and provides a Socket client to interact with the service.'
description: 'Create a WebSocket connection, and provides a Socket client to interact with the service.'
weight: 10
---

# connect( url, params, callback )

{{< docs/shared source="k6" lookup="ws-module.md" version="<K6_VERSION>" >}}

Initiate a WebSocket connection to a remote host.

Calling connect will block the VU finalization until the WebSocket connection is closed. Instead of continuously looping the main function (`export default function() { ... }`) over an over, each VU will be halted listening to async events and executing their event handlers until the connection is closed.

The following events can close the connection:

- remote host close event.
- [Socket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-close).
- k6 VU interruption based on test configuration or CLI commands.

| Parameter | Type     | Description                                                                                                                                                                                                                                                                                                      |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| url       | string   | Request URL (e.g. "ws://echo.websocket.org").                                                                                                                                                                                                                                                                    |
| params    | object   | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/params) object containing additional request parameters.                                                                                                                                                                                  |
| callback  | function | The callback function that will be called when the WebSocket connection is initiated. A [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket) object will be passed to the function, and this object can be used to set up callbacks etc when things happen on the WebSocket connection |

### Returns

| Type                                                                                 | Description           |
| ------------------------------------------------------------------------------------ | --------------------- |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-http/response) | HTTP Response object. |

### Example

{{< code >}}

```javascript
import ws from 'k6/ws';

export default function () {
  const url = 'ws://echo.websocket.org';
  const resp = ws.connect(url, null, function (socket) {
    socket.on('open', function () {
      console.log('WebSocket connection established!');
      socket.close();
    });
  });
}
```

{{< /code >}}
