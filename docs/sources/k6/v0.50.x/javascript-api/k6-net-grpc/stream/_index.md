---
title: Stream
description: gRPC Streams
weight: 30
---

# Stream

Using a gRPC client creates a stream. The client should be connected to the server (`client.connect` called) before creating a stream.

| Class/Method                                                                                                      | Description                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Stream(client, url, [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream)      | Using a connected [gRPC client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client) and the method's URL creates a stream. Optionally, you can pass [`params` for additional configuration options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/params) like tags, metadata, etc. |
| [Stream.write(message)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-write)  | Writes a message to the stream.                                                                                                                                                                                                                                                                                                   |
| [Stream.on(event, handler)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-on) | Sets up handler functions for various events on the gRPC stream.                                                                                                                                                                                                                                                                  |
| [Stream.end()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-end)             | Signals to the server that the client has finished sending.                                                                                                                                                                                                                                                                       |

### Examples

_A k6 script that sends several randomly chosen points from the pre-generated feature database with a variable delay in between. Prints the statistics when they are sent from the server._

{{< code >}}

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const COORD_FACTOR = 1e7;

const GRPC_ADDR = __ENV.GRPC_ADDR || '127.0.0.1:10000';
const GRPC_PROTO_PATH = __ENV.GRPC_PROTO_PATH || '../../grpc_server/route_guide.proto';

const client = new Client();
client.load([], GRPC_PROTO_PATH);

// a sample DB of points
const DB = [
  {
    location: { latitude: 407838351, longitude: -746143763 },
    name: 'Patriots Path, Mendham, NJ 07945, USA',
  },
  {
    location: { latitude: 408122808, longitude: -743999179 },
    name: '101 New Jersey 10, Whippany, NJ 07981, USA',
  },
  {
    location: { latitude: 413628156, longitude: -749015468 },
    name: 'U.S. 6, Shohola, PA 18458, USA',
  },
  {
    location: { latitude: 419999544, longitude: -740371136 },
    name: '5 Conners Road, Kingston, NY 12401, USA',
  },
  {
    location: { latitude: 414008389, longitude: -743951297 },
    name: 'Mid Hudson Psychiatric Center, New Hampton, NY 10958, USA',
  },
  {
    location: { latitude: 419611318, longitude: -746524769 },
    name: '287 Flugertown Road, Livingston Manor, NY 12758, USA',
  },
  {
    location: { latitude: 406109563, longitude: -742186778 },
    name: '4001 Tremley Point Road, Linden, NJ 07036, USA',
  },
  {
    location: { latitude: 416802456, longitude: -742370183 },
    name: '352 South Mountain Road, Wallkill, NY 12589, USA',
  },
  {
    location: { latitude: 412950425, longitude: -741077389 },
    name: 'Bailey Turn Road, Harriman, NY 10926, USA',
  },
  {
    location: { latitude: 412144655, longitude: -743949739 },
    name: '193-199 Wawayanda Road, Hewitt, NJ 07421, USA',
  },
];

export default () => {
  if (__ITER == 0) {
    client.connect(GRPC_ADDR, { plaintext: true });
  }

  const stream = new Stream(client, 'main.RouteGuide/RecordRoute');

  stream.on('data', (stats) => {
    console.log('Finished trip with', stats.pointCount, 'points');
    console.log('Passed', stats.featureCount, 'features');
    console.log('Travelled', stats.distance, 'meters');
    console.log('It took', stats.elapsedTime, 'seconds');
  });

  stream.on('error', (err) => {
    console.log('Stream Error: ' + JSON.stringify(err));
  });

  stream.on('end', () => {
    client.close();
    console.log('All done');
  });

  // send 5 random items
  for (let i = 0; i < 5; i++) {
    const point = DB[Math.floor(Math.random() * DB.length)];
    pointSender(stream, point);
  }

  // close the client stream
  stream.end();

  sleep(1);
};

const pointSender = (stream, point) => {
  console.log(
    'Visiting point ' +
      point.name +
      ' ' +
      point.location.latitude / COORD_FACTOR +
      ', ' +
      point.location.longitude / COORD_FACTOR
  );

  // send the location to the server
  stream.write(point.location);

  sleep(0.5);
};
```

{{< /code >}}

_A k6 script that sends a rectangle message and results (features) are streamed back to the client._

{{< code >}}

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const COORD_FACTOR = 1e7;

const GRPC_ADDR = __ENV.GRPC_ADDR || '127.0.0.1:10000';
const GRPC_PROTO_PATH = __ENV.GRPC_PROTO_PATH || '../../grpc_server/route_guide.proto';

const client = new Client();

client.load([], GRPC_PROTO_PATH);

export default () => {
  client.connect(GRPC_ADDR, { plaintext: true });

  const stream = new Stream(client, 'main.FeatureExplorer/ListFeatures', null);

  stream.on('data', function (feature) {
    console.log(
      'Found feature called "' +
        feature.name +
        '" at ' +
        feature.location.latitude / COORD_FACTOR +
        ', ' +
        feature.location.longitude / COORD_FACTOR
    );
  });

  stream.on('end', function () {
    // The server has finished sending
    client.close();
    console.log('All done');
  });

  stream.on('error', function (e) {
    // An error has occurred and the stream has been closed.
    console.log('Error: ' + JSON.stringify(e));
  });

  // send a message to the server
  stream.write({
    lo: {
      latitude: 400000000,
      longitude: -750000000,
    },
    hi: {
      latitude: 420000000,
      longitude: -730000000,
    },
  });

  sleep(0.5);
};
```

{{< /code >}}

The preceding examples use a demo server, which you can run with the following command (Golang should be installed) in [k6 repository's root](https://github.com/grafana/k6):

{{< code >}}

```bash
$ go run -mod=mod examples/grpc_server/*.go
```

{{< /code >}}
