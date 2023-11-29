---
title: 'Client.del(keys)'
excerpt: ''
canonicalUrl: https://grafana.com/docs/k6/latest/javascript-api/k6-experimental/redis/client/client-del/
---

Removes the specified keys. A key is ignored if it does not exist.

### Parameters

| Parameter | Type     | Description         |
| :-------- | :------- | :------------------ |
| `keys`    | string[] | the keys to delete. |


### Returns

| Type              | Resolves with                                                                 | Rejected when |
| :---------------- | :---------------------------------------------------------------------------- | :------------ |
| `Promise<number>` | On success, the promise resolves with the `number` of keys that were removed. |               |

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
    await redisClient.set('mykey', 'myvalue', 0);
    
    const exists = await redisClient.exists('mykey');
    if (exists === false) {
        throw new Error('mykey should exist');
    }

    const value = await redisClient.get('mykey');
    console.log(`set key 'mykey' to value: ${value}`);

    await redisClient.del('mykey');
}
```

</CodeGroup>