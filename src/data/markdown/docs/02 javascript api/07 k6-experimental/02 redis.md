---
title: "redis"
excerpt: "k6 Redis experimental API"
---

<ExperimentalBlockquote />


The [Redis](https://redis.io/) module provides a client library that makes it possible to interact with Redis directly from a k6 script.
With this module, you can:
- Load test Redis
- Use Redis as a data store for test-script logic.

Though the API intends to be thorough and extensive, it does not expose the whole Redis API.
Instead, the intent is to expose Redis for use cases most appropriate to k6. 

| Class                                       | Description                                                                                    |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [Client](/javascript-api/k6-experimental/redis/client)   | Client that exposes allowed interactions with Redis.                                           |
| [Options](/javascript-api/k6-experimental/redis/options) | Options used to configure the behavior of the [Redis Client](/javascript-api/k6-experimental/redis/client). |

### Notes on usage

The `Client` exposes a [promise](https://javascript.info/promise-basics)-based API.
Unlike most other current k6 modules and extensions,
which operate in a synchronous manner,
the Redis `Client` operates in an asynchronous manner.
In practice, this means that using the Redis `Client`'s methods won't block test execution,
and that the test will continue to run even if the Redis `Client` isn't ready to respond to the request.
However, achieving a seemingly synchronous behavior can be done using the `async/await` syntax. When preceding an asynchronous Redis `Client` operation with the `await` keyword in the context of an `async` function, the execution of the function will wait for the operation to complete before continuing its execution.
