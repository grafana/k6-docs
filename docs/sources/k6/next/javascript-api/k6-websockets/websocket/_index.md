---
title: 'WebSocket'
description: 'Create a WebSocket connection, and provides a WebSocket instance to interact with the service.'
weight: 10
---

# WebSocket

Creates a WebSocket instance for connection to a remote host.

The following events can close the connection:

- remote host close event.
- [WebSocket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-close).
- k6 VU interruption based on test configuration or CLI commands.

| Parameter | Type   | Description                                                                                                                                          |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| url       | string | The URL to which to connect (e.g. "ws://localhost:10000").                                                                                           |
| protocols | array  | Not yet implemented, reserved for the future use.                                                                                                    |
| params    | object | [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/params) object containing additional request parameters. |

### Returns

| Type      | Description                      |
| --------- | -------------------------------- |
| WebSocket | An instance of WebSocket object. |

### Ready-state constants

Compare an instance's `readyState` with these constants to check the connection state:

| Constant | Value | Description |
| -------- | ----- | ----------- |
| `WebSocket.CONNECTING` | `0` | The connection is not yet open. |
| `WebSocket.OPEN` | `1` | The connection is open and ready to communicate. |
| `WebSocket.CLOSING` | `2` | The connection is closing. |
| `WebSocket.CLOSED` | `3` | The connection is closed or could not be opened. |

The constants are read-only and also available on each instance, for example, `ws.OPEN`.
Use these constants, as you would in a browser, instead of importing a `ReadyState` enum: k6 does not export a runtime enum.

### Example

_A k6 script that initiates a WebSocket connection._

```javascript
import { WebSocket } from 'k6/websockets';

export default function () {
  const ws = new WebSocket('wss://quickpizza.grafana.com/ws');

  ws.onopen = () => {
    console.log(ws.readyState === WebSocket.OPEN); // true
    console.log(ws.OPEN === WebSocket.OPEN); // true
    ws.close();
  };

  ws.onclose = () => {
    console.log(ws.readyState === WebSocket.CLOSED); // true
  };
}
```
