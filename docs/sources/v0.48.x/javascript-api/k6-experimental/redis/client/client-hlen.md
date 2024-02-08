---
title: 'Client.hlen(key)'
description: 'Returns the number of fields in the hash stored at `key`.'
---

# Client.hlen(key)

Returns the number of fields in the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the hash to get the fields of. |

### Returns

| Type              | Resolves with                                                           | Rejected when                                                      |
| :---------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the number of fields in the hash. | If the hash does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hset('myhash', 'myfield', 10);
  await redisClient.hset('myhash', 'myotherfield', 20);
  await redisClient.hlen('myhash');
}
```

{{< /code >}}
