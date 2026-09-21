---
title: 'Metadata'
description: "The metadata of a gRPC stream's message."
weight: 60
---

# Metadata

The `Metadata` is an object that represents the gRPC stream's message.

| Name          | Type   | Description                                                                                  |
| ------------- | ------ | -------------------------------------------------------------------------------------------- |
| `Metadata.ts` | number | Contains the timestamp of the original event. For example, when a message has been received. |

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
