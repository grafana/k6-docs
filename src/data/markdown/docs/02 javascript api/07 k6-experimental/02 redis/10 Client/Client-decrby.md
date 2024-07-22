---
title: 'Client.decrBy(key, decrement)'
excerpt: 'Decrements the number stored at `key` by `decrement`.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/client/client-decrby/
---

Decrements the number stored at `key` by `decrement`. If the key does not exist, it is set to zero before performing the operation.

### Parameters

| Parameter   | Type   | Description                |
| :---------- | :----- | :------------------------- |
| `key`       | string | the key to decrement.      |
| `decrement` | number | the amount to decrement by |


### Returns

| Type              | Resolves with                                                                 | Rejected when                                                                                                                                        |
| :---------------- | :---------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<number>` | On success, the promise resolves with the value of `key` after the decrement. | If the key contains a value of the wrong type, or contains a string that cannot be represented as an integer, the promise is rejected with an error. |

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

export default async function () {
    await redisClient.set('mykey', 10, 0);
    
    const value = await redisClient.decrBy('mykey', 2);
    if (value !== 8) {
        throw new Error('mykey should have been 8');
    }
}
```

</CodeGroup>