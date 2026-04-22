---
title: 'Socket.setTimeout( timeout )'
description: 'Configure an idle timeout for the socket'
weight: 50
---

# Socket.setTimeout()

`Socket.setTimeout()` configures an inactivity timeout for the socket.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
socket.setTimeout(timeout)
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `timeout` | number | Timeout in milliseconds. Use `0` to disable an existing timeout |

## Returns

| Type | Description |
| ---- | ----------- |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket) | The socket instance for chaining |

## Behavior

- The timeout measures inactivity on the socket.
- When the timeout triggers, the socket emits `timeout`.
- The timeout does not close the socket automatically.
- Call `destroy()` yourself if you want to close the socket after a timeout.

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket()

  socket.on("connect", () => {
    socket.setTimeout(5000)
  })

  socket.on("timeout", () => {
    console.log("socket timed out")
    socket.destroy()
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  socket.connect(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
}
```
