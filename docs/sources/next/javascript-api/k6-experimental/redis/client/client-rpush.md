---
title: 'Client.rpush(key, values)'
description: 'Adds the string `value` to the right of the list stored at `key`.'
---

# Client.rpush(key, values)

Inserts all the specified values at the tail of the list stored at `key`. If `key` does not exist, it is created as empty list before performing the push operation.

### Parameters

| Parameter | Type                                              | Description                            |
| :-------- | :------------------------------------------------ | :------------------------------------- |
| `key`     | string                                            | key holding the list to right push to. |
| `values`  | a variadic array of strings, numbers, or booleans | values to push to the list.            |

### Returns

| Type              | Resolves with                                                                          | Rejected when                                                                       |
| :---------------- | :------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the length of the list after the push operation. | When `key` holds a value that is not a list, the promise is rejected with an error. |

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
