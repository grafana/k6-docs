---
title: 'Client.expire(key, seconds)'
description: 'Sets an expiration date (a timeout) on the key `key`.'
---

# Client.expire(key, seconds)

Sets a timeout on key, after which the key will automatically be deleted. Note that calling Expire with a non-positive timeout will result in the key being deleted rather than expired.

### Parameters

| Parameter | Type   | Description                                    |
| :-------- | :----- | :--------------------------------------------- |
| `key`     | string | the key to set the expiration of.              |
| `seconds` | number | the value in seconds to set the expiration to. |

### Returns

| Type               | Resolves with                                                                                               | Rejected when |
| :----------------- | :---------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<boolean>` | On success, the promise resolves with `true` if the timeout was set, and `false` if the timeout wasn't set. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.set('mykey', 'myvalue', 10);
  await redisClient.expire('mykey', 100);

  const ttl = await redisClient.ttl('mykey');
  if (ttl <= 10 || ttl >= 100) {
    throw new Error('mykey should have a ttl of 10 <= x < 100');
  }
}
```

{{< /code >}}
