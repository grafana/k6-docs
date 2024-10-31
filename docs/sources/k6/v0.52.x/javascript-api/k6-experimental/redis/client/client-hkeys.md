---
title: 'Client.hkeys(key)'
description: 'Returns all fields of the hash stored at `key`.'
---

# Client.hkeys(key)

Returns all fields of the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the hash to get the fields of. |

### Returns

| Type                | Resolves with                                                         | Rejected when                                                      |
| :------------------ | :-------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<string[]>` | On success, the promise resolves with the list of fields in the hash. | If the hash does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hset('myhash', 'myfield', 'myvalue');
  await redisClient.hset('myhash', 'myotherfield', 'myothervalue');

  const keys = await redisClient.hkeys('myhash');
  if (keys.length !== 2) {
    throw new Error('myhash should have 2 keys');
  }

  console.log(`myhash has keys ${keys}`);
}
```

{{< /code >}}
