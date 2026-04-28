---
title: 'Socket.destroy()'
description: 'Close and destroy the TCP socket'
weight: 41
---

# Socket.destroy()

Closes the connection and destroys the socket. Once destroyed, the socket transitions to the `'destroyed'` state and cannot be reused. A `close` event is emitted after the socket is destroyed.

## Signature

<!-- md-k6:skipall -->

```javascript
socket.destroy()
```

## Parameters

None.

## Returns

`void`

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
    socket.destroy()
  })

  socket.on("error", (err) => {
    console.error("Error:", err)
    socket.destroy()
  })

  await socket.connect(8080, "example.com")
  await socket.write("Hello, server!")

  await closed
}
```
