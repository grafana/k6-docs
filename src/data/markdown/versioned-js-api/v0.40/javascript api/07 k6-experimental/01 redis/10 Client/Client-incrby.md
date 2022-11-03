---
title: 'Client.incrBy(key, increment)'
excerpt: 'Increments the number stored at `key` by `increment`.'
---

Increments the number stored at `key` by `increment`. If the key does not exist, it is set to zero before performing the operation.

### Parameters

| Parameter   | Type   | Description                |
| :---------- | :----- | :------------------------- |
| `key`       | string | the key to increment       |
| `increment` | number | the amount to increment by |


### Returns

| Type              | Resolves with                                                                 | Rejected when                                                                                                                                        |
| :---------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the value of `key` after the increment. | If the key contains a value of the wrong type, or contains a string that cannot be represented as an integer, the promise is rejected with an error. |

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
    .set('mykey', 10, 0)
    .then((_) => redisClient.incr('mykey'))
    .then((value) => redisClient.incrBy('mykey', value))
    .then((value) => redisClient.decrBy('mykey', value))
    .then((_) => redisClient.decr('mykey'));
}
```

</CodeGroup>