---
title: 'Socket'
description: 'TCP socket class for connecting, writing, and handling events'
weight: 10
---

# Socket

The `Socket` class provides a TCP client API for k6 scripts. Use it to open a connection, exchange data, inspect socket state, and react to lifecycle events on the VU event loop.

## Constructor

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
new Socket(options)
```

Creates a new socket in the `disconnected` state.

### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [SocketOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket-options) | Optional socket configuration |

## Properties

| Property | Type | Description |
| -------- | ---- | ----------- |
| `ready_state` | [SocketState](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket-state) | Current socket lifecycle state |
| `local_ip` | string \| undefined | Local IP address. `undefined` until the socket connects |
| `local_port` | number \| undefined | Local port number. `undefined` until the socket connects |
| `remote_ip` | string \| undefined | Resolved remote IP address. `undefined` until the socket connects |
| `remote_port` | number \| undefined | Remote port number. `undefined` until the socket connects |
| `bytes_written` | number | Total number of bytes written through this socket |
| `bytes_read` | number | Total number of bytes received through this socket |
| `connected` | readonly boolean | Convenience property that is `true` when `ready_state` is `open` |

## Methods

| Method | Description |
| ------ | ----------- |
| [connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect) | Connect to a remote TCP server synchronously |
| [connectAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect-async) | Connect to a remote TCP server asynchronously |
| [write()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/write) | Write string or binary data synchronously |
| [writeAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/write-async) | Write string or binary data asynchronously |
| [destroy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/destroy) | Close the socket and optionally emit an error |
| [setTimeout()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/set-timeout) | Configure an idle timeout |
| [on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/on) | Register a socket event handler |

## Lifecycle

The socket moves through these states:

1. `disconnected` after construction.
2. `opening` while a connection attempt is in progress.
3. `open` after a successful connection.
4. `destroyed` after `destroy()` completes.

Once a socket reaches `destroyed`, you cannot reuse it.

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket({
    tags: { service: "echo" },
  })

  socket.on("connect", () => {
    console.log(socket.ready_state)
    socket.write("ping")
  })

  socket.on("data", (data) => {
    console.log(String.fromCharCode.apply(null, data))
    console.log(socket.bytes_written, socket.bytes_read)
    socket.destroy()
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  socket.connect(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
}
```
