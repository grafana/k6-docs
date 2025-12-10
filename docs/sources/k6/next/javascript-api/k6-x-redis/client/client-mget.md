---
title: 'Client.mget(keys)'
description: 'Returns the values of all specified keys.'
---

# Client.mget(keys)

Returns the values of all specified keys.

### Parameters

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `keys`    | string[] | the keys to get the values of. |

### Returns

| Type             | Resolves with                                                                                                                                                                          | Rejected when |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<any[]>` | On success, the promise resolves with the list of values at the specified keys. For every key that does not hold a string value, or does not exist, the value `null` will be returned. |               |

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

  const values = await redisClient.mget('first', 'second', 'third');
  console.log(`set values are: ${values}`);
}
```

{{< /code >}}
