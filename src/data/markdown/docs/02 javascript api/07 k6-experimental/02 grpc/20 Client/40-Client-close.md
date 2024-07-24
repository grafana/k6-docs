---
title: "Client.close()"
excerpt: 'Close the connection to the gRPC service. Tear down all underlying connections.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/grpc/client/client-close/
redirect: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/grpc/client/client-close/
---

Close the connection to the gRPC service. Tear down all underlying connections.

### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```javascript
import grpc from 'k6/experimental/grpc';

const client = new grpc.Client();
client.load(['definitions'], 'hello.proto');

export default () => {
  client.connect('localhost:8080');
  client.close();
};
```
</div>
