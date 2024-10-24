---
title: 'Stream.write()'
description: 'Writes a message to the stream.'
weight: 40
---

# Stream.write()

Writes a message to the stream. The message is a canonical request object, as-per the [Protobuf JSON Mapping](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/protocols/grpc/#protocol-buffers-json-mapping).

### Example

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const COORD_FACTOR = 1e7;

const client = new Client();
client.load([], '../../grpc_server/route_guide.proto');

export default () => {
  if (__ITER == 0) {
    client.connect('127.0.0.1:10000', { plaintext: true });
  }

  const stream = new Stream(client, 'main.RouteGuide/RecordRoute');

  stream.on('data', (stats) => {
    console.log('Finished trip with', stats.pointCount, 'points');
  });

  // send an item
  stream.write({ latitude: 406109563, longitude: -742186778 });

  // send end-signal to the server
  stream.end();

  sleep(1);
};
```

</div>
