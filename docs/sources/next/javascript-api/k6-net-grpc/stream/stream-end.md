---
title: 'Stream.end()'
description: 'Signals to the server that the client has finished sending.'
weight: 40
aliases:
  - ../../k6-experimental/grpc/stream/stream-end/ # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc/stream/stream-end/
---

# Stream.end()

Signals to the server that the client has finished sending messages.

### Example

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

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

  stream.on('data', (stats) => {
    console.log('Finished trip with', stats.pointCount, 'points');
    console.log('Passed', stats.featureCount, 'features');
    console.log('Traveled', stats.distance, 'meters');
    console.log('It took', stats.elapsedTime, 'seconds');
  });

  // send 2 items
  stream.write({ latitude: 406109563, longitude: -742186778 });
  stream.write({ latitude: 416802456, longitude: -742370183 });

  // send end-signal to the server
  stream.end();

  sleep(1);
};
```

</div>
