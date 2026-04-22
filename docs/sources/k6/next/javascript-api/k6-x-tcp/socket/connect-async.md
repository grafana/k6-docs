---
title: 'Socket.connectAsync( port, [host] )'
description: 'Connect to a remote TCP server asynchronously'
weight: 21
---

# Socket.connectAsync()

`Socket.connectAsync()` opens a TCP connection and returns a promise. You can call it with a `port` and optional `host`, or with a [ConnectOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/connect-options) object.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
await socket.connectAsync(port, host)
await socket.connectAsync(options)
```

## Parameters

### `socket.connectAsync(port, host)`

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `port` | number \| string | Destination port number |
| `host` | string | Destination host name or IP address. Defaults to `localhost` |

### `socket.connectAsync(options)`

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `options` | [ConnectOptions](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/connect-options) | Connection options including `port`, `host`, `tls`, and `tags` |

## Returns

| Type | Description |
| ---- | ----------- |
| Promise\<void\> | Resolves when the connection is established |

## Behavior

- The promise resolves when the socket is connected.
- The promise rejects on invalid arguments or connection failures.
- Unlike [Socket.connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-x-tcp/socket/connect), registering an `error` handler does not suppress promise rejection.
- If you use `options.tags`, those tags override socket-level tags with the same key.
- Set `tls: true` to enable TLS using standard [k6 TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/).

## Example

<!-- md-k6:skipall -->

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
