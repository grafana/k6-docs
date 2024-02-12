---
title: 'WebSockets'
description: 'Comparing HTTP based tests to WebSocket ones, there are some differences in the structure and inner workings of k6.'
weight: 02
---

# WebSockets

## Overview

[WebSocket](https://en.wikipedia.org/wiki/WebSocket) is a protocol that provides full-duplex communication channels over a single TCP connection.
It is commonly used by single-page apps (SPAs) and mobile apps, to add server-push based functionality, which usually improves performance in polling-based solutions.

## Load testing WebSockets with k6

{{% admonition type="note" %}}

[xk6-websockets](https://github.com/grafana/xk6-websockets) is an experimental module with a more standard API than `k6/ws`. It implements [the WebSockets API living standard](https://websockets.spec.whatwg.org/). While the implementation isn't complete, it uses a global event loop instead of local one.

Currently, it's available as an experimental module [`k6/experimental/websockets`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets). It's also likely that it will become part of the core of k6 in the future.

{{% /admonition %}}

Comparing HTTP-based tests to WebSocket ones, you'll find differences in both structure and inner workings.
The primary difference is that instead of continuously looping the main function (`export default function() { ... }`) over and over, each VU is now runs an asynchronous event loop.

The basic structure of a WebSocket test looks like this:

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => console.log('connected'));
    socket.on('message', (data) => console.log('Message received: ', data));
    socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

{{< /code >}}

In this example, the [connect()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/connect) method takes a "run" function as its third parameter.
That function should accept a [Socket](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket) object as its only parameter.
The run function forms the basis of the asynchronous event loop.

When the WebSocket connection is created, the run function will be immediately called, all code inside it will be executed (usually code to set up event handlers), and then blocked until the WebSocket connection is closed (by the remote host or by using [socket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-close)).

## Error handling

To catch errors happen during the life of a WebSocket connection, attach a handler to the "error" event:

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      // ...
    });

    socket.on('error', function (e) {
      if (e.error() != 'websocket: close sent') {
        console.log('An unexpected error occured: ', e.error());
      }
    });
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

{{< /code >}}

## Timers

To schedule a recurring action, use the [socket.setInterval](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket#section-socketsetinterval) to specify a function to call at a particular interval.

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');

      socket.setInterval(function timeout() {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('ping', () => console.log('PING!'));
    socket.on('pong', () => console.log('PONG!'));
    socket.on('close', () => console.log('disconnected'));
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

{{< /code >}}

## Timeouts

To add a timeout to the WebSocket connection, pass both a handler function and a timeout value (in milliseconds) to the [socket.setTimeout](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws/socket/socket-settimeout) function.

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', () => console.log('connected'));
    socket.on('close', () => console.log('disconnected'));

    socket.setTimeout(function () {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(res, { 'status is 101': (r) => r && r.status === 101 });
}
```

{{< /code >}}

In the preceding example, the timeout will close the WebSocket connection after 2 seconds.

## Multiple event handlers

You can attach multiple handler functions to an event:

{{< code >}}

```javascript
import ws from 'k6/ws';
import { check } from 'k6';

export default function () {
  const url = 'ws://echo.websocket.org';
  const params = { tags: { my_tag: 'hello' } };

  const response = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log('connected');
      socket.send(Date.now());

      socket.setInterval(function timeout() {
        socket.ping();
        console.log('Pinging every 1sec (setInterval test)');
      }, 1000);
    });

    socket.on('ping', () => console.log('PING!'));
    socket.on('pong', () => console.log('PONG!'));
    socket.on('pong', () => {
      // Multiple event handlers on the same event
      console.log('OTHER PONG!');
    });

    socket.on('close', () => console.log('disconnected'));

    socket.on('error', (e) => {
      if (e.error() != 'websocket: close sent') {
        console.log('An unexpected error occurred: ', e.error());
      }
    });

    socket.setTimeout(function () {
      console.log('2 seconds passed, closing the socket');
      socket.close();
    }, 2000);
  });

  check(response, { 'status is 101': (r) => r && r.status === 101 });
}
```

{{< /code >}}
