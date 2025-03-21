---
title: 'gRPC'
description: 'gRPC is a lightweight open-source RPC framework. Starting with k6 v0.29.0, we support unary gRPC requests.'
weight: 03
---

# gRPC

## Overview

[gRPC](https://grpc.io/) is a lightweight, open-source RPC framework.
It was originally developed by Google, with version 1.0 released in August 2016.
Since then, it's gained much attention and wide adoption.

Whereas JSON transmits as human-readable text, gRPC is binary.
The binary format makes data transfer faster and more compact.
In the benchmarks we've seen, gRPC has proved much faster than REST, gRPC's more traditional, JSON-based counterpart.
The messages and services used for gRPC are described in `.proto` files, containing definitions for [Protocol Buffers](https://en.wikipedia.org/wiki/Protocol_Buffers) (protobuf).

## Load testing gRPC services with k6

Starting on k6 v0.49.0, k6 supports unary gRPC requests and streaming as part of the `k6/net/grpc` core module.

### gRPC definitions

Before interacting with a gRPC service, k6 needs to learn the definitions of the messages and services.

One way to do that is to explicitly use the `Client.load()` method and load the client definitions from the local file system. The method accepts a list of import paths and a list of `.proto` files. k6 then loads all the definitions from the files and their dependencies.

{{< code >}}

```javascript
import { Client } from 'k6/net/grpc';

const client = new Client();
client.load(['definitions'], 'hello.proto');
```

{{< /code >}}

Alternatively, you can dynamically load the definitions by using the gRPC reflection protocol. To enable reflection, you can pass the `reflect: true` option to `Client.connect()`. k6 then loads all the definitions from the server and their dependencies.

This option is only possible if the server has been instrumented with reflection support.

{{< code >}}

```javascript
import { Client } from 'k6/net/grpc';

const client = new Client();
client.connect('127.0.0.1:10000', { reflect: true });
```

{{< /code >}}

### Unary gRPC requests

Unary calls work the same way as regular HTTP requests. A single request is sent to a server, and the server replies with a single response.

{{< code >}}

```javascript
import { Client, StatusOK } from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('127.0.0.1:10000', {});

  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
  sleep(1);
};
```

{{< /code >}}

### Server gRPC streaming

In server streaming mode, the client sends a single request to the server, and the server replies with multiple responses.

The example below demonstrates server streaming.

{{< code >}}

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const COORD_FACTOR = 1e7;

const client = new Client();

export default () => {
  if (__ITER == 0) {
    client.connect('127.0.0.1:10000', { plaintext: true, reflect: true });
  }

  const stream = new Stream(client, 'main.FeatureExplorer/ListFeatures', null);

  stream.on('data', function (feature) {
    console.log(
      `Found feature called "${feature.name}" at ${feature.location.latitude / COORD_FACTOR}, ${
        feature.location.longitude / COORD_FACTOR
      }`
    );
  });

  stream.on('end', function () {
    // The server has finished sending
    client.close();
    console.log('All done');
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

In the example script, k6 connects to a gRPC server, creates a stream, and sends a message to the server with latitude and longitude coordinates. When the server sends data back, it logs the feature name and its location. When the server finishes sending data, it closes the client connection and logs a completion message.

### Client gRPC streaming

The client streaming mode is the opposite of the server streaming mode. The client sends multiple requests to the server, and the server replies with a single response.

The example below demonstrates client streaming.

{{< code >}}

```javascript
import { Client, Stream } from 'k6/net/grpc';
import { sleep } from 'k6';

const COORD_FACTOR = 1e7;
const client = new Client();

// a sample points collection
const points = [
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
];

export default () => {
  if (__ITER == 0) {
    client.connect('127.0.0.1:10000', { plaintext: true, reflect: true });
  }

  const stream = new Stream(client, 'main.RouteGuide/RecordRoute');

  stream.on('data', (stats) => {
    console.log(`Finished trip with ${stats.pointCount} points`);
    console.log(`Passed ${stats.featureCount} features`);
    console.log(`Travelled ${stats.distance} meters`);
    console.log(`It took ${stats.elapsedTime} seconds`);
  });

  stream.on('end', () => {
    client.close();
    console.log('All done');
  });

  // send 3 random points
  for (let i = 0; i < 3; i++) {
    const point = points[Math.floor(Math.random() * points.length)];
    pointSender(stream, point);
  }

  // close the client stream
  stream.end();
};

const pointSender = (stream, point) => {
  console.log(
    `Visiting point ${point.name} ${point.location.latitude / COORD_FACTOR}, ${
      point.location.longitude / COORD_FACTOR
    }`
  );

  // send the location to the server
  stream.write(point.location);

  sleep(0.5);
};
```

{{< /code >}}

In the example script, k6 establishes a connection to a gRPC server, creates a stream, and sends three random points. The server responds with statistics about the trip, which are logged to the console. The code also handles the end of the stream, closing the client and logging a completion message.

### Bidirectional gRPC streaming

In bi-directional streaming mode, the client and the server may send multiple messages.

From the API perspective, it combines the client and server streaming modes, so the code is similar to the examples above.

### Streaming error handling

To catch errors that occur during streaming, you can use the `error` event handler.

The handler receives [an error object](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-error/).

{{< code >}}

```javascript
import { Client, Stream } from 'k6/net/grpc';

const client = new Client();
const stream = new Stream(client, 'main.RouteGuide/RecordRoute');

stream.on('error', function (e) {
  // An error has occurred and the stream has been closed.
  console.log('Error: ' + JSON.stringify(e));
});
```

{{< /code >}}

### Protocol Buffers JSON Mapping

It's important to note how k6 handles requests and messages. First, it tries to marshal the request/message in JSON format. Then, k6 uses the [protojson](https://pkg.go.dev/google.golang.org/protobuf/encoding/protojson) package to encode or decode to a Protobuf message.

A limitation during this process is that the object you pass as a request/message must be serializable. That means structs like `Map` don't work.

The benefit of using `protojson` is the canonical JSON encoding support. The [Protocol Buffers documentation](https://protobuf.dev/programming-guides/proto3/#json) describes this mapping.

#### Examples

For instance, if you import `"google/protobuf/wrappers.proto"` and your proto-definitions look like this:

```proto
syntax = "proto3";

package testing;

import "google/protobuf/wrappers.proto";

service Service {
   rpc SayHey(google.protobuf.StringValue) returns (google.protobuf.StringValue);
   rpc DoubleInteger(google.protobuf.Int64Value) returns (google.protobuf.Int64Value);
}

```

When passing a message, you should use a string or an integer, not an object. As a result, you will receive a type that has already been marshaled.

{{< code >}}

```javascript
import { Client } from 'k6/net/grpc';
const client = new Client();

// an example of passing a string
const respString = client.invoke('testing.Service/SayHey', 'John');
if (respString.message !== 'hey John') {
  throw new Error("expected to get 'hey John', but got a " + respString.message);
}

// an example of passing an integer
const respInt = client.invoke('testing.Service/DoubleInteger', '3');
if (respInt.message !== '6') {
  throw new Error("expected to get '6', but got a " + respInt.message);
}
```

{{< /code >}}

Another example could be usage of `oneof`. Let's say you have a proto-definition like this:

```proto
syntax = "proto3";

package testing;

service Service {
   rpc Test(Foo)  returns (Foo) {}
}

message Foo {
   oneof Bar {
     string code = 1;
     uint32 id = 2;
   }
}
```

In this case, you should pass an object either with `code` or `id` fields.

{{< code >}}

```javascript
import { Client } from 'k6/net/grpc';
const client = new Client();

// calling RPC with filled code field
const respWithCode = client.invoke('testing.Service/Test', { code: 'abc-123' });

// calling RPC with filled id field
const respWithID = client.invoke('testing.Service/Test', { id: 123 });
```

{{< /code >}}
