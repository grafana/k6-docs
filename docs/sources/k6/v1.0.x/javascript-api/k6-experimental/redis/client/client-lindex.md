---
title: 'Client.lindex(key)'
description: 'Returns the element at index `index` of the list stored at `key`.'
---

# Client.lindex(key)

Returns the specified element of the list stored at `key`. The index is zero-based. Negative indices can be used to designate elements starting at the tail of the list.

### Parameters

| Parameter | Type   | Description                                 |
| :-------- | :----- | :------------------------------------------ |
| `key`     | string | key holding the list to get the element of. |

### Returns

| Type              | Resolves with                                                | Rejected when                                                                                     |
| :---------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `Promise<string>` | On success, the promise resolves with the requested element. | If the list does not exist, or the index is out of bounds, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.rpush('mylist', 'first');
  await redisClient.rpush('mylist', 'second');
  await redisClient.rpush('mylist', 'third');

  const item = await redisClient.lindex('mylist', 0);
  if (item !== 'first') {
    throw new Error('lindex operation should have returned first');
  }

  await redisClient.lrange('mylist', 1, 2);
}
```

{{< /code >}}
