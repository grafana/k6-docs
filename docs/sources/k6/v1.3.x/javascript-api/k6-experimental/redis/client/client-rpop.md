---
title: 'Client.rpop(key)'
description: 'Removes and returns the last element of the list stored at `key`.'
---

# Client.rpop(key)

Removes and returns the last element of the list stored at `key`.

### Parameters

| Parameter | Type   | Description                             |
| :-------- | :----- | :-------------------------------------- |
| `key`     | string | key holding the list to right pop from. |

### Returns

| Type              | Resolves with                                                         | Rejected when                                                      |
| :---------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value of the first element. | If the list does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.lpush('mylist', 'first');
  await redisClient.rpush('mylist', 'second');

  const item = await redisClient.lpop('mylist');
  await redisClient.rpush('mylist', item);
  await redisClient.rpop('mylist');
}
```

{{< /code >}}
