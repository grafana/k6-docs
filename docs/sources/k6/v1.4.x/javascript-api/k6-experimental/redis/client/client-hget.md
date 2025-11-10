---
title: 'Client.hget(key, field)'
description: 'Returns the value of field in the hash stored at `key`.'
---

# Client.hget(key, field)

Returns the value associated with `field` in the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `key`     | string | key holding the hash to get the field of. |
| `field`   | string | field to get from the hash.               |

### Returns

| Type              | Resolves with                                                            | Rejected when                                                      |
| :---------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value associated with `field`. | If the hash does not exist, the promise is rejected with an error. |

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
