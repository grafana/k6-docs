---
title: 'websockets'
descriptiontion: "k6 websockets experimental API"
weight: 05
weight: 05
---

# websockets

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

This experimental API implements the browser [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) with additional k6-specific functionalities (cookies, tags, headers and so on).

The main difference between this module and [`k6/ws`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws) is that this module uses a global event loop instead of a local one.
A global event loop lets a single VU have multiple concurrent connections, which improves performance.

The `WebSocket API` is not fully implemented, and we're working on it, but we believe it's usable for most users. So whether you're writing a new WebSocket test, or currently using the `k6/ws` module, we invite you to give it a try, and report any issues in the project's [issue tracker](https://github.com/grafana/xk6-websockets/). Our midterm goal is to make this module part of k6 core, and long-term to replace the [`k6/ws`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-ws) module.

| Class/Method                                                                                                                                                          | Description                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/params)                                                                   | Used for setting various WebSocket connection parameters such as headers, cookie jar, compression, etc. |
| [WebSocket(url, protocols, params)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket)                                     | Constructs a new WebSocket connection.                                                                  |
| [WebSocket.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-close)                                     | Close the WebSocket connection.                                                                         |
| [WebSocket.ping()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-ping)                                       | Send a ping.                                                                                            |
| [WebSocket.send(data)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-send)                                   | Send string data.                                                                                       |
| [WebSocket.addEventListener(event, handler)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-addeventlistener) | Add an event listener on the connection for specific event.                                             |

A WebSocket instance also has the following properties:

<!-- vale off -->

| Class/Property                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WebSocket.readyState                                                                                                                    | The current state of the connection. Could be one of [the four states](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/readyState).                                                                                                                                                                                                                                      |
| WebSocket.url                                                                                                                           | The URL of the connection as resolved by the constructor.                                                                                                                                                                                                                                                                                                                           |
| WebSocket.bufferedAmount                                                                                                                | The number of bytes of data that have been queued using calls to `send()` but not yet transmitted to the network.                                                                                                                                                                                                                                                                   |
| WebSocket.binaryType                                                                                                                    | The [`binaryType`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType) is by default `""`. If a binary message is received it will be automatically set to `"arraybuffer"` if empty and warning will be printed. In the future it will move to default to `"blob"`. If you want to have the same behaviour - you should always be setting it to `"arraybuffer"`. |
| [WebSocket.onmessage](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-onmessage) | A handler for `message` events.                                                                                                                                                                                                                                                                                                                                                     |
| [WebSocket.onerror](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-onerror)     | A handler for `error` events.                                                                                                                                                                                                                                                                                                                                                       |
| [WebSocket.onopen](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-onopen)       | A handler for `open` events.                                                                                                                                                                                                                                                                                                                                                        |
| [WebSocket.onclose](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-onclose)     | A handler for `close` events.                                                                                                                                                                                                                                                                                                                                                       |
| [WebSocket.onping](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-onping)       | A handler for `ping` events.                                                                                                                                                                                                                                                                                                                                                        |
| [WebSocket.onpong](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/websockets/websocket/websocket-onpong)       | A handler for `pong` events.                                                                                                                                                                                                                                                                                                                                                        |

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
import { WebSocket } from 'k6/experimental/websockets';
import { setTimeout, clearTimeout, setInterval, clearInterval } from 'k6/experimental/timers';

const chatRoomName = 'publicRoom'; // choose any chat room name
const sessionDuration = randomIntBetween(5000, 60000); // user session between 5s and 1m

export default function () {
  for (let i = 0; i < 4; i++) {
    startWSWorker(i);
  }
}

function startWSWorker(id) {
  // create a new websocket connection
  const ws = new WebSocket(`wss://test-api.k6.io/ws/crocochat/${chatRoomName}/`);
  ws.binaryType = 'arraybuffer';

  ws.addEventListener('open', () => {
    // change the user name
    ws.send(JSON.stringify({ event: 'SET_NAME', new_name: `Croc ${__VU}:${id}` }));

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
