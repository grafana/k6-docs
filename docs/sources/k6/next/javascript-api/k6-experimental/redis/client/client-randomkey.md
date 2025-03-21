---
title: 'Client.randomKey()'
description: 'Returns a random key from the keyspace.'
---

# Client.randomKey()

Returns a random key.

### Returns

| Type              | Resolves with                                              | Rejected when                                                    |
| :---------------- | :--------------------------------------------------------- | :--------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the random key name. | If the database is empty, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.set('first', 1, 0);
  await redisClient.set('second', 2, 0);
  await redisClient.set('third', 3, 0);

  const key = await redisClient.randomKey();
  console.log(`picked random key is: ${key}`);
}
```

{{< /code >}}
