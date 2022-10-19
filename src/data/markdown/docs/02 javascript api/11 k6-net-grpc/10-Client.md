---
title: Client
excerpt: 'Client is a gRPC client that can interact with a gRPC server.'
---

`Client` is a gRPC client that can interact with a gRPC server.

>  ⚠️ **Note**: Only unary RPCs are currently supported, i.e. there is no support for client, server or bidirectional streaming.

| Method | Description |
|--------|-------------|
| [Client.load(importPaths, ...protoFiles)](/javascript-api/k6-net-grpc/client/client-load) | Loads and parses the given protocol buffer definitions to be made available for RPC requests. |
| [Client.connect(address [,params])](/javascript-api/k6-net-grpc/client/client-connect) | Opens a connection to the given gRPC server. |
| [Client.invoke(url, request [,params])](/javascript-api/k6-net-grpc/client/client-invoke) | Makes an unary RPC for the given service/method and returns a [Response](/javascript-api/k6-net-grpc/response). |
| [Client.close()](/javascript-api/k6-net-grpc/client/client-close) | Close the connection to the gRPC service. |


### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();
// Download addsvc.proto for https://grpcb.in/, located at:
// https://raw.githubusercontent.com/moul/pb/master/addsvc/addsvc.proto
// and put it in the same folder as this script.
client.load(null, 'addsvc.proto');

export default () => {
  client.connect('grpcb.in:9001', { timeout: '5s' });

  const response = client.invoke('addsvc.Add/Sum', {
    a: 1,
    b: 2,
  });
  console.log(response.message.v); // should print 3

  client.close();
};
```

</div>

<div class="code-group" data-props='{"labels": ["Authorization"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load([], 'authorization.proto', 'route_guide.proto');

export function setup() {
  client.connect('auth.googleapis.com:443');
  const resp = client.invoke('google.cloud.authorization.v1.AuthService/GetAccessToken', {
    username: 'john.smith@k6.io',
    password: 'its-a-secret',
  });
  client.close();
  return resp.message.accessToken;
}

export default (token) => {
  client.connect('route.googleapis.com:443');
  const metadata = {
    authorization: `bearer ${token}`,
  };
  const response = client.invoke(
    'google.cloud.route.v1.RoutingService/GetFeature',
    {
      latitude: 410248224,
      longitude: -747127767,
    },
    { metadata }
  );
  check(response, { 'status is OK': (r) => r && r.status === grpc.StatusOK });
  client.close();
};
```

</div>

<div class="code-group" data-props='{"labels": ["Single connection"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load([], 'language_service.proto');

export default () => {
  if (__ITER == 0) {
    client.connect('language.googleapis.com:443');
  }
  const response = client.invoke('google.cloud.language.v1.LanguageService/AnalyzeSentiment', {});
  check(response, { 'status is OK': (r) => r && r.status === grpc.StatusOK });
  // Do NOT close the client
};
```

</div>
