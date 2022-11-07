---
title: 'websockets'
excerpt: "k6 websockets experimental API"
---

<ExperimentalBlockquote />

This experimental API implements the browser's [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

With some caveats:

- The [binaryType](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/binaryType) is by default ArrayBuffer and setting it panics as k6 does not support Blob.



| Class                                       | Description                                                                                    |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket)     | Constructs a new WebSocket connection |

## Example

An example below showcases how a single VU can run multiple WebSockets connections asynchronously and how to stop them after a period using the timeout and interval functions.

<CodeGroup labels={["example-websocket.js"]} lineNumbers={[]} showCopyButton={[true]}>

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
  const url = `wss://test-api.k6.io/ws/crocochat/${chatRoomName}/`;
  const ws = new WebSocket(url);
  ws.addEventListener('open', () => {
    ws.send(JSON.stringify({ event: 'SET_NAME', new_name: `Croc ${__VU}:${id}` }));

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

    const intervalId = setInterval(() => {
      ws.send(JSON.stringify({ event: 'SAY', message: `I'm saying ${randomString(5)}` }));
    }, randomIntBetween(2000, 8000)); // say something every 2-8seconds

    const timeout1id = setTimeout(function () {
      clearInterval(intervalId);
      console.log(`VU ${__VU}:${id}: ${sessionDuration}ms passed, leaving the chat`);
      ws.send(JSON.stringify({ event: 'LEAVE' }));
    }, sessionDuration);

    const timeout2id = setTimeout(function () {
      console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
      ws.close();
    }, sessionDuration + 3000);

    ws.addEventListener('close', () => {
      clearTimeout(timeout1id);
      clearTimeout(timeout2id);
      console.log(`VU ${__VU}:${id}: disconnected`);
    });
  });
}
```

</CodeGroup>
