---
title: 'Response'
head_title: 'gRPC.Response'
description: 'The response object of a gRPC request.'
weight: 30
aliases:
  - ../k6-experimental/grpc/response/ # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc/response/
---

# Response

| Name                | Type   | Description                                                                                                                                                      |
| ------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Response.status`   | number | The response gRPC status code. Use the gRPC [status constants](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/constants) to check equality. |
| `Response.message`  | object | The successful protobuf message, serialized to JSON. Will be `null` if `status !== grpc.StatusOK`.                                                               |
| `Response.headers`  | object | Key-value pairs representing all the metadata headers returned by the gRPC server.                                                                               |
| `Response.trailers` | object | Key-value pairs representing all the metadata trailers returned by the gRPC server.                                                                              |
| `Response.error`    | object | If `status !== grpc.StatusOK` then the error protobuf message, serialized to JSON; otherwise `null`.                                                             |

For a failed `Client.invoke()` or `Client.asyncInvoke()` call, `Response.error` contains the gRPC status `code`, `message`, and, when the server sends `grpc-status-details-bin`, a `details` array. Standard Google error details such as `google.rpc.ErrorInfo` and `google.rpc.BadRequest` are decoded automatically. Custom protobuf detail types can be decoded when you load their definitions with `Client.load()` or `Client.loadProtoset()` before calling the method. Each decoded detail is a JSON object with an `@type` field and the fields of that protobuf message.

If k6 cannot convert the details to JSON, `error` still contains the status code and message, and `details` is an empty array. Streaming RPCs use their stream error events rather than a `Response` object.

To check structured details, use a server that returns them. The k6 repository's [gRPC example server](https://github.com/grafana/k6/tree/master/examples/grpc_server) returns `ErrorInfo` for zero coordinates. Start it from the k6 repository root with `go run -mod=mod examples/grpc_server/*.go`, and place the [route guide protobuf](https://github.com/grafana/k6/blob/master/internal/lib/testutils/grpcservice/route_guide.proto) beside this script as `route_guide.proto`:

<!-- md-k6:skip -->

```javascript
import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load([], 'route_guide.proto');

export default function () {
  client.connect('127.0.0.1:10000', { plaintext: true });
  const response = client.invoke('main.FeatureExplorer/GetFeature', {
    latitude: 0,
    longitude: 0,
  });

  check(response, {
    'has ErrorInfo detail': (r) =>
      r.status === grpc.StatusInvalidArgument &&
      r.error.details.some((detail) =>
        detail['@type'].includes('ErrorInfo') && detail.reason === 'ZERO_COORDINATES'
      ),
  });
  client.close();
}
```

### Example

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(null, 'quickpizza.proto');

export default () => {
  client.connect('grpc-quickpizza.grafana.com:443', {
    // plaintext: false
  });

  const data = { ingredients: ['Cheese'], dough: 'Thick' };
  const response = client.invoke('quickpizza.GRPC/RatePizza', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  client.close();
  sleep(1);
};
```
