---
title: 'Socket.connect( port, [host] )'
description: 'Connect to a remote TCP server synchronously'
weight: 20
---

# Socket.connect()

`Socket.connect()` opens a TCP connection synchronously. You can call it with a `port` and optional `host`, or with a [ConnectOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/connect-options) object.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
socket.connect(port, host)
socket.connect(options)
```

## Parameters

### `socket.connect(port, host)`

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `port` | number \| string | Destination port number |
| `host` | string | Destination host name or IP address. Defaults to `localhost` |

### `socket.connect(options)`

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `options` | [ConnectOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/connect-options) | Connection options including `port`, `host`, `tls`, and `tags` |

## Returns

| Type | Description |
| ---- | ----------- |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket) | The socket instance for chaining |

## Behavior

- The call blocks until the connection attempt succeeds or fails.
- When the call returns successfully, `socket.connected` is already `true`.
- The `connect` event still runs asynchronously on the VU event loop after `connect()` returns.
- If you register an `error` handler, connection failures emit `error` instead of throwing.
- If you need promise-based flow, use [Socket.connectAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect-async) instead.
- If you use `options.tags`, those tags override socket-level tags with the same key.
- Set `tls: true` to wrap the connection with TLS using standard [k6 TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/).

## Example

<!-- md-k6:skipall -->

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket({
    tags: { service: "echo" },
  })

  socket.on("connect", () => {
    socket.write("Hello, TCP!")
  })

  socket.on("data", (data) => {
    console.log(String.fromCharCode.apply(null, data))
    socket.destroy()
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  socket.connect({
    port: __ENV.TCP_ECHO_PORT || "8080",
    host: __ENV.TCP_ECHO_HOST || "localhost",
    tags: { phase: "connect" },
  })
}
```
