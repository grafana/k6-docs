---
title: 'Client.del(keys)'
description: ''
---

# Client.del(keys)

Removes the specified keys. A key is ignored if it does not exist.

### Parameters

| Parameter | Type     | Description         |
| :-------- | :------- | :------------------ |
| `keys`    | string[] | the keys to delete. |

### Returns

| Type              | Resolves with                                                                 | Rejected when |
| :---------------- | :---------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the `number` of keys that were removed. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.set('mykey', 'myvalue', 0);

  const exists = await redisClient.exists('mykey');
  if (exists === false) {
    throw new Error('mykey should exist');
  }

  const value = await redisClient.get('mykey');
  console.log(`set key 'mykey' to value: ${value}`);

  await redisClient.del('mykey');
}
```

{{< /code >}}
