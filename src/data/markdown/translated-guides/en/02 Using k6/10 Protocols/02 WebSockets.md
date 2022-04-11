---
title: 'WebSockets'
excerpt: 'Comparing HTTP based tests to WebSocket ones, there are some differences in the structure and inner workings of k6.'
---

## Overview

[WebSocket](https://en.wikipedia.org/wiki/WebSocket) is a protocol that provides full-duplex communication channels over a single TCP connection. It is commonly used by single-page apps (SPAs), and to some extent mobile apps, to add server-push based functionality, which usually means a performance improvement over polling based solutions.

## Load testing WebSockets with k6

Comparing HTTP based tests to WebSocket ones, there are some differences in the structure and inner workings. The primary difference is that instead of continuously looping the main function (`export default function() { ... }`) over and over, each VU is now setup to run an asynchronous event loop.

The basic structure of a WebSocket test looks like this:

<CodeGroup labels={["Basic structure of WebSocket-based tests"]} lineNumbers={[true]}>

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

</CodeGroup>

As you can see above the [connect()](/javascript-api/k6-ws/connect-url-params-callback) method takes a "run" function as its third parameter, and that function should accept a [Socket](/javascript-api/k6-ws/socket) object as its only parameter. The run function forms the basis of the asynchronous event loop.

It will be called immediately when the WebSocket connection is created, execute all code inside it (usually code to set up event handlers), and then block until the WebSocket connection is closed (by the remote host or by using [socket.close()](/javascript-api/k6-ws/socket/socket-close)).

## Error handling

To catch errors that can happen during the life of a WebSocket connection you attach a handler to the "error" event, as is illustrated below:

<CodeGroup labels={["Error handling in WebSocket tests"]} lineNumbers={[true]}>

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

</CodeGroup>

## Timers

If you want to schedule a recurring action you can use the [socket.setInterval](/javascript-api/k6-ws/socket#section-socketsetinterval) function to specify a function that should be called with a particular interval.

<CodeGroup labels={["Timers in WebSocket tests"]} lineNumbers={[true]}>

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

</CodeGroup>

## Timeouts

You can add a timeout to the WebSocket connection by passing a handler function as well as the
timeout value (in milliseconds) to the [socket.setTimeout](/javascript-api/k6-ws/socket/socket-settimeout-callback-delay) function.

<CodeGroup labels={["Timeouts in WebSocket tests"]} lineNumbers={[true]}>

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

</CodeGroup>

The timeout in the above code will close down the WebSocket connection after 2 seconds.

## Multiple event handlers

You can attach multiple handler functions to an event as the code below illustrates.

<CodeGroup labels={["Multiple event handlers in WebSocket tests"]} lineNumbers={[true]}>

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

</CodeGroup>
