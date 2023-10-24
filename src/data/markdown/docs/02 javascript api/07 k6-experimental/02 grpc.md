---
title: "grpc"
excerpt: "Experimental GRPC module"
canonicalUrl: https://grafana.com/docs/k6
---

<ExperimentalBlockquote />

The `k6/experimental/grpc` module is an extension of the [`k6/net/grpc`](/javascript-api/k6-net-grpc/). It provides a [gRPC](https://grpc.io/) client for Remote Procedure Calls (RPC) over HTTP/2. 

The key-difference between the two modules is new `Stream` class, which provides client and server streaming support. Our long-term goal is to make this module part of k6 core, and long-term to replace the [`k6/net/grpc`](/javascript-api/k6-net-grpc/) module.

| Class/Method | Description |
|--------------|-------------|
| [Client](/javascript-api/k6-experimental/grpc/client) | gRPC client used for making RPC calls to a gRPC Server. |
| [Client.load(importPaths, ...protoFiles)](/javascript-api/k6-experimental/grpc/client/client-load) | Loads and parses the given protocol buffer definitions to be made available for RPC requests. |
| [Client.connect(address [,params])](/javascript-api/k6-experimental/grpc/client/client-connect) | Connects to a given gRPC service. |
| [Client.invoke(url, request [,params])](/javascript-api/k6-experimental/grpc/client/client-invoke) | Makes a unary RPC for the given service/method and returns a [Response](/javascript-api/k6-experimental/grpc/response). |
| [Client.close()](/javascript-api/k6-experimental/grpc/client/client-close) | Close the connection to the gRPC service. |
| [Params](/javascript-api/k6-experimental/grpc/params) | RPC Request specific options. |
| [Response](/javascript-api/k6-experimental/grpc/response) | Returned by RPC requests. |
| [Constants](/javascript-api/k6-experimental/grpc/constants) | Define constants to distinguish between [gRPC Response](/javascript-api/k6-experimental/grpc/response) statuses. |
| [Stream](/javascript-api/k6-experimental/grpc/stream) | Creates a new GRPC stream. |
| [Stream.on(event, handler)](/javascript-api/k6-experimental/grpc/stream/stream-on) | Adds a new listener to one of the possible stream event's. |
| [Stream.write(message)](/javascript-api/k6-experimental/grpc/stream/stream-write) | Writes a message to the stream. |
| [Stream.end()](/javascript-api/k6-experimental/grpc/stream/stream-end) | Signals to server that client finished sending. |

## Metrics

k6 takes specific measurements for gRPC requests.
For the complete list, refer to the [Metrics reference](/using-k6/metrics/reference#grpc).

### Example

<CodeGroup labels={["grpc-test.js"]}>

```javascript
import grpc from 'k6/experimental/grpc';
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
