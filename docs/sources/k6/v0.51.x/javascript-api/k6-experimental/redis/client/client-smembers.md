---
title: 'Client.smembers(key)'
description: 'Returns all the members of the set stored at `key`.'
---

# Client.smembers(key)

Returns all the members of the set values stored at `keys`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the set to get the members of. |

### Returns

| Type                | Resolves with                                                                            | Rejected when |
| :------------------ | :--------------------------------------------------------------------------------------- | :------------ |
| `Promise<string[]>` | On success, the promise resolves with an array containing the values present in the set. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.sadd('myset', 'foo');
  await redisClient.sadd('myset', 'bar');
  await redisClient.sadd('myset', 'foo');

  const members = await redisClient.smembers('myset');
  if (members.length !== 2) {
    throw new Error('sismember should have length 2');
  }
}
```

{{< /code >}}
