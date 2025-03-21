---
title: 'k6/net/grpc'
description: 'k6 gRPC API'
weight: 11
---

# k6/net/grpc

The `k6/net/grpc` module provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2. It supports unary and streaming (starting on [v0.49](https://github.com/grafana/k6/releases/tag/v0.49.0)) RPCs.

| Class/Method                                                                                                                      | Description                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client)                                              | gRPC client used for making RPC calls to a gRPC Server.                                                                                                 |
| [Client.load(importPaths, ...protoFiles)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-load) | Loads and parses the given protocol buffer definitions to be made available for RPC requests.                                                           |
| [Client.connect(address [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-connect)    | Connects to a given gRPC service.                                                                                                                       |
| [Client.invoke(url, request [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-invoke) | Makes an unary RPC for the given service/method and returns a [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response). |
| [Client.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-close)                         | Close the connection to the gRPC service.                                                                                                               |
| [Params](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/params)                                              | RPC Request specific options.                                                                                                                           |
| [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response)                                          | Returned by RPC requests.                                                                                                                               |
| [Constants](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/constants)                                        | Define constants to distinguish between [gRPC Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response) statuses.         |
| [Stream(client, url, [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream)                      | Creates a new gRPC stream.                                                                                                                              |
| [Stream.on(event, handler)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-on)                 | Adds a new listener to one of the possible stream events.                                                                                               |
| [Stream.write(message)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-write)                  | Writes a message to the stream.                                                                                                                         |
| [Stream.end()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/stream/stream-end)                             | Signals to the server that the client has finished sending.                                                                                             |

## gRPC metrics

k6 takes specific measurements for gRPC requests.
For the complete list, refer to the [Metrics reference](https://grafana.com/docs/k6/<K6_VERSION>/using-k6/metrics/reference#grpc).

### Example

{{< code >}}

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('grpcbin.test.k6.io:9001', {
    // plaintext: false
  });

  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);

  check(response, {
    'status is OK': (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
  sleep(1);
};
```

{{< /code >}}
