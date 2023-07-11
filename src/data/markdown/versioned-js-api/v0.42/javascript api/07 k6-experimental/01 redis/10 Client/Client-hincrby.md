---
title: 'Client.hincrby(key, field, increment)'
excerpt: 'Increments the value of a hash field by the given number.'
---

Increments the integer value of `field` in the hash stored at `key` by `increment`. If `key` does not exist, a new key holding a hash is created. If `field` does not exist the value is set to 0 before the operation is set to 0 before the operation is performed.

### Parameters

| Parameter   | Type   | Description                                     |
| :---------- | :----- | :---------------------------------------------- |
| `key`       | string | key holding the hash to increment the field of. |
| `field`     | string | field to increment in the hash.                 |
| `increment` | number | amount to increment the field by.               |


### Returns

| Type              | Resolves with                                                                             | Rejected when |
| :---------------- | :---------------------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the value at `field` after the increment operation. |               |

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
    .hset('myhash', 'myfield', 10)
    .then((_) => redisClient.hincrby('myhash', 'myfield', 20));
}
```

</CodeGroup>