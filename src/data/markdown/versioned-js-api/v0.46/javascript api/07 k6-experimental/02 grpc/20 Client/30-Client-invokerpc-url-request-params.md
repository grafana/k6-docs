---
title: "Client.invoke(url, request [,params])"
excerpt: 'Invokes an unary RPC request to the given method.'
---

Invokes an unary RPC request to the given method.

The given method to invoke must have its RPC schema previously loaded via the [Client.load()](/javascript-api/k6-experimental/grpc/client/client-load) function, otherwise an
error will be thrown.

[Client.connect()](/javascript-api/k6-experimental/grpc/client/client-connect) must be called first before invoking a request, otherwise an error will be thrown.

| Parameter | Type | Description |
|-----------|------|-------------|
| url | string | The gRPC method url to invoke, in the form `/package.Service/Method`, e.g. `/google.cloud.language.v1.LanguageService/AnalyzeSentiment`. The leading slash `/` is optional. |
| request | object | The canonical request object, as-per the [Protobuf JSON Mapping](https://developers.google.com/protocol-buffers/docs/proto3#json). |
| params (optional) | object | [Params](/javascript-api/k6-experimental/grpc/params) object containing additional request parameters.

### Returns

| Type | Description |
|------|-------------|
| `Response` | gRPC [Response](/javascript-api/k6-experimental/grpc/response) object. |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/experimental/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load([], 'routeguide.proto');

export default () => {
  client.connect('localhost:10000', { plaintext: true });
  const response = client.invoke('main.RouteGuide/GetFeature', {
    latitude: 410248224,
    longitude: -747127767,
  });
  check(response, { 'status is OK': (r) => r && r.status === grpc.StatusOK });
  console.log(response.message.name);
  // output: 3 Hasta Way, Newton, NJ 07860, USA

  client.close();
};
```

</div>

