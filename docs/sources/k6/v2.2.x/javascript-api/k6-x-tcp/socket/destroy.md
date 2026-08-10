---
title: 'Socket.destroy()'
description: 'Close and destroy the TCP socket'
weight: 41
---

# Socket.destroy()

Closes the connection and destroys the socket. After you call `destroy()`, the socket transitions to the `'destroyed'` state, and you can't reuse it. A `close` event is emitted after the socket is destroyed.

## Signature

<!-- md-k6:skipall -->
<!-- eslint-skip -->

```javascript
socket.destroy();
```

## Parameters

None.

## Returns

`void`

## Example

```javascript
import { Socket } from 'k6/x/tcp';

export default async function () {
  const socket = new Socket();

  const closed = new Promise((resolve) => {
    socket.on('close', () => {
      console.log('Connection closed');
      resolve();
    });
  });

  socket.on('data', (data) => {
    const str = new TextDecoder().decode(data);
    console.log('Received:', str);
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('Error:', err);
    socket.destroy();
  });

  const host = __ENV.TCP_HOST || 'localhost';
  const port = __ENV.TCP_PORT || '8080';

  await socket.connect(port, host);
  await socket.write('Hello, server!');

  await closed;
}
```
