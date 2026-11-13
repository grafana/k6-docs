---
title: Client
description: 'Client is a gRPC client that can interact with a gRPC server.'
weight: 10
aliases:
  - ../k6-experimental/grpc/client/ # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc/client/
---

# Client

`Client` is a gRPC client that can interact with a gRPC server.

| Method                                                                                                                              | Description                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Client.load(importPaths, ...protoFiles)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-load)   | Loads and parses the given protocol buffer definitions to be made available for RPC requests.                                                           |
| [Client.loadProtoset(protosetPath)](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-loadprotoset) | Loads and parses the given protoset file to be made available for RPC requests.                                                                         |
| [Client.connect(address [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-connect)      | Opens a connection to the given gRPC server.                                                                                                            |
| [Client.invoke(url, request [,params])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-invoke)   | Makes an unary RPC for the given service/method and returns a [Response](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/response). |
| [Client.healthCheck([service])](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-health-check) | Check the status of the service using the [Health Checking](https://grpc.io/docs/guides/health-checking) protocol. |
| [Client.close()](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-net-grpc/client/client-close)                           | Close the connection to the gRPC service.                                                                                                               |

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/net/grpc';

const client = new grpc.Client();
// Download quickpizza.proto for grpc-quickpizza.grafana.com, located at:
// https://raw.githubusercontent.com/grafana/quickpizza/refs/heads/main/proto/quickpizza.proto
// and put it in the same folder as this script.
client.load(null, 'quickpizza.proto');

export default () => {
  client.connect('grpc-quickpizza.grafana.com:443', { timeout: '5s' });

  const response = client.invoke('quickpizza.GRPC/RatePizza', {
    ingredients: ['Tomatoes', 'Cheese'],
    dough: 'Thin',
  });
  console.log(response.message.starsRating); // should print a number between 1-5

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
