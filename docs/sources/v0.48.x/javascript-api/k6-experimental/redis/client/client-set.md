---
title: 'Client.set(key, value, expiration)'
description: 'Set `key` to hold `value`, with a time to live equal to `expiration`.'
---

# Client.set(key, value, expiration)

Set the value of a key, with a time to live equal to the expiration time parameter (in seconds). If the key already holds a value, it is overwritten.

### Parameters

| Parameter    | Type                       | Description                                                         |
| :----------- | :------------------------- | :------------------------------------------------------------------ |
| `key`        | string                     | the key to set                                                      |
| `value`      | string, number, or boolean | the value to set                                                    |
| `expiration` | integer                    | the time to live in seconds. the `0` value indicates no expiration. |

### Returns

| Type              | Resolves with                               | Rejected when                                                                              |
| :---------------- | :------------------------------------------ | :----------------------------------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with 'OK'. | If the provided `value` is not of a supported type, the promise is rejected with an error. |

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
