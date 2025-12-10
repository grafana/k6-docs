---
title: "redis"
description: "k6 Redis experimental API"
weight: 02
weight: 02
---

# redis

{{< docs/shared source="k6" lookup="experimental-module.md" version="<K6_VERSION>" >}}

The [Redis](https://redis.io/) module provides a client library that makes it possible to interact with Redis directly from a k6 script.
With this module, you can:

- Load test Redis
- Use Redis as a data store for test-script logic.

Though the API intends to be thorough and extensive, it does not expose the whole Redis API.
Instead, the intent is to expose Redis for use cases most appropriate to k6.

| Class                                                                                                  | Description                                                                                                                                         |
| :----------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis/client)         | Client that exposes allowed interactions with Redis.                                                                                                |
| [Options](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis/redis-options) | Options used to configure the behavior of the [Redis Client](https://grafana.com/docs/k6/<K6_VERSION>/javascript-api/k6-experimental/redis/client). |

### Notes on usage

The `Client` exposes a [promise](https://javascript.info/promise-basics)-based API.
Unlike most other current k6 modules and extensions,
which operate in a synchronous manner,
the Redis `Client` operates in an asynchronous manner.
In practice, this means that using the Redis `Client`'s methods won't block test execution,
and that the test will continue to run even if the Redis `Client` isn't ready to respond to the request.
The `async` and `await` keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains
(for details, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)).
