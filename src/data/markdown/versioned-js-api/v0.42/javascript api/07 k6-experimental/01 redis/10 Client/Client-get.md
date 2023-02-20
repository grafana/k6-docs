---
title: 'Client.get(key)'
excerpt: 'Get the value of `key`.'
---

Get the key's value.

### Parameters

| Parameter | Type   | Description                |
| :-------- | :----- | :------------------------- |
| `key`     | string | the name of the key to get |


### Returns

| Type              | Resolves with                                                 | Rejected when                                                     |
| :---------------- | :------------------------------------------------------------ | :---------------------------------------------------------------- |
| `Promise<string>` | On success, the promise resolves with the value of the `key`. | If the key does not exist, the promise is rejected with an error. |

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
    .set('mykey', 'myvalue', 0)
    .then((_) => redisClient.exists('mykey'))
    .then((exists) => {
      if (exists === false) {
        throw new Error('mykey should exist');
      }

      return redisClient.get('mykey');
    })
    .then((value) => console.log(`set key 'mykey' to value: ${value}`))
    .then(() => redisClient.del('mykey'));
}
```

</CodeGroup>