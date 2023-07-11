---
title: 'Client.hget(key, field)'
excerpt: 'Returns the value of field in the hash stored at `key`.'
---

Returns the value associated with `field` in the hash stored at `key`.

### Parameters

| Parameter | Type   | Description                               |
| :-------- | :----- | :---------------------------------------- |
| `key`     | string | key holding the hash to get the field of. |
| `field`   | string | field to get from the hash.               |


### Returns

| Type              | Resolves with                                                            | Rejected when                                                      |
| :---------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value associated with `field`. | If the hash does not exist, the promise is rejected with an error. |

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