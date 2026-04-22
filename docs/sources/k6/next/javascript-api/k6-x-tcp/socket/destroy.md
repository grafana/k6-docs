---
title: 'Socket.destroy( [error] )'
description: 'Close the socket and optionally emit an error'
weight: 40
---

# Socket.destroy()

`Socket.destroy()` closes the socket and moves it to the `destroyed` state.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
socket.destroy()
socket.destroy(error)
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `error` | Error | Optional error to emit before the socket closes |

## Returns

| Type | Description |
| ---- | ----------- |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket) | The socket instance for chaining |

## Behavior

- The socket cannot be reused after `destroy()`.
- If you pass an error, the socket emits `error` before it emits `close`.
- Pending work on the socket is terminated as part of shutdown.

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket()

  socket.on("connect", () => {
    socket.destroy(new Error("closed by test"))
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  socket.on("close", () => {
    console.log("socket closed")
  })

  socket.connect(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
}
```
