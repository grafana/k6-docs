---
title: 'k6/net/grpc'
description: 'k6 gRPC API'
weight: 11
aliases:
  - ./k6-experimental/grpc/ # docs/k6/<K6_VERSION>/javascript-api/k6-experimental/grpc/
---

# k6/net/grpc

{{< docs/shared source="k6" lookup="javascript-api/k6-net-grpc.md" version="<K6_VERSION>" >}}

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
