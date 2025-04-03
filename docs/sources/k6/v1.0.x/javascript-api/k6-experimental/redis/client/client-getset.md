---
title: 'Client.getSet(key, value)'
description: 'Atomically sets `key` to `value` and returns the old value stored at `key`.'
---

# Client.getSet(key, value)

Atomically sets `key` to `value` and returns the value previously stored at `key`.

### Parameters

| Parameter | Type                       | Description            |
| :-------- | :------------------------- | :--------------------- |
| `key`     | string                     | the key to get and set |
| `value`   | string, number, or boolean | the value to set       |

### Returns

| Type              | Resolves with                                                        | Rejected when                                                                                    |
| :---------------- | :------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the old value stored at `key`. | If `key` does not exist, or does not hold a string value, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.set('mykey', 'oldvalue', 0);
  await redisClient.getSet('mykey', 'newvalue');
  await redisClient.getDel('mykey');
}
```

{{< /code >}}
