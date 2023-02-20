---
title: 'Client.hsetnx(key, field, value)'
excerpt: 'Sets the value of field in the hash stored at `key` to `value` only if field does not exist in the hash.'
---

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
    .hsetnx('myhash', 'myfield', 'myvalue')
    .then((_) => redisClient.hsetnx('myhash', 'myotherfield', 'myothervalue'))
    .then((_) => redisClient.hsetnx('myhash', 'myfield', 'mynewvalue'))
    .then((set) => {
      if (set === true) {
        throw new Error('hsetnx should have failed on existing field');
      }
    });
}
```

</CodeGroup>