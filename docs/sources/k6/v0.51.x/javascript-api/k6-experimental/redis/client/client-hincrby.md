---
title: 'Client.hincrby(key, field, increment)'
description: 'Increments the value of a hash field by the given number.'
---

# Client.hincrby(key, field, increment)

Increments the integer value of `field` in the hash stored at `key` by `increment`. If `key` does not exist, a new key holding a hash is created. If `field` does not exist the value is set to 0 before the operation is set to 0 before the operation is performed.

### Parameters

| Parameter   | Type   | Description                                     |
| :---------- | :----- | :---------------------------------------------- |
| `key`       | string | key holding the hash to increment the field of. |
| `field`     | string | field to increment in the hash.                 |
| `increment` | number | amount to increment the field by.               |

### Returns

| Type              | Resolves with                                                                             | Rejected when |
| :---------------- | :---------------------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the value at `field` after the increment operation. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hset('myhash', 'myfield', 10);
  await redisClient.hincrby('myhash', 'myfield', 20);
}
```

{{< /code >}}
