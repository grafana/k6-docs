---
title: 'Client.srem(key, members)'
description: 'Removes the specified members from the set stored at `key`.'
---

# Client.srem(key, members)

Removes the specified members from the set stored at `key`. Specified members that are not a member of this set are ignored. If key does not exist, it is treated as an empty set and this command returns 0.

### Parameters

| Parameter | Type                                              | Description                                     |
| :-------- | :------------------------------------------------ | :---------------------------------------------- |
| `key`     | string                                            | key holding the set to remove the members from. |
| `members` | a variadic array of strings, numbers, or booleans | members to remove from the set.                 |

### Returns

| Type              | Resolves with                                                                                                                  | Rejected when |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the number of members that were remove from the set, not including non existing members. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.sadd('myset', 'foo');
  await redisClient.sadd('myset', 'bar');
  await redisClient.srem('myset', 'foo');

  const members = await redisClient.smembers('myset');
  if (members.length !== 1) {
    throw new Error('sismember should have length 1');
  }
}
```

{{< /code >}}
