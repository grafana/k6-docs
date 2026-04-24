---
aliases:
  - ./k6-experimental/websockets # docs/k6/<K6_VERSION>/javascript-api/k6-websockets
title: 'websockets'
description: 'k6 websockets API'
weight: 16
---

# websockets

{{< admonition type="note" >}}

The `k6/experimental/websockets` module has been deprecated. Use `k6/websockets` instead.

{{< /admonition >}}

This module implements the browser [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) with additional k6-specific functionalities (cookies, tags, headers and so on).

The main difference between this module and [`k6/ws`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws) is that this module uses a global event loop instead of a local one.
A global event loop lets a single VU have multiple concurrent connections, which improves performance.

| Class/Method                                                                                                                                                          | Description                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/params)                                                                   | Used for setting various WebSocket connection parameters such as headers, cookie jar, compression, etc.                                                                                                                                                              |
| [WebSocket(url, protocols, params)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket)                                     | Constructs a new WebSocket connection.                                                                                                                                                                                                                               |
| [WebSocket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-close)                                     | Close the WebSocket connection.                                                                                                                                                                                                                                      |
| [WebSocket.ping()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-ping)                                       | Send a ping.                                                                                                                                                                                                                                                         |
| [WebSocket.send(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-send)                                   | Send data.                                                                                                                                                                                                                                                           |
| [WebSocket.addEventListener(event, handler)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-addeventlistener) | Add an event listener on the connection for specific event.                                                                                                                                                                                                          |
| [Blob](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/blob)                                                                       | Interface that represents a blob, which is a file-like object of immutable, raw data; they can be read as text or binary data, or converted into a [ReadableStream](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/streams/readablestream). |

A WebSocket instance also has the following properties:

<!-- vale off -->

| Class/Property                                                                                                                          | Description                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| WebSocket.readyState                                                                                                                    | The current state of the connection. Could be one of [the four states](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState).                                                                                                                                                   |
| WebSocket.url                                                                                                                           | The URL of the connection as resolved by the constructor.                                                                                                                                                                                                                                        |
| WebSocket.bufferedAmount                                                                                                                | The number of bytes of data that have been queued using calls to `send()` but not yet transmitted to the network.                                                                                                                                                                                |
| WebSocket.binaryType                                                                                                                    | The [`binaryType`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType) controls the type of binary data being received over the WebSocket connection. Use `"blob"` to receive it as `Blob`, or `"arraybuffer"` to receive it as `ArrayBuffer`. The default value is `"blob"`. |
| [WebSocket.onmessage](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-onmessage) | A handler for `message` events.                                                                                                                                                                                                                                                                  |
| [WebSocket.onerror](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-onerror)     | A handler for `error` events.                                                                                                                                                                                                                                                                    |
| [WebSocket.onopen](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-onopen)       | A handler for `open` events.                                                                                                                                                                                                                                                                     |
| [WebSocket.onclose](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-onclose)     | A handler for `close` events.                                                                                                                                                                                                                                                                    |
| [WebSocket.onping](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-onping)       | A handler for `ping` events.                                                                                                                                                                                                                                                                     |
| [WebSocket.onpong](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-websockets/websocket/websocket-onpong)       | A handler for `pong` events.                                                                                                                                                                                                                                                                     |

<!-- vale on -->

## Websocket metrics

k6 takes specific measurements for Websockets.
For the complete list, refer to the [Metrics reference](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference#websockets).

## Example

This example shows:

- How a single VU can run multiple WebSockets connections asynchronously.
- How to use the timeout and interval functions to stop the connections after some period.

{{< code >}}

```javascript
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { WebSocket } from 'k6/websockets';

const sessionDuration = randomIntBetween(1000, 3000); // user session between 1s and 3s

export default function () {
  for (let i = 0; i < 4; i++) {
    startWSWorker(i);
  }
}

function startWSWorker(id) {
  // create a new websocket connection
  const ws = new WebSocket(`wss://quickpizza.grafana.com/ws`);
  ws.binaryType = 'arraybuffer';

  ws.addEventListener('open', () => {
    // change the user name
    ws.send(JSON.stringify({ event: 'SET_NAME', new_name: `VU ${__VU}:${id}` }));

    // listen for messages/errors and log them into console
    ws.addEventListener('message', (e) => {
      const msg = JSON.parse(e.data);
      if (msg.event === 'CHAT_MSG') {
        console.log(`VU ${__VU}:${id} received: ${msg.user} says: ${msg.message}`);
      } else if (msg.event === 'ERROR') {
        console.error(`VU ${__VU}:${id} received:: ${msg.message}`);
      } else {
        console.log(`VU ${__VU}:${id} received unhandled message: ${msg.message}`);
      }
    });

    // send a message every 2-8 seconds
    const intervalId = setInterval(() => {
      ws.send(JSON.stringify({ event: 'SAY', message: `I'm saying ${randomString(5)}` }));
    }, randomIntBetween(2000, 8000)); // say something every 2-8 seconds

    // after a sessionDuration stop sending messages and leave the room
    const timeout1id = setTimeout(function () {
      clearInterval(intervalId);
      console.log(`VU ${__VU}:${id}: ${sessionDuration}ms passed, leaving the chat`);
      ws.send(JSON.stringify({ event: 'LEAVE' }));
    }, sessionDuration);

    // after a sessionDuration + 3s close the connection
    const timeout2id = setTimeout(function () {
      console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
      ws.close();
    }, sessionDuration + 3000);

    // when connection is closing, clean up the previously created timers
    ws.addEventListener('close', () => {
      clearTimeout(timeout1id);
      clearTimeout(timeout2id);
      console.log(`VU ${__VU}:${id}: disconnected`);
    });
  });
}
```

{{< /code >}}
