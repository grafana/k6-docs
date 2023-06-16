---
title: "k6/net/grpc"
excerpt: "k6 gRPC API"
---

The `k6/net/grpc` module, added in k6 v0.29.0, provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2.

<Blockquote mod='info'>

#### An extension with much better API exists

[xk6-grpc](https://github.com/grafana/xk6-grpc) implements gRPC streaming APIs.

Currently, it's available as an experimental module [`k6/experimental/grpc`](/javascript-api/k6-experimental/grpc/). It is also likely that it will at some point become part of the core of k6.
</Blockquote>

| Class/Method | Description |
|--------------|-------------|
| [Client](/javascript-api/k6-net-grpc/client) | gRPC client used for making RPC calls to a gRPC Server. |
| [Client.load(importPaths, ...protoFiles)](/javascript-api/k6-net-grpc/client/client-load) | Loads and parses the given protocol buffer definitions to be made available for RPC requests. |
| [Client.connect(address [,params])](/javascript-api/k6-net-grpc/client/client-connect) | Connects to a given gRPC service. |
| [Client.invoke(url, request [,params])](/javascript-api/k6-net-grpc/client/client-invoke) | Makes an unary RPC for the given service/method and returns a [Response](/javascript-api/k6-net-grpc/response). |
| [Client.close()](/javascript-api/k6-net-grpc/client/client-close) | Close the connection to the gRPC service. |
| [Params](/javascript-api/k6-net-grpc/params) | RPC Request specific options. |
| [Response](/javascript-api/k6-net-grpc/response) | Returned by RPC requests. |
| [Constants](/javascript-api/k6-net-grpc/constants) | Define constants to distinguish between [gRPC Response](/javascript-api/k6-net-grpc/response) statuses. |

## gRPC metrics

k6 takes specific measurements for gRPC requests.
For the complete list, refer to the [Metrics reference](/using-k6/metrics/reference#grpc).

### Example

<CodeGroup labels={["grpc-test.js"]}>

```javascript
import grpc from 'k6/net/grpc';
import { check, sleep } from 'k6';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('grpcb.in:9001', {
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

</CodeGroup>
