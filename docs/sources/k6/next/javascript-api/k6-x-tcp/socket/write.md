---
title: 'Socket.write( data, [options] )'
description: 'Send data over the TCP socket'
weight: 31
---

# Socket.write()

Asynchronously sends data to the remote server. Returns a Promise that resolves when the data has been written to the socket.

## Signature

<!-- md-k6:skipall -->

```javascript
socket.write(data, options)
```

## Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| data | string \| ArrayBuffer | Data to send. Use `ArrayBuffer` for binary data |
| options | object | Optional write configuration |
| options.encoding | string | Encoding for string data: `utf8` / `utf-8` (default), `ascii`, `base64`, `base64url`, `hex`. Ignored when `data` is an `ArrayBuffer` |
| options.tags | object | Custom tags for this write operation's metrics (key-value pairs) |

## Returns

| Type | Description |
| :--- | :---------- |
| Promise\<void\> | Resolves when the data has been written to the socket |

## Example

```javascript
import { Socket } from "k6/x/tcp"

export default async function () {
  const socket = new Socket()
  const closed = new Promise((resolve) => { socket.on("close", resolve) })
  socket.on("error", (err) => { console.error("Error:", err) })

  await socket.connect(8080, "example.com")

  // Write a plain text string (utf8 by default)
  await socket.write("Hello, server!")

  // Write base64-encoded data
  await socket.write("SGVsbG8gV29ybGQ=", { encoding: "base64" })

  // Write with custom tags for metrics
  await socket.write("request payload", {
    tags: { operation: "auth-request" },
  })

  socket.destroy()
  await closed
}
```
