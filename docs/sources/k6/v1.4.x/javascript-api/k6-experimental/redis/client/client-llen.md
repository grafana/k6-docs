---
title: 'Client.llen(key)'
description: 'Returns the length of the list stored at `key`.'
---

# Client.llen(key)

Returns the length of the list stored at `key`. If `key` does not exist, it is interpreted as an empty list and 0 is returned.

### Parameters

| Parameter | Type   | Description                                |
| :-------- | :----- | :----------------------------------------- |
| `key`     | string | key holding the list to get the length of. |

### Returns

| Type              | Resolves with                                                          | Rejected when                                                      |
| :---------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the length of the list at `key`. | If the list does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default function () {
  redisClient
    .rpush('mylist', 'first')
    .then((_) => redisClient.rpush('mylist', 'second'))
    .then((_) => redisClient.rpush('mylist', 'third'))
    .then((_) => redisClient.llen('mylist'))
    .then((length) => {
      if (length !== 3) {
        throw new Error('llen operations should have returned 3');
      }
    });
}
```

{{< /code >}}
