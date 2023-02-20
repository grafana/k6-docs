---
title: 'Client.hset(key, field, value)'
excerpt: 'Sets the value of field in the hash stored at `key` to `value`.'
---

Sets the specified field in the hash stored at `key` to `value`. If the `key` does not exist, a new key holding a hash is created. If `field` already exists in the hash, it is overwritten.

### Parameters

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `key`     | string | key holding the hash to set the field of. |
| `field`   | string | field to set in the hash.                 |
| `value`   | string | value to set the field to.                |


### Returns

| Type              | Resolves with                                                               | Rejected when                                                      |
| :---------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the number of fields that were added. | If the hash does not exist, the promise is rejected with an error. |

### Example

<CodeGroup labels={[]}>

```javascript
import redis from 'k6/experimental/redis';

// Get the redis instance(s) address and password from the environment
const redis_addrs = __ENV.REDIS_ADDRS || '';
const redis_password = __ENV.REDIS_PASSWORD || '';

// Instantiate a new redis client
const redisClient = new redis.Client({
  addrs: redis_addrs.split(',') || new Array('localhost:6379'), // in the form of 'host:port', separated by commas
  password: redis_password,
});

export default function () {
  redisClient
    .hset('myhash', 'myfield', 'myvalue')
    .then((_) => redisClient.hget('myhash', 'myfield'))
    .then((_) => redisClient.hdel('myhash', 'myfield'));
}
```

</CodeGroup>