---
title: 'Client.sadd(key, members)'
description: 'Adds the specified members to the set stored at `key`.'
---

# Client.sadd(key, members)

Adds the specified members to the set stored at `key`. Specified members that are already a member of this set are ignored. If key does not exist, a new set is created before adding the specified members.

### Parameters

| Parameter | Type                                              | Description                                |
| :-------- | :------------------------------------------------ | :----------------------------------------- |
| `key`     | string                                            | key holding the set to add the members to. |
| `members` | a variadic array of strings, numbers, or booleans | members to add to the set.                 |

### Returns

| Type              | Resolves with                                                                                                                               | Rejected when |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `Promise<number>` | On success, the promise resolves with the number of elements that were added to the set, not including elements already present in the set. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Get the redis instance(s) address and password from the environment
const redis_addrs = __ENV.REDIS_ADDRS || '';
const redis_password = __ENV.REDIS_PASSWORD || '';

// Instantiate a new redis client
const redisClient = new redis.Client({
  addrs: redis_addrs.split(',') || new Array('localhost:6379'), // in the form of 'host:port', separated by commas
  password: redis_password,
});

export default async function () {
  await redisClient.sadd('myset', 'foo');
  await redisClient.sadd('myset', 'bar');

  const isit = await redisClient.sismember('myset', 'foo');
  if (isit === false) {
    throw new Error('sismember should have returned true');
  }
}
```

{{< /code >}}
