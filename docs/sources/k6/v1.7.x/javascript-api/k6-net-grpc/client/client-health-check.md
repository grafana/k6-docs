---
title: 'Client.healthCheck()'
description: 'Check the health of a gRPC endpoint.'
---

# Client.healthCheck([service])

Check the health status of the gRPC service using the gRPC [Health Checking](https://grpc.io/docs/guides/health-checking/) protocol.

The method returns the health status of the provided service. If no service name is provided, it checks the overall server health.

The health check response includes a `status` field that can be one of the following constants:

- `HealthCheckServing`: The service is healthy and serving requests
- `HealthCheckNotServing`: The service is not serving requests
- `HealthCheckUnknown`: The health status is unknown

### Example

{{< code >}}

```javascript
import grpc from 'k6/net/grpc';
import { check } from 'k6';

const client = new grpc.Client();
client.load([], 'routeguide.proto');

export default () => {
  client.connect('localhost:10000', { plaintext: true });

  // Check overall server health
  const res = client.healthCheck();

  check(res, {
    'server is healthy': (r) => r && r.status === grpc.StatusOK,
    'health status is serving': (r) => r && r.message.status === grpc.HealthCheckServing,
  });

  // Check specific service health
  const svcRes = client.healthCheck('my.service.Name');
  console.log('Health status:', svcRes.message.status);

  client.close();
};
```

{{< /code >}}
