---
title: 'Client.hgetall(key)'
description: 'Returns all fields and values of the hash stored at `key`.'
---

# Client.hgetall(key)

Returns all fields and values of the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the hash to get the fields of. |

### Returns

| Type                           | Resolves with                                                                                 | Rejected when |
| :----------------------------- | :-------------------------------------------------------------------------------------------- | :------------ |
| `Promise<[key: string]string>` | On success, the promise resolves with the list of fields and their values stored in the hash. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hset('myhash', 'myfield', 'myvalue');
  await redisClient.hset('myhash', 'myotherfield', 'myothervalue');
  const object = await redisClient.hgetall('myhash');
  console.log(`myhash has key:value pairs ${JSON.stringify(object)}`);
}
```

{{< /code >}}
