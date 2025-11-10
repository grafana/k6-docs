---
title: 'Client.ttl(key)'
description: 'Returns the remaining time to live of a key.'
---

# Client.ttl(key)

Returns the remaining time to live of a key that has a timeout.

### Parameters

| Parameter | Type   | Description                |
| :-------- | :----- | :------------------------- |
| key       | string | the key to get the TTL of. |

### Returns

| Type              | Resolves with                                                   | Rejected when |
| :---------------- | :-------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the TTL value in seconds. |               |

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
  if (ttl <= 10) {
    throw new Error('mykey should have a ttl of 10 <= x < 100');
  }

  await redisClient.persist('mykey', 100);
}
```

{{< /code >}}
