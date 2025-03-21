---
title: 'Client.hdel(key, fields)'
description: 'Deletes fields from the hash stored at `key`.'
---

# Client.hdel(key, fields)

Deletes the specified fields from the hash stored at `key`. The number of fields that were removed from the hash is returned on resolution (non including non existing fields).

### Parameters

| Parameter | Type     | Description                                   |
| :-------- | :------- | :-------------------------------------------- |
| `key`     | string   | key holding the hash to delete the fields of. |
| `fields`  | string[] | fields to delete from the hash.               |

### Returns

| Type              | Resolves with                                                                                                                                  | Rejected when |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the number of fields that were removed from the hash, not including specified, but non existing, fields. |               |

### Example

{{< code >}}

```javascript
import redis from 'k6/experimental/redis';

// Instantiate a new redis client
const redisClient = new redis.Client('redis://localhost:6379');

export default async function () {
  await redisClient.hset('myhash', 'myfield', 'myvalue');
  await redisClient.hget('myhash', 'myfield');
  await redisClient.hdel('myhash', 'myfield');
}
```

{{< /code >}}
