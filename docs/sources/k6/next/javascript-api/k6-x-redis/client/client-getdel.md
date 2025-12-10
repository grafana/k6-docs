---
title: 'Client.getDel(key)'
description: 'Get the value of `key` and delete the key.'
---

# Client.getDel(key)

Get the value of `key` and delete the key. This functionality is similar to `get`, except for the fact that it also deletes the key on success.

### Parameters

| Parameter | Type   | Description               |
| :-------- | :----- | :------------------------ |
| `key`     | string | the key to get and delete |

### Returns

| Type              | Resolves with                                             | Rejected when                                                     |
| :---------------- | :-------------------------------------------------------- | :---------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value of `key`. | If the key does not exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.set('mykey', 'oldvalue', 0);
  let value = await redisClient.getSet('mykey', 'newvalue');

  value = await redisClient.getDel('mykey');
  if (value !== 'newvalue') {
    throw new Error('mykey should have been newvalue');
  }
}
```

{{< /code >}}
