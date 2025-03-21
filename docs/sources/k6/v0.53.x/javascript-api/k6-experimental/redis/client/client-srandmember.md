---
title: 'Client.srandmember(key)'
description: 'Returns a random member of the set stored at `key`.'
---

# Client.srandmember(key)

Returns a random element from the set value stored at `key`.

### Parameters

| Parameter | Type   | Description                                    |
| :-------- | :----- | :--------------------------------------------- |
| `key`     | string | key holding the set to get a random member of. |

### Returns

| Type              | Resolves with                                                     | Rejected when                                                     |
| :---------------- | :---------------------------------------------------------------- | :---------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the selected random member. | If the set does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.sadd('myset', 'foo');
  await redisClient.sadd('myset', 'bar');
  await redisClient.spop('myset', 'foo');

  const members = await redisClient.smembers('myset');
  if (members.length !== 1) {
    throw new Error('sismember should have length 1');
  }
}
```

{{< /code >}}
