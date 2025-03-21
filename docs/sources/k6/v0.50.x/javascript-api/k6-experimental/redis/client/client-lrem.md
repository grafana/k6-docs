---
title: 'Client.lrem(key, count, value)'
descriptiontion: 'Removes the first count occurrences of elements equal to value from the list stored at `key`.'
---

# Client.lrem(key, count, value)

Removes the first `count` occurrences of `value` from the list stored at `key`. If `count` is positive, elements are removed from the beginning of the list. If `count` is negative, elements are removed from the end of the list. If `count` is zero, all elements matching `value` are removed.

### Parameters

| Parameter | Type   | Description                                     |
| :-------- | :----- | :---------------------------------------------- |
| `key`     | string | key holding the list to remove the elements of. |
| `count`   | number | number of elements to remove.                   |
| `value`   | string | value to remove from the list.                  |

### Returns

| Type              | Resolves with                                                         | Rejected when                                                      |
| :---------------- | :-------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the number of removed elements. | If the list does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.rpush('mylist', 'first');
  await redisClient.rpush('mylist', 'second');
  await redisClient.rpush('mylist', 'first');
  await redisClient.rpush('mylist', 'second');
  await redisClient.lrem('mylist', 0, 'second');

  const length = await redisClient.lrem('mylist', 1, 'first');
  if (length !== 1) {
    throw new Error('lrem operations should have left 1 item behind');
  }

  await redisClient.lpop('mylist');
}
```

{{< /code >}}
