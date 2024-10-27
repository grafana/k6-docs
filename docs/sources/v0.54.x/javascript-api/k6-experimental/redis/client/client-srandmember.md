---
title: 'Client.srandmember(key)'
description: 'Returns a random member of the set stored at `key`.'
---

# Client.srandmember(key)

Returns a random element from the set value stored at `key`.

### Parameters

| Parameter | Type   | Description                                              |
| :-------- | :----- | :------------------------------------------------------- |
| `key`     | string | The key value holding the set to get a random member of. |

### Returns

| Type              | Resolves with                                                     | Rejected when                                                    |
| :---------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the selected random member. | If the set doesn't exist, the promise is rejected with an error. |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.sadd('myset', 'foo');
  await redisClient.sadd('myset', 'bar');

  const randomMember = await redisClient.srandmember('myset');
  if (randomMember !== 'foo' && randomMember !== 'bar') {
    throw new Error('randomMember should be equal to "foo" or "bar"');
  }
}
```

{{< /code >}}
