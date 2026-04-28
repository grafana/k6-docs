---
title: 'Socket.on( event, listener )'
description: 'Register an event handler on the TCP socket'
weight: 61
---

# Socket.on()

Registers an event listener for a socket lifecycle event. All event handlers execute in the context of the k6 VU event loop.

Only one listener per event type is supported. Calling `on()` for an event that already has a listener replaces the previous one.

## Signature

<!-- md-k6:skipall -->

```javascript
socket.on(event, listener)
```

### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| event | string | Event name: `'connect'`, `'data'`, `'close'`, `'error'`, or `'timeout'` |
| listener | function | Callback invoked when the event fires |

## Events

### connect

Emitted when the socket successfully establishes a connection to the remote server.

#### Signature

```javascript
socket.on("connect", () => {
  // Connection established
})
```

### data

Emitted when data is received from the remote endpoint. The data is provided as a `Uint8Array`.

#### Signature

```javascript
socket.on("data", (data) => {
  // data is Uint8Array
})
```

#### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| data | Uint8Array | The received data |

### close

Emitted when the socket connection is fully closed, either by the local or remote side. This is the final event in the socket lifecycle and is emitted exactly once per socket.

#### Signature

```javascript
socket.on("close", () => {
  // Connection fully closed
})
```

### error

Emitted when a socket error occurs, such as a connection failure or network issue.

#### Signature

```javascript
socket.on("error", (error) => {
  // Handle error
})
```

#### Parameters

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| error | Error | The error object |

### timeout

Emitted when the socket times out due to inactivity as configured by `setTimeout()`. The connection is not automatically closed — call `destroy()` if you want to close it.

#### Signature

```javascript
socket.on("timeout", () => {
  // Inactivity timeout reached
})
```

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

  socket.on("connect", () => {
    console.log("Connected to server")
  })

  socket.on("data", (data) => {
    const str = String.fromCharCode.apply(null, new Uint8Array(data))
    console.log("Received:", str)
    socket.destroy()
  })

  socket.on("error", (err) => {
    console.error("Socket error:", err)
    socket.destroy()
  })

  socket.on("timeout", () => {
    console.log("Socket timed out")
    socket.destroy()
  })

  await socket.connect(8080, "example.com")
  await socket.write("Hello, server!")

  await closed
}
```
