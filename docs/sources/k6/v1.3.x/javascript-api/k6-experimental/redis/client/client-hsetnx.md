---
title: 'Client.hsetnx(key, field, value)'
description: 'Sets the value of field in the hash stored at `key` to `value` only if field does not exist in the hash.'
---

# Client.hsetnx(key, field, value)

Sets the specified field in the hash stored at `key` to `value`, only if `field` does not yet exist. If `key` does not exist, a new key holding a hash is created. If `field` already exists, this operation has no effect.

### Parameters

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `key`     | string | key holding the hash to set the field of. |
| `field`   | string | field to set in the hash.                 |
| `value`   | string | value to set the field to.                |

### Returns

| Type               | Resolves with                                                                                                                                                                         | Rejected when |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `Promise<boolean>` | On success, the promise resolves with `1` if `field` is a new field in the hash and value was set, and with `0` if `field` already exists in the hash and no operation was performed. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hsetnx('myhash', 'myfield', 'myvalue');
  await redisClient.hsetnx('myhash', 'myotherfield', 'myothervalue');

  const set = await redisClient.hsetnx('myhash', 'myfield', 'mynewvalue');
  if (set === true) {
    throw new Error('hsetnx should have failed on existing field');
  }
}
```

{{< /code >}}
