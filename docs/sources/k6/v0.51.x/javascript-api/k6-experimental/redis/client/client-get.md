---
title: 'Client.get(key)'
description: 'Get the value of `key`.'
---

# Client.get(key)

Get the key's value.

### Parameters

| Parameter | Type   | Description                |
| :-------- | :----- | :------------------------- |
| `key`     | string | the name of the key to get |

### Returns

| Type              | Resolves with                                                 | Rejected when                                                     |
| :---------------- | :------------------------------------------------------------ | :---------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value of the `key`. | If the key does not exist, the promise is rejected with an error. |

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
