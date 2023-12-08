---
title: 'Client.exists(keys)'
excerpt: 'Returns the number of `key` arguments that exist.'
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/client/client-exists/
---

Returns the number of `key` arguments that exist. Note that if the same existing key is mentioned in the argument multiple times, it will be counted multiple times.

### Parameters

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `keys`    | string[] | the keys to check the existence of. |


### Returns

| Type              | Resolves with                                                                                            | Rejected when |
| :---------------- | :------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the `number` of keys that exist from those specified as arguments. |               |

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
    let exists = await redisClient.exists('mykey');
    if (exists === true) {
        throw new Error('mykey should not exist');
    }

    await redisClient.set('mykey', 'myvalue', 0);
    
    exists = await redisClient.exists('mykey');
    if (exists === false) {
        throw new Error('mykey should exist');
    }
    
    await redisClient.del('mykey');
}
```

</CodeGroup>