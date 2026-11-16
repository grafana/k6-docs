---
title: 'Event Handler'
description: 'The handler function for various events on the gRPC stream.'
weight: 50
---

# Event Handler

The function to call for various events on the gRPC stream. It is set up using the [`stream.on()`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-on) method.

| Name       | Type                                                                                                         | Description                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `data`     | object or [`Error`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-error) | It's either object with the data from server (a message) or an error object, in case of `error` event |
| `metadata` | [`Metadata`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/message-metadata)    | The object that represents the gRPC stream's message metadata.                                        |

### Example

<div class="code-group" data-props='{"labels": ["A handler metadata example"], "lineNumbers": [true]}'>

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const client = new Client();
client.load([], '../../grpc_server/route_guide.proto');

export default () => {
  if (__ITER == 0) {
    client.connect('127.0.0.1:10000', { plaintext: true });
  }

  const stream = new Stream(client, 'main.RouteGuide/RecordRoute');

  // sets up a handler for the data (server sends data) event
  stream.on('data', (stats, metadata) => {
    console.log('It took', stats.elapsedTime, 'seconds');
    console.log('This message has been received:', metadata.ts);
  });

  stream.on('end', function () {
    // The server has finished sending
    client.close();
  });

  sleep(1);
};
```

</div>
