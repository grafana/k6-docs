---
title: 'Socket.setTimeout( timeout )'
description: 'Set socket inactivity timeout'
weight: 51
---

# Socket.setTimeout()

Sets the inactivity timeout for the socket. When the socket has been idle for `timeout` milliseconds without receiving data, a `timeout` event is emitted.

The socket is **not** automatically closed after a timeout — the connection remains open until `destroy()` is explicitly called. To disable a previously set timeout, pass `0`.

## Signature

<!-- md-k6:skipall -->

```javascript
socket.setTimeout(timeout)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| timeout | number | Inactivity timeout in milliseconds. Pass `0` to disable |

## Returns

| Type | Description |
| :--- | :---------- |
| Socket | The socket instance, for method chaining |

## Example

```javascript
import { Socket } from "k6/x/tcp"

export default async function () {
  const socket = new Socket()

  const closed = new Promise((resolve) => {
    socket.on("close", () => {
      console.log("Connection closed")
      resolve()
    })
  })

  socket.on("data", (data) => {
    const str = String.fromCharCode.apply(null, new Uint8Array(data))
    console.log("Received:", str)
    // Reset the timeout after each data event
    socket.setTimeout(5000)
  })

  socket.on("timeout", () => {
    console.log("No data received for 5 seconds — closing")
    socket.destroy()
  })

  socket.on("error", (err) => {
    console.error("Error:", err)
  })

  const host = __ENV.TCP_HOST || "localhost"
  const port = __ENV.TCP_PORT || "8080"

  await socket.connect(port, host)
  console.log("Connected — waiting for data (5 s timeout)")

  // Set timeout after connecting; no immediate write so the idle timer can fire
  socket.setTimeout(5000)

  await closed
}
```
