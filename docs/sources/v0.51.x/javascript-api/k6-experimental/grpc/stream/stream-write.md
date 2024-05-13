---
title: 'Stream.write()'
description: 'Writes a message to the stream.'
weight: 40
---

# Stream.write()

{{< docs/shared source="k6" lookup="experimental-grpc-module.md" version="<K6_VERSION>" >}}

Writes a message to the stream.

### Example

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import { Client, Stream } from 'k6/experimental/grpc';
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
