---
title: 'Socket.writeAsync( data, [options] )'
description: 'Write string or binary data asynchronously'
weight: 31
---

# Socket.writeAsync()

`Socket.writeAsync()` sends data on an open socket and returns a promise. The payload can be a string or an `ArrayBuffer`.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
await socket.writeAsync(data, options)
```

## Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `data` | string \| ArrayBuffer | Data to write to the socket |
| `options` | [WriteOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/write-options) | Optional write configuration |

## Returns

| Type | Description |
| ---- | ----------- |
| Promise\<void\> | Resolves when the write completes |

## Behavior

- The promise rejects if the socket is not connected.
- The promise rejects on invalid encodings or malformed encoded input.
- If you register an `error` handler, write failures still emit `error` in addition to rejecting the promise.
- If `data` is an `ArrayBuffer`, the `encoding` option is ignored.

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default async function () {
  const socket = new Socket()
  const closePromise = new Promise((resolve) => socket.on("close", resolve))

  socket.on("data", (data) => {
    console.log(String.fromCharCode.apply(null, data))
    socket.destroy()
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  await socket.connectAsync(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
  await socket.writeAsync("SGVsbG8=", { encoding: "base64" })
  await closePromise
}
```
