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

### Example

{{< code >}}

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

{{< /code >}}
