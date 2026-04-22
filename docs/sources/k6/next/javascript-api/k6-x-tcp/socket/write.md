---
title: 'Socket.write( data, [options] )'
description: 'Write string or binary data synchronously'
weight: 30
---

# Socket.write()

`Socket.write()` sends data on an open socket. The payload can be a string or an `ArrayBuffer`.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
socket.write(data, options)
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `data` | string \| ArrayBuffer | Data to write to the socket |
| `options` | [WriteOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/write-options) | Optional write configuration |

## Returns

| Type | Description |
| ---- | ----------- |
| boolean | Returns `true` when the write succeeds, otherwise `false` |

## Behavior

- String data uses the encoding from `options.encoding`.
- Binary writes should use `ArrayBuffer`.
- If `data` is an `ArrayBuffer`, the `encoding` option is ignored.
- Failed writes return `false`.
- If you register an `error` handler, write failures also emit `error`.
- Write-level tags override connection-level tags with the same key. Connection-level tags already override socket-level tags.

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket()

  socket.on("connect", () => {
    const bytes = new Uint8Array([0x01, 0x05, 0x48, 0x65, 0x6c, 0x6c, 0x6f])
    socket.write(bytes.buffer, {
      tags: { payload: "binary" },
    })
  })

  socket.on("data", (data) => {
    console.log(Array.from(data))
    socket.destroy()
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  socket.connect(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
}
```
