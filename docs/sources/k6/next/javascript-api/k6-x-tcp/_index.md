---
title: 'k6/x/tcp'
description: 'k6 TCP extension API'
weight: 11
---

# k6/x/tcp

{{< docs/shared source="k6" lookup="official-extension.md" version="<K6_VERSION>" >}}

The `k6/x/tcp` module adds raw TCP socket support to your k6 scripts. You can open TCP connections, send and receive text or binary data, enable TLS, and handle socket lifecycle events directly from a test.

The API follows the event-driven shape of Node.js `net.Socket`, but it is adapted for the k6 VU event loop. You can use synchronous methods such as `connect()` and `write()`, or promise-based methods such as `connectAsync()` and `writeAsync()` when you want sequential async flow.

## Key features

- Open raw TCP connections from k6 scripts.
- Use synchronous and asynchronous connection and write methods.
- Handle socket lifecycle events with `connect`, `data`, `close`, `error`, and `timeout`.
- Send string or `ArrayBuffer` payloads.
- Enable TLS with standard k6 TLS configuration.
- Add tags at the socket, connection, and write-operation levels.
- Collect built-in extension metrics for connection and I/O activity.

## Use cases

- Load test custom TCP protocols.
- Verify request and response flows against TCP echo servers or internal services.
- Test secure TCP endpoints with TLS enabled.
- Send binary protocol frames from a k6 script.
- Add TCP checks to larger end-to-end performance scenarios.

## API

| Class/Type | Description |
| ---------- | ----------- |
| [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket) | TCP socket class for connecting, writing, and handling events |
| [Socket.connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect) | Connect to a remote TCP server synchronously |
| [Socket.connectAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect-async) | Connect to a remote TCP server asynchronously |
| [Socket.write()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/write) | Write string or binary data synchronously |
| [Socket.writeAsync()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/write-async) | Write string or binary data asynchronously |
| [Socket.destroy()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/destroy) | Close the socket and optionally emit an error |
| [Socket.setTimeout()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/set-timeout) | Configure an idle timeout for the socket |
| [Socket.on()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/on) | Register socket event handlers |
| [SocketOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket-options) | Constructor options for a new socket |
| [ConnectOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/connect-options) | Options object for `connect()` and `connectAsync()` |
| [WriteOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/write-options) | Options object for `write()` and `writeAsync()` |
| [SocketState](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket-state) | Socket lifecycle state values |
| [SocketEvent](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket-event) | Supported event names for `Socket.on()` |

## Metrics

The extension automatically generates these TCP-specific metrics:

- `tcp_socket_connecting`: Trend measuring time spent establishing the TCP connection.
- `tcp_socket_resolving`: Trend measuring DNS resolution time before connect.
- `tcp_socket_duration`: Trend measuring total socket lifetime.
- `tcp_sockets`: Counter tracking established socket connections.
- `tcp_reads`: Counter tracking read operations.
- `tcp_writes`: Counter tracking write operations.
- `tcp_errors`: Counter tracking socket errors.
- `tcp_timeouts`: Counter tracking idle timeouts.
- `tcp_partial_writes`: Counter tracking partial write failures.

The socket activity also contributes to built-in k6 traffic metrics such as `data_sent` and `data_received`.

## Event-driven programming model

Each VU creates its own `Socket` instance, registers event handlers, and then opens a connection. When the connection succeeds, the socket queues events back onto the VU event loop.

If you use `connect()`, the call blocks until the connection attempt succeeds or fails, but the `connect` handler still runs asynchronously after `connect()` returns. If you use `connectAsync()`, the returned promise resolves when the connection is ready or rejects on failure, even if you registered an `error` handler.

For a successful connection, the extension preserves event order and delivers `connect` before any `data` event for that socket.

## Examples

<!-- md-k6:skipall -->

### Basic event-driven socket

```javascript
import { Socket } from "k6/x/tcp"

export default function () {
  const socket = new Socket()

  socket.on("connect", () => {
    socket.write("Hello, TCP!")
  })

  socket.on("data", (data) => {
    const response = String.fromCharCode.apply(null, data)
    console.log(response)
    socket.destroy()
  })

  socket.on("error", (error) => {
    console.error(error.message)
  })

  socket.connect(__ENV.TCP_ECHO_PORT || "8080", __ENV.TCP_ECHO_HOST || "localhost")
}
```

### Async TLS socket

```javascript
import { Socket } from "k6/x/tcp"

export default async function () {
  const socket = new Socket()
  const closePromise = new Promise((resolve) => socket.on("close", resolve))

  socket.on("error", (error) => {
    console.error(error.message)
  })

  await socket.connectAsync({
    port: 443,
    host: "example.com",
    tls: true,
  })

  socket.destroy()
  await closePromise
}
```
