---
title: 'Socket.connect( port, [host] )'
description: 'Establish a TCP connection'
weight: 21
---

# Socket.connect()

Asynchronously establishes a TCP connection to a remote server. Returns a Promise that resolves when the connection is established, or rejects on failure.

## Signature

<!-- md-k6:skipall -->

```javascript
// Overload 1: port and optional host
socket.connect(port, host)

// Overload 2: options object
socket.connect(options)
```

## Parameters

**Overload 1**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| port | number \| string | Destination port (1-65535) |
| host | string | Destination hostname or IP address. Defaults to `'localhost'` |

**Overload 2**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| options.port | number \| string | Destination port (required) |
| options.host | string | Destination hostname or IP address. Defaults to `'localhost'` |
| options.tls | boolean | Enable TLS/SSL encryption. Defaults to `false` |
| options.tags | object | Custom tags for connection metrics (key-value pairs) |

## Returns

| Type | Description |
| :--- | :---------- |
| Promise\<void\> | Resolves when the connection is established. Rejects on connection failure |

## TLS/SSL configuration

When `tls: true` is set, the socket performs a TLS handshake after establishing the TCP connection. TLS settings such as certificates, verification, and cipher suites are controlled by k6's standard [TLS configuration](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/ssl-tls/).

## Example

```javascript
import { Socket } from "k6/x/tcp"

export default async function () {
  // Overload 1: connect with separate port and host
  const socket = new Socket()
  const closed = new Promise((resolve) => { socket.on("close", resolve) })
  socket.on("error", (err) => { console.error("Error:", err) })

  await socket.connect(8080, "example.com")
  console.log("Connected")
  socket.destroy()
  await closed

  // Overload 2: connect with options object and TLS
  const tlsSocket = new Socket({ tags: { protocol: "tls" } })
  const tlsClosed = new Promise((resolve) => { tlsSocket.on("close", resolve) })
  tlsSocket.on("error", (err) => { console.error("TLS error:", err) })

  await tlsSocket.connect({
    port: 443,
    host: "secure.example.com",
    tls: true,
  })
  console.log("TLS connection established")
  tlsSocket.destroy()
  await tlsClosed
}
```
