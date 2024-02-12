---
title: 'Client.lrange(key, start, stop)'
description: 'Returns the specified elements of the list stored at `key`.'
---

# Client.lrange(key, start, stop)

Returns the specified elements of the list stored at `key`. The offsets start and stop are zero-based indexes. These offsets can be negative numbers, where they indicate offsets starting at the end of the list.

### Parameters

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `key`     | string | key holding the list to get the range of. |
| `start`   | number | index of the first element to return.     |
| `stop`    | number | index of the last element to return.      |

### Returns

| Type                | Resolves with                                                                      | Rejected when |
| :------------------ | :--------------------------------------------------------------------------------- | :------------ |
| `Promise<string[]>` | On success, the promise resolves with the list of elements in the specified range. |               |

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

  const item = redisClient.lindex('mylist', 0);
  if (item !== 'first') {
    throw new Error('lindex operation should have returned first');
  }

  await redisClient.lrange('mylist', 1, 2);
}
```

{{< /code >}}
