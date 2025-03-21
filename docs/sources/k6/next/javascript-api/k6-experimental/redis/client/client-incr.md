---
title: 'Client.incr(key)'
description: 'Increments the number stored at `key` by one.'
---

# Client.incr(key)

Increments the number stored at `key` by one. If the key does not exist, it is set to zero before performing the operation.

### Parameters

| Parameter | Type   | Description          |
| :-------- | :----- | :------------------- |
| `key`     | string | the key to increment |

### Returns

| Type              | Resolves with                                                                 | Rejected when                                                                                                                                        |
| :---------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the value of `key` after the increment. | If the key contains a value of the wrong type, or contains a string that cannot be represented as an integer, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.set('mykey', 10, 0);

  let value = await redisClient.incr('mykey');
  value = await redisClient.incrBy('mykey', value);
  value = await redisClient.decrBy('mykey', value);
  value = await redisClient.decr('mykey');
  if (value !== -1) {
    throw new Error('mykey should have been -1');
  }
}
```

{{< /code >}}
