---
title: 'Client.sismember(key, member)'
description: 'Determines if a given value is a member of the set stored at `key`.'
---

# Client.sismember(key, member)

Returns if member is a member of the set stored at `key`.

### Parameters

| Parameter | Type                       | Description                                                |
| :-------- | :------------------------- | :--------------------------------------------------------- |
| `key`     | string                     | key holding the set to check if the member is a member of. |
| `member`  | string, number, or boolean | member to check if is a member of the set.                 |

### Returns

| Type               | Resolves with                                                                                          | Rejected when |
| :----------------- | :----------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<boolean>` | On success, the promise resolves with `true` if the element is a member of the set, `false` otherwise. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.sadd('myset', 'foo');
  await redisClient.sadd('myset', 'bar');

  const isit = await redisClient.sismember('myset', 'foo');
  if (isit === false) {
    throw new Error('sismember should have returned true');
  }
}
```

{{< /code >}}
