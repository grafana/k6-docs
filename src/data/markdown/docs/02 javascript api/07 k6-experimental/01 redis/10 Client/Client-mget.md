---
title: 'Client.mget(keys)'
excerpt: 'Returns the values of all specified keys.'
---

Returns the values of all specified keys. 

### Parameters

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `keys`    | string[] | the keys to get the values of. |


### Returns

| Type             | Resolves with                                                                                                                                                                          | Rejected when |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `Promise<any[]>` | On success, the promise resolves with the list of values at the specified keys. For every key that does not hold a string value, or does not exist, the value `null` will be returned. |               |

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
    .set('first', 1, 0)
    .then((_) => redisClient.set('second', 2, 0))
    .then((_) => redisClient.set('third', 3, 0))
    .then((_) => redisClient.mget('first', 'second', 'third'))
    .then((values) => console.log(`set values are: ${values}`));
}
```

</CodeGroup>