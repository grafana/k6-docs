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
<!-- eslint-skip -->

```javascript
socket.on(event, listener);
```

### Parameters

| Parameter | Type     | Description                                                             |
| :-------- | :------- | :---------------------------------------------------------------------- |
| event     | string   | Event name: `'connect'`, `'data'`, `'close'`, `'error'`, or `'timeout'` |
| listener  | function | Callback invoked when the event fires                                   |

## Events

### connect

Emitted when the socket successfully establishes a connection to the remote server.

#### Signature

<!-- eslint-skip -->

```javascript
socket.on('connect', () => {
  // Connection established
});
```

### data

Emitted when data is received from the remote endpoint. The data is provided as a `Uint8Array`.

#### Signature

<!-- eslint-skip -->

```javascript
socket.on('data', (data) => {
  // data is Uint8Array
});
```

#### Parameters

| Parameter | Type       | Description       |
| :-------- | :--------- | :---------------- |
| data      | Uint8Array | The received data |

### close

Emitted when the socket connection is fully closed, either by the local or remote side. This is the final event in the socket lifecycle and is emitted exactly once per socket.

#### Signature

<!-- eslint-skip -->

```javascript
socket.on('close', () => {
  // Connection fully closed
});
```

### error

Emitted when a socket error occurs, such as a connection failure or network issue.

#### Signature

<!-- eslint-skip -->

```javascript
socket.on('error', (error) => {
  // Handle error
});
```

#### Parameters

| Parameter | Type  | Description      |
| :-------- | :---- | :--------------- |
| error     | Error | The error object |

### timeout

Emitted when the socket times out due to inactivity as configured by `setTimeout()`. The socket doesn't automatically close the connection—call destroy() to close it.

#### Signature

<!-- eslint-skip -->

```javascript
socket.on('timeout', () => {
  // Inactivity timeout reached
});
```

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

  socket.on('connect', () => {
    console.log('Connected to server');
  });

  socket.on('data', (data) => {
    const str = new TextDecoder().decode(data);
    console.log('Received:', str);
    socket.destroy();
  });

  socket.on('error', (err) => {
    console.error('Socket error:', err);
    socket.destroy();
  });

  socket.on('timeout', () => {
    console.log('Socket timed out');
    socket.destroy();
  });

  const host = __ENV.TCP_HOST || 'localhost';
  const port = __ENV.TCP_PORT || '8080';

  await socket.connect(port, host);
  await socket.write('Hello, server!');

  await closed;
}
```
