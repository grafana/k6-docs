---
title: 'Stream.on()'
description: 'Set up handler functions for various events on the GRPC stream.'
weight: 10
---

# Stream.on()

{{< docs/shared source="k6" lookup="experimental-grpc-module.md" version="<K6_VERSION>" >}}

Set up handler functions for various events on the GRPC stream.

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| event     | string   | The event name to define a handler for.      |
| handler   | function | The function to call when the event happens. |

Possible events:

| Event name | Description                                                                                                                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data       | Emitted when the server sends data.                                                                                                                                                                      |
| error      | Emitted when an error occurs. In case of the error, an [`Error`](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc/stream/stream-error) object sends to the handler function. |
| end        | Emitted when the server closes the incoming stream.                                                                                                                                                      |

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

  // sets up a handler for the data (server sends data) event
  stream.on('data', (stats) => {
    console.log('Finished trip with', stats.pointCount, 'points');
    console.log('Passed', stats.featureCount, 'features');
    console.log('Traveled', stats.distance, 'meters');
    console.log('It took', stats.elapsedTime, 'seconds');
  });

  // sets up a handler for the end event (stream closes)
  stream.on('end', function () {
    // The server has finished sending
    client.close();
    console.log('All done');
  });

  // sets up a handler for the error event (an error occurs)
  stream.on('error', function (e) {
    // An error has occurred and the stream has been closed.
    console.log('Error: ' + JSON.stringify(e));
  });

  sleep(1);
};
```

</div>
