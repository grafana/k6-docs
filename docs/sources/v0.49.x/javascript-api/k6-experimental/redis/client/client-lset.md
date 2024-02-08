---
title: 'Client.lset(key, index, element)'
description: 'Sets the list element at index `index` of the list stored at `key` to `value`.'
---

# Client.lset(key, index, element)

Sets the list element at `index` to `element`.

### Parameters

| Parameter | Type   | Description                                 |
| :-------- | :----- | :------------------------------------------ |
| `key`     | string | key holding the list to set the element of. |
| `index`   | number | index of the element to set.                |
| `element` | string | value to set the element to.                |

### Returns

| Type              | Resolves with                               | Rejected when                                                                                     |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `Promise<string>` | On success, the promise resolves with `OK`. | If the list does not exist, or the index is out of bounds, the promise is rejected with an error. |

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
  await redisClient.lset('mylist', 0, 1);
  await redisClient.lset('mylist', 1, 2);
}
```

{{< /code >}}
