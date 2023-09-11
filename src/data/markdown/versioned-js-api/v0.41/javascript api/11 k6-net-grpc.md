---
title: "k6/net/grpc"
excerpt: "k6 gRPC API"
---

The `k6/net/grpc` module, added in k6 v0.29.0, provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2.

<Blockquote mod="warning">

The k6 gRPC API is currently considered in beta and is subject to change. Future k6 versions might have slight differences in the method and type signatures described in this documentation.

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

### Example

<CodeGroup labels={["grpc-test.js"]}>

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

</CodeGroup>
