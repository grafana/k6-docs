---
title: 'k6/x/tcp'
description: 'k6 TCP extension API'
weight: 11
---

# k6/x/tcp

{{< docs/shared source="k6" lookup="official-extension.md" version="<K6_VERSION>" >}}

The `k6/x/tcp` module adds first-class support for raw TCP socket communication to your performance testing scripts. With this extension, you can establish TCP connections, send and receive data, and test network protocols directly from your k6 tests.

If you've used Node.js's [`net.Socket`](https://nodejs.org/api/net.html#class-netsocket), the API will feel familiar, with event-driven programming, Promise-based operations, and comprehensive lifecycle management.

## Key features

- Event-driven architecture with support for socket lifecycle events (`connect`, `data`, `close`, `error`, `timeout`)
- Promise-based `connect()` and `write()` methods for use with `async`/`await`
- TLS/SSL support using standard [k6 TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/)
- Binary data handling: send and receive strings and `ArrayBuffer`
- Automatic metrics collection for all socket operations
- Optional custom tags for filtering and grouping metrics

### Use cases

- Load testing TCP-based services and custom binary protocols
- Testing raw network protocol implementations under high concurrency
- Validating server behavior and connection handling under load
- Performance testing services that don't use HTTP

## API

| Class | Description |
| ----- | ----------- |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket) | TCP socket for connecting to servers and managing operations |
| [Socket.connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect) | Establish a TCP connection |
| [Socket.write()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/write) | Send data over the socket |
| [Socket.destroy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/destroy) | Close and destroy the socket |
| [Socket.setTimeout()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/set-timeout) | Set inactivity timeout |
| [Socket.on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/on) | Register event handlers |

## Metrics

The extension automatically generates metrics for TCP socket operations:

| Metric | Type | Description |
| ------ | ---- | ----------- |
| `tcp_socket_connecting` | Trend | Time to establish TCP connection (ms) |
| `tcp_socket_resolving` | Trend | Time to resolve hostname (ms) |
| `tcp_socket_duration` | Trend | Total duration of socket connection (ms) |
| `tcp_sockets` | Counter | Number of TCP socket connections established |
| `tcp_reads` | Counter | Number of read operations |
| `tcp_writes` | Counter | Number of write operations |
| `tcp_errors` | Counter | Number of TCP errors |
| `tcp_timeouts` | Counter | Number of socket timeouts |
| `tcp_partial_writes` | Counter | Number of partial write failures |
| `data_sent` | Counter | Total bytes sent (builtin k6 metric) |
| `data_received` | Counter | Total bytes received (builtin k6 metric) |

You can pass custom `tags` in the Socket constructor, connection options, or write options to attach additional metadata to each metric.

## Event-driven architecture

Unlike HTTP-based tests, TCP tests use an asynchronous event loop. Each VU creates a Socket, registers event handlers, and connects to a server. The VU remains active until `socket.destroy()` is called or the connection is closed.

Register handlers with `socket.on()` before calling `socket.connect()`. The `connect` handler fires when the connection is established; the `data` handler fires each time data is received; the `close` handler fires when the connection is fully closed.

## Examples

<!-- md-k6:skipall -->

### Basic usage

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

  socket.on("error", (err) => {
    console.error("Error:", err)
  })

  const host = __ENV.TCP_HOST || "localhost"
  const port = __ENV.TCP_PORT || "8080"

  await socket.connect(port, host)
  console.log("Connected")
  socket.destroy()

  await closed
}
```

### TLS connection

```javascript
import { Socket } from "k6/x/tcp"

export default async function () {
  const socket = new Socket()

  const closed = new Promise((resolve) => {
    socket.on("close", resolve)
  })

  socket.on("data", (data) => {
    const response = String.fromCharCode.apply(null, new Uint8Array(data))
    console.log("Received:", response.substring(0, 100))
    socket.destroy()
  })

  socket.on("error", (err) => {
    console.error("Error:", err)
  })

  const host = __ENV.TLS_HOST || "example.com"

  await socket.connect({ port: 443, host, tls: true })
  await socket.write(`GET / HTTP/1.1\r\nHost: ${host}\r\nConnection: close\r\n\r\n`)

  await closed
}
```
