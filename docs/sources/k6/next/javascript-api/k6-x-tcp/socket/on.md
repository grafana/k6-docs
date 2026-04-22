---
title: 'Socket.on( event, listener )'
description: 'Register socket event handlers'
weight: 60
---

# Socket.on()

`Socket.on()` registers an event listener for a socket lifecycle event. All handlers run on the k6 VU event loop.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
socket.on(event, listener)
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `event` | [SocketEvent](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket-event) | Event name to listen for |
| `listener` | function | Callback to run when the event fires |

## Returns

| Type | Description |
| ---- | ----------- |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket) | The socket instance for chaining |

## Events

| Event | Listener signature | Description |
| ----- | ------------------ | ----------- |
| `connect` | `() => void` | Fires when the socket connection is established |
| `data` | `(data: Uint8Array) => void` | Fires when the socket receives data |
| `close` | `() => void` | Fires when the socket finishes closing |
| `error` | `(error: Error) => void` | Fires when a socket operation fails |
| `timeout` | `() => void` | Fires when the socket is idle for longer than the configured timeout |

## Behavior

- Only one listener is supported for each event name.
- Registering a second listener for the same event replaces the first one.
- The `data` event receives a `Uint8Array`.
- `on()` returns the socket instance, so you can chain registrations.
- For a successful connection, `connect` is delivered before the first `data` event.

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket()

  socket
    .on("connect", () => {
      socket.write("ping")
    })
    .on("data", (data) => {
      console.log(String.fromCharCode.apply(null, data))
      socket.destroy()
    })
    .on("error", (error) => {
      console.error(error.message)
    })

  socket.connect(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
}
```
