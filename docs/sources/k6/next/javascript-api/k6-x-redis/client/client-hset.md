---
title: 'Client.hset(key, field, value)'
description: 'Sets the value of field in the hash stored at `key` to `value`.'
---

# Client.hset(key, field, value)

Sets the specified field in the hash stored at `key` to `value`. If the `key` does not exist, a new key holding a hash is created. If `field` already exists in the hash, it is overwritten.

### Parameters

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `key`     | string | key holding the hash to set the field of. |
| `field`   | string | field to set in the hash.                 |
| `value`   | string | value to set the field to.                |

### Returns

| Type              | Resolves with                                                               | Rejected when                                                      |
| :---------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the number of fields that were added. | If the hash does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hset('myhash', 'myfield', 'myvalue');
  await redisClient.hget('myhash', 'myfield');
  await redisClient.hdel('myhash', 'myfield');
}
```

{{< /code >}}
