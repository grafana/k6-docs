---
title: "k6/experimental/redis"
excerpt: "k6 Redis experimental API"
---

<Blockquote mod="attention" title="The redis module is experimental, use at your own risk">

While we intend to keep this module as simple and stable as possible,
we may need to add features or introduce breaking changes.
This could happen at any time until we release this module as stable.

**Use at your own risk!**

Feel free to provide user feedback, and open an issue or pull request if you have any suggestions.

</Blockquote>


The [Redis](https://redis.io/) module provides a client library that makes it possible to interact with Redis directly from a k6 script.
With this module, you can:
- Load test Redis
- Use Redis as a data store for test-script logic.

Though the API intends to be thorough and extensive, it does not expose the whole Redis API.
Instead, the intent is to expose Redis for use cases most appropriate to k6. 

This module is **not stable**, and remains open to changes. So, if you have a use case for some Redis functionality that's missing, feel free to open an issue or pull request.


### Notes on usage

The `Client` exposes a [promise](https://javascript.info/promise-basics)-based API.
Unlike most other current k6 modules and extensions,
which operate in a synchronous manner,
the Redis `Client` operates in an asynchronous manner.
In practice, this means that using the Redis `Client`'s methods won't block test execution,
and that the test will continue to run even if the Redis `Client` isn't ready to respond to the request.

This new execution model does introduce a potential caveat: to depend on operations against Redis, all following operations should be made in the context of a [promise chain](https://javascript.info/promise-chaining).
As the examples below demonstrate, whenever there is a dependency on a Redis operation result or return value, the operation should be wrapped in a promise itself.
This way, a user can perform asynchronous interactions with Redis in a seemingly synchronous manner.

### API

| Class                                       | Description                                                                                    |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [Client](/javascript-api/k6-experimental-redis/client)   | Client that exposes allowed interactions with Redis.                                           |
| [Options](/javascript-api/k6-experimental-redis/options) | Options used to configure the behavior of the [Redis Client](/javascript-api/k6-experimental-redis/client). |
